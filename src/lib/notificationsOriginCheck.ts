import type { NextRequest } from "next/server"

/**
 * Defesa extra contra CSRF nos proxies de /api/notifications/* (que repassam
 * o cookie se_session pra API). O SameSite=Lax do cookie já bloqueia esse
 * cookie em POST cross-site, mas isso confere explicitamente Origin/Referer
 * contra o próprio site — mesma filosofia do originCheckMiddleware da API,
 * só que do lado do Next.js.
 */
export function isTrustedOrigin(req: NextRequest): boolean {
  const expected = process.env.NEXT_PUBLIC_SITE_URL
  if (!expected) return true

  let expectedOrigin: string
  try {
    expectedOrigin = new URL(expected).origin
  } catch {
    return true
  }

  const origin = req.headers.get("origin")
  if (origin) return origin === expectedOrigin

  const referer = req.headers.get("referer")
  if (referer) {
    try {
      return new URL(referer).origin === expectedOrigin
    } catch {
      return false
    }
  }

  // Sem Origin nem Referer não há sinal de origem cruzada — o SameSite=Lax
  // do cookie continua sendo a defesa primária contra CSRF.
  return true
}
