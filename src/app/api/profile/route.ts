
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/auth'
import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function PATCH(req: NextRequest) {
  console.log('process.env:', {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
})
   console.log('Cloudinary config:', {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  try {
    const user = await getUserFromToken(req)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const fullName = formData.get('fullName') as string | null
    const profilePicture = formData.get('profilePicture') as File | null

    let profilePictureUrl = user.profilePictureUrl

    // Handle image upload to Cloudinary
    if (profilePicture) {
      const arrayBuffer = await profilePicture.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream(
          { folder: 'profile_pictures' },
          (error, result) => {
            if (error || !result) return reject(error)
            resolve(result as { secure_url: string })
          }
        ).end(buffer)
      })

      profilePictureUrl = uploadResult.secure_url
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        fullName: fullName ?? user.fullName,
        profilePictureUrl,
      },
    })

    return NextResponse.json({ user: updatedUser })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}