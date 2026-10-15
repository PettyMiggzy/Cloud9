import Image from "next/image"
import Link from "next/link"
import { FaqList } from "@/components/faq-list"
import { PartnerRail } from "@/components/partner-rail"
import { ReviewReel } from "@/components/review-reel"
import { ServiceExplorer } from "@/components/service-explorer"
import { Button } from "@/components/ui/button"
import { NextStep } from "@/components/next-step"
import { clinic, faqs, patientTools, team, values } from "@/lib/content"

export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 sm:px-8 lg:min-h-[calc(100svh-8.75rem)] lg:grid-cols-[minmax(0,34rem)_1fr] lg:gap-12 lg:py-8">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium text-primary">5370 E. Thompson Rd, Suite G</p>
          <h1 className="mt-4 max-w-xl font-heading text-5xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-6xl">
            The hour belongs to you.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            One clinician stays the whole session. Dr. Sakshi Nandal — patients call her Dr. Skye — and the team around her. No referral required. Medicare and most private plans. Saturday is open.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button className="h-12 px-6 text-base" render={<Link href="/book" />}>
              Book a visit
            </Button>
            <Button variant="outline" className="h-12 bg-white px-6 text-base" render={<a href={clinic.phoneHref} />}>
              Call {clinic.phone}
            </Button>
          </div>
          <dl className="mt-12 grid gap-6 border-t border-border pt-6 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-muted-foreground">Self-pay eval</dt>
              <dd className="mt-1 text-base font-semibold">$160 · 60 min</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Self-pay visit</dt>
              <dd className="mt-1 text-base font-semibold">$120 · 55 min</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Saturday</dt>
              <dd className="mt-1 text-base font-semibold">8:00 am – 2:00 pm</dd>
            </div>
          </dl>
        </div>
        <div className="relative min-h-[22rem] overflow-hidden rounded-[2rem] shadow-[0_28px_70px_-28px_rgba(23,78,134,0.55)] ring-1 ring-white/70 sm:min-h-[28rem] lg:min-h-[34rem]">
          <Image
            src="/images/clinic/gym.jpg"
            alt="The Cloud 9 gym, with exercise balls, parallel bars, and the values painted on the wall"
            fill
            priority
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover object-[68%_42%]"
          />
        </div>
      </section>

      <div className="relative rounded-t-[2.5rem] bg-[#f7fbfe] shadow-[0_-28px_80px_-40px_rgba(23,78,134,0.35)]">
      <section className="grid border-b border-border md:grid-cols-3">
        {[
          ["No referral", "Indiana is a direct-access state. You can start without a prescription."],
          ["One person, the whole hour", "Manual therapy, dry needling, and exercise happen with the clinician who stays."],
          ["Often within two weeks", "Most people notice a change in that time. The plan still belongs to the evaluation."],
        ].map(([title, copy]) => (
          <div key={title} className="border-b border-border px-5 py-8 last:border-b-0 md:border-r md:border-b-0 md:px-8 md:last:border-r-0">
            <h2 className="font-heading text-2xl font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">Ten reasons people walk in.</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">Move through the list. The photo is from the clinic.</p>
          </div>
          <Link href="/services" className="hidden text-sm font-medium text-primary sm:inline">
            All services
          </Link>
        </div>
        <div className="mt-10">
          <ServiceExplorer />
        </div>
      </section>

      <section className="bg-foam">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/clinic/about-room.jpg"
              alt="The front of Cloud 9, with the door marked 5370-G"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">Movement is medicine.</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              It is painted on the gym wall, under the values you can read from the floor.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {values.map((value) => (
                <li key={value} className="rounded-full bg-white px-3 py-1 text-sm">
                  {value}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="mt-8 h-11 bg-white px-5" render={<Link href="/gallery" />}>
              Look around the clinic
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-4xl font-semibold tracking-tight">Who you will actually see.</h2>
          <Link href="/about" className="text-sm font-medium text-primary">
            The team
          </Link>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {team.map((person) => {
            const id = person.image.split("/").pop()?.replace(".jpg", "")
            return (
              <li key={person.name}>
                <Link href={`/about#${id}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
                      sizes="(min-width: 1024px) 18vw, 45vw"
                    />
                  </div>
                  <h3 className="mt-3 font-heading text-lg font-semibold leading-tight">{person.name}</h3>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">{person.role}</p>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="border-y border-border bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h2 className="font-heading text-4xl font-semibold tracking-tight">In their words.</h2>
          <p className="mt-2 max-w-xl text-muted-foreground">Five Google reviews, quoted as written. It moves, and it waits while you read.</p>
          <div className="mt-8">
            <ReviewReel />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-16 sm:px-8 md:grid-cols-3">
        {patientTools.slice(0, 3).map((tool) => (
          <Link key={tool.href} href={tool.href} className="rounded-2xl border border-border bg-white p-6 transition hover:border-primary">
            <h2 className="font-heading text-2xl font-semibold">{tool.label}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tool.detail}</p>
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-4 sm:px-8">
        <h2 className="font-heading text-3xl font-semibold">Neighbors they show up for.</h2>
        <div className="mt-8">
          <PartnerRail />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pt-12 pb-4 sm:px-8">
        <h2 className="font-heading text-4xl font-semibold">Before you come in.</h2>
        <div className="mt-6">
          <FaqList items={faqs.slice(0, 4)} />
        </div>
        <Link href="/visit" className="mt-4 inline-flex text-sm font-medium text-primary">
          Hours, fees, and the map
        </Link>
      </section>
      <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <NextStep />
      </div>
      </div>
    </>
  )
}
