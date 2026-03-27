package service

import (
	"errors"
	"leave-back/internal/request-service/dto"
)

func (s *RequestService) CreateRequest(request dto.CreateRequest) error {
	startDate, err := time.Parse(dateFormat, request.StartDate)
	if err != nil {
		return fmt.Errorf("invalid start_date format, expected YYYY-MM-DD: %w", err)
	}
	endDate, err := time.Parse(dateFormat, request.EndDate)
	if err != nil {
		return fmt.Errorf("invalid end_date format, expected YYYY-MM-DD: %w", err)
	}

	if endDate.Before(startDate) {
		return errors.New("end date must not be before start date")
	}
	
	reqData, err := s.AppRepo.GetRequestsByUserID(request.UserID)
	if err != nil {
		return err
	}

	usrBalance, err := s.UsrRepo.GetLeaveBalancesByUserID(request.UserID)
	if err != nil {
		return err
	}

	holidayMap, err := s.AppRepo.GetHolidayDatesBetween(request.StartDate, request.EndDate)
	if err != nil {
		return err
	}

	totalDays, err := s.calculateLeaveDays(startDate, endDate, request.HalfDay, holidayMap)
	if err != nil {
		return err
	}

	hasOverlap, err := s.AppRepo.CheckOverlappingRequests(request.UserID, request.StartDate, request.EndDate)
	if err != nil {
		return fmt.Errorf("failed to check overlapping requests: %w", err)
	}
	if hasOverlap {
		return errors.New("you already have a leave request in the selected date range")
	}

	var currentBalance float64 = -1
	for _, b := range usrBalance {
		if b.LeaveTypeID == request.LeaveTypeID {
			currentBalance = b.Balance
			break
	}
	if currentBalance < 0 {
		return errors.New("no leave balance found for this leave type")
	}
	if currentBalance < totalDays {
		return fmt.Errorf("insufficient leave balance: remaining %.1f days, requested %.1f days", currentBalance, totalDays)
	}

	if err := s.UsrRepo
	
}

func (s *RequestService) calculateLeaveDays(startDate, endDate time.Time, halfDay bool, holidayMap map[string]bool) (float64, error) {
	var totalDays float64

	for d := startDate; !d.After(endDate); d = d.AddDate(0, 0, 1) {
		// ข้ามวันเสาร์-อาทิตย์
		if d.Weekday() == time.Saturday || d.Weekday() == time.Sunday {
			continue
		}

		// ข้ามวันหยุดนักขัตฤกษ์
		dateStr := d.Format(dateFormat)
		if holidayMap[dateStr] {
			continue
		}

		// วันทำงานปกติ นับ 1 วัน
		totalDays += 1.0
	}

	if totalDays == 0 {
		return 0, errors.New("no working days in the selected date range")
	}

	// ถ้าเป็น half-day ลดลง 0.5 (ใช้ได้เมื่อลาวันเดียว)
	if halfDay {
		if startDate.Equal(endDate) {
			totalDays = 0.5
		} else {
			// ลาหลายวันแบบ half-day → หักวันแรกเป็นครึ่งวัน
			totalDays -= 0.5
		}
	}

	return totalDays, nil
}