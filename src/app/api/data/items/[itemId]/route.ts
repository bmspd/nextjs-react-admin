import { responseWithErrors } from '@/app/api/utils'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: Promise<{ itemId: string }> }) {
  const { itemId } = await params
  const item = await fetch(`${process.env.BACKEND_BASE}/items/${itemId}/`).then((res) => res.json())
  return NextResponse.json(item)
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ itemId: string }> }) {
  const { itemId } = await params
  const body = await request.json()
  const response = await fetch(`${process.env.BACKEND_BASE}/items/${itemId}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return responseWithErrors(response)
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ itemId: string }> }) {
  const { itemId } = await params
  await fetch(`${process.env.BACKEND_BASE}/items/${itemId}`, { method: 'DELETE' })
  return NextResponse.json({ message: 'Success deletion' })
}
