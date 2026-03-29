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
	UserID   int    `json:"user_id"`
	UserName string `json:"username"`
	Name     string `json:"name"`
	Role	 string `json:"role"`
	Department string `json:"department"`
	DepartmentID int    `json:"department_id"`
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

type LeaveBalanceResponse struct {
	LeaveType string  `json:"leave_type"`
	Balance   float64 `json:"balance"`
}
