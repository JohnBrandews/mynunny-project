import { hashPassword, verifyPassword, generateOTP } from '@/lib/auth'

describe('Authentication Utilities', () => {
  test('should hash password correctly', async () => {
    const password = 'testpassword123'
    const hashedPassword = await hashPassword(password)
    
    expect(hashedPassword).toBeDefined()
    expect(hashedPassword).not.toBe(password)
    expect(hashedPassword.length).toBeGreaterThan(0)
  })

  test('should verify password correctly', async () => {
    const password = 'testpassword123'
    const hashedPassword = await hashPassword(password)
    
    const isValid = await verifyPassword(password, hashedPassword)
    const isInvalid = await verifyPassword('wrongpassword', hashedPassword)
    
    expect(isValid).toBe(true)
    expect(isInvalid).toBe(false)
  })

  test('should generate 6-digit OTP', () => {
    const otp = generateOTP()
    
    expect(otp).toBeDefined()
    expect(otp.length).toBe(6)
    expect(/^\d{6}$/.test(otp)).toBe(true)
  })

  test('should generate different OTPs', () => {
    const otp1 = generateOTP()
    const otp2 = generateOTP()
    
    expect(otp1).not.toBe(otp2)
  })
})
