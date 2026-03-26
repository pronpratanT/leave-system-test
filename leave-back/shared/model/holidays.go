package model

type Holidays struct {
	ID   int    `gorm:"column:id" json:"id"`
	Date string `gorm:"column:date" json:"date"`
	Name string `gorm:"column:name" json:"name"`
}

func (Holidays) TableName() string {
	return "holidays"
}
