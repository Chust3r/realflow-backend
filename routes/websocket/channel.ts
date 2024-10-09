import crossws from 'crossws/adapters/node'
import { Websocket } from '~services/websocket'

export const channel = crossws({
	hooks: {
		open: Websocket.open.bind(Websocket),
		message: Websocket.message.bind(Websocket),
		close: Websocket.close.bind(Websocket),
		error: Websocket.error.bind(Websocket),
	},
})
