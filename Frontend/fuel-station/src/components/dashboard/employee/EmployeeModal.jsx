'use client';

import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { registerEmployee } from '@/service/employeeService';

const EmployeeModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    position: '',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await registerEmployee({
        firstName: formData.fname,
        lastName: formData.lname,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        position: formData.position,
        address: formData.address,
      });
      alert('Employee registered successfully');
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error registering employee:', error);
      alert('Failed to register employee');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-blue-600 text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <h2 id="modal-title" className="text-2xl font-bold">Add New Employee</h2>
            <button
              onClick={onClose} 
              className="text-white hover:text-blue-200 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-blue-900 font-medium mb-2">First Name</label>
              <input
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleInputChange} 
                required
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter first name"
              />
            </div>

            <div>
              <label className="block text-blue-900 font-medium mb-2">Last Name</label>
              <input
                type="text"
                name="lname"
                value={formData.lname}
                onChange={handleInputChange} 
                required
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter last name"
              />
            </div>

            <div>
              <label className="block text-blue-900 font-medium mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange} 
                required
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter username"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-blue-900 font-medium mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label className="block text-blue-900 font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.fname}
                onChange={handleInputChange} 
                required
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-blue-900 font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter phone number"
              />
            </div>

            {/* Position */}
            <div>
              <label className="block text-blue-900 font-medium mb-2">Position</label>
              <select
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Position</option>
                <option value="Station Manager">Station Manager</option>
                <option value="Pump Operator">Pump Operator</option>
                <option value="Cash Counter">Cash Counter</option>
                <option value="Accountant">Accountant</option>
                <option value="Security Guard">Security Guard</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>          

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-blue-900 font-medium mb-2">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                rows="3"
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter full address"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-blue-100">
            <button
              type="button"
              onClick={onClose} // Use onClose prop
              className="px-6 py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit} 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Add Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;