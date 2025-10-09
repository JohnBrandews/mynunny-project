import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/middleware'
import { prisma } from '@/lib/prisma'

async function handler(req: any) {
  try {
    const userId = req.user?.userId
    const items = await prisma.request.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json({ requests: items })
  } catch (e) {
    console.error('Error fetching my requests', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const GET = withAuth(handler as any)
