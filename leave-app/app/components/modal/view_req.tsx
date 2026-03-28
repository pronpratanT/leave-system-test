import React, { useEffect, useState } from "react";

type LeaveRequest = {
  id: number;
  leave_type: string;
  start_date: string;
  end_date: string;
  total_days: number;
  reason: string;
  status: string;
};

type ViewReqModalProps = {
  open: boolean;
  onClose: () => void;
  requestId: number | null;
};

const ViewReqModal: React.FC<ViewReqModalProps> = ({ open, onClose, requestId }) => {
  const [request, setRequest] = useState<LeaveRequest | null>(null);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      if (requestId === null) return;
      try {
        const response = await fetch(
          `http://localhost:8080/api/requests/request-detail/${requestId}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch request details");
        }
        const data = await response.json();
        setRequest(data.data);
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    fetchRequestDetails();
  }, [requestId]);

  if (!open) return null;
  if (!request) return <div>Loading...</div>;

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
          รายละเอียดใบลา
        </h2>
        <div className="mb-2">
          <span className="font-medium text-gray-700">ประเภทการลา: </span>
          <span className="text-gray-500">{request.leave_type}</span>
        </div>
        <div className="mb-2">
          <span className="font-medium text-gray-700">วันที่เริ่มต้น: </span>
          <span className="text-gray-500">{request.start_date}</span>
        </div>
        <div className="mb-2">
          <span className="font-medium text-gray-700">วันที่สิ้นสุด: </span>
          <span className="text-gray-500">{request.end_date}</span>
        </div>
        <div className="mb-2">
          <span className="font-medium text-gray-700">จำนวนวัน: </span>
          <span className="text-gray-500">{request.total_days}</span>
        </div>
        <div className="mb-2">
          <span className="font-medium text-gray-700">เหตุผล: </span>
          <span className="text-gray-500">{request.reason}</span>
        </div>
        <div className="mb-2">
          <span className="font-medium text-gray-700">สถานะ: </span>
          <span className="text-gray-500">{request.status}</span>
        </div>
      </div>
    </div>
  );
};

export default ViewReqModal;