import { motion } from 'motion/react';
import { Search, Star, Heart } from 'lucide-react';

export function HeroSectionV2() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 pt-32 pb-20">
      {/* Decorative Blobs */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-300/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg mb-6"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-gray-700">
                1000+ Active Nannies
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
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute bottom-2 left-0 h-4 bg-yellow-300 -z-0"
                />
              </span>
              <br />
              Match Today! 🌟
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Connect with verified, experienced childcare professionals in your area. Safe, reliable, and trusted by thousands of families across Kenya.
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-2xl p-3 mb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                  <Search className="text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Enter your location..."
                    className="flex-1 bg-transparent border-none outline-none text-gray-900"
                  />
                </div>
                <button className="px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                  Search Now
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white"
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-bold text-gray-900">5,000+</div>
                  <div className="text-gray-600">Happy clients</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-bold text-gray-900">4.9/5</div>
                  <div className="text-gray-600">Rating</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Large Image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="col-span-2 relative rounded-3xl overflow-hidden shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1769451742207-769a728dbb3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbW90aGVyJTIwY2hpbGQlMjBsb3ZlfGVufDF8fHx8MTc3NTEyODczNXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Childcare"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                  <Heart className="text-red-500 fill-red-500" size={16} />
                  <span className="text-sm font-bold">Verified</span>
                </div>
              </motion.div>

              {/* Small Images */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1592599457566-c660153d9548?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCbGFjayUyMGZhbWlseSUyMGhhcHB5JTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzc1MTI4NzM1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Learning"
                  className="w-full h-48 object-cover"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1761168434263-1a01b07b64d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwY2hpbGRyZW4lMjBwbGF5aW5nJTIwam95ZnVsfGVufDF8fHx8MTc3NTEyODczNXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Happy children"
                  className="w-full h-48 object-cover"
                />
              </motion.div>
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6"
            >
              <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                98%
              </div>
              <div className="text-sm text-gray-600 font-semibold">
                Match Success Rate
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}