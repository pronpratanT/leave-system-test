package model

type LeaveTypes struct {
	ID    int    `gorm:"column:id" json:"id"`
	Name  string `gorm:"column:name" json:"name"`
	Quota int    `gorm:"column:quota" json:"quota"`
}

func (LeaveTypes) TableName() string {
	return "leave_types"
}
