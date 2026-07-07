"use client"

import { useState } from "react"
import { Protected } from "@/components/auth/protected"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { HealthProfessionalForm } from "@/components/health/health-professional-form"
import { EmptyState } from "@/components/layout/empty-state"
import { useHealthProfessionals } from "@/lib/hooks/use-health"
import { StethoscopeIcon, PlusIcon } from "@/components/icons"

export default function ProfissionaisPage() {
  const [open, setOpen] = useState(false)
  const { data: pros, isLoading, isError } = useHealthProfessionals()

  return (
    <Protected role="manager">
      <AppShell
        title="Profissionais"
        subtitle="Cadastre e gerencie os médicos das suas unidades."
        headerRight={
          <Button size="sm" onClick={() => setOpen(true)}>
            <PlusIcon className="h-4 w-4" />
            Novo médico
          </Button>
        }
      >
        <div className="mx-auto max-w-5xl">
          {isLoading && (
            <div className="flex justify-center py-16">
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          )}

          {isError && (
            <EmptyState
              icon={StethoscopeIcon}
              title="Não foi possível carregar"
              description="Verifique se o backend está conectado e tente novamente."
            />
          )}

          {!isLoading && !isError && (!pros || pros.length === 0) && (
            <EmptyState
              icon={StethoscopeIcon}
              title="Nenhum profissional cadastrado"
              description="Clique em 'Novo médico' para cadastrar o primeiro profissional."
            />
          )}

          {pros && pros.length > 0 && (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pros.map((p) => (
                <li key={p._id} className="rounded-2xl bg-card p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <StethoscopeIcon className="h-5 w-5" />
                    </div>
                    <span
                      className={
                        p.active
                          ? "rounded-md bg-success/10 px-2 py-1 text-xs font-bold uppercase text-success"
                          : "rounded-md bg-muted px-2 py-1 text-xs font-bold uppercase text-muted-foreground"
                      }
                    >
                      {p.active ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                  <h3 className="mt-3 font-bold text-foreground">{p.specialty}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Name: {p.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">CRM: {p.professionalLicense}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Modal open={open} onClose={() => setOpen(false)} title="Cadastrar médico">
          <HealthProfessionalForm onDone={() => setOpen(false)} />
        </Modal>
      </AppShell>
    </Protected>
  )
}
