import React from 'react';
import { Clock } from 'lucide-react';

const Transaction = ({ transactions = [] }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-blue-900">Recent Transactions</h3>
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-blue-100">
                    <th className="text-left py-3 px-2 text-blue-600 font-medium text-sm">ID</th>
                    <th className="text-left py-3 px-2 text-blue-600 font-medium text-sm">Time</th>
                    <th className="text-left py-3 px-2 text-blue-600 font-medium text-sm">Fuel</th>
                    <th className="text-left py-3 px-2 text-blue-600 font-medium text-sm">Liters</th>
                    <th className="text-left py-3 px-2 text-blue-600 font-medium text-sm">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={transaction.id} className={index % 2 === 0 ? 'bg-blue-25' : 'bg-white'}>
                      <td className="py-3 px-2 text-sm text-blue-900 font-medium">{transaction.id}</td>
                      <td className="py-3 px-2 text-sm text-blue-700">{transaction.time}</td>
                      <td className="py-3 px-2 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.fuel === 'Petrol' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {transaction.fuel}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-sm text-blue-700">{transaction.liters}L</td>
                      <td className="py-3 px-2 text-sm text-blue-900 font-semibold">₹{transaction.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline">
                View All Transactions
              </button>
            </div>
          </div>
    );
};

export default Transaction;