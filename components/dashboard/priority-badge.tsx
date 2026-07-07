import { cn } from "@/lib/utils"
import type { Priority } from "@/lib/mock/queue"

const styles: Record<Priority, string> = {
  ALTA: "bg-danger/10 text-danger",
  IDOSO: "bg-primary/10 text-primary",
  GESTANTE: "bg-primary/10 text-primary",
  "PADRÃO": "bg-muted text-muted-foreground",
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wide",
        styles[priority],
      )}
    >
      {priority}
    </span>
  )
}
