import { Hono } from 'hono'
import { api_auth } from './auth/index'

export const api = new Hono().basePath('/api/v1')

api.route('/', api_auth)
