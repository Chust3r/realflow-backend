import crossws from 'crossws/adapters/node'
import { getQueryParam } from 'hono/utils/url'

export const roomHandler = crossws({
	hooks: {
		upgrade: () => {},
		open: async (peer) => {
			const t = getQueryParam(peer.request?.url!, 't') as string
		},
		close: () => {},
		error: () => {},
		message: () => {},
	},
})
