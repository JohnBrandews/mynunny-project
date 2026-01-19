import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (user.role !== 'CLIENT') {
      return NextResponse.json({ error: 'Only clients can rate nunnies' }, { status: 403 })
    }

    const body = await request.json()
    const { nunnyUserId, rating, comment } = body

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }

    // Check if nunny exists and is approved
    const nunny = await prisma.user.findUnique({
      where: { id: nunnyUserId },
      include: { nunnyProfile: true }
    })

    if (!nunny || nunny.role !== 'NUNNY') {
      return NextResponse.json({ error: 'Nunny not found' }, { status: 404 })
    }

    if (nunny.nunnyProfile?.status !== 'APPROVED') {
      return NextResponse.json({ error: 'Can only rate approved nunnies' }, { status: 400 })
    }

    // Create or update rating (upsert)
    const newRating = await prisma.rating.upsert({
      where: {
        clientId_nunnyUserId: {
          clientId: user.id,
          nunnyUserId: nunnyUserId
        }
      },
      update: {
        rating: parseInt(rating),
        comment: comment || null,
        updatedAt: new Date()
      },
      create: {
        clientId: user.id,
        nunnyUserId: nunnyUserId,
        rating: parseInt(rating),
        comment: comment || null
      },
      include: {
        client: {
          select: {
            id: true,
            fullName: true,
            profilePictureUrl: true
          }
        }
      }
    })

    return NextResponse.json({ 
      message: 'Rating submitted successfully',
      rating: newRating 
    })

  } catch (error) {
    console.error('Rating submission error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
