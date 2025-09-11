import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { getCurrentUser } from '@/lib/actions/user-action'
import { User } from '@/types/user'

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const { user, isLoggedIn } = await getCurrentUser()

  return (
    <div className="overflow-x-hidden bg-gradient-to-br from-gray-950 to-gray-900">
      <Navbar user={user as User} isLoggedIn={isLoggedIn} />
      <div className="container mx-auto min-h-screen px-4">{children}</div>
      <Footer />
    </div>
  )
}

export default MainLayout
