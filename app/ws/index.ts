import crossws from 'crossws/adapters/node'

export const roomHandler = crossws({
	hooks: {
		upgrade: () => {},
		open: (peer) => {
			console.log('open', peer.request?.url)
		},
		close: () => {},
		error: () => {},
		message: () => {},
	},
})
