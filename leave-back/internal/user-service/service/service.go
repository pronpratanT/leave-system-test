package service

import "leave-back/internal/user-service/repository"

type UserService struct {
	AppRepo *repository.UserRepository
}

func NewUserService(appRepo *repository.UserRepository) *UserService {
	return &UserService{AppRepo: appRepo}
}
