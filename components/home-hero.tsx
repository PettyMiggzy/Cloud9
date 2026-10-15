"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { CloudEdge } from "@/components/cloud-edge"
import { OpenNow } from "@/components/open-now"
import { Puff } from "@/components/sky"
import { Button } from "@/components/ui/button"
import { clinic } from "@/lib/content"

const MotionImage = motion.create(Image)

const facts = ["60-minute first visit", "One clinician, start to finish", "Saturdays until 2:00 pm"]

export function HomeHero() {
  const reduce = useReducedMotion()

  return (
    <section className="relative isolate overflow-hidden bg-[#dcebf8]">
      <Image src="/images/sky.jpg" alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
      <div className="relative z-10 mx-auto grid max-w-[1200px] items-center gap-4 px-5 pt-6 pb-28 sm:px-8 md:pt-16 md:pb-40 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <OpenNow className="rounded-full bg-white/80 px-3 py-1.5 text-[#14324f]" />
          <p className="mt-6 text-sm font-semibold tracking-[0.14em] text-[#0F4C5C] uppercase">
            Physical therapy · Thompson Road, Indianapolis
          </p>
          <h1 className="mt-4 text-[3rem] leading-[0.98] font-semibold tracking-tight text-balance text-[#14324f] sm:text-7xl lg:text-[5.5rem]">
            The whole hour is yours.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#1e3a56] sm:text-xl">
            One clinician stays with you for every minute. The plan, the hands-on work, and the exercise all happen with the same person.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button className="h-13 w-full px-7 text-base sm:w-auto" render={<Link href="/book" />}>
              Book appointment
            </Button>
            <a
              href={clinic.phoneHref}
              className="inline-flex h-13 items-center justify-center rounded-lg bg-white/80 px-7 text-base font-semibold text-[#14324f] hover:bg-white sm:justify-start"
            >
              {clinic.phone}
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2">
            {facts.map((fact) => (
              <li key={fact} className="rounded-full border border-[#14324f]/15 bg-white/70 px-3 py-1 text-xs font-medium sm:px-3.5 sm:py-1.5 sm:text-sm text-[#14324f]">
                {fact}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="relative order-first mx-auto w-full max-w-[17rem] sm:max-w-[26rem] lg:order-last lg:max-w-[34rem]">
          <MotionImage
            src="/images/art-cloud.webp"
            alt="Soft white cloud with a ribbon of blue wave, made for this site"
            width={1100}
            height={1232}
            priority
            sizes="(min-width: 1024px) 520px, 90vw"
            className="h-auto w-full"
            animate={reduce ? undefined : { y: [0, -14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      <Puff n={4} priority depth={0.1} drift={22} className="top-[1%] right-[-12%] w-52 md:top-[3%] md:right-[22%] md:w-[26rem]" />
      <Puff n={3} depth={0.35} drift={14} delay={4} className="top-[44%] right-[2%] w-24 md:top-[58%] md:right-[3%] md:w-44" />
      <Puff n={1} depth={0.25} drift={18} delay={9} className="bottom-[16%] left-[42%] hidden w-44 md:block" />
      <CloudEdge className="text-[#eaf4fc]" />
      <CloudEdge className="translate-y-2 text-white" />
    </section>
  )
}
