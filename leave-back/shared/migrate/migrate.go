package migrate

import (
	db "leave-back/shared/connection"
	"leave-back/shared/model"
	"log"
	"gorm.io/gorm"
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

	if err := seedHolidays(database); err != nil {
		log.Println("seed holidays failed:", err)
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

// seedHolidays inserts Thai public holidays (excluding weekends) if not exists
func seedHolidays(database *gorm.DB) error {
	var count int64
	if err := database.Model(&model.Holidays{}).Count(&count).Error; err != nil {
		return err
	}
	if count > 0 {
		return nil // already seeded
	}
	holidays := []model.Holidays{
		{Date: "2026-01-01", Name: "วันขึ้นปีใหม่"},
		{Date: "2026-02-26", Name: "วันมาฆบูชา"},
		{Date: "2026-04-06", Name: "วันจักรี"},
		{Date: "2026-04-13", Name: "วันสงกรานต์"},
		{Date: "2026-04-14", Name: "วันสงกรานต์"},
		{Date: "2026-04-15", Name: "วันสงกรานต์"},
		{Date: "2026-05-01", Name: "วันแรงงานแห่งชาติ"},
		{Date: "2026-05-05", Name: "วันฉัตรมงคล"},
		{Date: "2026-05-25", Name: "วันวิสาขบูชา"},
		{Date: "2026-07-01", Name: "วันหยุดครึ่งปีธนาคาร"},
		{Date: "2026-07-18", Name: "วันอาสาฬหบูชา"},
		{Date: "2026-07-19", Name: "วันเข้าพรรษา"},
		{Date: "2026-08-12", Name: "วันแม่แห่งชาติ"},
		{Date: "2026-10-13", Name: "วันคล้ายวันสวรรคต ร.9"},
		{Date: "2026-10-23", Name: "วันปิยมหาราช"},
		{Date: "2026-12-05", Name: "วันพ่อแห่งชาติ"},
		{Date: "2026-12-10", Name: "วันรัฐธรรมนูญ"},
		{Date: "2026-12-31", Name: "วันสิ้นปี"},
	}
	for _, h := range holidays {
		if err := database.Create(&h).Error; err != nil {
			return err
		}
	}
	return nil
}