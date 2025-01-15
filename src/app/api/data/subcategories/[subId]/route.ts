import { responseWithErrors } from '@/app/api/utils'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: Promise<{ subId: string }> }) {
  const { subId } = await params
  const subCategory = await fetch(`${process.env.BACKEND_BASE}/subcategories/${subId}/`).then((res) => res.json())
  return NextResponse.json(subCategory)
}

export async function PUT(request: NextRequest) {
  const body = await request.json()
  const response = await fetch(`${process.env.BACKEND_BASE}/subcategories/${body.id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  return responseWithErrors(response)
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ subId: string }> }) {
  const { subId } = await params
  const response = await fetch(`${process.env.BACKEND_BASE}/subcategories/${subId}/`, { method: 'DELETE' })
  if (!response.ok) {
    return NextResponse.json({ message: 'Что-то пошло не так' }, { status: response.status })
  }
  return NextResponse.json({})
}
