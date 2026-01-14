'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { Checkbox } from '@/components/ui/Checkbox'
import { kenyaCounties, countyConstituencies, services } from '@/lib/kenya-data'

interface FormData {
  email: string
  password: string
  confirmPassword: string
  fullName: string
  phone: string
  idNumber: string
  county: string
  constituency: string
  description?: string
  services?: string[]
  otherService?: string
  contactInfo?: string
  serviceWanted?: string[]
  amountOffered?: number
}

function RegisterContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const role = searchParams.get('role') as 'nunny' | 'client'
  
  const [step, setStep] = useState(1) // 1 = registration form, 2 = OTP verification
  const [currentSection, setCurrentSection] = useState(1) // 1 = Personal, 2 = Location, 3 = Services, 4 = Verification
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedServicesWanted, setSelectedServicesWanted] = useState<string[]>([])
  const [constituencies, setConstituencies] = useState<{ value: string; label: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [tempData, setTempData] = useState<any>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormData>()

  const watchedCounty = watch('county')

  useEffect(() => {
    if (watchedCounty && countyConstituencies[watchedCounty]) {
      const constituencyOptions = countyConstituencies[watchedCounty].map(constituency => ({
        value: constituency,
        label: constituency
      }))
      setConstituencies(constituencyOptions)
    } else {
      setConstituencies([])
    }
  }, [watchedCounty])

  useEffect(() => {
    if (!role || !['nunny', 'client'].includes(role)) {
      router.push('/')
    }
  }, [role, router])

  // Update section when step changes to verification
  useEffect(() => {
    if (step === 2) {
      setCurrentSection(4)
    }
  }, [step])

  // Track active section using Intersection Observer
  useEffect(() => {
    if (step !== 1) return // Only track sections in registration form

    const sections = [
      document.getElementById('personal-details'),
      document.getElementById('location-details'),
      document.getElementById('services-section')
    ].filter(Boolean)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            const sectionId = entry.target.id
            if (sectionId === 'personal-details') setCurrentSection(1)
            else if (sectionId === 'location-details') setCurrentSection(2)
            else if (sectionId === 'services-section') setCurrentSection(3)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-100px 0px' }
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [step, role])

  const onSubmit = async (data: FormData) => {
    if (step === 1) {
      // Validate password confirmation
      if (data.password !== data.confirmPassword) {
        toast.error('Passwords do not match')
        return
      }

      // Prepare data based on role
      const submitData = {
        ...data,
        role: role.toUpperCase(),
        services: role === 'nunny' ? selectedServices : undefined,
        serviceWanted: role === 'client' ? selectedServicesWanted : undefined,
        otherService: role === 'nunny' && selectedServices.includes('Others') ? data.otherService : undefined
      }

      setLoading(true)
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submitData),
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Registration failed')
        }

        setTempData(result.tempData)
        setStep(2)
        toast.success('OTP sent to your email!')
      } catch (error: any) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }
  }

  const verifyOTP = async (data: { otp: string }) => {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: tempData.email,
          otp: data.otp,
          tempData
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'OTP verification failed')
      }

      // Store token and redirect
      localStorage.setItem('token', result.token)
      localStorage.setItem('user', JSON.stringify(result.user))
      
      toast.success('Registration successful!')
      
      // Redirect based on role
      if (result.user.role === 'NUNNY') {
        router.push('/nunny/dashboard')
      } else if (result.user.role === 'CLIENT') {
        router.push('/client/dashboard')
      }
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setSelectedServices([...selectedServices, service])
    } else {
      setSelectedServices(selectedServices.filter(s => s !== service))
    }
  }

  const handleServiceWantedChange = (service: string, checked: boolean) => {
    if (checked) {
      setSelectedServicesWanted([...selectedServicesWanted, service])
    } else {
      setSelectedServicesWanted(selectedServicesWanted.filter(s => s !== service))
    }
  }

  if (!role || !['nunny', 'client'].includes(role)) {
    return null
  }

  const steps = [
    { number: 1, label: 'Personal Details', section: 1 },
    { number: 2, label: 'Location Details', section: 2 },
    { number: 3, label: role === 'nunny' ? 'Services' : 'Requirements', section: 3 },
    { number: 4, label: 'Verification', section: 4 }
  ]

  // Track which section is active based on step
  const activeSection = step === 2 ? 4 : currentSection

  return (
    <div className="min-h-screen" style={{ background: '#E0F2F1' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden" style={{ minHeight: '600px' }}>
          <div className="flex flex-col lg:flex-row">
            {/* Left Sidebar */}
            <div className="lg:w-1/3 p-8" style={{ background: '#F5F5F5' }}>
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <img src="/favicon.ico" alt="MyNunny" className="w-8 h-8 mr-2" />
                  <span className="text-xl font-bold" style={{ color: '#14B8A6' }}>MyNunny</span>
                </div>
                <h2 className="text-2xl font-bold mb-1" style={{ color: '#333' }}>Create account</h2>
              </div>

              {/* Step Navigation */}
              <div className="space-y-6">
                {steps.map((stepItem, index) => {
                  const isActive = activeSection === stepItem.section
                  const isCompleted = activeSection > stepItem.section
                  const isInactive = activeSection < stepItem.section
                  
                  return (
                    <div key={stepItem.number} className="flex items-start">
                      <div className="flex flex-col items-center mr-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                            isCompleted
                              ? 'bg-green-500 text-white'
                              : isActive
                              ? 'bg-teal-500 text-white'
                              : 'bg-gray-300 text-gray-600'
                          }`}
                          style={{
                            background: isCompleted ? '#10B981' : isActive ? '#14B8A6' : '#D1D5DB'
                          }}
                        >
                          {isCompleted ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            stepItem.number
                          )}
                        </div>
                        {index < steps.length - 1 && (
                          <div
                            className={`w-0.5 h-12 mt-2 ${
                              isCompleted ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                            style={{
                              background: isCompleted ? '#10B981' : '#D1D5DB'
                            }}
                          />
                        )}
                      </div>
                      <div className="flex-1 pt-2">
                        <p
                          className={`font-medium ${
                            isActive || isCompleted
                              ? 'text-gray-900'
                              : 'text-gray-400'
                          }`}
                        >
                          {stepItem.label}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right Form Section */}
            <div className="lg:w-2/3 p-8 sm:p-10">
              {step === 1 ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* YOUR PERSONAL DETAILS */}
                  <div id="personal-details">
                    <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide" style={{ color: '#666' }}>
                      YOUR PERSONAL DETAILS
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                          National Identity Number
                        </label>
                        <input
                          type="text"
                          {...register('idNumber', { required: 'National ID is required' })}
                          onFocus={() => setCurrentSection(1)}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          style={{ borderColor: '#E5E7EB' }}
                          placeholder="Enter your National ID"
                        />
                        {errors.idNumber && (
                          <p className="mt-1 text-xs text-red-500">{errors.idNumber.message}</p>
                        )}
                        <p className="mt-1 text-xs" style={{ color: '#999' }}>This should be your valid National ID number</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                          Full Name (as per National ID)
                        </label>
                        <input
                          type="text"
                          {...register('fullName', { required: 'Full name is required' })}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          style={{ borderColor: '#E5E7EB' }}
                          placeholder="Enter your full name"
                        />
                        {errors.fullName && (
                          <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* YOUR RESIDENTIAL ADDRESS */}
                  <div id="location-details">
                    <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide" style={{ color: '#666' }}>
                      YOUR RESIDENTIAL ADDRESS
                    </h3>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                            County
                          </label>
                          <select
                            {...register('county', { required: 'County is required' })}
                            onFocus={() => setCurrentSection(2)}
                            onChange={(e) => {
                              setCurrentSection(2)
                              setValue('county', e.target.value)
                            }}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none bg-white"
                            style={{ borderColor: '#E5E7EB' }}
                          >
                            <option value="">Select County</option>
                            {kenyaCounties.map(county => (
                              <option key={county} value={county}>{county}</option>
                            ))}
                          </select>
                          {errors.county && (
                            <p className="mt-1 text-xs text-red-500">{errors.county.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                            Constituency
                          </label>
                          <select
                            {...register('constituency', { required: 'Constituency is required' })}
                            disabled={!watchedCounty}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none bg-white disabled:bg-gray-100"
                            style={{ borderColor: '#E5E7EB' }}
                          >
                            <option value="">Select Constituency</option>
                            {constituencies.map(constituency => (
                              <option key={constituency.value} value={constituency.value}>{constituency.label}</option>
                            ))}
                          </select>
                          {errors.constituency && (
                            <p className="mt-1 text-xs text-red-500">{errors.constituency.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CONTACT DETAILS */}
                  <div>
                    <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide" style={{ color: '#666' }}>
                      CONTACT DETAILS
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                          Your Phone Number
                        </label>
                        <div className="flex">
                          <div className="px-4 py-3 border rounded-l-lg flex items-center" style={{ borderColor: '#E5E7EB', background: '#F9FAFB' }}>
                            <span className="text-sm font-medium">+254</span>
                          </div>
                          <input
                            type="tel"
                            {...register('phone', { required: 'Phone number is required' })}
                            className="flex-1 px-4 py-3 border border-l-0 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            style={{ borderColor: '#E5E7EB' }}
                            placeholder="Your Phone Number"
                          />
                        </div>
                        {errors.phone && (
                          <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                          Your Email Address
                        </label>
                        <input
                          type="email"
                          {...register('email', { 
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address'
                            }
                          })}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          style={{ borderColor: '#E5E7EB' }}
                          placeholder="Your Email Address"
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                            Password
                          </label>
                          <input
                            type="password"
                            {...register('password', { 
                              required: 'Password is required',
                              minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters'
                              }
                            })}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            style={{ borderColor: '#E5E7EB' }}
                            placeholder="Password"
                          />
                          {errors.password && (
                            <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            {...register('confirmPassword', { required: 'Please confirm your password' })}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            style={{ borderColor: '#E5E7EB' }}
                            placeholder="Confirm Password"
                          />
                          {errors.confirmPassword && (
                            <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Role-specific fields */}
                  {role === 'nunny' && (
                    <div id="services-section">
                      <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide" style={{ color: '#666' }}>
                        YOUR SERVICES
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                            Description
                          </label>
                          <textarea
                            rows={4}
                            {...register('description', { required: 'Description is required' })}
                            onFocus={() => setCurrentSection(3)}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            style={{ borderColor: '#E5E7EB' }}
                            placeholder="Tell us about yourself and your experience..."
                          />
                          {errors.description && (
                            <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                            Services Offered
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {services.map((service) => (
                              <label key={service} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={selectedServices.includes(service)}
                                  onChange={(e) => handleServiceChange(service, e.target.checked)}
                                  className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                                />
                                <span className="text-sm" style={{ color: '#333' }}>{service}</span>
                              </label>
                            ))}
                          </div>
                          {selectedServices.includes('Others') && (
                            <div className="mt-4">
                              <input
                                type="text"
                                {...register('otherService')}
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                style={{ borderColor: '#E5E7EB' }}
                                placeholder="Specify Other Service"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {role === 'client' && (
                    <div id="services-section">
                      <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide" style={{ color: '#666' }}>
                        YOUR REQUIREMENTS
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                            Services Wanted
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {services.map((service) => (
                              <label key={service} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={selectedServicesWanted.includes(service)}
                                  onChange={(e) => handleServiceWantedChange(service, e.target.checked)}
                                  className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                                />
                                <span className="text-sm" style={{ color: '#333' }}>{service}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                            Amount Offered (KES)
                          </label>
                          <input
                            type="number"
                            {...register('amountOffered', { 
                              valueAsNumber: true,
                              min: { value: 0, message: 'Amount must be positive' }
                            })}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            style={{ borderColor: '#E5E7EB' }}
                            placeholder="e.g., 5000"
                          />
                          {errors.amountOffered && (
                            <p className="mt-1 text-xs text-red-500">{errors.amountOffered.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Next Button */}
                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ background: '#14B8A6' }}
                      onMouseEnter={(e) => {
                        if (!loading) e.currentTarget.style.background = '#0D9488'
                      }}
                      onMouseLeave={(e) => {
                        if (!loading) e.currentTarget.style.background = '#14B8A6'
                      }}
                    >
                      {loading ? 'Processing...' : 'Next'}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSubmit(verifyOTP)} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: '#333' }}>
                      Verify Your Email
                    </h3>
                    <p className="text-sm mb-6" style={{ color: '#666' }}>
                      Enter the 6-digit code sent to your email
                    </p>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                        Enter 6-digit OTP
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        {...register('otp', { 
                          required: 'OTP is required',
                          pattern: {
                            value: /^\d{6}$/,
                            message: 'OTP must be 6 digits'
                          }
                        })}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-center text-2xl tracking-widest"
                        style={{ borderColor: '#E5E7EB' }}
                        placeholder="123456"
                      />
                      {errors.otp && (
                        <p className="mt-1 text-xs text-red-500">{errors.otp.message}</p>
                      )}
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-6 py-3 rounded-lg font-medium border transition-all duration-300"
                        style={{ borderColor: '#E5E7EB', color: '#666' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#F5F5F5'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent'
                        }}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ background: '#14B8A6' }}
                        onMouseEnter={(e) => {
                          if (!loading) e.currentTarget.style.background = '#0D9488'
                        }}
                        onMouseLeave={(e) => {
                          if (!loading) e.currentTarget.style.background = '#14B8A6'
                        }}
                      >
                        {loading ? 'Verifying...' : 'Verify'}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Register() {
  return (
    <Suspense fallback={null}>
      <RegisterContent />
    </Suspense>
  )
}
