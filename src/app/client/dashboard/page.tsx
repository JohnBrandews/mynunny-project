'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import CreateRequestModal from '../../../components/CreateRequestModal';
import EditProfileForm from '@/components/EditProfileForm';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  PlusCircle, 
  Clock, 
  MapPin, 
  Star, 
  ArrowRight, 
  Heart,
  Search,
  LayoutDashboard,
  ShieldCheck,
  UserCheck,
  MessageCircle,
  Phone,
  Mail,
  X,
  ExternalLink,
  Trash2,
  CheckCircle2,
  Undo2
} from 'lucide-react';
import { DashboardShellV2 } from '@/components/dashboard/DashboardShellV2';
import { StatCardV2 } from '@/components/dashboard/StatCardV2';
import { DashboardCardV2 } from '@/components/dashboard/DashboardCardV2';

interface Nunny {
  id: string;
  description: string;
  services: string;
  averageRating?: number;
  totalRatings?: number;
  user: {
    fullName: string;
    profilePictureUrl?: string;
    county: string;
    constituency: string;
    phone?: string;
    email?: string;
  };
}

interface Request {
  id: string;
  service: string;
  amount: number;
  location: string;
  description: string;
  status: 'OPEN' | 'ASSIGNED';
  createdAt: string;
}

const ACCENT_GRADIENT = "from-purple-600 via-pink-600 to-indigo-600";
const ACCENT_GLOW = "shadow-purple-200";

export default function ClientDashboard() {
  const { user, token } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [nunnies, setNunnies] = useState<Nunny[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [requestsLoading, setRequestsLoading] = useState(true);
  const [selectedNunny, setSelectedNunny] = useState<Nunny | null>(null);
  const [showContactChoice, setShowContactChoice] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedManagerRequest, setSelectedManagerRequest] = useState<Request | null>(null);
  const [showManageModal, setShowManageModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'CLIENT') {
      router.push('/');
      return;
    }

    fetchNunnies();
    fetchRequests();
  }, [user, router]);

  const fetchNunnies = async () => {
    try {
      const response = await fetch('/api/nunnies');
      const data = await response.json();
      if (response.ok) {
        setNunnies(data.nunnies);
      }
    } catch (error) {
      console.error('Error fetching nunnies:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/requests/mine', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setRequests(data.requests);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setRequestsLoading(false);
    }
  };

  const handleManagerAction = async (action: 'assign' | 'unassign' | 'delete', requestId: string) => {
    try {
      const endpoint = action === 'delete' 
        ? `/api/requests/${requestId}` 
        : `/api/requests/${requestId}/${action}`;
      
      const method = action === 'delete' ? 'DELETE' : 'PATCH';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast.success(`Request ${action === 'delete' ? 'deleted' : 'updated'}!`);
        setShowManageModal(false);
        fetchRequests();
        fetchNunnies(); // Refresh stats if needed
      } else {
        const error = await response.json();
        throw new Error(error.error || `Failed to ${action} request`);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (!user || user.role !== 'CLIENT') return null;

  return (
    <DashboardShellV2 accentGradient={ACCENT_GRADIENT} roleName="Client Dashboard">
      {/* Welcome & Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Welcome Card */}
        <motion.div 
          className={`lg:col-span-2 relative overflow-hidden bg-gradient-to-br ${ACCENT_GRADIENT} p-10 rounded-[3rem] shadow-2xl flex flex-col justify-center min-h-[300px]`}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16 blur-2xl" />

          <div className="relative z-10 max-w-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full mb-6"
            >
              <ShieldCheck className="text-white" size={18} />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Verified Account</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Welcome back,<br />{user.fullName}! 👋
            </h1>
            <p className="text-white/80 text-lg font-medium mb-8">
              Everything you need to manage your family's care is right here.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-8 py-4 bg-white text-gray-900 font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
              >
                <PlusCircle size={20} className="text-purple-600" />
                Post New Request
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                  onClick={() => setShowEditProfile(true)}
                  className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-black rounded-2xl hover:bg-white/20 transition-all"
              >
                  Update Profile
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 gap-6">
          <StatCardV2
            label="Total Requests"
            value={requests.length}
            icon={Clock}
            accentGradient={ACCENT_GRADIENT}
            subtitle="Including closed requests"
          />
          <StatCardV2
            label="Verified Nunnies"
            value={nunnies.length}
            icon={Users}
            accentGradient={ACCENT_GRADIENT}
            subtitle="Available in your area"
          />
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-16">
        {/* Active Requests List */}
        <section>
          <div className="flex items-center justify-between mb-8 px-4">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-1">Your Active Requests</h2>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Manage your live postings</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {requestsLoading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="h-64 bg-gray-100 rounded-3xl animate-pulse" />
                ))
              ) : requests.length > 0 ? (
                requests.map((request) => (
                  <DashboardCardV2
                    key={request.id}
                    title={request.service}
                    subtitle={`Posted ${new Date(request.createdAt).toLocaleDateString()}`}
                    description={request.description}
                    price={request.amount}
                    location={request.location}
                    accentGradient={ACCENT_GRADIENT}
                    btnText="Manage Request"
                    onBtnClick={() => {
                      setSelectedManagerRequest(request);
                      setShowManageModal(true);
                    }}
                    statusBadge={{
                      text: request.status,
                      classes: request.status === 'OPEN' ? 'bg-green-100 text-green-700 font-black' : 'bg-blue-100 text-blue-700 font-black'
                    }}
                  />
                ))
              ) : (
                <div className="col-span-full py-16 bg-white rounded-[2rem] border-2 border-dashed border-gray-200 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <LayoutDashboard size={32} />
                  </div>
                   <h3 className="text-xl font-black text-gray-900 mb-2">No active requests</h3>
                   <p className="text-gray-500 max-w-sm mx-auto mb-8 font-medium">Post your first request to start connecting with professional nannies.</p>
                   <button
                    onClick={() => setShowCreateModal(true)}
                    className={`px-8 py-3 bg-gradient-to-r ${ACCENT_GRADIENT} text-white font-black rounded-xl shadow-lg transition-transform hover:scale-105`}
                  >
                    Post Request Now
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Discover Nunnies Section */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 px-4 gap-6">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-1">Discover Professional Nunnies</h2>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Vetted & top-rated care providers</div>
            </div>
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by area or skill..."
                className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:outline-none focus:border-purple-500 transition-all font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="h-80 bg-gray-100 rounded-3xl animate-pulse" />
              ))
            ) : nunnies.length > 0 ? (
              nunnies.map((nunny) => (
                <DashboardCardV2
                  key={nunny.id}
                  title={nunny.user.fullName}
                  subtitle={nunny.user.constituency}
                  description={nunny.description}
                  location={`${nunny.user.constituency}, ${nunny.user.county}`}
                  accentGradient={ACCENT_GRADIENT}
                  btnText="View Profile"
                  onBtnClick={() => {
                    setSelectedNunny(nunny);
                    setShowDetailModal(true);
                  }}
                  image={nunny.user.profilePictureUrl}
                  initial={nunny.user.fullName[0]}
                  rating={{
                    score: nunny.averageRating || 0,
                    count: nunny.totalRatings || 0
                  }}
                  secondaryBtn={{
                    text: 'Contact',
                    icon: MessageCircle,
                    onClick: () => {
                      setSelectedNunny(nunny);
                      setShowContactChoice(true);
                    }
                  }}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-gray-500 font-bold">No nannies found in your current filters.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Modals - These remain unchanged logic-wise, but would benefit from local theme overrides if needed */}
      {showCreateModal && (
        <CreateRequestModal
          onClose={() => setShowCreateModal(false)}
          onRequestCreated={() => {
            fetchRequests();
            setShowCreateModal(false);
          }}
        />
      )}

      {showEditProfile && (
        <EditProfileForm
          user={user}
          token={token}
          onClose={() => setShowEditProfile(false)}
          onProfileUpdated={() => {
            setShowEditProfile(false);
            window.location.reload();
          }}
        />
      )}
      {/* Nanny Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedNunny && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/60 backdrop-blur-sm"
               onClick={() => setShowDetailModal(false)}
            />
            <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl p-8 md:p-12 overflow-hidden overflow-y-auto max-h-[90vh]"
            >
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight">Nanny Profile</h3>
                  <button onClick={() => setShowDetailModal(false)} className="p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors text-gray-500"><X /></button>
               </div>

               <div className="flex flex-col md:flex-row gap-8 mb-10">
                  <div className={`w-32 h-32 rounded-[2.5rem] bg-gradient-to-br ${ACCENT_GRADIENT} p-1 shrink-0`}>
                     <div className="w-full h-full bg-white rounded-[2.2rem] overflow-hidden flex items-center justify-center">
                        {selectedNunny.user.profilePictureUrl ? (
                          <img src={selectedNunny.user.profilePictureUrl} className="w-full h-full object-cover" alt={selectedNunny.user.fullName} />
                        ) : (
                          <span className={`text-4xl font-black bg-gradient-to-br ${ACCENT_GRADIENT} bg-clip-text text-transparent`}>
                            {selectedNunny.user.fullName[0]}
                          </span>
                        )}
                     </div>
                  </div>
                  <div>
                     <h4 className="text-3xl font-black text-gray-900 mb-1">{selectedNunny.user.fullName}</h4>
                     <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{selectedNunny.user.constituency}, {selectedNunny.user.county}</span>
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                          <Star size={14} className="text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-black text-yellow-700">{selectedNunny.averageRating || 'New'}</span>
                          <span className="text-xs font-bold text-yellow-400">({selectedNunny.totalRatings || 0} reviews)</span>
                        </div>
                     </div>
                     <div className="flex flex-wrap gap-2">
                        {JSON.parse(selectedNunny.services).map((service: string, idx: number) => (
                           <span key={idx} className="px-3 py-1 bg-gray-50 text-gray-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-gray-100">
                              {service}
                           </span>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="space-y-8">
                  <div>
                     <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <UserCheck size={16} className="text-purple-500" />
                        About this Nanny
                     </h5>
                     <p className="text-gray-600 font-medium leading-relaxed bg-gray-50 p-6 rounded-[2rem]">
                        {selectedNunny.description}
                     </p>
                  </div>

                  <div className="flex gap-4">
                     <button 
                        onClick={() => {
                          setShowDetailModal(false);
                          setShowContactChoice(true);
                        }}
                        className={`flex-1 py-5 bg-gradient-to-r ${ACCENT_GRADIENT} text-white font-black rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3`}
                     >
                        <MessageCircle size={22} />
                        Contact Families
                     </button>
                     <button 
                        onClick={() => toast.success('Rating system coming soon!')}
                        className="flex-1 py-5 bg-white border-2 border-gray-100 text-gray-900 font-black rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
                     >
                        <Star size={22} className="text-yellow-500" />
                        Rate Nanny
                     </button>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Contact Choice Modal */}
      <AnimatePresence>
        {showContactChoice && selectedNunny && (
           <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
              <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                 onClick={() => setShowContactChoice(false)}
              />
              <motion.div 
                 initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
                 className="relative w-full max-w-md bg-white rounded-[3rem] shadow-2xl p-10 overflow-hidden"
              >
                  <div className={`w-20 h-20 bg-gradient-to-br ${ACCENT_GRADIENT} rounded-[2rem] flex items-center justify-center text-white mx-auto mb-8 shadow-xl`}>
                     <MessageCircle size={40} />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 text-center mb-2">Connect with Nanny</h2>
                  <p className="text-gray-500 text-center font-medium mb-10">Direct contact details for {selectedNunny.user.fullName}</p>
                  
                  <div className="space-y-4">
                     {selectedNunny.user.email && (
                       <a href={`mailto:${selectedNunny.user.email}`} className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-lg transition-all group">
                         <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-purple-500 shadow-sm transition-transform group-hover:scale-110"><Mail /></div>
                         <div className="flex-1 overflow-hidden"><div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</div><div className="font-black text-gray-900 truncate">{selectedNunny.user.email}</div></div>
                       </a>
                     )}
                     {selectedNunny.user.phone && (
                       <>
                         <a href={`tel:${selectedNunny.user.phone}`} className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-lg transition-all group">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm transition-transform group-hover:scale-110"><Phone /></div>
                            <div className="flex-1 overflow-hidden"><div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</div><div className="font-black text-gray-900 truncate">{selectedNunny.user.phone}</div></div>
                         </a>
                         <a 
                            href={`https://wa.me/${selectedNunny.user.phone.replace(/[^\d]/g, '')}`} 
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
                    onClick={() => setShowContactChoice(false)}
                    className="w-full mt-8 py-4 bg-gray-100 text-gray-500 font-black rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest text-sm"
                  >
                    Dismiss
                  </button>
              </motion.div>
           </div>
        )}
      </AnimatePresence>
      {/* Manage Request Modal */}
      <AnimatePresence>
        {showManageModal && selectedManagerRequest && (
           <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
              <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                 onClick={() => setShowManageModal(false)}
              />
              <motion.div 
                 initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
                 className="relative w-full max-w-md bg-white rounded-[3rem] shadow-2xl p-10 overflow-hidden"
              >
                  <div className={`w-20 h-20 bg-gradient-to-br ${ACCENT_GRADIENT} rounded-[2rem] flex items-center justify-center text-white mx-auto mb-8 shadow-xl`}>
                     <LayoutDashboard size={40} />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 text-center mb-2">Manage Post</h2>
                  <p className="text-gray-500 text-center font-medium mb-10">Choose an action for your &ldquo;{selectedManagerRequest.service}&rdquo; request.</p>
                  
                  <div className="space-y-4">
                     {selectedManagerRequest.status === 'OPEN' ? (
                       <button 
                          onClick={() => handleManagerAction('assign', selectedManagerRequest.id)}
                          className="flex items-center gap-4 w-full p-6 bg-green-50 rounded-2xl border border-green-100 hover:bg-green-100 hover:shadow-lg transition-all group"
                       >
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-green-500 shadow-sm transition-transform group-hover:scale-110"><CheckCircle2 /></div>
                          <div className="text-left">
                            <div className="font-black text-green-900">Mark as Assigned</div>
                            <div className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Hide from public feed</div>
                          </div>
                       </button>
                     ) : (
                       <button 
                          onClick={() => handleManagerAction('unassign', selectedManagerRequest.id)}
                          className="flex items-center gap-4 w-full p-6 bg-blue-50 rounded-2xl border border-blue-100 hover:bg-blue-100 hover:shadow-lg transition-all group"
                       >
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm transition-transform group-hover:scale-110"><Undo2 /></div>
                          <div className="text-left">
                            <div className="font-black text-blue-900">Re-open Request</div>
                            <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Make visible on landing page</div>
                          </div>
                       </button>
                     )}

                     <button 
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this request permanently?')) {
                            handleManagerAction('delete', selectedManagerRequest.id);
                          }
                        }}
                        className="flex items-center gap-4 w-full p-6 bg-red-50 rounded-2xl border border-red-100 hover:bg-red-100 hover:shadow-lg transition-all group"
                     >
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-red-500 shadow-sm transition-transform group-hover:scale-110"><Trash2 /></div>
                        <div className="text-left">
                          <div className="font-black text-red-900">Delete Request</div>
                          <div className="text-[10px] font-bold text-red-600 uppercase tracking-widest">Permanent removal</div>
                        </div>
                     </button>
                  </div>

                  <button 
                    onClick={() => setShowManageModal(false)}
                    className="w-full mt-10 py-4 bg-gray-50 text-gray-400 font-bold rounded-2xl hover:bg-gray-100 transition-all uppercase tracking-widest text-xs"
                  >
                    Close Manager
                  </button>
              </motion.div>
           </div>
        )}
      </AnimatePresence>
    </DashboardShellV2>
  );
}
