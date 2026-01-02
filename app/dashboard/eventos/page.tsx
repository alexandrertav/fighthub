"use client"

import { useState } from "react"
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
  Plus
} from "lucide-react"
import { cn } from "@/lib/utils"
import BottomNav from "@/components/layout/bottom-nav"

export default function EventosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<string | null>("inscricoes-abertas")
  const [activePage, setActivePage] = useState("eventos")

  // Mock data
  const eventos = [
    {
      id: "1",
      nome: "XFEST STRIKING",
      status: "inscricoes-abertas",
      statusLabel: "Inscrições abertas",
      inscritos: 0,
      action: "Gerenciar",
    },
  ]

  const filtros = [
    { id: "inscricoes-abertas", label: "Inscrições abertas" },
    { id: "finalizado", label: "Finalizado" },
  ]


  const eventosFiltrados = eventos.filter((evento) => {
    const matchSearch = evento.nome.toLowerCase().includes(searchQuery.toLowerCase())
    const matchFilter = !activeFilter || evento.status === activeFilter
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

          {/* Search */}
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar evento..."
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

          {/* Events List - Landing Page Style */}
          <div className="space-y-3 mb-6">
            {eventosFiltrados.map((evento) => (
              <div
                key={evento.id}
                className="bg-card border-2 border-border p-4 hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold uppercase" style={{ fontFamily: "var(--font-oswald)" }}>
                      {evento.nome}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {evento.status === "inscricoes-abertas" && `${evento.statusLabel} • ${evento.inscritos} inscritos`}
                      {evento.status === "rascunho" && `${evento.statusLabel} • não publicado`}
                      {evento.status === "finalizado" && `${evento.statusLabel} • relatório pronto`}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={cn(
                        "px-2 py-1 text-xs font-semibold uppercase",
                        evento.status === "inscricoes-abertas" ? "bg-green-500/10 text-green-500" :
                        evento.status === "rascunho" ? "bg-yellow-500/10 text-yellow-500" :
                        "bg-muted text-muted-foreground"
                      )}>
                        {evento.statusLabel}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {evento.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Floating Add Button - Landing Page Style */}
          <Button className="fixed bottom-24 right-4 w-14 h-14 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all" size="icon">
            <Plus className="w-6 h-6" />
          </Button>
        </main>

        {/* Bottom Navigation */}
        <BottomNav activeId={activePage} />
      </div>

      {/* Desktop Layout - TODO: Implement desktop version */}
      <div className="relative hidden lg:flex flex-1 items-center justify-center p-8 z-10">
        <header className="bg-fight-surface border-b border-fight px-4 py-3">
          {/* Header sem título redundante */}
        </header>
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold mb-4 text-fight">
            EVENTOS
          </h2>
          <p className="font-ui text-fight-secondary mb-8">
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
