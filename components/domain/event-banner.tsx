import { Badge } from "@/components/ui/badge"
import type { Event } from "@/lib/types"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface EventBannerProps {
  event: Event
}

export function EventBanner({ event }: EventBannerProps) {
  return (
    <div className="relative bg-gradient-to-r from-secondary via-card to-secondary border-y-4 border-primary py-6 grain-overlay">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1
              className="text-4xl md:text-5xl font-bold text-condensed leading-none mb-2"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              {event.name.toUpperCase()}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">
                {format(new Date(event.date), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </span>
              <span>•</span>
              <span>{event.city}</span>
              <span>•</span>
              <span>{event.venue}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" className="text-sm">
              {event.federation}
            </Badge>
            <Badge variant={event.status === "INSCRICOES_ABERTAS" ? "default" : "secondary"} className="text-sm">
              {event.status === "INSCRICOES_ABERTAS" && "INSCRIÇÕES ABERTAS"}
              {event.status === "SANCIONADO" && "SANCIONADO"}
              {event.status === "FINALIZADO" && "FINALIZADO"}
              {event.status === "CONFIRMADO" && "CONFIRMADO"}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
