package repository

import (
	"leave-back/internal/request-service/dto"
	"leave-back/shared/model"
)

func (r *RequestRepository) CreateRequest(request *dto.CreateRequest) error {
	req := &model.Requests{
		UserID:      request.UserID,
		LeaveTypeID: request.LeaveTypeID,
		StartDate:   request.StartDate,
		EndDate:     request.EndDate,
		Reason:      request.Reason,
		Status:      "pending",
	}
	return r.DB.Create(&req).Error
}

func (r *RequestRepository) GetRequestsByUserID(userID int) ([]model.Requests, error) {
	var requests []model.Requests
	err := r.DB.Where("user_id = ?", userID).Find(&requests).Error
	return requests, err
}

func (r *RequestRepository) GetRequestByID(requestID int) (*model.Requests, error) {
	var request model.Requests
	err := r.DB.Where("id = ?", requestID).First(&request).Error
	return &request, err
}

func (r *RequestRepository) ApprovedRequest(requestID int, managerID int, comment string) error {
	return r.DB.Model(&model.Requests{}).Where("id = ?", requestID).Updates(map[string]interface{}{
		"status":     "approved",
		"manager_id": managerID,
		"comment":    comment,
	}).Error
}

func (r *RequestRepository) RejectedRequest(requestID int, managerID int, comment string) error {
	return r.DB.Model(&model.Requests{}).Where("id = ?", requestID).Updates(map[string]interface{}{
		"status":     "rejected",
		"manager_id": managerID,
		"comment":    comment,
	}).Error
}

func (r *RequestRepository) CancelledRequest(requestID int) error {
	return r.DB.Model(&model.Requests{}).
		Where("id = ? AND status = ?", requestID, "pending").
		Update("status", "cancelled").Error
}
