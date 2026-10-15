import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { clinic } from "@/lib/content"

export function HomeHero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#0F4C5C]">
      <Image
        src="/images/clinic/gym.jpg"
        alt="The Cloud 9 gym, with parallel bars, exercise balls, and the values painted on the wall"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[72%_center]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#0F4C5C_0%,rgba(15,76,92,0.92)_34%,rgba(15,76,92,0.45)_62%,rgba(15,76,92,0.12)_100%)]" />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1200px] flex-col justify-center px-5 pt-28 pb-16 sm:px-8">
        <p className="text-xs font-semibold tracking-[0.18em] text-white/80 uppercase">Indianapolis physical therapy</p>
        <h1 className="mt-4 max-w-xl text-[2.25rem] leading-[1.12] font-semibold text-balance text-white sm:text-[3.5rem]">
          Your journey to recovery starts here.
        </h1>
        <p className="mt-5 max-w-lg text-[17px] leading-[1.6] text-white/90 sm:text-lg">
          Expert physical therapy with a plan built around you, so you can get back to doing what you love. One clinician stays the whole hour.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button className="h-12 bg-white px-6 text-base text-[#0F4C5C] hover:bg-white/90" render={<Link href="/book" />}>
            Book appointment
          </Button>
          <Button
            variant="outline"
            className="h-12 border-white/70 bg-transparent px-6 text-base text-white hover:bg-white/10 hover:text-white"
            render={<Link href="/services" />}
          >
            See services
          </Button>
        </div>
        <ul className="mt-10 flex max-w-xl flex-col gap-2 border-t border-white/25 pt-6 text-sm text-white/90 sm:flex-row sm:gap-6">
          <li>5-star Google reviews</li>
          <li>Saturday appointments</li>
          <li>Medicare and most private plans</li>
        </ul>
        <p className="sr-only">Call {clinic.phone} or visit {clinic.address}.</p>
      </div>
    </section>
  )
}
