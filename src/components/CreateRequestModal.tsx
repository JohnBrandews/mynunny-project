'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, DollarSign, MapPin, ClipboardList, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';

interface CreateRequestModalProps {
  onClose: () => void;
  onRequestCreated: () => void;
}

export default function CreateRequestModal({ onClose, onRequestCreated }: CreateRequestModalProps) {
  const { token } = useAuth();
  const [service, setService] = useState('');
  const [amount, setAmount] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service || !amount || !location || !description) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          service,
          amount: parseFloat(amount),
          location,
          description,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Service request posted successfully! 🚀');
        onRequestCreated();
        onClose();
      } else {
        throw new Error(data.error || 'Failed to post request');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
      >
        {/* Decorative Header */}
        <div className="h-32 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="relative z-10 flex justify-between items-center text-white">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full mb-2 border border-white/30">
                <Sparkles size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">New Opportunity</span>
              </div>
              <h2 className="text-3xl font-black tracking-tight">Post a Request</h2>
            </div>
            <button
              onClick={onClose}
              className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl hover:bg-white/20 transition-all text-white"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Service Type */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <ClipboardList size={14} className="text-purple-500" />
                Service Type
              </label>
              <input
                type="text"
                value={service}
                onChange={(e) => setService(e.target.value)}
                placeholder="e.g. Babysitting, House Cleaning"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-purple-500 transition-all font-medium placeholder:text-gray-400"
              />
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <DollarSign size={14} className="text-emerald-500" />
                Offer Amount (KES)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-purple-500 transition-all font-medium placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <MapPin size={14} className="text-indigo-500" />
              Specific Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Westlands, Near Sarit Centre"
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-purple-500 transition-all font-medium placeholder:text-gray-400"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <Sparkles size={14} className="text-pink-500" />
              Job Details
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you need, specific requirements, and timing..."
              rows={4}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-purple-500 transition-all font-medium placeholder:text-gray-400 resize-none"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-black rounded-2xl shadow-xl hover:shadow-purple-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-100"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Post Opportunity Now
                  <Send size={20} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
