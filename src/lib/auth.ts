import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { config } from './config'
import { prisma } from './prisma'
import { NextRequest } from 'next/server'


export interface JWTPayload {
  userId: string
  role: string
  email?: string
  username?: string
}

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 12)
}

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword)
}

export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, config.jwt.secret as string, { expiresIn: config.jwt.expiresIn })
}

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, config.jwt.secret) as JWTPayload
  } catch (error) {
    return null
  }
}

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export const getUserFromToken = async (req: NextRequest) => {
  const authHeader = req.headers.get('authorization')
  if (!authHeader) return null

  const token = authHeader.replace('Bearer ', '')
  const payload = verifyToken(token)
  if (!payload) return null

  const user = await prisma.user.findUnique({ where: { id: payload.userId } })
  return user
}
