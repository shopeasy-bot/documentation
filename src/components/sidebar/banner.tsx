"use client"

import Link from "next/link"
import { FaYoutube } from "react-icons/fa"
import { Poppins } from "next/font/google"

const poppins = Poppins({ subsets: ["latin"], weight: "500" })

export function SidebarBanner() {
  return (
    <div className="mt-4 p-3 relative overflow-hidden rounded-xl border border-red-500/20 backdrop-blur-sm bg-gradient-to-br from-red-500/5 to-transparent shadow-md shadow-red-500/10">
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(239, 68, 68, 0.08) 0%, transparent 70%)",
          maskImage:
            "radial-gradient(circle at top left, white 25%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle at top left, white 25%, transparent 75%)",
        }}
      />

      <div className="relative z-10 flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 bg-red-500/10 rounded-full">
          <FaYoutube className="w-4 h-4 text-red-400" />
        </div>

        <div className="flex flex-col">
          <span
            className={`${poppins.className} text-neutral-100 font-medium text-sm leading-tight`}
          >
            Tutorial no YouTube
          </span>

          <Link
            href="https://youtu.be/-bWY9WApNgU?si=A_PU75zHDMeZzykl"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-0.5 text-red-400 text-xs font-semibold hover:underline transition-all"
          >
            Assistir agora →
          </Link>
        </div>
      </div>
    </div>
  )
}
