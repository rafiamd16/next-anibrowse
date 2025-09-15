'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { deleteComment } from '@/lib/actions/comment-action'
import { Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { FaTrashAlt } from 'react-icons/fa'
import { toast } from 'sonner'

interface Props {
  commentId: string
}

const DeleteForm = ({ commentId }: Props) => {
  const form = useForm()

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const onSubmit = async () => {
    try {
      await deleteComment(commentId)
      toast.success('Comment deleted successfully', { richColors: true, position: 'top-right' })
    } catch (error) {
      console.error('Failed to delete comment', error)
      toast.error('Failed to delete comment', { richColors: true, position: 'top-right' })
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="h-full w-full">
        <div className="flex cursor-pointer items-center gap-2 font-medium text-red-500">
          <FaTrashAlt className="text-red-500" />
          Delete
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your comment and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isSubmitting}
              type="submit"
              className="cursor-pointer bg-destructive text-foreground transition-all duration-200 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              {isSubmitting ? (
                <>
                  <Loader2Icon className="animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <FaTrashAlt className="size-4" />
                  <span>Delete</span>
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteForm
