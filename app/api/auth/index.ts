import { Hono } from 'hono'

export const api_auth = new Hono().basePath('/auth')

api_auth.post('/', (c) => {
	return c.text('api_auth')
})
