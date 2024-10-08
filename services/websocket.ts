import type { Peer, Message } from 'crossws'
import qs from 'query-string'
import { channelService } from '~services/channel'

class WebSocketService {
	async open(client: Peer) {
		const { query } = qs.parseUrl(client.request?.url as string)

		const channelId = query.c as string
		const token = query.t as string

		const channel = await channelService.getChannelAccess(channelId, token)

		if (!channel.access || !channel.channel) return client.close()

		//→ SUSBSCRIBE TO CHANNEL

		client.subscribe(channel.channel.id)

		client.send(JSON.stringify({ channel: channel.channel }))
		client.publish(channel.channel.id, 'Hello from the other side!')

		//→ TODO: UPDATE METRICS

		//→ SAVE CLIENT IN REDIS CACHE, THIS WILL BE USED TO CLOSE CONNECTION WHEN CHANNEL IS DELETED OR CLOSE CONNECTION PROGRAMATICALLY
	}

	async message(client: Peer, message: Message) {
		console.log('message', client.id, message.text())
	}

	close() {}

	error() {}
}

export const websocket = new WebSocketService()
