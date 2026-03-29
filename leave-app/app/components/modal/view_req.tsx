"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

type LeaveRequest = {
  id: number;
  leave_type: string;
  start_date: string;
  end_date: string;
  start_half_day_type: string | null;
  end_half_day_type: string | null;
  total_day: number;
  reason: string;
  status: string;
  comment: string;
  manager_name: string;
};

type ViewReqModalProps = {
  open: boolean;
  onClose: () => void;
  requestId: number | null;
  fromRequestPage?: boolean;
  fromDashboardPage?: boolean;
};

const ViewReqModal: React.FC<ViewReqModalProps> = ({
  open,
  onClose,
  requestId,
  fromRequestPage,
  fromDashboardPage,
}) => {
  const [request, setRequest] = useState<LeaveRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const userID = Cookies.get("user_id");
    if (userID) {
      setUserID(userID);
    }
  }, []);

  useEffect(() => {
    if (!open) {
      // reset state เมื่อปิด modal
      setRequest(null);
      setComment("");
      setError("");
      setSuccess("");
      setIsSubmitting(false);
      return;
    }

    if (requestId === null) return;

    const fetchRequestDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/api/requests/request-detail/${requestId}`
        );
        if (!response.ok) throw new Error("Failed to fetch request details");
        const data = await response.json();
        setRequest(data.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load request details");
      } finally {
        setLoading(false);
      }
    };

    fetchRequestDetails();
  }, [open, requestId]);

  const getManagerID = () => parseInt(Cookies.get("user_id") || "0");

  const handleApprove = async () => {
    if (comment.trim() === "") {
      setError("Please provide a comment before approving");
      return;
    }
    setIsSubmitting(true);
    setError("");
    setSuccess("");
    try {
      const response = await fetch(
        `http://localhost:8080/api/requests/approve-request`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            request_id: requestId,
            manager_id: getManagerID(),
            comment,
          }),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "Failed to approve leave request");
        return;
      }
      setSuccess("Request approved successfully!");
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      console.error(error);
      setError("An error occurred while approving the request");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (comment.trim() === "") {
      setError("Please provide a comment before rejecting");
      return;
    }
    setIsSubmitting(true);
    setError("");
    setSuccess("");
    try {
      const response = await fetch(
        `http://localhost:8080/api/requests/reject-request`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            request_id: requestId,
            manager_id: getManagerID(),
            comment,
          }),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "Failed to reject leave request");
        return;
      }
      setSuccess("Request rejected successfully!");
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      console.error(error);
      setError("An error occurred while rejecting the request");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async () => {
    setIsSubmitting(true);
    setError("");
    setSuccess("");
    const payload = {
      request_id: requestId,
      user_id: userID,
    }
    try {
      const response = await fetch(
        `http://localhost:8080/api/requests/cancel-request`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            request_id: requestId,
            user_id: Number(userID),
          }),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "Failed to cancel leave request");
        return;
      }
      setSuccess("Request canceled successfully!");
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      console.error(error);
      setError("An error occurred while canceling the request");
    } finally {
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
        <h2 className="text-xl font-bold mb-4 text-gray-700">รายละเอียดใบลา</h2>

        {/* แยก loading state ออกจาก modal ไม่ให้ทับ content */}
        {loading ? (
          <div className="text-center py-8 text-gray-400">Loading...</div>
        ) : request ? (
          <>
            <div className="mb-2">
              <span className="font-medium text-gray-700">ประเภทการลา: </span>
              <span className="text-gray-500">{request.leave_type}</span>
            </div>
            <div className="mb-2">
              <span className="font-medium text-gray-700">วันที่เริ่มต้น: </span>
              <span className="text-gray-500">{request.start_date}{request.start_half_day_type && ` (${request.start_half_day_type})`}</span>
            </div>
            <div className="mb-2">
              <span className="font-medium text-gray-700">วันที่สิ้นสุด: </span>
              <span className="text-gray-500">
                {request.start_date !== request.end_date && (
                        <>
                          {request.end_date}
                          {request.end_half_day_type === "morning" &&
                            " (Morning)"}
                          {request.end_half_day_type === "afternoon" &&
                            " (Afternoon)"}
                        </>
                      )}
              </span>
            </div>
            <div className="mb-2">
              <span className="font-medium text-gray-700">จำนวนวัน: </span>
              <span className="text-gray-500">{request.total_day}</span>
            </div>
            <div className="mb-2">
              <span className="font-medium text-gray-700">เหตุผล: </span>
              <span className="text-gray-500">{request.reason}</span>
            </div>
            {request.manager_name && (
              <div className="mb-2">
                <span className="font-medium text-gray-700">ผู้อนุมัติ: </span>
                <span className="text-gray-500">{request.manager_name}</span>
              </div>
            )}
            {request.comment && (
              <div className="mb-2">
                <span className="font-medium text-gray-700">ความคิดเห็น: </span>
                <span className="text-gray-500">{request.comment}</span>
              </div>
            )}

            {fromRequestPage && (
              <div className="mb-2 mt-3">
                <label className="font-medium text-gray-700 block mb-1">
                  ความคิดเห็น:
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-2 py-1 w-full text-gray-700"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="กรอกความคิดเห็น..."
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 text-red-400">
            {error || "ไม่พบข้อมูล"}
          </div>
        )}

        {error && request && (
          <p className="text-red-500 border border-red-500 rounded-md w-full p-2 mb-2 text-sm">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-500 border border-green-500 rounded-md w-full p-2 mb-2 text-sm">
            {success}
          </p>
        )}

        {fromRequestPage && request && (
          <div className="flex justify-end space-x-2 mt-4">
            <button
              className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleApprove}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Approve"}
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 cursor-pointer text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleReject}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Reject"}
            </button>
          </div>
        )}

        {fromDashboardPage && request?.status === "pending" && (
          <div className="flex justify-end mt-4">
            <button
              className="bg-yellow-500 hover:bg-yellow-700 cursor-pointer text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Cancel Request"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewReqModal;