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
	return nil
}
