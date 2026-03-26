package handler

import (
	"leave-back/internal/request-service/dto"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *RequestHandler) GetAllLeaveTypes(c *gin.Context) {
	data, err := h.Service.GetAllLeaveTypes()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to retrieve data",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": data,
	})
}

func (h *RequestHandler) CreateLeaveTypes(c *gin.Context) {
	var dto dto.CreateLeaveType
	if err := c.ShouldBindJSON(&dto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request body",
		})
		return
	}
	if err := h.Service.CreateLeaveType(dto); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create leave type",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Leave type created successfully",
	})
}
