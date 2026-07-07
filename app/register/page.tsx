"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AuthShell } from "@/components/auth/auth-shell"
import { Button } from "@/components/ui/button"
import { Field, Input } from "@/components/ui/field"
import { useRegister } from "@/lib/hooks/use-auth"
import { useAuth } from "@/components/providers/auth-provider"
import { EUserRole } from "@/lib/types"

export default function RegisterPage() {
  const router = useRouter()
  const { login } = useAuth()
  const registerMutation = useRegister()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState<string | null>(null)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (password !== confirm) {
      setError("As senhas não coincidem.")
      return
    }
    registerMutation.mutate(
      { name, email, password },
      {
        onSuccess: ({ token, user, healthProfessional }) => {
          if (healthProfessional?.isDoctor) {
            login(token, { healthProfessional })
            router.push("/painel")
            return
          }
          if (user?.role === EUserRole.ADMIN) {
            login(token, { user })
            router.push("/unidades")
            return
          }
          setError("Você não tem permissão para acessar o painel.")
        },
        onError: () => setError("Não foi possível criar a conta. Verifique os dados."),
      },
    )
  }

  return (
    <AuthShell
      title="Criar conta"
      subtitle="Preencha os dados abaixo para começar."
      footer={
        <>
          Já tem uma conta?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Entrar
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <Field label="Nome completo" htmlFor="name">
          <Input
            id="name"
            required
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>

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
            autoComplete="new-password"
            required
            placeholder="Mínimo 6 caracteres"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>

        <Field label="Confirmar senha" htmlFor="confirm">
          <Input
            id="confirm"
            type="password"
            autoComplete="new-password"
            required
            placeholder="Repita a senha"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </Field>

        {error && (
          <p className="rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" size="lg" loading={registerMutation.isPending} className="mt-1">
          Criar conta
        </Button>
      </form>
    </AuthShell>
  )
}
