import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Mother of 2',
    location: 'Nairobi',
    image: '👩‍💼',
    rating: 5,
    text: 'MyNunny helped me find the perfect nanny for my twins. The verification process gave me complete peace of mind. Highly recommended!',
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    name: 'David Kamau',
    role: 'Single Parent',
    location: 'Mombasa',
    image: '👨‍💼',
    rating: 5,
    text: 'As a single dad, finding reliable childcare was challenging. MyNunny made it so easy! Found an amazing nanny in just 2 days.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    name: 'Grace Wanjiku',
    role: 'Working Mom',
    location: 'Kisumu',
    image: '👩',
    rating: 5,
    text: 'The platform is user-friendly and the nannies are all professionally vetted. I feel confident leaving my children in capable hands.',
    gradient: 'from-indigo-500 to-blue-500',
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-100 rounded-full blur-3xl opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4">
            <Star className="text-yellow-500 fill-yellow-500" size={18} />
            <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              TESTIMONIALS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Loved by{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              Families
            </span>
            {' '}Nationwide
          </h2>
          <p className="text-xl text-gray-600">
            See what our happy clients have to say
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="h-full bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-purple-200 relative">
                {/* Quote Icon */}
                <div className={`absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br ${testimonial.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <Quote className="text-white" size={24} />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-3xl shadow-lg`}>
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {testimonial.role} • {testimonial.location}
                    </div>
                  </div>
                </div>

                {/* Decorative gradient line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${testimonial.gradient} rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 bg-gradient-to-r from-gray-50 to-white rounded-2xl px-8 py-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="text-4xl">⭐</div>
              <div className="text-left">
                <div className="text-2xl font-black text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div className="flex items-center gap-3">
              <div className="text-4xl">💬</div>
              <div className="text-left">
                <div className="text-2xl font-black text-gray-900">2,500+</div>
                <div className="text-sm text-gray-600">Happy Reviews</div>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div className="flex items-center gap-3">
              <div className="text-4xl">✅</div>
              <div className="text-left">
                <div className="text-2xl font-black text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Verified</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
