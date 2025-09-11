'use client'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// config global
NProgress.configure({ showSpinner: false, trickleSpeed: 200 })

export function startProgress() {
  NProgress.start()
}

export function doneProgress() {
  NProgress.done()
}
