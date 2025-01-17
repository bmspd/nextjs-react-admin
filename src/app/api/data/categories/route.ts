import { NextRequest, NextResponse } from 'next/server'
import { responseWithErrors } from '../../utils'

export async function GET() {
  const categories = await fetch(`${process.env.BACKEND_BASE}/categories/`).then((res) => res.json())
  const response = NextResponse.json({ data: categories })
  response.headers.set('X-Total-Count', categories.length.toString())
  return response
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const response = await fetch(`${process.env.BACKEND_BASE}/categories/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  return responseWithErrors(response)
}
