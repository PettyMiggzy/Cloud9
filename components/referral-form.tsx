"use client"

import { useEffect, useState } from "react"
import { clinic, getService, services } from "@/lib/content"
import { hasPhone, mailtoHref } from "@/lib/request"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FormField, describedBy } from "@/components/form-field"
import { RequestReady } from "@/components/request-ready"
import { cn } from "cn"

type Fields = {
  practice: string
  provider: string
  patient: string
  phone: string
  reason: string
  service: string
}

const empty: Fields = { practice: "", provider: "", patient: "", phone: "", reason: "", service: "" }

function serviceLabel(value: string) {
  if (value === "none") return "No preference — the evaluation can decide"
  return getService(value)?.name ?? value
}

function validate(form: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {}
  if (form.practice.trim().length < 2) errors.practice = "Add the practice name."
  if (form.provider.trim().length < 2) errors.provider = "Add the referring provider."
  if (form.patient.trim().length < 2) errors.patient = "Add the patient’s name."
  if (!hasPhone(form.phone)) errors.phone = "Add a phone number with at least 10 digits."
  if (form.reason.trim().length < 3) errors.reason = "Add a short reason for the referral."
  if (form.reason.trim().length > 1500) errors.reason = "Shorten the reason so the email can open."
  if (!form.service) errors.service = "Choose a preferred service, or no preference."
  return errors
}

function buildBody(form: Fields) {
  return [
    "Hello Cloud 9,",
    "",
    "A physician’s office is sending a referral.",
    "",
    `Practice: ${form.practice.trim()}`,
    `Provider: ${form.provider.trim()}`,
    `Patient: ${form.patient.trim()}`,
    `Patient phone: ${form.phone.trim()}`,
    `Preferred service: ${serviceLabel(form.service)}`,
    "Reason:",
    form.reason.trim(),
    "",
    "This referral is not confirmed until the clinic replies.",
  ].join("\n")
}

const selectClass =
  "h-11 w-full rounded-lg border border-input bg-transparent px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive md:text-sm"

export function ReferralForm({ initialService = "" }: { initialService?: string }) {
  const [form, setForm] = useState<Fields>({
    ...empty,
    service: services.some((service) => service.slug === initialService) ? initialService : "",
  })
  const [attempted, setAttempted] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("service") ?? ""
    if (!services.some((service) => service.slug === slug)) return
    setForm((current) => (current.service ? current : { ...current, service: slug }))
  }, [])

  const errors = attempted ? validate(form) : {}
  const invalid = Object.keys(errors).length > 0

  function update(partial: Partial<Fields>) {
    setForm((current) => ({ ...current, ...partial }))
  }

  function submit(event: React.FormEvent) {
    event.preventDefault()
    setAttempted(true)
    if (Object.keys(validate(form)).length > 0) return
    setReady(true)
    window.location.href = mailtoHref(`Physician referral: ${form.patient.trim()}`, buildBody(form))
  }

  if (ready) {
    const body = buildBody(form)
    return (
      <RequestReady
        title="The referral note is prepared."
        lede={`If a mail app opened, send it to ${clinic.email}. The clinic has not received the referral until that message is sent, and they still need to reply.`}
        rows={[
          { label: "Practice", value: form.practice.trim() },
          { label: "Provider", value: form.provider.trim() },
          { label: "Patient", value: form.patient.trim() },
          { label: "Phone", value: form.phone.trim() },
          { label: "Service", value: serviceLabel(form.service) },
          { label: "Reason", value: form.reason.trim() },
        ]}
        body={body}
        mailto={mailtoHref(`Physician referral: ${form.patient.trim()}`, body)}
        note={`You can also fax this referral to ${clinic.fax}. It is not confirmed until the clinic replies.`}
        onEdit={() => setReady(false)}
      />
    )
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-3xl border border-border bg-card p-5 sm:p-8" id="referral-form">
      <h2 className="font-heading text-3xl">Send a referral.</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        This prepares an email to {clinic.email}. It does not register the patient, and the visit is not confirmed until the clinic replies.
      </p>
      <div className="mt-6 grid gap-4">
        <FormField id="ref-practice" label="Referring practice" error={errors.practice}>
          <Input
            id="ref-practice"
            autoComplete="organization"
            value={form.practice}
            aria-required="true"
            aria-invalid={errors.practice ? true : undefined}
            aria-describedby={describedBy("ref-practice", false, errors.practice)}
            className="h-11"
            onChange={(event) => update({ practice: event.target.value })}
          />
        </FormField>
        <FormField id="ref-provider" label="Referring provider" error={errors.provider}>
          <Input
            id="ref-provider"
            autoComplete="name"
            value={form.provider}
            aria-required="true"
            aria-invalid={errors.provider ? true : undefined}
            aria-describedby={describedBy("ref-provider", false, errors.provider)}
            className="h-11"
            onChange={(event) => update({ provider: event.target.value })}
          />
        </FormField>
        <FormField id="ref-patient" label="Patient name" error={errors.patient}>
          <Input
            id="ref-patient"
            autoComplete="off"
            value={form.patient}
            aria-required="true"
            aria-invalid={errors.patient ? true : undefined}
            aria-describedby={describedBy("ref-patient", false, errors.patient)}
            className="h-11"
            onChange={(event) => update({ patient: event.target.value })}
          />
        </FormField>
        <FormField id="ref-phone" label="Patient phone" error={errors.phone}>
          <Input
            id="ref-phone"
            type="tel"
            inputMode="tel"
            autoComplete="off"
            value={form.phone}
            aria-required="true"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describedBy("ref-phone", false, errors.phone)}
            className="h-11"
            onChange={(event) => update({ phone: event.target.value })}
          />
        </FormField>
        <FormField id="ref-reason" label="Reason" error={errors.reason}>
          <Textarea
            id="ref-reason"
            value={form.reason}
            aria-required="true"
            aria-invalid={errors.reason ? true : undefined}
            aria-describedby={describedBy("ref-reason", false, errors.reason)}
            className="min-h-28"
            onChange={(event) => update({ reason: event.target.value })}
          />
        </FormField>
        <FormField id="ref-service" label="Preferred service" error={errors.service}>
          <select
            id="ref-service"
            value={form.service}
            aria-required="true"
            aria-invalid={errors.service ? true : undefined}
            aria-describedby={describedBy("ref-service", false, errors.service)}
            className={cn(selectClass, !form.service && "text-muted-foreground")}
            onChange={(event) => update({ service: event.target.value })}
          >
            <option value="">Select one</option>
            <option value="none">No preference — the evaluation can decide</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.name}
              </option>
            ))}
          </select>
        </FormField>
      </div>
      {attempted && invalid ? (
        <p role="alert" className="mt-5 text-sm text-destructive">
          Check the highlighted fields before preparing the email.
        </p>
      ) : null}
      <Button type="submit" className="mt-6 h-11 px-5">
        Email this referral
      </Button>
    </form>
  )
}
