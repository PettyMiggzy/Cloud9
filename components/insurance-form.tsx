"use client"

import { useEffect, useState } from "react"
import { clinic, getService, services } from "@/lib/content"
import { hasPhone, isEmail, mailtoHref } from "@/lib/request"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormField, describedBy } from "@/components/form-field"
import { RequestReady } from "@/components/request-ready"
import { cn } from "cn"

type Fields = {
  name: string
  phone: string
  email: string
  insurer: string
  memberId: string
  visit: string
}

const empty: Fields = { name: "", phone: "", email: "", insurer: "", memberId: "", visit: "" }

function visitLabel(value: string) {
  if (value === "unsure") return "Not sure yet"
  return getService(value)?.name ?? value
}

function validate(form: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {}
  if (form.name.trim().length < 2) errors.name = "Add your name."
  if (!hasPhone(form.phone)) errors.phone = "Add a phone number with at least 10 digits."
  if (!isEmail(form.email)) errors.email = "Use an email the clinic can reply to."
  if (form.insurer.trim().length < 2) errors.insurer = "Add the insurer’s name, or write Medicare."
  if (!form.visit) errors.visit = "Choose the visit you want, or “Not sure yet.”"
  return errors
}

function buildBody(form: Fields) {
  return [
    "Hello Cloud 9,",
    "",
    "Please check insurance benefits for a visit. This note does not verify coverage by itself.",
    "",
    `Name: ${form.name.trim()}`,
    `Phone: ${form.phone.trim()}`,
    `Email: ${form.email.trim()}`,
    `Insurer: ${form.insurer.trim()}`,
    `Member ID: ${form.memberId.trim() || "Not provided"}`,
    `Visit: ${visitLabel(form.visit)}`,
    "",
    "I understand benefits are not verified, and a visit is not scheduled, until the clinic replies.",
  ].join("\n")
}

const selectClass =
  "h-11 w-full rounded-lg border border-input bg-transparent px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive md:text-sm"

export function InsuranceForm({ initialService = "" }: { initialService?: string }) {
  const [form, setForm] = useState<Fields>({
    ...empty,
    visit: services.some((service) => service.slug === initialService) ? initialService : "",
  })
  const [attempted, setAttempted] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("service") ?? ""
    if (!services.some((service) => service.slug === slug)) return
    setForm((current) => (current.visit ? current : { ...current, visit: slug }))
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
    const body = buildBody(form)
    window.location.href = mailtoHref(`Insurance check: ${form.name.trim()}`, body)
  }

  if (ready) {
    const body = buildBody(form)
    return (
      <RequestReady
        title="Your benefits note is prepared."
        lede={`If a mail app opened, send that message to ${clinic.email}. The clinic has not checked the plan yet.`}
        rows={[
          { label: "Name", value: form.name.trim() },
          { label: "Phone", value: form.phone.trim() },
          { label: "Email", value: form.email.trim() },
          { label: "Insurer", value: form.insurer.trim() },
          { label: "Member ID", value: form.memberId.trim() || "Not provided" },
          { label: "Visit", value: visitLabel(form.visit) },
        ]}
        body={body}
        mailto={mailtoHref(`Insurance check: ${form.name.trim()}`, body)}
        note="Benefits are not verified, and a visit is not scheduled, until Cloud 9 replies."
        onEdit={() => setReady(false)}
      />
    )
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-3xl border border-border bg-card p-5 sm:p-8" id="insurance-form">
      <h2 className="font-heading text-3xl">Ask them to check a plan.</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        This prepares an email to {clinic.email}. It does not look up benefits, and nothing is confirmed until the clinic replies.
      </p>
      <div className="mt-6 grid gap-4">
        <FormField id="ins-name" label="Your name" error={errors.name}>
          <Input
            id="ins-name"
            autoComplete="name"
            value={form.name}
            aria-required="true"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("ins-name", false, errors.name)}
            className="h-11"
            onChange={(event) => update({ name: event.target.value })}
          />
        </FormField>
        <FormField id="ins-phone" label="Phone" error={errors.phone}>
          <Input
            id="ins-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={form.phone}
            aria-required="true"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describedBy("ins-phone", false, errors.phone)}
            className="h-11"
            onChange={(event) => update({ phone: event.target.value })}
          />
        </FormField>
        <FormField id="ins-email" label="Email" error={errors.email}>
          <Input
            id="ins-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={form.email}
            aria-required="true"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("ins-email", false, errors.email)}
            className="h-11"
            onChange={(event) => update({ email: event.target.value })}
          />
        </FormField>
        <FormField
          id="ins-insurer"
          label="Insurer"
          hint="Medicare, or the name printed on the card. The clinic has not published a list of every plan."
          error={errors.insurer}
        >
          <Input
            id="ins-insurer"
            value={form.insurer}
            aria-required="true"
            aria-invalid={errors.insurer ? true : undefined}
            aria-describedby={describedBy("ins-insurer", true, errors.insurer)}
            className="h-11"
            onChange={(event) => update({ insurer: event.target.value })}
          />
        </FormField>
        <FormField id="ins-member" label="Member ID" hint="Optional. Leave it blank if you do not have the card.">
          <Input
            id="ins-member"
            value={form.memberId}
            autoComplete="off"
            aria-describedby={describedBy("ins-member", true, undefined)}
            className="h-11"
            onChange={(event) => update({ memberId: event.target.value })}
          />
        </FormField>
        <FormField id="ins-visit" label="Visit you want" error={errors.visit}>
          <select
            id="ins-visit"
            value={form.visit}
            aria-required="true"
            aria-invalid={errors.visit ? true : undefined}
            aria-describedby={describedBy("ins-visit", false, errors.visit)}
            className={cn(selectClass, !form.visit && "text-muted-foreground")}
            onChange={(event) => update({ visit: event.target.value })}
          >
            <option value="">Select a visit</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.name}
              </option>
            ))}
            <option value="unsure">Not sure yet</option>
          </select>
        </FormField>
      </div>
      {attempted && invalid ? (
        <p role="alert" className="mt-5 text-sm text-destructive">
          Check the highlighted fields before preparing the email.
        </p>
      ) : null}
      <Button type="submit" className="mt-6 h-11 px-5">
        Email this request
      </Button>
    </form>
  )
}
