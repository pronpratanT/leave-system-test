package model

type LeaveBalances struct {
	ID          int `gorm:"column:id" json:"id"`
	UserID      int `gorm:"column:user_id" json:"user_id"`
	LeaveTypeID int `gorm:"column:leave_type_id" json:"leave_type_id"`
	Balance     int `gorm:"column:balance" json:"balance"`
}

func (LeaveBalances) TableName() string {
	return "leave_balances"
}
