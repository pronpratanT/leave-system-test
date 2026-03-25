package main

import (
	"leave-back/config"
	"leave-back/internal/handler"

	db "leave-back/connection"

	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadConfig()

	db.ConnectDB()

	r := gin.Default()
	r.GET("/api/leave", handler.LeaveHandler)
	r.Run(":8080")
}
