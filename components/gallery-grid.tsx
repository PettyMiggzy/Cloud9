"use client"

import { useState } from "react"
import Image from "next/image"
import { gallery } from "@/lib/content"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function GalleryGrid() {
  const [index, setIndex] = useState<number | null>(null)
  const active = index === null ? null : gallery[index]

  function step(direction: number) {
    setIndex((current) => {
      if (current === null) return current
      return (current + direction + gallery.length) % gallery.length
    })
  }

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((photo, photoIndex) => (
          <li key={photo.src}>
            <button
              type="button"
              onClick={() => setIndex(photoIndex)}
              className="group block w-full overflow-hidden rounded-2xl border border-border bg-card text-left"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="px-4 py-3">
                <p className="font-heading text-lg">{photo.title}</p>
                <p className="text-sm text-muted-foreground">{photo.caption}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={active !== null} onOpenChange={(open) => !open && setIndex(null)}>
        <DialogContent className="max-h-[90vh] overflow-auto sm:max-w-3xl">
          {active ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl">{active.title}</DialogTitle>
                <DialogDescription>{active.caption}</DialogDescription>
              </DialogHeader>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image src={active.src} alt={active.alt} fill className="object-cover" sizes="800px" />
              </div>
              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => step(-1)}>
                  Previous
                </Button>
                <Button type="button" variant="outline" onClick={() => step(1)}>
                  Next
                </Button>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
