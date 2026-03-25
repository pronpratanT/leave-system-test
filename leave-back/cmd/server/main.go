package main

import (
	"leave-back/internal/handler"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/api/leave", handler.LeaveHandler)
	r.Run(":8080")
}
