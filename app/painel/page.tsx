"use client"

import { Protected } from "@/components/auth/protected"
import { AppShell } from "@/components/layout/app-shell"
import { DashboardView } from "@/components/dashboard/dashboard-view"

export default function PainelPage() {
  return (
    <Protected role="doctor">
      <AppShell
        title="Painel de Gestão"
        subtitle={
          <>
            Status da Clínica: <span className="font-semibold text-primary">Operação Normal</span>
          </>
        }
      >
        <DashboardView />
      </AppShell>
    </Protected>
  )
}
