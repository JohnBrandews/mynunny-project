'use client'

import React, { useMemo, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
  const params = useSearchParams()
  const router = useRouter()
  const token = params.get('token') || ''
  const emailFromQuery = params.get('email') || ''

  const [email, setEmail] = useState(emailFromQuery)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const isDisabled = useMemo(() => loading || !email || !newPassword || !confirmPassword, [loading, email, newPassword, confirmPassword])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, newPassword, confirmPassword })
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to reset password')
      }
      setSuccess(true)
      setTimeout(() => router.push('/login'), 1500)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Reset Password</h1>
        <p className="text-sm text-gray-600 mb-4">Enter your email, a new password, and confirm it.</p>
        {success ? (
          <div className="text-green-700 bg-green-50 border border-green-200 rounded p-3 text-sm">
            Password reset successful. Redirecting to login...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            {error && <div className="text-red-600 bg-red-50 border border-red-200 rounded p-2 text-sm">{error}</div>}
            <label className="block text-gray-900 text-sm">
              Email
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="mt-1 block w-full border rounded px-3 py-2"
                required
              />
            </label>
            <label className="block text-gray-900 text-sm">
              New Password
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="mt-1 block w-full border rounded px-3 py-2"
                required
                minLength={6}
              />
            </label>
            <label className="block text-gray-900 text-sm">
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full border rounded px-3 py-2"
                required
                minLength={6}
              />
            </label>
            <button type="submit" disabled={isDisabled} className="w-full bg-blue-600 text-white rounded px-3 py-2">
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
