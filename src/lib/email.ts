import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

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

  try {
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: toEmail,
      subject: subjectMap[status],
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #FAF8F3; border: 1px solid #eee; padding: 24px;">
          <h2 style="color: #334155;">${headingMap[status]}</h2>
          <p style="color: #334155;">Hi ${fullName.split(' ')[0]},</p>
          <p style="color: #334155; line-height: 1.6;">${messageMap[status]}</p>
          <div style="margin: 16px 0; padding: 12px 16px; background: rgba(45, 212, 191, 0.12); color: #334155; border: 1px solid rgba(51,65,85,0.15); border-radius: 12px;">
            <strong>Status:</strong> ${status}
          </div>
          <p style="color: #334155;">Best regards,<br/>MyNunny Team</p>
        </div>
      `,
    })
  } catch (e) {
    console.warn('sendNunnyStatusEmail failed, continuing. Error:', e)
  }
}

export const sendPasswordResetEmail = async (email: string, link: string): Promise<void> => {
  try {
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Reset your MyNunny password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password reset request</h2>
          <p>We received a request to reset your password. Click the button below to proceed. This link will expire in 1 hour.</p>
          <p style="margin: 24px 0;"><a href="${link}" style="background:#2563EB;color:#fff;padding:12px 16px;border-radius:8px;text-decoration:none;">Reset password</a></p>
          <p>If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    })
  } catch (e) {
    console.warn('sendPasswordResetEmail failed:', e)
  }
}

export const sendOTPEmail = async (email: string, otp: string): Promise<void> => {
  try {
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'MyNunny - Email Verification OTP',
      html: `
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
      `,
    })
  } catch (e) {
    console.warn('sendOTPEmail failed, continuing registration. Error:', e)
  }
}

// Add this function:
export const sendContactEmail = async (name: string, email: string, message: string): Promise<void> => {
  try {
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: 'brandewsj@gmail.com', // your email to receive contact messages
      subject: `Contact Form Message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })
  } catch (e) {
    console.error('sendContactEmail failed:', e)
    throw e
  }
}