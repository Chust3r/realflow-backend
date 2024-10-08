import type { Channel, ChannelAPIToken } from '@prisma/client'
import { db } from '~db'

type ChannelWithAPITokens = Channel & {
	API_tokens: ChannelAPIToken[]
}

interface IChannelService {
	getChannel(id: string): Promise<Channel | null>
	getChannelAccess(
		id: string,
		token: string
	): Promise<{
		channel: ChannelWithAPITokens | null
		access: boolean
	}>
}

class ChannelService implements IChannelService {
	//→ GET A SINGLE CHANNEL

	async getChannel(id: string) {
		const channel = await db.channel.findUnique({
			where: {
				id,
			},
		})

		return channel
	}

	//→ GET A CHANNEL & VERIFY HAS ACCESS

	async getChannelAccess(id: string, token: string) {
		const channel = await db.channel.findUnique({
			where: { id },
			include: { API_tokens: true },
		})

		if (!channel) return { channel: null, access: false }

		const now = new Date()

		const hasAccess = channel.API_tokens.some(({ value, expires }) => {
			if (value !== token) return false
			return !expires || expires > now
		})

		return {
			channel,
			access: hasAccess,
		}
	}
}

export const channelService = new ChannelService()
