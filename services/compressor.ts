import { deflate, inflate } from 'pako'

interface ICompressor {
	encode: (data: string) => Uint8Array
	decode: (data: Uint8Array) => string
}

export class PakoCompressor implements ICompressor {
	public encode(data: string): Uint8Array {
		return deflate(data)
	}

	public decode(data: Uint8Array): string {
		return inflate(data, {
			to: 'string',
		})
	}
}

export const compressor = new PakoCompressor()
