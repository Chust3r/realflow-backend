import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { auth } from '~lib/validators'
import { hasAcces } from '~lib/room'
import { JWT_EXPIRES, JWT_SECRET } from '~consts'

export const api_auth = new Hono().basePath('/auth')

api_auth.post('/', auth, async (c) => {
	const { publicKey, secretKey } = c.req.valid('json')

	const { ok, status, statusText, room } = await hasAcces(publicKey, secretKey)

	if (!ok) return c.json({ status, statusText }, { status })

	const token = await sign(
		{
			pk: publicKey,
			sk: secretKey,
			roomId: room?.id,
			exp: JWT_EXPIRES,
		},
		JWT_SECRET
	)

	return c.json({ token }, { status: 200 })
})
