package model

type Departments struct {
	ID   int    `gorm:"column:id" json:"id"`
	Name string `gorm:"column:name" json:"name"`
}

func (Departments) TableName() string {
	return "departments"
}
