'use client';

import { Mail, Phone, MapPin, ArrowRight, Globe } from 'lucide-react';
import Link from 'next/link';

// Custom Social Icons since they are missing in this lucide-react version
const Facebook = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const Twitter = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const Instagram = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const Linkedin = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);

export function FooterV2() {
  return (
    <footer className="bg-gray-900 text-gray-300 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl -ml-32 -mb-32" />

      {/* Main Footer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                <span className="text-white text-2xl -rotate-3">👶</span>
              </div>
              <div>
                <span className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
                  MyNunny
                </span>
                <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">Trusted Care Kenya</div>
              </div>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
              The premier platform connecting families with professional, verified childcare providers. Safety, trust, and quality at your fingertips.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-gray-800/50 backdrop-blur-md border border-gray-700 hover:border-purple-500 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 flex items-center justify-center transition-all duration-500 group shadow-lg"
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-black text-xl tracking-tight uppercase">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/#home" className="text-gray-400 hover:text-purple-400 transition-all duration-300 flex items-center gap-2 group font-medium text-lg">
                  <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all text-purple-500" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-purple-400 transition-all duration-300 flex items-center gap-2 group font-medium text-lg">
                  <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all text-purple-500" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/register?role=client" className="text-gray-400 hover:text-purple-400 transition-all duration-300 flex items-center gap-2 group font-medium text-lg">
                  <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all text-purple-500" />
                  Find a Nanny
                </Link>
              </li>
              <li>
                <Link href="/register?role=nunny" className="text-gray-400 hover:text-purple-400 transition-all duration-300 flex items-center gap-2 group font-medium text-lg">
                  <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all text-purple-500" />
                  Become a Nanny
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-gray-400 hover:text-purple-400 transition-all duration-300 flex items-center gap-2 group font-medium text-lg">
                  <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all text-purple-500" />
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-white font-black text-xl tracking-tight uppercase">Services</h4>
            <ul className="space-y-4">
              {['Babysitting', 'House Cleaning', 'Elder Care', 'Pet Care', 'Tutoring'].map((service) => (
                <li key={service}>
                  <Link href="#" className="text-gray-400 hover:text-purple-400 transition-all duration-300 flex items-center gap-2 group font-medium text-lg">
                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all text-purple-500" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-white font-black text-xl tracking-tight uppercase">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-gray-400 group">
                <div className="w-10 h-10 rounded-xl bg-gray-800/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform border border-gray-700">
                  <MapPin size={20} className="text-purple-400" />
                </div>
                <span className="text-lg font-medium">Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-4 text-gray-400 group">
                <div className="w-10 h-10 rounded-xl bg-gray-800/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform border border-gray-700">
                  <Phone size={20} className="text-purple-400" />
                </div>
                <span className="text-lg font-medium">+254 700 000 000</span>
              </li>
              <li className="flex items-center gap-4 text-gray-400 group">
                <div className="w-10 h-10 rounded-xl bg-gray-800/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform border border-gray-700">
                  <Mail size={20} className="text-purple-400" />
                </div>
                <span className="text-lg font-medium">hello@mynunny.co.ke</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-24 pt-16 border-t border-gray-800">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-left space-y-2">
              <h4 className="text-white font-black text-3xl tracking-tight leading-none">
                Stay in the Loop! 📧
              </h4>
              <p className="text-gray-500 text-lg font-medium">
                Get the latest childcare trends and exclusive offers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto md:min-w-[450px]">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-8 py-5 bg-gray-800/50 border-2 border-gray-700 rounded-[1.5rem] focus:outline-none focus:border-purple-500 text-white placeholder:text-gray-500 text-lg transition-all"
              />
              <button className="px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-black rounded-[1.5rem] hover:shadow-[0_0_40px_rgba(147,51,234,0.3)] hover:scale-105 active:scale-95 transition-all text-lg tracking-wide uppercase">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-black/30 backdrop-blur-md py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-gray-500 text-sm font-semibold tracking-wide flex items-center gap-2 uppercase">
              © {new Date().getFullYear()} MyNunny • Made with <span className="text-pink-500 animate-pulse text-lg">❤️</span> in Kenya
            </p>
            <div className="flex gap-10 text-sm font-bold uppercase tracking-widest">
              <Link href="#" className="text-gray-500 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-gray-500 hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-gray-500 hover:text-white transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
