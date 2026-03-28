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

type RequestHistoryResponse struct {
	ID          int    `json:"id"`
	LeaveType   string `json:"leave_type"`
	StartDate   string `json:"start_date"`
	EndDate     string `json:"end_date"`
	StartHalfDayType string `json:"start_half_day_type"` // "morning", "afternoon", or "" (none)
	EndHalfDayType   string `json:"end_half_day_type"`   // "morning", "afternoon", or "" (none)
	TotalDay    float64 `json:"total_day"`
	Status      string `json:"status"`
	Reason      string `json:"reason"`
}

type RequestDetailResponse struct {
	ID          int    `json:"id"`
	LeaveType   string `json:"leave_type"`
	StartDate   string `json:"start_date"`
	EndDate     string `json:"end_date"`
	TotalDay    float64 `json:"total_day"`
	StartHalfDayType string `json:"start_half_day_type"` // "morning", "afternoon", or "" (none)
	EndHalfDayType   string `json:"end_half_day_type"`   // "morning", "afternoon", or "" (none)
	TotalDay    float64 `json:"total_day"`
	Status      string `json:"status"`
	Reason      string `json:"reason"`
	Comment     string `json:"comment"`
	ManagerName string `json:"manager_name"`
}