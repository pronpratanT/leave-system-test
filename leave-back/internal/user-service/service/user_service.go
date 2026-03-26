package service

import (
	"errors"
	"leave-back/internal/user-service/dto"
	"leave-back/shared/auth"

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

	return s.AppRepo.SignUp(user)
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
