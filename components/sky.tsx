"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { cn } from "cn"

const puffs = {
  1: { w: 800, h: 377 },
  2: { w: 800, h: 601 },
  3: { w: 800, h: 489 },
  4: { w: 1100, h: 284 },
} as const

export type PuffId = keyof typeof puffs

/** A decorative 3D cloud. It drifts sideways on its own and slides up or down against the scroll. */
export function Puff({
  n,
  className,
  depth = 0.2,
  drift = 16,
  delay = 0,
  priority = false,
}: {
  n: PuffId
  className?: string
  depth?: number
  drift?: number
  delay?: number
  priority?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [depth * 260, depth * -260])

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      style={reduce ? undefined : { y }}
      className={cn("pointer-events-none absolute select-none", className)}
    >
      <div className="drift" style={{ animationDuration: `${drift}s`, animationDelay: `-${delay}s` }}>
        <Image
          src={`/images/puff-${n}.webp`}
          alt=""
          width={puffs[n].w}
          height={puffs[n].h}
          priority={priority}
          sizes="(min-width: 768px) 360px, 200px"
          className="h-auto w-full"
        />
      </div>
    </motion.div>
  )
}
