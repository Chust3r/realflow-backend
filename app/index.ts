import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { matcher } from '~lib/utils'
import { roomHandler } from './ws'

const app = new Hono()

app.use(
	cors({
		origin: '*',
		allowMethods: ['GET', 'POST'],
	})
)

export const server = serve({
	fetch: app.fetch,
	port: 4000,
})

//→ CONFIG WS ROUTE

server.on('upgrade', (req, socket, head) => {
	if (matcher('/rooms', req.url))
		return roomHandler.handleUpgrade(req, socket, head)
	return socket.destroy()
})
