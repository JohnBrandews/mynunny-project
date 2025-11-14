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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-12 sm:px-6 lg:px-8">
      <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
        <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg animate-pulse" />
        <div id="form-container" className="relative z-10 bg-white p-8 sm:p-10 rounded-lg shadow-2xl w-full transform transition duration-500 ease-in-out">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">MyNunny</h1>
            <h2 id="form-title" className="text-2xl font-bold text-gray-800">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Welcome back!
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
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

            <Input
              label="Password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              error={errors.password?.message}
            />

            <div>
              <Button type="submit" loading={loading} className="w-full btn-compact">
                Sign in
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              <a href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">Forgot password?</a>
            </p>
          </div>
          <div className="mt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link href="/register?role=client" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign up as a Client
                </Link>
                {' '}or{' '}
                <Link href="/register?role=nunny" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign up as a Nunny
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
