"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { PosterHero } from "@/components/layout/poster-hero"
import { EventCard } from "@/components/domain/event-card"
import { Button } from "@/components/ui/button"
import { mockEvents } from "@/lib/mock-data"
import { Grid, List } from "lucide-react"

export default function EventsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredEvents = mockEvents.filter((event) => {
    if (filterStatus === "upcoming") return new Date(event.date) > new Date()
    if (filterStatus === "past") return new Date(event.date) <= new Date()
    return true
  })

  return (
    <AppShell>
      <PosterHero
        size="md"
        headline="EVENTOS"
        subheadline="Descubra e participe dos eventos de luta do Rio Grande do Sul"
      />

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-card border-2 border-border p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
                className={filterStatus !== "all" ? "border-2 bg-transparent" : ""}
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                TODOS
              </Button>
              <Button
                variant={filterStatus === "upcoming" ? "default" : "outline"}
                onClick={() => setFilterStatus("upcoming")}
                className={filterStatus !== "upcoming" ? "border-2 bg-transparent" : ""}
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                PRÓXIMOS
              </Button>
              <Button
                variant={filterStatus === "past" ? "default" : "outline"}
                onClick={() => setFilterStatus("past")}
                className={filterStatus !== "past" ? "border-2 bg-transparent" : ""}
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                PASSADOS
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className={viewMode !== "grid" ? "border-2 bg-transparent" : ""}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
                className={viewMode !== "list" ? "border-2 bg-transparent" : ""}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Events Grid/List */}
        {filteredEvents.length > 0 ? (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">Nenhum evento encontrado</p>
          </div>
        )}
      </div>
    </AppShell>
  )
}
