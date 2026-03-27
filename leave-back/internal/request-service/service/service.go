package service

import (
	"leave-back/internal/request-service/repository"
	userrepository "leave-back/internal/user-service/repository"
)

type RequestService struct {
	AppRepo *repository.RequestRepository
	UsrRepo *userrepository.UserRepository
}

func NewRequestService(appRepo *repository.RequestRepository, usrRepo *userrepository.UserRepository) *RequestService {
	return &RequestService{AppRepo: appRepo, UsrRepo: usrRepo}
}
