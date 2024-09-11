import { redis } from '~lib/redis'

const REDIS_EXIRATION_TIME = 60 * 30

const getConnections = async (roomId: string) => {
	return await redis.scard(`room:${roomId}:connections`)
}

export const addConnection = async (roomId: string, peerId: string) => {
	await redis.sadd(`room:${roomId}:connections`, peerId)

	//→ SET EXPIRATION TIME

	await redis.expire(`room:${roomId}:connections`, REDIS_EXIRATION_TIME)

	const connections = await getConnections(roomId)

	return {
		connections,
	}
}

export const removeConnection = async (roomId: string, peerId: string) => {
	await redis.srem(`room:${roomId}:connections`, peerId)

	const connections = await getConnections(roomId)

	if (connections === 0) {
		await redis.del(`room:${roomId}`)
	} else {
		//→ UPDATE TIME EXPIRATION
		await redis.expire(`room:${roomId}:connections`, REDIS_EXIRATION_TIME)
	}

	return {
		connections,
	}
}

export const getRoomByClientId = async (peerId: string) => {
	const rooms = await redis.keys('room:*:connections')

	for (const room of rooms) {
		const exist = await redis.sismember(room, peerId)

		if (exist) return room.split(':')[1]
	}

	return null
}
