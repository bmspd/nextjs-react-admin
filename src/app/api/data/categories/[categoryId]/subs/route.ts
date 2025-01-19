import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params
  const category = await fetch(`${process.env.BACKEND_BASE}/categories/${categoryId}/`).then((res) => res.json())
  const subcategories = category.subcategories ?? []
  const response = NextResponse.json({ data: subcategories, meta: { categoryName: category.name } })
  response.headers.set('X-Total-Count', subcategories.length.toString())
  return response
}
