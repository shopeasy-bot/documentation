import { GridDecoration } from "@/components/decoration/Grid"
import { FlareDecoration } from "@/components/decoration/Flare"
import { cn } from "@/lib/cn"
import { JetBrains_Mono, Poppins } from "next/font/google"
import Link from "next/link"
import { FiHome, FiSearch } from "react-icons/fi"

const poppins = Poppins({ subsets: ["latin"], weight: "500" })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: "500" })

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col z-10 items-center justify-center text-center gap-16 px-4">
      <FlareDecoration />
      <GridDecoration
        width={60}
        height={60}
        className={cn("[mask-image:linear-gradient(-160deg,white,transparent,transparent)] opacity-30")}
      />

      <div className="flex flex-col items-center gap-6 motion-preset-expand motion-delay-[100ms]">
        <div className="text-8xl lg:text-9xl font-bold text-emerald-400 animate-pulse mb-4">404</div>
        <h1
          className={`${poppins.className} text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r 
            dark:from-white from-black dark:to-neutral-400 to-neutral-500 bg-clip-text text-transparent
            tracking-tight leading-none
          `}
        >
          Página Não Encontrada
        </h1>
        <p className="text-lg lg:text-xl font-light text-neutral-600 dark:text-neutral-300 max-w-2xl">
          Ops! A página que você está procurando não existe ou foi movida.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-fit motion-preset-expand motion-delay-[200ms]">
        <Link
          href="/"
          className={`${jetbrains.className} group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-700 text-white font-medium shadow-xl transition-all hover:shadow-emerald-500/30 hover:shadow-2xl active:opacity-90 hover:scale-105 duration-300 border border-emerald-500/20`}
        >
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.4),rgba(255,255,255,0))] group-hover:translate-x-full duration-700" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <FiHome className="w-5 h-5 relative z-10" />
          <span className="relative z-10">Voltar ao Início</span>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </Link>
      </div>

      
    </main>
  )
}
