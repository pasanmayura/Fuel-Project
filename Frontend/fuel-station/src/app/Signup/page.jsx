'use client';

import { useRouter } from 'next/navigation';
import { UserPlus } from 'lucide-react';
import { useState } from 'react';
import { User, CarFront, IdCard, MapPin, Fuel, Mail, Lock, CircleUser } from 'lucide-react';
import SubmitButton from '@/components/auth/SubmitButton';
import InputField from '@/components/auth/InputField';
import { signup } from '@/service/authservice';
import { signupSchema } from '@/utils/validationSchemas';

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nic: '',
    stationName: '',
    location: '',
    petrolCapacity: '',
    dieselCapacity: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [activeTab, setActiveTab] = useState(1);

  const handleSignUp = async () => {
    try {
      // Validate the form data using Yup
      await signupSchema.validate(formData, { abortEarly: false });
      setValidationErrors({}); // Clear validation errors
  
      const requestData = {
        station: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          nic: formData.nic,
          stationName: formData.stationName,
          location: formData.location,
          petrolCapacity: formData.petrolCapacity,
          dieselCapacity: formData.dieselCapacity,
        },
        account: {
          username: formData.username,
          password: formData.password,
          email: formData.email,
        },
      };
  
      console.log('Request Data:', requestData);
  
      const response = await signup(requestData);
  
      // Check if the response contains a success message
      if (response.message) {
        alert(response.message); 
        router.push('/'); 
      } else {
        throw new Error('Unexpected response format'); 
      }
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errors = {};
        err.inner.forEach(validationError => {
          errors[validationError.path] = validationError.message;
        });
        setValidationErrors(errors);
  
        alert('Validation errors occurred. Please check the form fields.');
      } else {
        // Extract the error message from the backend response
        const errorMessage = err.response?.data?.message || 'An error occurred during signup';
        alert(errorMessage); 
        console.error('Signup error:', errorMessage); 
        setError(errorMessage);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if ((name === 'petrolCapacity' || name === 'dieselCapacity') && value <= 0) {
      return; 
    }
  
    const updatedFormData = {
      ...formData,
      [name]: value,
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
              Station Info
            </button>
            <button
              className={`px-4 py-2 rounded-t-lg ${activeTab === 3 ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-indigo-700'}`}
              onClick={() => setActiveTab(3)}
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
                {validationErrors.firstName && <p className="text-red-500 text-sm mt-1">{validationErrors.firstName}</p>}

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
                {validationErrors.lastName && <p className="text-red-500 text-sm mt-1">{validationErrors.lastName}</p>}

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
                {validationErrors.email && <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>}

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
                {validationErrors.nic && <p className="text-red-500 text-sm mt-1">{validationErrors.nic}</p>}               
              </>
            )}
            {activeTab === 2 && (
              <>
                {/* Station Name */}
                <InputField
                  icon={<CarFront className="h-5 w-5 text-indigo-500 group-focus-within:text-black transition-colors" />}
                  name="stationName"
                  type="text"
                  placeholder="Fuel Station Name"
                  value={formData.stationName}
                  onChange={handleInputChange}
                  required={true}
                />
                {validationErrors.stationName && <p className="text-red-500 text-sm mt-1">{validationErrors.stationName}</p>}

                {/* Location */}
                <InputField
                  icon={<MapPin className="h-5 w-5 text-indigo-500 group-focus-within:text-black transition-colors" />}
                  name="location"
                  type="text"
                  placeholder="Location (e.g., Colombo, Kandy)"
                  value={formData.location}
                  onChange={handleInputChange}
                  required={true}
                />
                {validationErrors.location && <p className="text-red-500 text-sm mt-1">{validationErrors.location}</p>}

                {/* Petrol Capacity */}
                <InputField
                  icon={<Fuel className="h-5 w-5 text-indigo-500 group-focus-within:text-black transition-colors" />}
                  name="petrolCapacity"
                  type="number"
                  placeholder="Petrol Capacity (L)"
                  value={formData.petrolCapacity}
                  onChange={handleInputChange}
                  required={true}
                />
                {validationErrors.petrolCapacity && <p className="text-red-500 text-sm mt-1">{validationErrors.petrolCapacity}</p>}

                {/* Diesel Capacity */}
                <InputField
                  icon={<Fuel className="h-5 w-5 text-indigo-500 group-focus-within:text-black transition-colors" />}
                  name="dieselCapacity"
                  type="number"
                  placeholder="Diesel Capacity (L)"
                  value={formData.dieselCapacity}
                  onChange={handleInputChange}
                  required={true}
                />
                {validationErrors.dieselCapacity && <p className="text-red-500 text-sm mt-1">{validationErrors.dieselCapacity}</p>}
              </>
            )}

            {activeTab === 3 && (
              <>
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
                {validationErrors.username && <p className="text-red-500 text-sm mt-1">{validationErrors.username}</p>}
       
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
                {validationErrors.password && <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>}

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
                {validationErrors.confirmPassword && <p className="text-red-500 text-sm mt-1">{validationErrors.confirmPassword}</p>}
              </>
            )}
          </div>

          {/* Submit Button */}
          {activeTab === 3 && (
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