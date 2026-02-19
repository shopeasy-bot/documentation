import { NextResponse } from "next/server"

export async function GET() {
  const apiUrl = process.env.API_URL

  if (!apiUrl) {
    return NextResponse.json(
      { error: "API_URL nao configurada" },
      { status: 500 }
    )
  }

  try {
    const response = await fetch(`${apiUrl}/auth/url`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: "Falha ao obter URL de autenticacao" },
        { status: response.status }
      )
    }

    const data = await response.json()

    if (!data.url) {
      return NextResponse.json(
        { error: "URL de autenticacao nao encontrada" },
        { status: 500 }
      )
    }

    return NextResponse.json({ url: data.url })
  } catch {
    return NextResponse.json(
      { error: "Erro ao conectar com o servidor" },
      { status: 500 }
    )
  }
}
