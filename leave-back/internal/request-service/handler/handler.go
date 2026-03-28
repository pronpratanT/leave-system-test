package handler

import (
	"leave-back/internal/request-service/service"

	"github.com/gin-gonic/gin"
)

type RequestHandler struct {
	Service *service.RequestService
}

func NewRequestHandler(s *service.RequestService) *RequestHandler {
	return &RequestHandler{Service: s}
}

func RequestRoutes(r *gin.RouterGroup, h *RequestHandler) {
	r.GET("/leave-types", h.GetAllLeaveTypes)
	r.POST("/leave-types", h.CreateLeaveTypes)
	r.GET("/holidays", h.GetAllHolidays)
	r.POST("/holidays", h.CreateHoliday)
	r.GET("/requests-history/:userID", h.GetRequestsHistoryByUserID)
	r.GET("/request-detail/:requestID", h.GetRequestDetailByID)
	r.POST("/create-request", h.CreateRequest)
	r.POST("/cancel-request/:requestID", h.CancelRequest)
	r.POST("/approve-request/:requestID", h.ApprovedRequest)
	r.POST("/reject-request/:requestID", h.RejectedRequest)
}
