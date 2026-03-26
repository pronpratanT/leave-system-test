package service

import (
	reqrepo "leave-back/internal/request-service/repository"
	"leave-back/internal/user-service/repository"
)

type UserService struct {
	AppRepo *repository.UserRepository
	ReqRepo *reqrepo.RequestRepository
}

func NewUserService(appRepo *repository.UserRepository, reqRepo *reqrepo.RequestRepository) *UserService {
	return &UserService{AppRepo: appRepo, ReqRepo: reqRepo}
}
