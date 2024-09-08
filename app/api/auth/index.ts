import { Hono } from 'hono'
import { sign } from '~lib/jwt'
import { auth } from '~lib/validators'
import { hasAcces } from '~lib/room'

export const api_auth = new Hono().basePath('/auth')

api_auth.post('/', auth, async (c) => {
	const { publicKey, secretKey } = c.req.valid('json')

	const { ok, status, statusText, room } = await hasAcces(publicKey, secretKey)

	if (!ok) return c.json({ status, statusText }, { status })

	const token = await sign({
		pk: publicKey,
		sk: secretKey,
		roomId: room?.id,
	})

	return c.json({ token }, { status: 200 })
})
