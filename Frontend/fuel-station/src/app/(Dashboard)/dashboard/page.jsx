'use client';

import React, {useEffect} from 'react';
import { Fuel, DollarSign } from 'lucide-react';
import AlertSlider from '@/components/dashboard/main/AlertSlider';
import Card from '@/components/dashboard/main/StatsCards';
import ChartCard from '@/components/dashboard/main/ChartCard';
import Transaction from '@/components/dashboard/main/Transaction';
import { getFuelRevenue, getAvailableFuel } from '@/service/dashboardMainService';

const Dashboard = () => {
  const [totalRevenue, setTotalRevenue] = React.useState(0);
  const [availableFuel, setAvailableFuel] = React.useState({ petrol: 0, diesel: 0 });

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const revenue = await getFuelRevenue(token);
        setTotalRevenue(revenue.totalRevenue);

        const fuelData = await getAvailableFuel(token);
        setAvailableFuel({
          petrol: fuelData.availablePetrol || 0,
          diesel: fuelData.availableDiesel || 0
        });
      } catch (error) {
        console.error('Error fetching fuel revenue:', error);
        setTotalRevenue(0); // Fallback in case of an error
        setAvailableFuel({ petrol: 0, diesel: 0 }); 
      }
    };

    fetchRevenue();
  }, []);

  // Sample data for the bar chart
  const salesData = [
    { day: 'Mon', petrol: 4200, diesel: 3800 },
    { day: 'Tue', petrol: 3900, diesel: 4100 },
    { day: 'Wed', petrol: 4600, diesel: 3900 },
    { day: 'Thu', petrol: 4300, diesel: 4200 },
    { day: 'Fri', petrol: 5100, diesel: 4800 },
    { day: 'Sat', petrol: 5800, diesel: 5200 },
    { day: 'Sun', petrol: 4900, diesel: 4600 }
  ];

  // Sample recent transactions
  const recentTransactions = [
    { id: 'TXN001', time: '09:45 AM', fuel: 'Petrol', amount: 2500, liters: 50 },
    { id: 'TXN002', time: '09:30 AM', fuel: 'Diesel', amount: 3200, liters: 40 },
    { id: 'TXN003', time: '09:15 AM', fuel: 'Petrol', amount: 1800, liters: 36 },
    { id: 'TXN004', time: '09:00 AM', fuel: 'Diesel', amount: 4000, liters: 50 },
    { id: 'TXN005', time: '08:45 AM', fuel: 'Petrol', amount: 2200, liters: 44 }
  ];

  const alerts = [
    {
      type: 'error',
      title: "Update Fuel Information",
      message: "Go to Fuel Station Section and update availble fuel amounts.",
    },
    {
      type: 'warning',
      title: "Low Inventory Alert",
      message: "Diesel tank is running low.",
    },
    {
      type: 'warning',
      title: "Low Inventory Alert",
      message: "Petrol tank is running low.",
    },
    {
      type: 'info',
      title: "Restock Reminder",
      message: "Always remember to update stock when restocking.",
    },
    // {
    //   type: 'success',
    //   title: "Delivery Scheduled",
    //   message: "Fuel delivery is scheduled tomorrow at 9:00 AM.",
    // },
    // {
    //   type: 'error',
    //   title: "Pump D2 Malfunction",
    //   message: "Immediate attention required. Technician notified.",
    // }
  ];  

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Fuel Station Dashboard</h1>
          <p className="text-blue-600">Welcome back! Here's your station overview for today.</p>
        </div>

        {/* Alert Section */}
        <div className="mb-6">
          <AlertSlider alerts={alerts} interval={5000} />
        </div>

        {/* Three Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Daily Revenue Card */}
          <Card
            title="Daily Revenue"
            value={`Rs. ${totalRevenue.toLocaleString()}`}
            icon={<DollarSign className="h-6 w-6 text-blue-600" />}
          />

          {/* Remaining Petrol Card */}
          <Card
            title="Remaining Petrol"
            value={`${availableFuel.petrol} L`}
            icon={<Fuel className="h-6 w-6 text-blue-600" />}
          />

          {/* Remaining Diesel Card */}
          <Card
            title="Remaining Diesel"
            value= {`${availableFuel.diesel} L`}
            icon={<Fuel className="h-6 w-6 text-blue-600" />}
          />          
        </div>

        {/* Bar Chart and Recent Transactions Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <ChartCard data={salesData} />          

          {/* Recent Transactions */}
          <Transaction transactions={recentTransactions} />          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;