import { Badge } from "@/components/ui/badge"
import type { Event } from "@/lib/types"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface EventBannerProps {
  event: Event
}

export function EventBanner({ event }: EventBannerProps) {
  const statusText = {
    DRAFT: "RASCUNHO",
    PUBLISHED: "INSCRIÇÕES ABERTAS",
    FINISHED: "FINALIZADO"
  }

  return (
    <div className="relative bg-fight-surface border-b-4 border-fight-accent py-8 bg-grain-noise">
      <div className="absolute inset-0 bg-fight-gradient opacity-20 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-fight uppercase leading-none mb-3">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 font-ui text-sm text-fight-secondary">
              {event.date && (
                <>
                  <span className="font-medium">
                    {format(new Date(event.date), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </span>
                  <span>•</span>
                </>
              )}
              {event.location && <span>{event.location}</span>}
              {event.price > 0 && (
                <>
                  <span>•</span>
                  <span className="text-fight-accent font-semibold">
                    R$ {event.price.toFixed(2)}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {event.allowedModalities.map((mod) => (
              <Badge 
                key={mod} 
                className="bg-fight-black border border-fight text-fight font-display text-xs uppercase"
              >
                {mod === "MUAY_THAI" ? "MUAY THAI" : mod}
              </Badge>
            ))}
            <Badge 
              className={`font-display text-xs uppercase ${
                event.status === "PUBLISHED" 
                  ? "bg-fight-accent text-white" 
                  : "bg-fight-black border border-fight text-fight-secondary"
              }`}
            >
              {statusText[event.status]}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
