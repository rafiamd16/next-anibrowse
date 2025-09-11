'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface Props {
  title: string
  href?: string
}

const Header = ({ title, href }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-4 flex items-center justify-between gap-4"
    >
      <h1 className="text-xl font-bold md:text-2xl">{title}</h1>
      {href && (
        <Link
          href={href}
          className="text-sm font-semibold underline transition-all hover:text-primary md:text-xl"
        >
          See all
        </Link>
      )}
    </motion.div>
  )
}

export default Header
