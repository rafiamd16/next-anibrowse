'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { updateComment } from '@/lib/actions/comment-action'
import { updateCommentFormSchema, UpdateCommentFormSchema } from '@/lib/validations/comment'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEdit, FaSave } from 'react-icons/fa'
import { toast } from 'sonner'

interface Props {
  commentId: string
  comment: string
  animeTitle: string
}

const EditForm = ({ commentId, comment, animeTitle }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const form = useForm<UpdateCommentFormSchema>({
    resolver: zodResolver(updateCommentFormSchema),
    defaultValues: {
      comment,
      animeTitle,
    },
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (data: UpdateCommentFormSchema) => {
    try {
      const result = await updateComment(commentId, data)
      if (result?.error) {
        return toast.error(result?.error, { richColors: true, position: 'top-right' })
      }
      toast.success(`Comment updated successfully`, {
        richColors: true,
        position: 'top-right',
      })
      setIsOpen(false)
    } catch (error) {
      console.error('Failed to update comment: ', error)
      toast.error('Failed to update comment', { richColors: true, position: 'top-right' })
    }
  }

  useEffect(() => {
    if (isOpen) {
      reset({ comment, animeTitle })
      setTimeout(() => {
        textareaRef.current?.select()
      }, 50)
    }
  }, [isOpen, reset, comment, animeTitle])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="h-full w-full">
        <div className="flex cursor-pointer items-center gap-2 font-medium text-blue-500">
          <FaEdit className="text-blue-500" />
          Edit
        </div>
        {/* <Button variant={'ghost'} className="cursor-pointer text-blue-500">
        </Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Comment</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Update your comment below. This will overwrite the old one.
        </DialogDescription>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      id="comment"
                      {...field}
                      ref={(e) => {
                        field.ref(e)
                        textareaRef.current = e
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer text-foreground transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                {isSubmitting ? (
                  <>
                    <Loader2Icon className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <FaSave className="size-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EditForm
