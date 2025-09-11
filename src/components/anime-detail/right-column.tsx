'use client'

import { formatDate } from '@/lib/utils'
import { Anime } from '@/types/anime'
import { motion } from 'framer-motion'

const RightColumn = ({ anime }: { anime: Anime }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="lg:col-span-2"
    >
      <div className="card-hover overflow-hidden rounded-xl border bg-card p-6 shadow-lg">
        {/* Title */}
        <h2 className="mb-2 text-3xl font-bold break-words whitespace-normal">
          {anime.titles[0].title}
        </h2>
        <h3 className="mb-6 text-xl break-words whitespace-normal text-gray-400">
          {anime.titles[0].title}-
        </h3>

        {/* Genres */}
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold">Genre</h3>
          <div className="flex flex-wrap gap-2">
            {anime.genres.length > 0 ? (
              anime.genres.map((genre) => (
                <span
                  key={genre.mal_id}
                  className="rounded-full bg-orange-900 px-3 py-1 text-sm text-orange-200"
                >
                  {genre.name}
                </span>
              ))
            ) : (
              <span className="text-gray-400">No genres available</span>
            )}
          </div>
        </div>

        {/* Themes */}
        {anime.themes.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-2 text-lg font-semibold">Themes</h3>
            <div className="flex flex-wrap gap-2">
              {anime.themes.map((theme) => (
                <span
                  key={theme.mal_id}
                  className="rounded-full bg-purple-900 px-3 py-1 text-sm text-purple-200"
                >
                  {theme.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Demographics */}
        {anime.demographics.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-2 text-lg font-semibold">Demographics</h3>
            <div className="flex flex-wrap gap-2">
              {anime.demographics.map((demographic) => (
                <span
                  key={demographic.mal_id}
                  className="rounded-full bg-pink-900 px-3 py-1 text-sm text-pink-200"
                >
                  {demographic.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Synopsis */}
        {anime.synopsis && (
          <div className="mb-6">
            <h3 className="mb-2 text-lg font-semibold">Synopsis</h3>
            <p className="leading-relaxed whitespace-pre-line text-gray-300">{anime.synopsis}</p>
          </div>
        )}

        {/* Background */}
        {anime.background && (
          <div className="mb-6">
            <h3 className="mb-2 text-lg font-semibold">Background</h3>
            <p className="leading-relaxed whitespace-pre-line text-gray-300">{anime.background}</p>
          </div>
        )}

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg bg-gray-700 p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">
              {anime.members?.toLocaleString('id-ID', {
                style: 'decimal',
                currency: 'IDR',
              }) ?? 'N/A'}
            </div>
            <div className="text-sm text-gray-400">Members</div>
          </div>
          <div className="rounded-lg bg-gray-700 p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">
              {anime.favorites?.toLocaleString('id-ID', {
                style: 'decimal',
                currency: 'IDR',
              }) ?? 'N/A'}
            </div>
            <div className="text-sm text-gray-400">Favorites</div>
          </div>
          <div className="rounded-lg bg-gray-700 p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">#{anime.popularity ?? 'N/A'}</div>
            <div className="text-sm text-gray-400">Popularity</div>
          </div>
          <div className="rounded-lg bg-gray-700 p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">{anime.score ?? 'N/A'}</div>
            <div className="text-sm text-gray-400">User Rating</div>
          </div>
        </div>

        {/* Related Info */}
        <div className="border-t border-gray-700 pt-6">
          <h3 className="mb-4 text-lg font-semibold">Additional Information</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h4 className="text-sm text-gray-400">Source</h4>
              <p>{anime.source ?? 'N/A'}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-400">Studios</h4>
              <p>
                {anime.studios.length > 0
                  ? anime.studios.map((studio) => studio.name).join(', ')
                  : 'N/A'}
              </p>
            </div>
            <div>
              <h4 className="text-sm text-gray-400">Producers</h4>
              <p>
                {anime.producers.length > 0
                  ? anime.producers.map((producer) => producer.name).join(', ')
                  : 'N/A'}
              </p>
            </div>
            <div>
              <h4 className="text-sm text-gray-400">Licensors</h4>
              <p>
                {anime.licensors.length > 0
                  ? anime.licensors.map((licensor) => licensor.name).join(', ')
                  : 'N/A'}
              </p>
            </div>
            <div>
              <h4 className="text-sm text-gray-400">Aired From</h4>
              <p>{formatDate(anime.aired.from)}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-400">Aired To</h4>
              <p>{formatDate(anime.aired.to)}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-400">Broadcast</h4>
              <p>{anime.broadcast.string ?? 'N/A'}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-400">Rated By</h4>
              <p>{anime.scored_by?.toLocaleString('id-ID') ?? 'N/A'} users</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default RightColumn
