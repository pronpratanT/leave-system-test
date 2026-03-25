package model

type Users struct {
	ID           int    `gorm:"column:id" json:"id"`
	Name         string `gorm:"column:name" json:"name"`
	Role         string `gorm:"column:role" json:"role"`
	DepartmentID int    `gorm:"column:department_id" json:"department_id"`
}

func (Users) TableName() string {
	return "users"
}
