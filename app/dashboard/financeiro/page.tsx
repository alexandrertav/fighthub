"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard, 
  Calendar, 
  Trophy, 
  Users, 
  Settings,
  ChevronDown
} from "lucide-react"
import { cn } from "@/lib/utils"
import BottomNav from "@/components/layout/bottom-nav"

export default function FinanceiroPage() {
  const [activePage, setActivePage] = useState("financeiro")
  const [selectedEvent, setSelectedEvent] = useState("xfest-poa")

  // Mock data
  const events = [
    { id: "xfest-poa", name: "XFEST - POA" },
    { id: "copa-rs", name: "Copa RS de Muay Thai" },
  ]

  const financeiro = {
    saldoEstimado: "R$ 12.480",
  }

  const movimentacoes = [
    {
      id: "1",
      tipo: "pagamento",
      descricao: "Thiago Ferreira",
      modalidade: "Muay Thai",
      valor: "+ R$ 80,00",
      data: "28/12/2024",
      status: "aprovado",
    },
    {
      id: "2",
      tipo: "pagamento",
      descricao: "Lucas Silva",
      modalidade: "Kickboxing",
      valor: "+ R$ 80,00",
      data: "27/12/2024",
      status: "aprovado",
    },
    {
      id: "3",
      tipo: "pagamento",
      descricao: "Marina Costa",
      modalidade: "Muay Thai",
      valor: "+ R$ 80,00",
      data: "27/12/2024",
      status: "aprovado",
    },
    {
      id: "4",
      tipo: "estorno",
      descricao: "João Pedro",
      modalidade: "Boxe",
      valor: "- R$ 80,00",
      data: "26/12/2024",
      status: "processado",
    },
  ]


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
              FINANCEIRO
            </h2>
            <p className="text-sm text-muted-foreground">{events.find(e => e.id === selectedEvent)?.name}</p>
          </div>

          {/* Saldo Card - Landing Page Style */}
          <div className="bg-card border-2 border-border p-6 mb-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">SALDO DISPONÍVEL</p>
            <div className="text-4xl font-bold mb-1" style={{ fontFamily: "var(--font-oswald)" }}>
              {financeiro.saldoEstimado}
            </div>
            <p className="text-xs text-muted-foreground">Próximo repasse em 16/02</p>
          </div>

          {/* Movimentações Recentes - Landing Page Style */}
          <section>
            <h3 className="text-2xl font-bold text-condensed mb-4" style={{ fontFamily: "var(--font-oswald)" }}>
              MOVIMENTAÇÕES RECENTES
            </h3>
            <div className="space-y-3">
              {movimentacoes.map((mov) => (
                <div
                  key={mov.id}
                  className="bg-card border-2 border-border hover:border-primary/50 p-4 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-bold text-sm mb-1" style={{ fontFamily: "var(--font-oswald)" }}>
                        {mov.descricao.toUpperCase()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {mov.modalidade} • {mov.data}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={cn(
                        "text-lg font-bold",
                        mov.tipo === "pagamento" ? "text-green-500" : "text-red-500"
                      )} style={{ fontFamily: "var(--font-oswald)" }}>
                        {mov.valor}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">
                        {mov.status === "aprovado" ? "Confirmado" : mov.status === "processado" ? "Processado" : "Pendente"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Bottom Navigation */}
        <BottomNav activeId={activePage} />
      </div>

      {/* Desktop Layout - TODO: Implement desktop version */}
      <div className="relative hidden lg:flex flex-1 items-center justify-center p-8 z-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-oswald)" }}>
            FINANCEIRO
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
