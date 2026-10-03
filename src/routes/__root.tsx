import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import type { AuthSession } from 'start-authjs'
import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import { getSession } from 'start-authjs'
import { authConfig } from '../utils/auth'
import { Header } from '../components/Header'
import { Toaster } from 'sonner'
import appCss from '../styles.css?url'

interface RouterContext {
  session: AuthSession | null
}

const getAuthSession = createServerFn({
  method: 'GET',
}).handler(async () => {
  const request = getRequest()

  return await getSession(request, authConfig)
})

export const Route = createRootRouteWithContext<RouterContext>()({
    beforeLoad: async () => {
    const session = await getAuthSession()

    return {
      session,
    }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Electronics Shop',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Header />

        <Toaster theme="dark" position="top-right" />
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
