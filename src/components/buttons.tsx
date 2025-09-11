'use client'

import { Button } from '@/components/ui/button'
import { createCollection } from '@/lib/actions/collection-action'
import { signInGithub } from '@/lib/actions/user-action'
import {
  createCollectionFormSchema,
  CreateCollectionFormSchema,
} from '@/lib/validations/collection'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { FaArrowLeft, FaPlus } from 'react-icons/fa6'
import { IoLogoGithub } from 'react-icons/io5'
import { toast } from 'sonner'

export const GitHubButton = () => {
  return (
    <form action={signInGithub} className="w-full">
      <Button
        type="submit"
        variant="outline"
        className="h-11 w-full cursor-pointer font-medium shadow duration-300 ease-in-out hover:-translate-y-0.5"
      >
        <IoLogoGithub />
        Github
      </Button>
    </form>
  )
}

export const BackButton = () => {
  const { back } = useRouter()

  return (
    <motion.button
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={(e) => {
        e.preventDefault()
        back()
      }}
      type="button"
      className="flex cursor-pointer items-center justify-center gap-2 font-medium shadow"
    >
      <FaArrowLeft />
      Back
    </motion.button>
  )
}

interface CollectionButtonProps {
  mal_id: number
  animeTitle: string
  animeImage: string
  alreadyInCollection?: boolean
}
export const CollectionButton = ({
  mal_id,
  animeTitle,
  animeImage,
  alreadyInCollection,
}: CollectionButtonProps) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateCollectionFormSchema>({
    resolver: zodResolver(createCollectionFormSchema),
    defaultValues: {
      animeTitle,
      animeImage,
    },
  })

  const onSubmit = async (data: CreateCollectionFormSchema) => {
    try {
      const result = await createCollection(mal_id, data)
      if (result?.error) {
        return toast.error(result.error, { richColors: true, position: 'top-right' })
      }
      toast.success('Added to collection', { richColors: true, position: 'top-right' })
    } catch (error) {
      console.error('Failed to add to collection: ', error)
      return toast.error('Failed to add to collection', { richColors: true, position: 'top-right' })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Button
        variant={alreadyInCollection ? 'outline' : 'default'}
        type="submit"
        disabled={isSubmitting || alreadyInCollection}
        className="h-11 w-full cursor-pointer font-semibold text-foreground"
      >
        {isSubmitting ? (
          <>
            <Loader2Icon className="animate-spin" />
            <span>Please wait...</span>
          </>
        ) : alreadyInCollection ? (
          <>
            <span>Already in collection</span>
          </>
        ) : (
          <>
            <FaPlus className="size-4" />
            <span>Add to Collection</span>
          </>
        )}
      </Button>
    </form>
  )
}
