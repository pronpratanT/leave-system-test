package model

type Users struct {
	ID         int    `gorm:"column:id" json:"id"`
	UserName   string `gorm:"column:username" json:"username"`
	Password   string `gorm:"column:password" json:"password"`
	Name       string `gorm:"column:name" json:"name"`
	Role       string `gorm:"column:role" json:"role"`
	Department int    `gorm:"column:department" json:"department"`
}

func (Users) TableName() string {
	return "users"
}
