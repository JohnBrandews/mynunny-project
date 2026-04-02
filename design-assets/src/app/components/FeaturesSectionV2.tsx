import { motion } from 'motion/react';
import { Shield, Clock, Award, Users, Heart, Zap } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Background Verified',
    description: 'All our nannies undergo thorough background checks',
    gradient: 'from-purple-500 to-indigo-500',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Clock,
    title: 'Quick Matching',
    description: 'Find your perfect nanny in under 24 hours',
    gradient: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
  },
  {
    icon: Award,
    title: 'Certified Professionals',
    description: 'Only experienced and certified caregivers',
    gradient: 'from-indigo-500 to-blue-500',
    bgColor: 'bg-indigo-50',
  },
  {
    icon: Users,
    title: 'Large Community',
    description: 'Access to 1000+ verified nannies nationwide',
    gradient: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
  },
  {
    icon: Heart,
    title: 'Care with Love',
    description: 'Passionate professionals who truly care',
    gradient: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-50',
  },
  {
    icon: Zap,
    title: 'Instant Connect',
    description: 'Direct messaging with potential matches',
    gradient: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-50',
  },
];

export function FeaturesSectionV2() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4">
            <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              WHY CHOOSE US
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Everything You Need for{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              Peace of Mind
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We make finding trusted childcare simple, safe, and stress-free
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isLarge = index === 0 || index === 3;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative ${
                  isLarge ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className={`h-full ${feature.bgColor} rounded-3xl p-8 transition-all duration-300 border-2 border-transparent hover:border-gray-200`}>
                  {/* Icon with gradient background */}
                  <div className="relative mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}
                    >
                      <Icon className="text-white" size={28} />
                    </div>
                    
                    {/* Decorative dots */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 grid grid-cols-2 gap-1">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${feature.gradient} opacity-50`} />
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${feature.gradient} opacity-30`} />
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${feature.gradient} opacity-30`} />
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${feature.gradient} opacity-10`} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-black text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {feature.description}
                  </p>

                  {/* Hover Arrow */}
                  <div className="mt-6 flex items-center gap-2 text-transparent group-hover:text-gray-400 transition-colors duration-300">
                    <span className="text-sm font-semibold">Learn more</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-2 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-2xl p-1 shadow-xl">
            <div className="bg-white rounded-xl px-8 py-4 m-1">
              <p className="text-gray-900 font-bold">
                Ready to get started? Join 5,000+ happy families!
              </p>
            </div>
            <button className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:scale-105 transition-transform mr-1">
              Find a Nanny
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
