"use client"

import { motion, useReducedMotion } from "motion/react"
import { CloudEdge } from "@/components/cloud-edge"
import { Puff } from "@/components/sky"
import { processSteps } from "@/lib/content"

const OUTER = 2 * Math.PI * 88
const INNER = 2 * Math.PI * 68

export function HomeHour() {
  const reduce = useReducedMotion()
  const draw = (to: number, delay: number) =>
    reduce
      ? { initial: false as const, animate: { pathLength: to } }
      : {
          initial: { pathLength: 0 },
          whileInView: { pathLength: to },
          viewport: { once: true, amount: 0.5 },
          transition: { duration: 1.6, delay, ease: "easeOut" as const },
        }

  return (
    <section className="relative isolate overflow-hidden bg-[#14324f] py-28 text-white md:py-44">
      <CloudEdge hang className="text-white" />
      <Puff n={2} depth={0.3} drift={20} className="top-[10%] -right-[6%] w-40 opacity-30 md:w-72" />
      <Puff n={1} depth={0.45} drift={17} delay={6} className="bottom-[14%] -left-[5%] w-36 opacity-20 md:w-64" />
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-24">
        <div>
          <p className="text-sm font-semibold tracking-[0.14em] text-[#A9E4F4] uppercase">How a visit works</p>
          <h2 className="mt-4 text-[2.25rem] leading-[1.05] font-semibold tracking-tight text-balance text-white sm:text-6xl">
            Sixty minutes. One person.
          </h2>
          <ol className="mt-10 space-y-8">
            {processSteps.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-4">
                <span className="text-2xl font-semibold text-[#2E96CC]">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-white/75">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
          <svg viewBox="0 0 200 200" className="size-full -rotate-90" role="img" aria-label="A 60-minute evaluation ring and a 55-minute follow-up ring">
            <circle cx="100" cy="100" r="88" fill="none" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="10" />
            <circle cx="100" cy="100" r="68" fill="none" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="10" />
            <motion.circle
              cx="100" cy="100" r="88" fill="none" stroke="#A9E4F4" strokeWidth="10" strokeLinecap="round"
              strokeDasharray={OUTER} pathLength={1} {...draw(1, 0)}
            />
            <motion.circle
              cx="100" cy="100" r="68" fill="none" stroke="#2E96CC" strokeWidth="10" strokeLinecap="round"
              strokeDasharray={INNER} pathLength={1} {...draw(55 / 60, 0.3)}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-7xl font-semibold tracking-tight sm:text-8xl">60</p>
            <p className="mt-1 text-sm text-white/75">minute first visit</p>
            <p className="mt-4 text-sm font-semibold text-[#A9E4F4]">then 55 with the same clinician</p>
          </div>
        </div>
      </div>
      <CloudEdge className="text-white" />
    </section>
  )
}
