import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export function FooterV2() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">👶</span>
              </div>
              <div>
                <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  MyNunny
                </span>
                <div className="text-xs text-gray-500">Trusted Care</div>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-sm">
              Connecting families with trusted, professional nannies across Kenya. Your child's safety and happiness is our top priority.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 flex items-center justify-center transition-all duration-300 group"
              >
                <Facebook size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 flex items-center justify-center transition-all duration-300 group"
              >
                <Twitter size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 flex items-center justify-center transition-all duration-300 group"
              >
                <Instagram size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 flex items-center justify-center transition-all duration-300 group"
              >
                <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Find a Nanny', 'Become a Nanny', 'How It Works'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-4 text-lg">Services</h4>
            <ul className="space-y-3">
              {['Babysitting', 'House Cleaning', 'Elder Care', 'Pet Care', 'Tutoring'].map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 text-lg">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={20} className="text-purple-400 mt-1 flex-shrink-0" />
                <span>Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={20} className="text-purple-400 flex-shrink-0" />
                <span>+254 700 000 000</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={20} className="text-purple-400 flex-shrink-0" />
                <span>hello@mynunny.co.ke</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-12 border-t border-gray-800">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-white font-bold text-2xl mb-3">
              Stay Updated! 📧
            </h4>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter for the latest updates and exclusive offers
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 text-white placeholder:text-gray-500"
              />
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} MyNunny. All rights reserved. Made with ❤️ in Kenya
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
