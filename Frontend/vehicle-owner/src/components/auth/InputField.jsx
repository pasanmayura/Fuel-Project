'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function InputField({
  icon,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  showToggle = false,
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="relative group">
      {/* Left Icon */}
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        {icon}
      </div>

      {/* Input field */}
      <input
        type={isPassword && showToggle ? (show ? 'text' : 'password') : type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-12 pr-10 py-4 bg-white border border-indigo-300 rounded-2xl text-indigo-700 placeholder-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-700 transition-all duration-300 hover:bg-indigo-100"
        required
      />

      {/* Toggle password visibility */}
      {isPassword && showToggle && (
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-indigo-500 hover:text-black transition-colors"
        >
          {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      )}
    </div>
  );
}
