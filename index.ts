import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { websocket, api } from '~routes'

const app = new Hono()

app.use(cors())

app.use(logger())

app.route('/', api)

console.log('Listening on http://localhost:4000')

const server = serve({
	fetch: app.fetch,
	port: 4000,
})

server.on('upgrade', websocket)
