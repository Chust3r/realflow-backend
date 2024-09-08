import { object, string, pipe, regex } from 'valibot'
import { vValidator as v } from '@hono/valibot-validator'

const authSchema = object({
	publicKey: pipe(string(), regex(/^pk_.*/, 'Invalid PK format')),
	secretKey: pipe(string(), regex(/^sk_.*/, 'Invalid SK format')),
})

export const auth = v('json', authSchema)
