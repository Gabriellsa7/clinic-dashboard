"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Field, Input, Select } from "@/components/ui/field"
import { useCreateHealthProfessional, useHealthUnits } from "@/lib/hooks/use-health"

export function HealthProfessionalForm({ onDone }: { onDone: () => void }) {
  const create = useCreateHealthProfessional()
  const { data: units } = useHealthUnits()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [healthUnitId, setHealthUnitId] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [professionalLicense, setLicense] = useState("")
  const [active, setActive] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    create.mutate(
      { name, email, password, healthUnitId, specialty, professionalLicense, active },
      {
        onSuccess: onDone,
        onError: () => setError("Não foi possível cadastrar o profissional. Verifique os dados."),
      },
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nome do médico" htmlFor="hp-name">
          <Input id="hp-name" required value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field label="Email de acesso" htmlFor="hp-email">
          <Input id="hp-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
      </div>

      <Field label="Senha inicial" htmlFor="hp-password">
        <Input
          id="hp-password"
          type="password"
          required
          minLength={6}
          placeholder="Mínimo 6 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Field>

      <Field label="Unidade de saúde" htmlFor="hp-unit">
        <Select id="hp-unit" required value={healthUnitId} onChange={(e) => setHealthUnitId(e.target.value)}>
          <option value="" disabled>
            Selecione uma unidade
          </option>
          {units?.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </Select>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Especialidade" htmlFor="hp-specialty">
          <Input id="hp-specialty" required placeholder="Ex: Cardiologia" value={specialty} onChange={(e) => setSpecialty(e.target.value)} />
        </Field>
        <Field label="Registro profissional (CRM)" htmlFor="hp-license">
          <Input id="hp-license" required value={professionalLicense} onChange={(e) => setLicense(e.target.value)} />
        </Field>
      </div>

      <label className="flex items-center gap-2 text-sm text-foreground">
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
          className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
        />
        Profissional ativo
      </label>

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
          Cadastrar médico
        </Button>
      </div>
    </form>
  )
}
