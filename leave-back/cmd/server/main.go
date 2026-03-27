package main

import (
	usrrouter "leave-back/internal/user-service/app/router"
	usrhandler "leave-back/internal/user-service/handler"
	usrrepo "leave-back/internal/user-service/repository"
	usrservice "leave-back/internal/user-service/service"

	reqrouter "leave-back/internal/request-service/app/router"
	reqhandler "leave-back/internal/request-service/handler"
	reqrepo "leave-back/internal/request-service/repository"
	reqservice "leave-back/internal/request-service/service"

	config "leave-back/shared/config"
	db "leave-back/shared/connection"
	"leave-back/shared/middleware"

	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadConfig()

	appDB := db.ConnectDB()

	usrRepo := usrrepo.NewUserRepository(appDB)
	reqRepo := reqrepo.NewRequestRepository(appDB)

	usrService := usrservice.NewUserService(usrRepo, reqRepo)
	usrHandler := usrhandler.NewUserHandler(usrService)

	reqService := reqservice.NewRequestService(reqRepo, usrRepo)
	reqHandler := reqhandler.NewRequestHandler(reqService)

	r := gin.Default()
	r.Use(middleware.CORSMiddleware())
	usrrouter.UserRouter(r, usrHandler)
	reqrouter.RequestRouter(r, reqHandler)

	r.Run(":8080")
}
