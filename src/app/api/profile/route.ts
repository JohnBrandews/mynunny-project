
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/auth'
import cloudinary from 'cloudinary'

const hasCloudinaryConfig = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
)

if (hasCloudinaryConfig) {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  })
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getUserFromToken(req)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const fullName = formData.get('fullName') as string | null
    const newServiceTerm = formData.get('newServiceTerm') as string | null
    const locationCounty = formData.get('locationCounty') as string | null
    const locationConstituency = formData.get('locationConstituency') as string | null
    const profilePicture = formData.get('profilePicture') as File | null
    const profilePictureUrlInput = formData.get('profilePictureUrl') as string | null

    let profilePictureUrl = user.profilePictureUrl || null

    // Prefer direct URL if provided (avoids server streaming issues)
    if (profilePictureUrlInput && /^https?:\/\//i.test(profilePictureUrlInput)) {
      profilePictureUrl = profilePictureUrlInput
    }

    // Otherwise handle file upload to Cloudinary with base64
    if (!profilePictureUrlInput && profilePicture) {
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (profilePicture.size > maxSize) {
        return NextResponse.json({ error: 'Image too large. Max 5MB.' }, { status: 413 })
      }

      if (!hasCloudinaryConfig) {
        return NextResponse.json({ error: 'Image upload not configured' }, { status: 500 })
      }

      try {
        const arrayBuffer = await profilePicture.arrayBuffer()
        const base64 = Buffer.from(arrayBuffer).toString('base64')
        const mime = profilePicture.type || 'image/jpeg'
        const dataUri = `data:${mime};base64,${base64}`
        const result = await cloudinary.v2.uploader.upload(dataUri, {
          folder: 'profile_pictures',
        })
        profilePictureUrl = result.secure_url
      } catch (err) {
        console.error('Cloudinary upload failed:', err)
        return NextResponse.json({ error: 'Image upload failed' }, { status: 502 })
      }
    }

    // Start with user update payload
    const userUpdate: any = {
      fullName: fullName ?? user.fullName,
      ...(profilePictureUrl !== null ? { profilePictureUrl } : {}),
    }

    // Only NUNNY can update services/location
    if (user.role === 'NUNNY') {
      if (locationCounty !== null) userUpdate.county = locationCounty
      if (locationConstituency !== null) userUpdate.constituency = locationConstituency

      if (newServiceTerm && newServiceTerm.trim()) {
        // Ensure nunny profile exists and merge services
        const nunnyProfile = await prisma.nunnyProfile.findUnique({ where: { userId: user.id } })
        const currentServices: string[] = nunnyProfile?.services ? JSON.parse(nunnyProfile.services) : []
        const normalized = newServiceTerm.trim()
        if (!currentServices.map(s => s.toLowerCase()).includes(normalized.toLowerCase())) {
          currentServices.unshift(normalized)
        }
        const servicesJson = JSON.stringify(currentServices)
        if (nunnyProfile) {
          await prisma.nunnyProfile.update({ where: { userId: user.id }, data: { services: servicesJson } })
        } else {
          await prisma.nunnyProfile.create({ data: { userId: user.id, description: '', services: servicesJson, status: 'PENDING' } })
        }
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: userUpdate,
      include: { nunnyProfile: true }
    })

    return NextResponse.json({ user: updatedUser })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}