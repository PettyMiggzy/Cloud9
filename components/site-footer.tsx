import Link from "next/link"
import { Logo } from "@/components/logo"
import { clinic, nav, patientTools } from "@/lib/content"

export function SiteFooter() {
  return (
    <footer className="bg-deep pb-24 text-white md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo tone="light" markClassName="h-10 w-11" />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/75">
            One-to-one physical therapy on Thompson Road. The hour is yours, and so is the clinician.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-white/60 uppercase">Find</p>
          <ul className="mt-3 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/book" className="hover:underline">
                Book a visit
              </Link>
            </li>
          </ul>
          <p className="mt-6 text-xs font-semibold tracking-[0.16em] text-white/60 uppercase">For patients</p>
          <ul className="mt-3 space-y-2 text-sm">
            {patientTools.map((tool) => (
              <li key={tool.href}>
                <Link href={tool.href} className="hover:underline">
                  {tool.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-white/60 uppercase">Clinic</p>
          <ul className="mt-3 space-y-2 text-sm text-white/85">
            <li>
              <a href={clinic.phoneHref} className="hover:underline">
                {clinic.phone}
              </a>
            </li>
            <li>Fax {clinic.fax}</li>
            <li>
              <a href={`mailto:${clinic.email}`} className="hover:underline">
                {clinic.email}
              </a>
            </li>
            <li>
              {clinic.addressLines[0]}
              <br />
              {clinic.addressLines[1]}
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-white/60 uppercase">Hours</p>
          <ul className="mt-3 space-y-2 text-sm text-white/85">
            {clinic.hours.map((row) => (
              <li key={row.days} className="flex justify-between gap-4">
                <span>{row.days}</span>
                <span>{row.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-white/60">
          © {new Date().getFullYear()} Cloud 9 Physical Therapy. A redesigned visit to the clinic on Thompson Road.
        </p>
      </div>
    </footer>
  )
}
