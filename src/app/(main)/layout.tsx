import { auth } from '@/auth'
import { Header } from '@/components/header'
import { SessionProvider } from 'next-auth/react'

export default async function MainLayout({ children }: { children?: React.ReactNode }) {
  const session = await auth()
  return (
    <SessionProvider refetchOnWindowFocus={false} session={session}>
      <Header />
      <div className="p-4">{children}</div>
    </SessionProvider>
  )
}
