package service

import (
	"leave-back/internal/request-service/dto"
	"leave-back/shared/model"
)

func (s *RequestService) GetAllHolidays() ([]model.Holidays, error) {
	return s.AppRepo.GetAllHolidays()
}

func (s *RequestService) CreateHoliday(holiday []dto.CreateHolidays) error {
	return s.AppRepo.CreateHoliday(holiday)
}
