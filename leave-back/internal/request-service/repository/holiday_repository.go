package repository

import (
	"leave-back/internal/request-service/dto"
	"leave-back/shared/model"
)

func (r *RequestRepository) GetAllHolidays() ([]model.Holidays, error) {
	var holidays []model.Holidays
	err := r.DB.Model(&model.Holidays{}).Find(&holidays).Error
	return holidays, err
}

func (r *RequestRepository) CreateHoliday(holidays []dto.CreateHolidays) error {
	var models []model.Holidays
	for _, holiday := range holidays {
		models = append(models, model.Holidays{
			Date: holiday.Date,
			Name: holiday.Name,
		})
	}
	return r.DB.Create(&models).Error
}
