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
            phone: true,
            ratingsReceived: {
              select: {
                rating: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Calculate aggregate ratings for each nunny
    const nunniesWithRatings = nunnies.map(nunny => {
      const ratings = nunny.user.ratingsReceived || []
      const totalRatings = ratings.length
      const averageRating = totalRatings > 0
        ? ratings.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / totalRatings
        : 0

      // Remove the raw ratings array from the response to keep it clean
      const { ratingsReceived, ...userData } = nunny.user
      
      return {
        ...nunny,
        user: userData,
        averageRating: Math.round(averageRating * 10) / 10,
        totalRatings
      }
    })

    return NextResponse.json({ nunnies: nunniesWithRatings })

  } catch (error) {
    console.error('Error fetching nunnies:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
