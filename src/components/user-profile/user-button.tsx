'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import UserAvatar from '@/components/user-profile/user-avatar'
import { cn } from '@/lib/utils'
import { User } from '@/types/user'
import { Home, LayoutDashboard, LogIn, LogOut, UserCircle, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface Props {
  user: User | null
  className?: string
  isLoggedIn: boolean
}

const UserButton = ({ className, user, isLoggedIn }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const linkHover =
    'relative cursor-pointer transition-all duration-300 after:absolute after:top-1/2 after:right-2 after:h-[2px] after:w-5 after:origin-center after:-translate-y-1/2 after:scale-x-0 after:rotate-90 after:rounded after:bg-primary after:transition-transform after:duration-300'

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(user?.email || '')
    setIsOpen(false)
    toast.success('Copied to clipboard', { richColors: true, position: 'top-center' })
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'flex-none cursor-pointer rounded-full focus:ring-0 focus:outline-none',
            className
          )}
        >
          <UserAvatar
            isOpen={isOpen}
            setIsOpen={handleToggle}
            avatarUrl={user?.image ?? '/avatar.png'}
            className="size-8 lg:size-10"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-48">
        <DropdownMenuLabel>
          {isLoggedIn ? (
            <span>
              Signed in as <span className="font-semibold">{user?.name}</span>
            </span>
          ) : (
            <span className="text-xs font-semibold">Not signed in</span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isLoggedIn && (
          <DropdownMenuItem onClick={handleCopy} className="text-neutral-400">
            <UserCircle className="size-4" />
            {user?.email}
          </DropdownMenuItem>
        )}
        <Link href="/" className="block md:hidden">
          <DropdownMenuItem
            className={`${linkHover} ${
              pathname === '/'
                ? 'font-bold text-primary after:scale-x-100'
                : 'hover:text-primary hover:after:scale-x-100'
            } `}
          >
            <Home className="size-4" />
            Home
          </DropdownMenuItem>
        </Link>
        <Link href="/users/dashboard" className="block md:hidden">
          <DropdownMenuItem
            className={`${linkHover} ${
              pathname === '/users/dashboard'
                ? 'font-bold text-primary after:scale-x-100'
                : 'hover:text-primary hover:after:scale-x-100'
            } `}
          >
            <LayoutDashboard className="size-4" />
            Dashboard
          </DropdownMenuItem>
        </Link>
        <Link href="/users/profile">
          <DropdownMenuItem
            className={`${linkHover} ${
              pathname === '/users/profile'
                ? 'font-bold text-primary after:scale-x-100'
                : 'hover:text-primary hover:after:scale-x-100'
            } `}
          >
            <UserIcon className="size-4" />
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className={`cursor-pointer font-semibold ${
            isLoggedIn ? 'text-destructive' : 'text-blue-500'
          }`}
        >
          {isLoggedIn ? (
            <Link href="/signout">
              <LogOut className="size-4" />
              SignOut
            </Link>
          ) : (
            <Link href="/signin">
              <LogIn className="size-4" />
              SignIn
            </Link>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
