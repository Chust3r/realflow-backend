import type { Peer } from 'crossws'

export interface IClient {
	id: string
	channelId: string
	subscriptions: Set<string>
	peer: Peer
}

export interface IMessage {
	timestamp: string
	event: string
	data?: object | string | number
}

export interface IPublisMessage extends IMessage {
	broadcast: boolean
}
