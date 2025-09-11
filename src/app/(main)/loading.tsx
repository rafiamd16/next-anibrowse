import SkeletonAnimeList from '@/components/anime-list/skeleton'
import { Skeleton } from '@/components/ui/skeleton'

const LoadingAnimeHome = () => {
  return (
    <section className="container mx-auto pt-18 sm:pt-20">
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="mb-4 h-5 w-1/4" />
        <Skeleton className="mb-4 h-5 w-1/8" />
      </div>
      <SkeletonAnimeList />
    </section>
  )
}

export default LoadingAnimeHome
