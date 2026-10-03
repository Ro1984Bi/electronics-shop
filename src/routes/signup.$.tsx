import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import { Lock, Mail, UserPlus, UserRound } from 'lucide-react'
import { registerUser } from '../server/register'

export const Route = createFileRoute('/signup/$')({
  component: SignupPage,
})

function SignupPage() {
  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-white text-zinc-950">
            <UserPlus size={22} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Join Electronics Shop and start shopping
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

              const form = event.currentTarget
              const formData = new FormData(form)

              try {
                await registerUser({
                  data: {
                    name: formData.get('name') as string,
                    email: formData.get('email') as string,
                    password: formData.get('password') as string,
                  },
                })

                toast.success('Account created!', {
                  description: 'Your account was created successfully.',
                })

                form.reset()

                await navigate({
                  to: '/sign-in/$',
                })
              } catch {
                setError('Unable to create account')

                toast.error('Account creation failed', {
                  description: 'Please check your information and try again.',
                })
              } finally {
                setIsLoading(false)
              }
            }}
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-zinc-200"
              >
                Name
              </label>

              <div className="relative mt-2">
                <UserRound
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 pl-10 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
                />
              </div>
            </div>

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
                  autoComplete="new-password"
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
              className="w-full rounded-lg bg-white px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 cursor-copy
              "
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{' '}
          <a
            href="/sign-in"
            className="font-medium text-zinc-300 transition hover:text-white"
          >
            Sign in
          </a>
        </p>
      </div>
    </main>
  )
}
