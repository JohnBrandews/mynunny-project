import axios from 'axios'

// Brevo API configuration
const BREVO_API_KEY = process.env.BREVO_API_KEY || process.env.SMTP_PASS // Fallback to SMTP_PASS for backward compatibility
const BREVO_API_URL = 'https://api.brevo.com/v3'
const SENDER_EMAIL = process.env.SENDER_EMAIL || process.env.SMTP_FROM || 'noreply@mynunny.com'
const SENDER_NAME = process.env.SENDER_NAME || 'MyNunny'

// Helper function to send email via Brevo API
const sendEmailViaBrevo = async (
  to: string,
  subject: string,
  htmlContent: string,
  textContent?: string
): Promise<void> => {
  if (!BREVO_API_KEY) {
    throw new Error('BREVO_API_KEY is not configured')
  }

  try {
    const response = await axios.post(
      `${BREVO_API_URL}/smtp/email`,
      {
        sender: {
          name: SENDER_NAME,
          email: SENDER_EMAIL,
        },
        to: [{ email: to }],
        subject,
        htmlContent,
        textContent: textContent || subject,
      },
      {
        headers: {
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      }
    )

    if (response.status !== 201 && response.status !== 200) {
      throw new Error(`Brevo API returned status ${response.status}`)
    }
  } catch (error: any) {
    if (error.response) {
      // Brevo API error response
      throw new Error(`Brevo API error: ${error.response.data?.message || error.response.statusText}`)
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Brevo API request timeout - no response received')
    } else {
      // Error in request setup
      throw new Error(`Brevo API error: ${error.message}`)
    }
  }
}

export const sendNunnyStatusEmail = async (
  toEmail: string,
  fullName: string,
  status: 'APPROVED' | 'REJECTED' | 'SUSPENDED' | 'REINSTATED'
): Promise<void> => {
  const subjectMap = {
    APPROVED: 'Your MyNunny account has been approved',
    REJECTED: 'Your MyNunny account has been rejected',
    SUSPENDED: 'Your MyNunny account has been suspended',
    REINSTATED: 'Your MyNunny account has been reinstated',
  } as const

  const headingMap = {
    APPROVED: 'Congratulations! You are approved',
    REJECTED: 'Application update',
    SUSPENDED: 'Account Suspended',
    REINSTATED: 'Welcome back! Your account is reinstated',
  } as const

  const messageMap = {
    APPROVED: `Your nunny profile has been approved. You can now access client requests and start engaging.`,
    REJECTED: `We appreciate your interest. Unfortunately, your nunny profile has been rejected at this time.`,
    SUSPENDED: `Your nunny account has been suspended due to a policy violation. If you believe this is an error, please contact support.`,
    REINSTATED: `you account has been reinstated you can come back and continue with your application good luck`,
  } as const

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #FAF8F3; border: 1px solid #eee; padding: 24px;">
      <h2 style="color: #334155;">${headingMap[status]}</h2>
      <p style="color: #334155;">Hi ${fullName.split(' ')[0]},</p>
      <p style="color: #334155; line-height: 1.6;">${messageMap[status]}</p>
      <div style="margin: 16px 0; padding: 12px 16px; background: rgba(45, 212, 191, 0.12); color: #334155; border: 1px solid rgba(51,65,85,0.15); border-radius: 12px;">
        <strong>Status:</strong> ${status}
      </div>
      <p style="color: #334155;">Best regards,<br/>MyNunny Team</p>
    </div>
  `

  try {
    await sendEmailViaBrevo(toEmail, subjectMap[status], htmlContent)
  } catch (e) {
    console.warn('sendNunnyStatusEmail failed, continuing. Error:', e)
  }
}

export const sendPasswordResetEmail = async (email: string, link: string): Promise<void> => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Password reset request</h2>
      <p>We received a request to reset your password. Click the button below to proceed. This link will expire in 1 hour.</p>
      <p style="margin: 24px 0;"><a href="${link}" style="background:#2563EB;color:#fff;padding:12px 16px;border-radius:8px;text-decoration:none;">Reset password</a></p>
      <p>If you didn't request this, you can safely ignore this email.</p>
    </div>
  `

  try {
    await sendEmailViaBrevo(email, 'Reset your MyNunny password', htmlContent)
  } catch (e) {
    console.warn('sendPasswordResetEmail failed:', e)
  }
}

export const sendOTPEmail = async (email: string, otp: string): Promise<void> => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Email Verification</h2>
      <p>Hello,</p>
      <p>Thank you for registering with MyNunny. Please use the following OTP to verify your email address:</p>
      <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
        <h1 style="color: #007bff; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
      </div>
      <p>This OTP will expire in 2 minutes.</p>
      <p>If you didn't request this verification, please ignore this email.</p>
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
      <p style="color: #666; font-size: 12px;">MyNunny - Connecting clients with reliable nannies</p>
    </div>
  `

  const textContent = `MyNunny Email Verification\n\nYour OTP is: ${otp}\n\nThis OTP will expire in 2 minutes.`

  try {
    await sendEmailViaBrevo(email, 'MyNunny - Email Verification OTP', htmlContent, textContent)
  } catch (e) {
    console.warn('sendOTPEmail failed, continuing registration. Error:', e)
    // Don't re-throw - allow registration to continue even if email fails
    // OTP is still stored in database and can be verified
  }
}

// Add this function:
export const sendContactEmail = async (name: string, email: string, message: string): Promise<void> => {
  const htmlContent = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `

  const textContent = `Contact Form Message\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`

  try {
    await sendEmailViaBrevo(
      'brandewsj@gmail.com', // your email to receive contact messages
      `Contact Form Message from ${name}`,
      htmlContent,
      textContent
    )
  } catch (e) {
    console.error('sendContactEmail failed:', e)
    throw e
  }
}