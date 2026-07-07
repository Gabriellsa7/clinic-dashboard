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
  const { user, loading, isDoctor } = useAuth()

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.replace("/login")
      return
    }
    if (role === "doctor" && !isDoctor) {
      router.replace("/unidades")
      return
    }
    if (role === "manager" && isDoctor) {
      router.replace("/painel")
    }
  }, [loading, user, isDoctor, role, router])

  if (loading || !user) return <Loader />
  if (role === "doctor" && !isDoctor) return <Loader />
  if (role === "manager" && isDoctor) return <Loader />

  return <>{children}</>
}
