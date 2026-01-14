'use client'

import React, { useEffect, useState } from 'react'
import EditProfileForm from '@/components/EditProfileForm'
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
  const [showEdit, setShowEdit] = useState(false)
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

  // Optimize card rendering with useMemo
  const memoizedNunnies = React.useMemo(() => nunnies, [nunnies])
  const memoizedRequests = React.useMemo(() => myRequests, [myRequests])

  const handleContactNunny = (nunny: Nunny) => {
    setContactInfo(nunny.user)
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
      const res = await fetch(`/api/requests/${id}/assign`, { 
        method: 'PATCH', 
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        } 
      })
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
    <div className="min-h-screen" style={{ background: 'var(--blue-50)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--blue-900)' }}>Client Dashboard</h1>
              <p className="mt-2 text-sm sm:text-base" style={{ color: 'var(--blue-600)' }}>Welcome back, {user.fullName}! Find nunnies or post your service requests.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                onClick={() => setShowEdit(true)}
                className="w-full sm:w-auto text-xs sm:text-base"
              >
                Edit Profile
              </Button>
              <Button 
                onClick={() => setShowRequestForm(!showRequestForm)}
                className="w-full sm:w-auto text-xs sm:text-base"
              >
                {showRequestForm ? 'Cancel' : <span className="whitespace-normal sm:whitespace-nowrap">Post Service Request</span>}
              </Button>
            </div>
          </div>
        </div>

        {showEdit && (
          <EditProfileForm
            user={user}
            token={token}
            onClose={() => setShowEdit(false)}
            onProfileUpdated={() => {
              toast.success('Profile updated')
              setShowEdit(false)
            }}
          />
        )}

        {/* Post Request Form */}
        {showRequestForm && (
          <div className="bg-white shadow rounded-lg p-6 mb-8 border" style={{ borderColor: 'var(--blue-200)' }}>
            <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--blue-900)' }}>Post a Service Request</h3>
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
                  value={requestForm.phone || ''}
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
        <div className="mb-8">
          <h3 className="text-lg leading-6 font-medium mb-4" style={{ color: 'var(--blue-900)' }}>My Posts</h3>
          <p className="text-sm mb-6" style={{ color: 'var(--blue-600)' }}>Manage your posted service requests</p>
          
          {myRequestsLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: 'var(--blue-600)' }}></div>
              <p className="mt-2" style={{ color: 'var(--blue-600)' }}>Loading...</p>
            </div>
          ) : myRequests.length === 0 ? (
            <div className="text-center py-12">
              <p style={{ color: 'var(--blue-600)' }}>You have not posted any requests yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {memoizedRequests.map((r) => (
                <div
                  key={r.id}
                  className="profile-card w-full rounded-md shadow-xl overflow-hidden z-10 relative cursor-pointer snap-start shrink-0 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group"
                >
                  <div className="avatar w-full pt-5 flex items-center justify-center flex-col gap-1">
                    <div className="img_container w-full flex items-center justify-center relative z-40 after:absolute after:h-[6px] after:w-full after:bg-[var(--blue-600)] after:top-4 after:group-hover:size-[1%] after:delay-300 after:group-hover:delay-0 after:group-hover:transition-all after:group-hover:duration-300 after:transition-all after:duration-300 before:absolute before:h-[6px] before:w-full before:bg-[var(--blue-600)] before:bottom-4 before:group-hover:size-[1%] before:delay-300 before:group-hover:delay-0 before:group-hover:transition-all before:group-hover:duration-300 before:transition-all before:duration-300">
                      <div className="size-36 z-40 border-4 border-white rounded-full group-hover:border-8 group-hover:transition-all group-hover:duration-300 transition-all duration-300 bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">
                          {r.service.charAt(0)}
                        </span>
                      </div>
                      <div className="absolute bg-[var(--blue-600)] z-10 size-[60%] w-full group-hover:size-[1%] group-hover:transition-all group-hover:duration-300 transition-all duration-300 delay-700 group-hover:delay-0"></div>
                    </div>
                  </div>
                  
                  <div className="headings *:text-center *:leading-4 px-4">
                    <p className="text-xl font-serif font-semibold" style={{ color: 'var(--blue-900)' }}>
                      {r.service}
                    </p>
                    <p className="text-sm font-semibold" style={{ color: 'var(--blue-600)' }}>
                      KES {Number(r.amount).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="w-full items-center justify-center flex px-4">
                    <ul className="flex flex-col items-start gap-2 *:inline-flex *:gap-2 *:items-center *:justify-center *:border-b-[1.5px] *:border-b-stone-700 *:border-dotted *:text-xs *:font-semibold *:text-[var(--blue-900)] pb-3 w-full [&>*:last-child]:border-b-0">
                      <li>
                        <svg className="fill-stone-700 group-hover:fill-[var(--blue-600)]" height="15" width="15" viewBox="0 0 16 16">
                          <path d="M8 0C5.2 0 3 2.2 3 5s4 11 5 11 5-8.2 5-11-2.2-5-5-5zm0 8C6.3 8 5 6.7 5 5s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" fill="#444"></path>
                        </svg>
                        <p>{r.location}</p>
                      </li>
                      <li>
                        <svg className="fill-stone-700 group-hover:fill-[var(--blue-600)]" height="15" width="15" viewBox="0 0 24 24">
                          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" fill="none" stroke="currentColor" strokeWidth="2"></path>
                        </svg>
                        <p>Posted: {new Date(r.createdAt).toLocaleDateString()}</p>
                      </li>
                      <li>
                        <svg className="fill-stone-700 group-hover:fill-[var(--blue-600)]" height="15" width="15" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" fill="none" stroke="currentColor" strokeWidth="2"></path>
                        </svg>
                        <p>Status: {r.status}</p>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="w-full px-4 pb-4">
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      <strong>Description:</strong> {r.description}
                    </p>
                    
                    <div className="flex gap-2">
                      {r.status !== 'ASSIGNED' ? (
                        <Button size="sm" onClick={() => markAssigned(r.id)} className="w-full btn-compact">
                          Mark as Assigned
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={async () => {
                            try {
                              const res = await fetch(`/api/requests/${r.id}/unassign`, { 
                                method: 'PATCH', 
                                headers: { 
                                  'Authorization': `Bearer ${token}`,
                                  'Content-Type': 'application/json'
                                } 
                              })
                              const data = await res.json()
                              if (!res.ok) throw new Error(data.error || 'Failed to unassign')
                              toast.success('Marked as open')
                              fetchMyRequests()
                            } catch (e: any) {
                              toast.error(e.message)
                            }
                          }}
                          className="w-full btn-compact"
                        >
                          Unassign
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

        {/* Available Nunnies */}
        <div className="mb-8">
          <h3 className="text-lg leading-6 font-medium mb-4" style={{ color: 'var(--blue-900)' }}>
            Available Nunnies
          </h3>
          <p className="text-sm mb-6" style={{ color: 'var(--blue-600)' }}>
            Browse approved nunnies in your area
          </p>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: 'var(--blue-600)' }}></div>
              <p className="mt-2" style={{ color: 'var(--blue-600)' }}>Loading nunnies...</p>
            </div>
          ) : nunnies.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium" style={{ color: 'var(--blue-900)' }}>No nunnies available</h3>
              <p className="mt-1 text-sm" style={{ color: 'var(--blue-600)' }}>There are currently no approved nunnies in your area.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {memoizedNunnies.map((nunny) => (
                <div
                  key={nunny.id}
                  className="profile-card w-full rounded-md shadow-xl overflow-hidden z-10 relative cursor-pointer snap-start shrink-0 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group"
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
                        <div className="size-36 z-40 border-4 border-white rounded-full group-hover:border-8 group-hover:transition-all group-hover:duration-300 transition-all duration-300 bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center">
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
                    <p className="text-sm font-semibold" style={{ color: 'var(--blue-600)' }}>
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
                        <a
                          href={`tel:${nunny.user.phone.replace(/[^\d+]/g, '')}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-[var(--blue-900)] hover:text-[var(--blue-600)] hover:underline"
                        >
                          {nunny.user.phone}
                        </a>
                      </li>
                      <li>
                        <svg className="fill-stone-700 group-hover:fill-[var(--blue-600)]" height="15" width="15" viewBox="0 0 16 16">
                          <path d="M8 0C5.2 0 3 2.2 3 5s4 11 5 11 5-8.2 5-11-2.2-5-5-5zm0 8C6.3 8 5 6.7 5 5s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" fill="#444"></path>
                        </svg>
                        <p>{nunny.user.county}, {nunny.user.constituency}</p>
                      </li>
                      <li>
                        <svg className="fill-stone-700 group-hover:fill-[var(--blue-600)]" height="15" width="15" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="none" stroke="currentColor" strokeWidth="2"></path>
                        </svg>
                        <p>Services: {JSON.parse(nunny.services).join(', ')}</p>
                      </li>
                      <li>
                        <svg className="fill-stone-700 group-hover:fill-[var(--blue-600)]" height="15" width="15" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" fill="none" stroke="currentColor" strokeWidth="2"></path>
                        </svg>
                        <p>Status: Approved</p>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="w-full px-4 pb-4">
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      <strong>Description:</strong> {nunny.description}
                    </p>
                    {nunny.contactInfo && (
                      <p className="text-xs text-gray-600 mb-3 line-clamp-1">
                        <strong>Contact Info:</strong> {nunny.contactInfo}
                      </p>
                    )}
                    
                    <Button
                      size="sm"
                      onClick={() => handleContactNunny(nunny)}
                      className="w-full btn-compact"
                    >
                      Contact Nunny
                    </Button>
                  </div>
                  
                  <hr className="w-full group-hover:h-5 h-3 bg-[var(--blue-600)] group-hover:transition-all group-hover:duration-300 transition-all duration-300" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Nunny Modal */}
        {showContact && contactInfo && (
          <div
            className="fixed inset-0 flex items-center justify-center z-[9999]"
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
              <div className="space-y-3 text-gray-800">
                <div>
                  <span className="font-semibold">Name:</span> {contactInfo.fullName}
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

