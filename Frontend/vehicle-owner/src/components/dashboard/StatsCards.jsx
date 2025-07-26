'use client';

import { useEffect, useState } from 'react';
import { CircleCheckBig, Hourglass, Fuel } from 'lucide-react';
import { getUserDetails, getQuotaDetails } from '@/service/dashboardServise';

export default function StatsCards() {
  const [stats, setStats] = useState([
    { id: 1, label: 'Allowed Monthly Quota', value: 'Loading...', icon: Fuel, color: 'text-indigo-600' },
    { id: 2, label: 'Used Quota', value: 'Loading...', icon: CircleCheckBig, color: 'text-green-600' },
    { id: 3, label: 'Remaining Quota', value: 'Loading...', icon: Hourglass, color: 'text-yellow-600' },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get the JWT token from localStorage
        const token = sessionStorage.getItem('token');

        // Fetch user details
        const userDetails = await getUserDetails(token);
        const { vehicleNumber } = userDetails;

        // Fetch remaining quota
        const quotaDetails = await getQuotaDetails(vehicleNumber, token);
        const { remainingQuota, monthlyQuota } = quotaDetails;

        // Calculate used quota
        const usedQuota = monthlyQuota - remainingQuota;

        // Update stats
        setStats([
          { id: 1, label: 'Allowed Monthly Quota', value: `${monthlyQuota} L`, icon: Fuel, color: 'text-indigo-600' },
          { id: 2, label: 'Used Quota', value: `${usedQuota} L`, icon: CircleCheckBig, color: 'text-green-600' },
          { id: 3, label: 'Remaining Quota', value: `${remainingQuota} L`, icon: Hourglass, color: 'text-yellow-600' },
        ]);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

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
