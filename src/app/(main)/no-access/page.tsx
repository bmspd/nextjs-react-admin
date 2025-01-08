import Link from 'next/link'

export default async function NoAcess() {
  return (
    <div>
      <h1>No Acess Page</h1>
      <Link href="/">Back to main page</Link>
    </div>
  )
}
