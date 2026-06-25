import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const apiUrl = process.env.API_URL
  if (!apiUrl) return NextResponse.json({ ok: false }, { status: 500 })

  try {
    await fetch(`${apiUrl}/auth/logout`, {
      method: "POST",
      headers: { cookie: req.headers.get("cookie") ?? "" },
    })
  } catch {}

  const res = NextResponse.json({ ok: true })
  res.cookies.delete("se_session")
  return res
}
