import ProgressBar from '@/components/progress-bar'
import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | AniBrowse',
    default: 'AniBrowse',
  },
  description: 'A simple anime browser',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} data-scroll-behavior="smooth" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${poppins.className} overflow-x-hidden bg-gradient-to-br from-gray-950 to-gray-900 antialiased`}
      >
        <ProgressBar />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
