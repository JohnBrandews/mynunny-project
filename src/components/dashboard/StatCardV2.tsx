'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardV2Props {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accentGradient: string; // e.g. "from-purple-600 to-indigo-600"
  subtitle?: string;
}

export function StatCardV2({ label, value, icon: Icon, accentGradient, subtitle }: StatCardV2Props) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex items-center gap-6 relative overflow-hidden group transition-all duration-300 hover:shadow-2xl"
    >
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${accentGradient} flex items-center justify-center text-white shadow-lg shadow-purple-200 group-hover:scale-110 transition-transform duration-500`}>
        <Icon size={32} />
      </div>

      <div className="flex-1">
        <div className="text-4xl font-black text-gray-900 leading-none mb-1">
          {value}
        </div>
        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">
          {label}
        </div>
        {subtitle && (
          <div className="mt-2 text-xs font-medium text-gray-500 italic">
            {subtitle}
          </div>
        )}
      </div>

      {/* Decorative Blob */}
      <div className={`absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br ${accentGradient} opacity-[0.03] rounded-full blur-2xl group-hover:opacity-[0.08] transition-opacity`} />
    </motion.div>
  );
}
