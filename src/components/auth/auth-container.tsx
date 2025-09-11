'use client'

import { GitHubButton } from '@/components/buttons'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Props {
  children: React.ReactNode
  title: string
  mode: 'signin' | 'signup'
}

const AuthContainer = ({ children, title, mode }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-md overflow-hidden rounded-xl border bg-gray-900 p-8 shadow-md"
    >
      <div className="">
        <div className="space-y-4">
          <h1 className="text-center text-2xl font-bold text-white">{title}</h1>
          {children}
          <div className="my-4 flex items-center before:flex-1 before:border-t before:border-gray-500 after:flex-1 after:border-t after:border-gray-500">
            <p className="mx-4 mb-0 text-center font-semibold text-gray-400">or</p>
          </div>
          <GitHubButton />
          {mode === 'signin' ? (
            <p className="text-center text-sm font-light">
              Don&apos;t have an account?{' '}
              <Link href="/signup">
                <span className="pl-1 font-semibold text-blue-600 hover:text-blue-800">
                  Sign Up
                </span>
              </Link>
            </p>
          ) : (
            <p className="text-center text-sm font-light">
              Already have an account?{' '}
              <Link href="/signin">
                <span className="pl-1 font-semibold text-blue-600 hover:text-blue-800">
                  Sign In
                </span>
              </Link>
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default AuthContainer
