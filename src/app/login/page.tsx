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
  const [isAdminLogin, setIsAdminLogin] = useState(false)
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
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">MyNunny</h1>
          <h2 className="text-2xl font-bold text-gray-900">
            {isAdminLogin ? 'Admin Login' : 'Sign in to your account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isAdminLogin ? 'Access the admin dashboard' : 'Welcome back!'}
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {isAdminLogin ? (
              <Input
                label="Username"
                {...register('username', { required: 'Username is required' })}
                error={errors.username?.message}
                placeholder="admin"
              />
            ) : (
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
            )}

            <Input
              label="Password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              error={errors.password?.message}
            />

            <div>
              <Button type="submit" loading={loading} className="w-full">
                {isAdminLogin ? 'Admin Login' : 'Sign in'}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsAdminLogin(!isAdminLogin)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                {isAdminLogin ? 'Regular User Login' : 'Admin Login'}
              </button>
            </div>
          </div>

          {!isAdminLogin && (
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
          )}
        </div>
      </div>
    </div>
  )
}
