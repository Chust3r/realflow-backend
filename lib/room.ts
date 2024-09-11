import { room } from '@prisma/client'
import { db } from '~db'

export type ReturnValues = {
	ok: boolean
	message: string
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
			message: 'Room not found',
		}

	for (const item of room.secretkeys) {
		if (item.value === sk) {
			if (!item.expires || item.expires > new Date()) {
				return {
					ok: true,
					message: 'OK',
					room,
				}
			}

			return {
				ok: false,
				message: 'Invalid Credentials',
				room,
			}
		}
	}

	return {
		ok: false,
		message: 'Invalid Credentials',
	}
}
