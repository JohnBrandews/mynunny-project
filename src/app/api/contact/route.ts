import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Send contact email
    await sendContactEmail(name, email, message)

    return NextResponse.json({ message: 'Message sent successfully' })

  } catch (error) {
    console.error('Error sending contact message:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
