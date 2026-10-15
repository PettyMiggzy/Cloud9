import Image from "next/image"
import Link from "next/link"
import { FaqList } from "@/components/faq-list"
import { PartnerRail } from "@/components/partner-rail"
import { ReviewReel } from "@/components/review-reel"
import { ServiceExplorer } from "@/components/service-explorer"
import { Button } from "@/components/ui/button"
import { NextStep } from "@/components/next-step"
import { clinic, faqs, patientTools, team, values } from "@/lib/content"

const wall = [...values, "Movement is medicine"]

export default function HomePage() {
  return (
    <>
      <section className="grid min-h-[calc(100svh-7.5rem)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-between bg-deep px-5 py-10 text-white sm:px-10 lg:px-12 lg:py-14">
          <p className="text-sm text-white/75">Suite G · Thompson Road</p>
          <div className="mt-10">
            <p className="font-heading text-sm tracking-[0.22em] text-[var(--sun)] uppercase">South side Indianapolis</p>
            <h1 className="mt-4 max-w-xl font-heading text-6xl leading-[0.88] text-balance sm:text-7xl lg:text-8xl">
              The hour belongs to you.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/80">
              One clinician stays for the whole session. Dr. Sakshi Nandal — patients call her Dr. Skye — and the team around her. No referral required. Medicare and most private plans. Saturday is open.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="h-12 bg-white px-6 text-base text-deep hover:bg-white/90" render={<Link href="/book" />}>
                Book a visit
              </Button>
              <Button
                variant="outline"
                className="h-12 border-white/35 bg-transparent px-6 text-base text-white hover:bg-white/10 hover:text-white"
                render={<a href={clinic.phoneHref} />}
              >
                Call {clinic.phone}
              </Button>
            </div>
          </div>
          <dl className="mt-12 grid gap-6 border-t border-white/15 pt-6 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-white/55">Sessions</dt>
              <dd className="mt-1 font-medium">One clinician, the whole time</dd>
            </div>
            <div>
              <dt className="text-white/55">First change</dt>
              <dd className="mt-1 font-medium">Often within two weeks</dd>
            </div>
            <div>
              <dt className="text-white/55">Saturday</dt>
              <dd className="mt-1 font-medium">8:00 am – 2:00 pm</dd>
            </div>
          </dl>
        </div>
        <div className="relative min-h-[70vw] lg:min-h-0">
          <Image
            src="/images/clinic/gym.jpg"
            alt="The Cloud 9 gym, with the clinic values painted on the wall"
            fill
            priority
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover"
          />
          <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-4 bg-deep/85 p-4 text-white backdrop-blur-sm sm:right-auto sm:max-w-sm">
            <Image
              src="/images/team/sakshi.jpg"
              alt="Dr. Sakshi Nandal"
              width={64}
              height={80}
              className="h-16 w-14 object-cover object-top"
            />
            <p className="text-sm leading-snug">
              <span className="font-heading text-lg">Dr. Sakshi Nandal</span>
              <span className="mt-0.5 block text-white/70">Clinical director. Patients call her Dr. Skye.</span>
            </p>
          </div>
        </div>
      </section>

      <div className="marquee overflow-hidden border-y border-foreground/10 bg-[var(--sun)] text-deep">
        <div className="marquee-track flex w-max py-3">
          {[0, 1].map((copy) => (
            <p key={copy} className="flex items-center" aria-hidden={copy === 1 || undefined}>
              {wall.map((word) => (
                <span key={`${copy}-${word}`} className="px-4 font-heading text-2xl tracking-tight uppercase sm:text-3xl">
                  {word}
                  <span className="px-4 text-deep/40">/</span>
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>

      <section className="mx-auto grid max-w-6xl md:grid-cols-3">
        {[
          ["01", "No referral", "Indiana is a direct-access state. You can start physical therapy without a prescription."],
          ["02", "The fee, up front", "A 60-minute evaluation is $160. A 55-minute treatment is $120. Medicare is different, and they will check your plan."],
          ["03", "Hands, not a hallway", "Manual therapy, dry needling, and exercise happen with someone who stays."],
        ].map(([index, title, copy]) => (
          <div key={title} className="border-b border-border px-5 py-10 md:border-r md:border-b-0 md:px-8 md:last:border-r-0">
            <p className="font-heading text-sm text-primary">{index}</p>
            <h2 className="mt-3 font-heading text-3xl">{title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p>
          </div>
        ))}
      </section>

      <section className="bg-foam">
        <div className="mx-auto grid max-w-6xl gap-px bg-border md:grid-cols-3">
          {patientTools.slice(0, 3).map((tool, index) => (
            <Link key={tool.href} href={tool.href} className="group bg-foam px-5 py-10 transition-colors hover:bg-white sm:px-8">
              <p className="font-heading text-sm text-primary">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-3 font-heading text-4xl leading-none group-hover:text-primary">{tool.label}</h2>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{tool.detail}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="flex items-end justify-between gap-6">
          <h2 className="max-w-xl font-heading text-5xl leading-[0.95] sm:text-6xl">Ten reasons people walk in.</h2>
          <Link href="/services" className="hidden text-sm font-medium text-primary sm:inline">
            All services
          </Link>
        </div>
        <div className="mt-10">
          <ServiceExplorer />
        </div>
      </section>

      <section className="relative min-h-[32rem] bg-deep text-white">
        <Image
          src="/images/clinic/about-room.jpg"
          alt="The front of Cloud 9, with the door marked 5370-G"
          fill
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="relative mx-auto flex min-h-[32rem] max-w-6xl flex-col justify-end px-4 py-14">
          <p className="font-heading text-sm tracking-[0.22em] text-[var(--sun)] uppercase">On the wall</p>
          <h2 className="mt-3 max-w-3xl font-heading text-6xl leading-[0.9] sm:text-7xl">Movement is medicine.</h2>
          <p className="mt-5 max-w-lg text-white/85">
            Parallel bars, bikes, and treatment tables share one floor. The values are painted where you can see them.
          </p>
          <Button variant="secondary" className="mt-8 h-11 w-fit px-5" render={<Link href="/gallery" />}>
            Look around the clinic
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-5xl leading-none">Who you will actually see.</h2>
          <Link href="/about" className="text-sm font-medium text-primary">
            The whole team
          </Link>
        </div>
        <ul className="mt-8 flex gap-3 overflow-x-auto pb-2">
          {team.map((person) => {
            const id = person.image.split("/").pop()?.replace(".jpg", "")
            return (
              <li key={person.name} className="w-64 shrink-0 sm:w-72">
                <Link href={`/about#${id}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover object-top transition duration-700 group-hover:scale-105"
                      sizes="280px"
                    />
                  </div>
                  <h3 className="mt-3 font-heading text-2xl">{person.name}</h3>
                  <p className="text-sm text-muted-foreground">{person.role}</p>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="bg-deep py-16 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-heading text-5xl">In their words.</h2>
          <p className="mt-2 max-w-xl text-white/70">Five notes patients left on Google. Quoted as written.</p>
          <div className="mt-8">
            <ReviewReel />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-heading text-4xl">Neighbors they show up for.</h2>
        <div className="mt-8">
          <PartnerRail />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16">
        <h2 className="font-heading text-4xl">Before you come in.</h2>
        <div className="mt-6">
          <FaqList items={faqs.slice(0, 4)} />
        </div>
        <Link href="/visit" className="mt-4 inline-flex text-sm font-medium text-primary">
          Hours, fees, and the rest of the questions
        </Link>
      </section>
      <div className="mx-auto max-w-6xl px-4 pb-16">
        <NextStep />
      </div>
    </>
  )
}
