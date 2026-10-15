"use client"

import { Check } from "lucide-react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { OpenNow } from "@/components/open-now"
import { Button } from "@/components/ui/button"
import { clinic, fees } from "@/lib/content"

const facts = ["60-minute first visit", "One clinician, start to finish", "Saturdays until 2:00 pm"]

export function HomeHero() {
  const reduce = useReducedMotion()

  return (
    <section className="relative isolate overflow-hidden bg-white">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#0b66c9] bg-[url('/images/sky-hero-m.jpg')] bg-cover bg-top md:bg-[url('/images/sky-hero.jpg')]" />
      <div className="mx-auto grid max-w-[1200px] items-center gap-4 px-5 pt-10 pb-40 sm:px-8 md:gap-6 md:pt-20 md:pb-72 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
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
          <div className="mt-8 hidden flex-col gap-3 sm:flex sm:flex-row sm:items-center lg:hidden">
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
          <ul className="mt-8 hidden flex-wrap gap-2 sm:flex lg:hidden">
            {facts.map((fact) => (
              <li key={fact} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#14324f] sm:px-3.5 sm:py-1.5 sm:text-sm">
                {fact}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.aside
          className="hidden lg:block"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={reduce ? undefined : { opacity: 1, y: [0, -8, 0] }}
          transition={reduce ? undefined : { opacity: { duration: 0.8, delay: 0.2 }, y: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
          aria-label="Your first visit"
        >
          <div className="ml-auto max-w-md rounded-3xl bg-white p-8 ring-1 ring-black/5">
            <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">Your first visit</p>
            <p className="mt-3 text-3xl leading-tight font-semibold tracking-tight text-balance text-[#14324f]">A full 60 minutes with your clinician.</p>
            <ul className="mt-6 space-y-3 text-[15px] text-[#334155]">
              {[
                `${fees.evaluation.amount} self-pay. Medicare and most private plans accepted.`,
                "No referral needed in Indiana.",
                "Open Saturdays, 8:00 am to 2:00 pm.",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <Button className="mt-7 h-12 w-full text-base" render={<Link href="/book" />}>
              Book your first visit
            </Button>
            <a href={clinic.phoneHref} className="mt-3 block text-center text-sm font-semibold text-[#14324f] hover:underline">
              Or call {clinic.phone}
            </a>
          </div>
        </motion.aside>
      </div>
    </section>
  )
}
