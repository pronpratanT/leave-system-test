package config

import "fmt"

type Config struct {
	AppPort string
	AppDB   string
}

var AppConfig *Config

func LoadConfig() {
	host := "postgres"
	port := "5432"
	user := "admin"
	password := 1234
	dbname := "leave_db"

	AppDB := fmt.Sprintf("host=%s port=%s user=%s password=%d dbname=%s sslmode=disable", host, port, user, password, dbname)

	AppConfig = &Config{
		AppPort: port,
		AppDB:   AppDB,
	}
}
