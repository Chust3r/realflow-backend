import crossws from 'crossws/adapters/node'
import { websocket } from '~services/websocket'

export const channel = crossws({
	hooks: {
		open: websocket.open,
		message: websocket.message,
		close: websocket.close,
		error: websocket.error,
	},
})
