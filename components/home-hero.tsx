"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { OpenNow } from "@/components/open-now"
import { Button } from "@/components/ui/button"
import { clinic } from "@/lib/content"

const facts = ["60-minute first visit", "One clinician, start to finish", "Saturdays until 2:00 pm"]

// Five circles and a rounded base, unioned, make a cloud-shaped window for the clinic photo.
const cloudMask = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><g fill="#fff"><circle cx="108" cy="168" r="70"/><circle cx="196" cy="118" r="98"/><circle cx="292" cy="160" r="78"/><circle cx="338" cy="208" r="50"/><circle cx="64" cy="214" r="48"/><rect x="64" y="190" width="324" height="82" rx="41"/></g></svg>'
)}")`

export function HomeHero() {
  const reduce = useReducedMotion()

  return (
    <section className="relative isolate overflow-hidden bg-white">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#0b66c9] bg-[url('/images/sky-hero-m.jpg')] bg-cover bg-top md:bg-[url('/images/sky-hero.jpg')]" />
      <div className="mx-auto grid max-w-[1200px] items-center gap-4 px-5 pt-6 pb-40 sm:px-8 md:gap-6 md:pt-20 md:pb-72 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <OpenNow tone="inverse" className="text-white" />
          <p className="mt-4 text-xs font-semibold tracking-[0.12em] text-white uppercase sm:mt-6 sm:text-sm sm:tracking-[0.14em]">
            <span className="hidden sm:inline">Physical therapy · </span>Thompson Road, Indianapolis
          </p>
          <h1 className="mt-3 text-[2.75rem] leading-[0.98] font-semibold tracking-tight text-balance !text-white sm:text-7xl lg:text-[5.5rem]">
            The whole hour is yours.
          </h1>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-white [text-shadow:0_1px_14px_rgba(6,58,120,0.55)] sm:mt-6 sm:text-xl">
            One clinician stays with you for every minute.
            <span className="hidden sm:inline"> The plan, the hands-on work, and the exercise all happen with the same person.</span>
          </p>
          <div className="mt-8 hidden flex-col gap-3 sm:flex sm:flex-row sm:items-center">
            <Button className="h-13 w-full bg-white px-7 text-base text-[#14324f] hover:bg-white/90 sm:w-auto" render={<Link href="/book" />}>
              Book appointment
            </Button>
            <a
              href={clinic.phoneHref}
              className="inline-flex h-13 items-center justify-center rounded-lg bg-[#14324f] px-7 text-base font-semibold text-white hover:bg-[#0f2740] sm:justify-start"
            >
              {clinic.phone}
            </a>
          </div>
          <ul className="mt-8 hidden flex-wrap gap-2 sm:flex">
            {facts.map((fact) => (
              <li key={fact} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#14324f] sm:px-3.5 sm:py-1.5 sm:text-sm">
                {fact}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.figure
          className="order-first mx-auto w-full max-w-[14rem] sm:max-w-[28rem] lg:order-last lg:max-w-none"
          animate={reduce ? undefined : { y: [0, -12, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative aspect-[4/3] w-full" style={{ WebkitMaskImage: cloudMask, maskImage: cloudMask, WebkitMaskSize: "100% 100%", maskSize: "100% 100%" }}>
            <Image
              src="/images/clinic/gym.jpg"
              alt="The Cloud 9 gym, with parallel bars, exercise balls, and the values painted on the wall"
              fill
              priority
              sizes="(min-width: 1024px) 520px, 90vw"
              className="object-cover"
            />
          </div>
          <figcaption className="sr-only">The gym at {clinic.addressLines[0]}</figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
