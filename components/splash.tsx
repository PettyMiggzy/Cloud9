"use client"

import { useEffect, useRef, useState } from "react"

type Particle = {
  sx: number
  sy: number
  tx: number
  ty: number
  delay: number
  r0: number
  r1: number
  a0: number
  a1: number
  phase: number
  swirl: number
}

const GATHER_START = 0.15
const GATHER_TIME = 1.8
const TEXT_IN = 2.15
const EXIT_AT = 3.5
const clamp = (n: number) => Math.min(1, Math.max(0, n))
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const rand = (a: number, b: number) => a + Math.random() * (b - a)

function gaussian() {
  return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5
}

function makeSprite() {
  const size = 128
  const sprite = document.createElement("canvas")
  sprite.width = sprite.height = size
  const g = sprite.getContext("2d")!
  const fill = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  fill.addColorStop(0, "rgba(255,255,255,1)")
  fill.addColorStop(0.45, "rgba(255,255,255,0.55)")
  fill.addColorStop(1, "rgba(255,255,255,0)")
  g.fillStyle = fill
  g.fillRect(0, 0, size, size)
  return sprite
}

/** Plays once per visit on the home page: cloud banks drift, then gather into the Cloud 9 wordmark. */
export function Splash() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const finishRef = useRef<() => void>(() => {})
  const [done, setDone] = useState(false)

  useEffect(() => {
    const html = document.documentElement
    if (html.dataset.splash !== "pending") {
      setDone(true)
      return
    }
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    let raf = 0
    let cancelled = false
    let exiting = false

    const finish = () => {
      if (exiting) return
      exiting = true
      try {
        sessionStorage.setItem("c9-splash", "1")
      } catch {
        // Private mode. The splash may replay, which is harmless.
      }
      // The wordmark lifts away first, then the sky fades into the hero (same photo underneath).
      canvas.style.opacity = "0"
      canvas.style.transform = "translateY(-22px) scale(1.03)"
      if (buttonRef.current) buttonRef.current.style.opacity = "0"
      if (bgRef.current) bgRef.current.style.opacity = "0"
      window.setTimeout(() => {
        delete html.dataset.splash
        setDone(true)
      }, 950)
    }
    finishRef.current = finish
    const onKey = () => finish()
    window.addEventListener("keydown", onKey)

    const start = async () => {
      const W = window.innerWidth
      const H = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.scale(dpr, dpr)

      const family = getComputedStyle(document.body).getPropertyValue("--font-manrope") || "sans-serif"
      const size = Math.min(W * 0.245, 230)
      const unit = size / 230
      const font = `700 ${size}px ${family}`
      try {
        await document.fonts.load(font, "Cloud 9")
      } catch {
        // fall back to whatever the browser has
      }
      if (cancelled) return

      const cx = W / 2
      const cy = H * 0.46

      // Sample the wordmark's pixels.
      const sample = document.createElement("canvas")
      sample.width = W
      sample.height = H
      const s = sample.getContext("2d", { willReadFrequently: true })!
      s.font = font
      s.textAlign = "center"
      s.textBaseline = "middle"
      s.fillStyle = "#000"
      s.fillText("Cloud 9", cx, cy)
      const data = s.getImageData(0, 0, W, H).data
      const points: Array<[number, number]> = []
      const step = size < 130 ? 2 : 3
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          if (data[(y * W + x) * 4 + 3] > 140) points.push([x, y])
        }
      }

      const count = Math.round(Math.min(4200, Math.max(1800, (W * H) / 330)))
      const banks = Array.from({ length: 7 }, () => ({ x: rand(0, W), y: rand(H * 0.5, H * 1.0) }))
      const particles: Particle[] = []
      for (let i = 0; i < count; i++) {
        const [tx, ty] = points[(Math.random() * points.length) | 0]
        const bank = banks[(Math.random() * banks.length) | 0]
        particles.push({
          sx: bank.x + gaussian() * W * 0.18,
          sy: bank.y + gaussian() * H * 0.1,
          tx: tx + rand(-1.2, 1.2) * unit,
          ty: ty + rand(-1.2, 1.2) * unit,
          delay: GATHER_START + Math.random() * 0.55,
          r0: rand(34, 78),
          r1: rand(5, 9) * Math.max(unit, 0.55),
          a0: rand(0.1, 0.22),
          a1: rand(0.3, 0.5),
          phase: rand(0, Math.PI * 2),
          swirl: rand(18, 60),
        })
      }
      // Wisps that never join the letters. They keep drifting so the sky stays alive.
      const wisps = Array.from({ length: 70 }, () => ({
        x: rand(-0.1, 1.1) * W,
        y: rand(0.05, 1) * H,
        r: rand(70, 170),
        a: rand(0.06, 0.13),
        phase: rand(0, Math.PI * 2),
        speed: rand(6, 16),
      }))

      const sprite = makeSprite()
      const t0 = performance.now()

      const draw = (now: number) => {
        if (cancelled) return
        const t = (now - t0) / 1000
        ctx.clearRect(0, 0, W, H)

        for (const w of wisps) {
          const x = w.x + Math.sin(t * 0.25 + w.phase) * w.speed * 3
          ctx.globalAlpha = w.a
          ctx.drawImage(sprite, x - w.r, w.y - w.r * 0.7, w.r * 2, w.r * 1.4)
        }

        for (const p of particles) {
          const e = ease(clamp((t - p.delay) / GATHER_TIME))
          const sw = (1 - e) * p.swirl
          const x = p.sx + (p.tx - p.sx) * e + Math.sin(t * 1.1 + p.phase) * sw
          const y = p.sy + (p.ty - p.sy) * e + Math.cos(t * 0.9 + p.phase) * sw * 0.6
          const r = p.r0 + (p.r1 - p.r0) * e
          ctx.globalAlpha = p.a0 + (p.a1 - p.a0) * e
          ctx.drawImage(sprite, x - r, y - r, r * 2, r * 2)
        }

        // Crisp wordmark settles in over the cloud letters.
        const crisp = ease(clamp((t - TEXT_IN) / 0.6))
        if (crisp > 0) {
          ctx.globalAlpha = crisp
          ctx.font = font
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillStyle = "#fff"
          ctx.fillText("Cloud 9", cx, cy)

          const tag = "PHYSICAL THERAPY"
          const tagSize = Math.max(13, size * 0.1)
          ctx.font = `600 ${tagSize}px ${family}`
          const spacing = tagSize * 0.5
          const widths = [...tag].map((c) => ctx.measureText(c).width)
          const total = widths.reduce((a, b) => a + b, 0) + spacing * (tag.length - 1)
          let x = cx - total / 2
          ctx.textAlign = "left"
          const rise = (1 - crisp) * 10
          ;[...tag].forEach((c, i) => {
            ctx.fillText(c, x, cy + size * 0.62 + rise)
            x += widths[i] + spacing
          })
        }
        ctx.globalAlpha = 1

        if (t > EXIT_AT) finish()
        if (!exiting || t < EXIT_AT + 1) raf = requestAnimationFrame(draw)
      }
      raf = requestAnimationFrame(draw)
    }
    start()

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      window.removeEventListener("keydown", onKey)
    }
  }, [])

  if (done) return null

  return (
    <div id="splash" onPointerDown={() => finishRef.current()} className="fixed inset-0 z-[100]" role="presentation">
      <div
        ref={bgRef}
        className="absolute inset-0 bg-[#0b66c9] bg-cover bg-top transition-opacity delay-[250ms] duration-[650ms] ease-out"
        style={{ backgroundImage: "url(/images/sky-hero.jpg)" }}
      />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 transition-[opacity,transform] duration-[400ms] ease-out" />
      <button
        ref={buttonRef}
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          finishRef.current()
        }}
        className="absolute right-5 bottom-5 rounded-full border border-white/70 px-4 py-2 text-sm font-medium text-white transition-opacity hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
      >
        Skip
      </button>
    </div>
  )
}
