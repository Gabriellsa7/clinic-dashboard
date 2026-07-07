"use client"

import { Protected } from "@/components/auth/protected"
import { AppShell } from "@/components/layout/app-shell"
import { EmptyState } from "@/components/layout/empty-state"
import { CalendarIcon } from "@/components/icons"

export default function SchedulePage() {
  return (
    <Protected role="doctor">
      <AppShell title="Schedule" subtitle="Sua agenda de consultas.">
        <EmptyState
          icon={CalendarIcon}
          title="Agenda em breve"
          description="Aqui você poderá visualizar e organizar seus horários de atendimento."
        />
      </AppShell>
    </Protected>
  )
}
