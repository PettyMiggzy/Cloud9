import { clinic } from "@/lib/content"

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function hasPhone(value: string) {
  return value.replace(/\D/g, "").length >= 10
}

export function mailtoHref(subject: string, body: string) {
  return `mailto:${clinic.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
