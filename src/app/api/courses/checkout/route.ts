import { NextRequest, NextResponse } from "next/server"
import { isTrustedOrigin } from "@/lib/checkOrigin"

export async function POST(req: NextRequest) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Origem não confiável" }, { status: 403 })
  }

  const apiUrl = process.env.API_URL
  if (!apiUrl) return NextResponse.json({ error: "API_URL nao configurada" }, { status: 500 })

  const cookie = req.headers.get("cookie") ?? ""

  const body = await req.json().catch(() => null)
  if (!body || typeof body.courseId !== "string" || (body.method !== "pix" && body.method !== "card")) {
    return NextResponse.json({ error: "Requisicao invalida" }, { status: 400 })
  }

  try {
    // Troca a sessao existente por um token isolado de curta duracao — o
    // token nunca chega ao browser, so circula servidor-a-servidor.
    const tokenRes = await fetch(`${apiUrl}/courses/token`, {
      method: "POST",
      headers: { cookie },
    })

    if (tokenRes.status === 401) {
      return NextResponse.json({ error: "not_authenticated" }, { status: 401 })
    }
    if (!tokenRes.ok) {
      return NextResponse.json({ error: "Falha ao autenticar" }, { status: tokenRes.status })
    }

    const { token } = await tokenRes.json()

    const checkoutRes = await fetch(`${apiUrl}/courses/checkout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courseId: body.courseId, method: body.method }),
    })

    const data = await checkoutRes.json().catch(() => null)
    return NextResponse.json(data, { status: checkoutRes.status })
  } catch {
    return NextResponse.json({ error: "Erro ao conectar com o servidor" }, { status: 500 })
  }
}
