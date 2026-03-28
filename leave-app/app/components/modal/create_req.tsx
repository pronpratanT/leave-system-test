import React, { useState } from 'react';

interface RequestModalProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const RequestModal: React.FC<RequestModalProps> = ({ open, onClose, children }) => {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startHalfDayType, setStartHalfDayType] = useState("");
  const [endHalfDayType, setEndHalfDayType] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = () => {
    // TODO: ส่งข้อมูลไป backend ตามรูปแบบใหม่
    // ตัวอย่าง payload
    const payload = {
      leaveType,
      startDate,
      endDate,
      startHalfDayType,
      endHalfDayType,
      reason,
    };
    console.log("submit", payload);
    onClose();
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
        <h2 className="text-xl font-bold mb-4 text-gray-700">Create Leave Request</h2>
        {children}
        {/* Form fields */}
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Leave Type</label>
            <select className="w-full border border-gray-300 rounded-md p-2 text-gray-700" value={leaveType} onChange={e => setLeaveType(e.target.value)} required>
              <option value="">Select Leave Type</option>
              <option value="sick">Sick Leave</option>
              <option value="vacation">Vacation Leave</option>
              <option value="personal">Personal Leave</option>
            </select>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">Start Date</label>
              <input type="date" className="w-full border border-gray-300 rounded-md p-2 text-gray-700" value={startDate} onChange={e => setStartDate(e.target.value)} required />
              <div className="mt-1">
                <label className="mr-2 text-sm text-gray-600">ครึ่งวัน:</label>
                <select className="border border-gray-300 rounded-md p-1 text-gray-700 text-sm" value={startHalfDayType} onChange={e => setStartHalfDayType(e.target.value)}>
                  <option value="">เต็มวัน</option>
                  <option value="morning">ครึ่งวันเช้า</option>
                  <option value="afternoon">ครึ่งวันบ่าย</option>
                </select>
              </div>
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">End Date</label>
              <input type="date" className="w-full border border-gray-300 rounded-md p-2 text-gray-700" value={endDate} onChange={e => setEndDate(e.target.value)} required />
              <div className="mt-1">
                <label className="mr-2 text-sm text-gray-600">ครึ่งวัน:</label>
                <select className="border border-gray-300 rounded-md p-1 text-gray-700 text-sm" value={endHalfDayType} onChange={e => setEndHalfDayType(e.target.value)}>
                  <option value="">เต็มวัน</option>
                  <option value="morning">ครึ่งวันเช้า</option>
                  <option value="afternoon">ครึ่งวันบ่าย</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Reason</label>
            <textarea className="w-full border border-gray-300 rounded-md p-2 text-gray-700" rows={4} value={reason} onChange={e => setReason(e.target.value)} required />
          </div>
        </form>

        {/* Action buttons */}
        <div className="mt-6 flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 mr-2 cursor-pointer"
            onClick={onClose}
            type="button"
          >Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 cursor-pointer"
            type="submit"
          >
            Submit
          </button>
        </div>

      </div>
    </div>
  );
};

export default RequestModal;