package model

type Holidys struct {
	ID   int    `gorm:"column:id" json:"id"`
	Date string `gorm:"column:date" json:"date"`
	Name string `gorm:"column:name" json:"name"`
}

func (Holidys) TableName() string {
	return "holidays"
}
