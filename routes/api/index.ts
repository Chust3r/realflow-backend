import { Hono } from 'hono'

export const api = new Hono().basePath('/api')

api.get('/', (c) => c.json({ message: 'API ROUTE' }))
