import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { FeeList } from "@/components/fee-list"
import { HoursList } from "@/components/hours-list"
import { NextStep } from "@/components/next-step"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { clinic, fees } from "@/lib/content"

export const metadata: Metadata = {
  title: "Your first visit",
  description:
    "What to wear, how the first hour goes, what it costs, and how to cancel at Cloud 9 Physical Therapy in Indianapolis. No referral required.",
}

const anchors = [
  { href: "#wear", label: "What to wear" },
  { href: "#hour", label: "The hour" },
  { href: "#cost", label: "Cost" },
  { href: "#paperwork", label: "Paperwork" },
  { href: "#cancel", label: "Canceling" },
  { href: "#referral", label: "Referral" },
]

export default function FirstVisitPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <PageHeader eyebrow="First visit" title="The hour, and the ten minutes before it." art="/images/art-fv.jpg">
        <p>
          The first appointment is a 60-minute, one-to-one evaluation. Arrive about ten minutes early so paperwork does not take the treatment time. What follows is how that visit works at Cloud 9. It is not a treatment plan.
        </p>
      </PageHeader>
      <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
        {anchors.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-sm hover:border-primary"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <article className="max-w-3xl space-y-12">
          <section id="wear" className="scroll-mt-32">
            <h2 className="font-heading text-3xl">What to wear</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Something the therapist can move out of the way. When you are not sure, shorts and a T-shirt almost always work.
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed">
              <li className="border-l-2 border-primary pl-3">
                Knee or hip: shorts, or loose pants that roll to mid-thigh. Not tight leggings.
              </li>
              <li className="border-l-2 border-primary pl-3">Shoulder: a T-shirt.</li>
              <li className="border-l-2 border-primary pl-3">
                Back: clothes that can be adjusted so the area can be examined.
              </li>
              <li className="border-l-2 border-primary pl-3">
                Jaw, dizziness, neck, or a recent concussion: the same idea. The neck and posture are often part of the exam, so clothes that can be moved still matter.
              </li>
            </ul>
          </section>

          <section id="hour" className="scroll-mt-32">
            <h2 className="font-heading text-3xl">How the hour goes</h2>
            <ol className="mt-4 space-y-4">
              <li>
                <p className="font-medium">You stay with one clinician.</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  The session is one-to-one. Dr. Sakshi Nandal — patients call her Dr. Skye — is the clinical director, and the rest of the team is on the{" "}
                  <Link href="/about" className="font-medium text-primary hover:underline">
                    team page
                  </Link>
                  .
                </p>
              </li>
              <li>
                <p className="font-medium">The first visit is the evaluation.</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  It is 60 minutes. The clinician asks what changed and what you want to get back to, and looks at how you move. This website does not decide the plan. The evaluation does.
                </p>
              </li>
              <li>
                <p className="font-medium">Follow-ups are their own visits.</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  A self-pay treatment visit is 55 minutes. How many you need is decided after the evaluation. The{" "}
                  <Link href="/services" className="font-medium text-primary hover:underline">
                    service pages
                  </Link>{" "}
                  describe how each kind of care tends to go.
                </p>
              </li>
            </ol>
            <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-[1.5rem]">
              <Image
                src="/images/clinic/treatment-bay.jpg"
                alt="A row of treatment tables in the Cloud 9 clinic"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
          </section>

          <section id="cost" className="scroll-mt-32">
            <h2 className="font-heading text-3xl">What it costs</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              If you are paying yourself, the fees are posted. Medicare is different. Private plans are checked before you are guessing at a bill.
            </p>
            <div className="mt-4 rounded-2xl border border-border bg-card p-5">
              <FeeList />
              <p className="mt-3 text-sm text-muted-foreground">{fees.cancellationNote}</p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Most major insurance plans are accepted. If a deductible has to be met first, services are paid at the time of the session. Use the{" "}
              <Link href="/insurance" className="font-medium text-primary hover:underline">
                insurance check
              </Link>{" "}
              to ask the clinic to look at a plan. That request is not confirmed until they reply.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The clinic’s own answer on timing: the vast majority of patients notice a change within two weeks. How long a full course takes depends on the problem, how long it has been there, and the demands of work and daily life.
            </p>
          </section>

          <section id="paperwork" className="scroll-mt-32">
            <h2 className="font-heading text-3xl">Paperwork</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Arrive about ten minutes early the first time so paperwork does not eat the hour. If you want benefits checked, have the insurer’s name handy, and the member ID if it is printed on the card. You can also send that ahead with the insurance form.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The door is Suite G, {clinic.address}. A map is on the{" "}
              <Link href="/visit" className="font-medium text-primary hover:underline">
                visit page
              </Link>
              .
            </p>
          </section>

          <section id="cancel" className="scroll-mt-32">
            <h2 className="font-heading text-3xl">If you need to cancel</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              There is no cancellation fee. A day’s notice is appreciated if you cannot make it or need to move the time. Call{" "}
              <a className="font-medium text-primary hover:underline" href={clinic.phoneHref}>
                {clinic.phone}
              </a>
              .
            </p>
          </section>

          <section id="referral" className="scroll-mt-32">
            <h2 className="font-heading text-3xl">You do not need a referral</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Indiana is a direct-access state, so you can see a physical therapist without a referral or a prescription. If a physician’s office wants to send one anyway, they can use the{" "}
              <Link href="/refer" className="font-medium text-primary hover:underline">
                referral form
              </Link>{" "}
              or fax {clinic.fax}.
            </p>
          </section>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-28">
          <section className="rounded-3xl border border-border bg-card p-5">
            <h2 className="font-heading text-2xl">Hours</h2>
            <HoursList className="mt-3" />
            <p className="mt-3 text-sm text-muted-foreground">Sunday the clinic is closed.</p>
          </section>
          <section className="rounded-3xl bg-foam p-5">
            <h2 className="font-heading text-2xl">Self-pay</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Evaluation {fees.evaluation.amount}. Treatment {fees.treatment.amount}. Not for Medicare.
            </p>
            <Button className="mt-4 h-11 w-full" render={<Link href="/book" />}>
              Book the hour
            </Button>
            <Button variant="outline" className="mt-2 h-11 w-full" render={<Link href="/start" />}>
              Not sure which visit
            </Button>
          </section>
        </aside>
      </div>

      <NextStep
        title="Book the hour."
        body="Request a time, call the clinic, or use the two questions if you are still matching a service. The request is not confirmed until Cloud 9 replies."
      />
    </div>
  )
}
