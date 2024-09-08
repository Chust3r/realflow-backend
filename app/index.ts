import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { api } from './api'

const app = new Hono()

app.route('/', api)

export const server = serve({
	fetch: app.fetch,
	port: 4000,
})
