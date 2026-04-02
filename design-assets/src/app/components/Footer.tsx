import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent mb-4">
              MyNunny
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Connecting families with trusted, professional nannies across Kenya. Your peace of mind is our priority.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-teal-600 flex items-center justify-center transition-colors duration-300"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-teal-600 flex items-center justify-center transition-colors duration-300"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-teal-600 flex items-center justify-center transition-colors duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-teal-600 flex items-center justify-center transition-colors duration-300"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="hover:text-teal-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-teal-400 transition-colors">
                  Why Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-teal-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-teal-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Find a Nanny
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Become a Nanny
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Babysitting Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  House Cleaning
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Elder Care
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-teal-400 mt-1 flex-shrink-0" />
                <span>Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-teal-400 flex-shrink-0" />
                <span>+254 700 000 000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-teal-400 flex-shrink-0" />
                <span>info@mynunny.co.ke</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-white font-semibold mb-3">Subscribe to Our Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest updates and special offers
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-teal-500 text-white"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} MyNunny. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-teal-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-teal-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-teal-400 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
