'use client'

import SearchInput from '@/components/navbar/search-input'
import { Button } from '@/components/ui/button'
import UserButton from '@/components/user-profile/user-button'
import { User } from '@/types/user'
import { Search, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface Props {
  user: User
  isLoggedIn: boolean
}

const Navbar = ({ user, isLoggedIn }: Props) => {
  const [isScroll, setIsScroll] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (e: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(e.target as Node)) setIsOpen(false)
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (scrollY > 20) setIsScroll(true)
      else setIsScroll(false)
    })
  }, [])

  if (!isMounted) return null

  return (
    <div className="relative">
      <header
        className={`fixed top-0 left-0 z-50 w-full py-3 ${isScroll ? 'bg-card/80 shadow-sm shadow-foreground/10 backdrop-blur-lg' : ''}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-lg font-bold">
              Ani<span className="text-primary">Browse</span>
            </Link>

            <div className="hidden items-center md:flex">
              <SearchInput />
            </div>

            {/* Mobile Search */}
            <div
              ref={searchRef}
              className={`absolute top-full right-0 left-0 w-full max-w-full origin-top scale-y-0 bg-card py-4 shadow-sm transition-transform duration-200 md:hidden ${isOpen ? 'scale-y-100' : 'bg-card'}`}
            >
              <div className="container mx-auto px-4">
                <SearchInput isOpen={isOpen} onSearchSuccess={() => setIsOpen(false)} />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/" className="hidden transition-colors hover:text-primary md:block">
                Home
              </Link>
              <Button size="sm" className="hidden items-center text-foreground md:flex" asChild>
                <Link href="/users/dashboard">Dashboard</Link>
              </Button>
              <div
                onClick={() => setIsOpen((prev) => !prev)}
                className="block cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 md:hidden"
              >
                {isOpen ? <X size={18} /> : <Search size={18} />}
              </div>

              <UserButton user={user} isLoggedIn={isLoggedIn} />
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar
