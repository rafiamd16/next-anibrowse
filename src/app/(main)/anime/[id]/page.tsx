import Header from '@/components/anime-detail/header'
import LeftColumn from '@/components/anime-detail/left-column'
import RightColumn from '@/components/anime-detail/right-column'
import { BackButton } from '@/components/buttons'
import VideoPlayer from '@/components/utilities/video-player'
import { existsCollection } from '@/lib/actions/collection-action'
import { getAnimes } from '@/lib/api/anime'
import { AnimeDetailResponse } from '@/types/anime'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Anime Detail',
}

interface Props {
  params: Promise<{
    id: string
  }>
}

const AnimeDetailPage = async ({ params }: Props) => {
  const { id } = await params

  const anime = await getAnimes<AnimeDetailResponse>(`anime/${id}`)
  const { alreadyInCollection } = await existsCollection(Number(id))

  return (
    <section className="pt-18 sm:pt-20">
      <div className="mb-8 flex items-center justify-between gap-4">
        <BackButton />
        <Header title="Anime Detail" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column */}
        <LeftColumn anime={anime.data} alreadyInCollection={alreadyInCollection} />

        {/* Right Column - Details */}
        <RightColumn anime={anime.data} />
      </div>

      {/* Trailer */}
      {anime.data.trailer.youtube_id && <VideoPlayer youtubeId={anime.data.trailer.youtube_id} />}
    </section>
  )
}

export default AnimeDetailPage
