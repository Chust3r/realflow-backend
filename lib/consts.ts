import 'dotenv/config'

export const PORT = process.env.PORT || 7000

export const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'

export const AUTH_SECRET = process.env.AUTH_SECRET || ''

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ''

export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ''
