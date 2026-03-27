package model

type LeaveTypes struct {
	ID    int     `gorm:"column:id" json:"id"`
	Name  string  `gorm:"column:name" json:"name"`
	Quota float64 `gorm:"column:quota" json:"quota"`
}

func (LeaveTypes) TableName() string {
	return "leave_types"
}
