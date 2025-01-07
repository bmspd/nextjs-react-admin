'use client'
import { LogIn, LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
export const Header = () => {
  const session = useSession()
  const router = useRouter()
  const loginOrName = session?.data?.user ? `${session?.data?.user?.name}[${session?.data?.user?.role}]` : 'login'
  return (
    <div className="flex justify-between items-center gap-2 px-4 py-2 bg-gray-50 text-xl sticky top-0">
      <Link href="/">react-admin test app</Link>
      <div className="flex gap-4 items-center cursor-pointer">
        <div>{loginOrName}</div>
        {session?.data?.user ? (
          <LogOut
            onClick={() => {
              signOut({ redirect: false })
              router.push('/')
            }}
          />
        ) : (
          <LogIn
            onClick={() => {
              router.push('/login')
            }}
          />
        )}
      </div>
    </div>
  )
}
