import { redis } from '~lib/redis'

const getConnections = async (roomId: string) => {
	return await redis.scard(`room:${roomId}:connections`)
}

export const addConnection = async (roomId: string, peerId: string) => {
	await redis.sadd(`room:${roomId}:connections`, peerId)
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
	}

	return {
		connections,
	}
}
