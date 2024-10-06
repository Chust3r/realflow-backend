import type { IncomingMessage } from 'node:http'
import type internal from 'node:stream'

export const websocket = (
	req: IncomingMessage,
	socket: internal.Duplex,
	head: Buffer
) => {}
