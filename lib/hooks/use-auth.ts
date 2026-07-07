"use client"

import { useMutation } from "@tanstack/react-query"
import { authService } from "@/lib/services/auth"
import type { LoginPayload, RegisterPayload } from "@/lib/types"

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
  })
}

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
  })
}
