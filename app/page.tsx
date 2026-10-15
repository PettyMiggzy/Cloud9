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
  const [lead, ...rest] = team

  return (
    <>
      <section className="relative min-h-[92svh] bg-black text-white">
        <Image
          src="/images/clinic/gym.jpg"
          alt="The Cloud 9 gym, with exercise balls, parallel bars, and the values painted on the wall"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-transparent" />
        <div className="relative flex min-h-[92svh] flex-col justify-end px-4 pt-28 pb-8 sm:px-8 lg:px-12 lg:pb-12">
          <p className="font-heading text-sm tracking-[0.28em] text-[var(--sun)] uppercase">5370-G · Thompson Road</p>
          <h1 className="mt-4 max-w-5xl font-heading text-6xl leading-[0.82] sm:text-8xl lg:text-[8.5rem]">
            The hour
            <br />
            belongs
            <br />
            <span className="bg-[var(--sun)] px-2 text-black">to you.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/85">
            One clinician for the whole session. Dr. Sakshi Nandal — patients call her Dr. Skye. No referral. Medicare and most private plans. Open Saturday.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button className="h-12 bg-[var(--sun)] px-6 text-base text-black hover:bg-white" render={<Link href="/book" />}>
              Book a visit
            </Button>
            <Button
              variant="outline"
              className="h-12 border-white/50 bg-transparent px-6 text-base text-white hover:bg-white hover:text-black"
              render={<a href={clinic.phoneHref} />}
            >
              Call {clinic.phone}
            </Button>
          </div>
        </div>
      </section>

      <section className="grid bg-[var(--sun)] text-black sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["$160", "Self-pay evaluation, 60 min"],
          ["$120", "Self-pay treatment, 55 min"],
          ["No referral", "Indiana direct access"],
          ["Sat 8–2", "Last start at 1:00 pm"],
        ].map(([figure, label]) => (
          <div key={label} className="border-black/15 px-5 py-6 sm:border-r sm:last:border-r-0">
            <p className="font-heading text-4xl leading-none sm:text-5xl">{figure}</p>
            <p className="mt-2 text-sm">{label}</p>
          </div>
        ))}
      </section>

      <section className="grid bg-white lg:grid-cols-[auto_1.1fr_0.9fr]">
        <p className="hidden items-center px-6 font-heading text-sm tracking-[0.45em] text-foreground/50 uppercase [writing-mode:vertical-rl] lg:flex">
          Our values
        </p>
        <ul className="px-4 py-12 sm:px-8 lg:py-16">
          <li className="mb-6 font-heading text-sm tracking-[0.45em] text-foreground/50 uppercase lg:hidden">Our values</li>
          {values.map((value) => (
            <li key={value} className="font-heading text-5xl leading-[0.9] tracking-tight uppercase sm:text-7xl">
              {value}
            </li>
          ))}
          <li className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">
            Painted on the gym wall, where you can read them from the floor. Under the list: movement is medicine.
          </li>
        </ul>
        <div className="relative min-h-80">
          <Image
            src="/images/clinic/gym.jpg"
            alt="The values painted on the Cloud 9 gym wall"
            fill
            sizes="(min-width: 1024px) 36vw, 100vw"
            className="object-cover object-left"
          />
        </div>
      </section>

      <section className="border-t border-black px-4 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mb-8 flex items-end justify-between gap-6">
          <h2 className="max-w-xl font-heading text-5xl leading-[0.9] sm:text-7xl">Ten reasons people walk in.</h2>
          <Link href="/services" className="hidden shrink-0 text-sm font-medium underline decoration-[var(--sun)] decoration-4 underline-offset-4 sm:inline">
            All of them
          </Link>
        </div>
        <ServiceExplorer />
      </section>

      <section className="bg-deep px-4 py-16 text-white sm:px-8 lg:px-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-5xl leading-[0.9] sm:text-7xl">The people in the room.</h2>
          <Link href="/about" className="text-sm font-medium text-[var(--sun)]">
            Full bios
          </Link>
        </div>
        <div className="mt-8 grid gap-3 lg:grid-cols-12">
          <Link href={`/about#${lead.image.split("/").pop()?.replace(".jpg", "")}`} className="group relative min-h-[32rem] overflow-hidden lg:col-span-7">
            <Image src={lead.image} alt={lead.name} fill className="object-cover object-top transition duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 55vw, 100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="font-heading text-sm tracking-[0.2em] text-[var(--sun)] uppercase">Clinical director</p>
              <h3 className="mt-2 font-heading text-5xl leading-none">{lead.name}</h3>
              <p className="mt-2 max-w-md text-sm text-white/80">Patients call her Dr. Skye. Manual therapy and dry needling, twelve years in.</p>
            </div>
          </Link>
          <ul className="grid grid-cols-2 gap-3 lg:col-span-5">
            {rest.map((person) => {
              const id = person.image.split("/").pop()?.replace(".jpg", "")
              return (
                <li key={person.name}>
                  <Link href={`/about#${id}`} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-black">
                      <Image src={person.image} alt={person.name} fill className="object-cover object-top transition duration-700 group-hover:scale-105" sizes="240px" />
                    </div>
                    <h3 className="mt-2 font-heading text-xl leading-tight">{person.name}</h3>
                    <p className="text-xs text-white/60">{person.role}</p>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="bg-black px-4 py-16 text-white sm:px-8 lg:px-12">
        <h2 className="font-heading text-5xl leading-none sm:text-7xl">In their words.</h2>
        <p className="mt-3 max-w-md text-white/60">Five Google reviews, quoted as written. It moves, and it waits while you read.</p>
        <div className="mt-8">
          <ReviewReel />
        </div>
      </section>

      <section className="grid border-b border-black md:grid-cols-3">
        {patientTools.slice(0, 3).map((tool, index) => (
          <Link key={tool.href} href={tool.href} className="group border-black px-5 py-12 hover:bg-[var(--sun)] md:border-r md:last:border-r-0">
            <p className="font-heading text-sm">{String(index + 1).padStart(2, "0")}</p>
            <h2 className="mt-4 font-heading text-4xl leading-none sm:text-5xl">{tool.label}</h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground group-hover:text-black">{tool.detail}</p>
          </Link>
        ))}
      </section>

      <section className="px-4 py-16 sm:px-8 lg:px-12">
        <h2 className="font-heading text-4xl">Neighbors they show up for.</h2>
        <div className="mt-8">
          <PartnerRail />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-8">
        <h2 className="font-heading text-5xl leading-none">Before you come in.</h2>
        <div className="mt-6">
          <FaqList items={faqs.slice(0, 4)} />
        </div>
        <Link href="/visit" className="mt-4 inline-flex text-sm font-medium underline decoration-[var(--sun)] decoration-4 underline-offset-4">
          Hours, fees, and the map
        </Link>
      </section>
      <div className="px-4 pb-16 sm:px-8 lg:px-12">
        <NextStep />
      </div>
    </>
  )
}
