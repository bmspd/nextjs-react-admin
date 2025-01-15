import { NextResponse } from 'next/server'

export const responseWithErrors = async (response: Response) => {
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
