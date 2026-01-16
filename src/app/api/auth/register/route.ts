import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, generateOTP } from '@/lib/auth'
import { sendOTPEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      email, 
      password, 
      role, 
      fullName, 
      phone, 
      idNumber, 
      county, 
      constituency,
      // Nunny specific fields
      description,
      services,
      contactInfo,
      // Client specific fields
      serviceWanted,
      amountOffered
    } = body

    // Validate required fields
    if (!email || !password || !role || !fullName || !phone || !idNumber || !county || !constituency) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!['NUNNY', 'CLIENT'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Generate OTP
    const otp = generateOTP()
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000) // 2 minutes

    // Store OTP
    await prisma.oTP.create({
      data: {
        email,
        otp,
        expiresAt
      }
    })

    // Send OTP email (do not fail the whole flow if email fails)
    // Use Promise.race to ensure we don't wait too long for email
    const emailPromise = sendOTPEmail(email, otp).catch((e) => {
      console.warn('Email send failed, OTP logged in server logs. Error:', e)
      return null // Don't throw, just log
    })
    
    // Set a timeout to prevent hanging
    const timeoutPromise = new Promise((resolve) => {
      setTimeout(() => {
        console.warn('Email send timeout, continuing with registration')
        resolve(null)
      }, 8000) // 8 second timeout
    })

    // Race between email sending and timeout
    await Promise.race([emailPromise, timeoutPromise])

    // Store user data temporarily (we'll create the actual user after OTP verification)
    // For now, we'll just return success
    return NextResponse.json({ 
      message: 'OTP sent to email',
      email,
      role,
      tempData: {
        email,
        password: hashedPassword,
        role,
        fullName,
        phone,
        idNumber,
        county,
        constituency,
        description,
        services,
        contactInfo,
        serviceWanted,
        amountOffered
      }
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
