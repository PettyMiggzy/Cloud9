import { cn } from "cn"

export function Logo({
  className,
  alt = "",
  priority = false,
}: {
  className?: string
  alt?: string
  priority?: boolean
}) {
  return (
    <img
      src="/images/logo-lockup.png"
      alt={alt}
      width={1093}
      height={364}
      fetchPriority={priority ? "high" : "auto"}
      className={cn("h-12 w-auto", className)}
    />
  )
}
