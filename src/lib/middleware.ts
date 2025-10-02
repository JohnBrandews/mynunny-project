import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './auth'

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    userId: string
    role: string
    email?: string
    username?: string
  }
}

export const withAuth = (handler: (req: AuthenticatedRequest) => Promise<NextResponse>) => {
  return async (req: NextRequest): Promise<NextResponse> => {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const authenticatedReq = req as AuthenticatedRequest
    authenticatedReq.user = decoded

    return handler(authenticatedReq)
  }
}

export const withRole = (allowedRoles: string[]) => {
  return (handler: (req: AuthenticatedRequest) => Promise<NextResponse>) => {
    return withAuth(async (req: AuthenticatedRequest) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
      }

      return handler(req)
    })
  }
}
