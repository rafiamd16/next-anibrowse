'use client'

import { signOutCredentials } from '@/lib/actions/user-action'
import { motion } from 'framer-motion'

const SignOutPage = () => {
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    await signOutCredentials()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center overflow-hidden rounded-xl border bg-card p-8 pb-6 shadow-md">
        <h1 className="mb-4 text-2xl font-semibold">Sign Out</h1>
        <p className="mb-8 text-base leading-relaxed text-gray-400">
          Are you sure you want to sign out?
        </p>
        <button
          onClick={handleClick}
          className="h-12 w-full cursor-pointer rounded-lg bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 text-lg font-medium text-white shadow-md transition-all duration-200 hover:opacity-80 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
        >
          Sign Out
        </button>
      </div>
    </motion.div>
  )
}

export default SignOutPage
