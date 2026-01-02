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
  ChevronDown
} from "lucide-react"
import { cn } from "@/lib/utils"
import BottomNav from "@/components/layout/bottom-nav"

export default function InscricoesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<string | null>("todos")
  const [activePage, setActivePage] = useState("inscricoes")
  const [selectedEvent, setSelectedEvent] = useState("xfest-poa")

  // Mock data
  const events = [
    { id: "xfest-poa", name: "XFEST - POA" },
    { id: "copa-rs", name: "Copa RS de Muay Thai" },
  ]

  const inscricoes = [
    {
      id: "1",
      nome: "Thiago Ferreira",
      modalidade: "Muay Thai",
      peso: "81 kg",
      status: "confirmado",
      statusLabel: "Confirmado",
    },
    {
      id: "2",
      nome: "Lucas Silva",
      modalidade: "Kickboxing",
      peso: "75 kg",
      status: "confirmado",
      statusLabel: "Confirmado",
    },
    {
      id: "3",
      nome: "Marina Costa",
      modalidade: "Muay Thai",
      peso: "57 kg",
      status: "sem-luta",
      statusLabel: "Sem luta",
    },
  ]

  const filtros = [
    { id: "todos", label: "Todos" },
    { id: "sem-luta", label: "Sem luta" },
  ]


  const inscricoesFiltradas = inscricoes.filter((inscricao) => {
    const matchSearch = inscricao.nome.toLowerCase().includes(searchQuery.toLowerCase())
    const matchFilter = activeFilter === "todos" || !activeFilter || inscricao.status === activeFilter
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
                    {event.name}
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
            {inscricoesFiltradas.map((inscricao) => (
              <div
                key={inscricao.id}
                className="bg-card border-2 border-border p-4 hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-oswald)" }}>
                      {inscricao.nome.toUpperCase()}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {inscricao.modalidade} • {inscricao.peso}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={cn(
                        "px-2 py-1 text-xs font-semibold uppercase",
                        inscricao.status === "confirmado" ? "bg-green-500/10 text-green-500" :
                        "bg-yellow-500/10 text-yellow-500"
                      )}>
                        {inscricao.statusLabel}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/inscritos/${inscricao.id}`}>Ver</Link>
                  </Button>
                </div>
              </div>
            ))}
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
