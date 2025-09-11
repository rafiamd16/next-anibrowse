'use client'

import { Anime } from '@/types/anime'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  animes: Anime[]
}

const AnimeList = ({ animes }: Props) => {
  return !animes ? (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-40 w-full items-center justify-center rounded-md border border-dashed border-gray-500"
    >
      <p className="text-lg font-medium text-gray-500">No results found</p>
    </motion.div>
  ) : (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
    >
      {animes.map((anime, i) => (
        <Link
          href={`/anime/${anime.mal_id}`}
          key={i}
          className="card-hover group overflow-hidden rounded-lg shadow-md"
        >
          <Image
            src={anime.images.webp.image_url ?? 'https://placehold.co/300x300'}
            alt={anime.images.jpg.image_url ?? 'https://placehold.co/300x300'}
            width={350}
            height={350}
            className="aspect-[2/2.6] rounded-lg object-cover transition-all group-hover:shadow-[0_0_0_3px_var(--primary)]"
            priority
          />
          <div className="py-4">
            <h3 className="text-sm font-bold transition-colors group-hover:text-primary md:text-lg">
              {anime.titles?.[0].title ?? anime.title ?? 'No title'}
            </h3>
          </div>
        </Link>
      ))}
    </motion.div>
  )
}

export default AnimeList
