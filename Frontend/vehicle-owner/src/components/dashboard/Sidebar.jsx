'use client';

import { Home, Users, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { id: 'dashboard', name: 'Dashboard', icon: Home, href: '/dashboard' },
  { id: 'myaccount', name: 'My Account', icon: Users, href: '/myaccount' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-lg h-full">
      <div className="h-16 bg-indigo-400 flex items-center justify-center">
        <h1 className="text-white text-xl font-bold">Vehicle Dashboard</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map(({ id, name, icon: Icon, href }) => (
            <li key={id}>
              <Link
                href={href}
                className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                  pathname === href
                    ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-4 left-4">
        <button className="flex items-center w-65 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg">
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}
