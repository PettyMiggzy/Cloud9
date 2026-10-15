"use client"

import { useEffect, useRef, useState } from "react"
import { clinic } from "@/lib/content"
import { Button } from "@/components/ui/button"

export function RequestReady({
  title,
  lede,
  rows,
  body,
  mailto,
  note,
  onEdit,
}: {
  title: string
  lede: string
  rows: { label: string; value: string }[]
  body: string
  mailto: string
  note?: string
  onEdit?: () => void
}) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle")

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(body)
      setCopyState("copied")
    } catch {
      setCopyState("failed")
    }
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-10">
      <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Ready to send</p>
      <h2 ref={headingRef} tabIndex={-1} className="mt-2 font-heading text-3xl text-balance outline-none">
        {title}
      </h2>
      <p className="mt-3 leading-relaxed text-muted-foreground">{lede}</p>
      <dl className="mt-6 space-y-2 text-sm">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between gap-4 border-b border-border py-2">
            <dt className="text-muted-foreground">{row.label}</dt>
            <dd className="max-w-[60%] text-right">{row.value}</dd>
          </div>
        ))}
      </dl>
      {note ? <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{note}</p> : null}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button className="h-11 px-5" type="button" onClick={() => (window.location.href = mailto)}>
          Open the email again
        </Button>
        <Button variant="outline" className="h-11 px-5" type="button" onClick={copy}>
          {copyState === "copied" ? "Copied" : "Copy the note"}
        </Button>
        {onEdit ? (
          <Button variant="ghost" className="h-11 px-5" type="button" onClick={onEdit}>
            Edit details
          </Button>
        ) : null}
      </div>
      {copyState === "failed" ? (
        <p role="alert" className="mt-3 text-sm text-destructive">
          Copy did not work in this browser. Select the note below and copy it by hand.
        </p>
      ) : null}
      <details className="mt-5">
        <summary className="cursor-pointer text-sm font-medium text-primary">Read the note if email did not open</summary>
        <pre className="mt-3 overflow-x-auto rounded-xl bg-foam p-4 font-sans text-sm leading-relaxed whitespace-pre-wrap">
          {body}
        </pre>
      </details>
      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
        Nothing is scheduled or verified until {clinic.name} replies. For a faster answer, call{" "}
        <a className="font-medium text-primary hover:underline" href={clinic.phoneHref}>
          {clinic.phone}
        </a>
        .
      </p>
    </div>
  )
}
