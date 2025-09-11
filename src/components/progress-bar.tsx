'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useEffect } from 'react'

NProgress.configure({ showSpinner: false, trickleSpeed: 500, minimum: 0.15 })

export default function ProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.start()
    NProgress.done()
  }, [pathname, searchParams])

  return null
}
