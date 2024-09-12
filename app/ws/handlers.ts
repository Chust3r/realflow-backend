import type { Message, Peer } from 'crossws'
import { hasAcces } from '~lib/room'
import { addConnection, getRoomByClientId, removeConnection } from '~lib/store'

interface IMessage {
	timestamp: string
	event: string
	payload?: any
}

const createMessage = (event: string, payload?: any, timestamp?: string) => {
	const m: IMessage = {
		timestamp: timestamp || new Date().toISOString(),
		event,
		payload: payload,
	}

	return JSON.stringify(m)
}

export const open = async (peer: Peer) => {}

export const close = async (
	peer: Peer,
	details: { code?: number; reason?: string }
) => {
	const roomId = await getRoomByClientId(peer.id)

	console.log('close', roomId)

	if (!roomId) return

	const { connections } = await removeConnection(roomId, peer.id)

	const msg = createMessage('disconnection', {
		connections,
		details,
	})

	peer.publish(roomId, msg)
}

const parseMessage = (message: unknown) => {
	const parsed = JSON.parse(message as string)

	return {
		timestamp: parsed.timestamp || new Date().toISOString(),
		event: parsed.event ?? 'unknown',
		payload: parsed.payload ?? {},
	}
}

export const message = async (peer: Peer, message: Message) => {
	const { event, payload, timestamp } = parseMessage(message)

	//→ HANDLE EVENTS

	if (event === 'auth') {
		//→ CHECK IF HAS ACCESS
		const res = await hasAcces(payload.publicKey, payload.secretKey)

		if (!res.ok && !res.room) return peer.close()

		if (!res.ok && res.room) {
			//→ TODO: UPDATE REQUEST METRICS

			return peer.close()
		}

		//→ SUBSCRIBE TO ROOM

		peer.subscribe(res.room?.id!)

		//→ TODO: ADD CONNECTION TO STORE

		const { connections } = await addConnection(res.room?.id!, peer.id)

		const connectionMsg = createMessage('connection', {
			connections,
		})

		const authMsg = createMessage('auth', {
			ok: true,
		})

		const authorizedMessage = createMessage('authorized', {
			message: 'A new user has joined the room',
		})

		//→ SEND CONNECTION MESSAGE

		peer.send(authorizedMessage)
		peer.send(authMsg)
		peer.send(connectionMsg)

		peer.publish(res.room?.id!, authorizedMessage)
		peer.publish(res.room?.id!, connectionMsg)

		return
	}

	if (event === 'ping') {
		const latency =
			Date.now() - new Date(timestamp).getTime() ??
			'LATENCY_ERROR TIMESTAMP IS INVALID'

		const msg = createMessage('pong', {
			latency,
		})

		//→ SEND PONG MESSAGE ONLY A USER THAT EMIT THE PING

		peer.send(msg)

		return
	}

	if (event === 'unknown') {
		const roomId = await getRoomByClientId(peer.id)

		if (!roomId) return peer.close()

		const msg = createMessage('error', {
			error: 'unknown event',
		})

		peer.publish(roomId, msg)
		peer.close()

		return
	}
}
