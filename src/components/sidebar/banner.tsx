"use client"

import Link from "next/link"
import { FiZap } from "react-icons/fi"
import { Poppins } from "next/font/google"

const poppins = Poppins({ subsets: ["latin"], weight: "500" })

export function SidebarBanner() {
  return (
    <div
      className="mt-4 p-3 relative overflow-hidden rounded-xl border border-emerald-500/20 backdrop-blur-sm bg-gradient-to-br from-emerald-500/5 to-transparent shadow-md shadow-emerald-500/10"
    >
      {/* <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(16, 185, 129, 0.08) 0%, transparent 70%)",
          maskImage: "radial-gradient(circle at top left, white 25%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(circle at top left, white 25%, transparent 75%)",
        }}
      />

      <div className="relative z-10 flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 bg-emerald-500/10 rounded-full">
          <FiZap className="w-4.5 h-4.5 text-emerald-400 animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className={`${poppins.className} text-neutral-100 font-medium text-sm leading-tight`}>
            Agora com IA!
          </span>
          <Link
            href="/docs/ai"
            className="mt-0.5 text-emerald-400 text-xs font-semibold hover:underline transition-all"
          >
            Ver novidades →
          </Link>
        </div>
      </div> */}
    </div>
  )
}
