import type { ReactNode } from "react"
import { LogoMark } from "@/components/brand/logo"

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <main className="flex min-h-dvh">
      {/* Brand panel */}
      <aside className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-primary p-12 text-primary-foreground lg:flex">
        <div className="flex items-center gap-2">
          <LogoMark className="h-7 w-7 text-primary-foreground" />
          <span className="text-lg font-bold tracking-tight">Dr. Aris Clinic</span>
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="text-balance text-4xl font-bold leading-tight">
            Gestão inteligente de consultas e filas de atendimento.
          </h2>
          <p className="mt-4 text-pretty text-primary-foreground/80">
            Acompanhe o atendimento em tempo real, gerencie unidades de saúde e sua equipe de
            profissionais em um só lugar.
          </p>
        </div>

        <p className="relative z-10 text-sm text-primary-foreground/70">
          &copy; {new Date().getFullYear()} Dr. Aris Clinic. Todos os direitos reservados.
        </p>

        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-white/5 blur-2xl" />
      </aside>

      {/* Form panel */}
      <section className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <LogoMark className="h-7 w-7 text-primary" />
            <span className="text-lg font-bold tracking-tight text-primary">Dr. Aris Clinic</span>
          </div>

          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>

          <div className="mt-8">{children}</div>

          {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
        </div>
      </section>
    </main>
  )
}
