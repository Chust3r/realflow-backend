import type { Peer, Message } from 'crossws'

export class WebSocketService {
	//→ OPEN CONNECTION

	open(peer: Peer) {
		console.log('open', peer.id)
	}

	//→ PROCCESS MESSAGE

	message(peer: Peer, message: Message) {
		console.log('message', peer.id, message.text())
	}

	// → CLOSE CONNECTION

	close() {}

    //→ ERROR CONNECTION

	error() {}
}
