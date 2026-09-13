import { NextRequest, NextResponse } from "next/server"
import { isTrustedOrigin } from "@/lib/checkOrigin"

export async function GET(req: NextRequest, { params }: { params: Promise<{ orderId: string }> }) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Origem não confiável" }, { status: 403 })
  }

  const apiUrl = process.env.API_URL
  if (!apiUrl) return NextResponse.json({ error: "API_URL nao configurada" }, { status: 500 })

  const { orderId } = await params
  const cookie = req.headers.get("cookie") ?? ""

  try {
    const tokenRes = await fetch(`${apiUrl}/courses/token`, {
      method: "POST",
      headers: { cookie },
      cache: "no-store",
    })

    if (tokenRes.status === 401) {
      return NextResponse.json({ error: "not_authenticated" }, { status: 401 })
    }
    if (!tokenRes.ok) {
      return NextResponse.json({ error: "Falha ao autenticar" }, { status: tokenRes.status })
    }

    const { token } = await tokenRes.json()

    const statusRes = await fetch(`${apiUrl}/courses/orders/${encodeURIComponent(orderId)}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })

    const data = await statusRes.json().catch(() => null)
    return NextResponse.json(data, { status: statusRes.status })
  } catch {
    return NextResponse.json({ error: "Erro ao conectar com o servidor" }, { status: 500 })
  }
}
