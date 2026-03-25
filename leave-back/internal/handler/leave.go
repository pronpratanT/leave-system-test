package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func LeaveHandler(c *gin.Context) {
	// ...logic...
	c.String(http.StatusOK, "Leave API")
}
