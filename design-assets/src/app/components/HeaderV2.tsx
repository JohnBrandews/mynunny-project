import { Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function HeaderV2() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white text-center py-2 text-sm">
        <div className="flex items-center justify-center gap-2">
          <Sparkles size={16} />
          <span>🎉 Special Offer: Get 20% off your first booking!</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white/95 backdrop-blur-lg shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl">👶</span>
                </div>
                <div>
                  <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    MyNunny
                  </span>
                  <div className="text-xs text-gray-500">Trusted Care</div>
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <a href="#home" className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">
                Home
              </a>
              <a href="#features" className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">
                Features
              </a>
              <a href="#services" className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">
                Services
              </a>
              <a href="#testimonials" className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">
                Reviews
              </a>
              <a href="#contact" className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">
                Contact
              </a>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <button className="px-5 py-2.5 text-purple-600 font-semibold hover:bg-purple-50 rounded-xl transition-all">
                Sign In
              </button>
              <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg"
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
                className="md:hidden overflow-hidden"
              >
                <div className="py-4 space-y-2">
                  <a
                    href="#home"
                    className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </a>
                  <a
                    href="#features"
                    className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </a>
                  <a
                    href="#services"
                    className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Services
                  </a>
                  <a
                    href="#testimonials"
                    className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Reviews
                  </a>
                  <a
                    href="#contact"
                    className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </a>
                  <div className="pt-2 space-y-2">
                    <button className="w-full px-4 py-3 text-purple-600 font-semibold hover:bg-purple-50 rounded-xl transition-all">
                      Sign In
                    </button>
                    <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg">
                      Get Started
                    </button>
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
