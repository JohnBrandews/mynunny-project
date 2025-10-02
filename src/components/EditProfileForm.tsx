// Create src/components/EditProfileForm.tsx
'use client'
import React, { useState } from 'react'

export default function EditProfileForm({ user, token, onClose, onProfileUpdated }) {
  const [fullName, setFullName] = useState(user.fullName)
  const [profilePicture, setProfilePicture] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append('fullName', fullName)
    if (profilePicture) formData.append('profilePicture', profilePicture)
 console.log('JWT token:', token)
    const res = await fetch('/api/profile', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
    setLoading(false)
    if (res.ok) {
      onProfileUpdated()
      onClose()
    } else {
      alert('Failed to update profile')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form className="bg-white p-6 rounded shadow w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <label className="block mb-2">
          Full Name
          <input
            type="text"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            className="mt-1 block w-full border rounded px-2 py-1"
          />
        </label>
        <label className="block mb-2">
          Profile Picture
          <input
            type="file"
            accept="image/*"
            onChange={e => setProfilePicture(e.target.files?.[0] || null)}
            className="mt-1 block w-full"
          />
        </label>
        <div className="flex gap-2 mt-4">
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  )
}