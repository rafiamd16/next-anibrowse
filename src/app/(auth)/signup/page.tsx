import AuthContainer from '@/components/auth/auth-container'
import RegisterForm from '@/components/auth/signup-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up',
}

const SignUpPage = () => {
  return (
    <AuthContainer title="Sign Up" mode="signup">
      <RegisterForm />
    </AuthContainer>
  )
}

export default SignUpPage
