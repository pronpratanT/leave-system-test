package service

import (
	"leave-back/internal/request-service/dto"
	"leave-back/shared/model"
)

func (s *RequestService) GetAllLeaveTypes() ([]model.LeaveTypes, error) {
	return s.AppRepo.GetAllLeaveTypes()
}

func (s *RequestService) CreateLeaveType(dto dto.CreateLeaveType) error {
	return s.AppRepo.CreateLeaveTypes(&dto)
}
