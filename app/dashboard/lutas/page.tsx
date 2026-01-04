"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  LayoutDashboard, 
  Calendar, 
  Trophy, 
  Users, 
  Search,
  Settings,
  CreditCard,
  ChevronDown
} from "lucide-react"
import { cn } from "@/lib/utils"
import BottomNav from "@/components/layout/bottom-nav"
import { apiClient } from "@/lib/api"

export default function LutasPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activePage, setActivePage] = useState("lutas")
  const [nivelFilter, setNivelFilter] = useState<"AMADOR" | "SEMI_PRO">("SEMI_PRO")
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState("")
  const [events, setEvents] = useState<any[]>([])
  const [categorias, setCategorias] = useState<any[]>([])

  // TODO: Pegar promoterId do contexto de autenticação
  const PROMOTER_ID = "678d1234567890abcdef1234"

  useEffect(() => {
    loadEvents()
  }, [])

  useEffect(() => {
    if (selectedEvent) {
      loadCategories()
    }
  }, [selectedEvent, nivelFilter])

  async function loadEvents() {
    try {
      const data = await apiClient.get<any[]>(`/api/promoter/events?promoterId=${PROMOTER_ID}`)
      setEvents(data)
      if (data.length > 0 && !selectedEvent) {
        setSelectedEvent(data[0].id)
      }
    } catch (error) {
      console.error("❌ Erro ao carregar eventos:", error)
    }
  }

  async function loadCategories() {
    try {
      setLoading(true)
      const data = await apiClient.get<any>(`/api/promoter/events/${selectedEvent}/matchmaking?level=${nivelFilter}`)
      console.log("🎯 Categorias:", data)
      setCategorias(data.categories || [])
    } catch (error) {
      console.error("❌ Erro ao carregar categorias:", error)
    } finally {
      setLoading(false)
    }
  }

  function getModalityLabel(modality: string) {
    return modality === "MUAY_THAI" ? "Muay Thai" : "Boxe"
  }


  const categoriasFiltradas = categorias.filter((cat) => {
    const searchText = `${getModalityLabel(cat.modality)} ${cat.weightRange}`.toLowerCase()
    const matchSearch = searchText.includes(searchQuery.toLowerCase())
    return matchSearch
  })

  return (
    <div className="relative min-h-screen bg-fight-black bg-grain-noise flex flex-col">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-fight-gradient opacity-30 pointer-events-none" />
      
      {/* Mobile Layout */}
      <div className="relative lg:hidden flex flex-col min-h-screen z-10">
        {/* Mobile Content */}
        <main className="flex-1 p-4 pt-6 pb-24 overflow-auto">
          {/* Header Card - Landing Page Style */}
          <div className="bg-card border-2 border-border p-6 mb-6">
            <h2 className="text-3xl font-bold text-condensed uppercase mb-2" style={{ fontFamily: "var(--font-oswald)" }}>
              CASAR LUTAS
            </h2>
            <p className="text-sm text-muted-foreground">Escolha uma categoria para montar cards</p>
          </div>

          {/* Event Selector */}
          {events.length > 1 && (
            <div className="mb-4">
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="w-full bg-card border-2 border-border p-3 text-sm"
              >
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Filtro de Nível */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setNivelFilter("SEMI_PRO")}
              className={cn(
                "bg-card border-2 p-4 transition-all",
                nivelFilter === "SEMI_PRO"
                  ? "border-primary"
                  : "border-border hover:border-primary/50"
              )}
            >
              <div className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-oswald)" }}>
                PRO
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Semi-Profissional</p>
            </button>
            <button
              onClick={() => setNivelFilter("AMADOR")}
              className={cn(
                "bg-card border-2 p-4 transition-all",
                nivelFilter === "AMADOR"
                  ? "border-primary"
                  : "border-border hover:border-primary/50"
              )}
            >
              <div className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-oswald)" }}>
                AMA
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Amador</p>
            </button>
          </div>

          {/* Categories List - Landing Page Style */}
          <section>
            <h3 className="text-2xl font-bold text-condensed mb-4" style={{ fontFamily: "var(--font-oswald)" }}>
              CATEGORIAS
            </h3>
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Carregando...</p>
              </div>
            ) : categoriasFiltradas.length === 0 ? (
              <div className="text-center py-12 bg-card border-2 border-border rounded-lg">
                <p className="text-muted-foreground">
                  Nenhuma categoria disponível. Aguarde mais inscrições pagas.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {categoriasFiltradas.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/dashboard/lutas/${encodeURIComponent(cat.id)}?eventId=${selectedEvent}`}
                    className="block"
                  >
                    <div className="bg-card border-2 border-border hover:border-primary/50 p-4 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-lg font-bold uppercase mb-1" style={{ fontFamily: "var(--font-oswald)" }}>
                            {getModalityLabel(cat.modality)}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {cat.weightRange}kg • {cat.athletes.length} atletas
                          </p>
                        </div>
                        <ChevronDown className="w-4 h-4 text-muted-foreground rotate-[-90deg]" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </main>

        {/* Bottom Navigation */}
        <BottomNav activeId={activePage} />
      </div>

      {/* Desktop Layout - TODO: Implement desktop version */}
      <div className="relative hidden lg:flex flex-1 items-center justify-center p-8 z-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-oswald)" }}>
            CASAR LUTAS
          </h2>
          <p className="text-muted-foreground mb-8">
            Versão desktop em desenvolvimento
          </p>
          <Button asChild>
            <Link href="/dashboard">Voltar ao Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
