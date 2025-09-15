'use server'

import { getCurrentUser } from '@/lib/actions/user-action'
import { db } from '@/lib/db'
import {
  commentFormSchema,
  CommentFormSchema,
  updateCommentFormSchema,
  UpdateCommentFormSchema,
} from '@/lib/validations/comment'
import { revalidatePath } from 'next/cache'

export const createComment = async (mal_id: number, data: CommentFormSchema) => {
  const { user } = await getCurrentUser()
  if (!user?.id) return { error: 'Unauthorized' }

  const parsed = commentFormSchema.safeParse(data)
  if (!parsed.success) return { error: 'Invalid data' }

  try {
    const createComment = await db.comment.create({
      data: { mal_id, userId: user.id, ...parsed.data },
    })

    revalidatePath(`/anime/${mal_id}`)
    return { success: createComment }
  } catch (error) {
    console.error('Failed to create comment: ', error)
    return { error: 'Failed to create comment' }
  }
}

export const getCommentsInPage = async () => {
  const { user } = await getCurrentUser()
  if (!user?.id) return { error: 'Unauthorized' }

  const where = user.role === 'admin' ? {} : { userId: user.id }

  try {
    return await db.comment.findMany({
      where,
      include: { user: { select: { id: true, name: true, email: true, role: true, image: true } } },
    })
  } catch (error) {
    console.error('Failed to get comments: ', error)
    return { error: 'Failed to get comments' }
  }
}

export const getComments = async (mal_id: number) => {
  const { user } = await getCurrentUser()
  if (!user?.id) return { error: 'Unauthorized' }

  try {
    return await db.comment.findMany({
      where: { mal_id },
      include: {
        user: {
          select: { id: true, name: true, email: true, role: true, image: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('Failed to get comments: ', error)
    return { error: 'Failed to get comments' }
  }
}

export const updateComment = async (id: string, data: UpdateCommentFormSchema) => {
  const { user } = await getCurrentUser()
  if (!user?.id) return { error: 'Unauthorized' }

  const parsed = updateCommentFormSchema.safeParse(data)
  if (!parsed.success) return { error: 'Invalid data' }

  const comment = await db.comment.findUnique({ where: { id } })
  if (!comment) return { error: 'Comment not found' }

  if (parsed.data.comment === comment.comment) return { error: 'No changes made to the comment' }

  const where = user.role === 'admin' ? { id } : { id, userId: user.id }

  try {
    const updateComment = await db.comment.update({
      where,
      data: parsed.data,
    })
    if (comment.mal_id) {
      revalidatePath(`/anime/${comment.mal_id}`)
    }
    return { success: updateComment, message: 'Comment updated successfully' }
  } catch (error) {
    console.error('Failed to update comment: ', error)
    return { error: 'Failed to update comment' }
  }
}

export const deleteComment = async (id: string) => {
  const { user } = await getCurrentUser()
  if (!user?.id) return { error: 'Unauthorized' }

  const comment = await db.comment.findUnique({ where: { id } })
  if (!comment) return { error: 'Comment not found' }

  const where = user.role === 'admin' ? { id } : { id, userId: user.id }

  try {
    await db.comment.delete({ where })
    if (comment.mal_id) {
      revalidatePath(`/anime/${comment.mal_id}`)
    }
    return { success: true, message: 'Comment deleted successfully' }
  } catch (error) {
    console.error('Failed to delete comment: ', error)
    return { error: 'Failed to delete comment' }
  }
}
