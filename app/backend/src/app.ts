import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'
import { FRONTEND_ORIGIN } from './config'
import { openapi } from './config/openapi'
import { authRoutes } from './routes/authRoutes'
import { fileRoutes } from './routes/fileRoutes'
import { errorHandler } from './middleware/errorHandler'

export const app = express()
app.use(helmet())
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'multimedia-manager' }))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapi))
app.use('/api/auth', authRoutes)
app.use('/api/files', fileRoutes)
app.use(errorHandler)
