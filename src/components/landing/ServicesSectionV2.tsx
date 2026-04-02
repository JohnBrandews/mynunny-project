'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar, TrendingUp, Loader2, SearchX } from 'lucide-react';
import Link from 'next/link';

interface Request {
  id: string;
  service: string;
  amount: number;
  location: string;
  description: string;
  createdAt: string;
  user: {
    fullName: string;
    county: string;
  };
}

interface ServicesSectionV2Props {
  requests: Request[];
  loading: boolean;
  searchQuery?: string;
}

const bgGradients = [
  'from-purple-500 to-indigo-500',
  'from-pink-500 to-rose-500',
  'from-indigo-500 to-blue-500',
  'from-emerald-500 to-teal-500',
  'from-violet-500 to-purple-500',
  'from-orange-500 to-amber-500',
];

export function ServicesSectionV2({ requests, loading, searchQuery = '' }: ServicesSectionV2Props) {
  const filteredRequests = searchQuery.trim() 
    ? requests.filter(r => 
        r.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.user.county.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.service.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : requests;

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg mb-4 border border-purple-50">
            <TrendingUp className="text-purple-600" size={18} />
            <span className="text-sm font-bold text-gray-700">
              ACTIVE OPPORTUNITIES
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Service{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              Opportunities
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse and apply to the latest childcare requests in your area. Trusted families are waiting for your expertise.
          </p>
          {searchQuery && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-purple-600 font-bold"
            >
              Showing results for &quot;{searchQuery}&quot;
            </motion.p>
          )}
        </motion.div>

        {/* Services Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
            <p className="text-gray-500 font-medium tracking-wide">Loading opportunities...</p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center"
          >
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
              <SearchX size={40} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">No matches found</h3>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              We couldn&apos;t find any opportunities matching &quot;{searchQuery}&quot;. Try searching for a different location or county.
            </p>
            {searchQuery && (
               <button 
                onClick={() => window.location.reload()} 
                className="mt-6 text-purple-600 font-black hover:underline"
               >
                 Clear Search
               </button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredRequests.map((request, index) => {
              const gradient = bgGradients[index % bgGradients.length];
              return (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative h-full"
                >
                  {/* Card Content */}
                  <div className="h-full bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col">
                    {/* Header with Gradient */}
                    <div className={`bg-gradient-to-br ${gradient} p-8 relative overflow-hidden shrink-0`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                      <div className="relative z-10 flex justify-between items-start">
                        <div className="space-y-1">
                          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                            {request.service.split(' ')[0]}
                          </span>
                          <h3 className="text-2xl font-black text-white leading-tight">
                            {request.service}
                          </h3>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-black text-white">
                            KES {request.amount.toLocaleString()}
                          </div>
                          <div className="text-xs text-white/80 font-bold uppercase tracking-wider">Per Month</div>
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-8 flex flex-col flex-1">
                      <p className="text-gray-600 mb-8 line-clamp-3 leading-relaxed font-medium">
                        {request.description}
                      </p>

                      {/* Meta Info */}
                      <div className="space-y-4 mt-auto">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg shadow-purple-200`}>
                            <MapPin className="text-white" size={20} />
                          </div>
                          <div>
                            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Location</div>
                            <div className="font-bold text-gray-900">{request.location}, {request.user.county}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center">
                            <Calendar className="text-gray-400" size={20} />
                          </div>
                          <div>
                            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Posted On</div>
                            <div className="font-bold text-gray-700">{new Date(request.createdAt).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-50">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} p-[2px]`}>
                            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-gray-900 font-black text-lg">
                              {request.user.fullName[0]}
                            </div>
                          </div>
                          <div>
                            <div className="font-black text-gray-900 leading-none mb-1">{request.user.fullName}</div>
                            <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">Verified Client</div>
                          </div>
                        </div>
                        <Link href="/login">
                          <button
                            className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 active:scale-95 group/btn`}
                          >
                            <span className="font-bold text-xl transition-transform group-hover/btn:translate-x-0.5">→</span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* View All Button */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="text-center"
        >
          <Link href="/login">
            <button className="px-10 py-5 bg-gray-900 text-white font-black rounded-2xl shadow-xl hover:shadow-2xl hover:bg-black hover:scale-105 transition-all group">
              Browse All Active Opportunities
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
