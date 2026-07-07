"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { TOKEN_KEY, USER_KEY, HEALTH_PROFESSIONAL_KEY } from "@/lib/api"
import { authService } from "@/lib/services/auth"
import { EUserRole, type IHealthProfessional, type IUser } from "@/lib/types"

interface AuthContextValue {
  user: IUser | null
  healthProfessional: IHealthProfessional | null
  token: string | null
  loading: boolean
  isDoctor: boolean
  isAdmin: boolean
  login: (token: string, account: { user?: IUser; healthProfessional?: IHealthProfessional }) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<IUser | null>(null)
  const [healthProfessional, setHealthProfessional] = useState<IHealthProfessional | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Bootstrap session from stored token + cached account (optimistic hydration).
  useEffect(() => {
    if (typeof window === "undefined") return
    const storedToken = localStorage.getItem(TOKEN_KEY)
    const storedUser = localStorage.getItem(USER_KEY)
    const storedProfessional = localStorage.getItem(HEALTH_PROFESSIONAL_KEY)

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
    if (storedProfessional) {
      try {
        setHealthProfessional(JSON.parse(storedProfessional) as IHealthProfessional)
      } catch {
        localStorage.removeItem(HEALTH_PROFESSIONAL_KEY)
      }
    }
    // We already have a usable session; stop blocking the UI.
    setLoading(false)

    // Revalidate the session in the background against the backend.
    authService
      .me()
      .then((account) => {
        if (account.healthProfessional) {
          setHealthProfessional(account.healthProfessional)
          localStorage.setItem(HEALTH_PROFESSIONAL_KEY, JSON.stringify(account.healthProfessional))
        }
        if (account.user) {
          setUser(account.user)
          localStorage.setItem(USER_KEY, JSON.stringify(account.user))
        }
      })
      .catch(() => {
        // The response interceptor handles 401 redirects; ignore other errors
        // so an offline backend doesn't kick the user out of a cached session.
      })
  }, [])

  const login = useCallback<AuthContextValue["login"]>((newToken, account) => {
    localStorage.setItem(TOKEN_KEY, newToken)
    setToken(newToken)

    if (account.user) {
      localStorage.setItem(USER_KEY, JSON.stringify(account.user))
      setUser(account.user)
    }
    if (account.healthProfessional) {
      localStorage.setItem(HEALTH_PROFESSIONAL_KEY, JSON.stringify(account.healthProfessional))
      setHealthProfessional(account.healthProfessional)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(HEALTH_PROFESSIONAL_KEY)
    setToken(null)
    setUser(null)
    setHealthProfessional(null)
    router.push("/login")
  }, [router])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      healthProfessional,
      token,
      loading,
      // Doctors have no role; the flag lives on the health professional record.
      isDoctor: healthProfessional?.isDoctor === true,
      isAdmin: user?.role === EUserRole.ADMIN,
      login,
      logout,
    }),
    [user, healthProfessional, token, loading, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}
