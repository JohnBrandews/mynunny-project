'use client';

import { motion } from 'framer-motion';
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
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-100 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2" />

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
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what our happy clients have to say about their experiences with MyNunny.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="group h-full"
            >
              <div className="h-full bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-purple-200 relative flex flex-col">
                {/* Quote Icon */}
                <div className={`absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br ${testimonial.gradient} rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}>
                  <Quote className="text-white" size={24} />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-700 leading-relaxed mb-8 text-lg font-medium italic grow">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-3xl shadow-lg shrink-0`}>
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-black text-gray-900 text-lg leading-tight mb-1">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-500 text-xs font-bold uppercase tracking-wider">
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
          className="mt-20 text-center"
        >
          <div className="inline-grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="flex flex-col items-center gap-2">
              <div className="text-2xl font-black text-purple-600">4.9/5</div>
              <div>
                <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Average Rating</div>
              </div>
            </div>
            <div className="hidden md:block w-px h-full bg-gray-100" />
            <div className="flex flex-col items-center gap-2">
              <div className="text-2xl">💬</div>
              <div>
                <div className="text-3xl font-black text-gray-900 leading-none">2,500+</div>
                <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Happy Reviews</div>
              </div>
            </div>
            <div className="hidden md:block w-px h-full bg-gray-100" />
            <div className="flex flex-col items-center gap-2">
              <div className="text-2xl">✅</div>
              <div>
                <div className="text-3xl font-black text-gray-900 leading-none">100%</div>
                <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Verified Care</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
