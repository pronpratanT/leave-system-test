package handler

func (h *RequestHandler) GetRequestsHistoryByUserID(c *gin.Context) {
	userID, err := strconv.Atoi(c.Param("userID"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid user ID",
		})
		return
	}
	data, err := h.Service.GetRequestsHistoryByUserID(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to retrieve data",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": data,
		"total": len(data),
	})
}

func (h *RequestHandler) GetRequestDetailByID(c *gin.Context) {
	requestID, err := strconv.Atoi(c.Param("requestID"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request ID",
		})
		return
	}
	data, err := h.Service.GetRequestDetailByID(requestID)
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

func (r *RequestHandler) CreateRequest(c *gin.Context) {
	var req dto.CreateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request body",
		})
		return
	}
	if err := h.Service.CreateRequest(req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create request",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Request created successfully",
	})
}

func (r *RequestHandler) CancelRequest(c *gin.Context) {
	requestID, err := strconv.Atoi(c.Param("requestID"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request ID",
		})
		return
	}
	userID, err := strconv.Atoi(c.Query("userID"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid user ID",
		})
		return
	}
	if err := h.Service.CancelRequest(requestID, userID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to cancel request",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Request canceled successfully",
	})
}

func (r *RequestHandler) ApprovedRequest(c *gin.Context) {
	requestID, err := strconv.Atoi(c.Param("requestID"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request ID",
		})
		return
	}
	managerID, err := strconv.Atoi(c.Query("managerID"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid manager ID",
		})
		return
	}
	comment := c.Query("comment")
	if err := h.Service.ApprovedRequest(requestID, managerID, comment); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to approve request",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Request approved successfully",
	})
}

func (r *RequestHandler) RejectedRequest(c *gin.Context) {
	requestID, err := strconv.Atoi(c.Param("requestID"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request ID",
		})
		return
	}
	managerID, err := strconv.Atoi(c.Query("managerID"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid manager ID",
		})
		return
	}
	comment := c.Query("comment")
	if err := h.Service.RejectedRequest(requestID, managerID, comment); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to reject request",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Request rejected successfully",
	})
}
