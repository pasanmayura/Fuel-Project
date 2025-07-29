'use client';
import { CircleUser } from 'lucide-react';

export default function UsernameInput({ value, onChange }) {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <CircleUser className="h-5 w-5 text-blue-500 group-focus-within:text-black transition-colors" />
      </div>
      <input
        type="text"
        name="username"
        value={value}
        onChange={onChange}
        placeholder="Username"
        className="w-full pl-12 pr-4 py-4 bg-white border border-blue-300 rounded-2xl text-blue-700 placeholder-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all duration-300 hover:bg-blue-100"
        required
      />
    </div>
  );
}