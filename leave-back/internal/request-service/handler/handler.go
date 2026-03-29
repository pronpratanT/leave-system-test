package handler

import (
	"leave-back/internal/request-service/service"
	"leave-back/shared/middleware"

	"github.com/gin-gonic/gin"
)

type RequestHandler struct {
	Service *service.RequestService
}

func NewRequestHandler(s *service.RequestService) *RequestHandler {
	return &RequestHandler{Service: s}
}

func RequestRoutes(r *gin.RouterGroup, h *RequestHandler) {
	r.GET("/leave-types",  middleware.JWTAuthMiddleware(), h.GetAllLeaveTypes)
	r.POST("/leave-types", middleware.JWTAuthMiddleware(), h.CreateLeaveTypes)
	r.GET("/holidays", h.GetAllHolidays)
	r.POST("/holidays", middleware.JWTAuthMiddleware(), h.CreateHoliday)
	r.GET("/requests-history/:userID", middleware.JWTAuthMiddleware(), h.GetRequestsHistoryByUserID)
	r.GET("/request-detail/:requestID", middleware.JWTAuthMiddleware(), h.GetRequestDetailByID)
	r.POST("/create-request", middleware.JWTAuthMiddleware(), h.CreateRequest)
	r.POST("/cancel-request", middleware.JWTAuthMiddleware(), h.CancelRequest)
	r.POST("/approve-request", middleware.JWTAuthMiddleware(), h.ApprovedRequest)
	r.POST("/reject-request", middleware.JWTAuthMiddleware(), h.RejectedRequest)
	r.GET("/department-requests/:departmentID", middleware.JWTAuthMiddleware(), h.GetAllLeaveRequestsByUserDepartmentID)
}
