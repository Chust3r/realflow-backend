import { Hono } from 'hono'
import { auth } from '~lib/validators'

export const api_auth = new Hono().basePath('/auth')

api_auth.post('/', auth, (c) => {
	return c.text('api_auth')
})
