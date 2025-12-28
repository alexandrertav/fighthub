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
  return (
    <div className="bg-card border-2 border-border hover:border-primary transition-colors overflow-hidden group">
      {/* Event banner strip */}
      <div className="bg-primary text-primary-foreground px-4 py-3 border-b-2 border-primary-foreground/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-expanded" style={{ fontFamily: "var(--font-oswald)" }}>
              {format(new Date(event.date), "d 'DE' MMMM 'DE' yyyy", { locale: ptBR }).toUpperCase()}
            </p>
            <p className="text-xs opacity-80">
              {event.city} • {event.venue}
            </p>
          </div>
          <Badge
            variant={
              event.status === "INSCRICOES_ABERTAS"
                ? "default"
                : event.status === "SANCIONADO"
                  ? "secondary"
                  : "outline"
            }
          >
            {event.status === "INSCRICOES_ABERTAS" && "INSCRIÇÕES ABERTAS"}
            {event.status === "SANCIONADO" && "SANCIONADO"}
            {event.status === "FINALIZADO" && "FINALIZADO"}
            {event.status === "CONFIRMADO" && "CONFIRMADO"}
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
            {event.name.toUpperCase()}
          </h3>
          <p className="text-sm text-muted-foreground">{event.federation}</p>
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
        <Link href={`/events/${event.id}`} className="block">
          <Button className="w-full" style={{ fontFamily: "var(--font-oswald)" }}>
            VER EVENTO
          </Button>
        </Link>
        {event.status === "INSCRICOES_ABERTAS" && (
          <Button
            variant="outline"
            className="w-full bg-transparent"
            onClick={() => console.log("TODO: Inscrever-se")}
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            INSCREVER-SE
          </Button>
        )}
      </div>
    </div>
  )
}
