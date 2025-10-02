import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withRole } from '@/lib/middleware'

async function handler(req: NextRequest) {
  try {
    // Extract nunny id from the URL
    const url = new URL(req.url)
    const id = url.pathname.split('/').at(-2)

    if (!id) {
      return NextResponse.json({ error: 'Nunny ID not found' }, { status: 400 })
    }

    const nunnyProfile = await prisma.nunnyProfile.findUnique({
      where: { id },
      include: { user: true }
    })

    if (!nunnyProfile) {
      return NextResponse.json({ error: 'Nunny profile not found' }, { status: 404 })
    }

    // Update status to APPROVED
    const updatedProfile = await prisma.nunnyProfile.update({
      where: { id },
      data: { status: 'APPROVED' },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            idNumber: true,
            county: true,
            constituency: true,
            profilePictureUrl: true
          }
        }
      }
    })

    // Email notification (best effort)
    try {
      if (updatedProfile.user.email) {
        const { sendNunnyStatusEmail } = await import('@/lib/email')
        await sendNunnyStatusEmail(updatedProfile.user.email, updatedProfile.user.fullName, 'APPROVED')
      }
    } catch (e) {
      console.warn('Failed to send approval email, continuing.', e)
    }

    return NextResponse.json({
      message: 'Nunny approved successfully',
      nunny: updatedProfile
    })

  } catch (error) {
    console.error('Error approving nunny:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const PATCH = withRole(['ADMIN'])(handler)