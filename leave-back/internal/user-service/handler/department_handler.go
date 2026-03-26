package handler

import (
	"leave-back/internal/user-service/dto"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *UserHandler) GetAllDepartments(c *gin.Context) {
	departments, err := h.Service.GetAllDepartments()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, departments)
}

func (h *UserHandler) CreateDepartment(c *gin.Context) {
	var req dto.CreateDepartment
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request body",
		})
		return
	}
	if err := h.Service.CreateDepartment(req.Name); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"message": "Department created successfully",
	})
}
