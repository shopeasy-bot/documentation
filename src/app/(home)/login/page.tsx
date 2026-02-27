"use client"

import { useEffect, useState } from "react"
import { Poppins, JetBrains_Mono } from "next/font/google"
import { cn } from "@/lib/cn"

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] })

export default function RedirectPage() {
  const [status, setStatus] = useState<"loading" | "redirecting" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    async function fetchAuthUrl() {
      try {
        const response = await fetch("/api/auth/discord")
        const data = await response.json()

        if (!response.ok || !data.url) {
          setStatus("error")
          setErrorMessage("Nao foi possivel obter a URL de autenticacao.")
          return
        }

        setStatus("redirecting")

        await new Promise((resolve) => setTimeout(resolve, 2000))

        window.location.href = data.url
      } catch {
        setStatus("error")
        setErrorMessage("Erro ao conectar com o servidor.")
      }
    }

    fetchAuthUrl()
  }, [])

  return (
    <main className="flex flex-1 min-h-screen flex-col z-10 items-center justify-center text-center gap-8 md:gap-12 lg:gap-16 px-6 md:px-8 py-12 bg-neutral-950 relative overflow-hidden">
      {/* Flare decorations */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] md:w-[800px] md:h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-emerald-500/3 rounded-full blur-3xl" />

      {/* Spinner icon */}
      <div className="animate-expand delay-100">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
          <div className="relative z-10 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center backdrop-blur-sm">
            {/* Discord icon */}
            <svg className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 text-emerald-400 animate-bounce-slow" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1569 2.4189z" />
            </svg>
          </div>
          {/* Spinning ring */}
          <div className="absolute inset-0 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full border-2 border-transparent border-t-emerald-400/60 animate-spin-slow" />
        </div>
      </div>

      {/* Title */}
      <div className="flex flex-col items-center gap-3 md:gap-4 animate-expand delay-200">
        <h1
          className={`${poppins.className} text-2xl md:text-4xl lg:text-6xl uppercase bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent tracking-tight leading-none text-balance`}
        >
          {status === "error" ? "Erro!" : "Redirecionando..."}
        </h1>
      </div>

      {/* Description */}
      <div className="max-w-sm md:max-w-xl lg:max-w-3xl animate-expand delay-300">
        {status === "error" ? (
          <p className="text-base md:text-lg lg:text-2xl font-light text-neutral-300 leading-relaxed">
            {errorMessage}
            <br />
            <span className="text-sm md:text-base lg:text-xl text-neutral-400 leading-relaxed">
              {'Tente novamente mais tarde ou volte ao '}
              <span className="text-emerald-400/80 font-medium">{'inicio'}</span>
              {'.'}
            </span>
          </p>
        ) : (
          <p className="text-base md:text-lg lg:text-2xl font-light text-neutral-300 leading-relaxed">
            {'Voce esta sendo redirecionado para o '}
            <span className="font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              Discord
            </span>
            {'.'}
            <br />
            <span className="text-sm md:text-base lg:text-xl text-neutral-400 leading-relaxed">
              {'Aguarde enquanto preparamos a pagina de '}
              <span className="text-emerald-400/80 font-medium">{'login'}</span>
              {' para voce.'}
            </span>
          </p>
        )}
      </div>

      {/* Loading dots - only show when not error */}
      {status !== "error" && (
        <div className="flex items-center gap-2 animate-expand delay-400">
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-emerald-400/60 animate-loading-dot" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-emerald-400/60 animate-loading-dot" style={{ animationDelay: "200ms" }} />
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-emerald-400/60 animate-loading-dot" style={{ animationDelay: "400ms" }} />
        </div>
      )}

      {/* Info card */}
      <div className="flex flex-col gap-3 md:gap-4 w-full max-w-sm md:max-w-md animate-expand delay-500">
        <div className="flex items-center gap-3 px-4 md:px-6 py-3 md:py-4 rounded-2xl border border-neutral-800/50 bg-neutral-900/50 backdrop-blur-sm">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-xs md:text-sm font-medium text-neutral-200">Conexao segura</p>
            <p className={`${jetbrains.className} text-[10px] md:text-xs text-neutral-500`}>Discord OAuth2</p>
          </div>
        </div>
      </div>

      {/* Error: back button */}
      {status === "error" && (
        <div className="animate-expand delay-600">
          <a
            href="/"
            className={`${jetbrains.className} group inline-flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full border border-neutral-800/50 bg-neutral-900/50 backdrop-blur-sm text-sm md:text-base transition-all ease-in hover:cursor-pointer hover:bg-neutral-800/50 hover:scale-105 duration-300 text-neutral-50`}
          >
            <svg className="w-4 h-4 md:w-5 md:h-5 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Voltar ao Inicio
            <svg
              className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      )}

      {/* Grid decoration */}
      <div
        className={cn(
          "pointer-events-none fixed inset-0 z-0",
          "[mask-image:linear-gradient(-160deg,white,transparent,transparent)] opacity-30"
        )}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </main>
  )
}
