import Credentials from '@auth/core/providers/credentials'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '../db'
import { verifyUserPassword } from '../server/auth'

export const authConfig = {
  adapter: DrizzleAdapter(db),

  session: {
  strategy: 'jwt' as const,
},

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (
          typeof credentials?.email !== 'string' ||
          typeof credentials?.password !== 'string'
        ) {
          return null
        }

        const user = await verifyUserPassword(
          credentials.email,
          credentials.password,
        )

        if (!user) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        }
      },
    }),
  ],

  secret: process.env.AUTH_SECRET,
}