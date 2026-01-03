"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Trophy, 
  CreditCard, 
  UserCircle, 
  MessageSquare, 
  CheckSquare, 
  FileText, 
  Settings,
  ChevronDown,
  LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import BottomNav from "@/components/layout/bottom-nav"
import StripedPattern from "@/components/ui/striped-pattern"
import { apiClient } from "@/lib/api"

export default function DashboardPage() {
  const [selectedEvent, setSelectedEvent] = useState("")
  const [activePage, setActivePage] = useState("dashboard")
  const [loading, setLoading] = useState(true)
  
  // Real data from API
  const [events, setEvents] = useState<any[]>([])
  const [stats, setStats] = useState({
    inscricoes: 0,
    pagos: 0,
    pendentes: 0,
    lutasMontadas: 0,
    estornos: 0,
  })
  const [atividadeRecente, setAtividadeRecente] = useState<any[]>([])

  // TODO: Pegar promoterId do contexto de autenticação
  const PROMOTER_ID = "678d1234567890abcdef1234" // Temporário - usar o ID real do banco

  useEffect(() => {
    loadEvents()
  }, [])

  useEffect(() => {
    if (selectedEvent) {
      loadEventData(selectedEvent)
    }
  }, [selectedEvent])

  async function loadEvents() {
    try {
      setLoading(true)
      const data = await apiClient.get<any[]>(`/api/promoter/events?promoterId=${PROMOTER_ID}`)
      setEvents(data)
      if (data.length > 0 && !selectedEvent) {
        setSelectedEvent(data[0].id)
      }
    } catch (error) {
      console.error("Erro ao carregar eventos:", error)
    } finally {
      setLoading(false)
    }
  }

  async function loadEventData(eventId: string) {
    try {
      // Buscar estatísticas
      const statsData = await apiClient.get<any>(`/api/promoter/events/${eventId}/stats`)
      setStats({
        inscricoes: statsData.registrations.total,
        pagos: statsData.registrations.paid,
        pendentes: statsData.registrations.pending,
        lutasMontadas: statsData.matches.confirmed,
        estornos: statsData.registrations.refunded,
      })

      // Buscar atividade recente
      const activityData = await apiClient.get<any>(`/api/promoter/events/${eventId}/activity?limit=5`)
      setAtividadeRecente(activityData.activities)
    } catch (error) {
      console.error("Erro ao carregar dados do evento:", error)
    }
  }

  const pendencias = [
    stats.pendentes > 0 ? `${stats.pendentes} pagamento(s) pendente(s)` : null,
    stats.estornos > 0 ? `${stats.estornos} pedido(s) de estorno` : null,
  ].filter(Boolean)

  const proximosPassos = [
    "Fechar inscrições",
    "Casar lutas",
    "Publicar card",
    "Check-in/pesagem",
  ]

  const currentEvent = events.find(e => e.id === selectedEvent)
  
  function formatTimeAgo(timestamp: string) {
    const now = new Date()
    const then = new Date(timestamp)
    const diffMs = now.getTime() - then.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 1) return "agora"
    if (diffMins < 60) return `${diffMins}min atrás`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h atrás`
    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays}d atrás`
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "eventos", label: "Eventos", icon: Calendar },
    { id: "inscricoes", label: "Inscrições", icon: FileText },
    { id: "casar-lutas", label: "Casar lutas", icon: Trophy },
    { id: "pagamentos", label: "Pagamentos", icon: CreditCard },
    { id: "atletas", label: "Atletas", icon: Users },
    { id: "comunicacao", label: "Comunicação", icon: MessageSquare },
    { id: "check-in", label: "Check-in", icon: CheckSquare },
    { id: "relatorios", label: "Relatórios", icon: FileText },
    { id: "configuracoes", label: "Configurações", icon: Settings },
  ]

  const acoesRapidas = [
    { title: "Documentos pendentes", subtitle: "4 atletas aguardando", action: "Abrir" },
    { title: "Pagamentos em análise", subtitle: "2 casos", action: "Abrir" },
    { title: "Conflitos de categoria", subtitle: "3 alertas", action: "Abrir" },
  ]


  return (
    <div className="relative min-h-screen bg-fight-black bg-grain-noise flex flex-col">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-fight-gradient opacity-30 pointer-events-none" />
      
      {/* Mobile Layout */}
      <div className="relative lg:hidden flex flex-col min-h-screen z-10">
        {/* Mobile Content */}
        <main className="flex-1 p-4 pt-6 pb-24 overflow-auto">
          {/* Event Selector - Landing Page Style */}
          <div className="bg-card border-2 border-border p-6 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-condensed uppercase mb-2" style={{ fontFamily: "var(--font-oswald)" }}>
                  XFEST STRIKING
                </h2>
                <div className="flex items-center gap-3">
                  <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-bold uppercase">
                    INSCRIÇÕES ABERTAS
                  </span>
                  <span className="text-sm text-muted-foreground">
                    07 FEV • Cachoeirinha, RS
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <ChevronDown className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Status Cards - Landing Page Style */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-card border-2 border-border p-4">
              <div className="text-3xl font-bold text-primary mb-1" style={{ fontFamily: "var(--font-oswald)" }}>
                {loading ? "..." : stats.inscricoes}
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Atletas Inscritos</p>
              <div className="mt-3 h-2 bg-secondary">
                <div className="h-full bg-primary transition-all" style={{width: '85%'}} />
              </div>
            </div>
            <div className="bg-card border-2 border-border p-4">
              <div className="text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-oswald)" }}>
                {loading ? "..." : stats.lutasMontadas}
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Lutas Casadas</p>
              <div className="mt-3 h-2 bg-secondary">
                <div className="h-full bg-foreground transition-all" style={{width: '70%'}} />
              </div>
            </div>
          </div>

          {/* Ações Rápidas - Landing Page Style */}
          <section>
            <h3 className="text-2xl font-bold text-condensed mb-4" style={{ fontFamily: "var(--font-oswald)" }}>
              AÇÕES RÁPIDAS
            </h3>
            <div className="space-y-3">
              {stats.pendentes > 0 && (
                <button className="w-full bg-card border-2 border-border hover:border-primary/50 p-4 transition-all group text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-sm mb-1">Pagamentos pendentes</p>
                      <p className="text-xs text-muted-foreground">{stats.pendentes} atleta(s) aguardando</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-primary" style={{ fontFamily: "var(--font-oswald)" }}>
                        {stats.pendentes}
                      </span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground rotate-[-90deg]" />
                    </div>
                  </div>
                </button>
              )}
              {stats.estornos > 0 && (
                <button className="w-full bg-card border-2 border-border hover:border-primary/50 p-4 transition-all group text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-sm mb-1">Pedidos de estorno</p>
                      <p className="text-xs text-muted-foreground">{stats.estornos} caso(s)</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-primary" style={{ fontFamily: "var(--font-oswald)" }}>
                        {stats.estornos}
                      </span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground rotate-[-90deg]" />
                    </div>
                  </div>
                </button>
              )}
              {stats.inscricoes > stats.lutasMontadas && (
                <button className="w-full bg-card border-2 border-border hover:border-primary/50 p-4 transition-all group text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-sm mb-1">Atletas sem luta</p>
                      <p className="text-xs text-muted-foreground">{stats.inscricoes - stats.lutasMontadas} aguardando matchmaking</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold" style={{ fontFamily: "var(--font-oswald)" }}>
                        {stats.inscricoes - stats.lutasMontadas}
                      </span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground rotate-[-90deg]" />
                    </div>
                  </div>
                </button>
              )}
            </div>
          </section>
        </main>

        {/* Bottom Navigation */}
        <BottomNav activeId={activePage} />
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-secondary/30 border-r-2 border-border flex-col flex">
          {/* Logo/Header */}
          <div className="p-6 border-b-2 border-border">
            <h1
              className="text-xl font-bold"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              FIGHT HUB
            </h1>
            <p className="text-sm text-muted-foreground">Painel do Promotor</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    activePage === item.id
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-card/50 hover:text-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              )
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t-2 border-border">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-card/50 cursor-pointer transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">MM</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Marcio Miranda</p>
                <p className="text-xs text-muted-foreground truncate">Promotor</p>
              </div>
            </div>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-card/50 hover:text-foreground transition-colors mt-2">
              <LogOut className="w-5 h-5" />
              Sair
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="bg-card border-b-2 border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2
                  className="text-2xl font-bold"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Dashboard
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Marcio Miranda (Promotor)</span>
                <span className="text-muted-foreground">|</span>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Sair
                </button>
              </div>
            </div>

            {/* Event Selector */}
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <select
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  className="w-full h-12 px-4 pr-10 rounded-lg border-2 border-border bg-background text-sm appearance-none cursor-pointer hover:border-primary/50 transition-colors"
                >
                  <option value="" disabled>Selecionar evento</option>
                  {events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.title} - {event.status === "DRAFT" ? "Rascunho" : event.status === "PUBLISHED" ? "Publicado" : "Finalizado"}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              </div>
              <Button
                className="h-12 px-8 rounded-lg"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Criar evento
              </Button>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 p-6 overflow-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="border-2 border-dashed border-border rounded-lg p-6 bg-card/30">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Inscritos</h3>
                <p className="text-3xl font-bold" style={{ fontFamily: "var(--font-oswald)" }}>
                  {loading ? "..." : stats.inscricoes}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Número + variação</p>
              </div>

              <div className="border-2 border-dashed border-border rounded-lg p-6 bg-card/30">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Pagamentos confirmados</h3>
                <p className="text-3xl font-bold" style={{ fontFamily: "var(--font-oswald)" }}>
                  {loading ? "..." : stats.pagos}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Número + variação</p>
              </div>

              <div className="border-2 border-dashed border-border rounded-lg p-6 bg-card/30">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Lutas montadas</h3>
                <p className="text-3xl font-bold" style={{ fontFamily: "var(--font-oswald)" }}>
                  {loading ? "..." : stats.lutasMontadas}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Número + variação</p>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pendências */}
              <div className="border-2 border-border rounded-lg bg-card">
                <div className="p-6 border-b-2 border-border">
                  <h3 className="font-bold" style={{ fontFamily: "var(--font-oswald)" }}>
                    Pendências
                  </h3>
                  {pendencias.length > 0 ? (
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {pendencias.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm text-muted-foreground">Nenhuma pendência no momento</p>
                  )}
                </div>
                <div className="p-6">
                  <h4 className="font-bold mb-3 text-sm" style={{ fontFamily: "var(--font-oswald)" }}>
                    Atividade recente
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Lista: últimas inscrições, pagamentos, estornos, alterações de lutas
                  </p>
                  <div className="space-y-2">
                    {atividadeRecente.length > 0 ? (
                      atividadeRecente.map((activity, i) => (
                        <p key={i} className="text-xs text-muted-foreground">
                          {activity.description} - {formatTimeAgo(activity.timestamp)}
                        </p>
                      ))
                    ) : (
                      <p className="text-xs text-muted-foreground">Nenhuma atividade recente</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Próximos passos */}
              <div className="border-2 border-border rounded-lg bg-card p-6">
                <h3 className="font-bold mb-4" style={{ fontFamily: "var(--font-oswald)" }}>
                  Próximos passos do evento
                </h3>
                <ul className="space-y-2 text-sm">
                  {proximosPassos.map((item, i) => (
                    <li key={i} className="text-muted-foreground">• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
