"use client"

import Image from "next/image"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react"

/** A small cloud that climbs a track as you scroll, so the page ends on cloud nine. */
export function Ascent() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })
  const top = useTransform(smooth, [0, 1], ["100%", "0%"])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed top-1/2 right-5 z-30 hidden -translate-y-1/2 flex-col items-center gap-2 xl:flex print:hidden">
      <span className="text-sm font-semibold text-[#2E96CC]">9</span>
      <div className="relative h-40 w-px bg-[#2E96CC]/40">
        <motion.div style={reduce ? { top: "100%" } : { top }} className="absolute left-1/2 w-9 -translate-x-1/2 -translate-y-1/2">
          <Image src="/images/puff-3.webp" alt="" width={800} height={489} sizes="36px" className="h-auto w-full" />
        </motion.div>
      </div>
    </div>
  )
}
