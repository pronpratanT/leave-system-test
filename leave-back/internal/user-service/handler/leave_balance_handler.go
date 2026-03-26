package handler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (h *UserHandler) GetLeaveBalancesByUserID(c *gin.Context) {
	userID, err := strconv.Atoi(c.Param("userID"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	balances, err := h.Service.GetLeaveBalancesByUserID(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve leave balances"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Leave balances retrieved successfully",
		"data":    balances,
	})
}
