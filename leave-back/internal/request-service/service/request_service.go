package service

import (
	"errors"
	"fmt"
	"leave-back/internal/request-service/dto"
	"leave-back/shared/model"
	"time"
)

const dateFormat = "2006-01-02"

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

	usrBalance, err := s.UsrRepo.GetLeaveBalancesByUserID(request.UserID)
	if err != nil {
		return err
	}

	holidayMap, err := s.AppRepo.GetHolidayDatesBetween(request.StartDate, request.EndDate)
	if err != nil {
		return err
	}

	if startDate.Weekday() == time.Saturday || startDate.Weekday() == time.Sunday {
    return errors.New("start date cannot be a weekend")
	}
	if holidayMap[request.StartDate] {
		return errors.New("start date cannot be a public holiday")
	}

	if endDate.Weekday() == time.Saturday || endDate.Weekday() == time.Sunday {
		return errors.New("end date cannot be a weekend")
	}
	if holidayMap[request.EndDate] {
		return errors.New("end date cannot be a public holiday")
	}

	totalDays, err := s.calculateLeaveDays(startDate, endDate, request.StartHalfDayType, request.EndHalfDayType, holidayMap)
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
	}
	if currentBalance < 0 {
		return errors.New("no leave balance found for this leave type")
	}
	if currentBalance < totalDays {
		return fmt.Errorf("insufficient leave balance: remaining %.1f days, requested %.1f days", currentBalance, totalDays)
	}

	if err := s.UsrRepo.DeductLeaveBalance(request.UserID, request.LeaveTypeID, totalDays); err != nil {
		return fmt.Errorf("failed to deduct leave balance: %w", err)
	}

	req := &model.Requests{
		UserID:      request.UserID,
		LeaveTypeID: request.LeaveTypeID,
		StartHalfDayType: request.StartHalfDayType,
		EndHalfDayType:   request.EndHalfDayType,
		StartDate:   request.StartDate,
		EndDate:     request.EndDate,
		TotalDay:    totalDays,
		Reason:      request.Reason,
		Status:      "pending",
	}

	if err := s.AppRepo.CreateRequest(req); err != nil {
		_ = s.UsrRepo.RestoreLeaveBalance(request.UserID, request.LeaveTypeID, totalDays)
		return fmt.Errorf("failed to create leave request: %w", err)
	}
	return nil
}

func (s *RequestService) calculateLeaveDays(startDate, endDate time.Time, startHalfDayType, endHalfDayType string, holidayMap map[string]bool,) (float64, error) {
    var totalDays float64

    for d := startDate; !d.After(endDate); d = d.AddDate(0, 0, 1) {
        if d.Weekday() == time.Saturday || d.Weekday() == time.Sunday {
            continue
        }
        if holidayMap[d.Format(dateFormat)] {
            continue
        }
        totalDays += 1.0
    }

    if totalDays == 0 {
        return 0, errors.New("no working days in the selected date range")
    }

    // หักครึ่งวันของวันแรก
    if startHalfDayType != "" {
        totalDays -= 0.5
    }

    // หักครึ่งวันของวันสุดท้าย (กรณีลาหลายวัน และวันสุดท้ายไม่ใช่วันเดียวกับวันแรก)
    if endHalfDayType != "" && !startDate.Equal(endDate) {
        totalDays -= 0.5
    }

    if totalDays <= 0 {
        return 0, errors.New("total leave days must be greater than 0")
    }

    return totalDays, nil
}

func (s *RequestService) ApprovedRequest(request dto.ApproveRejectRequest) error {
	chkmanager, err := s.UsrRepo.GetUserByID(request.ManagerID)
	if err != nil {
		return err
	}
	if chkmanager.Role != "manager" {
		return errors.New("you are not authorized to approve this request")
	}
	return s.AppRepo.ApprovedRequest(request)
}

func (s *RequestService) RejectedRequest(request dto.ApproveRejectRequest) error {
	chkmanager, err := s.UsrRepo.GetUserByID(request.ManagerID)
	if err != nil {
		return err
	}
	if chkmanager.Role != "manager" {
		return errors.New("you are not authorized to reject this request")
	}
	return s.AppRepo.RejectedRequest(request)
}

func (s *RequestService) CancelledRequest(request dto.CancelRequest) error {
	req, err := s.AppRepo.GetRequestByID(request.RequestID)
	if err != nil {
		return err
	}
	if req.UserID != request.UserID {
		return errors.New("you are not authorized to cancel this request")
	}
	if req.Status != "pending" {
		return errors.New("you can only cancel pending requests")
	}
	if err := s.AppRepo.CancelledRequest(request.RequestID); err != nil {
		return err
	}
	return s.UsrRepo.RestoreLeaveBalance(req.UserID, req.LeaveTypeID, req.TotalDay)
}

func (s *RequestService) GetRequestsHistoryByUserID(userID int) ([]dto.RequestHistoryResponse, error) {
	return s.AppRepo.GetRequestsHistoryByUserID(userID)
}

func (s *RequestService) GetRequestDetailByID(requestID int) (*dto.RequestDetailResponse, error) {
	return s.AppRepo.GetRequestDetailByID(requestID)
}

func (s *RequestService) GetAllLeaveRequestsByUserDepartmentID(departmentID int) ([]dto.RequestDepartmentHistoryResponse, error) {
	return s.AppRepo.GetAllLeaveRequestsByUserDepartmentID(departmentID)
}