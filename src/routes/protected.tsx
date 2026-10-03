import {
  createFileRoute,
  redirect,
} from '@tanstack/react-router'

export const Route = createFileRoute('/protected')({
  beforeLoad: ({ context }) => {
    if (!context.session) {
      throw redirect({
        to: '/sign-in/$',
      })
    }
  },

  component: ProtectedPage,
})

function ProtectedPage() {
  const { session } = Route.useRouteContext()
  const user = session?.user

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Protected Page
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          This page is only accessible to authenticated users.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <h2 className="text-xl font-semibold text-white">
          Welcome!
        </h2>

        <div className="mt-6 space-y-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Email
            </p>

            <p className="mt-1 text-zinc-200">
              {user?.email ?? 'N/A'}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Session
            </p>

            <p className="mt-1 text-sm text-emerald-400">
              Authenticated
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}