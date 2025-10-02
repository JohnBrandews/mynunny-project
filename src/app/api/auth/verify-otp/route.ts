import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, otp, tempData } = body

    if (!email || !otp || !tempData) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Find and validate OTP
    const otpRecord = await prisma.oTP.findFirst({
      where: {
        email,
        otp,
        expiresAt: {
          gt: new Date()
        }
      }
    })

    if (!otpRecord) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 })
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        email: tempData.email,
        password: tempData.password,
        role: tempData.role,
        fullName: tempData.fullName,
        phone: tempData.phone,
        idNumber: tempData.idNumber,
        county: tempData.county,
        constituency: tempData.constituency,
        verified: true
      }
    })

    // Create role-specific profile
    if (tempData.role === 'NUNNY') {
      await prisma.nunnyProfile.create({
        data: {
          userId: user.id,
          description: tempData.description || '',
          services: JSON.stringify(tempData.services || []),
          contactInfo: tempData.contactInfo || null,
          status: 'PENDING'
        }
      })
    } else if (tempData.role === 'CLIENT') {
      await prisma.clientProfile.create({
        data: {
          userId: user.id,
          serviceWanted: JSON.stringify(tempData.serviceWanted || []),
          amountOffered: tempData.amountOffered || null,
          contactInfo: tempData.contactInfo || null
        }
      })
    }

    // Delete used OTP
    await prisma.oTP.delete({
      where: { id: otpRecord.id }
    })

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      role: user.role,
      email: user.email || undefined
    })

    return NextResponse.json({
      message: 'Registration successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
        verified: user.verified
      }
    })

  } catch (error) {
    console.error('OTP verification error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
