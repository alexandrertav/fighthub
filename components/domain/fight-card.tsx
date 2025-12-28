import { Badge } from "@/components/ui/badge"
import { Chip } from "@/components/ui/chip"
import type { Bout } from "@/lib/types"

interface FightCardProps {
  bout: Bout
  size?: "sm" | "md" | "lg"
}

export function FightCard({ bout, size = "md" }: FightCardProps) {
  const isFeatured = bout.cardPosition === "MAIN_EVENT" || bout.cardPosition === "CO_MAIN"

  return (
    <div
      className={`relative bg-card border-2 ${
        isFeatured ? "border-primary" : "border-border"
      } overflow-hidden hover:border-primary transition-colors`}
    >
      {/* Card position badge */}
      {bout.cardPosition && (
        <div className="absolute top-2 right-2 z-10">
          <Badge variant={isFeatured ? "default" : "secondary"}>
            {bout.cardPosition === "MAIN_EVENT" && "MAIN EVENT"}
            {bout.cardPosition === "CO_MAIN" && "CO-MAIN EVENT"}
            {bout.cardPosition === "PRELIM" && "PRELIM"}
          </Badge>
        </div>
      )}

      {/* Fight matchup */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 p-6">
        {/* Red corner */}
        <div className="text-right space-y-2 border-r-4 border-[var(--corner-red)] pr-4">
          <div className="inline-block px-2 py-1 bg-[var(--corner-red)]/20 text-xs font-bold text-expanded">
            RED CORNER
          </div>
          <h3
            className={`font-bold text-condensed leading-tight ${
              size === "lg" ? "text-3xl" : size === "md" ? "text-2xl" : "text-xl"
            }`}
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            {bout.athleteRed.name.toUpperCase()}
          </h3>
          {bout.athleteRed.nickname && (
            <p className="text-sm text-muted-foreground italic">"{bout.athleteRed.nickname}"</p>
          )}
          <div className="space-y-1 text-sm">
            <p className="text-muted-foreground">
              {bout.athleteRed.record.wins}-{bout.athleteRed.record.losses}-{bout.athleteRed.record.draws}
            </p>
            <p className="text-primary font-bold">Rating: {bout.athleteRed.rating}</p>
          </div>
        </div>

        {/* VS divider */}
        <div className="flex flex-col items-center justify-center gap-2 px-4">
          <span className="text-3xl font-bold text-muted-foreground" style={{ fontFamily: "var(--font-oswald)" }}>
            VS
          </span>
          {bout.status && (
            <Badge
              variant={bout.status === "CONFIRMADA" ? "default" : bout.status === "PROPOSTA" ? "outline" : "secondary"}
            >
              {bout.status}
            </Badge>
          )}
        </div>

        {/* Blue corner */}
        <div className="space-y-2 border-l-4 border-[var(--corner-blue)] pl-4">
          <div className="inline-block px-2 py-1 bg-[var(--corner-blue)]/20 text-xs font-bold text-expanded">
            BLUE CORNER
          </div>
          <h3
            className={`font-bold text-condensed leading-tight ${
              size === "lg" ? "text-3xl" : size === "md" ? "text-2xl" : "text-xl"
            }`}
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            {bout.athleteBlue.name.toUpperCase()}
          </h3>
          {bout.athleteBlue.nickname && (
            <p className="text-sm text-muted-foreground italic">"{bout.athleteBlue.nickname}"</p>
          )}
          <div className="space-y-1 text-sm">
            <p className="text-muted-foreground">
              {bout.athleteBlue.record.wins}-{bout.athleteBlue.record.losses}-{bout.athleteBlue.record.draws}
            </p>
            <p className="text-primary font-bold">Rating: {bout.athleteBlue.rating}</p>
          </div>
        </div>
      </div>

      {/* Fight details */}
      <div className="px-6 pb-4 flex flex-wrap gap-2 border-t border-border pt-4">
        <Chip variant="primary">{bout.modality}</Chip>
        <Chip>{bout.weightClass}</Chip>
        {bout.rounds && <Chip>{bout.rounds} rounds</Chip>}
      </div>
    </div>
  )
}
