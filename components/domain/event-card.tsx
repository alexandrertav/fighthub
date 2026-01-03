"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Event } from "@/lib/types"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  // Usa slug se disponível, senão usa id
  const eventPath = event.slug || event.id
  
  return (
    <div className="bg-card border-2 border-border hover:border-primary transition-colors overflow-hidden group">
      {/* Event banner strip */}
      <div className="bg-primary text-primary-foreground px-4 py-3 border-b-2 border-primary-foreground/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-expanded" style={{ fontFamily: "var(--font-oswald)" }}>
              {event.date ? format(new Date(event.date), "d 'DE' MMMM 'DE' yyyy", { locale: ptBR }).toUpperCase() : "DATA A DEFINIR"}
            </p>
            <p className="text-xs opacity-80">
              {event.location || "Local a definir"}
            </p>
          </div>
          <Badge
            variant={
              event.status === "PUBLISHED"
                ? "default"
                : event.status === "DRAFT"
                  ? "secondary"
                  : "outline"
            }
          >
            {event.status === "PUBLISHED" && "INSCRIÇÕES ABERTAS"}
            {event.status === "DRAFT" && "RASCUNHO"}
            {event.status === "FINISHED" && "FINALIZADO"}
          </Badge>
        </div>
      </div>

      {/* Event poster */}
      <div className="relative h-64 bg-gradient-to-br from-secondary via-muted to-card grain-overlay overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <h3
            className="text-4xl font-bold text-condensed leading-none mb-2 group-hover:text-primary transition-colors"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            {event.title.toUpperCase()}
          </h3>
          <div className="flex gap-2 mt-2">
            {event.allowedModalities.map((mod) => (
              <Badge key={mod} variant="outline" className="text-xs">
                {mod === "MUAY_THAI" ? "MUAY THAI" : mod}
              </Badge>
            ))}
          </div>
        </div>

        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              currentColor 20px,
              currentColor 21px
            )`,
          }}
        />
      </div>

      {/* Actions */}
      <div className="p-4 space-y-2">
        <Link href={`/events/${eventPath}`} className="block">
          <Button className="w-full" style={{ fontFamily: "var(--font-oswald)" }}>
            VER EVENTO
          </Button>
        </Link>
        {event.status === "PUBLISHED" && (
          <Link href={`/events/${eventPath}?inscricao=true`} className="block">
            <Button
              variant="outline"
              className="w-full bg-transparent"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              INSCREVER-SE
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
