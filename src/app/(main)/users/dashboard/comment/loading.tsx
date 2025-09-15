import { Skeleton } from '@/components/ui/skeleton'

const LoadingComment = () => {
  return (
    <section className="container mx-auto pt-18 sm:pt-20">
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="mb-4 h-5 w-15" />
        <Skeleton className="mb-4 h-5 w-1/4" />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="p-4 sm:p-8">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-5 w-1/3" />
          </Skeleton>
        ))}
      </div>
    </section>
  )
}

export default LoadingComment
