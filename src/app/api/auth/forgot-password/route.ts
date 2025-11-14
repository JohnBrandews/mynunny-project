import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { sendPasswordResetEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 })

    const user = await prisma.user.findUnique({ where: { email } })

    // Always respond 200 to avoid user enumeration
    const genericResponse = NextResponse.json({ message: 'If that email exists, a reset link has been sent.' })

    if (!user) return genericResponse

    // Generate token
    const token = crypto.randomBytes(32).toString('hex')
    const tokenHash = await bcrypt.hash(token, 12)
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    // Persist token
    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
      },
    })

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL || 'http://localhost:3000'
    const url = `${baseUrl}/reset-password?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`

    await sendPasswordResetEmail(email, url)

    return genericResponse
  } catch (e) {
    console.error('forgot-password error:', e)
    return NextResponse.json({ message: 'If that email exists, a reset link has been sent.' })
  }
}
