package main

import (
	"leave-back/internal/handler"
	"net/http"
)

func main() {
	http.HandleFunc("/api/leave", handler.LeaveHandler)
	http.ListenAndServe(":8080", nil)
}
