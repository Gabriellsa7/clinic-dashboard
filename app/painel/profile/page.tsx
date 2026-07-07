"use client"

import { Protected } from "@/components/auth/protected"
import { AppShell } from "@/components/layout/app-shell"
import { useAuth } from "@/components/providers/auth-provider"

export default function ProfilePage() {
  const { healthProfessional } = useAuth()

  return (
    <Protected role="doctor">
      <AppShell title="Profile" subtitle="Suas informações de conta.">
        <div className="mx-auto max-w-xl rounded-3xl bg-card p-8 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
              {healthProfessional?.name?.slice(0, 2).toUpperCase() ?? "DR"}
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{healthProfessional?.name}</p>
              <p className="text-sm text-muted-foreground">{healthProfessional?.email}</p>
            </div>
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-muted/50 p-4">
              <dt className="text-xs font-semibold uppercase text-muted-foreground">Especialidade</dt>
              <dd className="mt-1 font-semibold text-foreground">{healthProfessional?.specialty ?? "—"}</dd>
            </div>
            <div className="rounded-2xl bg-muted/50 p-4">
              <dt className="text-xs font-semibold uppercase text-muted-foreground">Status</dt>
              <dd className="mt-1 font-semibold text-foreground">
                {healthProfessional?.active === false ? "Inativo" : "Ativo"}
              </dd>
            </div>
          </dl>
        </div>
      </AppShell>
    </Protected>
  )
}
