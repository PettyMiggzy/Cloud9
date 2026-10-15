import type { Metadata } from "next"
import Link from "next/link"
import { FaqList } from "@/components/faq-list"
import { Button } from "@/components/ui/button"
import { clinic } from "@/lib/content"

export const metadata: Metadata = {
  title: "Visit",
  description: "Hours, address, insurance, and fees for Cloud 9 Physical Therapy in Indianapolis.",
}

export default function VisitPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Visit</p>
      <h1 className="mt-3 max-w-3xl font-heading text-5xl leading-tight">Suite G, on Thompson Road.</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Arrive about ten minutes early the first time so paperwork does not eat the hour. If you are unsure what to wear, shorts and a T-shirt almost always work.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-border bg-card p-6">
            <h2 className="font-heading text-2xl">Hours</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {clinic.hours.map((row) => (
                <li key={row.days} className="flex justify-between gap-4 border-b border-border py-2 last:border-0">
                  <span>{row.days}</span>
                  <span className="font-medium">{row.time}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-3xl border border-border bg-card p-6">
            <h2 className="font-heading text-2xl">Reach them</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a className="font-medium text-primary hover:underline" href={clinic.phoneHref}>
                  {clinic.phone}
                </a>
              </li>
              <li>Fax {clinic.fax}</li>
              <li>
                <a className="hover:underline" href={`mailto:${clinic.email}`}>
                  {clinic.email}
                </a>
              </li>
              <li>
                <a className="hover:underline" href={clinic.mapsUrl}>
                  {clinic.address}
                </a>
              </li>
            </ul>
            <Button className="mt-5 h-11 px-5" render={<Link href="/book" />}>
              Request a time
            </Button>
          </section>
          <section className="rounded-3xl bg-foam p-6">
            <h2 className="font-heading text-2xl">If you are paying yourself</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt>60-minute evaluation</dt>
                <dd className="font-medium">$160</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>55-minute treatment</dt>
                <dd className="font-medium">$120</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>6 sessions</dt>
                <dd className="font-medium">$660</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>12 sessions</dt>
                <dd className="font-medium">$1,220</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>18 sessions</dt>
                <dd className="font-medium">$1,680</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-muted-foreground">
              Those self-pay fees do not apply to Medicare beneficiaries. There is no cancellation fee. A day’s notice is appreciated.
            </p>
          </section>
        </div>
        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          <iframe
            title="Map to Cloud 9 Physical Therapy"
            src={clinic.mapEmbed}
            className="h-80 w-full border-0 lg:h-full lg:min-h-[640px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <section className="mx-auto mt-16 max-w-3xl">
        <h2 className="font-heading text-4xl">Questions they get every week.</h2>
        <div className="mt-6">
          <FaqList />
        </div>
      </section>
    </div>
  )
}
