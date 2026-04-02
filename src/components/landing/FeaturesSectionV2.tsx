'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, CreditCard, Heart, Users, Clock } from 'lucide-react';

const features = [
  {
    title: 'Identity Verification',
    description: 'Every nanny on our platform undergoes a rigorous document verification process for your peace of mind.',
    icon: ShieldCheck,
    color: 'bg-purple-100 text-purple-600',
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    title: 'Local Matching',
    description: 'Find trusted professionals right in your neighborhood. Filter by county and constituency with ease.',
    icon: MapPin,
    color: 'bg-pink-100 text-pink-600',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    title: 'Transparent Pricing',
    description: 'Clear rates up-front. No hidden fees or surprise charges. Negotiate directly with your chosen provider.',
    icon: CreditCard,
    color: 'bg-indigo-100 text-indigo-600',
    gradient: 'from-indigo-500 to-blue-500'
  },
  {
    title: 'Community Trusted',
    description: 'Real reviews from real families. See ratings and feedback before you make a connection.',
    icon: Heart,
    color: 'bg-red-100 text-red-600',
    gradient: 'from-red-500 to-orange-500'
  },
  {
    title: 'Dedicated Support',
    description: 'Our team is here to help you every step of the way, from registration to finding the perfect match.',
    icon: Users,
    color: 'bg-green-100 text-green-600',
    gradient: 'from-green-500 to-teal-500'
  },
  {
    title: 'Quick Response',
    description: 'Post your request and get responses within hours. Efficient matching for your busy schedule.',
    icon: Clock,
    color: 'bg-yellow-100 text-yellow-600',
    gradient: 'from-yellow-500 to-amber-500'
  }
];

export function FeaturesSectionV2() {
  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-purple-50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-purple-50 text-purple-600 rounded-full text-sm font-bold tracking-wide uppercase mb-4"
          >
            Why Choose Us
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-gray-900 mb-6"
          >
            Setting the Standard in{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Childcare Excellence
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            We've built the most reliable platform connecting Kenyan families with professional nannies, focusing on safety, trust, and quality.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                <feature.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                {feature.description}
              </p>
              <div className="mt-6 flex items-center gap-2 overflow-hidden h-1">
                <div className={`h-full w-full bg-gradient-to-r ${feature.gradient} transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
