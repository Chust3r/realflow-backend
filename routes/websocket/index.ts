import type { IncomingMessage } from 'node:http'
import type internal from 'node:stream'
import { channel } from './channel'

export const websocket = (
	req: IncomingMessage,
	socket: internal.Duplex,
	head: Buffer
) => {
	//→ TODO: ADD AUTH HERE

	channel.handleUpgrade(req, socket, head)
}
