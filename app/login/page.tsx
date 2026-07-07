"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AuthShell } from "@/components/auth/auth-shell"
import { Button } from "@/components/ui/button"
import { Field, Input } from "@/components/ui/field"
import { useLogin } from "@/lib/hooks/use-auth"
import { useAuth } from "@/components/providers/auth-provider"
import { EUserRole } from "@/lib/types"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const loginMutation = useLogin()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: ({ token, user, healthProfessional }) => {
          // Doctors have no role; the isDoctor flag lives on the health professional.
          if (healthProfessional?.isDoctor) {
            login(token, { healthProfessional })
            router.push("/painel")
            return
          }
          // Admins keep their current access to the management area.
          if (user?.role === EUserRole.ADMIN) {
            login(token, { user })
            router.push("/unidades")
            return
          }
          // Regular USER accounts are not allowed into the dashboard.
          setError("Você não tem permissão para acessar o painel.")
        },
        onError: () => setError("Email ou senha inválidos. Tente novamente."),
      },
    )
  }

  return (
    <AuthShell
      title="Bem-vindo de volta"
      subtitle="Entre com suas credenciais para acessar o painel."
      footer={
        <>
          Não tem uma conta?{" "}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Cadastre-se
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <Field label="Email" htmlFor="email">
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            placeholder="voce@clinica.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>

        <Field label="Senha" htmlFor="password">
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>

        {error && (
          <p className="rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" size="lg" loading={loginMutation.isPending} className="mt-1">
          Entrar
        </Button>
      </form>
    </AuthShell>
  )
}
