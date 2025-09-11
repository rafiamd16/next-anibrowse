'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signInCredentials } from '@/lib/actions/user-action'
import { SigninFormSchema, signinFormSchema } from '@/lib/validations/auth-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaSignInAlt } from 'react-icons/fa'
import { IoEye, IoEyeOff, IoLockClosed, IoMail } from 'react-icons/io5'
import { toast } from 'sonner'

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const form = useForm<SigninFormSchema>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (data: SigninFormSchema) => {
    try {
      const result = await signInCredentials(data)
      if (result?.error) {
        return toast.error(result.error, {
          richColors: true,
          position: 'top-center',
          duration: 3000,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <>
      {error === 'OAuthAccountNotLinked' && (
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-800" role="alert">
          <span className="font-medium">Account already use by other provider</span>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="johndoe@example.com"
                      id="email"
                      type="email"
                      {...field}
                      className="h-11 pl-9"
                      autoComplete="email"
                    />
                    <IoMail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-500" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter your password"
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      className="h-11 px-9"
                      {...field}
                      autoComplete="off"
                    />
                    <IoLockClosed className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-500" />
                    <div
                      onClick={handleShowPassword}
                      className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <IoEyeOff className="size-4 text-gray-500" />
                      ) : (
                        <IoEye className="size-4 text-gray-500" />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="h-11 w-full cursor-pointer font-bold text-foreground transition-all duration-300 hover:-translate-y-0.5"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2Icon className="animate-spin" />
                <span>Please wait...</span>
              </>
            ) : (
              <>
                <FaSignInAlt className="size-4" />
                <span>Sign In</span>
              </>
            )}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default LoginForm
