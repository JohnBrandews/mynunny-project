import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/auth'

async function handler(req: NextRequest) {
  try {
    if (req.method === 'GET') {
      // Get all active requests
      const requests = await prisma.request.findMany({
        where: { isActive: true },
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
              phone: true,
              county: true,
              constituency: true,
              profilePictureUrl: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      })

      return NextResponse.json({ requests })
    }

    if (req.method === 'POST') {
      const user = await getUserFromToken(req)
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const body = await req.json()
      const { service, amount, location, description, email, phone } = body

      // Save all fields, including email and phone
      const newRequest = await prisma.request.create({
        data: {
          service,
          amount: parseFloat(amount),
          location,
          description,
          email,
          phone,
          userId: user.id, // or however you link the client
        },
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
              phone: true,
              county: true,
              constituency: true,
              profilePictureUrl: true
            }
          }
        }
      })

      return NextResponse.json({ request: newRequest })
    }

    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })

  } catch (error) {
    console.error('Error handling requests:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const GET = handler
export const POST = handler
