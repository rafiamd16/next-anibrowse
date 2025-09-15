import CommentContainer from '@/components/comment-list/comment-container'
import Header from '@/components/dashboard/header'
import { getCommentsInPage } from '@/lib/actions/comment-action'
import { getCurrentUser } from '@/lib/actions/user-action'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'My Comments',
}

const CommentPage = async () => {
  const { user } = await getCurrentUser()
  const comments = await getCommentsInPage()

  return !comments || 'error' in comments || comments.length < 1 ? (
    <section className="pt-18 sm:pt-20">
      <Header title="My Comments" />
      <CommentContainer>
        <div className="flex h-40 w-full items-center justify-center rounded-md border border-dashed border-gray-500">
          <p className="text-lg font-medium text-gray-500">No comment found</p>
        </div>
      </CommentContainer>
    </section>
  ) : (
    <section className="pt-18 sm:pt-20">
      <Header title="My Comments" />
      <CommentContainer>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {comments.map((com) => (
            <Link
              href={`/anime/${com.mal_id}`}
              key={com.id}
              className="card-hover overflow-hidden rounded-xl border bg-card-foreground p-4 sm:p-6"
            >
              <p className="text-sm text-gray-500">{com.animeTitle}</p>
              <p className="text-base leading-relaxed text-gray-800 italic">{com.comment}</p>
              {user?.role === 'admin' && (
                <p className="mt-6 text-xs text-gray-500">
                  {com.user.role !== 'admin' ? `Comment from ${com.user.name}` : 'My comment'}
                </p>
              )}
            </Link>
          ))}
        </div>
      </CommentContainer>
    </section>
  )
}

export default CommentPage
