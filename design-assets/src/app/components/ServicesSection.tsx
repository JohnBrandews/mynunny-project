import { motion } from 'motion/react';
import { MapPin, User, ArrowRight } from 'lucide-react';

const serviceRequests = [
  {
    id: 1,
    title: 'General House Chores',
    price: 'KES 70,000',
    description: 'I need a general cleaner and a babysitter too',
    location: 'Ongata Rongai, Kajiado',
    postedBy: 'Berrin Bendy',
    area: 'Kajiado',
    category: 'house-chores',
  },
  {
    id: 2,
    title: 'General House Chores',
    price: 'KES 6,000',
    description: 'Here',
    location: 'Nakuru, Molo',
    postedBy: 'Father Looks',
    area: 'Nakuru',
    category: 'house-chores',
  },
  {
    id: 3,
    title: 'Babysitter',
    price: 'KES 10,000',
    description: 'Help with child care',
    location: 'Busia',
    postedBy: 'Felix Maloba',
    area: 'Busia',
    category: 'babysitter',
  },
  {
    id: 4,
    title: 'Cleaner',
    price: 'KES 5,500',
    description: 'I need a cleaner for my apartment',
    location: 'Westlands, Nairobi',
    postedBy: 'Layra Brandews',
    area: 'Nyeri',
    category: 'cleaner',
  },
  {
    id: 5,
    title: 'Babysitter',
    price: 'KES 8,000',
    description: 'I want a babysitter for my baby boy',
    location: 'Subukia, Nakuru',
    postedBy: 'Layra Brandews',
    area: 'Nyeri',
    category: 'babysitter',
  },
];

const categoryColors: Record<string, string> = {
  'house-chores': 'bg-blue-100 text-blue-700 border-blue-200',
  'babysitter': 'bg-purple-100 text-purple-700 border-purple-200',
  'cleaner': 'bg-teal-100 text-teal-700 border-teal-200',
};

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
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
            Recent Service{' '}
            <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Requests
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            See what services clients are looking for
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {serviceRequests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-xl border-2 border-gray-100 hover:border-teal-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${
                        categoryColors[request.category]
                      }`}
                    >
                      {request.title}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-teal-600">
                      {request.price}
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-2">{request.description}</p>

                {/* Location */}
                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <MapPin size={16} className="mr-2 text-teal-600" />
                  <span>{request.location}</span>
                </div>

                {/* Posted By */}
                <div className="flex items-center text-gray-600 text-sm pb-4 border-b border-gray-100">
                  <User size={16} className="mr-2 text-gray-400" />
                  <span>
                    Posted by <span className="font-medium text-gray-900">{request.postedBy}</span> • {request.area}
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 bg-white">
                <button className="w-full px-4 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 group">
                  View Details
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <button className="px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 hover:shadow-xl hover:scale-105 transition-all duration-300">
            View All Requests
          </button>
        </motion.div>
      </div>
    </section>
  );
}
