package repository

import (
	"leave-back/internal/request-service/dto"
	"leave-back/shared/model"
)

func (r *RequestRepository) GetAllLeaveTypes() ([]model.LeaveTypes, error) {
	var leaveTypes []model.LeaveTypes
	err := r.DB.Find(&leaveTypes).Error
	return leaveTypes, err
}

func (r *RequestRepository) CreateLeaveTypes(leaveType *dto.CreateLeaveType) error {
	leave := &model.LeaveTypes{
		Name:  leaveType.Name,
		Quota: leaveType.Quota,
	}
	return r.DB.Create(&leave).Error
}
