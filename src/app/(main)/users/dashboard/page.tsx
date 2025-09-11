import DashboardContainer from '@/components/dashboard/dashboard-container'
import { Button } from '@/components/ui/button'
import HeaderMenu from '@/components/utilities/header-menu'
import { getCurrentUser } from '@/lib/actions/user-action'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Dashboard',
}

const DashboardPage = async () => {
  const { user } = await getCurrentUser()

  return (
    <section className="pt-18 sm:pt-20">
      <HeaderMenu title={`Welcome, ${user?.name}`} />
      <DashboardContainer>
        <div className="card-hover overflow-hidden rounded-xl border">
          <Image
            src={user?.image ?? '/avatar.png'}
            alt="avatar"
            width={250}
            height={250}
            priority
            className="shrink-0 object-cover"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button asChild className="font-semibold">
            <Link href="/users/dashboard/collection">My Collection</Link>
          </Button>
          <Button asChild className="font-semibold">
            <Link href="/users/dashboard/comment">My Comment</Link>
          </Button>
        </div>
      </DashboardContainer>
    </section>
  )
}

export default DashboardPage
