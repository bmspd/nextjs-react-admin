import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <Link href="/admin" shallow>
        Go to /admin
      </Link>
    </main>
  )
}
