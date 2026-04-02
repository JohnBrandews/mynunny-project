import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/middleware'

async function handler(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const id = url.pathname.split('/').filter(Boolean).at(-1)
    if (!id) return NextResponse.json({ error: 'Request ID not found' }, { status: 400 })

    const requester = (req as any).user?.userId as string
    const existing = await prisma.request.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    if (existing.userId !== requester) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    await prisma.request.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Request deleted successfully' })
  } catch (e) {
    console.error('Error deleting request', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const DELETE = withAuth(handler as any)
