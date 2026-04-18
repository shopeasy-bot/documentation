import { GridDecoration } from "@/components/decoration/Grid"
import { FlareDecoration } from "@/components/decoration/Flare"
import { cn } from "@/lib/cn"
import { JetBrains_Mono, Poppins } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { FiFileText } from "react-icons/fi"
import AnimatedShinyText from "@/components/ui/animaty-text"
import { FaPlus, FaYoutube } from "react-icons/fa"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ShopEasy - Bot de Vendas Gratuito para Discord",
  description: "Crie sua loja virtual no Discord em minutos. Bot de vendas gratuito, sem taxas, com suporte a PIX, cartão e criptomoedas.",
  openGraph: {
    title: "ShopEasy - Bot de Vendas Gratuito para Discord",
    description: "Crie sua loja virtual no Discord em minutos. Bot de vendas gratuito, sem taxas, com suporte a PIX, cartão e criptomoedas.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
  },
  twitter: {
    title: "ShopEasy - Bot de Vendas Gratuito para Discord",
    description: "Crie sua loja virtual no Discord em minutos. Bot de vendas gratuito, sem taxas, com suporte a PIX, cartão e criptomoedas.",
  },
}

const poppins = Poppins({ subsets: ["latin"], weight: "500" })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: "500" })

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col z-10 items-center justify-center text-center gap-16 px-4">
      <FlareDecoration />

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 motion-preset-expand motion-delay-[100ms]">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl"></div>
          <Image src={"/shopeasy.svg"} alt="logo" width={124} height={124} className="relative z-10" />
        </div>
        <div className="flex flex-col items-center md:items-start gap-3">
          <h1
            className={`${poppins.className} text-4xl lg:text-7xl uppercase bg-gradient-to-r 
              dark:from-white from-black dark:to-neutral-400 to-neutral-500 bg-clip-text text-transparent
              tracking-tight leading-none
            `}
          >
            SHOPEASY
          </h1>

          {/* YouTube tutorial — ticker pill com flip de texto no hover */}
          <Link
            href="https://youtu.be/-bWY9WApNgU?si=A_PU75zHDMeZzykl"
            target="_blank"
            rel="noopener noreferrer"
            className={`${jetbrains.className} group flex items-center gap-2.5 px-4 py-1.5 rounded-full
              border border-neutral-200/30 dark:border-neutral-700/50
              bg-neutral-100/5 dark:bg-neutral-900/30
              backdrop-blur-sm
              hover:border-red-500/40 dark:hover:border-red-500/40
              hover:bg-red-500/5
              transition-all duration-300 ease-out
              text-neutral-500 dark:text-neutral-400
              text-xs tracking-wide
            `}
          >
            <FaYoutube className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
            <span className="relative h-4 overflow-hidden flex items-center">
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                novo tutorial disponível
              </span>
              <span className="absolute inset-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-red-500 dark:text-red-400">
                assistir agora →
              </span>
            </span>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl motion-preset-expand motion-delay-[200ms]">
        <p className="text-lg lg:text-2xl font-light text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Automatize suas vendas no Discord com o{" "}
          <span className="font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            ShopEasy
          </span>
          <br />
          <span className="text-base lg:text-xl text-neutral-500 dark:text-neutral-400">
            A solução completa para gerenciar sua loja no Discord. Configure em minutos, venda em segundos.
          </span>
        </p>
      </div>

      <div className="flex flex-col w-fit motion-preset-expand motion-delay-[300ms]">
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
