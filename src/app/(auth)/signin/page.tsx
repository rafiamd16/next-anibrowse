import AuthContainer from '@/components/auth/auth-container'
import LoginForm from '@/components/auth/signin-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In',
}

const SignInPage = () => {
  return (
    <AuthContainer title="Sign In" mode="signin">
      <LoginForm />
    </AuthContainer>
  )
}

export default SignInPage
