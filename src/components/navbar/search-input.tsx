'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { toast } from 'sonner'

interface Props {
  isOpen?: boolean
  onSearchSuccess?: () => void
}

const SearchInput = ({ isOpen, onSearchSuccess }: Props) => {
  const searchRef = useRef<HTMLInputElement>(null)
  const { push } = useRouter()

  if (isOpen) searchRef.current?.focus()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const keyword = searchRef.current?.value.trim().toLowerCase()

    if (!keyword) {
      toast.error('Please enter a keyword', { richColors: true, position: 'top-right' })
      return
    }

    push(`/search/${encodeURIComponent(keyword)}`)
    onSearchSuccess?.()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <form onSubmit={handleSearch}>
      <div className="relative">
        <Input ref={searchRef} type="search" placeholder="Search anime..." className="h-10 pr-8" />
        <button type="submit" className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer">
          <Search size={16} />
        </button>
      </div>
    </form>
  )
}

export default SearchInput
