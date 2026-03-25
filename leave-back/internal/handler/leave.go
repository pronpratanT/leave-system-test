package handler

import (
	"net/http"
)

func LeaveHandler(w http.ResponseWriter, r *http.Request) {
    // ...logic...
    w.Write([]byte("Leave API"))
}
