import { cn } from "cn"

const marks = {
  default: ["#1A67A8", "#2C93CB", "#5EC3E8", "#B9E8F7"],
  light: ["#8FD4F5", "#C5E9FA", "#E7F6FD", "#FFFFFF"],
} as const

export function LogoMark({ className, tone = "default" }: { className?: string; tone?: "default" | "light" }) {
  const [cloud, wave, mid, pale] = marks[tone]
  return (
    <svg viewBox="0 0 72 64" className={className} aria-hidden="true">
      <path
        fill={cloud}
        d="M24.5 33.2c.4-8.2 7.2-14.6 15.4-14.6 1.8-6.4 7.6-10.6 14.2-10 7 .6 12.4 6.2 13 13.2 5.6.6 9.8 5.4 9.8 11.2 0 6.4-5.2 11.6-11.6 11.6H32.2c-6 0-10.8-4.6-11-10.4.1-.4.2-.8.3-1z"
      />
      <path
        fill={wave}
        d="M8 41.8c9.4-6.2 21.2-6.6 31.2-1.2 6.2 3.4 12.6 3 19-.8 2.2-1.2 4.8.4 4.8 2.8 0 1-.4 1.8-1.2 2.4-7.4 4.8-16 5.2-23.8 1.2C28.6 42.6 18.2 43.6 9.6 48.4 7.8 49.4 5.6 48 5.8 46c.1-1.4.8-2.8 2.2-4.2z"
      />
      <path
        fill={mid}
        d="M6.2 51.6c10-6.4 22.4-6.8 33-1.2 6.4 3.4 13.2 2.8 19.4-.8 2-1.2 4.6.2 4.6 2.6 0 .8-.4 1.6-1 2.2-7.2 5.4-16.2 6-24.2 2.2-8.4-4-18.2-3.4-26.6 1.6-1.8 1-3.8-.6-3.6-2.6.2-1.2.8-2.2 1.4-3z"
      />
      <path
        fill={pale}
        d="M12.5 60.6c8.4-5 18.6-5.2 27.6-.4 4.6 2.4 9.6 2.2 14.2-.2 1.8-.8 3.8.4 3.8 2.4 0 .6-.2 1.2-.8 1.6-5.4 3.6-12 3.8-17.8 1-6.8-3-14.4-2.6-21.4 1.4-1.6.8-3.4-.6-3.2-2.2.2-1 .8-1.8 1.6-2.6z"
      />
    </svg>
  )
}

export function Logo({
  className,
  markClassName,
  tone = "default",
}: {
  className?: string
  markClassName?: string
  tone?: "default" | "light"
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark tone={tone} className={cn("h-11 w-12 shrink-0", markClassName)} />
      <span className="leading-none">
        <span className={cn("block font-heading text-[1.35rem] font-semibold tracking-tight", tone === "light" ? "text-white" : "text-[#174E86]")}>
          Cloud 9
        </span>
        <span
          className={cn(
            "mt-1 block text-[0.62rem] font-semibold tracking-[0.18em] uppercase",
            tone === "light" ? "text-[#B9E8F7]" : "text-[#2C93CB]"
          )}
        >
          Physical Therapy
        </span>
      </span>
    </span>
  )
}
