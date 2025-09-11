'use client'

import { BackButton } from '@/components/buttons'
import { motion } from 'framer-motion'

interface Props {
  title: string
}

const Header = ({ title }: Props) => {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <BackButton />
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-bold md:text-2xl"
      >
        {title}
      </motion.h1>
    </div>
  )
}

export default Header
