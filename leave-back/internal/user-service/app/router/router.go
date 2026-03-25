package router

import (
	"leave-back/internal/user-service/handler"

	"github.com/gin-gonic/gin"
)

func UserRouter(r *gin.Engine, h *handler.UserHandler) *gin.Engine {
	api := r.Group("/api")
	handler.UserRoutes(api.Group("/users"), h)

	return r
}
