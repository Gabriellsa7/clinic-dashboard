"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LogoMark } from "@/components/brand/logo"
import { useAuth } from "@/components/providers/auth-provider"
import {
  QueueIcon,
  HistoryIcon,
  CalendarIcon,
  UserIcon,
  BuildingIcon,
  StethoscopeIcon,
  LogoutIcon,
} from "@/components/icons"
import type { ComponentType, SVGProps } from "react"

type NavItem = { label: string; href: string; icon: ComponentType<SVGProps<SVGSVGElement>> }

const doctorNav: NavItem[] = [
  { label: "Active Queue", href: "/painel", icon: QueueIcon },
  { label: "History", href: "/painel/history", icon: HistoryIcon },
  { label: "Schedule", href: "/painel/schedule", icon: CalendarIcon },
  { label: "Profile", href: "/painel/profile", icon: UserIcon },
]

const managerNav: NavItem[] = [
  { label: "Unidades de Saúde", href: "/unidades", icon: BuildingIcon },
  { label: "Profissionais", href: "/profissionais", icon: StethoscopeIcon },
]

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const { user, healthProfessional, isDoctor, logout } = useAuth()
  const nav = isDoctor ? doctorNav : managerNav
  // Doctors are stored as health professionals and have no user record.
  const displayName = isDoctor ? healthProfessional?.name : user?.name

  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="flex items-center gap-2 px-6 py-6">
        <LogoMark className="h-7 w-7 text-primary" />
        <span className="text-lg font-bold tracking-tight text-primary">Dr. Aris Clinic</span>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        {nav.map((item) => {
          const active = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                active
                  ? "bg-white text-primary shadow-sm"
                  : "text-muted-foreground hover:bg-white/60 hover:text-foreground",
              )}
            >
              <Icon
                className={cn("h-5 w-5", active ? "text-primary" : "text-muted-foreground")}
                aria-hidden="true"
              />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4">
        <div className="flex items-center gap-3 rounded-2xl bg-white/70 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
            {displayName?.slice(0, 2).toUpperCase() ?? "DR"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">{displayName ?? "Usuário"}</p>
            <p className="truncate text-xs text-muted-foreground">
              {isDoctor ? "Médico" : "Responsável"}
            </p>
          </div>
          <button
            onClick={logout}
            aria-label="Sair"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-danger"
          >
            <LogoutIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
