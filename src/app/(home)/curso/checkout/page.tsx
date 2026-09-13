"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { QRCodeSVG } from "qrcode.react"
import { JetBrains_Mono, Poppins } from "next/font/google"
import { GridDecoration } from "@/components/decoration/Grid"
import { FlareDecoration } from "@/components/decoration/Flare"
import { cn } from "@/lib/cn"
import { useUser } from "@/context/user"
import { FiCheck, FiCopy, FiLoader, FiShield, FiZap } from "react-icons/fi"

const poppins = Poppins({ subsets: ["latin"], weight: "500" })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: "500" })

const COURSE_ID = "vendas-discord"
const LAUNCH_DATE = new Date(2026, 9, 1); // DISPLAY ONLY — mantenha em sincronia com api/src/lib/courses.ts
const LAUNCH_LABEL = "1º de outubro";
const POLL_INTERVAL_MS = 4000

type Method = "pix" | "card"
type Status = "idle" | "loading" | "pix" | "redirecting" | "error" | "already-owned"

interface PixPayment {
  orderId: string
  pixCopiaECola: string
  totalPrice: number
}

function CheckoutContent() {
  const { user, loading: userLoading } = useUser()
  const router = useRouter()

  const [checkingAccess, setCheckingAccess] = useState(true)
  const [status, setStatus] = useState<Status>("idle")
  const [pix, setPix] = useState<PixPayment | null>(null)
  const [copied, setCopied] = useState(false)
  const redirectedToLogin = useRef(false)

  const now = new Date()
  const isPreLaunch = now < LAUNCH_DATE
  const currentPrice = isPreLaunch ? "R$ 10,90" : "R$ 20,90"
  const otherPrice = isPreLaunch ? "R$ 20,90" : "R$ 10,90"

  useEffect(() => {
    if (userLoading) return
    if (!user) {
      if (!redirectedToLogin.current) {
        redirectedToLogin.current = true
        router.replace(`/login?next=${encodeURIComponent("/curso/checkout")}`)
      }
      return
    }

    fetch(`/api/courses/${COURSE_ID}/access`)
      .then((r) => (r.ok ? r.json() : { hasAccess: false }))
      .then((data) => { if (data?.hasAccess) setStatus("already-owned") })
      .catch(() => {})
      .finally(() => setCheckingAccess(false))
  }, [user, userLoading, router])

  async function startCheckout(method: Method) {
    setStatus("loading")
    try {
      const res = await fetch("/api/courses/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: COURSE_ID, method }),
      })
      const data = await res.json().catch(() => null)

      if (res.status === 409) { setStatus("already-owned"); return }
      if (res.status === 401) {
        router.replace(`/login?next=${encodeURIComponent("/curso/checkout")}`)
        return
      }
      if (!res.ok || !data) { setStatus("error"); return }

      if (data.provider === "stripe") {
        setStatus("redirecting")
        window.location.href = data.checkoutUrl
        return
      }

      if (data.provider === "efi") {
        setPix({ orderId: data.orderId, pixCopiaECola: data.pixCopiaECola, totalPrice: data.totalPrice })
        setStatus("pix")
      }
    } catch {
      setStatus("error")
    }
  }

  // Polling do status do PIX até a confirmação do pagamento.
  useEffect(() => {
    if (!pix) return
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/courses/orders/${pix.orderId}`, { cache: "no-store" })
        if (!res.ok) return
        const data = await res.json()
        if (data?.pedding === false) {
          clearInterval(interval)
          router.push("/curso/sucesso")
        }
      } catch {}
    }, POLL_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [pix, router])

  async function copyCode() {
    if (!pix) return
    try {
      await navigator.clipboard.writeText(pix.pixCopiaECola)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  if (userLoading || !user || checkingAccess) {
    return <div className="w-8 h-8 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 animate-spin" />
  }

  if (status === "already-owned") {
    return (
      <div className="flex flex-col items-center gap-6 max-w-md w-full text-center motion-preset-expand motion-delay-[100ms]">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
          <FiCheck className="w-6 h-6 text-emerald-400" />
        </div>
        <h1 className={`${poppins.className} text-2xl text-neutral-800 dark:text-neutral-100`}>
          Você já garantiu seu acesso
        </h1>
        <a
          href="/curso"
          className={`${jetbrains.className} text-xs text-neutral-500 hover:text-neutral-300 transition-colors`}
        >
          ← Voltar para a página do curso
        </a>
      </div>
    )
  }

  if (status === "pix" && pix) {
    return (
      <div className="flex flex-col items-center gap-6 max-w-sm w-full text-center motion-preset-expand motion-delay-[100ms]">
        <h1 className={`${poppins.className} text-2xl text-neutral-800 dark:text-neutral-100`}>
          Pague com PIX
        </h1>
        <p className={`${jetbrains.className} text-3xl font-bold text-emerald-400`}>
          R$ {pix.totalPrice.toFixed(2).replace(".", ",")}
        </p>

        <div className="p-3 bg-white rounded-2xl">
          <QRCodeSVG value={pix.pixCopiaECola} size={200} />
        </div>

        <button
          type="button"
          onClick={copyCode}
          className={cn(
            `${jetbrains.className} w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-xs transition-colors`,
            copied
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
              : "border-neutral-200/20 dark:border-neutral-800/50 bg-neutral-100/5 dark:bg-neutral-900/40 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100/10 dark:hover:bg-neutral-800/50",
          )}
        >
          {copied ? <FiCheck className="w-3.5 h-3.5" /> : <FiCopy className="w-3.5 h-3.5" />}
          {copied ? "Código copiado!" : "Copiar código PIX (copia e cola)"}
        </button>

        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
          Escaneie o QR code ou copie o código no app do seu banco. O acesso é liberado
          automaticamente assim que o pagamento for confirmado.
        </p>

        <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500">
          <FiLoader className="w-3.5 h-3.5 animate-spin" />
          Aguardando confirmação do pagamento...
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-8 max-w-md w-full motion-preset-expand motion-delay-[100ms]">
      <div className="flex flex-col items-center gap-2">
        <span className={`${jetbrains.className} text-xs uppercase tracking-widest text-emerald-500`}>
          Você está adquirindo
        </span>
        <h1 className={`${poppins.className} text-3xl text-neutral-800 dark:text-neutral-100`}>
          Curso de Vendas no Discord
        </h1>
        <div className="flex items-baseline gap-2 mt-1">
          <span className={`${jetbrains.className} text-3xl font-bold text-emerald-400`}>{currentPrice}</span>
          {isPreLaunch && (
            <span className={`${jetbrains.className} text-sm text-neutral-500 line-through`}>{otherPrice}</span>
          )}
        </div>
        {isPreLaunch && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Preço de pré-venda, válido até {LAUNCH_LABEL}.
          </p>
        )}
      </div>

      <ul className="w-full space-y-3 text-left">
        {[
          "5 módulos e 20 aulas em vídeo",
          "Encontros ao vivo mensais",
          "Acesso vitalício, pagamento único",
          "Atualizações futuras inclusas",
        ].map((item) => (
          <li key={item} className="flex items-center gap-3">
            <FiCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="text-sm text-neutral-600 dark:text-neutral-300">{item}</span>
          </li>
        ))}
      </ul>

      <div className="w-full flex flex-col gap-3">
        {status === "error" && (
          <p className="text-sm text-red-400">Erro ao iniciar pagamento. Tente novamente.</p>
        )}

        <button
          onClick={() => startCheckout("pix")}
          disabled={status === "loading" || status === "redirecting"}
          className={cn(
            `${jetbrains.className} group relative inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl overflow-hidden font-medium shadow-lg transition-all duration-300 w-full`,
            "bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-700 text-white hover:shadow-emerald-500/30 hover:shadow-2xl hover:scale-[1.02] active:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100",
          )}
        >
          {status === "loading" ? (
            <FiLoader className="w-4 h-4 animate-spin" />
          ) : (
            <FiZap className="w-4 h-4" />
          )}
          Pagar com PIX
        </button>

        <button
          onClick={() => startCheckout("card")}
          disabled={status === "loading" || status === "redirecting"}
          className={cn(
            `${jetbrains.className} inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-medium border border-neutral-200/20 dark:border-neutral-800/50 bg-neutral-100/10 backdrop-blur-sm text-neutral-700 dark:text-slate-50 hover:bg-neutral-100/20 dark:hover:bg-neutral-800/50 transition-all duration-300 w-full disabled:opacity-60 disabled:cursor-not-allowed`,
          )}
        >
          {status === "redirecting" && <FiLoader className="w-4 h-4 animate-spin" />}
          Pagar com cartão
        </button>

        <a
          href="/curso"
          className={`${jetbrains.className} text-xs text-neutral-500 hover:text-neutral-300 transition-colors text-center`}
        >
          ← Voltar para o curso
        </a>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-neutral-500">
        <FiShield className="w-3.5 h-3.5 text-emerald-500" />
        Login seguro via Discord OAuth2 · Pagamento seguro
      </div>
    </div>
  )
}

export default function CourseCheckoutPage() {
  return (
    <main className="flex flex-1 flex-col z-10 items-center justify-center text-center gap-10 px-4 py-20 min-h-screen">
      <FlareDecoration />
      <Suspense fallback={<div className="w-8 h-8 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 animate-spin" />}>
        <CheckoutContent />
      </Suspense>
      <GridDecoration
        width={60}
        height={60}
        className={cn("[mask-image:linear-gradient(-160deg,white,transparent,transparent)] opacity-30")}
      />
    </main>
  )
}
