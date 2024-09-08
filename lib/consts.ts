export const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export const JWT_EXPIRES = (+process.env.JWT_EXPIRES! as number) ?? 86400
