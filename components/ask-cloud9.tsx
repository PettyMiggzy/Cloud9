"use client"

import Link from "next/link"
import { useState, type FormEvent } from "react"
import { usePathname } from "next/navigation"
import { MessageCircleQuestionIcon, SendIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { findAnswer, suggestions, type Answer } from "@/lib/answers"
import { clinic } from "@/lib/content"

type Turn = { question: string; answer: Answer | null }

/** Quick answers drawn only from the clinic's own FAQ, hours, fees and services. No account, no AI guesses. */
export function AskCloud9() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [turns, setTurns] = useState<Turn[]>([])
  const [text, setText] = useState("")

  if (pathname === "/book" || pathname === "/booking") return null

  const ask = (question: string) => {
    const trimmed = question.trim()
    if (!trimmed) return
    setTurns((current) => [...current, { question: trimmed, answer: findAnswer(trimmed) }])
    setText("")
  }
  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    ask(text)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            type="button"
            aria-label="Ask a question"
            className="fixed right-4 bottom-24 z-30 inline-flex size-12 items-center justify-center gap-2 rounded-full bg-[#14324f] text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-[#0f2740] md:right-6 md:bottom-6 md:h-12 md:w-auto md:pr-5 md:pl-4 print:hidden"
          />
        }
      >
        <MessageCircleQuestionIcon className="size-5" aria-hidden="true" />
        <span className="hidden md:inline">Ask a question</span>
      </DialogTrigger>
      <DialogContent className="max-h-[min(42rem,calc(100dvh-4rem))] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Quick answers</DialogTitle>
          <DialogDescription>From the clinic’s own answers. For anything else, call {clinic.phone}.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4" aria-live="polite">
          {turns.map((turn, index) => (
            <div key={index} className="space-y-2">
              <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-[#14324f] px-4 py-2 text-sm text-white">{turn.question}</p>
              <div className="max-w-[92%] rounded-2xl rounded-bl-sm bg-[#E8F4F8] px-4 py-3 text-sm leading-relaxed text-[#1E293B]">
                {turn.answer ? (
                  <>
                    <p>{turn.answer.a}</p>
                    {turn.answer.href ? (
                      <Link
                        href={turn.answer.href}
                        onClick={() => setOpen(false)}
                        className="mt-2 inline-block font-semibold text-primary hover:underline"
                      >
                        {turn.answer.cta ?? "Read more"}
                      </Link>
                    ) : null}
                  </>
                ) : (
                  <p>
                    That one is best answered by the clinic. Call{" "}
                    <a href={clinic.phoneHref} className="font-semibold text-primary hover:underline">
                      {clinic.phone}
                    </a>{" "}
                    or{" "}
                    <Link href="/book" onClick={() => setOpen(false)} className="font-semibold text-primary hover:underline">
                      request a visit
                    </Link>
                    .
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {turns.length === 0 ? (
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => ask(suggestion)}
                className="rounded-full border border-border px-3.5 py-2 text-sm text-[#14324f] hover:bg-[#E8F4F8]"
              >
                {suggestion}
              </button>
            ))}
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="flex gap-2">
          <label className="sr-only" htmlFor="ask-input">
            Your question
          </label>
          <input
            id="ask-input"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Type a question, like “do you take Medicare?”"
            className="h-11 min-w-0 flex-1 rounded-full border border-input bg-white px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Button type="submit" size="icon" className="size-11 rounded-full" aria-label="Send question">
            <SendIcon />
          </Button>
        </form>
        <p className="text-xs leading-relaxed text-muted-foreground">
          This is not medical advice. If it is an emergency, call 911.
        </p>
      </DialogContent>
    </Dialog>
  )
}
