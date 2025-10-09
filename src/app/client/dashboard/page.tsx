'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { kenyaCounties, services } from '@/lib/kenya-data'

interface Nunny {
  id: string
  description: string
  services: string
  contactInfo?: string
  user: {
    id: string
    fullName: string
    county: string
    constituency: string
    profilePictureUrl?: string
    phone: string
  }
}

interface RequestForm {
  service: string
  amount: number
  location: string
  description: string
  email?: string
  phone?: string
}

export default function ClientDashboard() {
  const { user, token } = useAuth()
  const router = useRouter()
  const [nunnies, setNunnies] = useState<Nunny[]>([])
  const [loading, setLoading] = useState(true)
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [requestLoading, setRequestLoading] = useState(false)
  const [myRequests, setMyRequests] = useState<any[]>([])
  const [myRequestsLoading, setMyRequestsLoading] = useState(false)
  const [requestForm, setRequestForm] = useState<RequestForm>({
    service: '',
    amount: 0,
    location: '',
    description: ''
  })
  const [showContact, setShowContact] = useState(false)
  const [contactInfo, setContactInfo] = useState<any>(null)

  useEffect(() => {
    if (!user || user.role !== 'CLIENT') {
      router.push('/')
      return
    }
    fetchNunnies()
  }, [user, router])

  useEffect(() => {
    if (user && user.role === 'CLIENT') {
      void fetchMyRequests()
    }
  }, [user])

  const fetchNunnies = async () => {
    try {
      const response = await fetch('/api/nunnies')

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

  const handleContactNunny = (nunny: Nunny) => {
    setContactInfo(nunny.user)
    setShowContact(true)
  }

  const fetchMyRequests = async () => {
    setMyRequestsLoading(true)
    try {
      const res = await fetch('/api/requests/mine', { headers: { 'Authorization': `Bearer ${token}` } })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load your requests')
      setMyRequests(data.requests)
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setMyRequestsLoading(false)
    }
  }

  const markAssigned = async (id: string) => {
    try {
      const res = await fetch(`/api/requests/${id}/assign`, { method: 'PATCH', headers: { 'Authorization': `Bearer ${token}` } })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to mark as assigned')
      toast.success('Marked as assigned')
      fetchMyRequests()
    } catch (e: any) {
      toast.error(e.message)
    }
  }

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!requestForm.service || !requestForm.amount || !requestForm.location || !requestForm.description) {
      toast.error('Please fill in all fields')
      return
    }

    setRequestLoading(true)
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestForm)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create request')
      }

      toast.success('Service request posted successfully!')
      setShowRequestForm(false)
      setRequestForm({
        service: '',
        amount: 0,
        location: '',
        description: ''
      })
      fetchMyRequests()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setRequestLoading(false)
    }
  }

  if (!user || user.role !== 'CLIENT') {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
              <p className="mt-2 text-gray-600">Welcome back, {user.fullName}! Find nunnies or post your service requests.</p>
            </div>
            <Button onClick={() => setShowRequestForm(!showRequestForm)}>
              {showRequestForm ? 'Cancel' : 'Post Service Request'}
            </Button>
          </div>
        </div>

        {/* Post Request Form */}
        {showRequestForm && (
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Post a Service Request</h3>
            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Select
                  label="Service Needed"
                  options={services.map(service => ({ value: service, label: service }))}
                  value={requestForm.service}
                  onChange={(e) => setRequestForm({ ...requestForm, service: e.target.value })}
                />
                <Input
                  label="Amount Offered (KES)"
                  type="number"
                  value={requestForm.amount}
                  onChange={(e) => setRequestForm({ ...requestForm, amount: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <Input
                label="Location"
                value={requestForm.location}
                onChange={(e) => setRequestForm({ ...requestForm, location: e.target.value })}
                placeholder="e.g., Westlands, Nairobi"
              />
              <Textarea
                label="Description"
                rows={4}
                value={requestForm.description}
                onChange={(e) => setRequestForm({ ...requestForm, description: e.target.value })}
                placeholder="Describe what you need help with..."
              />
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Your Email"
                  type="email"
                  value={requestForm.email || user.email}
                  onChange={(e) => setRequestForm({ ...requestForm, email: e.target.value })}
                  required
                />
                <Input
                  label="Your Phone Number"
                  type="tel"
                  value={requestForm.phone || user.phone}
                  onChange={(e) => setRequestForm({ ...requestForm, phone: e.target.value })}
                  required
                />
              </div>
              <div className="flex space-x-4">
                <Button type="submit" loading={requestLoading}>
                  Post Request
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowRequestForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* My Posts */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">My Posts</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage your posted service requests</p>
          </div>
          {myRequestsLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : myRequests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">You have not posted any requests yet.</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {myRequests.map((r) => (
                <li key={r.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{r.service} • KES {Number(r.amount).toLocaleString()}</div>
                      <div className="text-sm text-gray-600">{r.location}</div>
                      <div className="text-xs mt-1">
                        <span className={`px-2 py-0.5 rounded-full ${r.status === 'ASSIGNED' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                          {r.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {r.status !== 'ASSIGNED' ? (
                        <Button size="sm" onClick={() => markAssigned(r.id)}>Mark as Assigned</Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={async () => {
                            try {
                              const res = await fetch(`/api/requests/${r.id}/unassign`, { method: 'PATCH', headers: { 'Authorization': `Bearer ${token}` } })
                              const data = await res.json()
                              if (!res.ok) throw new Error(data.error || 'Failed to unassign')
                              toast.success('Marked as open')
                              fetchMyRequests()
                            } catch (e: any) {
                              toast.error(e.message)
                            }
                          }}
                        >
                          Unassign
                        </Button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Available Nunnies */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Available Nunnies
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Browse approved nunnies in your area
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading nunnies...</p>
            </div>
          ) : nunnies.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No nunnies available</h3>
              <p className="mt-1 text-sm text-gray-500">There are currently no approved nunnies in your area.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {nunnies.map((nunny) => (
                <li key={nunny.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {nunny.user.profilePictureUrl ? (
                            <img className="h-12 w-12 rounded-full" src={nunny.user.profilePictureUrl} alt="" />
                          ) : (
                            <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                              <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="ml-4 flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-lg font-medium text-gray-900 truncate">
                                {nunny.user.fullName}
                              </h4>
                              <div className="mt-1 flex items-center text-sm text-gray-500">
                                <span className="mr-4">{nunny.user.county}, {nunny.user.constituency}</span>
                                <span>{nunny.user.phone}</span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Approved
                              </span>
                            </div>
                          </div>

                          <div className="mt-2">
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
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4 flex-shrink-0">
                      <Button
                        size="sm"
                        onClick={() => handleContactNunny(nunny)}
                      >
                        Contact Nunny
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Contact Nunny Modal */}
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
              <h2 className="text-xl font-bold mb-4 text-blue-700 text-center">Nunny Contact Details</h2>
              <div className="space-y-2 text-gray-800">
                <div>
                  <span className="font-semibold">Name:</span> {contactInfo.fullName}
                </div>
                <div>
                  <span className="font-semibold">Phone:</span> {contactInfo.phone || <span className="text-gray-400">Not provided</span>}
                </div>
                <div>
                  <span className="font-semibold">County:</span> {contactInfo.county}
                </div>
                <div>
                  <span className="font-semibold">Constituency:</span> {contactInfo.constituency}
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
    </div>
  )
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { service, amount, location, description, email, phone } = body

  // Save all fields, including email and phone
  const newRequest = await prisma.request.create({
    data: {
      service,
      amount,
      location,
      description,
      email,
      phone,
      userId: user.id, // or however you link the client
    },
  })

  return NextResponse.json({ request: newRequest })
}
