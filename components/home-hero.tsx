import Image from "next/image"
import Link from "next/link"
import { CloudMark } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { clinic } from "@/lib/content"

export function HomeHero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#d7eef8]">
      <Image
        src="/images/sky.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1200px] items-center gap-8 px-5 pt-28 pb-28 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-x-14 lg:gap-y-6 lg:pt-32 lg:pb-24">
        <CloudMark className="cloud-float-lg h-28 w-40 lg:col-start-2 lg:row-start-1 lg:h-40 lg:w-56 lg:justify-self-start lg:self-end" />
        <div className="lg:col-start-1 lg:row-span-2 lg:row-start-1">
          <p className="text-xs font-semibold tracking-[0.18em] text-[#174E86] uppercase">Indianapolis physical therapy</p>
          <h1 className="mt-4 max-w-xl text-[2.25rem] leading-[1.12] font-semibold text-balance text-[#174E86] sm:text-[3.5rem]">
            Your journey to recovery starts here.
          </h1>
          <p className="mt-5 max-w-lg text-[17px] leading-[1.6] text-[#334155] sm:text-lg">
            Expert physical therapy with a plan built around you, so you can get back to doing what you love. One clinician stays the whole hour.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button className="h-12 px-6 text-base" render={<Link href="/book" />}>
              Book appointment
            </Button>
            <Button variant="outline" className="h-12 bg-white/80 px-6 text-base" render={<Link href="/services" />}>
              See services
            </Button>
          </div>
          <ul className="mt-10 flex max-w-xl flex-col gap-2 border-t border-[#174E86]/15 pt-6 text-sm text-[#334155] sm:flex-row sm:gap-6">
            <li>5-star Google reviews</li>
            <li>Saturday appointments</li>
            <li>Medicare and most private plans</li>
          </ul>
          <p className="sr-only">
            Call {clinic.phone} or visit {clinic.address}.
          </p>
        </div>

        <div className="lg:col-start-2 lg:row-start-2 lg:-mt-6">
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
            <Image
              src="/images/clinic/gym.jpg"
              alt="The Cloud 9 gym, with parallel bars, exercise balls, and the values painted on the wall"
              width={1600}
              height={1200}
              priority
              sizes="(min-width: 1024px) 520px, 100vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
