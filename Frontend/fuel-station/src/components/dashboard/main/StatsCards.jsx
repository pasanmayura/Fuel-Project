'use client';

import React from 'react';

const Card = ({ title, value, description, icon, borderColor = 'border-blue-500' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-t-4 ${borderColor}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-blue-600 text-sm font-medium uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-blue-900 mt-2">{value}</p>
        </div>
        <div className="bg-blue-100 p-3 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Card;