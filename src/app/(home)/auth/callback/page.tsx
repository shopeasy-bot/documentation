"use client"

import { Suspense, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

function CallbackContent() {
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    const next = params.get("next") ?? ""
    const safe = next.startsWith("/") && !next.startsWith("//") ? next : "/auth/success"
    router.replace(safe)
  }, [router, params])

  return null
}

export default function AuthCallbackPage() {
  return (
    <Suspense>
      <CallbackContent />
    </Suspense>
  )
}
