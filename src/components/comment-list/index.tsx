'use client'

import DeleteForm from '@/components/comment-list/delete-form'
import EditForm from '@/components/comment-list/edit-form'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Comment } from '@/types/comment'
import { User } from '@/types/user'
import { LucideEllipsisVertical } from 'lucide-react'
import Image from 'next/image'

interface Props {
  comments: Comment[]
  user: User | null
}

const CommentList = ({ comments, user }: Props) => {
  return (
    <>
      <h3 className="text-sm font-semibold md:text-xl">Audience Comments</h3>
      <div className="flex flex-col gap-8">
        {comments.map((com) => (
          <div className="flex justify-between gap-4" key={com.id}>
            <div className="flex items-center gap-4">
              <div className="shrink-0 self-start overflow-hidden rounded-full border">
                <Image
                  width={48}
                  height={48}
                  src={com.user?.image ?? '/avatar.png'}
                  alt="avatar"
                  className="object-cover"
                  priority={true}
                />
              </div>
              <div>
                <h5 className="text-sm text-gray-400 md:text-base">@{com.user?.name}</h5>
                <p className="text-sm leading-relaxed text-gray-400 md:text-base">{com.comment}</p>
              </div>
            </div>
            {user?.id === com.userId && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="cursor-pointer">
                    <LucideEllipsisVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="h-10">
                    <EditForm
                      commentId={com.id}
                      comment={com.comment}
                      animeTitle={com.animeTitle}
                    />
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="h-10">
                    <DeleteForm commentId={com.id} />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default CommentList
