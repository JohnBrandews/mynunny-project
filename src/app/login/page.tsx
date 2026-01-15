'use client'


import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/contexts/AuthContext'

interface FormData {
  email: string
  password: string
  username?: string
}

export default function Login() {
  const router = useRouter()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await login(data.email, data.password, data.username)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 sm:px-6 lg:px-8" style={{ background: '#E8E8E8' }}>
      <div className="w-full max-w-md">
        {/* Neumorphism Panel */}
        <div 
          className="rounded-3xl p-8 sm:p-10 w-full"
          style={{
            background: '#E8E8E8',
            boxShadow: '20px 20px 60px #c5c5c5, -20px -20px 60px #ffffff'
          }}
        >
          {/* Logo/Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  background: '#000000',
                  boxShadow: 'inset 5px 5px 10px #000000, inset -5px -5px 10px #1a1a1a'
                }}
              >
                <img 
                  src="/favicon.ico" 
                  alt="MyNunny Logo" 
                  className="w-full h-full rounded-full"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>MyNunny</h2>
            <p className="text-sm" style={{ color: '#000000' }}>Welcome back</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Input with Neumorphism Inset */}
            <div>
              <div 
                className="flex items-center rounded-2xl px-4 py-3"
                style={{
                  background: '#E8E8E8',
                  boxShadow: 'inset 8px 8px 16px #d1d1d1, inset -8px -8px 16px #ffffff'
                }}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#666' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input
                  type="email"
                  placeholder="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                  style={{ color: '#000' }}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password Input with Neumorphism Inset */}
            <div>
              <div 
                className="flex items-center rounded-2xl px-4 py-3"
                style={{
                  background: '#E8E8E8',
                  boxShadow: 'inset 8px 8px 16px #d1d1d1, inset -8px -8px 16px #ffffff'
                }}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#666' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  type="password"
                  placeholder="password"
                  {...register('password', { required: 'Password is required' })}
                  className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                  style={{ color: '#000' }}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Login Button with Teal Gradient */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl py-4 font-semibold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
                boxShadow: '8px 8px 16px #b8b8b8, -8px -8px 16px #ffffff, inset 0 0 0 0 rgba(20, 184, 166, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '12px 12px 24px #b8b8b8, -12px -12px 24px #ffffff, inset 0 0 0 0 rgba(20, 184, 166, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '8px 8px 16px #b8b8b8, -8px -8px 16px #ffffff, inset 0 0 0 0 rgba(20, 184, 166, 0.2)'
              }}
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: '#666' }}>
              <a href="/forgot-password" className="hover:underline">Forgot password?</a>
              {' '}or{' '}
              <Link href="/register?role=client" className="font-semibold hover:underline" style={{ color: '#000' }}>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
