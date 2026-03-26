package dto

type SignUpRequest struct {
	UserName   string `json:"username" binding:"required"`
	Password   string `json:"password" binding:"required"`
	Name       string `json:"name" binding:"required"`
	Role       string `json:"role" binding:"required"`
	Department int    `json:"department" binding:"required"`
}

type SignInRequest struct {
	UserName string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type SignInResponse struct {
	UserName string `json:"username"`
	Token    string `json:"token"`
}
