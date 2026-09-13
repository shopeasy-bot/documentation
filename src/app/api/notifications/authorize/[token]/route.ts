import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const apiUrl = process.env.API_URL
  if (!apiUrl) return NextResponse.json({ error: "API_URL nao configurada" }, { status: 500 })

  const { token } = await params

  try {
    const res = await fetch(`${apiUrl}/notifications/authorize/${encodeURIComponent(token)}`, {
      headers: { cookie: req.headers.get("cookie") ?? "" },
      cache: "no-store",
    })

    const data = await res.json().catch(() => null)
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ error: "Erro ao conectar com o servidor" }, { status: 500 })
  }
}
