import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'

export type AuthRequest = Request & { user?: { id: string; email: string } }

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.token
  if (!token) return res.status(401).json({ message: 'Authentication required' })
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: string; email: string }
    req.user = { id: payload.id, email: payload.email }
    next()
  } catch { return res.status(401).json({ message: 'Invalid or expired session' }) }
}
