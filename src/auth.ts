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
      credentials: { email: {}, password: {} },
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
    jwt({ token, user }) {
      if (user) token.role = user.role
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
