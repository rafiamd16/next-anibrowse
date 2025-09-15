import CollectionList from '@/components/collection-list'
import DashboardContainer from '@/components/dashboard/dashboard-container'
import Header from '@/components/dashboard/header'
import { getCollections } from '@/lib/actions/collection-action'
import { getCurrentUser } from '@/lib/actions/user-action'
import { User } from '@/types/user'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Collection',
}

const CollectionPage = async () => {
  const collections = await getCollections()
  const { user } = await getCurrentUser()

  return (
    <section className="pt-18 sm:pt-20">
      <Header title="My Collection" />
      <DashboardContainer>
        <CollectionList collections={collections} user={user as User | null} />
      </DashboardContainer>
    </section>
  )
}

export default CollectionPage
