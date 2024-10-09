import type { IClient } from '~lib/types'

export class ClientManagement {
	private clients: Map<string, IClient>

	constructor() {
		this.clients = new Map()
	}

	set(client: IClient) {
		this.clients.set(client.id, client)
	}

	get(id: string) {
		return this.clients.get(id)
	}
}
