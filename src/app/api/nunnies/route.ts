import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Get all approved nunnies
    const nunnies = await prisma.nunnyProfile.findMany({
      where: { status: 'APPROVED' },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            county: true,
            constituency: true,
            profilePictureUrl: true,
            phone: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ nunnies })

  } catch (error) {
    console.error('Error fetching nunnies:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
