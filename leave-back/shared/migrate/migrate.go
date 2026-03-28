package migrate

import (
	db "leave-back/shared/connection"
	"leave-back/shared/model"
	"log"
)

func AutoMigrate() error {
	database := db.ConnectDB()

	if err := database.AutoMigrate(
		&model.Departments{},
		&model.Holidays{},
		&model.LeaveBalances{},
		&model.LeaveTypes{},
		&model.Requests{},
		&model.Users{},
	); err != nil {
		log.Println("auto migrate failed:", err)
		return err
	}

	if err := seedLeaveTypes(database); err != nil {
 		log.Println("seed leave types failed:", err)
 		return err
 	}

	if err := seedDepartments(database); err != nil {
		log.Println("seed departments failed:", err)
		return err
	}
	return nil
}
// seedDepartments inserts mockup departments if not exists
func seedDepartments(database *gorm.DB) error {
	var count int64
	if err := database.Model(&model.Departments{}).Count(&count).Error; err != nil {
		return err
	}
	if count > 0 {
		return nil // already seeded
	}
	departments := []model.Departments{
		{Name: "HR"},
		{Name: "IT"},
		{Name: "Marketing"},
	}
	for _, dept := range departments {
		if err := database.Create(&dept).Error; err != nil {
			return err
		}
	}
	return nil
}

// seedLeaveTypes inserts mockup leave types if not exists
func seedLeaveTypes(database *gorm.DB) error {
	var count int64
	if err := database.Model(&model.LeaveTypes{}).Count(&count).Error; err != nil {
		return err
	}
	if count > 0 {
		return nil // already seeded
	}
	leaveTypes := []model.LeaveTypes{
		{Name: "Annual Leave", Quota: 10},
		{Name: "Sick Leave", Quota: 30},
		{Name: "Personal Leave", Quota: 6},
	}
	for _, lt := range leaveTypes {
		if err := database.Create(&lt).Error; err != nil {
			return err
		}
	}
	return nil
}
