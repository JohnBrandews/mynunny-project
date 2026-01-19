import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: nunnyUserId } = await params

    // Get all ratings for this nunny
    const ratings = await prisma.rating.findMany({
      where: { nunnyUserId },
      include: {
        client: {
          select: {
            id: true,
            fullName: true,
            profilePictureUrl: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Calculate average rating
    const averageRating = ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
      : 0

    return NextResponse.json({
      ratings,
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      totalRatings: ratings.length
    })

  } catch (error) {
    console.error('Error fetching ratings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
