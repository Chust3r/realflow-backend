import type { Message, Peer } from 'crossws'
import { getQueryParam } from 'hono/utils/url'
import { verify } from '~lib/jwt'
import { addConnection, removeConnection } from '~lib/store'

interface IMessage {
	timestamp: string
	event: string
	payload?: Record<string, any>
}

const createMessage = (event: string, payload?: Record<string, any>) => {
	const m: IMessage = {
		timestamp: new Date().toISOString(),
		event,
		payload,
	}

	return JSON.stringify(m)
}

export const open = async (peer: Peer) => {
	const t = getQueryParam(peer.request?.url!, 't') as string

	const token = await verify(t)

	//→ IF TOKEN IS INVALID CLOSE

	if (!token) peer.close()

	const roomId = token?.roomId as string

	peer.subscribe(roomId)

	const { connections } = await addConnection(roomId, peer.id)

	const msg = createMessage('open', {
		connections,
	})

	peer.send(msg)
	peer.publish(roomId, msg)
}

export const close = async (
	peer: Peer,
	details: { code?: number; reason?: string }
) => {
	const t = getQueryParam(peer.request?.url!, 't') as string

	const token = await verify(t)

	if (!token) peer.close()

	const roomId = token?.roomId as string

	const { connections } = await removeConnection(roomId, peer.id)

	const msg = createMessage('close', {
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
	const t = getQueryParam(peer.request?.url!, 't') as string

	const token = await verify(t)

	//→ IF TOKEN IS INVALID CLOSE

	if (!token) peer.close()

	const roomId = token?.roomId as string

	const { event, payload, timestamp } = parseMessage(message)

	//→ PROCCESS DEFINED EVENTS AS PING

	//→ PING EVENT DOES NOT NEED TO BE PUBLISHED, IT'S JUST TO CHECK IF THE CONNECTION IS ALIVE AND CALCULTE LATENCY

	if (event === 'ping') {
		const msg = createMessage('pong', {
			latency: Date.now() - new Date(timestamp).getTime(),
		})

		peer.send(msg)

		return
	}

	//→ IF EVENT IS UNKONOWN CLOSE

	if (event === 'unknown') {
		const msg = createMessage('error', {
			error: 'unknown event',
		})

		peer.publish(roomId, msg)
		peer.close()

		return
	}

	//→ IF EVENT IS NOT DEFINED IS A CUSTOM EVENT, JUST PUBLISH

	peer.send(message)
	peer.publish(roomId, message)
}
