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
    if (!confirm('Suspend this nunny? They will not be able to access requests until reinstated.')) {
      return
    }

    setActionLoading(nunnyId)
    try {
      const response = await fetch(`/api/admin/nunnies/${nunnyId}/suspend`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage nunny applications and approvals</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading nunnies...</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Nunny Applications
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Review and approve pending nunny applications
              </p>
            </div>

            {nunnies.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No nunny applications found.</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {nunnies.map((nunny) => (
                  <li key={nunny.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-lg font-medium text-gray-900 truncate">
                              {nunny.user.fullName}
                            </h4>
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                              <span className="mr-4">{nunny.user.email}</span>
                              <span className="mr-4">{nunny.user.phone}</span>
                              <span>{nunny.user.county}, {nunny.user.constituency}</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <span className={getStatusBadge(nunny.status)}>
                              {nunny.status}
                            </span>
                          </div>
                        </div>

                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            <strong>ID Number:</strong> {nunny.user.idNumber}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Services:</strong> {JSON.parse(nunny.services).join(', ')}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Description:</strong> {nunny.description}
                          </p>
                          {nunny.contactInfo && (
                            <p className="text-sm text-gray-600">
                              <strong>Contact Info:</strong> {nunny.contactInfo}
                            </p>
                          )}
                          <p className="text-sm text-gray-500 mt-2">
                            Applied on {new Date(nunny.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="ml-4 flex space-x-2">
                        {nunny.status === 'PENDING' && (
                          <>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleReject(nunny.id)}
                              loading={actionLoading === nunny.id}
                            >
                              Reject
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleApprove(nunny.id)}
                              loading={actionLoading === nunny.id}
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
                          >
                            Suspend
                          </Button>
                        )}
                        {nunny.status === 'SUSPENDED' && (
                          <Button
                            size="sm"
                            onClick={async () => {
                              setActionLoading(nunny.id)
                              try {
                                const res = await fetch(`/api/admin/nunnies/${nunny.id}/unsuspend`, { method: 'PATCH', headers: { 'Authorization': `Bearer ${token}` } })
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
                          >
                            Unsuspend
                          </Button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pending Applications</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {nunnies.filter(n => n.status === 'PENDING').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Approved Nunnies</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {nunnies.filter(n => n.status === 'APPROVED').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Applications</dt>
                    <dd className="text-lg font-medium text-gray-900">{nunnies.length}</dd>
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
