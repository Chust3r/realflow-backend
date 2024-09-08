import { room } from '@prisma/client'
import { db } from '~db'

export type ReturnValues = {
	ok: boolean
	status: number
	statusText: string
	room?: room
}

export const hasAcces = async (
	pk: string,
	sk: string
): Promise<ReturnValues> => {
	const room = await db.room.findFirst({
		where: {
			publicKey: pk,
		},
		include: {
			secretkeys: true,
		},
	})

	if (!room)
		return {
			ok: false,
			status: 404,
			statusText: 'Room not found',
		}

	for (const item of room.secretkeys) {
		if (item.value === sk) {
			if (!item.expires || item.expires > new Date()) {
				return {
					ok: true,
					status: 200,
					statusText: 'OK',
					room,
				}
			}

			return {
				ok: false,
				status: 401,
				statusText: 'Invalid Credentials',
			}
		}
	}

	return {
		ok: false,
		status: 401,
		statusText: 'Invalid Credentials',
	}
}
