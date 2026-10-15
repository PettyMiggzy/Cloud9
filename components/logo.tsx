import { cn } from "cn"

export function Logo({
  className,
  alt = "",
}: {
  className?: string
  alt?: string
  priority?: boolean
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative block h-11 w-14 shrink-0">
        <img src="/images/logo-mark.png" alt="" className="logo-still absolute inset-0 h-full w-full object-contain" />
        <video
          className="logo-motion h-full w-full object-contain"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/logo-mark.png"
          aria-hidden="true"
        >
          <source src="/images/logo-mark.mp4" type="video/mp4" />
        </video>
      </span>
      <img src="/images/logo-word.png" alt={alt} width={1138} height={398} className="h-9 w-auto" />
    </span>
  )
}
