"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from "js-cookie";

interface RequestModalProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

type LeaveType = {
  id: number;
  name: string;
  quota: number;
};

const RequestModal: React.FC<RequestModalProps> = ({
  open,
  onClose,
  children,
}) => {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startHalfDayType, setStartHalfDayType] = useState("");
  const [endHalfDayType, setEndHalfDayType] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [useID, setUserID] = useState("");

  // เช็คว่าเลือกวันเดียวกันหรือเปล่า
  const isSameDay =
    !!startDate &&
    !!endDate &&
    startDate.toDateString() === endDate.toDateString();

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const userID = Cookies.get("user_id");
    if (userID) setUserID(userID);
  }, []);

  useEffect(() => {
    const fetchLeaveType = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/requests/leave-types`);
        if (!response.ok) throw new Error("Failed to fetch leave balance");
        const data = await response.json();
        setLeaveTypes(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLeaveType();
  }, [useID]);

  const handleSubmit = async () => {
    const payload = {
      user_id: Number(useID),
      leave_type_id: Number(leaveType),
      start_date: formatDate(startDate),
      end_date: formatDate(endDate ?? startDate),
      start_half_day_type: startHalfDayType,
      end_half_day_type: endHalfDayType,
      reason: reason,
    };
    console.log("Submitting payload:", payload);
    setError("");
    setSuccess("");
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:8080/api/requests/create-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "Failed to submit leave request");
        setIsSubmitting(false);
        return;
      }
      setSuccess("Leave request submitted successfully");
      setIsSubmitting(false);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error(error);
      setError("Failed to submit leave request");
      setIsSubmitting(false);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold mr-2"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-700">
          Create Leave Request
        </h2>

        {/* Leave Type */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Leave Type</label>
          <select
            className="w-full border border-gray-300 rounded-md p-2 text-gray-700"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            required
          >
            <option value="">Select Leave Type</option>
            {leaveTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div className="mb-2">
          <label className="block text-gray-700 font-medium mb-1">Date Range</label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => {
                  setStartDate(date);
                  // reset endDate ถ้า startDate ใหม่ > endDate เดิม
                  if (date && endDate && date > endDate) {
                    setEndDate(null);
                    setEndHalfDayType("");
                  }
                }}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Select date start"
                dateFormat="dd/MM/yyyy"
                className="w-full border border-gray-300 rounded-md p-2 text-gray-700 text-sm"
                popperProps={{ strategy: "fixed" }}
                portalId="datepicker-portal"
              />
            </div>
            <span className="text-gray-500 text-sm">to</span>
            <div className="relative flex-1">
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => {
                  setEndDate(date);
                  // ถ้าเลือกวันเดียวกับ startDate → reset endHalfDayType
                  if (date && startDate && date.toDateString() === startDate.toDateString()) {
                    setEndHalfDayType("");
                  }
                }}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate ?? undefined}
                disabled={!startDate}
                placeholderText="Select date end"
                dateFormat="dd/MM/yyyy"
                className="w-full border border-gray-300 rounded-md p-2 text-gray-700 text-sm disabled:bg-gray-100 disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed"
                popperProps={{ strategy: "fixed" }}
                portalId="datepicker-portal"
              />
            </div>
          </div>
        </div>

        {/* Half day selects */}
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label className="text-sm text-gray-600 block mb-1">ครึ่งวันต้น:</label>
            <select
              className="w-full border border-gray-300 rounded-md p-1 text-gray-700 text-sm disabled:bg-gray-100 disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed"
              value={startHalfDayType}
              onChange={(e) => setStartHalfDayType(e.target.value)}
              disabled={!startDate}
            >
              <option value="">เต็มวัน</option>
              <option value="morning">ครึ่งวันเช้า</option>
              <option value="afternoon">ครึ่งวันบ่าย</option>
            </select>
          </div>
          <div className="w-1/2">
            <label className="text-sm text-gray-600 block mb-1">
              ครึ่งวันท้าย:
              {isSameDay && (
                <span className="ml-1 text-xs text-gray-400">(วันเดียวกัน)</span>
              )}
            </label>
            <select
              className="w-full border border-gray-300 rounded-md p-1 text-gray-700 text-sm disabled:bg-gray-100 disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed"
              value={endHalfDayType}
              onChange={(e) => setEndHalfDayType(e.target.value)}
              disabled={!endDate || isSameDay} // disabled เมื่อวันเดียวกัน
            >
              <option value="">เต็มวัน</option>
              <option value="morning">ครึ่งวันเช้า</option>
              <option value="afternoon">ครึ่งวันบ่าย</option>
            </select>
          </div>
        </div>

        {/* Reason */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Reason</label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 text-gray-700"
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="text-red-500 border border-red-500 rounded-md w-full p-2 mb-4">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-500 border border-green-500 rounded-md w-full p-2 mb-4">
            {success}
          </p>
        )}

        {/* Action buttons */}
        <div className="mt-6 flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 mr-2 cursor-pointer"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>

      {/* Portal สำหรับ datepicker popup */}
      <div id="datepicker-portal" style={{ zIndex: 9999, position: "relative" }} />
    </div>
  );
};

export default RequestModal;