package handler

import (
	"leave-back/internal/user-service/service"

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
	//middleware.JWTAuthMiddleware(),
	r.GET("/leave-balances/:userID", h.GetLeaveBalancesByUserID)
}
