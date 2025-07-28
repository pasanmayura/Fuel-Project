'use client';

import { useEffect, useState } from 'react';
import { CircleCheckBig, Hourglass, Fuel, TrendingUp, AlertTriangle } from 'lucide-react';
import { getUserDetails, getQuotaDetails } from '@/service/dashboardServise';

export default function StatsCards() {
  const [stats, setStats] = useState([
    { 
      id: 1, 
      label: 'Monthly Quota', 
      value: 'Loading...', 
      icon: Fuel, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      trend: null
    },
    { 
      id: 2, 
      label: 'Used Quota', 
      value: 'Loading...', 
      icon: CircleCheckBig, 
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      trend: null
    },
    { 
      id: 3, 
      label: 'Remaining Quota', 
      value: 'Loading...', 
      icon: Hourglass, 
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      trend: null
    },
  ]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Get the JWT token from sessionStorage
        const token = sessionStorage.getItem('token');

        // Fetch user details
        const userDetails = await getUserDetails(token);
        const { vehicleNumber } = userDetails;

        // Fetch remaining quota
        const quotaDetails = await getQuotaDetails(vehicleNumber, token);
        const { remainingQuota, monthlyQuota } = quotaDetails;

        // Calculate used quota and percentage
        const usedQuota = monthlyQuota - remainingQuota;
        const usagePercentage = ((usedQuota / monthlyQuota) * 100).toFixed(1);
        const remainingPercentage = ((remainingQuota / monthlyQuota) * 100).toFixed(1);

        // Determine status and colors based on remaining quota
        const getQuotaStatus = (remaining, total) => {
          const percentage = (remaining / total) * 100;
          if (percentage > 50) return { color: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', status: 'Good' };
          if (percentage > 25) return { color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200', status: 'Moderate' };
          return { color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200', status: 'Low' };
        };

        const remainingStatus = getQuotaStatus(remainingQuota, monthlyQuota);

        // Update stats with enhanced information
        setStats([
          { 
            id: 1, 
            label: 'Monthly Quota', 
            value: `${monthlyQuota} L`, 
            icon: Fuel, 
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            trend: 'Monthly allowance',
            percentage: '100%'
          },
          { 
            id: 2, 
            label: 'Used Quota', 
            value: `${usedQuota} L`, 
            icon: TrendingUp, 
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200',
            trend: `${usagePercentage}% consumed`,
            percentage: `${usagePercentage}%`
          },
          { 
            id: 3, 
            label: 'Remaining Quota', 
            value: `${remainingQuota} L`, 
            icon: remainingQuota < monthlyQuota * 0.25 ? AlertTriangle : Hourglass, 
            color: remainingStatus.color,
            bgColor: remainingStatus.bgColor,
            borderColor: remainingStatus.borderColor,
            trend: `${remainingPercentage}% remaining`,
            percentage: `${remainingPercentage}%`,
            status: remainingStatus.status
          },
        ]);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setError('Failed to load quota information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
        <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
        <p className="text-red-600 font-medium">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
      {stats.map(({ id, label, value, icon: Icon, color, bgColor, borderColor, trend, percentage, status }, index) => (
        <div 
          key={id} 
          className={`bg-white ${borderColor} border-2 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Card Header with Gradient */}
          <div className={`${bgColor} px-4 sm:px-6 py-3 border-b ${borderColor}`}>
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-semibold text-gray-700 truncate">
                {label}
              </h3>
              {status && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${color.replace('text-', 'bg-').replace('-600', '-100')} ${color}`}>
                  {status}
                </span>
              )}
            </div>
          </div>

          {/* Card Content */}
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                {isLoading ? (
                  <div className="space-y-2">
                    <div className="h-8 sm:h-10 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                ) : (
                  <>
                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                      {value}
                    </h4>
                    {trend && (
                      <p className="text-xs sm:text-sm text-gray-600">
                        {trend}
                      </p>
                    )}
                  </>
                )}
              </div>
              
              {/* Icon Container */}
              <div className={`${bgColor} p-3 sm:p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                {isLoading ? (
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded animate-pulse"></div>
                ) : (
                  <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${color}`} />
                )}
              </div>
            </div>
          </div>

          {/* Hover Effect Overlay */}
          <div className={`absolute inset-0 ${bgColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
        </div>
      ))}
    </div>
  );
}