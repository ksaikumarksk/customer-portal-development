import dotenv from 'dotenv'
import { resolve } from 'node:path'
import mongoose from 'mongoose'

dotenv.config({ path: [resolve(process.cwd(), '.env'), resolve(process.cwd(), '../../.env')] })

export const PORT = Number(process.env.PORT || 4000)
export const JWT_SECRET = process.env.JWT_SECRET || 'development-only-secret'
export const FRONTEND_ORIGIN = process.env.FRONTEND_URL || 'http://localhost:5173'
export const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING || process.env.MONGODB_URI_2 || process.env.MONGODB_URI || process.env.MONGODB_CONNECTION_STRING_3
export const CLOUDINARY_CONFIG = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME_2 || process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY_2,
  api_secret: process.env.CLOUDINARY_API_SECRET_2 || process.env.CLOUDINARY_API_SECRET,
}

export async function connectDatabase() {
  if (!MONGODB_URI) throw new Error('MongoDB connection string is not configured')
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
  return true
}
