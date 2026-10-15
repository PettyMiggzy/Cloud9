export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <header className="max-w-3xl">
      <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">{eyebrow}</p>
      <h1 className="mt-3 font-heading text-4xl leading-[1.05] text-balance sm:text-5xl">{title}</h1>
      <div className="mt-4 space-y-4 text-lg leading-relaxed text-muted-foreground">{children}</div>
    </header>
  )
}
