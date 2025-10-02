import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withRole } from '@/lib/middleware'

async function handler(req: NextRequest) {
  try {
    const nunnies = await prisma.nunnyProfile.findMany({
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
            profilePictureUrl: true,
            createdAt: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ nunnies })

  } catch (error) {
    console.error('Error fetching nunnies:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const GET = withRole(['ADMIN'])(handler)
