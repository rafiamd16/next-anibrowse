const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 to-gray-900">
      <div className="container mx-auto p-4">{children}</div>
    </div>
  )
}

export default AuthLayout
