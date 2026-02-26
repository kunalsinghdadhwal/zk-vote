import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value

  if (!token) {
    return NextResponse.redirect(new URL('/verify', request.url))
  }

  const payload = await verifyToken(token)
  if (!payload) {
    // Invalid or expired token -- clear cookie and redirect
    const response = NextResponse.redirect(new URL('/verify', request.url))
    response.cookies.delete(COOKIE_NAME)
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/vote', '/vote/:path*'],
}
