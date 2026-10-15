import Image from "next/image"
import Link from "next/link"
import { BlurFade } from "@/components/ui/blur-fade"
import { Button } from "@/components/ui/button"
import { clinic } from "@/lib/content"

const facts = [
  { title: "5-star", detail: "Google reviews" },
  { title: "Saturday", detail: "Appointments until 2" },
  { title: "Medicare", detail: "And most private plans" },
]

export function HomeHero() {
  return (
    <section className="bg-[#f4f8fb]">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <BlurFade>
          <p className="text-sm font-medium text-[#0F4C5C]">Physical therapy in Indianapolis</p>
          <h1 className="mt-4 max-w-xl text-4xl leading-[1.08] font-semibold tracking-tight text-balance text-[#14324f] sm:text-6xl">
            Your journey to recovery starts here.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-[#475569]">
            One clinician stays the whole hour. The plan is built around you, so you can get back to what you love.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button className="h-12 px-6 text-base" render={<Link href="/book" />}>
              Book appointment
            </Button>
            <a href={clinic.phoneHref} className="inline-flex h-12 items-center text-base font-semibold text-[#0F4C5C] underline-offset-4 hover:underline">
              {clinic.phone}
            </a>
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-black/10 pt-6">
            {facts.map((fact) => (
              <div key={fact.title}>
                <dt className="text-sm font-semibold text-[#1E293B]">{fact.title}</dt>
                <dd className="mt-1 text-sm leading-snug text-[#475569]">{fact.detail}</dd>
              </div>
            ))}
          </dl>
          <p className="sr-only">
            Call {clinic.phone} or visit {clinic.address}.
          </p>
        </BlurFade>

        <BlurFade delay={0.08}>
          <figure>
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
              <Image
                src="/images/clinic/gym.jpg"
                alt="The Cloud 9 gym, with parallel bars, exercise balls, and the values painted on the wall"
                width={1600}
                height={1200}
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm leading-relaxed text-[#475569]">
              The gym at {clinic.addressLines[0]}, {clinic.addressLines[1]}.
            </figcaption>
          </figure>
        </BlurFade>
      </div>
    </section>
  )
}
