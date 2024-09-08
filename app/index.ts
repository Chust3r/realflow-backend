import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { api } from './api'
import { roomHandler } from './ws'

const app = new Hono()

app.route('/', api)

export const server = serve({
	fetch: app.fetch,
	port: 4000,
})

//→ CONFIG WS ROUTE

server.on('upgrade', (req, socket, head) => {
	if (req.url === '/rooms') roomHandler.handleUpgrade(req, socket, head)
})
