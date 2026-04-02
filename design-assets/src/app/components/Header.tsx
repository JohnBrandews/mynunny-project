import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                MyNunny
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-teal-600 transition-colors">
              Home
            </a>
            <a href="#features" className="text-gray-700 hover:text-teal-600 transition-colors">
              Why Us
            </a>
            <a href="#services" className="text-gray-700 hover:text-teal-600 transition-colors">
              Services
            </a>
            <a href="#about" className="text-gray-700 hover:text-teal-600 transition-colors">
              About Us
            </a>
            <a href="#contact" className="text-gray-700 hover:text-teal-600 transition-colors">
              Contact Us
            </a>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <button className="px-5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-teal-600"
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
              <div className="py-4 space-y-3">
                <a
                  href="#home"
                  className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="#features"
                  className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Why Us
                </a>
                <a
                  href="#services"
                  className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </a>
                <a
                  href="#about"
                  className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </a>
                <a
                  href="#contact"
                  className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact Us
                </a>
                <button className="w-full px-4 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-200">
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
