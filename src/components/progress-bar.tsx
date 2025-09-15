'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Suspense, useEffect } from 'react'

NProgress.configure({ showSpinner: false, trickleSpeed: 500, minimum: 0.15 })

const ProgressInner = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.start()
    NProgress.done()
  }, [pathname, searchParams])

  return null
}

const ProgressBar = () => {
  return (
    <Suspense fallback={null}>
      <ProgressInner />
    </Suspense>
  )
}

export default ProgressBar
