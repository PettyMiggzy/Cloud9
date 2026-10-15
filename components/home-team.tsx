import Image from "next/image"
import Link from "next/link"
import { team } from "@/lib/content"

export function HomeTeam() {
  return (
    <section className="bg-white py-16 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-[1.875rem] leading-snug sm:text-[2.5rem]">The people in the room.</h2>
          <Link href="/about" className="shrink-0 text-sm font-semibold text-primary">
            Full bios
          </Link>
        </div>
        <ul className="mt-8 flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-visible">
          {team.map((member) => (
            <li key={member.name} className="w-36 shrink-0 md:w-auto">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#E8F4F8] ring-1 ring-black/5">
                <Image src={member.image} alt={member.name} fill sizes="180px" className="object-cover object-center" />
              </div>
              <p className="mt-3 text-sm font-semibold text-[#1E293B]">{member.name}</p>
              <p className="mt-1 line-clamp-3 text-xs leading-snug text-[#475569]">{member.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
