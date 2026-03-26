package service

import "leave-back/internal/request-service/repository"

type RequestService struct {
	AppRepo *repository.RequestRepository
}

func NewRequestService(appRepo *repository.RequestRepository) *RequestService {
	return &RequestService{AppRepo: appRepo}
}
