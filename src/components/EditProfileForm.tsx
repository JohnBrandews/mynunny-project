// Create src/components/EditProfileForm.tsx
'use client'
import React, { useState } from 'react'

export default function EditProfileForm({ user, token, onClose, onProfileUpdated }) {
  const [fullName, setFullName] = useState(user.fullName || '')
  const [newServiceTerm, setNewServiceTerm] = useState('')
  const [county, setCounty] = useState(user.county || '')
  const [constituency, setConstituency] = useState(user.constituency || '')
  const [profilePicture, setProfilePicture] = useState<File | null>(null)
  const [profilePictureUrl, setProfilePictureUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close if clicking outside the form
    if ((e.target as HTMLElement).dataset.overlay === 'true') {
      onClose()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const formData = new FormData()
    formData.append('fullName', fullName)
    if (user.role === 'NUNNY') {
      if (newServiceTerm.trim()) formData.append('newServiceTerm', newServiceTerm.trim())
    }
    // Allow both NUNNY and CLIENT to update location
    formData.append('locationCounty', county)
    formData.append('locationConstituency', constituency)
    if (profilePicture) formData.append('profilePicture', profilePicture)
    if (profilePictureUrl) formData.append('profilePictureUrl', profilePictureUrl)
    const res = await fetch('/api/profile', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
    setLoading(false)
    if (res.ok) {
      const data = await res.json()
      // Update localStorage with updated user data
      if (data.user) {
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
        const updatedUser = {
          ...storedUser,
          ...data.user,
          profilePictureUrl: data.user.profilePictureUrl || storedUser.profilePictureUrl,
          fullName: data.user.fullName || storedUser.fullName,
          county: data.user.county || storedUser.county,
          constituency: data.user.constituency || storedUser.constituency,
          nunnyProfile: data.user.nunnyProfile || storedUser.nunnyProfile,
          clientProfile: data.user.clientProfile || storedUser.clientProfile,
        }
        localStorage.setItem('user', JSON.stringify(updatedUser))
      }
      onProfileUpdated()
      onClose()
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data?.error || 'Failed to update profile')
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center z-50"
      data-overlay="true"
      onClick={handleOverlayClick}
    >
      <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4 text-gray-900">Edit Profile</h2>
        {error && (
          <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">{error}</div>
        )}
        <label className="block mb-2 text-gray-900">
          Full Name
          <input
            type="text"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            className="mt-1 block w-full border rounded px-2 py-1"
          />
        </label>
        {user.role === 'NUNNY' && (
          <label className="block mb-2 text-gray-900">
            Add Service (append)
            <input
              type="text"
              value={newServiceTerm}
              onChange={e => setNewServiceTerm(e.target.value)}
              placeholder="e.g., Cooking"
              className="mt-1 block w-full border rounded px-2 py-1"
            />
            <span className="text-xs text-gray-500">Existing: {user.nunnyProfile?.services ? JSON.parse(user.nunnyProfile.services).join(', ') : 'None'}</span>
          </label>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block mb-2 text-gray-900">
            County
            <input
              type="text"
              value={county}
              onChange={e => setCounty(e.target.value)}
              className="mt-1 block w-full border rounded px-2 py-1"
            />
          </label>
          <label className="block mb-2 text-gray-900">
            Constituency
            <input
              type="text"
              value={constituency}
              onChange={e => setConstituency(e.target.value)}
              className="mt-1 block w-full border rounded px-2 py-1"
            />
          </label>
        </div>
        <label className="block mb-2 text-gray-900">
          Profile Picture
          <input
            type="file"
            accept="image/*"
            onChange={e => setProfilePicture(e.target.files?.[0] || null)}
            className="mt-1 block w-full"
          />
        </label>
        <label className="block mb-2 text-gray-900">
          Or Image URL
          <input
            type="url"
            placeholder="https://..."
            value={profilePictureUrl}
            onChange={e => setProfilePictureUrl(e.target.value)}
            className="mt-1 block w-full border rounded px-2 py-1"
          />
        </label>
        {user.role === 'CLIENT' && (
          <p className="text-xs text-gray-500">As a client, you can update your profile picture, name, and location.</p>
        )}
        <div className="flex gap-2 mt-4 justify-end">
          <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}