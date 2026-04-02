'use client';

import { motion } from 'framer-motion';
import { LucideIcon, MapPin, Calendar, ExternalLink, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DashboardCardV2Props {
  title: string;
  subtitle: string;
  description: string;
  price?: string | number;
  location?: string;
  date?: string;
  accentGradient: string; // e.g. "from-purple-600 to-pink-600"
  btnText: string;
  onBtnClick?: () => void;
  statusBadge?: {
    text: string;
    classes: string;
  };
  image?: string;
  initial?: string;
  rating?: {
    score: number;
    count: number;
  };
  secondaryBtn?: {
    text: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
}

export function DashboardCardV2({ 
  title, 
  subtitle, 
  description, 
  price, 
  location, 
  date, 
  accentGradient, 
  btnText, 
  onBtnClick, 
  statusBadge,
  image,
  initial,
  rating,
  secondaryBtn
}: DashboardCardV2Props) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full group"
    >
      {/* Header with Gradient Background for Avatar/Icon */}
      <div className={`h-2 bg-gradient-to-r ${accentGradient}`} />
      
      <div className="p-8 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${accentGradient} p-[2px]`}>
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden">
                {image ? (
                  <img src={image} alt={title} className="w-full h-full object-cover" />
                ) : (
                  <span className={`text-xl font-black bg-gradient-to-br ${accentGradient} bg-clip-text text-transparent`}>
                    {initial || title[0]}
                  </span>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 leading-tight mb-0.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-all">
                {title}
              </h3>
              <div className="flex items-center gap-2">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{subtitle}</div>
                {rating && (
                   <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded-lg border border-yellow-100">
                      <Star size={10} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-[10px] font-black text-yellow-700">{rating.score || 'New'}</span>
                      <span className="text-[10px] font-bold text-yellow-400">({rating.count})</span>
                   </div>
                )}
              </div>
            </div>
          </div>
          {statusBadge && (
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${statusBadge.classes}`}>
              {statusBadge.text}
            </span>
          )}
        </div>

        {price && (
          <div className="mb-6">
            <div className={`text-2xl font-black bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent inline-block`}>
              {typeof price === 'number' ? `KES ${price.toLocaleString()}` : price}
            </div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pricing Model</div>
          </div>
        )}

        <p className="text-gray-600 font-medium leading-relaxed mb-8 line-clamp-3">
          {description}
        </p>

        {/* Footer Meta */}
        <div className="mt-auto space-y-3 pb-8">
          {location && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-purple-500 transition-colors">
                <MapPin size={16} />
              </div>
              <span className="text-sm font-bold text-gray-600">{location}</span>
            </div>
          )}
          {date && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-purple-500 transition-colors">
                <Calendar size={16} />
              </div>
              <span className="text-sm font-bold text-gray-600">{date}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {secondaryBtn && (
            <button
              onClick={secondaryBtn.onClick}
              className="flex-1 py-4 bg-gray-50 text-gray-700 font-black rounded-2xl hover:bg-gray-100 transition-all flex items-center justify-center gap-2 border border-gray-100"
            >
              {secondaryBtn.icon && <secondaryBtn.icon size={18} />}
              {secondaryBtn.text}
            </button>
          )}
          <button
            onClick={onBtnClick}
            className={`flex-1 py-4 bg-gradient-to-r ${accentGradient} text-white font-black rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group/btn`}
          >
            {btnText}
            {!secondaryBtn && <ExternalLink size={18} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
