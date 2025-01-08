import { NextResponse } from 'next/server'

export async function GET() {
  // const { searchParams } = new URL(request.url)
  // const page = parseInt(searchParams.get('page') || '1')
  // const perPage = parseInt(searchParams.get('perPage') || '10')

  // const start = (page - 1) * perPage
  // const end = start + perPage

  // const paginatedUsers = users.slice(start, end)
  const categories = await fetch(`${process.env.BACKEND_BASE}/categories/`).then((res) => res.json())
  const response = NextResponse.json({ data: categories })
  response.headers.set('X-Total-Count', categories.length.toString())
  // response.headers.set('Access-Control-Expose-Headers', 'X-Total-Count')

  return response
}
