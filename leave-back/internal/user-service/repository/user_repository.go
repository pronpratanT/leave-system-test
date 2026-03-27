package repository

import (
	"leave-back/internal/user-service/dto"
	"leave-back/shared/model"
)

func (r *UserRepository) SignUp(user *dto.SignUpRequest) (int, error) {
	data := model.Users{
		UserName:   user.UserName,
		Password:   user.Password,
		Name:       user.Name,
		Role:       user.Role,
		Department: user.Department,
	}
	err := r.DB.Create(&data).Error
	return data.ID, err
}

func (r *UserRepository) CheckDuplicateUsername(username string) (bool, error) {
	var count int64
	err := r.DB.Model(&model.Users{}).
		Where("username = ?", username).
		Count(&count).Error
	return count > 0, err
}

func (r *UserRepository) SignIn(username string) (*model.Users, error) {
	var data model.Users
	err := r.DB.Where("username = ?", username).First(&data).Error
	if err != nil {
		return nil, err
	}
	return &data, nil
}

func (r *UserRepository) GetUserByID(userID int) (*model.Users, error) {
	var user model.Users
	err := r.DB.Where("id = ?", userID).First(&user).Error
	return &user, err
}
