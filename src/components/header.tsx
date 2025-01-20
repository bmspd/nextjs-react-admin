'use client'
import { LogIn, LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
export const Header = () => {
  const session = useSession()
  const router = useRouter()
  const pathname = usePathname()
  return (
    <div className="flex justify-between items-center gap-2 px-4 py-2 bg-gray-50 text-xl sticky top-0">
      <Link href="/">react-admin test app</Link>
      {session?.data?.user ? (
        <div
          className="flex gap-4 items-center cursor-pointer"
          onClick={() => {
            signOut({ redirect: false })
            router.push('/')
          }}
        >
          <div>
            {session?.data?.user?.name}[role={session?.data?.user?.role}]
          </div>
          <LogOut />
        </div>
      ) : (
        <Link
          href="/login"
          className="flex gap-4 items-center cursor-pointer"
          onClick={(e) => {
            if (pathname === '/login') e.preventDefault()
          }}
        >
          <div>login</div>
          <LogIn />
        </Link>
      )}
    </div>
  )
}
