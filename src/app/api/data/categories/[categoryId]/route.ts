import { responseWithErrors } from '@/app/api/utils'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params
  const caetegory = await fetch(`${process.env.BACKEND_BASE}/categories/${categoryId}/`).then((res) => res.json())
  return NextResponse.json(caetegory)
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params
  await fetch(`${process.env.BACKEND_BASE}/categories/${categoryId}/`, { method: 'DELETE' })
  return NextResponse.json({ message: 'Success deletion' })
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params
  const body = await request.json()
  const response = await fetch(`${process.env.BACKEND_BASE}/categories/${categoryId}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  return responseWithErrors(response)
}
