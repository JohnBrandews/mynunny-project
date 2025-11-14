import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { email, token, newPassword, confirmPassword } = await req.json()
    if (!email || !token || !newPassword || !confirmPassword) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 })
    }
    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      // Avoid enumeration
      return NextResponse.json({ message: 'Password reset successful' })
    }

    // Find latest valid token
    const resetTokens = await prisma.passwordResetToken.findMany({
      where: { userId: user.id, used: false, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: 'desc' },
      take: 1,
    })
    const resetToken = resetTokens[0]
    if (!resetToken) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 })
    }

    const isValid = await bcrypt.compare(token, resetToken.tokenHash)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 })
    }

    const hashed = await bcrypt.hash(newPassword, 12)

    await prisma.$transaction([
      prisma.user.update({ where: { id: user.id }, data: { password: hashed } }),
      prisma.passwordResetToken.update({ where: { id: resetToken.id }, data: { used: true } }),
      prisma.passwordResetToken.deleteMany({ where: { userId: user.id, used: false, expiresAt: { lt: new Date() } } })
    ])

    return NextResponse.json({ message: 'Password reset successful' })
  } catch (e) {
    console.error('reset-password error:', e)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
