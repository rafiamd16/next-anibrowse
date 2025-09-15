import { z } from 'zod'

export const commentFormSchema = z.object({
  comment: z
    .string()
    .trim()
    .min(3, 'Comment must be at least 3 characters')
    .max(500, 'Comment must be at most 500 characters'),
  animeTitle: z.string().trim(),
})
export type CommentFormSchema = z.infer<typeof commentFormSchema>

export const updateCommentFormSchema = commentFormSchema.partial()

export type UpdateCommentFormSchema = z.infer<typeof updateCommentFormSchema>
