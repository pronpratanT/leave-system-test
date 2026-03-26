package dto

type CreateRequest struct {
	UserID      int    `json:"user_id" binding:"required"`
	LeaveTypeID int    `json:"leave_type_id" binding:"required"`
	StartDate   string `json:"start_date" binding:"required"`
	EndDate     string `json:"end_date" binding:"required"`
	Reason      string `json:"reason" binding:"required"`
}

type CreateLeaveType struct {
	Name  string `json:"name" binding:"required"`
	Quota int    `json:"quota" binding:"required"`
}
