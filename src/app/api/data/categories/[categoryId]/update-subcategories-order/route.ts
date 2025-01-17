import { responseWithErrors } from '@/app/api/utils'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest, { params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params
  const body = await request.json()
  const response = await fetch(`${process.env.BACKEND_BASE}/categories/${categoryId}/update-subcategories-order/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ids: body }),
  })
  return responseWithErrors(response)
}
