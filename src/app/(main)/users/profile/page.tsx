import ProfileWrapper from '@/components/profile/profile-wrapper'
import { getUserProfile } from '@/lib/actions/user-action'
import { User } from '@/types/user'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profile',
}

const ProfilePage = async () => {
  const user = await getUserProfile()

  if ('error' in user!) {
    throw new Error(user.error as string)
  }

  return (
    <section className="pt-22 sm:pt-24">
      <ProfileWrapper user={user as User} />
    </section>
  )
}

export default ProfilePage
