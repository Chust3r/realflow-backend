import crossws from 'crossws/adapters/node'
import { open } from './handlers'

export const roomHandler = crossws({
	hooks: {
		upgrade: () => {},
		open,
		close: () => {},
		error: () => {},
		message: () => {},
	},
})
