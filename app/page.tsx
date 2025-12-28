"use client"

import Link from "next/link"
import { AppShell } from "@/components/layout/app-shell"
import { HeroHighlightsCarousel } from "@/components/home/HeroHighlightsCarousel"
import { EventCard } from "@/components/domain/event-card"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/ui/star-rating"
import { mockEvents, mockRankings } from "@/lib/mock-data"
import { Trophy, Users, Calendar } from "lucide-react"
import type { Highlight } from "@/lib/types"

const mockHighlights: Highlight[] = [
  {
    id: "xfest-2026",
    type: "event",
    dateISO: "2026-02-07T21:00:00-03:00",
    dateLabel: "07 DE FEVEREIRO DE 2026 ÀS 10:00 BRT",
    titleLine1: "XFEST STRIKING",
    titleLine2: "DESAFIO DOS PAMPAS",
    locationLabel: "Cachoeirinha, RS",
    ctas: {
      primary: "FAZER INSCRIÇÃO",
      secondary: "VER EVENTO",
      tertiary: "CONSULTAR VALORES",
    },
  },
  {
    id: "curso-arbitragem",
    type: "news",
    dateLabel: "INSCRIÇÕES ABERTAS",
    titleLine1: "CURSO DE ARBITRAGEM",
    titleLine2: "MUAY THAI • CERTIFICAÇÃO",
    ctas: {
      primary: "FAZER INSCRIÇÃO",
      secondary: "CONSULTAR VALORES",
    },
  },
]

export default function HomePage() {
  const upcomingEvents = mockEvents.filter((e) => new Date(e.date) > new Date()).slice(0, 3)
  const topRankings = mockRankings.slice(0, 3)

  return (
    <AppShell>
      {/* Hero Highlights Carousel Section */}
      <HeroHighlightsCarousel items={mockHighlights} />

      {/* Upcoming Events Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-condensed" style={{ fontFamily: "var(--font-oswald)" }}>
            PRÓXIMOS EVENTOS
          </h2>
          <Button
            variant="outline"
            asChild
            className="border-2 bg-transparent"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            <Link href="/eventos">VER TODOS</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Top Rankings Section */}
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold text-condensed" style={{ fontFamily: "var(--font-oswald)" }}>
              RANKING
            </h2>
            <Button
              variant="outline"
              asChild
              className="border-2 bg-transparent"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              <Link href="/ranking">VER RANKING COMPLETO</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topRankings.map((entry) => (
              <div key={entry.athleteId} className="bg-card border-2 border-border p-6">
                <div className="flex items-start gap-4">
                  <div
                    className="text-5xl font-bold text-primary leading-none"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    #{entry.position}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-condensed mb-1" style={{ fontFamily: "var(--font-oswald)" }}>
                      {entry.athleteName.toUpperCase()}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">{entry.team}</p>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="font-bold">
                        {entry.record.wins}-{entry.record.losses}-{entry.record.draws}
                      </span>
                    </div>
                    <StarRating rating={entry.starRating} size="sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <h2
          className="text-4xl font-bold text-condensed text-center mb-12"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          COMO FUNCIONA
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-primary flex items-center justify-center border-2 border-primary-foreground/20">
              <Users className="w-10 h-10 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold" style={{ fontFamily: "var(--font-oswald)" }}>
              1. CADASTRE ATLETAS
            </h3>
            <p className="text-muted-foreground">
              Registre atletas de Muay Thai e Kickboxing com informações completas: histórico, estatísticas e nível
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-primary flex items-center justify-center border-2 border-primary-foreground/20">
              <Calendar className="w-10 h-10 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold" style={{ fontFamily: "var(--font-oswald)" }}>
              2. CRIE EVENTOS
            </h3>
            <p className="text-muted-foreground">
              Monte eventos, abra inscrições e gerencie lutas. O sistema ajuda a organizar tudo
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-primary flex items-center justify-center border-2 border-primary-foreground/20">
              <Trophy className="w-10 h-10 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold" style={{ fontFamily: "var(--font-oswald)" }}>
              3. PUBLIQUE O CARD
            </h3>
            <p className="text-muted-foreground">
              Monte o card oficial com as lutas confirmadas e publique para o público
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-secondary via-card to-secondary grain-overlay py-20">
        <div className="container relative mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-condensed mb-6" style={{ fontFamily: "var(--font-oswald)" }}>
            FAÇA PARTE DA PLATAFORMA
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a atletas, promotores e federações de Muay Thai e Kickboxing que já usam o Lutas RS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => console.log("TODO: Cadastrar")}
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              CADASTRAR AGORA
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => console.log("TODO: Saiba mais")}
              className="border-2 bg-transparent"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              SAIBA MAIS
            </Button>
          </div>
        </div>
      </section>
    </AppShell>
  )
}
