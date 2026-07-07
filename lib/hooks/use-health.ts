"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  healthUnitService,
  healthProfessionalService,
  type HealthUnitInput,
  type HealthProfessionalInput,
} from "@/lib/services/health"

export function useHealthUnits() {
  return useQuery({ queryKey: ["health-units"], queryFn: healthUnitService.list })
}

export function useCreateHealthUnit() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: HealthUnitInput) => healthUnitService.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["health-units"] }),
  })
}

export function useHealthProfessionals() {
  return useQuery({ queryKey: ["health-professionals"], queryFn: healthProfessionalService.list })
}

export function useCreateHealthProfessional() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: HealthProfessionalInput) => healthProfessionalService.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["health-professionals"] }),
  })
}
