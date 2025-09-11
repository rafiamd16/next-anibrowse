'use client'

import { Skeleton } from '@/components/ui/skeleton'

interface LoadingAnimeListProps {
  count?: number
}

const SkeletonAnimeList = ({ count = 12 }: LoadingAnimeListProps) => {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          <Skeleton className="aspect-[2/2.6]" />
          <div className="space-y-2 p-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkeletonAnimeList
