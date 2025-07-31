'use client';

import React, {useEffect} from 'react';
import { Fuel, DollarSign } from 'lucide-react';
import AlertSlider from '@/components/dashboard/main/AlertSlider';
import Card from '@/components/dashboard/main/StatsCards';
import ChartCard from '@/components/dashboard/main/ChartCard';
import Transaction from '@/components/dashboard/main/Transaction';
import { getFuelRevenue, getAvailableFuel, getRecentTransactions, getWeeklyRevenue } from '@/service/dashboardMainService';

const Dashboard = () => {
  const [totalRevenue, setTotalRevenue] = React.useState(0);
  const [availableFuel, setAvailableFuel] = React.useState({ petrol: 0, diesel: 0 });
  const [recentTransactions, setRecentTransactions] = React.useState([]);
  const [weeklyRevenue, setWeeklyRevenue] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token');

        const revenue = await getFuelRevenue(token);
        setTotalRevenue(revenue.totalRevenue);

        const fuelData = await getAvailableFuel(token);
        setAvailableFuel({
          petrol: fuelData.availablePetrol || 0,
          diesel: fuelData.availableDiesel || 0
        });

        const transactions = await getRecentTransactions(token);
        const mappedTransactions = transactions.map(tx => ({
          id: tx.transactionId,
          time: new Date(tx.transactionTime).toLocaleString([], { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit' 
          }), // Format both date and time
          fuel: tx.fuelType,
          liters: tx.liters,
          amount: tx.totalPrice.toFixed(2) 
        }));
        setRecentTransactions(mappedTransactions.slice(0, 5)); 
      } catch (error) {
        console.error('Error fetching fuel revenue:', error);
        setTotalRevenue(0); // Fallback in case of an error
        setAvailableFuel({ petrol: 0, diesel: 0 }); 
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchWeeklyRevenue = async () => {
      try {
        const token = sessionStorage.getItem('token');

        // Fetch weekly revenue data
        const revenueData = await getWeeklyRevenue(token);

        // Transform data into chart format
        const formattedData = revenueData.reduce((acc, revenue) => {
          const existingDay = acc.find((item) => item.day === revenue.transactionDate);
          if (existingDay) {
            existingDay[revenue.fuelType.toLowerCase()] = revenue.totalRevenue;
          } else {
            acc.push({
              day: revenue.transactionDate,
              petrol: revenue.fuelType === 'Petrol' ? revenue.totalRevenue : 0,
              diesel: revenue.fuelType === 'Diesel' ? revenue.totalRevenue : 0,
            });
          }
          return acc;
        }, []);

        setWeeklyRevenue(formattedData);
      } catch (error) {
        console.error('Error fetching weekly revenue data:', error);
      }
    };

    fetchWeeklyRevenue();
  }, []); 

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
          <ChartCard data={weeklyRevenue} />          

          {/* Recent Transactions */}
          <Transaction transactions={recentTransactions} />          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;