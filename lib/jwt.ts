import { SignJWT, jwtVerify } from 'jose'
import { JWT_SECRET, JWT_EXPIRES } from '~lib/consts'

const secret = new TextEncoder().encode(JWT_SECRET)

export const sign = async (payload: Record<string, any>) => {
	const jwt = new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.sign(secret)

	return jwt
}

export const verify = async (token: string) => {
	try {
		const { payload } = await jwtVerify(token, secret)
		return payload
	} catch (e) {
		return null
	}
}
