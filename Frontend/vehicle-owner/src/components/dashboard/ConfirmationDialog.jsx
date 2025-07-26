'use client';

import React from 'react';

const ConfirmationDialog = ({ open, onClose, onConfirm, title, message }) => {
  if (!open) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Dialog Box */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Title */}
        <div className="bg-indigo-500 text-white text-lg font-semibold px-6 py-4">
          {title}
        </div>

        {/* Content */}
        <div className="bg-gray-50 px-6 py-5 text-gray-900 text-base leading-relaxed">
          {message}
        </div>

        {/* Actions */}
        <div className="bg-gray-50 flex justify-end px-6 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="mr-3 px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-shadow shadow-sm hover:shadow-md"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-shadow shadow-sm hover:shadow-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
