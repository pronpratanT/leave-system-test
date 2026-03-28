import React from 'react';

interface RequestModalProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const RequestModal: React.FC<RequestModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Create Leave Request</h2>
        {children}
      </div>
    </div>
  );
};

export default RequestModal;