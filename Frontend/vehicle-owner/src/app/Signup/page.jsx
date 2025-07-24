'use client';

import { useRouter } from 'next/navigation'; // Import useRouter
import { UserPlus } from 'lucide-react';
import { useState } from 'react';
import { User, CarFront, IdCard, BusFront, Fuel, Mail, Lock, CircleUser } from 'lucide-react';
import SubmitButton from '@/components/auth/SubmitButton';
import InputField from '@/components/auth/InputField';
import { signup } from '@/service/authservice';

export default function SignUp() {
  const router = useRouter(); // Initialize useRouter
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nic: '',
    vehicleNumber: '',
    vehicleType: '',
    fuelType: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(''); // State for error message
  const [activeTab, setActiveTab] = useState(1); // State for active tab

  const handleSignUp = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const requestData = {
      vehicle: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        nic: formData.nic,
        vehicleNumber: formData.vehicleNumber,
        vehicleType: formData.vehicleType,
        fuelType: formData.fuelType,
      },
      account: {
        username: formData.username,
        password: formData.password,
        email: formData.email,
      },
    };

    console.log('Request Data:', requestData); // Log the request data

    try {
      const response = await signup(requestData); // Send the structured data to the signup service
      console.log('Signup successful:', response); // Log the successful response
      router.push('/'); // Redirect to the login page
    } catch (error) {
      console.error('Signup error:', error); // Log the error
      setError(error.response?.data?.message || 'An error occurred during signup');
    }
  };

  const handleInputChange = (e) => {
    const updatedFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };

    setFormData(updatedFormData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-indigo-200 to-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Sign-Up container */}
      <div className="relative w-full max-w-md">
        {/* Glassmorphism card */}
        <div className="backdrop-blur-lg bg-white/70 rounded-3xl p-8 shadow-2xl border border-indigo-200 hover:bg-white/80 transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-indigo-700 mb-2">Create Account</h1>
            <p className="text-indigo-500">Sign up for a new account</p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-6">
            <button
              className={`px-4 py-2 rounded-t-lg ${activeTab === 1 ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-indigo-700'}`}
              onClick={() => setActiveTab(1)}
            >
              Personal Info
            </button>
            <button
              className={`px-4 py-2 rounded-t-lg ${activeTab === 2 ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-indigo-700'}`}
              onClick={() => setActiveTab(2)}
            >
              Account Info
            </button>
          </div>

          {/* Input Fields */}
          <div className="space-y-6">
            {activeTab === 1 && (
              <>
                {/* First Name */}
                <InputField
                  icon={<User className="h-5 w-5 text-indigo-500 group-focus-within:text-black transition-colors" />}
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required={true}
                />

                {/* Last Name */}
                <InputField
                  icon={<User className="h-5 w-5 text-indigo-500 group-focus-within:text-black transition-colors" />}
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required={true}
                />

                {/* NIC */}
                <InputField
                  icon={<IdCard className="h-5 w-5 text-indigo-500 group-focus-within:text-black transition-colors" />}
                  name="nic"
                  type="text"
                  placeholder="National Identity Card"
                  value={formData.nic}
                  onChange={handleInputChange}
                  required={true}
                />

                {/* Vehicle Number */}
                <InputField
                  icon={<CarFront className="h-5 w-5 text-indigo-500 group-focus-within:text-black transition-colors" />}
                  name="vehicleNumber"
                  type="text"
                  placeholder="Vehicle Number (ABC-XXXX)"
                  value={formData.vehicleNumber}
                  onChange={handleInputChange}
                  required={true}
                />

                {/* Vehicle Type */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <BusFront className="h-5 w-5 text-indigo-500 group-focus-within:text-black transition-colors" />
                  </div>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-indigo-300 rounded-2xl text-indigo-700 placeholder-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-700 transition-all duration-300 hover:bg-indigo-100"
                  >
                    <option value="" disabled>Select Vehicle Type</option>
                    <option value="car">Car</option>
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="van">Van</option>
                    <option value="Threewheel">Threewheel</option>
                    <option value="Bus">Bus</option>
                    <option value="Jeep">Jeep</option>
                  </select>
                </div>

                {/* Fuel Type */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Fuel className="h-5 w-5 text-indigo-500 group-focus-within:text-black transition-colors" />
                  </div>
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-indigo-300 rounded-2xl text-indigo-700 placeholder-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-700 transition-all duration-300 hover:bg-indigo-100"
                  >
                    <option value="" disabled>Select Fuel Type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                  </select>
                </div>
              </>
            )}

            {activeTab === 2 && (
              <>
                {/* Email */}
                <InputField
                  icon={<Mail className="h-5 w-5 text-indigo-500 group-focus-within:text-black transition-colors" />}
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required={true}
                />

                {/* Username */}
                <InputField
                  icon={<CircleUser className="h-5 w-5 text-indigo-500 group-focus-within:text-black transition-colors" />}
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required={true}
                />

                {/* Password */}
                <InputField
                  icon={<Lock className="h-5 w-5 text-indigo-500 group-focus-within:text-black transition-colors" />}
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  showToggle={true}
                  required={true}
                />

                {/* Confirm Password */}
                <InputField
                  icon={<Lock className="h-5 w-5 text-indigo-500 group-focus-within:text-black transition-colors" />}
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  showToggle={true}
                  required={true}
                />

                {/* Error Message */}
                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
              </>
            )}
          </div>

          {/* Submit Button */}
          {activeTab === 2 && (
            <div className="mt-6">
              <SubmitButton
                isLoading={false}
                onClick={handleSignUp}
                label="Sign Up"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}