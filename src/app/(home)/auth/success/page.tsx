"use client"

import Link from "next/link"
import { Poppins, JetBrains_Mono } from "next/font/google"
import { cn } from "@/lib/cn"

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] })

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1569 2.4189z" />
    </svg>
  )
}

function GridDecoration({ width = 60, height = 60, className }: { width?: number; height?: number; className?: string }) {
  return (
    <div
      className={cn("pointer-events-none fixed inset-0 z-0", className)}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: `${width}px ${height}px`,
      }}
    />
  )
}

function FlareDecoration() {
  return (
    <>
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] md:w-[800px] md:h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-emerald-500/3 rounded-full blur-3xl" />
    </>
  )
}

function SuccessCheck() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
      <div className="relative z-10 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center backdrop-blur-sm">
        <svg
          className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
            style={{
              strokeDasharray: 24,
              strokeDashoffset: 24,
              animation: "draw 0.6s ease-out 0.3s forwards",
            }}
          />
        </svg>
      </div>
      <style jsx>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <main className="flex flex-1 min-h-screen flex-col z-10 items-center justify-center text-center gap-8 md:gap-12 lg:gap-16 px-6 md:px-8 py-12 bg-neutral-950 relative overflow-hidden">
      <FlareDecoration />

      {/* Animated Check */}
      <div className="animate-expand delay-100">
        <SuccessCheck />
      </div>

      {/* Title */}
      <div className="flex flex-col items-center gap-3 md:gap-4 animate-expand delay-200">
        <h1
          className={`${poppins.className} text-2xl md:text-4xl lg:text-6xl uppercase bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent tracking-tight leading-none text-balance`}
        >
          Login realizado!
        </h1>
      </div>

      {/* Description */}
      <div className="max-w-sm md:max-w-xl lg:max-w-3xl animate-expand delay-300">
        <p className="text-base md:text-lg lg:text-2xl font-light text-neutral-300 leading-relaxed">
          {'Bem-vindo ao '}
          <span className="font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            ShopEasy
          </span>
          {'!'}
          <br />
          <span className="text-sm md:text-base lg:text-xl text-neutral-400 leading-relaxed">
            {'Voce foi adicionado ao nosso servidor do Discord para ficar informado sobre '}
            <span className="text-emerald-400/80 font-medium">{'atualizacoes'}</span>
            {' e '}
            <span className="text-emerald-400/80 font-medium">{'avisos'}</span>
            {'.'}
          </span>
        </p>
      </div>

      {/* Info Cards */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full max-w-sm md:max-w-lg animate-expand delay-400">
        <div className="flex items-center gap-3 px-4 md:px-6 py-3 md:py-4 rounded-2xl border border-neutral-800/50 bg-neutral-900/50 backdrop-blur-sm flex-1">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
            <DiscordIcon className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
          </div>
          <div className="text-left">
            <p className="text-xs md:text-sm font-medium text-neutral-200">Servidor Discord</p>
            <p className="text-[10px] md:text-xs text-neutral-500">Adicionado com sucesso</p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 md:px-6 py-3 md:py-4 rounded-2xl border border-neutral-800/50 bg-neutral-900/50 backdrop-blur-sm flex-1">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-xs md:text-sm font-medium text-neutral-200">Notificacoes</p>
            <p className="text-[10px] md:text-xs text-neutral-500">Ativadas automaticamente</p>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="animate-expand delay-500">
        <Link
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
        </Link>
      </div>

      <GridDecoration
        width={60}
        height={60}
        className={cn("[mask-image:linear-gradient(-160deg,white,transparent,transparent)] opacity-30")}
      />
    </main>
  )
}
