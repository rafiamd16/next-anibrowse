import SkeletonAnimeList from '@/components/anime-list/skeleton'
import { Skeleton } from '@/components/ui/skeleton'

const LoadingAnimePopular = () => {
  return (
    <section className="container mx-auto pt-18 sm:pt-20">
      <Skeleton className="mx-auto mb-4 h-5 w-1/2 sm:w-1/4" />
      <SkeletonAnimeList />
    </section>
  )
}

export default LoadingAnimePopular
