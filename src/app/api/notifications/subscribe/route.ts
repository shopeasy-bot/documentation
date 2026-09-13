import { NextRequest, NextResponse } from "next/server"
import { isTrustedOrigin } from "@/lib/notificationsOriginCheck"

async function forward(req: NextRequest, method: "POST" | "DELETE") {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Origem não confiável" }, { status: 403 })
  }

  const apiUrl = process.env.API_URL
  if (!apiUrl) return NextResponse.json({ error: "API_URL nao configurada" }, { status: 500 })

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Body invalido" }, { status: 400 })
  }

  try {
    const res = await fetch(`${apiUrl}/notifications/subscribe`, {
      method,
      headers: { "Content-Type": "application/json", cookie: req.headers.get("cookie") ?? "" },
      body: JSON.stringify(body),
      cache: "no-store",
    })

    const data = await res.json().catch(() => null)
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ error: "Erro ao conectar com o servidor" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  return forward(req, "POST")
}

export async function DELETE(req: NextRequest) {
  return forward(req, "DELETE")
}
