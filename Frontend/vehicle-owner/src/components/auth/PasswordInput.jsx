'use client';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function PasswordInput({ value, onChange, show, toggle }) {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Lock className="h-5 w-5 text-indigo-500 group-focus-within:text-black transition-colors" />
      </div>
      <input
        type={show ? 'text' : 'password'}
        name="password"
        value={value}
        onChange={onChange}
        placeholder="Enter your password"
        className="w-full pl-12 pr-12 py-4 bg-white border border-indigo-300 rounded-2xl text-indigo-700 placeholder-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-700 transition-all duration-300 hover:bg-indigo-100"
        required
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute inset-y-0 right-0 pr-4 flex items-center text-indigo-500 hover:text-black transition-colors"
      >
        {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </div>
  );
}