'use client'

import { CollectionButton } from '@/components/buttons'
import { Button } from '@/components/ui/button'
import { formatSeason } from '@/lib/utils'
import { Anime } from '@/types/anime'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaStar, FaYoutube } from 'react-icons/fa6'

interface Props {
  anime: Anime
  alreadyInCollection: boolean | undefined
}

const LeftColumn = ({ anime, alreadyInCollection }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="lg:col-span-1"
    >
      <div className="card-hover overflow-hidden rounded-xl border bg-card shadow-lg">
        {/* Anime Image */}
        <div className="relative h-96">
          <Image
            src={anime.images.webp.image_url ?? 'N/A'}
            alt={anime.images.jpg.image_url ?? 'N/A'}
            width={300}
            height={300}
            priority
            className="aspect-video h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          {anime.type && (
            <div className="absolute bottom-4 left-4 rounded-full bg-primary px-3 py-1 text-sm font-medium text-foreground">
              {anime.type ?? 'N/A'}
            </div>
          )}
        </div>

        {/* Basic Info */}
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <FaStar className="mr-1 text-yellow-400" />
              <span className="text-lg font-bold">{anime.score ?? 'N/A'}</span>
              <span className="ml-2 text-gray-400">(Score)</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Rank</div>
              <div className="font-bold">#{anime.rank ?? 'N/A'}</div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Episodes:</span>
              <span className="text-right">{anime.episodes ?? 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span
                className={
                  anime.status === 'Finished Airing'
                    ? 'text-green-400'
                    : anime.status === 'Currently Airing'
                      ? 'text-blue-400'
                      : 'text-yellow-400'
                }
              >
                Status:
              </span>
              <span className="text-right text-green-400">{anime.status ?? 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Duration:</span>
              <span className="text-right">{anime.duration ?? 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Rating:</span>
              <span className="text-right">{anime.rating ?? 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Year:</span>
              <span className="text-right">{anime.year ?? 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Season:</span>
              <span className="text-right">{formatSeason(anime.season) ?? 'N/A'}</span>
            </div>
          </div>

          {/* Trailer Button */}
          <div className="mt-6 flex flex-col items-center gap-4">
            {anime.trailer.youtube_id && (
              <Button
                asChild
                className="h-11 w-full bg-red-600 font-semibold text-foreground hover:bg-red-800"
              >
                <a
                  href={`https://www.youtube.com/watch?v=${anime.trailer.youtube_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <FaYoutube className="mr-2 text-xl" /> Watch Trailer
                </a>
              </Button>
            )}
            {/* Collection Button */}
            <CollectionButton
              animeTitle={anime.titles?.[0].title ?? anime.title ?? 'N/A'}
              animeImage={anime.images.webp.image_url ?? 'https://placehold.co/300x300'}
              mal_id={anime.mal_id}
              alreadyInCollection={alreadyInCollection}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default LeftColumn
