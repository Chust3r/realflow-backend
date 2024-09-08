import crossws from 'crossws/adapters/node'

export const roomHandler = crossws({
	hooks: {
		upgrade: () => {},
		open: () => {},
		close: () => {},
		error: () => {},
		message: () => {},
	},
})
