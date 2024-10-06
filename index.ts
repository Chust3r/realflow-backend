import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { websocket } from '~routes'

const app = new Hono()

app.use(cors())

export const server = serve({
	fetch: app.fetch,
	port: 4000,
})

server.on('upgrade', websocket)
