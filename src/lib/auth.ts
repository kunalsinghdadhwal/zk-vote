import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'zk-vote-dev-secret-change-in-production'
)

const COOKIE_NAME = 'zk-vote-verified'
const TOKEN_EXPIRY = '24h'
const SESSION_TTL_MS = 5 * 60 * 1000 // 5 minutes

export { COOKIE_NAME }

// In-memory store for verified sessions.
// Key: sessionId (from frontend), Value: timestamp when verified.
// Self Protocol calls /api/verify server-to-server, so the cookie can't be
// set on that response. Instead, we store the sessionId here and let the
// browser claim it via /api/verify/claim.
const verifiedSessions = new Map<string, number>()

export function markSessionVerified(sessionId: string) {
  verifiedSessions.set(sessionId, Date.now())
  // Prune stale entries
  for (const [key, ts] of verifiedSessions) {
    if (Date.now() - ts > SESSION_TTL_MS) verifiedSessions.delete(key)
  }
}

export function claimSession(sessionId: string): boolean {
  const ts = verifiedSessions.get(sessionId)
  if (!ts) return false
  if (Date.now() - ts > SESSION_TTL_MS) {
    verifiedSessions.delete(sessionId)
    return false
  }
  verifiedSessions.delete(sessionId) // one-time use
  return true
}

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
