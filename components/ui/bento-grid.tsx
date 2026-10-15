import { cn } from "cn"

export function BentoGrid({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("grid grid-cols-1 gap-6 lg:grid-cols-6", className)}>{children}</div>
}

export function BentoCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <article className={cn("flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/5", className)}>
      {children}
    </article>
  )
}
