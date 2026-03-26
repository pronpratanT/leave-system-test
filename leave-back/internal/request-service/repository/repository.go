package repository

import "gorm.io/gorm"

type RequestRepository struct {
	DB *gorm.DB
}

func NewRequestRepository(db *gorm.DB) *RequestRepository {
	return &RequestRepository{DB: db}
}
