import { GridDecoration } from "@/components/decoration/Grid"
import { FlareDecoration } from "@/components/decoration/Flare"
import { cn } from "@/lib/cn"
import { JetBrains_Mono, Poppins } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { FiFileText, FiTerminal, FiZap } from "react-icons/fi"
import AnimatedShinyText from "@/components/ui/animaty-text"
import { FaPlus } from "react-icons/fa"
import { Badge } from "@/components/ui/badge"

const poppins = Poppins({ subsets: ["latin"], weight: "500" })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: "500" })

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col z-10 items-center justify-center text-center gap-16 px-4">
      <FlareDecoration />

      <div className="motion-preset-expand motion-delay-[100ms]">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-lg"></div>
          <Badge
            variant="outline"
            className="relative bg-emerald-500/10 border-emerald-500/30 text-emerald-400 px-6 py-2 text-sm font-medium backdrop-blur-sm hover:bg-emerald-500/20 transition-all duration-300"
          >
            <FiZap className="w-4 h-4 mr-2 animate-pulse" />
          Agora com IA
          </Badge>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 motion-preset-expand motion-delay-[200ms]">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl"></div>
          <Image src={"/shopeasy.svg"} alt="logo" width={124} height={124} className="relative z-10" />
        </div>
        <h1
          className={`${poppins.className} text-4xl lg:text-7xl uppercase bg-gradient-to-r 
            dark:from-white from-black dark:to-neutral-400 to-neutral-500 bg-clip-text text-transparent
            tracking-tight leading-none
          `}
        >
          SHOPEASY
        </h1>
      </div>

      <div className="max-w-4xl motion-preset-expand motion-delay-[300ms]">
        <p className="text-lg lg:text-2xl font-light text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Automatize suas vendas no Discord com o{" "}
          <span className="font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            ShopEasy
          </span>
          <br />
          <span className="text-base lg:text-xl text-neutral-500 dark:text-neutral-400">
            Gratuito, Fácil, e Seguro 
          </span>
        </p>
      </div>

      <div className="flex flex-col w-fit motion-preset-expand motion-delay-[400ms]">
        <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
          <Link
            href="/invite"
            target="_blank"
            className={`${jetbrains.className} group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium shadow-lg transition-all hover:shadow-emerald-500/25 hover:shadow-2xl active:opacity-90 hover:scale-105 duration-300`}
          >
            <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.3),rgba(255,255,255,0))] group-hover:translate-x-full duration-500" />
            <FaPlus className="w-4 h-4" />
            Adicionar ao Discord
            <svg
              className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <div
            className={`${jetbrains.className} group rounded-full border border-neutral-200/20 bg-neutral-100/10 backdrop-blur-sm text-base transition-all ease-in hover:cursor-pointer hover:bg-neutral-100/20 dark:border-neutral-800/50 dark:bg-neutral-900/50 dark:hover:bg-neutral-800/50 hover:scale-105 duration-300`}
          >
            <AnimatedShinyText className="flex items-center justify-center px-8 py-4 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 text-neutral-700 dark:text-slate-50">
              <Link href="/docs" className="flex items-center gap-3">
                <FiFileText className="w-5 h-5 opacity-90" />
                Documentação
                <svg
                  className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </AnimatedShinyText>
          </div>
        </div>
      </div>
   
      <GridDecoration
        width={60}
        height={60}
        className={cn("[mask-image:linear-gradient(-160deg,white,transparent,transparent)] opacity-30")}
      />
    </main>
  )
}
