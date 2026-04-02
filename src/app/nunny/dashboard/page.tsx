'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  MapPin, 
  Star, 
  ArrowRight, 
  Search,
  LayoutDashboard,
  ShieldCheck,
  MessageCircle,
  Briefcase,
  Phone,
  Mail,
  X,
  PlusCircle,
  Edit3
} from 'lucide-react';
import { DashboardShellV2 } from '@/components/dashboard/DashboardShellV2';
import { StatCardV2 } from '@/components/dashboard/StatCardV2';
import { DashboardCardV2 } from '@/components/dashboard/DashboardCardV2';
import EditProfileForm from '@/components/EditProfileForm';
import { Button } from '@/components/ui/Button';

interface Request {
  id: string;
  service: string;
  amount: number;
  location: string;
  description: string;
  status?: 'OPEN' | 'ASSIGNED';
  createdAt: string;
  email?: string;
  phone?: string;
  user: {
    id: string;
    fullName: string;
    email?: string;
    phone?: string;
    county: string;
    constituency: string;
    profilePictureUrl?: string;
  };
}

const ACCENT_GRADIENT = "from-emerald-600 via-teal-600 to-cyan-600";
const ACCENT_GLOW = "shadow-emerald-200";

export default function NunnyDashboard() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [showEdit, setShowEdit] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [contactInfo, setContactInfo] = useState<{ fullName: string; email?: string | null; phone?: string | null } | null>(null);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState<any[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [ratingsLoading, setRatingsLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'NUNNY') {
      router.push('/');
      return;
    }

    if (user.nunnyProfile?.status !== 'APPROVED') {
      toast.error('Account pending approval');
      return;
    }

    fetchRequests();
    fetchRatings();
  }, [user, router]);

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/requests', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setRequests(data.requests);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRatings = async () => {
    if (!user?.id) return;
    try {
      const response = await fetch(`/api/nunnies/${user.id}/ratings`);
      const data = await response.json();
      if (response.ok) {
        setRatings(data.ratings || []);
        setAverageRating(data.averageRating || 0);
        setTotalRatings(data.totalRatings || 0);
      }
    } catch (error: any) {
      console.error('Error fetching ratings:', error);
    } finally {
      setRatingsLoading(false);
    }
  };

  const handleContactClick = (request: Request) => {
    const info = {
      fullName: request.user.fullName,
      email: request.user.email ?? request.email ?? null,
      phone: request.user.phone ?? request.phone ?? null,
    };
    setContactInfo(info);
    setShowContact(true);
  };

  const formatPhoneForWhatsApp = (phone: string): string => {
    if (!phone) return '';
    let cleaned = phone.replace(/[^\d+]/g, '');
    if (cleaned.startsWith('0')) cleaned = '254' + cleaned.substring(1);
    if (!cleaned.startsWith('+')) cleaned = '+' + cleaned;
    return cleaned;
  };

  if (!user || user.role !== 'NUNNY') return null;

  // Pending Approval View - Redesigned with WOW theme
  if (user.nunnyProfile?.status !== 'APPROVED') {
    return (
      <DashboardShellV2 accentGradient={ACCENT_GRADIENT} roleName="Nunny Dashboard">
        <div className="flex items-center justify-center py-20">
          <div className="max-w-xl w-full bg-white rounded-[3rem] p-12 shadow-2xl border border-gray-100 text-center">
            <div className={`w-24 h-24 rounded-[2.5rem] bg-gradient-to-br ${ACCENT_GRADIENT} flex items-center justify-center text-white mx-auto mb-8 shadow-xl`}>
              <ShieldCheck size={48} />
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Under Review</h2>
            <p className="text-gray-500 font-medium text-lg leading-relaxed mb-8">
              Your profile is currently being reviewed by our admin team. You'll receive full access to client requests once approved.
            </p>
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-700 font-bold">
              Expected wait time: 24-48 hours
            </div>
          </div>
        </div>
      </DashboardShellV2>
    );
  }

  return (
    <DashboardShellV2 accentGradient={ACCENT_GRADIENT} roleName="Nunny Dashboard">
      {/* Welcome & Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <motion.div 
          className={`relative overflow-hidden bg-gradient-to-br ${ACCENT_GRADIENT} p-10 rounded-[3rem] shadow-2xl flex flex-col justify-center min-h-[350px]`}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="relative z-10 flex items-start gap-8">
            <div className="w-24 h-24 rounded-[2rem] bg-white p-1.5 shadow-xl shrink-0">
               {user.profilePictureUrl ? (
                 <img src={user.profilePictureUrl} className="w-full h-full object-cover rounded-[1.7rem]" alt="Profile" />
               ) : (
                 <div className={`w-full h-full bg-gradient-to-br ${ACCENT_GRADIENT} rounded-[1.7rem] flex items-center justify-center text-white text-3xl font-black`}>
                    {user.fullName[0]}
                 </div>
               )}
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full mb-4 border border-white/30">
                <ShieldCheck className="text-white" size={14} />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Verified Care Provider</span>
              </div>
              <h1 className="text-4xl font-black text-white mb-2 leading-tight">
                Hey {user.fullName.split(' ')[0]}! ✨
              </h1>
              <p className="text-white/80 text-lg font-medium mb-6">
                Ready to find some families in {user.county}?
              </p>
              <button 
                onClick={() => setShowEdit(true)}
                className="px-6 py-3 bg-white text-gray-900 font-black rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all text-sm flex items-center gap-2"
              >
                <Edit3 size={18} className="text-emerald-500" />
                Edit Profile
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
           <StatCardV2 
              label="Opportunities" 
              value={requests.length} 
              icon={Briefcase} 
              accentGradient={ACCENT_GRADIENT} 
              subtitle="Latest client posts"
           />
           <StatCardV2 
              label="Trust Score" 
              value={averageRating > 0 ? averageRating.toFixed(1) : "New"} 
              icon={Star} 
              accentGradient={ACCENT_GRADIENT} 
              subtitle={`${totalRatings} Reviews total`}
           />
           <div className="sm:col-span-2 bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-gray-400 tracking-widest uppercase">My Location</div>
                <div className="font-black text-gray-900 text-lg flex items-center gap-2">
                  <MapPin size={18} className="text-emerald-500" />
                  {user.county}, {user.constituency}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-gray-400 tracking-widest uppercase">Verified Since</div>
                <div className="font-black text-gray-900 text-lg">
                  {new Date(user.createdAt).getFullYear()}
                </div>
              </div>
           </div>
        </div>
      </div>

      <div className="space-y-16">
        {/* Requests Feed */}
        <section>
          <div className="flex items-center justify-between mb-8 px-4">
             <div>
                <h2 className="text-3xl font-black text-gray-900 mb-1">Opportunities For You</h2>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Hand-picked matching requests</div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="h-64 bg-gray-100 rounded-3xl animate-pulse" />
                ))
              ) : requests.length > 0 ? (
                requests.map((request, index) => (
                  <DashboardCardV2
                    key={request.id}
                    title={request.service}
                    subtitle={`From ${request.user.fullName}`}
                    description={request.description}
                    price={request.amount}
                    location={request.location}
                    accentGradient={ACCENT_GRADIENT}
                    btnText={request.status === 'ASSIGNED' ? "Job Assigned" : "Contact Client"}
                    onBtnClick={() => handleContactClick(request)}
                    statusBadge={request.status === 'ASSIGNED' ? { text: 'ASSIGNED', classes: 'bg-gray-100 text-gray-500' } : undefined}
                  />
                ))
              ) : (
                <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
                   <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                      <LayoutDashboard size={32} />
                   </div>
                   <h3 className="text-xl font-black text-gray-900 mb-2">No Active Requests</h3>
                   <p className="text-gray-500 font-medium">We'll notify you as soon as new requests match your profile.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Reviews Section */}
        {totalRatings > 0 && (
          <section>
            <div className="mb-8 px-4">
               <h2 className="text-3xl font-black text-gray-900 mb-1">Family Reviews</h2>
               <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">What clients say about your care</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {ratings.map((rating, idx) => (
                 <motion.div 
                    key={idx}
                    whileHover={{ y: -5 }}
                    className="p-8 bg-white rounded-[2rem] shadow-sm border border-gray-50 hover:shadow-xl transition-all"
                 >
                    <div className="flex items-center gap-4 mb-6">
                       <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ACCENT_GRADIENT} flex items-center justify-center text-white font-black`}>
                          {rating.client.fullName[0]}
                       </div>
                       <div>
                          <div className="font-black text-gray-900">{rating.client.fullName}</div>
                          <div className="flex gap-1">
                             {[...Array(rating.rating)].map((_, i) => <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />)}
                          </div>
                       </div>
                    </div>
                    <p className="text-gray-600 font-medium italic mb-6">&ldquo;{rating.comment}&rdquo;</p>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                       {new Date(rating.createdAt).toLocaleDateString()}
                    </div>
                 </motion.div>
               ))}
            </div>
          </section>
        )}
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {showEdit && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setShowEdit(false)}
             />
             <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl p-8 overflow-hidden overflow-y-auto max-h-[90vh]"
             >
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-3xl font-black text-gray-900 tracking-tight">Update Profile</h3>
                   <button onClick={() => setShowEdit(false)} className="p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors text-gray-500"><X /></button>
                </div>
                <EditProfileForm 
                  user={user} 
                  token={token} 
                  onClose={() => setShowEdit(false)} 
                  onProfileUpdated={() => { window.location.reload(); }} 
                />
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContact && contactInfo && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                 onClick={() => setShowContact(false)}
              />
              <motion.div 
                 initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
                 className="relative w-full max-w-md bg-white rounded-[3rem] shadow-2xl p-10 overflow-hidden"
              >
                  <div className={`w-20 h-20 bg-gradient-to-br ${ACCENT_GRADIENT} rounded-[2rem] flex items-center justify-center text-white mx-auto mb-8 shadow-xl`}>
                     <MessageCircle size={40} />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 text-center mb-2">Connect with Client</h2>
                  <p className="text-gray-500 text-center font-medium mb-10">Direct contact details for {contactInfo.fullName}</p>
                  
                  <div className="space-y-4">
                     {contactInfo.email && (
                       <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-lg transition-all group">
                         <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm transition-transform group-hover:scale-110"><Mail /></div>
                         <div className="flex-1 overflow-hidden"><div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</div><div className="font-black text-gray-900 truncate">{contactInfo.email}</div></div>
                       </a>
                     )}
                     {contactInfo.phone && (
                       <>
                         <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-lg transition-all group">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm transition-transform group-hover:scale-110"><Phone /></div>
                            <div className="flex-1 overflow-hidden"><div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</div><div className="font-black text-gray-900 truncate">{contactInfo.phone}</div></div>
                         </a>
                         <a 
                            href={`https://wa.me/${formatPhoneForWhatsApp(contactInfo.phone).replace('+', '')}`} 
                            target="_blank" 
                            className="flex items-center justify-center gap-3 w-full py-5 bg-emerald-500 text-white font-black rounded-2xl shadow-emerald-200 hover:shadow-2xl hover:scale-[1.02] transition-all"
                         >
                            <MessageCircle size={22} />
                            Chat on WhatsApp
                         </a>
                       </>
                     )}
                  </div>

                  <button 
                    onClick={() => setShowContact(false)}
                    className="w-full mt-8 py-4 bg-gray-100 text-gray-500 font-black rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest text-sm"
                  >
                    Dismiss
                  </button>
              </motion.div>
           </div>
        )}
      </AnimatePresence>
    </DashboardShellV2>
  );
}
