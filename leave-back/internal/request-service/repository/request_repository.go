package repository

import (
	"leave-back/shared/model"
)

func (r *RequestRepository) CreateRequest(request *model.Requests) error {
	return r.DB.Create(&request).Error
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

func (r *RequestRepository) CheckOverlappingRequests(userID int, startDate, endDate string) (bool, error) {
	var count int64
	err := r.DB.Model(&model.Requests{}).
		Where("user_id = ? AND status IN (?, ?) AND start_date <= ? AND end_date >= ?",
			userID, "pending", "approved", endDate, startDate).
		Count(&count).Error
	return count > 0, err
}