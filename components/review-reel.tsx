"use client"

import { useEffect, useState } from "react"
import { reviews } from "@/lib/content"
import { cn } from "cn"

const INTERVAL = 7000

export function ReviewReel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const review = reviews[index]

  useEffect(() => {
    if (paused) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % reviews.length)
    }, INTERVAL)
    return () => window.clearInterval(id)
  }, [paused])

  function go(next: number) {
    setIndex((next + reviews.length) % reviews.length)
  }

  return (
    <div
      className="overflow-hidden border border-white/15 bg-white/8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false)
      }}
    >
      <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_16rem]">
        <blockquote>
          <p className="text-xs tracking-[0.18em] text-[var(--sun)] uppercase">Google review</p>
          <p key={review.url} className="stage-photo mt-4 font-heading text-2xl leading-snug text-white sm:text-4xl">
            “{review.text}”
          </p>
          <a href={review.url} className="mt-6 inline-block text-sm font-medium text-[var(--sun)] hover:underline">
            {review.name}
          </a>
        </blockquote>
        <div className="flex flex-row items-end justify-between gap-3 lg:flex-col lg:items-stretch">
          <div className="flex gap-2">
            <button type="button" className="border border-white/30 px-3 py-2 text-sm text-white" onClick={() => go(index - 1)}>
              Prev
            </button>
            <button type="button" className="border border-white/30 px-3 py-2 text-sm text-white" onClick={() => go(index + 1)}>
              Next
            </button>
          </div>
          <div className="flex gap-2 lg:justify-end" role="tablist" aria-label="Reviews">
            {reviews.map((item, itemIndex) => (
              <button
                key={item.url}
                type="button"
                role="tab"
                aria-selected={itemIndex === index}
                aria-label={`Show review from ${item.name}`}
                onClick={() => setIndex(itemIndex)}
                className={cn("h-1.5 transition-all", itemIndex === index ? "w-8 bg-[var(--sun)]" : "w-3 bg-white/30")}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="h-1 bg-white/15">
        <div key={review.url} className={cn("review-bar h-full bg-[var(--sun)]", paused && "is-paused")} />
      </div>
    </div>
  )
}
