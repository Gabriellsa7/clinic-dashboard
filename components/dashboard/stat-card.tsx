import type { ComponentType, SVGProps } from "react"

export function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-card p-5 shadow-sm">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
      </div>
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
    </div>
  )
}
