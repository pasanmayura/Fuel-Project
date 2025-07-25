import { CircleCheckBig, Hourglass, Fuel } from 'lucide-react';

const stats = [
  { id: 1, label: 'Allowed Monthly Quota (Litres)', value: '1,200', icon: Fuel, color: 'text-indigo-600' },
  { id: 2, label: 'Used Quota', value: '$24,000', icon: CircleCheckBig, color: 'text-green-600' },
  { id: 3, label: 'Remaining Quota', value: '320', icon: Hourglass, color: 'text-yellow-600' },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-6">
      {stats.map(({ id, label, value, icon: Icon, color }) => (
        <div key={id} className="bg-white p-10 rounded-2xl shadow flex items-center justify-between">
          <div>
            <p className="text-xl text-gray-500">{label}</p>
            <h3 className="text-4xl font-bold">{value}</h3>
          </div>
          <Icon className={`w-8 h-8 ${color}`} />
        </div>
      ))}
    </div>
  );
}
