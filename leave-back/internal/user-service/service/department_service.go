package service

import "leave-back/shared/model"

func (s *UserService) GetAllDepartments() ([]model.Departments, error) {
	departments, err := s.AppRepo.GetAllDepartments()
	if err != nil {
		return nil, err
	}
	return departments, nil
}

func (s *UserService) CreateDepartment(name string) error {
	return s.AppRepo.CreateDepartment(name)
}
