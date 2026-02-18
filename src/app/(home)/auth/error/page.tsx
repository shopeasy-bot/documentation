"use client"

import Link from "next/link"
import { Poppins, JetBrains_Mono } from "next/font/google"
import { cn } from "@/lib/cn"

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] })

export default function ErrorAuthPage() {
  return (
    <main className="flex flex-1 min-h-screen flex-col z-10 items-center justify-center text-center gap-8 md:gap-12 lg:gap-16 px-6 md:px-8 py-12 bg-neutral-950 relative overflow-hidden">
      {/* Flare decorations */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] md:w-[800px] md:h-[600px] bg-red-500/5 rounded-full blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-red-500/3 rounded-full blur-3xl" />

      {/* Error X icon */}
      <div className="animate-expand delay-100">
        <div className="relative">
          <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse" />
          <div className="relative z-10 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center backdrop-blur-sm">
            <svg
              className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6"
                style={{
                  strokeDasharray: 20,
                  strokeDashoffset: 20,
                  animation: "draw 0.5s ease-out 0.3s forwards",
                }}
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6l12 12"
                style={{
                  strokeDasharray: 20,
                  strokeDashoffset: 20,
                  animation: "draw 0.5s ease-out 0.5s forwards",
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
      </div>

      {/* Title */}
      <div className="flex flex-col items-center gap-3 md:gap-4 animate-expand delay-200">
        <h1
          className={`${poppins.className} text-2xl md:text-4xl lg:text-6xl uppercase bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent tracking-tight leading-none text-balance`}
        >
          Falha na autenticacao
        </h1>
      </div>

      {/* Description */}
      <div className="max-w-sm md:max-w-xl lg:max-w-3xl animate-expand delay-300">
        <p className="text-base md:text-lg lg:text-2xl font-light text-neutral-300 leading-relaxed">
          {'Nao foi possivel conectar com o '}
          <span className="font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Discord
          </span>
          {'.'}
          <br />
          <span className="text-sm md:text-base lg:text-xl text-neutral-400 leading-relaxed">
            {'Ocorreu um erro durante o processo de login. Verifique sua conexao e '}
            <span className="text-red-400/80 font-medium">{'tente novamente'}</span>
            {'.'}
          </span>
        </p>
      </div>

      {/* Error info cards */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full max-w-sm md:max-w-lg animate-expand delay-400">
        <div className="flex items-center gap-3 px-4 md:px-6 py-3 md:py-4 rounded-2xl border border-neutral-800/50 bg-neutral-900/50 backdrop-blur-sm flex-1">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-xs md:text-sm font-medium text-neutral-200">Conexao falhou</p>
            <p className="text-[10px] md:text-xs text-neutral-500">Discord OAuth indisponivel</p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 md:px-6 py-3 md:py-4 rounded-2xl border border-neutral-800/50 bg-neutral-900/50 backdrop-blur-sm flex-1">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-xs md:text-sm font-medium text-neutral-200">Tente novamente</p>
            <p className="text-[10px] md:text-xs text-neutral-500">Ou entre em contato</p>
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
