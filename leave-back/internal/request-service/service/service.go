package service

import "leave-back/internal/request-service/repository"

type RequestService struct {
	AppRepository *repository.RequestRepository
}

func NewRequestService(appRepo *repository.RequestRepository) *RequestService {
	return &RequestService{AppRepository: appRepo}
}
