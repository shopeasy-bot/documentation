import { NextRequest, NextResponse } from "next/server"
import { isTrustedOrigin } from "@/lib/checkOrigin"

export async function GET(req: NextRequest, { params }: { params: Promise<{ courseId: string }> }) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Origem não confiável" }, { status: 403 })
  }

  const apiUrl = process.env.API_URL
  if (!apiUrl) return NextResponse.json({ error: "API_URL nao configurada" }, { status: 500 })

  const { courseId } = await params
  const cookie = req.headers.get("cookie") ?? ""

  try {
    const tokenRes = await fetch(`${apiUrl}/courses/token`, {
      method: "POST",
      headers: { cookie },
      cache: "no-store",
    })

    if (!tokenRes.ok) {
      // Sem sessão válida — trata como "sem acesso" em vez de erro, pra não
      // quebrar a exibição da página do curso pra visitantes deslogados.
      return NextResponse.json({ hasAccess: false })
    }

    const { token } = await tokenRes.json()

    const res = await fetch(`${apiUrl}/courses/${encodeURIComponent(courseId)}/access`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })

    if (!res.ok) return NextResponse.json({ hasAccess: false })
    return NextResponse.json(await res.json())
  } catch {
    return NextResponse.json({ error: "Erro ao conectar com o servidor" }, { status: 500 })
  }
}
