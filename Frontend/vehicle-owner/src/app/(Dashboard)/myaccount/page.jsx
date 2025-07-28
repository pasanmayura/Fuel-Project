'use client';

import React, { useState, useEffect } from 'react';
import { getUserDetails, changePassword } from '@/service/dashboardServise';
import { KeyRound } from 'lucide-react';
import PasswordInput from '@/components/auth/PasswordInput';
import { passwordChangeSchema } from '@/utils/validationSchemas';

const MyAccount = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [error, setError] = useState(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const details = await getUserDetails(token);
        setUserDetails(details);
      } catch (err) {
        console.error('Error fetching user details:', err);
        setError('Failed to load user details');
      }
    };

    fetchUserDetails();
  }, []);

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordSubmit = async () => {
    try {
      // Validate the password data
      await passwordChangeSchema.validate(passwordData, { abortEarly: false });
      setValidationErrors({}); // Clear validation errors

      const token = sessionStorage.getItem('token');
      const response = await changePassword(token, passwordData);
      alert(response); // Show success message
      setShowPasswordForm(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errors = {};
        err.inner.forEach(validationError => {
          errors[validationError.path] = validationError.message;
        });
        setValidationErrors(errors);
      } else {
        console.error('Error changing password:', err);
        alert(err.response?.data || 'Failed to change password');
      }
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Account</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Account</h3>
          <p className="text-gray-600">Please wait while we fetch your details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600">Manage your account and vehicle information</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-8 py-6">
            <div className="flex items-center space-x-4">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {userDetails.firstName} {userDetails.lastName}
                </h2>
                <p className="text-indigo-100">{userDetails.email}</p>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-500">Full Name</label>
                <p className="text-gray-900">{userDetails.firstName} {userDetails.lastName}</p>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-500">Email Address</label>
                <p className="text-gray-900">{userDetails.email}</p>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-500">Phone Number</label>
                <p className="text-gray-900">{userDetails.phoneNumber}</p>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-500">NIC</label>
                <p className="text-gray-900">{userDetails.nic}</p>
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="border-t pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Vehicle Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-500">Vehicle Number</label>
                  <p className="text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded-md">
                    {userDetails.vehicleNumber}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-500">Vehicle Type</label>
                  <p className="text-gray-900">{userDetails.vehicleType}</p>
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div className="border-t pt-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Security</h3>
                <button
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                  <KeyRound />
                  <span>Change Password</span>
                </button>
              </div>

              {showPasswordForm && (
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <PasswordInput
                      value={passwordData.currentPassword}
                      onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                      show={showCurrentPassword}
                      toggle={() => setShowCurrentPassword(!showCurrentPassword)}
                    />
                    {validationErrors.currentPassword && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.currentPassword}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <PasswordInput
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                      show={showNewPassword}
                      toggle={() => setShowNewPassword(!showNewPassword)}
                    />
                    {validationErrors.newPassword && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.newPassword}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <PasswordInput
                      value={passwordData.confirmPassword}
                      onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                      show={showConfirmPassword}
                      toggle={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                    {validationErrors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.confirmPassword}</p>
                    )}
                  </div>
                  
                  <div className="flex space-x-3 pt-2">
                    <button
                      onClick={handlePasswordSubmit}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                    >
                      Update Password
                    </button>
                    <button
                      onClick={() => {
                        setShowPasswordForm(false);
                        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                        setValidationErrors({});
                      }}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;