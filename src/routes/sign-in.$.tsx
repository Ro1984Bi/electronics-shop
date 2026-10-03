import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import { LogIn, Mail, Lock } from 'lucide-react'

export const Route = createFileRoute('/sign-in/$')({
  component: SignInPage,
})

function SignInPage() {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-white text-zinc-950">
            <LogIn size={22} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Sign in to continue to Electronics Shop
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-xl">
          <form
            className="space-y-5"
            onSubmit={async (event) => {
              event.preventDefault()

              setError('')
              setIsLoading(true)

              try {
                const formData = new FormData(event.currentTarget)

                const csrfResponse = await fetch('/api/auth/csrf')
                const { csrfToken } = await csrfResponse.json()

                const response = await fetch('/api/auth/callback/credentials', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  redirect: 'follow',
                  body: new URLSearchParams({
                    csrfToken,
                    email: formData.get('email') as string,
                    password: formData.get('password') as string,
                    redirect: 'false',
                    callbackUrl: '/',
                  }),
                })

                console.log('LOGIN STATUS:', response.status)
                console.log('LOGIN URL:', response.url)

                if (response.url.includes('error=CredentialsSignin')) {
                  setError('Invalid email or password.')

                  toast.error('Sign in failed', {
                    description: 'Please check your email and password.',
                  })

                  return
                }

                toast.success('Welcome back!', {
                  description: 'You have successfully signed in.',
                })

                navigate({ to: '/' })
              } catch {
                setError('Something went wrong. Please try again.')

                toast.error('Something went wrong', {
                  description: 'Please try again in a moment.',
                })
              } finally {
                setIsLoading(false)
              }
            }}
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-200"
              >
                Email
              </label>

              <div className="relative mt-2">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 pl-10 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-zinc-200"
              >
                Password
              </label>

              <div className="relative mt-2">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 pl-10 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="rounded-lg border border-red-900/50 bg-red-950/30 px-3 py-2 text-sm text-red-400">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-white px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Don't have an account?{' '}
          <a
            href="/signup"
            className="font-medium text-zinc-300 transition hover:text-white cursor-pointer"
          >
            Create one
          </a>
        </p>
      </div>
    </main>
  )
}
