'use client'

import React, { useState } from 'react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      setSent(true)
    } catch (e: any) {
      setError('Failed to send reset link. Try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Forgot Password</h1>
        <p className="text-sm text-gray-600 mb-4">Enter your email and we'll send you a password reset link.</p>
        {sent ? (
          <div className="text-green-700 bg-green-50 border border-green-200 rounded p-3 text-sm">
            If that email exists, a reset link has been sent. Please check your inbox.
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
            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white rounded px-3 py-2">
              {loading ? 'Sending...' : 'Send reset link'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
