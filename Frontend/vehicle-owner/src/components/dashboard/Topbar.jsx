'use client';

import { useEffect, useState } from 'react';
import { CircleUserRound } from 'lucide-react';
import { getUserDetails } from '@/service/dashboardServise';

export default function Topbar() {
  const [username, setUsername] = useState('Loading...');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        // Get the JWT token from localStorage
        const token = sessionStorage.getItem('token');

        // Fetch user details
        const userDetails = await getUserDetails(token);

        // Update the username state
        setUsername(userDetails.username);
      } catch (error) {
        console.error('Error fetching username:', error);
        setUsername('Guest'); // Fallback in case of an error
      }
    };

    fetchUsername();
  }, []);

  return (
    <div className="bg-white border-b border-indigo-500 shadow-sm px-10 py-6 flex justify-between items-center">
      
      <div className="flex items-center space-x-4">
        
      <CircleUserRound className="w-8 h-8 text-gray-700" />
      <span className="hidden sm:block font-medium text-gray-700">{username}</span>
        
      </div>
    </div>
  );
}
