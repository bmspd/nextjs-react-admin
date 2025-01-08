import { auth } from './auth'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = await auth()
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/admin')) {
    if (!session?.user) {
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.set('x-previous-path', pathname)
      return response
    }
    if (session.user.role !== 'admin') {
      const response = NextResponse.redirect(new URL('/no-access', request.url))
      response.headers.set('x-previous-path', pathname)
      return response
    }
  }
  return NextResponse.next()
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
