import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { FaqList } from "@/components/faq-list"
import { Button } from "@/components/ui/button"
import { clinic, faqs, partners, reviews, services, team } from "@/lib/content"

export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            Suite G · Thompson Road · Indianapolis
          </p>
          <h1 className="mt-4 max-w-xl font-heading text-5xl leading-[1.05] text-balance sm:text-6xl">
            The hour belongs to you.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Cloud 9 is one-to-one physical therapy on the south side. You stay with a clinician for the session —
            Dr. Sakshi Nandal, whom patients call Dr. Skye, and the team around her. Indiana does not require a
            referral. Medicare and most private plans are accepted, and Saturday is open.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button className="h-12 px-6 text-base" render={<Link href="/book" />}>
              Book a visit
            </Button>
            <Button variant="outline" className="h-12 px-6 text-base" render={<a href={clinic.phoneHref} />}>
              Call {clinic.phone}
            </Button>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6 text-sm">
            <div>
              <dt className="text-muted-foreground">Sessions</dt>
              <dd className="mt-1 font-medium">One clinician, the whole time</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">First change</dt>
              <dd className="mt-1 font-medium">Often within two weeks</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Saturday</dt>
              <dd className="mt-1 font-medium">8:00 am – 2:00 pm</dd>
            </div>
          </dl>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image
              src="/images/clinic/about-room.jpg"
              alt="The front of Cloud 9, with the door marked 5370-G"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-4 flex max-w-xs items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm sm:left-6">
            <Image
              src="/images/team/sakshi.jpg"
              alt="Dr. Sakshi Nandal"
              width={72}
              height={72}
              className="size-16 rounded-full object-cover"
            />
            <p className="text-sm leading-snug">
              <span className="font-medium">Dr. Sakshi Nandal</span>
              <span className="mt-0.5 block text-muted-foreground">Clinical director. Patients call her Dr. Skye.</span>
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 border-y border-border bg-foam">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
          {[
            ["No referral", "Indiana is a direct-access state. You can start physical therapy without a prescription."],
            ["The fee, up front", "A 60-minute evaluation is $160. A 55-minute treatment is $120. Medicare is different, and they will check your plan."],
            ["Hands, not a hallway", "Manual therapy, dry needling, and exercise happen with someone who stays."],
          ].map(([title, copy]) => (
            <div key={title}>
              <h2 className="font-heading text-2xl">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Care</p>
            <h2 className="mt-2 font-heading text-4xl">Ten reasons people walk in.</h2>
          </div>
          <Link href="/services" className="hidden items-center gap-1 text-sm font-medium text-primary sm:inline-flex">
            All services <ArrowRightIcon className="size-4" />
          </Link>
        </div>
        <ul className="mt-8 divide-y divide-border border-y border-border">
          {services.map((service, index) => (
            <li key={service.slug}>
              <Link href={`/services/${service.slug}`} className="group grid items-center gap-4 py-4 sm:grid-cols-[4rem_7rem_1fr_auto]">
                <span className="text-sm text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                <div className="relative hidden h-16 overflow-hidden rounded-lg sm:block">
                  <Image src={service.image} alt="" fill className="object-cover" sizes="112px" />
                </div>
                <span>
                  <span className="block font-heading text-2xl group-hover:text-primary">{service.name}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{service.short}</span>
                </span>
                <ArrowRightIcon className="hidden size-4 text-primary sm:block" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-deep text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image
              src="/images/clinic/gym.jpg"
              alt="The Cloud 9 gym, with the clinic values painted on the wall"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-white/60 uppercase">On the wall</p>
            <h2 className="mt-2 font-heading text-4xl">Movement is medicine.</h2>
            <p className="mt-4 leading-relaxed text-white/80">
              The gym is not a waiting room with a few bands. Parallel bars, bikes, and treatment tables share one
              floor, and the values are painted where you can see them: trust, excellence, accountability,
              collaboration, service, innovation, gratitude.
            </p>
            <Button variant="secondary" className="mt-6 h-11 px-5" render={<Link href="/gallery" />}>
              Look around the clinic
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">People</p>
            <h2 className="mt-2 font-heading text-4xl">Who you will actually see.</h2>
          </div>
          <Link href="/about" className="text-sm font-medium text-primary">
            The whole team
          </Link>
        </div>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.slice(0, 3).map((person) => (
            <li key={person.name} className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="relative aspect-[4/5]">
                <Image src={person.image} alt={person.name} fill className="object-cover object-top" sizes="(min-width: 1024px) 30vw, 50vw" />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-2xl">{person.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{person.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="font-heading text-4xl">In their words.</h2>
          <p className="mt-2 max-w-xl text-muted-foreground">Five notes patients left on Google. Quoted as written.</p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {reviews.map((review) => (
              <li key={review.url} className="rounded-2xl border border-border p-5">
                <p className="text-sm tracking-widest text-primary">★★★★★</p>
                <p className="mt-3 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                <a href={review.url} className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
                  {review.name} on Google
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-heading text-4xl">Neighbors they show up for.</h2>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {partners.map((partner) => (
            <li key={partner.name} className="flex h-28 items-center justify-center rounded-2xl border border-border bg-white px-4">
              <Image src={partner.image} alt={partner.name} width={180} height={80} className="max-h-16 w-auto object-contain" />
            </li>
          ))}
        </ul>
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
    </>
  )
}
