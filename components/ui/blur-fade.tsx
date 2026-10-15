"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { cn } from "cn"

type Direction = "up" | "down" | "left" | "right"

export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.4,
  offset = 6,
  direction = "down",
  inView = false,
  blur = "6px",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  offset?: number
  direction?: Direction
  inView?: boolean
  blur?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const shown = useInView(ref, { once: true, margin: "-50px" })
  const reduce = useReducedMotion()
  const active = !inView || shown
  const axis = direction === "left" || direction === "right" ? "x" : "y"
  const shift = direction === "right" || direction === "down" ? -offset : offset

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ [axis]: shift, opacity: 0, filter: `blur(${blur})` }}
      animate={active ? { [axis]: 0, opacity: 1, filter: "blur(0px)" } : undefined}
      transition={{ delay: 0.04 + delay, duration, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
