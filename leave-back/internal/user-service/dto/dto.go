package dto

type SignUpRequest struct {
	UserName   string `json:"username" binding:"required"`
	Password   string `json:"password" binding:"required"`
	Name       string `json:"name" binding:"required"`
	Role       string `json:"role" binding:"required"`
	DepartmentID int    `json:"department_id" binding:"required"`
}

type SignInRequest struct {
	UserName string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type SignInResponse struct {
	UserName string `json:"username"`
	Token    string `json:"token"`
}

type CreateLeaveBalance struct {
	UserID      int     `json:"user_id"`
	LeaveTypeID int     `json:"leave_type_id"`
	Balance     float64 `json:"balance"`
}

type CreateDepartment struct {
	Name string `json:"name" binding:"required"`
}
