'use client';

import { motion } from 'framer-motion';
import { Rocket, Sparkles, CheckCircle2, ShieldCheck, Banknote, Headphones } from 'lucide-react';
import Link from 'next/link';

export function CTASectionV2() {
  return (
    <section className="relative py-32 overflow-hidden bg-gray-900">
      {/* Animated Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 via-pink-600/90 to-indigo-600/90 z-0" />

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Floating Decorative Elements */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-[10%] w-24 h-24 bg-white/10 rounded-[2rem] backdrop-blur-xl border border-white/20 z-0"
      />
      <motion.div
        animate={{
          y: [0, 30, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-[10%] w-32 h-32 bg-white/10 rounded-full backdrop-blur-xl border border-white/20 z-0"
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Floating Badge */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/30 mb-10 shadow-2xl"
          >
            <Sparkles className="text-yellow-300" size={20} />
            <span className="text-white font-black text-sm uppercase tracking-widest">
              Join 5,000+ Happy Families Today
            </span>
          </motion.div>

          {/* Main Heading */}
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tight">
            Ready to Find Your
            <br />
            <span className="relative inline-block mt-2">
              <span className="relative z-10">Perfect Match?</span>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 1 }}
                className="absolute -bottom-2 left-0 h-4 bg-yellow-400 rounded-full -z-10 opacity-80"
              />
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-white/90 mb-14 max-w-3xl mx-auto leading-relaxed font-medium">
            Take the first step towards stress-free childcare. Our community of verified professionals is ready to support your family's needs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,255,255,0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="group px-12 py-6 bg-white text-gray-900 font-black rounded-2xl shadow-2xl transition-all text-xl flex items-center gap-3"
              >
                <Rocket className="group-hover:rotate-12 transition-transform text-purple-600" size={28} />
                Get Started Free
              </motion.button>
            </Link>
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-transparent text-white border-[3px] border-white font-black rounded-2xl backdrop-blur-sm transition-all text-xl"
              >
                Sign In
              </motion.button>
            </Link>
          </div>

          {/* Trust Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { icon: CheckCircle2, text: 'Quick Matching', color: 'text-green-300' },
              { icon: ShieldCheck, text: '100% Verified', color: 'text-blue-300' },
              { icon: Banknote, text: 'No Hidden Fees', color: 'text-yellow-300' },
              { icon: Headphones, text: '24/7 Support', color: 'text-pink-300' },
            ].map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -10, backgroundColor: 'rgba(255,255,255,0.15)' }}
                className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 transition-all duration-300 group"
              >
                <div className={`mb-4 flex justify-center transition-transform group-hover:scale-110 ${item.color}`}>
                  <item.icon size={40} strokeWidth={2.5} />
                </div>
                <div className="text-white font-black text-lg leading-tight uppercase tracking-wide">{item.text}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
