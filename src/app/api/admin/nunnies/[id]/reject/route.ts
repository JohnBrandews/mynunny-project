import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withRole } from '@/lib/middleware'

async function handler(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const id = url.pathname.split('/').at(-2)

    if (!id) {
      return NextResponse.json({ error: 'Nunny ID not found' }, { status: 400 })
    }

    const nunnyProfile = await prisma.nunnyProfile.findUnique({ where: { id }, include: { user: true } })
    if (!nunnyProfile) {
      return NextResponse.json({ error: 'Nunny profile not found' }, { status: 404 })
    }

    const updated = await prisma.nunnyProfile.update({
      where: { id },
      data: { status: 'REJECTED' },
      include: {
        user: { select: { id: true, fullName: true, email: true } }
      }
    })

    // Email notification (best effort)
    try {
      if (updated.user.email) {
        const { sendNunnyStatusEmail } = await import('@/lib/email')
        await sendNunnyStatusEmail(updated.user.email, updated.user.fullName, 'REJECTED')
      }
    } catch (e) {
      console.warn('Failed to send rejection email, continuing.', e)
    }

    return NextResponse.json({ message: 'Nunny rejected successfully', nunny: updated })
  } catch (error) {
    console.error('Error rejecting nunny:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const PATCH = withRole(['ADMIN'])(handler)