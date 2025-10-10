'use server'

import { auth, signIn, signOut } from '@/auth'
import { db } from '@/lib/db'
import {
  ChangePasswordSchema,
  changePasswordSchema,
  signinFormSchema,
  SigninFormSchema,
  signupFormSchema,
  SignupFormSchema,
  userUpdateSchema,
  UserUpdateSchema,
} from '@/lib/validations/auth-validation'
import { User } from '@/types/user'
import { compare, hash } from 'bcrypt-ts'
import { AuthError } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

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

export const getUserProfile = async (): Promise<User | null> => {
  const session = await auth()
  if (!session?.user || !session.user.id) return null

  try {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    })

    return user as User | null
  } catch (error) {
    return null
  }
}

export const updateUser = async (data: UserUpdateSchema) => {
  const session = await auth()
  if (!session?.user.id) redirect('/login')

  const parsed = userUpdateSchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  const user = await db.user.findUnique({ where: { id: session.user.id } })
  if (!user) throw new Error('User not found')

  if (user.name === parsed.data.name) return { error: 'Name is the same as before' }

  try {
    await db.user.update({
      where: { id: user.id },
      data: { name: parsed.data.name },
    })
    revalidatePath('/users/profile')
    return { message: 'success' }
  } catch (error) {
    return { error: 'Failed to update user' }
  }
}

export const changePassword = async (data: ChangePasswordSchema) => {
  const session = await auth()
  if (!session?.user || !session.user.id) redirect('/login')

  const parsed = changePasswordSchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  const { oldPassword, newPassword } = parsed.data

  const user = await db.user.findUnique({ where: { id: session.user.id } })
  if (!user) return { error: 'User not found' }

  if (!user.hashedPassword) {
    return {
      error: 'This account uses Google/Github login, password cannot be changed',
    }
  }

  const isValid = await compare(oldPassword, user.hashedPassword)
  if (!isValid) return { error: 'Old password is wrong' }

  const isSamePassword = await compare(newPassword, user.hashedPassword)
  if (isSamePassword) return { error: 'New password must be different from old password' }

  const hashedPassword = await hash(newPassword, 10)

  try {
    await db.user.update({
      where: { id: user.id },
      data: { hashedPassword },
    })
    revalidatePath('/users/profile')
    return { message: 'Password changed successfully' }
  } catch (error) {
    return { error: 'Failed to change password' }
  }
}
