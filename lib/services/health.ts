import { api } from "@/lib/api"
import type { IHealthUnit, IHealthProfessional } from "@/lib/types"

export type HealthUnitInput = Omit<IHealthUnit, "_id" | "createdAt">
export type HealthProfessionalInput = Omit<
  IHealthProfessional,
  "_id" | "createdAt" | "updatedAt"
> & { name: string; email: string; password?: string }

/**
 * Health Unit endpoints. Adjust paths to match your backend routes.
 */
export const healthUnitService = {
  list: async () => {
    const { data } = await api.get<IHealthUnit[]>("/health-units")
    return data
  },
  create: async (payload: HealthUnitInput) => {
    const { data } = await api.post<IHealthUnit>("/health-units", payload)
    return data
  },
}

/**
 * Health Professional (doctor) endpoints. Adjust paths to match your backend.
 */
export const healthProfessionalService = {
  list: async () => {
    const { data } = await api.get<IHealthProfessional[]>("/health-professionals")
    return data
  },
  create: async (payload: HealthProfessionalInput) => {
    const { data } = await api.post<IHealthProfessional>("/health-professionals", payload)
    return data
  },
}
