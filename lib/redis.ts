import RedisClient from 'ioredis'
import { REDIS_URL } from '~consts'

export const redis = new RedisClient(REDIS_URL)

redis.on('connect', () => {
	console.log('Redis connected')
	redis.flushdb()
})

redis.on('error', () => {
	console.log('Redis connection error')
})
