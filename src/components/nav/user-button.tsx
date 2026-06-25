"use client"

import { useUser } from "@/context/user"
import { JetBrains_Mono } from "next/font/google"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { FiLogIn, FiLogOut } from "react-icons/fi"

const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: "500" })

export function UserButton() {
  const { user, loading, logout } = useUser()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [])

  if (loading) {
    return <div className="w-8 h-8 rounded-full bg-neutral-800 animate-pulse" />
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="group relative inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-medium shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-emerald-500/30 hover:shadow-xl hover:scale-105 active:scale-95"
      >
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.25),rgba(255,255,255,0))] group-hover:translate-x-full duration-500 transition-transform" />
        <FiLogIn className="w-4 h-4 relative z-10" />
        <span className="relative z-10">Login</span>
      </Link>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-700/50 bg-neutral-900/50 backdrop-blur-sm hover:bg-neutral-800/60 transition-all duration-200"
      >
        <Image
          src={user.avatarUrl}
          alt={user.globalName}
          width={24}
          height={24}
          className="rounded-full"
          unoptimized
        />
        <span className={`${jetbrains.className} text-xs text-neutral-200 max-w-[100px] truncate`}>
          {user.globalName}
        </span>
        <svg
          className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-neutral-700/50 bg-neutral-900/95 backdrop-blur-sm shadow-xl overflow-hidden z-50">
          <div className="px-3 py-2.5 border-b border-neutral-800/80">
            <p className="text-xs font-medium text-neutral-300 truncate">{user.globalName}</p>
            <p className="text-[10px] text-neutral-500 truncate">@{user.username}</p>
          </div>
          <div className="p-1">
            <button
              onClick={async () => {
                setOpen(false)
                await logout()
              }}
              className={`${jetbrains.className} flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 transition-all duration-150`}
            >
              <FiLogOut className="w-3.5 h-3.5" />
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
