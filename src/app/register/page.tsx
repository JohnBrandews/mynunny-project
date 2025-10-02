'use client'

import React, { useState, useEffect } from 'react'
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

export default function Register() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const role = searchParams.get('role') as 'nunny' | 'client'
  
  const [step, setStep] = useState(1)
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {step === 1 ? 'Register as a ' + role.charAt(0).toUpperCase() + role.slice(1) : 'Verify Your Email'}
            </h1>
            <p className="text-gray-600">
              {step === 1 
                ? 'Create your account to get started' 
                : 'Enter the 6-digit code sent to your email'
              }
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Full Name (as per National ID)"
                  {...register('fullName', { required: 'Full name is required' })}
                  error={errors.fullName?.message}
                />
                <Input
                  label="Email"
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  error={errors.email?.message}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Password"
                  type="password"
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                  error={errors.password?.message}
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  {...register('confirmPassword', { required: 'Please confirm your password' })}
                  error={errors.confirmPassword?.message}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Phone Number"
                  {...register('phone', { required: 'Phone number is required' })}
                  error={errors.phone?.message}
                />
                <Input
                  label="National ID Number"
                  {...register('idNumber', { required: 'National ID is required' })}
                  error={errors.idNumber?.message}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Select
                  label="County"
                  options={kenyaCounties.map(county => ({ value: county, label: county }))}
                  {...register('county', { required: 'County is required' })}
                  error={errors.county?.message}
                />
                <Select
                  label="Constituency"
                  options={constituencies}
                  {...register('constituency', { required: 'Constituency is required' })}
                  error={errors.constituency?.message}
                  disabled={!watchedCounty}
                />
              </div>

              {/* Role-specific fields */}
              {role === 'nunny' && (
                <>
                  <Textarea
                    label="Description"
                    rows={4}
                    {...register('description', { required: 'Description is required' })}
                    error={errors.description?.message}
                    placeholder="Tell us about yourself and your experience..."
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Services Offered
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {services.map((service) => (
                        <Checkbox
                          key={service}
                          label={service}
                          checked={selectedServices.includes(service)}
                          onChange={(e) => handleServiceChange(service, e.target.checked)}
                        />
                      ))}
                    </div>
                    {selectedServices.includes('Others') && (
                      <Input
                        label="Specify Other Service"
                        {...register('otherService')}
                        className="mt-2"
                      />
                    )}
                  </div>

                  <Input
                    label="Additional Contact Information"
                    {...register('contactInfo')}
                    placeholder="Any additional contact details..."
                  />
                </>
              )}

              {role === 'client' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Services Wanted
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {services.map((service) => (
                        <Checkbox
                          key={service}
                          label={service}
                          checked={selectedServicesWanted.includes(service)}
                          onChange={(e) => handleServiceWantedChange(service, e.target.checked)}
                        />
                      ))}
                    </div>
                  </div>

                  <Input
                    label="Amount Offered (KES)"
                    type="number"
                    {...register('amountOffered', { 
                      valueAsNumber: true,
                      min: { value: 0, message: 'Amount must be positive' }
                    })}
                    error={errors.amountOffered?.message}
                    placeholder="e.g., 5000"
                  />

                  <Input
                    label="Additional Contact Information"
                    {...register('contactInfo')}
                    placeholder="Any additional contact details..."
                  />
                </>
              )}

              <Button type="submit" loading={loading} className="w-full">
                Register
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmit(verifyOTP)} className="space-y-6">
              <Input
                label="Enter 6-digit OTP"
                maxLength={6}
                {...register('otp', { 
                  required: 'OTP is required',
                  pattern: {
                    value: /^\d{6}$/,
                    message: 'OTP must be 6 digits'
                  }
                })}
                error={errors.otp?.message}
                placeholder="123456"
              />

              <Button type="submit" loading={loading} className="w-full">
                Verify OTP
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Back to registration
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
