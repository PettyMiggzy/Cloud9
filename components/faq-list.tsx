import { faqs } from "@/lib/content"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FaqList({ items = faqs }: { items?: typeof faqs }) {
  return (
    <Accordion multiple={false} className="divide-y divide-border border-y border-border">
      {items.map((item) => (
        <AccordionItem key={item.question} value={item.question} className="border-0">
          <AccordionTrigger className="py-4 text-base font-medium hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed text-muted-foreground">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
