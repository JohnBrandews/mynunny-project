'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/Button'

interface NunnyProfile {
  id: string
  description: string
  services: string
  contactInfo?: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED'
  createdAt: string
  user: {
    id: string
    fullName: string
    email: string
    phone: string
    idNumber: string
    county: string
    constituency: string
    profilePictureUrl?: string
    createdAt: string
  }
}

export default function AdminDashboard() {
  const { user, token } = useAuth()
  const router = useRouter()
  const [nunnies, setNunnies] = useState<NunnyProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      router.push('/')
      return
    }
    fetchNunnies()
  }, [user, router])

  const fetchNunnies = async () => {
    try {
      const response = await fetch('/api/admin/nunnies', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch nunnies')
      }

      setNunnies(data.nunnies)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (nunnyId: string) => {
    setActionLoading(nunnyId)
    try {
      const response = await fetch(`/api/admin/nunnies/${nunnyId}/approve`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to approve nunny')
      }

      toast.success('Nunny approved successfully!')
      fetchNunnies() // Refresh the list
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleSuspend = async (nunnyId: string) => {
    if (actionLoading === nunnyId) return // Prevent double clicks
    if (!confirm('Suspend this nunny? They will not be able to access requests until reinstated.')) {
      return
    }

    setActionLoading(nunnyId)
    try {
      const response = await fetch(`/api/admin/nunnies/${nunnyId}/suspend`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to suspend nunny')
      }

      toast.success('Nunny suspended successfully!')
      fetchNunnies()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (nunnyId: string) => {
    if (!confirm('Are you sure you want to reject this nunny? This action cannot be undone.')) {
      return
    }

    setActionLoading(nunnyId)
    try {
      const response = await fetch(`/api/admin/nunnies/${nunnyId}/reject`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to reject nunny')
      }

      toast.success('Nunny rejected and removed successfully!')
      fetchNunnies() // Refresh the list
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setActionLoading(null)
    }
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
    
    switch (status) {
      case 'PENDING':
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      case 'APPROVED':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'REJECTED':
        return `${baseClasses} bg-red-100 text-red-800`
      case 'SUSPENDED':
        return `${baseClasses} bg-orange-100 text-orange-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  if (!user || user.role !== 'ADMIN') {
    return null
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--blue-50)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--blue-900)' }}>Admin Dashboard</h1>
          <p className="mt-2" style={{ color: 'var(--blue-600)' }}>Manage nunny applications and approvals</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: 'var(--blue-600)' }}></div>
            <p className="mt-2" style={{ color: 'var(--blue-600)' }}>Loading nunnies...</p>
          </div>
        ) : (
          <div className="mb-8">
            <h3 className="text-lg leading-6 font-medium mb-4" style={{ color: 'var(--blue-900)' }}>
              Nunny Applications
            </h3>
            <p className="text-sm mb-6" style={{ color: 'var(--blue-600)' }}>
              Review and approve pending nunny applications
            </p>

            {nunnies.length === 0 ? (
              <div className="text-center py-12">
                <p style={{ color: 'var(--blue-600)' }}>No nunny applications found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {nunnies.map((nunny) => (
                  <div
                    key={nunny.id}
                    className={`profile-card w-full rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 flex flex-col items-center justify-center gap-3 transition-all duration-300 group ${
                      nunny.status === 'REJECTED' ? 'bg-red-50 border-2 border-red-200' : 'bg-white'
                    }`}
                  >
                    <div className="avatar w-full pt-5 flex items-center justify-center flex-col gap-1">
                      <div className="img_container w-full flex items-center justify-center relative z-40 after:absolute after:h-[6px] after:w-full after:bg-[var(--blue-600)] after:top-4 after:group-hover:size-[1%] after:delay-300 after:group-hover:delay-0 after:group-hover:transition-all after:group-hover:duration-300 after:transition-all after:duration-300 before:absolute before:h-[6px] before:w-full before:bg-[var(--blue-600)] before:bottom-4 before:group-hover:size-[1%] before:delay-300 before:group-hover:delay-0 before:group-hover:transition-all before:group-hover:duration-300 before:transition-all before:duration-300">
                        {nunny.user.profilePictureUrl ? (
                          <img
                            src={nunny.user.profilePictureUrl}
                            alt={nunny.user.fullName}
                            className="size-36 z-40 border-4 border-white rounded-full group-hover:border-8 group-hover:transition-all group-hover:duration-300 transition-all duration-300 object-cover"
                          />
                        ) : (
                          <div className={`size-36 z-40 border-4 border-white rounded-full group-hover:border-8 group-hover:transition-all group-hover:duration-300 transition-all duration-300 flex items-center justify-center ${
                            nunny.status === 'REJECTED' 
                              ? 'bg-gradient-to-br from-red-200 to-red-400' 
                              : 'bg-gradient-to-br from-blue-200 to-blue-400'
                          }`}>
                            <span className="text-2xl font-bold text-white">
                              {nunny.user.fullName.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div className="absolute bg-[var(--blue-600)] z-10 size-[60%] w-full group-hover:size-[1%] group-hover:transition-all group-hover:duration-300 transition-all duration-300 delay-700 group-hover:delay-0"></div>
                      </div>
                    </div>
                    
                    <div className="headings *:text-center *:leading-4 px-4">
                      <p className="text-xl font-serif font-semibold" style={{ color: 'var(--blue-900)' }}>
                        {nunny.user.fullName}
                      </p>
                      <p className={`text-sm font-semibold ${
                        nunny.status === 'REJECTED' ? 'text-red-600' : ''
                      }`} style={{ 
                        color: nunny.status === 'REJECTED' ? '#dc2626' : 'var(--blue-600)' 
                      }}>
                        Nunny
                      </p>
                    </div>
                    
                    <div className="w-full items-center justify-center flex px-4">
                      <ul className="flex flex-col items-start gap-2 *:inline-flex *:gap-2 *:items-center *:justify-center *:border-b-[1.5px] *:border-b-stone-700 *:border-dotted *:text-xs *:font-semibold *:text-[var(--blue-900)] pb-3 w-full [&>*:last-child]:border-b-0">
                        <li>
                          <svg className="fill-stone-700 group-hover:fill-[var(--blue-600)]" height="15" width="15" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0V0z" fill="none"></path>
                            <path d="M19.23 15.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z"></path>
                          </svg>
                          <p>{nunny.user.phone}</p>
                        </li>
                        <li>
                          <svg className="fill-stone-700 group-hover:fill-[var(--blue-600)]" height="15" width="15" viewBox="0 0 32 32">
                            <path d="M16,14.81,28.78,6.6A3,3,0,0,0,27,6H5a3,3,0,0,0-1.78.6Z" fill="#231f20"></path>
                            <path d="M16.54,16.84h0l-.17.08-.08,0A1,1,0,0,1,16,17h0a1,1,0,0,1-.25,0l-.08,0-.17-.08h0L2.1,8.26A3,3,0,0,0,2,9V23a3,3,0,0,0,3,3H27a3,3,0,0,0,3-3V9a3,3,0,0,0-.1-.74Z" fill="#231f20"></path>
                          </svg>
                          <p className="truncate">{nunny.user.email}</p>
                        </li>
                        <li>
                          <svg className="fill-stone-700 group-hover:fill-[var(--blue-600)]" height="15" width="15" viewBox="0 0 16 16">
                            <path d="M8 0C5.2 0 3 2.2 3 5s4 11 5 11 5-8.2 5-11-2.2-5-5-5zm0 8C6.3 8 5 6.7 5 5s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" fill="#444"></path>
                          </svg>
                          <p>{nunny.user.county}, {nunny.user.constituency}</p>
                        </li>
                        <li>
                          <svg className="fill-stone-700 group-hover:fill-[var(--blue-600)]" height="15" width="15" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" fill="none" stroke="currentColor" strokeWidth="2"></path>
                          </svg>
                          <p>ID: {nunny.user.idNumber}</p>
                        </li>
                        <li>
                          <svg className="fill-stone-700 group-hover:fill-[var(--blue-600)]" height="15" width="15" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="none" stroke="currentColor" strokeWidth="2"></path>
                          </svg>
                          <p>Services: {JSON.parse(nunny.services).join(', ')}</p>
                        </li>
                        <li>
                          <svg className="fill-stone-700 group-hover:fill-[var(--blue-600)]" height="15" width="15" viewBox="0 0 24 24">
                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" fill="none" stroke="currentColor" strokeWidth="2"></path>
                          </svg>
                          <p>Applied: {new Date(nunny.createdAt).toLocaleDateString()}</p>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="w-full px-4 pb-4">
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        <strong>Description:</strong> {nunny.description}
                      </p>
                      
                      <div className="flex gap-2">
                        {nunny.status === 'PENDING' && (
                          <>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleReject(nunny.id)}
                              loading={actionLoading === nunny.id}
                              className="flex-1 btn-compact"
                            >
                              Reject
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleApprove(nunny.id)}
                              loading={actionLoading === nunny.id}
                              className="flex-1 btn-compact"
                            >
                              Approve
                            </Button>
                          </>
                        )}
                        {nunny.status === 'APPROVED' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuspend(nunny.id)}
                            loading={actionLoading === nunny.id}
                            className="w-full btn-compact"
                            disabled={actionLoading === nunny.id}
                          >
                            Suspend
                          </Button>
                        )}
                        {nunny.status === 'SUSPENDED' && (
                          <Button
                            size="sm"
                            onClick={async () => {
                              if (actionLoading === nunny.id) return // Prevent double clicks
                              setActionLoading(nunny.id)
                              try {
                                const res = await fetch(`/api/admin/nunnies/${nunny.id}/unsuspend`, { 
                                  method: 'PATCH', 
                                  headers: { 
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                                  } 
                                })
                                const data = await res.json()
                                if (!res.ok) throw new Error(data.error || 'Failed to reinstate nunny')
                                toast.success('Nunny reinstated successfully!')
                                fetchNunnies()
                              } catch (e: any) {
                                toast.error(e.message)
                              } finally {
                                setActionLoading(null)
                              }
                            }}
                            loading={actionLoading === nunny.id}
                            className="w-full btn-compact"
                            disabled={actionLoading === nunny.id}
                          >
                            Unsuspend
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <hr className="w-full group-hover:h-5 h-3 bg-[var(--blue-600)] group-hover:transition-all group-hover:duration-300 transition-all duration-300" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white overflow-hidden shadow rounded-lg border" style={{ borderColor: 'var(--blue-200)' }}>
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--blue-200)' }}>
                    <svg className="w-5 h-5" style={{ color: 'var(--blue-600)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium truncate" style={{ color: 'var(--blue-600)' }}>Pending Applications</dt>
                    <dd className="text-lg font-medium" style={{ color: 'var(--blue-900)' }}>
                      {nunnies.filter(n => n.status === 'PENDING').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg border" style={{ borderColor: 'var(--blue-200)' }}>
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--blue-200)' }}>
                    <svg className="w-5 h-5" style={{ color: 'var(--blue-600)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium truncate" style={{ color: 'var(--blue-600)' }}>Approved Nunnies</dt>
                    <dd className="text-lg font-medium" style={{ color: 'var(--blue-900)' }}>
                      {nunnies.filter(n => n.status === 'APPROVED').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg border" style={{ borderColor: 'var(--blue-200)' }}>
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--blue-200)' }}>
                    <svg className="w-5 h-5" style={{ color: 'var(--blue-600)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium truncate" style={{ color: 'var(--blue-600)' }}>Total Applications</dt>
                    <dd className="text-lg font-medium" style={{ color: 'var(--blue-900)' }}>{nunnies.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
