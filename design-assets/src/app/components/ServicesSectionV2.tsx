import { motion } from 'motion/react';
import { MapPin, DollarSign, Calendar, TrendingUp } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'General House Chores',
    price: 'KES 70,000',
    period: '/month',
    description: 'I need a general cleaner and a babysitter too',
    location: 'Ongata Rongai',
    county: 'Kajiado',
    postedBy: 'Berrin Bendy',
    daysAgo: '2 days ago',
    type: 'Featured',
    color: 'purple',
    bgGradient: 'from-purple-500 to-indigo-500',
  },
  {
    id: 2,
    title: 'Babysitter',
    price: 'KES 10,000',
    period: '/month',
    description: 'Help with child care for my 2-year-old',
    location: 'Busia',
    county: 'Busia',
    postedBy: 'Felix Maloba',
    daysAgo: '3 days ago',
    type: 'Urgent',
    color: 'pink',
    bgGradient: 'from-pink-500 to-rose-500',
  },
  {
    id: 3,
    title: 'Cleaner',
    price: 'KES 5,500',
    period: '/week',
    description: 'I need a cleaner for my apartment twice a week',
    location: 'Westlands',
    county: 'Nairobi',
    postedBy: 'Layra Brandews',
    daysAgo: '5 days ago',
    type: 'New',
    color: 'indigo',
    bgGradient: 'from-indigo-500 to-blue-500',
  },
  {
    id: 4,
    title: 'General House Chores',
    price: 'KES 6,000',
    period: '/month',
    description: 'Looking for reliable house help',
    location: 'Molo',
    county: 'Nakuru',
    postedBy: 'Father Looks',
    daysAgo: '1 week ago',
    type: 'Open',
    color: 'emerald',
    bgGradient: 'from-emerald-500 to-teal-500',
  },
  {
    id: 5,
    title: 'Babysitter',
    price: 'KES 8,000',
    period: '/month',
    description: 'I want a babysitter for my baby boy',
    location: 'Subukia',
    county: 'Nakuru',
    postedBy: 'Layra Brandews',
    daysAgo: '1 week ago',
    type: 'Open',
    color: 'violet',
    bgGradient: 'from-violet-500 to-purple-500',
  },
  {
    id: 6,
    title: 'Elder Care',
    price: 'KES 15,000',
    period: '/month',
    description: 'Looking for compassionate elderly care',
    location: 'Karen',
    county: 'Nairobi',
    postedBy: 'Jane Smith',
    daysAgo: '3 days ago',
    type: 'New',
    color: 'orange',
    bgGradient: 'from-orange-500 to-amber-500',
  },
];

const typeStyles: Record<string, string> = {
  Featured: 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white',
  Urgent: 'bg-gradient-to-r from-red-500 to-pink-500 text-white',
  New: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
  Open: 'bg-gray-100 text-gray-700',
};

export function ServicesSectionV2() {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg mb-4">
            <TrendingUp className="text-purple-600" size={18} />
            <span className="text-sm font-bold text-gray-700">
              TRENDING REQUESTS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Active Service{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              Opportunities
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Browse and apply to the latest childcare requests in your area
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Card */}
              <div className="h-full bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-purple-200">
                {/* Header with Gradient */}
                <div className={`bg-gradient-to-r ${service.bgGradient} p-6 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${typeStyles[service.type]}`}>
                        {service.type}
                      </span>
                      <div className="text-right">
                        <div className="text-2xl font-black text-white">
                          {service.price}
                        </div>
                        <div className="text-sm text-white/80">{service.period}</div>
                      </div>
                    </div>
                    <h3 className="text-xl font-black text-white mb-2">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Meta Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${service.bgGradient} flex items-center justify-center`}>
                        <MapPin className="text-white" size={16} />
                      </div>
                      <span className="font-medium">
                        {service.location}, {service.county}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Calendar className="text-gray-600" size={16} />
                      </div>
                      <span>Posted {service.daysAgo}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${service.bgGradient} flex items-center justify-center text-white font-bold`}>
                        {service.postedBy[0]}
                      </div>
                      <div className="text-sm">
                        <div className="font-bold text-gray-900">{service.postedBy}</div>
                        <div className="text-gray-500">Client</div>
                      </div>
                    </div>
                    <button
                      className={`px-4 py-2 bg-gradient-to-r ${service.bgGradient} text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all`}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl`} />
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-3xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-2">150+</div>
              <div className="text-purple-100">Active Requests</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-2">1000+</div>
              <div className="text-purple-100">Available Nannies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-2">24h</div>
              <div className="text-purple-100">Avg. Match Time</div>
            </div>
          </div>
          <div className="text-center">
            <button className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all">
              View All Opportunities →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
