'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home, Users, LogOut, ChevronRight, Car, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ConfirmationDialog from '@/components/dashboard/ConfirmationDialog';

const menuItems = [
  { id: 'dashboard', name: 'Dashboard', icon: Home, href: '/dashboard' },
  { id: 'myaccount', name: 'My Account', icon: Users, href: '/myaccount' },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [openDialog, setOpenDialog] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Log out
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    router.push('/');
  };

  const openConfirmationDialog = () => {
    setOpenDialog(true);
  };

  const closeConfirmationDialog = () => {
    setOpenDialog(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button - Only visible on small screens */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-colors"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        w-[100%] bg-white shadow-lg h-screen flex flex-col
        lg:flex lg:relative
        ${isMobileMenuOpen ? 'flex' : 'hidden'}
        lg:translate-x-0
        fixed lg:static top-0 left-0 z-40
        lg:z-auto
      `}>
        <div className="relative bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 shadow-xl">
          <div className="px-6 py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Car className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-white text-xl font-bold tracking-tight">
                  Vehicle Owner
                </h1>
                <p className="text-indigo-200 text-sm font-medium">
                  Dashboard Portal
                </p>
              </div>
            </div>
          </div>
          
          {/* Header Bottom Decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>
        
        <nav className="p-4 flex-grow overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map(({ id, name, icon: Icon, href, description }) => (
              <li key={id}>
                <Link
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)} // Close mobile menu on navigation
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
        
        {/* User Section & Logout - Now at bottom */}
        <div className="px-4 pb-6 mt-auto flex-shrink-0">
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-4">
              Account
            </p>
            
            <button 
              className="w-full group flex items-center px-4 py-4 text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 rounded-2xl transition-all duration-300 hover:scale-[1.02] transform relative overflow-hidden"
              onClick={openConfirmationDialog}
            >
              {/* Icon Container */}
              <div className="p-2 rounded-xl mr-4 bg-red-100 text-red-600 group-hover:bg-red-200 transition-all duration-300">
                <LogOut className="w-5 h-5" />
              </div>
              
              {/* Text Content */}
              <div className="flex-1 text-left min-w-0">
                <p className="font-semibold text-sm">Logout</p>
                <p className="text-xs text-red-400 mt-0.5">Sign out of your account</p>
              </div>
              
              {/* Arrow Icon */}
              <ChevronRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition-all duration-300" />
            </button>
          </div>
        </div>
        
        <ConfirmationDialog
          open={openDialog}
          onClose={closeConfirmationDialog}
          onConfirm={handleLogout}
          title="Confirm Logout"
          message="Are you sure you want to Log out ?"
        />
      </div>
    </>
  );
}