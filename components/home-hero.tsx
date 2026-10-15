import Image from "next/image"
import Link from "next/link"
import { BlurFade } from "@/components/ui/blur-fade"
import { Button } from "@/components/ui/button"
import { clinic } from "@/lib/content"

const facts = [
  "5-star Google reviews",
  "Saturday appointments until 2:00 pm",
  "Medicare and most private plans",
]

export function HomeHero() {
  return (
    <section className="bg-[#f4f8fb]">
      <div className="mx-auto grid max-w-[1200px] lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        <figure className="lg:order-2">
          <div className="overflow-hidden bg-white lg:rounded-2xl lg:shadow-sm lg:ring-1 lg:ring-black/5">
            <Image
              src="/images/clinic/gym.jpg"
              alt="The Cloud 9 gym, with parallel bars, exercise balls, and the values painted on the wall"
              width={1600}
              height={1200}
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="aspect-[3/2] w-full object-cover lg:aspect-[4/3]"
            />
          </div>
          <figcaption className="px-5 pt-3 text-sm leading-relaxed text-[#475569] lg:px-0">
            The gym at {clinic.addressLines[0]}, {clinic.addressLines[1]}.
          </figcaption>
        </figure>

        <BlurFade className="px-5 py-8 lg:order-1 lg:px-0 lg:py-0">
          <p className="text-sm font-medium text-[#0F4C5C]">Physical therapy in Indianapolis</p>
          <h1 className="mt-3 max-w-xl text-[2.125rem] leading-[1.12] font-semibold tracking-tight text-balance text-[#14324f] sm:text-6xl">
            Your journey to recovery starts here.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-[#475569] sm:text-lg">
            One clinician stays the whole hour. The plan is built around you, so you can get back to what you love.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button className="h-12 w-full px-6 text-base sm:w-auto" render={<Link href="/book" />}>
              Book appointment
            </Button>
            <a href={clinic.phoneHref} className="inline-flex h-12 items-center justify-center text-base font-semibold text-[#0F4C5C] underline-offset-4 hover:underline sm:justify-start">
              {clinic.phone}
            </a>
          </div>
          <ul className="mt-8 space-y-2 border-t border-black/10 pt-6 text-sm text-[#334155]">
            {facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
          <p className="sr-only">
            Call {clinic.phone} or visit {clinic.address}.
          </p>
        </BlurFade>
      </div>
    </section>
  )
}
