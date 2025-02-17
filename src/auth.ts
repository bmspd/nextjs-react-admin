import NextAuth, { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const authConfig = {
  // debug: true,
  pages: {
    signIn: '/login',
  },
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        username: { label: 'username' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        return { name: credentials.username as string, role: credentials.username === 'admin' ? 'admin' : 'user' }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role || 'user'
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)
