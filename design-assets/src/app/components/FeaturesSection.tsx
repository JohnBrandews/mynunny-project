import { motion } from 'motion/react';
import { CheckCircle2, MapPin, DollarSign, Shield, Clock, Users } from 'lucide-react';

const features = [
  {
    icon: CheckCircle2,
    title: 'Verified Professionals',
    description: 'All nannies are verified and approved by our admin team',
    color: 'from-teal-500 to-emerald-500',
  },
  {
    icon: MapPin,
    title: 'Local Service',
    description: 'Find nannies in your county and constituency',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: DollarSign,
    title: 'Fair Pricing',
    description: 'Transparent pricing with no hidden fees',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Shield,
    title: 'Background Checks',
    description: 'Comprehensive background verification for your peace of mind',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock customer support for any assistance',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Users,
    title: 'Community Trust',
    description: 'Join thousands of satisfied families across Kenya',
    color: 'from-green-500 to-teal-500',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              MyNunny?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We connect clients with verified, reliable nannies across Kenya
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="h-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                    >
                      <Icon className="text-white" size={32} />
                    </div>
                    {/* Glow effect */}
                    <div
                      className={`absolute inset-0 w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>

                  {/* Decorative element */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600 mb-6">
            Ready to find your perfect nanny match?
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-teal-500/50 hover:scale-105 transition-all duration-300">
            Get Started Today
          </button>
        </motion.div>
      </div>
    </section>
  );
}
