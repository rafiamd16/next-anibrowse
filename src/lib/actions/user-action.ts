'use server'

import { auth, signIn, signOut } from '@/auth'
import { db } from '@/lib/db'
import {
  signinFormSchema,
  SigninFormSchema,
  signupFormSchema,
  SignupFormSchema,
} from '@/lib/validations/auth-validation'
import { hash } from 'bcrypt-ts'
import { AuthError } from 'next-auth'
import { revalidatePath } from 'next/cache'

export const signUpCredentials = async (data: SignupFormSchema) => {
  const parsed = signupFormSchema.safeParse(data)
  if (!parsed.success) return null

  const { name, email, password } = parsed.data

  const emailExists = await db.user.findUnique({
    where: { email },
  })
  if (emailExists) return { error: 'Email already exists' }

  const hashedPassword = await hash(password, 10)

  try {
    await db.user.create({
      data: { name, email, hashedPassword },
    })
    revalidatePath('/signin')
  } catch (error) {
    console.error('Failed to register user: ', error)
    return { error: 'Failed to register' }
  }
}

export const signInCredentials = async (data: SigninFormSchema) => {
  const parsed = signinFormSchema.safeParse(data)

  if (!parsed.success) return null

  const { email } = parsed.data

  const user = await db.user.findUnique({
    where: { email },
  })
  if (!user || !user.hashedPassword) return { error: 'Email or Password is wrong' }
  try {
    await signIn('credentials', { ...parsed.data, redirectTo: '/users/dashboard' })
    revalidatePath('/users/dashboard')
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Email or password is wrong' }
        default:
          return { error: 'Something went wrong' }
      }
    }
    throw error
  }
}

export const signInGithub = async () => {
  await signIn('github', { redirectTo: '/users/dashboard' })
  revalidatePath('/users/dashboard')
}

export const signOutCredentials = async () => {
  await signOut({ redirectTo: '/' })
  revalidatePath('/')
}

export const getCurrentUser = async () => {
  const session = await auth()

  return { user: session?.user ?? null, isLoggedIn: !!session?.user }
}
