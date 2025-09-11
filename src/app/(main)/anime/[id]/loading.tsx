import { Skeleton } from '@/components/ui/skeleton'

const LoadingAnimeDetail = () => {
  return (
    <section className="pt-18 sm:pt-20">
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="mb-4 h-5 w-12" />
          <Skeleton className="mb-8 h-5 w-1/4" />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column Skeleton */}
          <div className="lg:col-span-1">
            <div className="overflow-hidden rounded-xl bg-card shadow-lg">
              {/* Image Skeleton */}
              <div className="relative h-96">
                <Skeleton className="h-full w-full" />
              </div>

              {/* Info Skeleton */}
              <div className="space-y-4 p-6">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-12" />
                </div>
                <div className="space-y-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                  ))}
                </div>
                <Skeleton className="mt-6 h-10 w-full rounded-lg" />
              </div>
            </div>
          </div>

          {/* Right Column Skeleton */}
          <div className="lg:col-span-2">
            <div className="space-y-6 rounded-xl bg-card p-6 shadow-lg">
              {/* Title */}
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-6 w-1/2" />

              {/* Genres */}
              <div>
                <Skeleton className="mb-2 h-6 w-24" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-6 w-16 rounded-full" />
                  ))}
                </div>
              </div>

              {/* Themes & Demographics */}
              {Array.from({ length: 2 }).map((_, sectionIdx) => (
                <div key={sectionIdx}>
                  <Skeleton className="mb-2 h-6 w-32" />
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-6 w-20 rounded-full" />
                    ))}
                  </div>
                </div>
              ))}

              {/* Synopsis */}
              <div>
                <Skeleton className="mb-2 h-6 w-32" />
                <Skeleton className="h-20 w-full" />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2 rounded-lg bg-gray-800 p-4 text-center">
                    <Skeleton className="mx-auto h-6 w-20" />
                    <Skeleton className="mx-auto h-4 w-16" />
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="space-y-4 border-t border-gray-700 pt-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i}>
                    <Skeleton className="mb-1 h-4 w-24" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoadingAnimeDetail
