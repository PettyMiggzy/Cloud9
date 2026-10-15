"use client"

import { useEffect, useRef } from "react"
import { cn } from "cn"

function keyWhite(image: ImageData) {
  const data = image.data
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    if (min > 214 && max - min < 26) data[i + 3] = 0
  }
}

export function CloudMark({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d", { willReadFrequently: true })
    if (!canvas || !ctx) return

    let stopped = false
    const paint = (source: CanvasImageSource) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(source, 0, 0, canvas.width, canvas.height)
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height)
      keyWhite(frame)
      ctx.putImageData(frame, 0, 0)
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      const img = new Image()
      img.src = "/images/logo-mark.png"
      img.onload = () => {
        if (!stopped) paint(img)
      }
      return () => {
        stopped = true
      }
    }

    const video = document.createElement("video")
    video.src = "/images/logo-mark.mp4"
    video.muted = true
    video.loop = true
    video.playsInline = true
    video.preload = "auto"
    let frameId = 0

    const tick = () => {
      if (stopped) return
      if (video.readyState >= 2) paint(video)
      const withFrame = video as HTMLVideoElement & {
        requestVideoFrameCallback?: (cb: () => void) => number
      }
      if (withFrame.requestVideoFrameCallback) {
        frameId = withFrame.requestVideoFrameCallback(tick)
      } else {
        frameId = requestAnimationFrame(tick)
      }
    }

    const start = () => {
      video.play().then(tick).catch(() => {
        const img = new Image()
        img.src = "/images/logo-mark.png"
        img.onload = () => {
          if (!stopped) paint(img)
        }
      })
    }

    video.addEventListener("loadeddata", start, { once: true })
    video.load()

    return () => {
      stopped = true
      const withFrame = video as HTMLVideoElement & {
        cancelVideoFrameCallback?: (id: number) => void
      }
      withFrame.cancelVideoFrameCallback?.(frameId)
      cancelAnimationFrame(frameId)
      video.pause()
      video.removeAttribute("src")
      video.load()
    }
  }, [])

  return (
    <span className={cn("cloud-float relative block h-11 w-16 shrink-0", className)}>
      <canvas ref={canvasRef} width={480} height={360} className="h-full w-full" aria-hidden="true" />
    </span>
  )
}

export function Logo({
  className,
  alt = "",
  still = false,
}: {
  className?: string
  alt?: string
  priority?: boolean
  still?: boolean
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      {still ? (
        <img src="/images/logo-mark.png" alt="" className="h-11 w-16 object-contain mix-blend-multiply" />
      ) : (
        <CloudMark />
      )}
      <img
        src="/images/logo-word.png"
        alt={alt}
        width={1138}
        height={398}
        className="h-8 w-auto mix-blend-multiply"
      />
    </span>
  )
}
