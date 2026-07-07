import { api } from "@/lib/api"
import type { AuthResponse, LoginPayload, RegisterPayload, IUser } from "@/lib/types"

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

  // Returns the currently authenticated user based on the JWT.
  me: async () => {
    const { data } = await api.get<IUser>("/auth/me")
    return data
  },
}
