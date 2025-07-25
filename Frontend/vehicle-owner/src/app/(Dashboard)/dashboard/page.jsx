import React from 'react';
import StatsCards from '@/components/dashboard/StatsCards';

const dashboard = () => {
    return (
      <div className="p-10 flex gap-6 flex-col md:flex-row">          
            <div className="w-full h-[450px]">
            <StatsCards/>
            </div>
      </div>
    );
  };
  
  export default dashboard;