package service

import "leave-back/shared/model"

func (s *UserService) GetLeaveBalancesByUserID(userID int) ([]model.LeaveBalances, error) {
	return s.AppRepo.GetLeaveBalancesByUserID(userID)
}
