'use server'

import { getCurrentUser } from '@/lib/actions/user-action'
import { db } from '@/lib/db'
import {
  createCollectionFormSchema,
  CreateCollectionFormSchema,
} from '@/lib/validations/collection'
import { revalidatePath } from 'next/cache'

const isAdmin = (role?: string) => role === 'admin'
const api_url = process.env.NEXT_PUBLIC_API_URL as string

const checkOwnership = async (collectionId: string, userId: string, role?: string) => {
  const collection = await db.collection.findUnique({ where: { id: collectionId } })
  if (!collection) throw new Error('Collection not found')

  if (!isAdmin(role) && collection.userId !== userId) {
    throw new Error('Unauthorized')
  }

  return collection
}

export const createCollection = async (mal_id: number, data: CreateCollectionFormSchema) => {
  const { user } = await getCurrentUser()
  if (!user?.id) return { error: 'Unauthorized' }

  const exists = await db.collection.findUnique({
    where: { mal_id_userId: { mal_id, userId: user.id } },
  })
  if (exists) return { error: 'This anime is already in your collection.' }

  const parsed = createCollectionFormSchema.safeParse(data)
  if (!parsed.success) return { error: 'Invalid data' }

  try {
    const collection = await db.collection.create({
      data: { mal_id, userId: user.id, ...parsed.data },
    })

    revalidatePath('/users/dashboard/collection')
    return { success: collection }
  } catch (error) {
    console.error('Failed to create collection: ', error)
    return { error: 'Failed to create collection' }
  }
}

export const existsCollection = async (mal_id: number) => {
  const { user } = await getCurrentUser()
  if (!user?.id) return { error: 'Unauthorized' }

  try {
    const exists = await db.collection.findUnique({
      where: { mal_id_userId: { mal_id, userId: user.id } },
    })
    return { alreadyInCollection: !!exists }
  } catch (error) {
    console.error('Failed to check collection: ', error)
    return { error: 'Failed to check collection' }
  }
}

export const getCollections = async () => {
  const { user } = await getCurrentUser()
  if (!user?.id) return []

  const collections = isAdmin(user.role)
    ? await db.collection.findMany({ include: { user: true }, orderBy: { createdAt: 'desc' } })
    : await db.collection.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' } })

  return collections
}

export const updateCollection = async (id: string, mal_id: number) => {
  const { user } = await getCurrentUser()
  if (!user?.id) throw new Error('Unauthorized')

  await checkOwnership(id, user.id, user.role)

  try {
    const updated = await db.collection.update({
      where: { id },
      data: { mal_id },
    })

    revalidatePath('/users/dashboard/collection')
    return updated
  } catch (error) {
    console.error('Failed to update collection: ', error)
    return { error: 'Failed to update collection' }
  }
}

export const deleteCollection = async (id: string) => {
  const { user } = await getCurrentUser()
  if (!user?.id) return { error: 'Unauthorized' }

  await checkOwnership(id, user.id, user.role)

  try {
    await db.collection.delete({ where: { id } })
    revalidatePath('/users/dashboard/collection')
    return { success: 'Collection deleted' }
  } catch (error) {
    console.error('Failed to delete collection: ', error)
    return { error: 'Failed to delete collection' }
  }
}
