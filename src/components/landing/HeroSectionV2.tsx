'use client';

import { motion } from 'framer-motion';
import { Search, Star, Heart } from 'lucide-react';
import { useState } from 'react';

interface HeroSectionV2Props {
  onSearch?: (query: string) => void;
}

export function HeroSectionV2({ onSearch }: HeroSectionV2Props) {
  const [localQuery, setLocalQuery] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(localQuery);
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 pt-32 pb-20">
      {/* Decorative Blobs */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-300/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg mb-6 border border-purple-100"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-gray-700">
                1000+ Active Nannies Across Kenya
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
              Find Your Perfect{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                  Nanny
                </span>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute bottom-2 left-0 h-4 bg-yellow-300 -z-0"
                />
              </span>
              <br />
              Match Today! 🌟
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
              Connect with verified, experienced childcare professionals in your area. Safe, reliable, and trusted by thousands of families across Kenya.
            </p>

            {/* Search Bar / CTA area */}
            <div className="bg-white rounded-2xl shadow-2xl p-3 mb-8 border border-purple-100 max-w-lg">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                  <Search className="text-gray-400" size={20} />
                  <input
                    type="text"
                    value={localQuery}
                    onChange={(e) => setLocalQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Enter your location (e.g. Westlands)..."
                    className="flex-1 bg-transparent border-none outline-none text-gray-900 font-medium placeholder:text-gray-400"
                  />
                </div>
                <button 
                  onClick={handleSearch}
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  Search Now
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white shadow-sm overflow-hidden"
                    >
                      <img src={`https://i.pravatar.cc/100?u=${i+20}`} alt="user" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-bold text-gray-900">5,000+</div>
                  <div className="text-gray-600 font-medium">Happy families</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={18} />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-bold text-gray-900">4.9/5</div>
                  <div className="text-gray-600 font-medium">Platform Rating</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Large Image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="col-span-2 relative rounded-3xl overflow-hidden shadow-2xl h-80"
              >
                <img
                  src="/hero-main.png"
                  alt="Professional Childcare"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                  <Heart className="text-red-500 fill-red-500" size={16} />
                  <span className="text-sm font-bold text-gray-800">Verified Professionals</span>
                </div>
              </motion.div>

              {/* Small Images */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative rounded-2xl overflow-hidden shadow-xl h-48"
              >
                <img
                  src="/hero-nunny.png"
                  alt="Nanny Services"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative rounded-2xl overflow-hidden shadow-xl h-48"
              >
                <img
                  src="/hero-cleaner.png"
                  alt="House Cleaning Services"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6 border border-purple-50"
            >
              <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                98%
              </div>
              <div className="text-sm text-gray-600 font-bold uppercase tracking-wider">
                Success Rate
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
