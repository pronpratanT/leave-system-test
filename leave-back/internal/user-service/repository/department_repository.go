package repository

import "leave-back/shared/model"

func (r *UserRepository) GetAllDepartments() ([]model.Departments, error) {
	var departments []model.Departments
	err := r.DB.Find(&departments).Error
	return departments, err
}

func (r *UserRepository) CreateDepartment(name string) error {
	department := model.Departments{
		Name: name,
	}
	return r.DB.Create(&department).Error
}
