package handler

import (
	"leave-back/internal/user-service/service"
	"leave-back/shared/middleware"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	Service *service.UserService
}

func NewUserHandler(s *service.UserService) *UserHandler {
	return &UserHandler{Service: s}
}

func UserRoutes(r *gin.RouterGroup, h *UserHandler) {
	r.POST("/signup", h.SignUp)
	r.POST("/signin", h.SignIn)
	r.GET("/leave-balances/:userID", middleware.JWTAuthMiddleware(), h.GetLeaveBalancesByUserID)
	r.GET("/departments", h.GetAllDepartments)
	r.POST("/departments", middleware.JWTAuthMiddleware(), h.CreateDepartment)
}
