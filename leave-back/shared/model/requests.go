package model

type Requests struct {
	ID          int    `gorm:"column:id" json:"id"`
	UserID      int    `gorm:"column:user_id" json:"user_id"`
	LeaveTypeID int    `gorm:"column:leave_type_id" json:"leave_type_id"`
	HalfDay     bool   `gorm:"column:half_day" json:"half_day"`
	StartDate   string `gorm:"column:start_date" json:"start_date"`
	EndDate     string `gorm:"column:end_date" json:"end_date"`
	TotalDay    float64 `gorm:"column:total_day" json:"total_day"`
	Reason      string `gorm:"column:reason" json:"reason"`
	Status      string `gorm:"column:status" json:"status"` // pending, approved, rejected
	ManagerID   int    `gorm:"column:manager_id" json:"manager_id"`
	Comment     string `gorm:"column:comment" json:"comment"` // ความเห็นจากผู้จัดการ
	CreatedAt   string `gorm:"column:created_at" json:"created_at"`
	UpdatedAt   string `gorm:"column:updated_at" json:"updated_at"`
}

func (Requests) TableName() string {
	return "requests"
}
