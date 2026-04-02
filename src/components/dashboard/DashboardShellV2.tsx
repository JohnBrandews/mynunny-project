'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, LogOut, User as UserIcon, Settings, Bell, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardShellV2Props {
  children: React.ReactNode;
  accentGradient: string; // e.g. "from-purple-600 via-pink-600 to-indigo-600"
  roleName: string; // e.g. "Client Dashboard"
}

export function DashboardShellV2({ children, accentGradient, roleName }: DashboardShellV2Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getUserInitials = () => {
    if (!user?.fullName) return '??';
    return user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Premium Dashboard Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-lg py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className={`w-10 h-10 bg-gradient-to-br ${accentGradient} rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105`}>
                <span className="text-white text-xl">👶</span>
              </div>
              <div className="hidden sm:block">
                <span className={`text-xl font-black bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>
                  MyNunny
                </span>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{roleName}</div>
              </div>
            </Link>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              
              <div className="h-8 w-px bg-gray-200 mx-2" />

              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all group"
                >
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${accentGradient} flex items-center justify-center text-white font-bold`}>
                    {user?.profilePictureUrl ? (
                      <img src={user.profilePictureUrl} alt="avatar" className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      getUserInitials()
                    )}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-black text-gray-900 leading-none">{user?.fullName.split(' ')[0]}</div>
                    <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{user?.role}</div>
                  </div>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden"
                    >
                      <Link href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                        <UserIcon size={18} /> Profile
                      </Link>
                      <Link href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                        <Settings size={18} /> Settings
                      </Link>
                      <div className="border-t border-gray-50 my-1" />
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={18} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-gray-500 hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-24 z-40 bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-6 md:hidden"
          >
            <div className="space-y-4">
               <div className="flex items-center gap-4 border-b border-gray-50 pb-4 mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${accentGradient} flex items-center justify-center text-white font-bold`}>
                    {getUserInitials()}
                  </div>
                  <div>
                    <div className="font-black text-gray-900">{user?.fullName}</div>
                    <div className="text-xs font-bold text-gray-500 uppercase">{user?.role}</div>
                  </div>
               </div>
               <nav className="space-y-1">
                 <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-bold">
                    <UserIcon size={20} /> Profile
                 </Link>
                 <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-bold">
                    <Settings size={20} /> Settings
                 </Link>
                 <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-500 font-bold">
                    <LogOut size={20} /> Sign Out
                 </button>
               </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
