package service

import "leave-back/internal/user-service/dto"

func (s *UserService) GetLeaveBalancesByUserID(userID int) ([]dto.LeaveBalanceResponse, error) {
	leaveBalances, err := s.AppRepo.GetLeaveBalancesByUserID(userID)
	if err != nil {
		return nil, err
	}
	leaveTypes, err := s.ReqRepo.GetAllLeaveTypes()
	if err != nil {
		return nil, err
	}
	var response []dto.LeaveBalanceResponse
	for _, balance := range leaveBalances {
		var leaveTypeName string
		for _, leaveType := range leaveTypes {
			if leaveType.ID == balance.LeaveTypeID {
				leaveTypeName = leaveType.Name
				break
			}
		}
		response = append(response, dto.LeaveBalanceResponse{
			LeaveType: leaveTypeName,
			Balance:   balance.Balance,
		})
	}

	return response, nil
}
