import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'zk-vote-dev-secret-change-in-production'
)

const COOKIE_NAME = 'zk-vote-verified'
const TOKEN_EXPIRY = '24h'

export { COOKIE_NAME }

export async function createVerificationToken(uuid: string): Promise<string> {
  return new SignJWT({ sub: uuid, verified: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET)
}

export async function verifyToken(
  token: string,
): Promise<{ sub: string; verified: boolean } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    if (payload.verified && payload.sub) {
      return { sub: payload.sub, verified: true }
    }
    return null
  } catch {
    return null
  }
}
