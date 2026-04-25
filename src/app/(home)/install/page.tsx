import { cn } from "@/lib/cn"
import { Poppins } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { FaAndroid, FaDownload, FaCrown, FaShieldAlt, FaBolt } from "react-icons/fa"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

export default function InstallPage() {
  return (
    <main className={`${poppins.className} fixed inset-0 flex items-center justify-center overflow-hidden bg-[#0a0a0a]`}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),transparent)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-3xl" />
      
      {/* Main Card */}
      <div className="relative z-10 w-full max-w-2xl mx-4">
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent backdrop-blur-xl p-8 lg:p-12">
          {/* Glow Effect */}
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-emerald-500/20 via-transparent to-transparent opacity-50" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <FaCrown className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Exclusivo Plano Completo</span>
            </div>

            {/* Logo */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-emerald-500/30 rounded-3xl blur-2xl scale-150" />
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 p-4 shadow-2xl shadow-emerald-500/30">
                <Image src="/shopeasy.svg" alt="ShopEasy" fill className="p-3" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">
              ShopEasy
            </h1>
            <p className="text-neutral-400 text-lg mb-8">
              Seu app de compras inteligente
            </p>

            {/* Features Row */}
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-neutral-300">
                <FaAndroid className="w-5 h-5 text-emerald-400" />
                <span className="text-sm">Android</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2 text-neutral-300">
                <FaShieldAlt className="w-4 h-4 text-emerald-400" />
                <span className="text-sm">Seguro</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2 text-neutral-300">
                <FaBolt className="w-4 h-4 text-emerald-400" />
                <span className="text-sm">Rápido</span>
              </div>
            </div>

            {/* Download Button */}
            <Link
              href="https://seu-link-do-apk.com/shopeasy.apk"
              target="_blank"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold text-lg shadow-2xl shadow-emerald-500/30 transition-all hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98] duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <FaDownload className="w-5 h-5" />
              <span>Baixar para Android</span>
            </Link>

            {/* Version Info */}
            <p className="text-neutral-500 text-xs mt-6">
              Versão 1.0.0 • 12MB
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
