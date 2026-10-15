import { cn } from "cn"

// Widths and heights of each bump. They are summed into the viewBox so the edge reads as a bank of clouds.
const bumps: Array<[number, number]> = [
  [130, 34], [100, 46], [150, 30], [110, 52], [140, 36], [120, 44],
  [160, 32], [100, 48], [130, 38], [110, 50], [150, 34], [120, 42],
]
const total = bumps.reduce((sum, [w]) => sum + w, 0)
const base = 60

function buildPath() {
  let x = 0
  let d = `M0 64 L0 ${base}`
  for (const [w, h] of bumps) {
    d += ` C${x} ${base - h * 1.35} ${x + w} ${base - h * 1.35} ${x + w} ${base}`
    x += w
  }
  return `${d} L${total} 64 Z`
}

const path = buildPath()

/** A scalloped cloud-bank edge. Colour it with a text colour class. Bumps rise upward; pass `hang` to flip them downward. */
export function CloudEdge({ className, hang = false }: { className?: string; hang?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${total} 64`}
      preserveAspectRatio="none"
      className={cn("absolute inset-x-0 h-8 w-full md:h-14", hang ? "top-0 rotate-180" : "bottom-0", className)}
    >
      <path d={path} fill="currentColor" />
    </svg>
  )
}
