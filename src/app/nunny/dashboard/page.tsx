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
  status?: 'OPEN' | 'ASSIGNED'
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

  // Helper function to format phone number for WhatsApp
  const formatPhoneForWhatsApp = (phone: string): string => {
    if (!phone) return ''
    // Remove all non-digit characters except +
    let cleaned = phone.replace(/[^\d+]/g, '')
    // If it starts with 0, replace with country code 254
    if (cleaned.startsWith('0')) {
      cleaned = '254' + cleaned.substring(1)
    }
    // If it doesn't start with +, add it
    if (!cleaned.startsWith('+')) {
      cleaned = '+' + cleaned
    }
    return cleaned
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-6">
              {requests.map((request) => (
                <div key={request.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{request.service}</h3>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      KES {request.amount.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">{request.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {request.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Posted by {request.user.fullName} • {request.user.county}
                    </div>
                    <div>
                      <Button
                        size="xs"
                        onClick={() => {
                          if (request.status === 'ASSIGNED') {
                            toast.error('This job has been assigned. You cannot contact the client.')
                            return
                          }
                          handleContactClick(request)
                        }}
                        disabled={request.status === 'ASSIGNED'}
                      >
                        {request.status === 'ASSIGNED' ? 'Assigned' : 'Contact Client'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
            <div className="space-y-3 text-gray-800">
              <div>
                <span className="font-semibold">Name:</span> {contactInfo.fullName}
              </div>
              <div>
                <span className="font-semibold">Email:</span>{' '}
                {contactInfo.email ? (
                  <a
                    href={`mailto:${contactInfo.email}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {contactInfo.email}
                  </a>
                ) : (
                  <span className="text-gray-400">Not provided</span>
                )}
              </div>
              <div>
                <span className="font-semibold">Phone:</span>{' '}
                {contactInfo.phone ? (
                  <div className="flex flex-col gap-2 mt-1">
                    <a
                      href={`tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {contactInfo.phone}
                    </a>
                    <a
                      href={`https://wa.me/${formatPhoneForWhatsApp(contactInfo.phone).replace('+', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-green-600 hover:text-green-800 underline flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      Open WhatsApp
                    </a>
                  </div>
                ) : (
                  <span className="text-gray-400">Not provided</span>
                )}
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
