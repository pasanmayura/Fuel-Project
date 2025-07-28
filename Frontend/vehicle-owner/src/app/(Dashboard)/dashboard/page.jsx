'use client';

import React, { useEffect, useState } from 'react';
import StatsCards from '@/components/dashboard/StatsCards';
import { getUserDetails, getQRCode } from '@/service/dashboardServise';

const Dashboard = () => {
  const [qrCode, setQrCode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const token = sessionStorage.getItem('token');

        // Fetch user details to get the vehicle number
        const userDetails = await getUserDetails(token);
        const { vehicleNumber } = userDetails;

        // Fetch the QR code for the vehicle
        const qrCodeImage = await getQRCode(vehicleNumber, token);
        setQrCode(qrCodeImage);
      } catch (error) {
        console.error('Error fetching QR code:', error);
        setError('Failed to load QR code');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQRCode();
  }, []);

  const handleDownloadQRCode = () => {
    if (qrCode) {
      const link = document.createElement('a');
      link.href = qrCode;
      link.download = 'vehicle-qr-code.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Monitor your fuel quota and vehicle information
          </p>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <StatsCards />
        </div>
      </div>

      {/* QR Code Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
            {/* QR Code Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-400 px-6 py-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Vehicle QR Code
              </h2>
              <p className="text-indigo-100 text-sm mt-1">
                Scan this code for fuel transactions
              </p>
            </div>

            {/* QR Code Content */}
            <div className="p-6 sm:p-8 lg:p-12">
              <div className="flex items-center justify-center">
                {isLoading ? (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
                    <p className="text-gray-600 animate-pulse">Loading QR Code...</p>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-red-600 font-medium">{error}</p>
                    <button 
                      onClick={() => window.location.reload()} 
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                      Retry
                    </button>
                  </div>
                ) : qrCode ? (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <img 
                        src={qrCode} 
                        alt="Vehicle QR Code" 
                        className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 object-contain"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600 text-sm sm:text-base">
                        Present this QR code at fuel stations
                      </p>
                      <div className="mt-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm font-medium">
                        ✓ Ready to scan
                      </div>
                      <button
                      onClick={handleDownloadQRCode}
                      className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                    >
                      Download QR Code
                    </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;