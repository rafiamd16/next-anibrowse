'use client'

import { motion } from 'framer-motion'

const HeaderMenu = ({ title }: { title: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-4"
    >
      <h1 className="text-center text-xl font-bold md:text-2xl">{title}</h1>
    </motion.div>
  )
}

export default HeaderMenu
