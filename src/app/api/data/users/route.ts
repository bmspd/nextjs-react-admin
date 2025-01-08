import { NextResponse } from 'next/server'
import users from '@/../public/data/users.json'

export async function GET() {
  // const { searchParams } = new URL(request.url)
  // const page = parseInt(searchParams.get('page') || '1')
  // const perPage = parseInt(searchParams.get('perPage') || '10')

  // const start = (page - 1) * perPage
  // const end = start + perPage

  // const paginatedUsers = users.slice(start, end)

  const response = NextResponse.json(users)
  response.headers.set('X-Total-Count', users.length.toString())
  // response.headers.set('Access-Control-Expose-Headers', 'X-Total-Count')

  return response
}
