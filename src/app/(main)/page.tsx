import AnimeList from '@/components/anime-list'
import Header from '@/components/anime-list/header'
import { getAnimes, getNestedAnime, pickRandom } from '@/lib/api/anime'
import { AnimeListResponse } from '@/types/anime'

const HomePage = async () => {
  const topAnime = await getAnimes<AnimeListResponse>('top/anime', 'limit=12')
  let recommendedAnime = await getNestedAnime('recommendations/anime', 'entry')

  recommendedAnime = pickRandom(recommendedAnime, 6)

  return (
    <section className="container mx-auto space-y-4 pt-18 sm:pt-20">
      <div>
        <Header title="Most Popular" href="/popular" />
        <AnimeList animes={topAnime.data} />
      </div>

      <div>
        <Header title="Recommendation" />
        <AnimeList animes={recommendedAnime} />
      </div>
    </section>
  )
}

export default HomePage
