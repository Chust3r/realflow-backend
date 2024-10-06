import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { websocket, api } from '~routes'

const app = new Hono()

app.use(cors())

app.route('/', api)

const server = serve({
	fetch: app.fetch,
	port: 4000,
})

server.on('upgrade', websocket)
