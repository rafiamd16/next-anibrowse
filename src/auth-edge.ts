import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {},
      authorize: async () => null,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const path = nextUrl.pathname

      const protectedPaths = ['/users', '/admin', '/popular', '/anime', '/search']

      if (!isLoggedIn && protectedPaths.some((p) => path.startsWith(p))) {
        return Response.redirect(new URL('/signin', nextUrl))
      }

      if (!isLoggedIn && path.startsWith('/signout')) {
        return Response.redirect(new URL('/', nextUrl))
      }

      if (isLoggedIn && path.startsWith('/signin')) {
        return Response.redirect(new URL('/users/dashboard', nextUrl))
      }

      if (isLoggedIn && auth?.user?.role !== 'admin' && path.startsWith('/signup')) {
        return Response.redirect(new URL('/users/dashboard', nextUrl))
      }

      if (isLoggedIn && auth?.user?.role !== 'admin' && path.startsWith('/admin')) {
        return Response.redirect(new URL('/users/dashboard', nextUrl))
      }

      return true
    },
  },
})
