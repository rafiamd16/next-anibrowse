'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { createComment } from '@/lib/actions/comment-action'
import { commentFormSchema, CommentFormSchema } from '@/lib/validations/comment'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { FaCommentAlt } from 'react-icons/fa'
import { toast } from 'sonner'

interface Props {
  mal_id: number
  animeTitle: string
}

const CommentInput = ({ mal_id, animeTitle }: Props) => {
  const form = useForm<CommentFormSchema>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      comment: '',
      animeTitle,
    },
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (data: CommentFormSchema) => {
    try {
      await createComment(mal_id, data)
      toast.success('Posted', { richColors: true, position: 'top-right' })
      reset()
    } catch (error) {
      console.error('Failed to add comment: ', error)
      toast.error('Failed to add comment', { richColors: true, position: 'top-center' })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    disabled={isSubmitting}
                    placeholder="Add a comment..."
                    id="comment"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isSubmitting}
            type="submit"
            variant={'default'}
            className="h-10 cursor-pointer text-foreground"
          >
            {isSubmitting ? (
              <>
                <Loader2Icon className="animate-spin" />
                <span>Posted...</span>
              </>
            ) : (
              <>
                <FaCommentAlt className="size-4" />
                <span>Post a comment</span>
              </>
            )}
          </Button>
        </form>
      </Form>
    </motion.div>
  )
}

export default CommentInput
