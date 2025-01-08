import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const response = await fetch(`${process.env.BACKEND_BASE}/subcategories/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const bodyResponse = await response.json()
  if (!response.ok) {
    for (const field in bodyResponse) {
      if (Array.isArray(bodyResponse[field])) bodyResponse[field] = bodyResponse[field].join(' ')
    }
    return NextResponse.json(
      {
        errors: {
          ...bodyResponse,
        },
      },
      { status: 400 }
    )
  }
  return NextResponse.json(bodyResponse)
}
