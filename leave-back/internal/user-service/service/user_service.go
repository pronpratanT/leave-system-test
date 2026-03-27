package service

import (
	"errors"
	"leave-back/internal/user-service/dto"
	"leave-back/shared/auth"
	"leave-back/shared/model"

	"golang.org/x/crypto/bcrypt"
)

func (s *UserService) SignUp(user *dto.SignUpRequest) error {
	duplicate, err := s.AppRepo.CheckDuplicateUsername(user.UserName)
	if err != nil {
		return err
	}
	if duplicate {
		return errors.New("Username already exists")
	}

	hashPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(hashPassword)

	userID, err := s.AppRepo.SignUp(user)
	if err != nil {
		return err
	}

	leaveTypes, err := s.ReqRepo.GetAllLeaveTypes()
	if err != nil {
		return err
	}

	for _, types := range leaveTypes {
		balance := dto.CreateLeaveBalance{
			UserID:      userID,
			LeaveTypeID: types.ID,
			Balance:     types.Quota,
		}
		if err := s.AppRepo.CreateLeaveBalanceByUserID(balance); err != nil {
			return err
		}
	}
	return nil
}

func (s *UserService) SignIn(req *dto.SignInRequest) (*dto.SignInResponse, error) {
	user, err := s.AppRepo.SignIn(req.UserName)
	if err != nil {
		return nil, errors.New("Invalid username or password")
	}
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password))
	if err != nil {
		return nil, errors.New("Invalid username or password")
	}
	token, err := auth.GenerateJWT(user.UserName)
	if err != nil {
		return nil, errors.New("Failed to generate token")
	}
	return &dto.SignInResponse{
		UserName: user.UserName,
		Token:    token,
	}, nil
}

func (s *UserService) GetUserByID(userID int) (*model.Users, error) {
	return s.AppRepo.GetUserByID(userID)
}
