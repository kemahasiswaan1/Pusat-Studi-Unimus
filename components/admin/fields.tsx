import type { ReactNode } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { STATUS_ORDER, STATUS_LABELS } from "@/lib/types"

export function Field({
  label,
  htmlFor,
  children,
  hint,
}: {
  label: string
  htmlFor?: string
  children: ReactNode
  hint?: string
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

export function TextField({
  name,
  label,
  defaultValue,
  type = "text",
  required,
  placeholder,
  hint,
}: {
  name: string
  label: string
  defaultValue?: string | number
  type?: string
  required?: boolean
  placeholder?: string
  hint?: string
}) {
  return (
    <Field label={label} htmlFor={name} hint={hint}>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        required={required}
        placeholder={placeholder}
      />
    </Field>
  )
}

export function TextAreaField({
  name,
  label,
  defaultValue,
  rows = 4,
  placeholder,
  hint,
}: {
  name: string
  label: string
  defaultValue?: string
  rows?: number
  placeholder?: string
  hint?: string
}) {
  return (
    <Field label={label} htmlFor={name} hint={hint}>
      <Textarea id={name} name={name} rows={rows} defaultValue={defaultValue ?? ""} placeholder={placeholder} />
    </Field>
  )
}

export function FileField({
  name,
  label,
  accept,
  hint,
}: {
  name: string
  label: string
  accept?: string
  hint?: string
}) {
  return (
    <Field label={label} htmlFor={name} hint={hint}>
      <Input id={name} name={name} type="file" accept={accept} />
    </Field>
  )
}

const selectClass =
  "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"

export function SelectField({
  name,
  label,
  defaultValue,
  options,
  hint,
}: {
  name: string
  label: string
  defaultValue?: string | number | null
  options: { value: string; label: string }[]
  hint?: string
}) {
  return (
    <Field label={label} htmlFor={name} hint={hint}>
      <select id={name} name={name} defaultValue={defaultValue ?? ""} className={selectClass}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  )
}

export function StatusField({ defaultValue }: { defaultValue?: string }) {
  return (
    <SelectField
      name="status"
      label="Status Publikasi"
      defaultValue={defaultValue ?? "draft"}
      options={STATUS_ORDER.map((s) => ({ value: s, label: STATUS_LABELS[s] }))}
      hint="Draft → Verifikasi → Dipublikasikan → Arsip. Status Dipublikasikan tampil di website publik."
    />
  )
}
