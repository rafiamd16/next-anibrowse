'use client'

import { motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
}

const DashboardContainer = ({ children }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center gap-4"
    >
      {children}
    </motion.div>
  )
}

export default DashboardContainer
