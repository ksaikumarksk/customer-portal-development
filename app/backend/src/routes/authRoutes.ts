import { Router } from 'express'
import { login, logout, me, register } from '../controllers/authController'
import { requireAuth } from '../middleware/auth'
export const authRoutes = Router()
authRoutes.post('/register', register)
authRoutes.post('/login', login)
authRoutes.post('/logout', logout)
authRoutes.get('/me', requireAuth, me)
