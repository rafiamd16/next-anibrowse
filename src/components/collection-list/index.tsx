'use client'

import { User } from '@/types/user'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface collectionItem {
  id: string
  mal_id: number
  userId: string
  animeTitle: string | null
  animeImage: string | null
  user?: User
  createdAt: Date
  updatedAt: Date
}

interface Props {
  collections: collectionItem[]
  user: User | null
}

const CollectionList = ({ collections, user }: Props) => {
  return !collections || collections.length < 1 ? (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-40 w-full items-center justify-center rounded-md border border-dashed border-gray-500"
    >
      <p className="text-lg font-medium text-gray-500">No collection found</p>
    </motion.div>
  ) : (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
      {collections.map((col) => (
        <Link
          key={col.id}
          href={`/anime/${col.mal_id}`}
          className="card-hover group overflow-hidden rounded-lg shadow-md"
        >
          <Image
            src={col.animeImage ?? 'https://placehold.co/300x300'}
            alt={col.animeTitle ?? 'https://placehold.co/300x300'}
            width={350}
            height={350}
            className="aspect-[2/2.6] rounded-lg object-cover transition-all group-hover:shadow-[0_0_0_3px_var(--primary)]"
            priority
          />
          <div className="py-4">
            <h3 className="text-sm font-bold transition-colors group-hover:text-primary md:text-lg">
              {col.animeTitle ?? 'N/A'}
            </h3>
            {user?.role === 'admin' && (
              <p className="mt-1 text-xs text-gray-400 md:text-sm">
                {col.user?.role !== 'admin' ? `Added by ${col.user?.name}` : 'My collection'}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default CollectionList
