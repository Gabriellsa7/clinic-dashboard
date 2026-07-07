"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Field, Input } from "@/components/ui/field"
import { useCreateHealthUnit } from "@/lib/hooks/use-health"
import type { HealthUnitInput } from "@/lib/services/health"

const empty: HealthUnitInput = {
  name: "",
  phone: "",
  email: "",
  img: "",
  address: {
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
  },
}

export function HealthUnitForm({ onDone }: { onDone: () => void }) {
  const create = useCreateHealthUnit()
  const [form, setForm] = useState<HealthUnitInput>(empty)
  const [error, setError] = useState<string | null>(null)

  const set = (key: keyof HealthUnitInput, value: string) =>
    setForm((f) => ({ ...f, [key]: value }))
  const setAddr = (key: keyof HealthUnitInput["address"], value: string) =>
    setForm((f) => ({ ...f, address: { ...f.address, [key]: value } }))

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    create.mutate(form, {
      onSuccess: () => {
        setForm(empty)
        onDone()
      },
      onError: () => setError("Não foi possível salvar a unidade. Verifique os dados."),
    })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Field label="Nome da unidade" htmlFor="hu-name">
        <Input id="hu-name" required value={form.name} onChange={(e) => set("name", e.target.value)} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Telefone" htmlFor="hu-phone">
          <Input id="hu-phone" required value={form.phone} onChange={(e) => set("phone", e.target.value)} />
        </Field>
        <Field label="Email" htmlFor="hu-email">
          <Input id="hu-email" type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} />
        </Field>
      </div>

      <fieldset className="space-y-4 rounded-2xl border border-border p-4">
        <legend className="px-1 text-sm font-semibold text-muted-foreground">Endereço</legend>

        <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
          <Field label="Rua" htmlFor="hu-street">
            <Input id="hu-street" required value={form.address.street} onChange={(e) => setAddr("street", e.target.value)} />
          </Field>
          <Field label="Número" htmlFor="hu-number">
            <Input id="hu-number" required value={form.address.number} onChange={(e) => setAddr("number", e.target.value)} />
          </Field>
        </div>

        <Field label="Complemento" htmlFor="hu-complement">
          <Input id="hu-complement" value={form.address.complement} onChange={(e) => setAddr("complement", e.target.value)} />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Bairro" htmlFor="hu-neighborhood">
            <Input id="hu-neighborhood" required value={form.address.neighborhood} onChange={(e) => setAddr("neighborhood", e.target.value)} />
          </Field>
          <Field label="CEP" htmlFor="hu-zip">
            <Input id="hu-zip" required value={form.address.zipCode} onChange={(e) => setAddr("zipCode", e.target.value)} />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
          <Field label="Cidade" htmlFor="hu-city">
            <Input id="hu-city" required value={form.address.city} onChange={(e) => setAddr("city", e.target.value)} />
          </Field>
          <Field label="Estado (UF)" htmlFor="hu-state">
            <Input id="hu-state" required maxLength={2} value={form.address.state} onChange={(e) => setAddr("state", e.target.value.toUpperCase())} />
          </Field>
        </div>
      </fieldset>

      {error && (
        <p className="rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger" role="alert">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={onDone}>
          Cancelar
        </Button>
        <Button type="submit" loading={create.isPending}>
          Salvar unidade
        </Button>
      </div>
    </form>
  )
}
