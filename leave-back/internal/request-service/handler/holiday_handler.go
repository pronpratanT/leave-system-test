package handler

import (
	"leave-back/internal/request-service/dto"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *RequestHandler) GetAllHolidays(c *gin.Context) {
	data, err := h.Service.GetAllHolidays()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, data)
}

func (h *RequestHandler) CreateHoliday(c *gin.Context) {
	var holiday []dto.CreateHolidays
	if err := c.ShouldBindJSON(&holiday); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	if err := h.Service.CreateHoliday(holiday); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"status": "created",
	})
}
