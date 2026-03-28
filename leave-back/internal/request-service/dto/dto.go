package dto

type CreateRequest struct {
	UserID      int    `json:"user_id" binding:"required"`
	LeaveTypeID int    `json:"leave_type_id" binding:"required"`
	StartDate   string `json:"start_date" binding:"required"`
	EndDate     string `json:"end_date"`
	StartHalfDayType string `json:"start_half_day_type"` // "morning", "afternoon", or "" (none)
	EndHalfDayType   string `json:"end_half_day_type"`   // "morning", "afternoon", or "" (none)
	Reason      string `json:"reason" binding:"required"`
}

type CreateLeaveType struct {
	Name  string  `json:"name" binding:"required"`
	Quota float64 `json:"quota" binding:"required"`
}

type CreateHolidays struct {
	Date string `json:"date" binding:"required"`
	Name string `json:"name" binding:"required"`
}

type RequestDetailResponse struct {
	ID          int    `json:"id"`
	LeaveType   string `json:"leave_type"`
	StartDate   string `json:"start_date"`
	EndDate     string `json:"end_date"`
	TotalDay    float64 `json:"total_day"`
	StartHalfDayType string `json:"start_half_day_type"` // "morning", "afternoon", or "" (none)
	EndHalfDayType   string `json:"end_half_day_type"`   // "morning", "afternoon", or "" (none)
	Status      string `json:"status"`
	Reason      string `json:"reason"`
	Comment     string `json:"comment"`
	ManagerName string `json:"manager_name"`
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