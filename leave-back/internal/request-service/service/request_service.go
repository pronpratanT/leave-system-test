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