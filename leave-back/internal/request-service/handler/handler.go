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

}
