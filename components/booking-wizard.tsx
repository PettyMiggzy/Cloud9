"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { clinic, getService, saturdayTimes, services, weekdayTimes } from "@/lib/content"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "cn"

const steps = ["Service", "Time", "You", "Send"]

type FormState = {
  service: string
  date: string
  time: string
  firstName: string
  lastName: string
  email: string
  phone: string
  notes: string
}

function todayISO() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${now.getFullYear()}-${month}-${day}`
}

function weekdayOf(iso: string) {
  const [year, month, day] = iso.split("-").map(Number)
  return new Date(year, month - 1, day).getDay()
}

function minutesOf(label: string) {
  const [clock, period] = label.split(" ")
  const [rawHour, minute] = clock.split(":").map(Number)
  let hour = rawHour
  if (period === "PM" && hour !== 12) hour += 12
  if (period === "AM" && hour === 12) hour = 0
  return hour * 60 + minute
}

function prettyDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number)
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })
}

export function BookingWizard({ initialService = "" }: { initialService?: string }) {
  const [step, setStep] = useState(0)
  const [error, setError] = useState("")
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState<FormState>({
    service: services.some((item) => item.slug === initialService) ? initialService : "",
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  })

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("service") ?? ""
    if (!services.some((item) => item.slug === slug)) return
    setForm((current) => (current.service ? current : { ...current, service: slug }))
  }, [])

  const slots = useMemo(() => {
    if (!form.date) return weekdayTimes
    const day = weekdayOf(form.date)
    const base = day === 6 ? saturdayTimes : weekdayTimes
    if (form.date !== todayISO()) return base
    const now = new Date()
    const current = now.getHours() * 60 + now.getMinutes()
    return base.filter((slot) => minutesOf(slot) > current + 30)
  }, [form.date])

  function update(partial: Partial<FormState>) {
    setForm((current) => ({ ...current, ...partial }))
    setError("")
  }

  function validate(target = step) {
    if (target === 0 && !form.service) return "Choose the kind of care you are coming in for."
    if (target === 1) {
      if (!form.date || !form.time) return "Pick a date and a time."
      if (form.date < todayISO()) return "That date has already passed."
      if (weekdayOf(form.date) === 0) return "The clinic is closed on Sunday."
      const allowed = weekdayOf(form.date) === 6 ? saturdayTimes : weekdayTimes
      if (!allowed.includes(form.time)) return "That time is outside clinic hours for the day you chose."
      if (form.date === todayISO() && !slots.includes(form.time)) {
        return "That time today has already passed. Pick a later opening."
      }
    }
    if (target === 2) {
      if (!form.firstName.trim() || !form.lastName.trim()) return "Add your first and last name."
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Use an email the clinic can reply to."
      if (form.phone.replace(/\D/g, "").length < 10) return "Add a phone number with at least 10 digits."
    }
    return ""
  }

  function next() {
    const message = validate()
    if (message) {
      setError(message)
      return
    }
    setStep((current) => Math.min(current + 1, steps.length - 1))
  }

  function send() {
    const message = [0, 1, 2].map((index) => validate(index)).find(Boolean)
    if (message) {
      setError(message)
      return
    }
    const serviceName = getService(form.service)?.name ?? form.service
    const body = [
      "Hello Cloud 9,",
      "",
      "I would like to request a visit.",
      "",
      `Care: ${serviceName}`,
      `When: ${prettyDate(form.date)} at ${form.time}`,
      `Name: ${form.firstName.trim()} ${form.lastName.trim()}`,
      `Email: ${form.email.trim()}`,
      `Phone: ${form.phone.trim()}`,
      form.notes.trim() ? `Notes: ${form.notes.trim()}` : "",
      "",
      "I understand this request is not confirmed until the clinic replies.",
    ]
      .filter(Boolean)
      .join("\n")
    const href = `mailto:${clinic.email}?subject=${encodeURIComponent(`Visit request: ${serviceName}`)}&body=${encodeURIComponent(body)}`
    setSent(true)
    window.location.href = href
  }

  const serviceName = getService(form.service)?.name

  if (sent) {
    return (
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-10">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Request ready</p>
        <h2 className="mt-2 font-heading text-3xl">Your note to the clinic is prepared.</h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          If a mail app opened, send that message to {clinic.email}. The time is not held until someone at Cloud 9
          confirms it. For a same-day answer, call.
        </p>
        <dl className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between gap-4 border-b border-border py-2">
            <dt className="text-muted-foreground">Care</dt>
            <dd>{serviceName}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-border py-2">
            <dt className="text-muted-foreground">When</dt>
            <dd>
              {prettyDate(form.date)} · {form.time}
            </dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-border py-2">
            <dt className="text-muted-foreground">Name</dt>
            <dd>
              {form.firstName} {form.lastName}
            </dd>
          </div>
        </dl>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button className="h-11 px-5" onClick={send}>
            Open the email again
          </Button>
          <Button variant="outline" className="h-11 px-5" render={<a href={clinic.phoneHref} />}>
            Call {clinic.phone}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-5 sm:p-8">
      <ol className="mb-8 grid grid-cols-4 gap-2">
        {steps.map((label, index) => (
          <li key={label}>
            <button
              type="button"
              disabled={index > step}
              onClick={() => index < step && setStep(index)}
              className={cn(
                "w-full border-b-2 pb-2 text-left text-xs font-medium tracking-wide uppercase sm:text-sm",
                index === step ? "border-primary text-primary" : "border-border text-muted-foreground",
                index < step && "cursor-pointer"
              )}
            >
              {index + 1}. {label}
            </button>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <fieldset>
          <legend className="font-heading text-3xl">What do you need help with?</legend>
          <p className="mt-2 text-muted-foreground">You can change this once you are in the room. It just gets the right person ready.</p>
          <div className="mt-6 grid gap-2">
            {services.map((service) => {
              const selected = form.service === service.slug
              return (
                <label
                  key={service.slug}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3",
                    selected ? "border-primary bg-foam" : "border-border hover:border-primary/40"
                  )}
                >
                  <input
                    type="radio"
                    name="service"
                    className="mt-1"
                    checked={selected}
                    onChange={() => update({ service: service.slug })}
                  />
                  <span>
                    <span className="block font-medium">{service.name}</span>
                    <span className="block text-sm text-muted-foreground">{service.short}</span>
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <div>
          <h2 className="font-heading text-3xl">When works?</h2>
          <p className="mt-2 text-muted-foreground">
            Weekdays run 7:00 am to 7:00 pm, with the last start at 6:00 pm. Saturday is 8:00 am to 2:00 pm. Sunday is closed.
          </p>
          <div className="mt-6 grid gap-5">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                min={todayISO()}
                value={form.date}
                className="mt-2 h-11"
                onChange={(event) => {
                  const date = event.target.value
                  const day = date ? weekdayOf(date) : 1
                  const allowed = day === 6 ? saturdayTimes : weekdayTimes
                  update({ date, time: allowed.includes(form.time) ? form.time : "" })
                }}
              />
            </div>
            {form.date && weekdayOf(form.date) === 0 && (
              <p className="text-sm text-destructive">The clinic is closed on Sunday. Pick another day.</p>
            )}
            {form.date && weekdayOf(form.date) !== 0 && (
              <div>
                <Label>Time</Label>
                {slots.length === 0 ? (
                  <p className="mt-2 text-sm text-muted-foreground">Nothing left today. Choose another date.</p>
                ) : (
                  <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {slots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => update({ time: slot })}
                        className={cn(
                          "h-11 rounded-lg border text-sm",
                          form.time === slot ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"
                        )}
                      >
                        {slot.replace(":00", "")}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="font-heading text-3xl">How should they reach you?</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" value={form.firstName} className="mt-2 h-11" onChange={(event) => update({ firstName: event.target.value })} />
            </div>
            <div>
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" value={form.lastName} className="mt-2 h-11" onChange={(event) => update({ lastName: event.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} className="mt-2 h-11" onChange={(event) => update({ email: event.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" value={form.phone} className="mt-2 h-11" onChange={(event) => update({ phone: event.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="notes">Anything they should know</Label>
              <Textarea
                id="notes"
                value={form.notes}
                className="mt-2 min-h-28"
                placeholder="Where it hurts, a surgery date, or the sport you are trying to get back to."
                onChange={(event) => update({ notes: event.target.value })}
              />
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="font-heading text-3xl">Read it once, then send.</h2>
          <p className="mt-2 text-muted-foreground">
            This opens an email to {clinic.email}. It does not book the hour by itself. Cloud 9 confirms by phone or email.
          </p>
          <dl className="mt-6 space-y-2 text-sm">
            {[
              ["Care", serviceName],
              ["When", form.date ? `${prettyDate(form.date)} at ${form.time}` : ""],
              ["Name", `${form.firstName} ${form.lastName}`],
              ["Email", form.email],
              ["Phone", form.phone],
              ["Notes", form.notes || "None"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-6 border-b border-border py-2">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="text-right">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {error && (
        <p role="alert" className="mt-5 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        {step === 0 ? (
          <Button variant="ghost" render={<Link href="/start" />}>
            Not sure yet
          </Button>
        ) : (
          <Button variant="ghost" type="button" onClick={() => setStep((current) => current - 1)}>
            Back
          </Button>
        )}
        {step < 3 ? (
          <Button type="button" className="h-11 px-5" onClick={next}>
            Continue
          </Button>
        ) : (
          <Button type="button" className="h-11 px-5" onClick={send}>
            Email this request
          </Button>
        )}
      </div>
    </div>
  )
}
