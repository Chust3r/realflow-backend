import type { Peer, Message as TMessage } from 'crossws'
import type { IClient } from '~lib/types'
import qs from 'query-string'
import { Channel } from '~services/channel'
import { Message } from '~services/message'
import { ClientManagement } from '~lib/client'

class WebSocketService {
	private clients = new ClientManagement()

	async open(peer: Peer) {
		const { query } = qs.parseUrl(peer.request?.url as string)

		const channelId = (query.c as string) ?? ''
		const token = (query.t as string) ?? ''

		const { access, channel } = await Channel.getChannelAccess(
			channelId,
			token
		)

		if (!access || !channel) return peer.terminate()

		const client: IClient = {
			id: peer.id,
			channelId: channel.id,
			peer,
			subscriptions: new Set(),
		}

		this.clients.set(client)
	}

	async message(peer: Peer, message: TMessage) {
		const client = this.clients.get(peer.id)

		console.log(client)
	}

	close() {}

	error() {}
}

export const Websocket = new WebSocketService()
