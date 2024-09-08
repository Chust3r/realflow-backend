import { Hono } from 'hono'
import { auth } from '~lib/validators'
import { hasAcces } from '~lib/room'

export const api_auth = new Hono().basePath('/auth')

api_auth.post('/', auth, async (c) => {
	const { publicKey, secretKey } = c.req.valid('json')

	const { ok, status, statusText, room } = await hasAcces(publicKey, secretKey)

	if (!ok) return c.json({ status, statusText }, { status })

	return c.text('api_auth')
})
