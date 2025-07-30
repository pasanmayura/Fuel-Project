import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar } from 'lucide-react';

const ChartCard = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-blue-900">Weekly Sales Overview</h3>
        <Calendar className="h-5 w-5 text-blue-600" />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
          <XAxis dataKey="day" stroke="#3b82f6" />
          <YAxis stroke="#3b82f6" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#eff6ff',
              border: '1px solid #3b82f6',
              borderRadius: '8px',
            }}
          />
          <Bar dataKey="petrol" fill="#3b82f6" name="Petrol (L)" radius={[2, 2, 0, 0]} />
          <Bar dataKey="diesel" fill="#1e40af" name="Diesel (L)" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartCard;