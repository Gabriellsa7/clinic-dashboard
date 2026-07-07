"use client"

import { useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/providers/auth-provider"

function Loader() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  )
}

export function Protected({
  role,
  children,
}: {
  role?: "doctor" | "manager"
  children: ReactNode
}) {
  const router = useRouter()
  const { user, loading, isDoctor, isAdmin } = useAuth()

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.replace("/login")
      return
    }
    // Doctor area: only users flagged as doctors may enter.
    if (role === "doctor" && !isDoctor) {
      router.replace(isAdmin ? "/unidades" : "/login")
      return
    }
    // Manager area: doctors go to their panel, and non-admin users (USER) are
    // not allowed in at all.
    if (role === "manager") {
      if (isDoctor) {
        router.replace("/painel")
        return
      }
      if (!isAdmin) {
        router.replace("/login")
      }
    }
  }, [loading, user, isDoctor, isAdmin, role, router])

  if (loading || !user) return <Loader />
  if (role === "doctor" && !isDoctor) return <Loader />
  if (role === "manager" && (isDoctor || !isAdmin)) return <Loader />

  return <>{children}</>
}
