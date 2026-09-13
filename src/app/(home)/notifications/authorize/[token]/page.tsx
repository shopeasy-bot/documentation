"use client"

import { useCallback, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Poppins, JetBrains_Mono } from "next/font/google"
import { FiBell, FiCheckCircle, FiAlertTriangle, FiShield, FiLoader } from "react-icons/fi"
import { GridDecoration } from "@/components/decoration/Grid"
import { FlareDecoration } from "@/components/decoration/Flare"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/cn"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: "500" })

interface PreviewData {
  guildId: string
  guildName?: string
  expiresAt: string
}

type Stage =
  | "loading"
  | "invalid"
  | "redirecting"
  | "ready"
  | "confirming"
  | "success"
  | "success-no-push"
  | "denied"
  | "error"

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export default function NotificationAuthorizePage() {
  const params = useParams<{ token: string }>()
  const token = params?.token ?? ""

  const [stage, setStage] = useState<Stage>("loading")
  const [preview, setPreview] = useState<PreviewData | null>(null)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    if (!token) {
      setStage("invalid")
      return
    }

    let cancelled = false

    async function run() {
      try {
        const [previewRes, meRes] = await Promise.all([
          fetch(`/api/notifications/authorize/${encodeURIComponent(token)}`, { cache: "no-store" }),
          fetch("/api/auth/me", { cache: "no-store" }),
        ])

        if (cancelled) return

        if (!previewRes.ok) {
          setStage("invalid")
          return
        }

        const previewData = (await previewRes.json().catch(() => null)) as PreviewData | null
        if (!previewData?.guildId) {
          setStage("invalid")
          return
        }
        setPreview(previewData)

        const me = meRes.ok ? await meRes.json().catch(() => null) : null
        if (!me) {
          setStage("redirecting")
          const next = `/notifications/authorize/${token}`
          window.location.href = `/login?next=${encodeURIComponent(next)}`
          return
        }

        setStage("ready")
      } catch {
        if (!cancelled) setStage("invalid")
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [token])

  const handleAuthorize = useCallback(async () => {
    if (!preview) return
    setStage("confirming")
    setErrorMessage("")

    try {
      const confirmRes = await fetch(`/api/notifications/authorize/${encodeURIComponent(token)}/confirm`, {
        method: "POST",
      })

      if (!confirmRes.ok) {
        const data = await confirmRes.json().catch(() => null)
        setErrorMessage(
          data?.error ??
            "Não foi possível confirmar a autorização. O link pode ter expirado, já ter sido usado, ou pertencer a outra conta.",
        )
        setStage("error")
        return
      }

      if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
        setStage("success-no-push")
        return
      }

      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      if (!vapidPublicKey) {
        setStage("success-no-push")
        return
      }

      const permission = await Notification.requestPermission()
      if (permission !== "granted") {
        setStage("denied")
        return
      }

      await navigator.serviceWorker.register("/sw.js")
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey) as BufferSource,
      })

      const subJson = subscription.toJSON()

      const subscribeRes = await fetch("/api/notifications/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guildId: preview.guildId,
          endpoint: subJson.endpoint,
          keys: { p256dh: subJson.keys?.p256dh, auth: subJson.keys?.auth },
        }),
      })

      if (!subscribeRes.ok) {
        setStage("success-no-push")
        return
      }

      setStage("success")
    } catch {
      setErrorMessage(
        "A autorização foi confirmada, mas não foi possível ativar as notificações do navegador agora. Tente novamente mais tarde.",
      )
      setStage("success-no-push")
    }
  }, [preview, token])

  return (
    <main className="flex flex-1 flex-col z-10 items-center justify-center px-4 py-16 relative min-h-screen">
      <FlareDecoration />

      <div className="max-w-2xl w-full space-y-10">
        <div className="text-center space-y-6 motion-preset-expand motion-delay-[100ms]">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-lg" />
            <Badge
              variant="outline"
              className="relative bg-emerald-500/10 border-emerald-500/30 text-emerald-400 px-6 py-2 text-sm font-medium backdrop-blur-sm"
            >
              <FiBell className="w-4 h-4 mr-2" />
              Notificações de Vendas
            </Badge>
          </div>

          <h1
            className={`${poppins.className} text-3xl lg:text-5xl font-bold bg-gradient-to-r
              dark:from-white from-black dark:to-neutral-400 to-neutral-500 bg-clip-text text-transparent
              tracking-tight leading-tight
            `}
          >
            Autorizar Notificações
          </h1>
        </div>

        <Card className="border-neutral-200/20 dark:border-neutral-800/50 bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-sm p-8 space-y-6 motion-preset-expand motion-delay-[200ms]">
          {stage === "loading" && (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <FiLoader className="w-8 h-8 text-emerald-500 animate-spin" />
              <p className="text-neutral-600 dark:text-neutral-400">Verificando link de autorização...</p>
            </div>
          )}

          {stage === "redirecting" && (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <FiLoader className="w-8 h-8 text-emerald-500 animate-spin" />
              <p className="text-neutral-600 dark:text-neutral-400">
                Você precisa entrar com o Discord para continuar. Redirecionando para o login...
              </p>
            </div>
          )}

          {stage === "invalid" && (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center">
                <FiAlertTriangle className="w-7 h-7 text-red-500" />
              </div>
              <h2 className={`${poppins.className} text-xl font-semibold text-neutral-900 dark:text-white`}>
                Link inválido ou expirado
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-md">
                Este link de autorização não é mais válido. Gere um novo link pelo menu de Integrações do bot no
                Discord.
              </p>
            </div>
          )}

          {(stage === "ready" || stage === "confirming") && preview && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <FiShield className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h2 className={`${poppins.className} text-xl font-semibold text-neutral-900 dark:text-white mb-1`}>
                    {preview.guildName ?? `Servidor ${preview.guildId}`}
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Este servidor quer enviar notificações no seu navegador sempre que uma venda for realizada.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-neutral-200/20 dark:border-neutral-800/50 bg-neutral-100/50 dark:bg-neutral-800/30 p-4 text-sm text-neutral-600 dark:text-neutral-400">
                Ao autorizar, você permite que a ShopEasy envie notificações push para este navegador em nome deste
                servidor. Você pode revogar essa autorização a qualquer momento pelo Discord.
              </div>

              <button
                type="button"
                onClick={handleAuthorize}
                disabled={stage === "confirming"}
                className={cn(
                  `${jetbrains.className} group relative w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium shadow-lg transition-all hover:shadow-emerald-500/25 hover:shadow-2xl active:opacity-90 duration-300`,
                  stage === "confirming" ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02] cursor-pointer",
                )}
              >
                {stage === "confirming" ? (
                  <>
                    <FiLoader className="w-5 h-5 animate-spin" />
                    Autorizando...
                  </>
                ) : (
                  <>
                    <FiBell className="w-5 h-5" />
                    Autorizar Notificações
                  </>
                )}
              </button>
            </div>
          )}

          {stage === "success" && (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <FiCheckCircle className="w-7 h-7 text-emerald-500" />
              </div>
              <h2 className={`${poppins.className} text-xl font-semibold text-neutral-900 dark:text-white`}>
                Notificações ativadas com sucesso
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-md">
                Você vai receber uma notificação neste navegador sempre que uma venda for realizada neste servidor.
              </p>
            </div>
          )}

          {stage === "success-no-push" && (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <FiCheckCircle className="w-7 h-7 text-emerald-500" />
              </div>
              <h2 className={`${poppins.className} text-xl font-semibold text-neutral-900 dark:text-white`}>
                Autorização confirmada
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-md">
                {errorMessage ||
                  "A autorização foi confirmada, mas não foi possível ativar notificações push neste navegador. Você pode tentar novamente mais tarde por este mesmo link."}
              </p>
            </div>
          )}

          {stage === "denied" && (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div className="w-14 h-14 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <FiAlertTriangle className="w-7 h-7 text-yellow-500" />
              </div>
              <h2 className={`${poppins.className} text-xl font-semibold text-neutral-900 dark:text-white`}>
                Permissão de notificação negada
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-md">
                A autorização foi confirmada, mas o navegador não tem permissão para exibir notificações. Ative as
                notificações para este site nas configurações do navegador e volte a este link para tentar
                novamente.
              </p>
            </div>
          )}

          {stage === "error" && (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center">
                <FiAlertTriangle className="w-7 h-7 text-red-500" />
              </div>
              <h2 className={`${poppins.className} text-xl font-semibold text-neutral-900 dark:text-white`}>
                Não foi possível autorizar
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-md">{errorMessage}</p>
            </div>
          )}
        </Card>
      </div>

      <GridDecoration
        width={60}
        height={60}
        className={cn("[mask-image:linear-gradient(-160deg,white,transparent,transparent)] opacity-30")}
      />
    </main>
  )
}
