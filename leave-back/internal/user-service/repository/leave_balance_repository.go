package repository

import (
	"leave-back/internal/user-service/dto"
	"leave-back/shared/model"
)

func (r *UserRepository) GetLeaveBalancesByUserID(userID int) ([]model.LeaveBalances, error) {
	var balances []model.LeaveBalances
	err := r.DB.Where("user_id = ?", userID).Find(&balances).Error
	return balances, err
}

func (r *UserRepository) CreateLeaveBalanceByUserID(balanceDto dto.CreateLeaveBalance) error {
	balance := model.LeaveBalances{
		UserID:      balanceDto.UserID,
		LeaveTypeID: balanceDto.LeaveTypeID,
		Balance:     balanceDto.Balance,
	}
	return r.DB.Create(&balance).Error
}

func (r *UserRepository) DeductLeaveBalance(userID, leaveTypeID int, days float64) error {
	return r.DB.Model(&model.LeaveBalances{}).
		Where("user_id = ? AND leave_type_id = ?", userID, leaveTypeID).
		Update("balance = balance - ?", days).Error
}

func (r *UserRepository) RestoreLeaveBalance(userID, leaveTypeID int, days float64) error {
	return r.DB.Model(&model.LeaveBalances{}).
		Where("user_id = ? AND leave_type_id = ?", userID, leaveTypeID).
		Update("balance", gorm.Expr("balance + ?", days)).Error
}
