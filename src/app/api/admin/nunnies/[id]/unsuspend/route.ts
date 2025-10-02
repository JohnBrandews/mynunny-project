import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withRole } from '@/lib/middleware'
import { sendNunnyStatusEmail } from '@/lib/email'

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

    if (nunnyProfile.status !== 'SUSPENDED') {
      return NextResponse.json({ error: 'Nunny is not suspended' }, { status: 400 })
    }

    const updated = await prisma.nunnyProfile.update({
      where: { id },
      data: { status: 'APPROVED' },
      include: {
        user: { select: { id: true, fullName: true, email: true } }
      }
    })

    if (updated.user.email) {
      await sendNunnyStatusEmail(updated.user.email, updated.user.fullName, 'REINSTATED')
    }

    return NextResponse.json({ message: 'Nunny reinstated successfully', nunny: updated })
  } catch (error) {
    console.error('Error unsuspending nunny:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const PATCH = withRole(['ADMIN'])(handler)
