import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/middleware'

async function handler(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const id = url.pathname.split('/').at(-2)
    if (!id) return NextResponse.json({ error: 'Request ID not found' }, { status: 400 })

    // Ensure only the owner can mark as assigned
    const requester = (req as any).user?.userId as string
    const existing = await prisma.request.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    if (existing.userId !== requester) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const updated = await prisma.request.update({
      where: { id },
      data: { status: 'ASSIGNED' },
    })

    return NextResponse.json({ request: updated })
  } catch (e) {
    console.error('Error assigning request', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const PATCH = withAuth(handler as any)
