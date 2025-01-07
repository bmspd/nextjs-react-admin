// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth'
declare module 'next-auth' {
  interface User {
    role?: string
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string
  }
}
