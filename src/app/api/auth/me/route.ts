import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const apiUrl = process.env.API_URL
  if (!apiUrl) return NextResponse.json(null, { status: 500 })

  try {
    const res = await fetch(`${apiUrl}/auth/me`, {
      headers: { cookie: req.headers.get("cookie") ?? "" },
      cache: "no-store",
    })
    if (!res.ok) return NextResponse.json(null, { status: res.status })
    return NextResponse.json(await res.json())
  } catch {
    return NextResponse.json(null, { status: 500 })
  }
}
