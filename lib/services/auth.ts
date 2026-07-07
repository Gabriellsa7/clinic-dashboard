import { api } from "@/lib/api"
import type { AuthResponse, LoginPayload, RegisterPayload, IHealthProfessional, IUser } from "@/lib/types"

/**
 * Auth endpoints. Adjust the paths below to match your backend routes.
 */
export const authService = {
  login: async (payload: LoginPayload) => {
    const { data } = await api.post<AuthResponse>("/auth/login", payload)
    return data
  },

  register: async (payload: RegisterPayload) => {
    const { data } = await api.post<AuthResponse>("/users", payload)
    return data
  },

  // Returns the currently authenticated account based on the JWT. This can be a
  // regular user (ADMIN / USER) or a health professional (doctor).
  me: async () => {
    const { data } = await api.get<{ user?: IUser; healthProfessional?: IHealthProfessional }>("/auth/me")
    return data
  },
}
