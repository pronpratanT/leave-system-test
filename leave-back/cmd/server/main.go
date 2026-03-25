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

	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadConfig()

	appDB := db.ConnectDB()

	usrRepo := usrrepo.NewUserRepository(appDB)
	usrService := usrservice.NewUserService(usrRepo)
	usrHandler := usrhandler.NewUserHandler(usrService)

	reqRepo := reqrepo.NewRequestRepository(appDB)
	reqService := reqservice.NewRequestService(reqRepo)
	reqHandler := reqhandler.NewRequestHandler(reqService)

	r := gin.Default()
	usrrouter.UserRouter(r, usrHandler)
	reqrouter.RequestRouter(r, reqHandler)

	r.Run(":8080")
}
