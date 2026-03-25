package service

import "leave-back/internal/user-service/repository"

type UserService struct {
	AppRepository *repository.UserRepository
}

func NewUserService(appRepo *repository.UserRepository) *UserService {
	return &UserService{AppRepository: appRepo}
}
