import Image from "next/image"

export function PageHeader({
  eyebrow,
  title,
  art,
  children,
}: {
  eyebrow: string
  title: string
  /** Path to an illustration made for the site. Decorative, so it carries no alt text. */
  art?: string
  children: React.ReactNode
}) {
  return (
    <>
      <header className="max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">{eyebrow}</p>
        <h1 className="mt-3 font-heading text-4xl leading-[1.05] text-balance sm:text-5xl">{title}</h1>
        <div className="mt-4 space-y-4 text-lg leading-relaxed text-muted-foreground">{children}</div>
      </header>
      {art ? (
        <div className="relative mt-8 aspect-[16/7] overflow-hidden rounded-2xl ring-1 ring-black/5">
          <Image src={art} alt="" fill priority sizes="(min-width: 1152px) 1100px, 100vw" className="object-cover" />
        </div>
      ) : null}
    </>
  )
}
