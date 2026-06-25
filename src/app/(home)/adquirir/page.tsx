"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { JetBrains_Mono, Poppins } from "next/font/google"
import { GridDecoration } from "@/components/decoration/Grid"
import { FlareDecoration } from "@/components/decoration/Flare"
import { cn } from "@/lib/cn"
import { FiCheck, FiShield, FiZap } from "react-icons/fi"
import settings from "@/../settings.json"

const poppins = Poppins({ subsets: ["latin"], weight: "500" })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: "500" })

function AdquirirContent() {
  const params = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<"idle" | "loading" | "redirecting" | "error">("idle")

  const planName = params.get("plan") ?? ""
  const plan = settings.plans.find(
    (p) => p.name.toLowerCase() === planName.toLowerCase() && !p.enterprise && p.price !== "Grátis"
  )

  useEffect(() => {
    if (!plan) router.replace("/plans")
  }, [plan, router])

  async function handleCheckout() {
    setStatus("loading")
    try {
      const res = await fetch(`/api/auth/discord?plan=${encodeURIComponent(planName.toLowerCase())}`)
      const data = await res.json()
      if (!res.ok || !data.url) { setStatus("error"); return }
      setStatus("redirecting")
      await new Promise((r) => setTimeout(r, 1200))
      window.location.href = data.url
    } catch {
      setStatus("error")
    }
  }

  if (!plan) return null

  return (
    <div className="flex flex-col items-center gap-8 max-w-md w-full motion-preset-expand motion-delay-[100ms]">
      <div className="flex flex-col items-center gap-2">
        <span className={`${jetbrains.className} text-xs uppercase tracking-widest text-emerald-500`}>
          Você selecionou
        </span>
        <h1 className={`${poppins.className} text-4xl text-neutral-800 dark:text-neutral-100`}>
          Plano {plan.name}
        </h1>
        <div className="flex items-baseline gap-1 mt-1">
          <span className={`${jetbrains.className} text-3xl font-bold text-emerald-400`}>
            {plan.price}
          </span>
          <span className="text-neutral-500 text-sm">{plan.period}</span>
        </div>
      </div>

      <ul className="w-full space-y-3 text-left">
        {plan.features.filter((f) => f.enabled).map((feature) => (
          <li key={feature.label} className="flex items-center gap-3">
            <FiCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="text-sm text-neutral-600 dark:text-neutral-300">{feature.label}</span>
          </li>
        ))}
      </ul>

      <div className="w-full flex flex-col gap-3">
        {status === "error" && (
          <p className="text-sm text-red-400">Erro ao iniciar pagamento. Tente novamente.</p>
        )}

        <button
          onClick={handleCheckout}
          disabled={status === "loading" || status === "redirecting"}
          className={cn(
            `${jetbrains.className} group relative inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl overflow-hidden font-medium shadow-lg transition-all duration-300 w-full`,
            "bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-700 text-white hover:shadow-emerald-500/30 hover:shadow-2xl hover:scale-[1.02] active:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100",
          )}
        >
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.3),rgba(255,255,255,0))] group-hover:translate-x-full duration-700" />
          <span className="relative z-10 flex items-center gap-2">
            {status === "loading" || status === "redirecting" ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                {status === "redirecting" ? "Redirecionando..." : "Aguarde..."}
              </>
            ) : (
              <>
                <FiZap className="w-4 h-4" />
                Assinar com Discord
              </>
            )}
          </span>
        </button>

        <button
          onClick={() => router.back()}
          className={`${jetbrains.className} text-xs text-neutral-500 hover:text-neutral-300 transition-colors`}
        >
          ← Voltar aos planos
        </button>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-neutral-500">
        <FiShield className="w-3.5 h-3.5 text-emerald-500" />
        Login seguro via Discord OAuth2 · Pagamento seguro
      </div>
    </div>
  )
}

export default function AdquirirPage() {
  return (
    <main className="flex flex-1 flex-col z-10 items-center justify-center text-center gap-10 px-4 py-20">
      <FlareDecoration />
      <Suspense fallback={<div className="w-8 h-8 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 animate-spin" />}>
        <AdquirirContent />
      </Suspense>
      <GridDecoration
        width={60}
        height={60}
        className={cn("[mask-image:linear-gradient(-160deg,white,transparent,transparent)] opacity-30")}
      />
    </main>
  )
}
