export type Priority = "ALTA" | "IDOSO" | "GESTANTE" | "PADRÃO"

export interface QueuePatient {
  id: string
  name: string
  ticket: string
  arrival: string
  wait: string
  priority: Priority
  urgent?: boolean
}

export const activePatient = {
  name: "Ricardo Mendonça",
  ticket: "C-042",
  room: "Sala 03",
  image: "/patient-portrait.png",
}

export const queue: QueuePatient[] = [
  { id: "1", name: "Ana Maria Silva", ticket: "E-012", arrival: "14:20", wait: "42 min", priority: "ALTA", urgent: true },
  { id: "2", name: "José Pereira", ticket: "P-005", arrival: "14:35", wait: "27 min", priority: "IDOSO" },
  { id: "3", name: "Carla Lima", ticket: "G-002", arrival: "14:50", wait: "12 min", priority: "GESTANTE" },
  { id: "4", name: "Marcos Bezerra", ticket: "N-104", arrival: "14:55", wait: "7 min", priority: "PADRÃO" },
]
