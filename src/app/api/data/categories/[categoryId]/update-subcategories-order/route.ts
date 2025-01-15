import { responseWithErrors } from '@/app/api/utils'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  //TODO: переделать это
  const response = await fetch(`${process.env.BACKEND_BASE}/subcategories/${body.id}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  return responseWithErrors(response)
}
