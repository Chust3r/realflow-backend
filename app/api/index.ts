import { Hono } from 'hono'
import { api_auth } from './auth/index'

export const api = new Hono().basePath('/api')

api.route('/', api_auth)
