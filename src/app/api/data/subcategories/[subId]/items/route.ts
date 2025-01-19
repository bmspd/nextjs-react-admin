import { NextRequest, NextResponse } from 'next/server'
import qs from 'qs'

export async function GET(request: NextRequest, { params }: { params: Promise<{ subId: string }> }) {
  const { subId } = await params
  const queryString = qs.stringify({ without_pagination: true }, { encode: true })
  //TODO: было бы удобно получать здесь еще и название подкатегории
  const subcategory = await fetch(`${process.env.BACKEND_BASE}/subcategories/${subId}/items?${queryString}`).then((res) =>
    res.json()
  )
  const items = subcategory ?? []
  const response = NextResponse.json({ data: items })
  response.headers.set('X-Total-Count', items.length.toString())
  return response
}
