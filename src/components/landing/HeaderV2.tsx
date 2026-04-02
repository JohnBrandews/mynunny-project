'use client';

import { Menu, X, User as UserIcon, LayoutDashboard, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';

export function HeaderV2() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();

  // Hide global header on dashboard pages since they have their own shell
  const isDashboard = pathname?.includes('/dashboard');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getDashboardLink = () => {
    if (!user) return '/';
    if (user.role === 'ADMIN') return '/admin/dashboard';
    if (user.role === 'NUNNY') return '/nunny/dashboard';
    return '/client/dashboard';
  };

  const getUserInitials = () => {
    if (!user?.fullName) return '??';
    return user.fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  if (isDashboard) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Banner Removed as requested */}

      {/* Main Navigation */}
      <nav className={`transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                  <span className="text-white text-xl md:text-2xl">👶</span>
                </div>
                <div>
                  <span className={`text-xl md:text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent`}>
                    MyNunny
                  </span>
                  <div className={`text-[10px] md:text-xs ${isScrolled ? 'text-gray-500' : 'text-gray-400'}`}>Trusted Care</div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/#home" className={`px-4 py-2 font-medium rounded-lg transition-all ${isScrolled ? 'text-gray-700 hover:text-purple-600 hover:bg-purple-50' : 'text-gray-900 hover:text-purple-600 hover:bg-white/20'}`}>
                Home
              </Link>
              <Link href="/#features" className={`px-4 py-2 font-medium rounded-lg transition-all ${isScrolled ? 'text-gray-700 hover:text-purple-600 hover:bg-purple-50' : 'text-gray-900 hover:text-purple-600 hover:bg-white/20'}`}>
                Features
              </Link>
              <Link href="/#services" className={`px-4 py-2 font-medium rounded-lg transition-all ${isScrolled ? 'text-gray-700 hover:text-purple-600 hover:bg-purple-50' : 'text-gray-900 hover:text-purple-600 hover:bg-white/20'}`}>
                Services
              </Link>
              <Link href="/#testimonials" className={`px-4 py-2 font-medium rounded-lg transition-all ${isScrolled ? 'text-gray-700 hover:text-purple-600 hover:bg-purple-50' : 'text-gray-900 hover:text-purple-600 hover:bg-white/20'}`}>
                Reviews
              </Link>
            </div>

            {/* Desktop CTA/Profile Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-white shadow-md border border-gray-100 hover:shadow-lg transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-inner">
                      {user.profilePictureUrl ? (
                         <img src={user.profilePictureUrl} alt={user.fullName} className="w-full h-full object-cover rounded-xl" />
                      ) : (
                        getUserInitials()
                      )}
                    </div>
                    <div className="text-left hidden lg:block">
                      <div className="text-sm font-black text-gray-900 leading-none mb-1">{user.fullName.split(' ')[0]}</div>
                      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{user.role}</div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-gray-100 py-3 z-50"
                      >
                        <div className="px-5 py-3 border-b border-gray-50 mb-2">
                          <p className="text-sm font-black text-gray-900">{user.fullName}</p>
                          <p className="text-xs font-medium text-gray-500 truncate">{user.email}</p>
                        </div>
                        <Link
                          href={getDashboardLink()}
                          className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                          onClick={() => setProfileOpen(false)}
                        >
                          <LayoutDashboard size={18} />
                          Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setProfileOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={18} />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <button className={`px-5 py-2.5 font-semibold rounded-xl transition-all ${isScrolled ? 'text-purple-600 hover:bg-purple-50' : 'text-gray-900 hover:bg-white/20'}`}>
                      Sign In
                    </button>
                  </Link>
                  <Link href="/register">
                    <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                      Get Started
                    </button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${isScrolled ? 'text-gray-700 hover:text-purple-600 hover:bg-purple-50' : 'text-gray-900 hover:bg-white/20'}`}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden bg-white rounded-2xl shadow-xl mt-2 p-2"
              >
                <div className="space-y-1">
                  <Link href="/#home" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all">Home</Link>
                  <Link href="/#features" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all">Features</Link>
                  <Link href="/#services" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all">Services</Link>
                  <Link href="/#testimonials" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all">Reviews</Link>
                  
                  <div className="pt-2 px-2 pb-2 space-y-2">
                    {user ? (
                      <>
                        <Link href={getDashboardLink()} onClick={() => setMobileMenuOpen(false)} className="block w-full px-4 py-3 bg-purple-50 text-purple-600 font-bold rounded-xl text-center">
                          Dashboard
                        </Link>
                        <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="block w-full px-4 py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-all border border-red-100">
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block">
                          <button className="w-full px-4 py-3 text-purple-600 font-semibold hover:bg-purple-50 rounded-xl transition-all border border-purple-100">
                            Sign In
                          </button>
                        </Link>
                        <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="block">
                          <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg">
                            Get Started
                          </button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}
