import SkeletonAnimeList from '@/components/anime-list/skeleton'
import { Skeleton } from '@/components/ui/skeleton'

const LoadingAnimeSearch = () => {
  return (
    <section className="container mx-auto pt-18 sm:pt-20">
      <Skeleton className="mb-4 h-5 w-1/3" />
      <SkeletonAnimeList />
    </section>
  )
}

export default LoadingAnimeSearch
