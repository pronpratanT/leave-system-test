import React from 'react';

interface RequestModalProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const RequestModal: React.FC<RequestModalProps> = ({ open, onClose, children }) => {
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
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Leave Type</label>
            <select className="w-full border border-gray-300 rounded-md p-2 text-gray-700">
              <option value="">Select Leave Type</option>
              <option value="sick">Sick Leave</option>
              <option value="vacation">Vacation Leave</option>
              <option value="personal">Personal Leave</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Leave Duration</label>
            <select className="w-full border border-gray-300 rounded-md p-2 text-gray-700">
              <option value="full">เต็มวัน</option>
              <option value="half-morning">ครึ่งวันเช้า</option>
              <option value="half-afternoon">ครึ่งวันบ่าย</option>
            </select>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">Start Date</label>
              <input type="date" className="w-full border border-gray-300 rounded-md p-2 text-gray-700" />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">End Date</label>
              <input type="date" className="w-full border border-gray-300 rounded-md p-2 text-gray-700" />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Reason</label>
            <textarea className="w-full border border-gray-300 rounded-md p-2 text-gray-700" rows={4} />
          </div>
        </form>

        {/* Action buttons */}
        <div className="mt-6 flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 mr-2 cursor-pointer"
            onClick={onClose}
          >Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 cursor-pointer"
            onClick={() => {
              // Handle form submission logic here
              onClose();
            }}
          >
            Submit
          </button>
        </div>

      </div>
    </div>
  );
};

export default RequestModal;