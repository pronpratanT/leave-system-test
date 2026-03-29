"use client";

import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import RequestModal from "../components/modal/create_req";
import ViewReqModal from "../components/modal/view_req";
import Cookies from "js-cookie";

type LeaveBalance = {
  leave_type: string;
  balance: number;
};

type LeaveRequest = {
  id: number;
  leave_type: string;
  start_date: string;
  end_date: string;
  start_half_day_type: string;
  end_half_day_type: string;
  total_day: number;
  reason: string;
  status: string;
};

function DashboardPage() {
  const [useID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [requestModal, setRequestModal] = useState(false);
  const [viewReqModal, setViewReqModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(
    null,
  );
  const [leaveBalances, setLeaveBalances] = useState<LeaveBalance[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[] | null>([]);

  useEffect(() => {
    const userID = Cookies.get("user_id");
    const userName = Cookies.get("username");
    const role = Cookies.get("role");
    const department = Cookies.get("department");
    if (userName) {
      setUserName(userName);
    }
    if (userID) {
      setUserID(userID);
    }
    if (role) {
      setRole(role);
    }
    if (department) {
      setDepartment(department);
    }
  }, []);

  const fetchLeaveBalance = React.useCallback(async () => {
    if (!useID) return;
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/leave-balances/${useID}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch leave balance");
      }
      const data = await response.json();
      setLeaveBalances(data.data);
    } catch (error) {
      console.error(error);
    }
  }, [useID]);

  const fetchLeaveRequests = React.useCallback(async () => {
    if (!useID) return;
    try {
      const response = await fetch(
        `http://localhost:8080/api/requests/requests-history/${useID}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch leave requests");
      }
      const data = await response.json();
      setLeaveRequests(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [useID]);

  useEffect(() => {
    fetchLeaveBalance();
    fetchLeaveRequests();
  }, [fetchLeaveBalance, fetchLeaveRequests]);

  return (
    <>
      <main className="flex flex-col items-center justify-center p-24 bg-gray-100 min-h-screen">
        {/* user info */}
        <div className="mb-6 w-full max-w-5xl bg-white rounded-lg shadow-lg shadow-gray-400 p-5">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            User Information
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">User Info</p>
              <p className="text-gray-700">{userName}</p>
              <p className="text-gray-700">{role}</p>
              <p className="text-gray-700">{department}</p>
            </div>
            <div>
              <p className="text-gray-500">Leave Balances</p>
              {leaveBalances.length > 0 ? (
                <ul className="text-gray-700">
                  {leaveBalances.map((balance) => (
                    <li key={balance.leave_type}>
                      {balance.leave_type}: {balance.balance}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700">No leave balance data available</p>
              )}
            </div>
          </div>
        </div>
        {/* table header */}
        <div className="pl-5 pr-5 pt-5 w-full max-w-5xl bg-white rounded-t-lg shadow-lg shadow-gray-400">
          <div className="flex justify-between mb-6 items-center p-3">
            <h1 className="text-xl font-semibold text-gray-700 flex items-center">
              Leave Requests
            </h1>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
              onClick={() => setRequestModal(true)}
            >
              <FaPlus className="inline-block mr-2" />
              Request
            </button>
          </div>
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden text-base">
            <colgroup>
              <col style={{ width: "50px" }} />
              <col style={{ width: "140px" }} />
              <col style={{ width: "120px" }} />
              <col style={{ width: "120px" }} />
              <col style={{ width: "90px" }} />
              <col style={{ width: "180px" }} />
              <col style={{ width: "100px" }} />
              <col style={{ width: "120px" }} />
            </colgroup>
            <thead>
              <tr className="border-b-2 border-gray-400">
                <th className="py-3 px-2 border-b text-center font-normal text-gray-500">
                  No.
                </th>
                <th className="py-3 px-2 border-b text-left font-normal text-gray-500">
                  LeaveType
                </th>
                <th className="py-3 px-2 border-b text-center font-normal text-gray-500">
                  Start Date
                </th>
                <th className="py-3 px-2 border-b text-center font-normal text-gray-500">
                  End Date
                </th>
                <th className="py-3 px-2 border-b text-center font-normal text-gray-500">
                  Total
                </th>
                <th className="py-3 px-2 border-b text-left font-normal text-gray-500">
                  Reason
                </th>
                <th className="py-3 px-2 border-b text-center font-normal text-gray-500">
                  Status
                </th>
                <th className="py-3 px-2 border-b text-center font-normal text-gray-500">
                  Action
                </th>
              </tr>
            </thead>
          </table>
        </div>
        {/* table body */}
        <div className="pl-5 pr-5 pb-5 w-full max-w-5xl bg-white rounded-b-lg shadow-lg shadow-gray-400">
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden text-base">
            <colgroup>
              <col style={{ width: "50px" }} />
              <col style={{ width: "140px" }} />
              <col style={{ width: "120px" }} />
              <col style={{ width: "120px" }} />
              <col style={{ width: "90px" }} />
              <col style={{ width: "180px" }} />
              <col style={{ width: "100px" }} />
              <col style={{ width: "120px" }} />
            </colgroup>
            <tbody>
              {(leaveRequests?.length ?? 0) > 0 ? (
                (leaveRequests ?? []).map((request, index) => (
                  <tr key={request.id} className="border-b border-gray-200">
                    <td className="py-3 px-2 text-center text-gray-500">
                      {index + 1}
                    </td>
                    <td className="py-3 px-2 text-left text-gray-500">
                      {request.leave_type}
                    </td>
                    <td className="py-3 px-2 text-center text-gray-500">
                      {request.start_date}{" "}
                      {request.start_half_day_type === "morning" &&
                        " (Morning)"}
                      {request.start_half_day_type === "afternoon" &&
                        " (Afternoon)"}
                    </td>
                    <td className="py-3 px-2 text-center text-gray-500">
                      {request.start_date !== request.end_date && (
                        <>
                          {request.end_date}
                          {request.end_half_day_type === "morning" &&
                            " (Morning)"}
                          {request.end_half_day_type === "afternoon" &&
                            " (Afternoon)"}
                        </>
                      )}
                    </td>
                    <td className="py-3 px-2 text-center text-gray-500">
                      {request.total_day}
                    </td>
                    <td className="py-3 px-2 text-left text-gray-500">
                      {request.reason}
                    </td>
                    <td className="py-3 px-2 text-center text-gray-500">
                      {request.status === "approved" ? (
                        <span className="text-green-500 font-semibold border-green-500 border px-2 py-1 rounded-lg">
                          Approved
                        </span>
                      ) : request.status === "pending" ? (
                        <span className="text-yellow-500 font-semibold border-yellow-500 border px-2 py-1 rounded-lg">
                          Pending
                        </span>
                      ) : request.status === "rejected" ? (
                        <span className="text-red-500 font-semibold border-red-500 border px-2 py-1 rounded-lg">
                          Rejected
                        </span>
                      ) : (
                        <span className="text-gray-500 font-semibold border-gray-500 border px-2 py-1 rounded-lg">
                          Canceled
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-2 flex items-center justify-center">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 cursor-pointer"
                        onClick={() => {
                          setViewReqModal(true);
                          setSelectedRequest(request); // Set the selected request data
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="py-3 px-2 border-b text-center text-gray-500"
                  >
                    No leave requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      <RequestModal
        open={requestModal}
        onClose={() => {
          setRequestModal(false);
          fetchLeaveRequests();
          fetchLeaveBalance();
        }}
      />
      <ViewReqModal
        open={viewReqModal}
        onClose={() => {
          setViewReqModal(false)
          fetchLeaveRequests();
          fetchLeaveBalance();
        }}
        requestId={selectedRequest?.id || null} // Pass the selected request ID to the modal
        fromDashboardPage={true}
      />
    </>
  );
}

export default DashboardPage;
