import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Chip } from "@/components/ui/chip"
import type { Athlete } from "@/lib/types"

interface AthleteCardProps {
  athlete: Athlete
}

export function AthleteCard({ athlete }: AthleteCardProps) {
  return (
    <Link
      href={`/athletes/${athlete.id}`}
      className="block bg-card border-2 border-border hover:border-primary transition-colors p-4 group"
    >
      {/* Placeholder image */}
      <div className="relative w-full aspect-square bg-gradient-to-br from-muted to-secondary mb-4 grain-overlay">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-bold text-muted-foreground/20" style={{ fontFamily: "var(--font-oswald)" }}>
            {athlete.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </span>
        </div>
        {athlete.status === "SUSPENSO" && (
          <div className="absolute top-2 right-2">
            <Badge variant="destructive">SUSPENSO</Badge>
          </div>
        )}
        {athlete.verified && (
          <div className="absolute top-2 left-2">
            <Badge variant="default">VERIFIED</Badge>
          </div>
        )}
      </div>

      {/* Athlete info */}
      <div className="space-y-2">
        <h3
          className="text-xl font-bold text-condensed group-hover:text-primary transition-colors"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {athlete.name.toUpperCase()}
        </h3>
        {athlete.nickname && <p className="text-sm text-muted-foreground italic">"{athlete.nickname}"</p>}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{athlete.city}</span>
          <span>•</span>
          <span>{athlete.team}</span>
        </div>

        <div className="flex flex-wrap gap-1">
          <Chip variant="primary">{athlete.primaryModality}</Chip>
          <Chip>{athlete.weightClass}</Chip>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-border">
          <div>
            <span className="text-2xl font-bold" style={{ fontFamily: "var(--font-oswald)" }}>
              {athlete.record.wins}-{athlete.record.losses}-{athlete.record.draws}
            </span>
            <span className="text-xs text-muted-foreground ml-2">RECORD</span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary" style={{ fontFamily: "var(--font-oswald)" }}>
              {athlete.rating}
            </div>
            <div className="text-xs text-muted-foreground">RATING</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
