"use client"

import { PrinterIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PrintButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Button type="button" variant="outline" className={className} onClick={() => window.print()}>
      <PrinterIcon aria-hidden="true" />
      {children}
    </Button>
  )
}
