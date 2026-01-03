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
  ChevronDown
} from "lucide-react"
import { cn } from "@/lib/utils"
import BottomNav from "@/components/layout/bottom-nav"
import { apiClient } from "@/lib/api"

export default function InscricoesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<string | null>("todos")
  const [activePage, setActivePage] = useState("inscricoes")
  const [selectedEvent, setSelectedEvent] = useState("")
  const [loading, setLoading] = useState(true)

  // Real data from API
  const [events, setEvents] = useState<any[]>([])
  const [inscricoes, setInscricoes] = useState<any[]>([])

  // TODO: Pegar promoterId do contexto de autenticação
  const PROMOTER_ID = "678d1234567890abcdef1234" // Temporário - usar o ID real do banco

  const filtros = [
    { id: "todos", label: "Todos" },
    { id: "PENDING_PAYMENT", label: "Pendente" },
    { id: "PAID", label: "Pago" },
    { id: "SEM_LUTA", label: "Sem luta" },
    { id: "LUTA_CONFIRMADA", label: "Luta confirmada" },
  ]

  useEffect(() => {
    loadEvents()
  }, [])

  useEffect(() => {
    if (selectedEvent) {
      loadRegistrations(selectedEvent)
    }
  }, [selectedEvent])

  async function loadEvents() {
    try {
      setLoading(true)
      console.log("🎯 Buscando eventos do promotor:", PROMOTER_ID)
      const data = await apiClient.get<any[]>(`/api/promoter/events?promoterId=${PROMOTER_ID}`)
      console.log("📋 Eventos encontrados:", data.length)
      console.log("📋 Eventos:", data)
      setEvents(data)
      if (data.length > 0 && !selectedEvent) {
        console.log("✅ Selecionando primeiro evento:", data[0].id)
        setSelectedEvent(data[0].id)
      }
    } catch (error) {
      console.error("❌ Erro ao carregar eventos:", error)
    } finally {
      setLoading(false)
    }
  }

  async function loadRegistrations(eventId: string) {
    try {
      setLoading(true)
      console.log("🔍 Buscando inscrições para evento:", eventId)
      const data = await apiClient.get<any>(`/api/promoter/events/${eventId}/registrations`)
      console.log("📊 Dados recebidos:", data)
      console.log("👥 Total de inscrições:", data.registrations?.length || 0)
      setInscricoes(data.registrations || [])
    } catch (error) {
      console.error("❌ Erro ao carregar inscrições:", error)
    } finally {
      setLoading(false)
    }
  }

  function getStatusLabel(status: string) {
    const labels: any = {
      PENDING_PAYMENT: "Pendente",
      PAID: "Pago",
      REFUNDED: "Estornado",
      CANCELED: "Cancelado",
    }
    return labels[status] || status
  }

  function getMatchStatusLabel(matchStatus: string) {
    const labels: any = {
      SEM_LUTA: "Sem luta",
      LUTA_SUGERIDA: "Luta sugerida",
      LUTA_CONFIRMADA: "Luta confirmada",
    }
    return labels[matchStatus] || matchStatus
  }

  function getModalityLabel(modality: string) {
    return modality === "MUAY_THAI" ? "Muay Thai" : "Boxe"
  }


  const inscricoesFiltradas = inscricoes.filter((inscricao) => {
    const matchSearch = inscricao.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    
    let matchFilter = true
    if (activeFilter && activeFilter !== "todos") {
      // Filtrar por status de pagamento ou status de luta
      if (["PENDING_PAYMENT", "PAID", "REFUNDED", "CANCELED"].includes(activeFilter)) {
        matchFilter = inscricao.status === activeFilter
      } else if (["SEM_LUTA", "LUTA_SUGERIDA", "LUTA_CONFIRMADA"].includes(activeFilter)) {
        matchFilter = inscricao.matchStatus === activeFilter
      }
    }
    
    return matchSearch && matchFilter
  })

  return (
    <div className="relative min-h-screen bg-fight-black bg-grain-noise flex flex-col">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-fight-gradient opacity-30 pointer-events-none" />
      
      {/* Mobile Layout */}
      <div className="relative lg:hidden flex flex-col min-h-screen z-10">
        {/* Mobile Content */}
        <main className="flex-1 p-4 pt-2 pb-24 overflow-auto">
          {/* Event Selector and Add Button */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="bg-fight-surface border border-fight rounded px-3 py-2 text-sm font-ui text-fight focus:border-fight-accent focus:outline-none"
              >
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title}
                  </option>
                ))}
              </select>
            </div>
            <Button 
              className="bg-fight-accent hover:bg-fight-accent-hover text-white font-ui"
              size="sm"
            >
              CADASTRAR ATLETA
            </Button>
          </div>

          {/* Search */}
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar inscrito..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 pl-10 pr-4 border-2"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {filtros.map((filtro) => (
              <button
                key={filtro.id}
                onClick={() => setActiveFilter(activeFilter === filtro.id ? null : filtro.id)}
                className={cn(
                  "px-4 py-2 text-sm font-medium whitespace-nowrap transition-all border-2",
                  activeFilter === filtro.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border hover:border-primary/50"
                )}
              >
                {filtro.label}
              </button>
            ))}
          </div>

          {/* Inscricoes List */}
          <div className="space-y-3 mb-6">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Carregando...</p>
              </div>
            ) : inscricoesFiltradas.length === 0 ? (
              <div className="text-center py-12 bg-card border-2 border-border rounded-lg">
                <p className="text-muted-foreground">
                  {inscricoes.length === 0 
                    ? "Nenhuma inscrição ainda. Os atletas que se inscreverem aparecerão aqui."
                    : "Nenhum resultado encontrado para os filtros aplicados."}
                </p>
              </div>
            ) : (
              inscricoesFiltradas.map((inscricao) => (
                <div
                  key={inscricao.id}
                  className="bg-card border-2 border-border p-4 hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-oswald)" }}>
                        {inscricao.fullName.toUpperCase()}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {getModalityLabel(inscricao.modality)} • {inscricao.weight}kg • {inscricao.team}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {inscricao.age} anos • {inscricao.height}cm • {inscricao.totalFights} lutas • {inscricao.level}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={cn(
                          "px-2 py-1 text-xs font-semibold uppercase",
                          inscricao.status === "PAID" ? "bg-green-500/10 text-green-500" :
                          inscricao.status === "PENDING_PAYMENT" ? "bg-yellow-500/10 text-yellow-500" :
                          "bg-red-500/10 text-red-500"
                        )}>
                          {getStatusLabel(inscricao.status)}
                        </span>
                        <span className={cn(
                          "px-2 py-1 text-xs font-semibold uppercase",
                          inscricao.matchStatus === "LUTA_CONFIRMADA" ? "bg-blue-500/10 text-blue-500" :
                          inscricao.matchStatus === "LUTA_SUGERIDA" ? "bg-purple-500/10 text-purple-500" :
                          "bg-gray-500/10 text-gray-500"
                        )}>
                          {getMatchStatusLabel(inscricao.matchStatus)}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/inscritos/${inscricao.id}`}>Ver</Link>
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>


        </main>

        {/* Bottom Navigation */}
        <BottomNav activeId={activePage} />
      </div>

      {/* Desktop Layout - TODO: Implement desktop version */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-oswald)" }}>
            INSCRIÇÕES
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
