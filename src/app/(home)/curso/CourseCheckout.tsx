"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import Link from "next/link"
import { useUser } from "@/context/user"
import { cn } from "@/lib/cn"
import { FiCheck, FiZap } from "react-icons/fi"

const COURSE_ID = "vendas-discord"

interface CourseAccessContextValue {
  hasAccess: boolean
  checkingAccess: boolean
}

const CourseAccessContext = createContext<CourseAccessContextValue>({ hasAccess: false, checkingAccess: true })

export function useCourseAccess() {
  return useContext(CourseAccessContext)
}

/** Só sabe se o usuário logado já tem acesso — nenhuma ação de pagamento vive aqui. */
export function CourseAccessProvider({ children }: { children: ReactNode }) {
  const { user, loading: userLoading } = useUser()
  const [hasAccess, setHasAccess] = useState(false)
  const [checkingAccess, setCheckingAccess] = useState(true)

  useEffect(() => {
    if (userLoading) return
    if (!user) { setCheckingAccess(false); return }

    fetch(`/api/courses/${COURSE_ID}/access`)
      .then((r) => (r.ok ? r.json() : { hasAccess: false }))
      .then((data) => setHasAccess(Boolean(data?.hasAccess)))
      .catch(() => setHasAccess(false))
      .finally(() => setCheckingAccess(false))
  }, [user, userLoading])

  return (
    <CourseAccessContext.Provider value={{ hasAccess, checkingAccess }}>
      {children}
    </CourseAccessContext.Provider>
  )
}

interface CourseCtaLinkProps {
  className: string
  label: string
  labelAlreadyOwned?: string
}

/** CTA único da página do curso — só leva pro checkout dedicado, onde o método (PIX/cartão) é escolhido. */
export function CourseCtaLink({ className, label, labelAlreadyOwned = "Você já garantiu seu acesso" }: CourseCtaLinkProps) {
  const { hasAccess } = useCourseAccess()

  if (hasAccess) {
    return (
      <div className={cn(className, "opacity-90 pointer-events-none")}>
        <FiCheck className="w-4 h-4 relative z-10" />
        <span className="relative z-10">{labelAlreadyOwned}</span>
      </div>
    )
  }

  return (
    <Link href="/curso/checkout" className={className}>
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.3),rgba(255,255,255,0))] group-hover:translate-x-full duration-700" />
      <FiZap className="w-4 h-4 relative z-10" />
      <span className="relative z-10">{label}</span>
    </Link>
  )
}
