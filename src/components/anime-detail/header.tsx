'use client'

import { motion } from 'framer-motion'

const Header = ({ title }: { title: string }) => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-3xl font-bold text-primary"
    >
      {title}
    </motion.h1>
  )
}

export default Header
