"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/dashboard/stat-card"
import { PriorityBadge } from "@/components/dashboard/priority-badge"
import { activePatient, queue } from "@/lib/mock/queue"
import { ClockIcon, TrendingUpIcon, BriefcaseIcon, ArrowRightIcon, UserPlusIcon } from "@/components/icons"

export function DashboardView() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Top: active call + stats */}
      <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
        {/* Active call card */}
        <div className="relative overflow-hidden rounded-3xl bg-card p-8 shadow-sm">
          <div className="flex items-start justify-between">
            <p className="text-sm font-bold uppercase tracking-wide text-primary">Chamando agora</p>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Atendimento ativo
            </span>
          </div>

          <div className="mt-4 flex items-end justify-between gap-6">
            <div>
              <h2 className="text-balance text-4xl font-bold leading-none text-foreground">
                {activePatient.name}
              </h2>
              <p className="mt-4 text-muted-foreground">
                Senha: <span className="font-bold text-primary">{activePatient.ticket}</span> &bull;
              </p>
              <p className="text-muted-foreground">{activePatient.room}</p>

              <div className="mt-6 flex gap-3">
                <Button>Concluir</Button>
                <Button variant="secondary">Ausente</Button>
              </div>
            </div>

            <div className="relative hidden h-44 w-40 shrink-0 overflow-hidden rounded-2xl bg-muted sm:block">
              <Image
                src={activePatient.image || "/placeholder.svg"}
                alt={`Foto de ${activePatient.name}`}
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4">
          <StatCard label="T.M. Espera" value="14 min" icon={ClockIcon} />
          <StatCard label="Taxa Atend." value="92%" icon={TrendingUpIcon} />
          <StatCard label="Disponibilidade" value="4/5" icon={BriefcaseIcon} />
        </div>
      </div>

      {/* Waiting queue */}
      <section>
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-2xl font-bold text-foreground">Fila de Espera</h3>
            <p className="text-sm text-muted-foreground">
              {queue.length} pacientes aguardando atendimento
            </p>
          </div>
          <button className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            Ver fila completa
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>

        <ul className="mt-4 space-y-3">
          {queue.map((p) => (
            <li
              key={p.id}
              className="grid grid-cols-2 items-center gap-4 rounded-2xl bg-card p-4 shadow-sm sm:grid-cols-[minmax(0,2fr)_1fr_1fr_1fr]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-bold text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">Senha: {p.ticket}</p>
                </div>
              </div>

              <div className="hidden sm:block">
                <p className="text-xs font-semibold uppercase text-muted-foreground">Chegada</p>
                <p className="font-semibold text-foreground">{p.arrival}</p>
              </div>

              <div className="hidden sm:block">
                <p className="text-xs font-semibold uppercase text-muted-foreground">Espera</p>
                <p className={p.urgent ? "font-semibold text-danger" : "font-semibold text-foreground"}>
                  {p.wait}
                </p>
              </div>

              <div className="flex flex-col items-end gap-1 sm:items-start">
                <p className="text-xs font-semibold uppercase text-muted-foreground">Prioridade</p>
                <PriorityBadge priority={p.priority} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Floating action */}
      <button
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
        aria-label="Adicionar paciente"
      >
        <UserPlusIcon className="h-6 w-6" />
      </button>
    </div>
  )
}
