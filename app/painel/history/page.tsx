"use client"

import { Protected } from "@/components/auth/protected"
import { AppShell } from "@/components/layout/app-shell"
import { EmptyState } from "@/components/layout/empty-state"
import { HistoryIcon } from "@/components/icons"

export default function HistoryPage() {
  return (
    <Protected role="doctor">
      <AppShell title="History" subtitle="Histórico de atendimentos concluídos.">
        <EmptyState
          icon={HistoryIcon}
          title="Histórico em breve"
          description="Aqui você verá o histórico completo dos atendimentos realizados."
        />
      </AppShell>
    </Protected>
  )
}
