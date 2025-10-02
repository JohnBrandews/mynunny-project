'use client'
import EditProfileForm from '@/components/EditProfileForm'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/Button'

interface Request {
  id: string
  service: string
  amount: number
  location: string
  description: string
  createdAt: string
  email?: string
  phone?: string
  user: {
    id: string
    fullName: string
    email?: string
    phone?: string
    county: string
    constituency: string
    profilePictureUrl?: string
  }
}

export default function NunnyDashboard() {
  const { user, token } = useAuth()
  const [showEdit, setShowEdit] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [contactInfo, setContactInfo] = useState<{ fullName: string; email?: string | null; phone?: string | null } | null>(null)
  const router = useRouter()
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || user.role !== 'NUNNY') {
      router.push('/')
      return
    }

    // Check if nunny is approved
    if (user.nunnyProfile?.status !== 'APPROVED') {
      toast.error('Your account is pending approval. Please wait for admin approval.')
      return
    }

    fetchRequests()
  }, [user, router])

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/requests', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch requests')
      }

      setRequests(data.requests)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleContactClient = (request: Request) => {
    // For now, just show a toast. In a real app, this would open a messaging interface
    toast.success(`Contacting ${request.user.fullName} about their ${request.service} request`)
  }

  const handleContactClick = (request: Request) => {
    const info = {
      fullName: request.user.fullName,
      email: request.user.email ?? request.email ?? null,
      phone: request.user.phone ?? request.phone ?? null,
    }
    setContactInfo(info)
    setShowContact(true)
  }

  if (!user || user.role !== 'NUNNY') {
    return null
  }

  // Show pending approval message
  if (user.nunnyProfile?.status !== 'APPROVED') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-medium">Account Pending Approval</h3>
                <p className="text-sm mt-1">
                  Your nunny profile is currently under review. You'll be able to see client requests once approved by our admin team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Nunny Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back, {user.fullName}! Here are the latest service requests.</p>
        </div>
        <Button onClick={() => setShowEdit(true)}>Edit Profile</Button>
        {showEdit && (
          <EditProfileForm
            user={user}
            token={token}
            onClose={() => setShowEdit(false)}
            onProfileUpdated={fetchRequests} // or refetch user
          />
        )}
        {/* Profile Summary */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {user.profilePictureUrl ? (
                <img className="h-12 w-12 rounded-full" src={user.profilePictureUrl} alt={user.fullName}/>
              ) : (
                <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                  <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{user.fullName}</h3>
              <p className="text-sm text-gray-500">
                Services: {user.nunnyProfile?.services ? JSON.parse(user.nunnyProfile.services).join(', ') : 'None specified'}
              </p>
              <p className="text-sm text-gray-500">
                Location: {user.county}, {user.constituency}
              </p>
            </div>
            <div className="ml-auto">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Approved
              </span>
            </div>
          </div>
        </div>

        {/* Service Requests */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Available Service Requests
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Browse and respond to client requests for your services
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading requests...</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No requests available</h3>
              <p className="mt-1 text-sm text-gray-500">There are currently no service requests matching your criteria.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {requests.map((request) => (
                <li key={request.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 truncate">
                            {request.service}
                          </h4>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <span className="mr-4">KES {request.amount.toLocaleString()}</span>
                            <span className="mr-4">{request.location}</span>
                            <span>Posted by {request.user.fullName}</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {request.user.county}
                          </span>
                        </div>
                      </div>

                      <div className="mt-2">
                        <p className="text-sm text-gray-600">{request.description}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          Posted on {new Date(request.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="ml-4 flex-shrink-0">
                      <Button
                        size="sm"
                        onClick={() => handleContactClick(request)}
                      >
                        Contact Client
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {showContact && contactInfo && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(2px)',
          }}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
              onClick={() => setShowContact(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-blue-700 text-center">Contact Details</h2>
            <div className="space-y-2 text-gray-800">
              <div>
                <span className="font-semibold">Name:</span> {contactInfo.fullName}
              </div>
              <div>
                <span className="font-semibold">Email:</span> {contactInfo.email || <span className="text-gray-400">Not provided</span>}
              </div>
              <div>
                <span className="font-semibold">Phone:</span> {contactInfo.phone || <span className="text-gray-400">Not provided</span>}
              </div>
            </div>
            <button
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
              onClick={() => setShowContact(false)}
            >
              Close
            </button>
          </div>
          <style jsx>{`
            .animate-fade-in {
              animation: fadeIn 0.2s ease;
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: scale(0.95);}
              to { opacity: 1; transform: scale(1);}
            }
          `}</style>
        </div>
      )}
    </div>
  )
}
