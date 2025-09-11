import { db } from '@/lib/db'
import { signinFormSchema } from '@/lib/validations/auth-validation'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { compare } from 'bcrypt-ts'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/signin',
  },
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const parsed = signinFormSchema.safeParse(credentials)
        if (!parsed.success) return null

        const { email, password } = parsed.data

        try {
          const user = await db.user.findUnique({
            where: { email },
          })

          if (!user || !user.hashedPassword) throw new Error('Email or Password is wrong')

          const isPasswordValid = await compare(password, user.hashedPassword)
          if (!isPasswordValid) throw new Error('Email or Password is wrong')

          return user
        } catch (error) {
          console.error('Error authorizing user: ', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const path = nextUrl.pathname

      const protectedPaths = ['/users', '/admin', 'popular', '/anime', '/search']

      if (!isLoggedIn && protectedPaths.some((p) => path.startsWith(p)))
        return Response.redirect(new URL('/signin', nextUrl))

      if (!isLoggedIn && path.startsWith('/signout'))
        return Response.redirect(new URL('/', nextUrl))

      if (isLoggedIn && path.startsWith('/signin'))
        return Response.redirect(new URL('/users/dashboard', nextUrl))

      if (isLoggedIn && auth?.user?.role !== 'admin' && path.startsWith('/signup'))
        return Response.redirect(new URL('/users/dashboard', nextUrl))

      if (isLoggedIn && auth?.user?.role !== 'admin' && path.startsWith('/admin'))
        return Response.redirect(new URL('/users/dashboard', nextUrl))

      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.role = token.role
      }
      return session
    },
  },
})
