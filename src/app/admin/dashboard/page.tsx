'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  UserPlus, 
  MapPin, 
  Mail, 
  Phone,
  LayoutDashboard,
  Search,
  Filter,
  BarChart3
} from 'lucide-react';
import { DashboardShellV2 } from '@/components/dashboard/DashboardShellV2';
import { StatCardV2 } from '@/components/dashboard/StatCardV2';
import { DashboardCardV2 } from '@/components/dashboard/DashboardCardV2';
import { Button } from '@/components/ui/Button';

interface NunnyProfile {
  id: string;
  description: string;
  services: string;
  contactInfo?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';
  createdAt: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    idNumber: string;
    county: string;
    constituency: string;
    profilePictureUrl?: string;
    createdAt: string;
  };
}

const ACCENT_GRADIENT = "from-blue-600 via-indigo-600 to-slate-600";
const ACCENT_GLOW = "shadow-blue-200";

export default function AdminDashboard() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [nunnies, setNunnies] = useState<NunnyProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      router.push('/');
      return;
    }
    fetchNunnies();
  }, [user, router]);

  const fetchNunnies = async () => {
    try {
      const response = await fetch('/api/admin/nunnies', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch nunnies');
      setNunnies(data.nunnies);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (nunnyId: string) => {
    setActionLoading(nunnyId);
    try {
      const response = await fetch(`/api/admin/nunnies/${nunnyId}/approve`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to approve nunny');
      toast.success('Nunny approved successfully!');
      fetchNunnies();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleSuspend = async (nunnyId: string) => {
    if (actionLoading === nunnyId) return;
    if (!confirm('Suspend this nunny?')) return;
    setActionLoading(nunnyId);
    try {
      const response = await fetch(`/api/admin/nunnies/${nunnyId}/suspend`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Failed to suspend nunny');
      toast.success('Nunny suspended!');
      fetchNunnies();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (nunnyId: string) => {
    if (!confirm('Reject this nunny? This action is permanent.')) return;
    setActionLoading(nunnyId);
    try {
      const response = await fetch(`/api/admin/nunnies/${nunnyId}/reject`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to reject nunny');
      toast.success('Nunny rejected!');
      fetchNunnies();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-700';
      case 'APPROVED': return 'bg-green-100 text-green-700';
      case 'REJECTED': return 'bg-red-100 text-red-700';
      case 'SUSPENDED': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (!user || user.role !== 'ADMIN') return null;

  return (
    <DashboardShellV2 accentGradient={ACCENT_GRADIENT} roleName="Admin Management">
       {/* Command Center Stats */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCardV2 
            label="Pending Applications" 
            value={nunnies.filter(n => n.status === 'PENDING').length} 
            icon={Clock} 
            accentGradient="from-yellow-400 to-orange-500" 
          />
          <StatCardV2 
            label="Active Nunnies" 
            value={nunnies.filter(n => n.status === 'APPROVED').length} 
            icon={CheckCircle2} 
            accentGradient="from-green-400 to-emerald-600" 
          />
          <StatCardV2 
            label="Total Providers" 
            value={nunnies.length} 
            icon={Users} 
            accentGradient={ACCENT_GRADIENT} 
          />
          <StatCardV2 
            label="Growth Score" 
            value="+12%" 
            icon={BarChart3} 
            accentGradient="from-indigo-400 to-blue-700" 
            subtitle="vs last month"
          />
       </div>

       <div className="space-y-16">
          <section>
             <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 px-4 gap-6">
                <div>
                  <h2 className="text-3xl font-black text-gray-900 mb-1">Nunny Management</h2>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Review applications and manage active provider status</div>
                </div>
                
                <div className="flex gap-4 items-center">
                   <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="Search by name, ID..." 
                        className="pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:outline-none focus:border-blue-500 transition-all font-medium" 
                      />
                   </div>
                   <button className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm text-gray-500 hover:text-blue-600 transition-colors">
                      <Filter size={20} />
                   </button>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {loading ? (
                  Array(4).fill(0).map((_, i) => <div key={i} className="h-96 bg-gray-100 rounded-3xl animate-pulse" />)
                ) : nunnies.length > 0 ? (
                  nunnies.map((nunny) => (
                    <motion.div
                      key={nunny.id}
                      whileHover={{ y: -5 }}
                      className={`relative flex flex-col h-full bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden group ${nunny.status === 'REJECTED' ? 'opacity-70 grayscale-[0.5]' : ''}`}
                    >
                      {/* Status Strip */}
                      <div className={`h-2 w-full ${nunny.status === 'APPROVED' ? 'bg-green-500' : nunny.status === 'PENDING' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                      
                      <div className="p-8 flex flex-col flex-1">
                         <div className="flex items-center gap-4 mb-6">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${ACCENT_GRADIENT} p-[3px] shadow-lg`}>
                               <div className="w-full h-full bg-white rounded-[13px] flex items-center justify-center overflow-hidden">
                                  {nunny.user.profilePictureUrl ? (
                                    <img src={nunny.user.profilePictureUrl} className="w-full h-full object-cover" alt="Avatar" />
                                  ) : (
                                    <span className="text-2xl font-black text-gray-900">{nunny.user.fullName[0]}</span>
                                  )}
                               </div>
                            </div>
                            <div>
                               <h3 className="text-xl font-black text-gray-900 leading-tight mb-1">{nunny.user.fullName}</h3>
                               <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusClasses(nunny.status)}`}>
                                  {nunny.status}
                               </span>
                            </div>
                         </div>

                         <div className="space-y-3 mb-8">
                            <div className="flex items-center gap-3 text-sm text-gray-500 font-bold tracking-tight">
                               <MapPin size={16} className="text-blue-500" />
                               {nunny.user.county}, {nunny.user.constituency}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-500 font-bold tracking-tight">
                               <UserPlus size={16} className="text-indigo-500" />
                               ID: {nunny.user.idNumber}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-500 font-bold tracking-tight">
                               <CheckCircle2 size={16} className="text-emerald-500" />
                               {JSON.parse(nunny.services).join(', ')}
                            </div>
                         </div>

                         <p className="text-gray-600 text-sm font-medium leading-relaxed italic mb-8 line-clamp-3 bg-gray-50 p-4 rounded-2xl">
                           &ldquo;{nunny.description}&rdquo;
                         </p>

                         {/* Admin Action Menu */}
                         <div className="mt-auto pt-4 flex gap-3">
                            {nunny.status === 'PENDING' && (
                              <>
                                <button
                                  disabled={actionLoading === nunny.id}
                                  onClick={() => handleReject(nunny.id)}
                                  className="flex-1 py-3 bg-red-50 text-red-600 font-black rounded-xl hover:bg-red-100 transition-colors text-xs uppercase tracking-widest"
                                >
                                  Reject
                                </button>
                                <button
                                  disabled={actionLoading === nunny.id}
                                  onClick={() => handleApprove(nunny.id)}
                                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all text-xs uppercase tracking-widest"
                                >
                                  Approve
                                </button>
                              </>
                            )}
                            {nunny.status === 'APPROVED' && (
                               <button
                                  onClick={() => handleSuspend(nunny.id)}
                                  className="w-full py-3 border-2 border-orange-200 text-orange-600 font-black rounded-xl hover:bg-orange-50 transition-all text-xs uppercase tracking-widest"
                               >
                                  Suspend Provider
                               </button>
                            )}
                            {(nunny.status === 'SUSPENDED' || nunny.status === 'REJECTED') && (
                               <button
                                  onClick={() => handleApprove(nunny.id)}
                                  className="w-full py-4 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all text-sm uppercase tracking-widest"
                               >
                                  Reinstate
                               </button>
                            )}
                         </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
                     <AlertCircle size={48} className="mx-auto text-gray-300 mb-4" />
                     <h3 className="text-2xl font-black text-gray-900 mb-2">No Applications Found</h3>
                     <p className="text-gray-500 font-medium">All applications have been processed for now. Great work!</p>
                  </div>
                )}
             </div>
          </section>
       </div>
    </DashboardShellV2>
  );
}
