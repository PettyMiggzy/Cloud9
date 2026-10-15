import { fees } from "@/lib/content"

export function FeeList({ showPackages = true }: { showPackages?: boolean }) {
  const rows = [fees.evaluation, fees.treatment, ...(showPackages ? fees.packages : [])]
  return (
    <div>
      <dl className="text-sm">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-4 border-b border-border py-2.5 last:border-0">
            <dt>{row.label}</dt>
            <dd className="shrink-0 font-medium tabular-nums">{row.amount}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{fees.medicareNote}</p>
    </div>
  )
}
