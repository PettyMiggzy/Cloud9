import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Missing page</p>
      <h1 className="mt-3 font-heading text-5xl">That page is not in the clinic.</h1>
      <p className="mt-4 text-muted-foreground">The address may have changed. The front door is still on Thompson Road.</p>
      <Button className="mt-6 h-11 px-5" render={<Link href="/" />}>
        Back to the start
      </Button>
    </div>
  )
}
