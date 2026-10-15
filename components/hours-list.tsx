import { clinic } from "@/lib/content"
import { cn } from "cn"

export function HoursList({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <ul className={cn("text-sm", className)}>
      {clinic.hours.map((row) => (
        <li
          key={row.days}
          className={cn(
            "flex justify-between gap-4 border-b py-2 last:border-0",
            light ? "border-white/15" : "border-border"
          )}
        >
          <span>{row.days}</span>
          <span className="font-medium">{row.time}</span>
        </li>
      ))}
    </ul>
  )
}
