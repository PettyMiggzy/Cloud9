import { clinic, faqs, fees, services } from "@/lib/content"

export type Answer = { q: string; a: string; href?: string; cta?: string; tags: string[] }

const tagsFor: Record<string, string[]> = {
  "Do you accept Medicare?": ["medicare", "insurance", "senior", "covered"],
  "Do you accept private insurance?": ["insurance", "plan", "covered", "benefits", "deductible"],
  "What does a visit cost if I am paying myself?": ["cost", "price", "fee", "pay", "selfpay"],
  "Do you offer packages?": ["package", "pack", "sessions", "cost", "price"],
  "Is there a cancellation fee?": ["cancel", "reschedule", "fee"],
  "Do I need a referral?": ["referral", "prescription", "doctor", "direct"],
  "How soon will I feel a difference?": ["results", "better", "improve", "weeks", "long"],
  "What should I wear?": ["wear", "clothes", "bring", "dress"],
}

const hrefFor: Record<string, [string, string]> = {
  "Do you accept Medicare?": ["/insurance", "Ask for an insurance check"],
  "Do you accept private insurance?": ["/insurance", "Ask for an insurance check"],
  "What does a visit cost if I am paying myself?": ["/visit", "Fees and hours"],
  "Do you offer packages?": ["/visit", "Fees and hours"],
  "Do I need a referral?": ["/book", "Book without a referral"],
  "What should I wear?": ["/first-visit", "What the first visit is like"],
}

const fromFaqs: Answer[] = faqs.map((item) => ({
  q: item.question,
  a: item.answer,
  tags: tagsFor[item.question] ?? [],
  href: hrefFor[item.question]?.[0],
  cta: hrefFor[item.question]?.[1],
}))

const extras: Answer[] = [
  {
    q: "What are your hours?",
    a: clinic.hours.map((row) => `${row.days}: ${row.time}`).join(". ") + ".",
    tags: ["hours", "open", "close", "saturday", "sunday", "weekend", "time", "evening"],
    href: "/visit",
    cta: "Hours and map",
  },
  {
    q: "Where are you?",
    a: `${clinic.address}. The clinic is on Thompson Road on the south side of Indianapolis.`,
    tags: ["where", "address", "location", "directions", "map", "find"],
    href: clinic.mapsUrl,
    cta: "Open in Maps",
  },
  {
    q: "How do I book?",
    a: `Use the booking request, or call ${clinic.phone}. A request is not confirmed until the clinic replies by phone or email.`,
    tags: ["book", "appointment", "schedule", "request", "visit"],
    href: "/book",
    cta: "Request a visit",
  },
  {
    q: "What happens at the first visit?",
    a: `The first visit is a 60-minute one-to-one evaluation (${fees.evaluation.amount} self-pay). You tell the story, and the clinician looks at how you move before a plan is written. Arrive about ten minutes early.`,
    tags: ["first", "evaluation", "expect", "happens", "new", "visit"],
    href: "/first-visit",
    cta: "The first visit",
  },
  {
    q: "What is your phone number?",
    a: `${clinic.phone}. Fax is ${clinic.fax}, and email is ${clinic.email}.`,
    tags: ["phone", "call", "number", "fax", "email", "contact"],
    href: clinic.phoneHref,
    cta: "Call now",
  },
  ...services.map((service) => ({
    q: `Do you treat ${service.name.toLowerCase()}?`,
    a: `${service.short} ${service.timeline}`,
    tags: [...service.name.toLowerCase().split(/[^a-z]+/), ...service.short.toLowerCase().split(/[^a-z]+/)].filter((word) => word.length > 3),
    href: `/services/${service.slug}`,
    cta: `About ${service.name.toLowerCase()}`,
  })),
]

export const answers: Answer[] = [...fromFaqs, ...extras]

export const suggestions = [
  "Do you take Medicare?",
  "What does a visit cost?",
  "What are your hours?",
  "Do I need a referral?",
  "What happens at the first visit?",
  "What should I wear?",
]

const stop = new Set(["the", "a", "an", "is", "are", "do", "you", "i", "to", "my", "of", "for", "it", "and", "or", "what", "how", "can", "does", "in", "on", "at", "with", "me", "we", "your", "need", "get", "have", "will", "about", "take"])
const synonyms: Record<string, string> = {
  costs: "cost", much: "cost", expensive: "cost", cheap: "cost", price: "cost", prices: "cost", pricing: "cost", charge: "cost", pay: "cost", afford: "cost", fees: "fee", dollar: "cost",
  insured: "insurance", coverage: "insurance", plans: "plan", medicare: "medicare",
  open: "hours", opens: "hours", closing: "hours", closes: "hours", weekend: "saturday", sundays: "sunday", saturdays: "saturday",
  located: "where", location: "where", directions: "where", address: "where", parking: "where",
  doctor: "referral", physician: "referral", prescription: "referral", script: "referral",
  appointment: "book", appointments: "book", schedule: "book", booking: "book",
  hurts: "pain", hurt: "pain", ache: "pain", sore: "pain",
  clothes: "wear", wearing: "wear", dress: "wear",
  cancellation: "cancel", cancelling: "cancel", canceling: "cancel",
}

function tokens(text: string) {
  return text
    .toLowerCase()
    .split(/[^a-z0-9$]+/)
    .filter((word) => word && !stop.has(word))
    .map((word) => synonyms[word] ?? word)
}

/** Returns the best clinic answer, or null when nothing in the clinic's own copy matches well. */
export function findAnswer(query: string): Answer | null {
  const words = new Set(tokens(query))
  if (words.size === 0) return null
  let best: Answer | null = null
  let bestScore = 0
  for (const entry of answers) {
    const own = new Set(tokens(entry.q))
    let score = 0
    for (const word of words) {
      if (entry.tags.includes(word)) score += 2
      if (own.has(word)) score += 1.5
    }
    if (score > bestScore) {
      bestScore = score
      best = entry
    }
  }
  return bestScore >= 2 ? best : null
}
