import { NextRequest } from 'next/server'
import { responseWithErrors } from '../../utils'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const response = await fetch(`${process.env.BACKEND_BASE}/items/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  return responseWithErrors(response)
}
