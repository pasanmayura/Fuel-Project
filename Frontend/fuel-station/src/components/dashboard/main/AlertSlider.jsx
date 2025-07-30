'use client';

import React, { useEffect, useState } from 'react';
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';

const typeStyles = {
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-400',
    textTitle: 'text-yellow-800',
    textMessage: 'text-yellow-700',
    icon: <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3" />
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-400',
    textTitle: 'text-blue-800',
    textMessage: 'text-blue-700',
    icon: <Info className="h-5 w-5 text-blue-400 mr-3" />
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-400',
    textTitle: 'text-green-800',
    textMessage: 'text-green-700',
    icon: <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-400',
    textTitle: 'text-red-800',
    textMessage: 'text-red-700',
    icon: <XCircle className="h-5 w-5 text-red-400 mr-3" />
  }
};

const AlertSlider = ({ alerts, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % alerts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [alerts.length, interval]);

  if (alerts.length === 0) return null;

  const currentAlert = alerts[currentIndex];
  const style = typeStyles[currentAlert.type] || typeStyles.info;

  return (
    <div className={`${style.bg} border-l-4 ${style.border} p-4 rounded-r-lg shadow-sm mb-6 animate-fade-in-out`}>
      <div className="flex items-center">
        {style.icon}
        <div>
          <p className={`${style.textTitle} font-medium`}>{currentAlert.title}</p>
          <p className={`${style.textMessage} text-sm`}>{currentAlert.message}</p>
        </div>
      </div>
    </div>
  );
};

export default AlertSlider;
