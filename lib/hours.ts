const TZ = "America/Indiana/Indianapolis"
const ORDER = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const

const SCHEDULE: Record<(typeof ORDER)[number], { open: number; close: number } | null> = {
  Sun: null,
  Mon: { open: 7 * 60, close: 19 * 60 },
  Tue: { open: 7 * 60, close: 19 * 60 },
  Wed: { open: 7 * 60, close: 19 * 60 },
  Thu: { open: 7 * 60, close: 19 * 60 },
  Fri: { open: 7 * 60, close: 19 * 60 },
  Sat: { open: 8 * 60, close: 14 * 60 },
}

function clock(minutes: number) {
  const hour24 = Math.floor(minutes / 60)
  const minute = minutes % 60
  const suffix = hour24 >= 12 ? "pm" : "am"
  const hour = hour24 % 12 || 12
  return `${hour}:${String(minute).padStart(2, "0")} ${suffix}`
}

function indyParts(now: Date) {
  const weekday = new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "short" }).format(now) as (typeof ORDER)[number]
  const hour = Number(new Intl.DateTimeFormat("en-US", { timeZone: TZ, hour: "numeric", hourCycle: "h23" }).format(now))
  const minute = Number(new Intl.DateTimeFormat("en-US", { timeZone: TZ, minute: "numeric" }).format(now))
  return { weekday, minutes: hour * 60 + minute }
}

export function clinicStatus(now = new Date()) {
  const { weekday, minutes } = indyParts(now)
  const today = SCHEDULE[weekday]
  if (today && minutes >= today.open && minutes < today.close) {
    return { open: true as const, label: "Open now", detail: `until ${clock(today.close)}` }
  }

  const start = ORDER.indexOf(weekday)
  for (let step = 0; step < 7; step += 1) {
    const name = ORDER[(start + step) % 7]
    const day = SCHEDULE[name]
    if (!day) continue
    if (step === 0 && minutes >= day.close) continue
    if (step === 0) return { open: false as const, label: "Closed", detail: `opens at ${clock(day.open)}` }
    const when = step === 1 ? "tomorrow" : name
    return { open: false as const, label: "Closed", detail: `opens ${when} at ${clock(day.open)}` }
  }

  return { open: false as const, label: "Closed", detail: "opens Monday at 7:00 am" }
}
