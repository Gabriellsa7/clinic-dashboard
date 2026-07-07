"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { TOKEN_KEY, USER_KEY } from "@/lib/api"
import { authService } from "@/lib/services/auth"
import { EUserRole, type IUser } from "@/lib/types"

interface AuthContextValue {
  user: IUser | null
  token: string | null
  loading: boolean
  isDoctor: boolean
  isAdmin: boolean
  login: (token: string, user: IUser) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<IUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Bootstrap session from stored token + cached user (optimistic hydration).
  useEffect(() => {
    if (typeof window === "undefined") return
    const storedToken = localStorage.getItem(TOKEN_KEY)
    const storedUser = localStorage.getItem(USER_KEY)

    if (!storedToken) {
      setLoading(false)
      return
    }

    setToken(storedToken)
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser) as IUser)
      } catch {
        localStorage.removeItem(USER_KEY)
      }
    }
    // We already have a usable session; stop blocking the UI.
    setLoading(false)

    // Revalidate the session in the background against the backend.
    authService
      .me()
      .then((u) => {
        setUser(u)
        localStorage.setItem(USER_KEY, JSON.stringify(u))
      })
      .catch(() => {
        // The response interceptor handles 401 redirects; ignore other errors
        // so an offline backend doesn't kick the user out of a cached session.
      })
  }, [])

  const login = useCallback((newToken: string, newUser: IUser) => {
    localStorage.setItem(TOKEN_KEY, newToken)
    localStorage.setItem(USER_KEY, JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setToken(null)
    setUser(null)
    router.push("/login")
  }, [router])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      loading,
      // Doctors have no role; they are flagged with isDoctor by the backend.
      isDoctor: user?.isDoctor === true,
      isAdmin: user?.role === EUserRole.ADMIN,
      login,
      logout,
    }),
    [user, token, loading, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}
