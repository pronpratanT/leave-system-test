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
}