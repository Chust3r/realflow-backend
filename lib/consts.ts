export const JWT_SECRET = process.env.JWT_SECRET! || 'secret'

export const JWT_EXPIRES = (+process.env.JWT_EXPIRES! as number) ?? 86400

export const REDIS_URL = process.env.REDIS_URL! || 'redis://localhost:6379'
