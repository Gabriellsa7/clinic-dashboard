"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/providers/auth-provider"

export default function HomePage() {
  const router = useRouter()
  const { user, loading, isDoctor, isAdmin } = useAuth()

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.replace("/login")
      return
    }
    if (isDoctor) router.replace("/painel")
    else if (isAdmin) router.replace("/unidades")
    // Regular USER accounts have no dashboard access.
    else router.replace("/login")
  }, [loading, user, isDoctor, isAdmin, router])

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  )
}
