"use client";

import React, { use, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import RequestModal from "../components/modal/create_req";
import Cookies from "js-cookie";

type LeaveBalance = {
  leave_type: string;
  balance: number;
};

function DashboardPage() {
  const [useID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [requestModal, setRequestModal] = useState(false);
  const [leaveBalances, setLeaveBalances] = useState<LeaveBalance[]>([]);

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

  useEffect(() => {
    const getLeaveBalance = async () => {
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
        return null;
      }
    };
    getLeaveBalance();
  }, [useID]);

  return (
    <>
      <main className="flex flex-col items-center justify-center p-24">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
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
        <div className="p-5 w-full max-w-5xl bg-white rounded-t-lg shadow-lg shadow-gray-400">
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
              <col style={{ width: "120px" }} />
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
        <div className="p-5 w-full max-w-5xl bg-white rounded-b-lg shadow-lg shadow-gray-400">
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden text-base">
            <colgroup>
              <col style={{ width: "50px" }} />
              <col style={{ width: "140px" }} />
              <col style={{ width: "120px" }} />
              <col style={{ width: "120px" }} />
              <col style={{ width: "90px" }} />
              <col style={{ width: "120px" }} />
              <col style={{ width: "100px" }} />
              <col style={{ width: "120px" }} />
            </colgroup>
            <tbody>
              <tr>
                <td className="py-3 px-2 border-b text-center text-gray-500">
                  1
                </td>
                <td className="py-3 px-2 border-b text-left text-gray-500">
                  Sick Leave
                </td>
                <td className="py-3 px-2 border-b text-center text-gray-500">
                  2024-07-01
                </td>
                <td className="py-3 px-2 border-b text-center text-gray-500">
                  2024-07-03
                </td>
                <td className="py-3 px-2 border-b text-center text-gray-500">
                  3
                </td>
                <td className="py-3 px-2 border-b text-left text-gray-500">
                  ป่วย ไม่สบาย ไปเที่ยว ปลูกป่า
                </td>
                <td className="py-3 px-2 border-b text-center text-gray-500">
                  Pending
                </td>
                <td className="py-3 px-2 border-b flex items-center justify-center">
                  <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 ">
                    Approve
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <RequestModal
        open={requestModal}
        onClose={() => setRequestModal(false)}
      />
    </>
  );
}

export default DashboardPage;
