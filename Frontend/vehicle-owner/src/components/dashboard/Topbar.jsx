'use client';

export default function Topbar() {
  return (
    <div className="bg-white border-b border-indigo-500 shadow-sm px-10 py-6 flex justify-between items-center">
      
      <div className="flex items-center space-x-4">
        
        <img
          src="https://i.pravatar.cc/40"
          className="w-8 h-8 rounded-full border"
          alt="Profile"
        />
        <span className="hidden sm:block font-medium text-gray-700">John</span>
        
      </div>
    </div>
  );
}
