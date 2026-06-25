"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface User {
  id: string
  username: string
  globalName: string
  avatar: string | null
  avatarUrl: string
  email?: string
}

interface UserContextValue {
  user: User | null
  loading: boolean
  logout: () => Promise<void>
}

const TEST_USER: User = {
  id: "000000000000000001",
  username: "testuser",
  globalName: "Usuário Teste",
  avatar: null,
  avatarUrl: "https://cdn.discordapp.com/embed/avatars/0.png",
  email: "teste@shopeasy.site",
}

const UserContext = createContext<UserContextValue>({ user: null, loading: true, logout: async () => {} })

export function UserProvider({ children }: { children: ReactNode }) {
  const isTestMode = process.env.NEXT_PUBLIC_TEST_MODE === "true"

  const [user, setUser] = useState<User | null>(isTestMode ? TEST_USER : null)
  const [loading, setLoading] = useState(!isTestMode)

  useEffect(() => {
    if (isTestMode) return
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [isTestMode])

  async function logout() {
    if (isTestMode) { setUser(null); return }
    await fetch("/api/auth/logout", { method: "POST" })
    setUser(null)
  }

  return <UserContext.Provider value={{ user, loading, logout }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
