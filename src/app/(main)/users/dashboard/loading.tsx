import { Skeleton } from '@/components/ui/skeleton'

const LoadingDashboard = () => {
  return (
    <div className="flex items-center justify-center pt-18 sm:pt-20">
      <div className="space-y-4">
        <Skeleton className="h-5 w-[300px]" />
        <Skeleton className="h-[300px] w-[300px]" />
        <div className="flex items-center justify-center gap-4">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-36" />
        </div>
      </div>
    </div>
  )
}

export default LoadingDashboard
