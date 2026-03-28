package dto

type CreateRequest struct {
	UserID      int    `json:"user_id" binding:"required"`
	LeaveTypeID int    `json:"leave_type_id" binding:"required"`
	StartDate   string `json:"start_date" binding:"required"`
	EndDate     string `json:"end_date" binding:"required"`
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
