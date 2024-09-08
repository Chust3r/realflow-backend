import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
	return c.text('HONO server')
})

export const server = serve({
	fetch: app.fetch,
	port: 4000,
})
