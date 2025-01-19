import { responseWithErrors } from '@/app/api/utils'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest, { params }: { params: Promise<{ subId: string }> }) {
  const { subId } = await params
  const body = await request.json()
  const response = await fetch(`${process.env.BACKEND_BASE}/subcategories/${subId}/update-order/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ids: body }),
  })
  return responseWithErrors(response)
}
