import 'dotenv/config'

export const PORT = process.env.PORT || 7000

export const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'
