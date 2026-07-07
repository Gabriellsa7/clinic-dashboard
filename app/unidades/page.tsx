"use client"

import { useState } from "react"
import { Protected } from "@/components/auth/protected"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { HealthUnitForm } from "@/components/health/health-unit-form"
import { EmptyState } from "@/components/layout/empty-state"
import { useHealthUnits } from "@/lib/hooks/use-health"
import { BuildingIcon, PlusIcon } from "@/components/icons"

export default function UnidadesPage() {
  const [open, setOpen] = useState(false)
  const { data: units, isLoading, isError } = useHealthUnits()

  return (
    <Protected role="manager">
      <AppShell
        title="Unidades de Saúde"
        subtitle="Gerencie as unidades sob sua responsabilidade."
        headerRight={
          <Button size="sm" onClick={() => setOpen(true)}>
            <PlusIcon className="h-4 w-4" />
            Nova unidade
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
              icon={BuildingIcon}
              title="Não foi possível carregar"
              description="Verifique se o backend está conectado e tente novamente."
            />
          )}

          {!isLoading && !isError && (!units || units.length === 0) && (
            <EmptyState
              icon={BuildingIcon}
              title="Nenhuma unidade cadastrada"
              description="Clique em 'Nova unidade' para cadastrar a primeira unidade de saúde."
            />
          )}

          {units && units.length > 0 && (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {units.map((u) => (
                <li key={u._id} className="rounded-2xl bg-card p-5 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <BuildingIcon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 font-bold text-foreground">{u.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {u.address.street}, {u.address.number} — {u.address.city}/{u.address.state}
                  </p>
                  <div className="mt-3 space-y-0.5 text-sm text-muted-foreground">
                    <p>{u.phone}</p>
                    <p>{u.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Modal open={open} onClose={() => setOpen(false)} title="Cadastrar unidade de saúde">
          <HealthUnitForm onDone={() => setOpen(false)} />
        </Modal>
      </AppShell>
    </Protected>
  )
}
