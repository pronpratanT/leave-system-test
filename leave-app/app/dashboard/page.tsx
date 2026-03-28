"use client";

import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import RequestModal from "../components/modal/create_req";

function DashboardPage() {
  const [requestModal, setRequestModal] = useState(false);

  return (
    <>
      <main className="flex flex-col items-center justify-center p-24">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
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
                <td className="py-3 px-2 border-b text-center">1</td>
                <td className="py-3 px-2 border-b text-left">Sick Leave</td>
                <td className="py-3 px-2 border-b text-center">2024-07-01</td>
                <td className="py-3 px-2 border-b text-center">2024-07-03</td>
                <td className="py-3 px-2 border-b text-center">3</td>
                <td className="py-3 px-2 border-b text-left">
                  ป่วย ไม่สบาย ไปเที่ยว ปลูกป่า
                </td>
                <td className="py-3 px-2 border-b text-center">Pending</td>
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
