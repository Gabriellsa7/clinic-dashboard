"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/providers/auth-provider"

export default function HomePage() {
  const router = useRouter()
  const { user, loading, isDoctor } = useAuth()

  useEffect(() => {
    if (loading) return
    if (!user) router.replace("/login")
    else router.replace(isDoctor ? "/painel" : "/unidades")
  }, [loading, user, isDoctor, router])

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  )
}
