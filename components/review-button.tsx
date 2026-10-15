import { StarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { reviewUrl } from "@/lib/content"

/** Renders only once the clinic's Google review link is set in lib/content.ts. */
export function ReviewButton({ className }: { className?: string }) {
  if (!reviewUrl) return null
  return (
    <Button variant="outline" className={className} render={<a href={reviewUrl} target="_blank" rel="noreferrer" />}>
      <StarIcon aria-hidden="true" />
      Leave a Google review
    </Button>
  )
}
