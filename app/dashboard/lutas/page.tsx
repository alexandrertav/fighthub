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
  CreditCard,
  ChevronDown
} from "lucide-react"
import { cn } from "@/lib/utils"
import BottomNav from "@/components/layout/bottom-nav"

export default function LutasPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activePage, setActivePage] = useState("lutas")
  const [nivelFilter, setNivelFilter] = useState<"amador" | "profissional">("profissional")

  // Mock data
  const categorias = [
    {
      id: "muay-thai-81kg-pro",
      modalidade: "Muay Thai",
      peso: "81kg",
      nivel: "profissional",
      inscritos: 6,
    },
    {
      id: "muay-thai-70kg-pro",
      modalidade: "Muay Thai",
      peso: "70kg",
      nivel: "profissional",
      inscritos: 8,
    },
    {
      id: "muay-thai-61kg-ama",
      modalidade: "Muay Thai",
      peso: "61kg",
      nivel: "amador",
      inscritos: 10,
    },
    {
      id: "kickboxing-75kg-ama",
      modalidade: "Kickboxing",
      peso: "75kg",
      nivel: "amador",
      inscritos: 4,
    },
  ]


  const categoriasFiltradas = categorias.filter((cat) => {
    const matchNivel = cat.nivel === nivelFilter
    const searchText = `${cat.modalidade} ${cat.peso}`.toLowerCase()
    const matchSearch = searchText.includes(searchQuery.toLowerCase())
    return matchNivel && matchSearch
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

          {/* Filtro de Nível */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setNivelFilter("profissional")}
              className={cn(
                "bg-card border-2 p-4 transition-all",
                nivelFilter === "profissional"
                  ? "border-primary"
                  : "border-border hover:border-primary/50"
              )}
            >
              <div className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-oswald)" }}>
                PRO
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Profissional</p>
            </button>
            <button
              onClick={() => setNivelFilter("amador")}
              className={cn(
                "bg-card border-2 p-4 transition-all",
                nivelFilter === "amador"
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
            <div className="space-y-3">
              {categoriasFiltradas.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/dashboard/lutas/${cat.id}`}
                  className="block"
                >
                  <div className="bg-card border-2 border-border hover:border-primary/50 p-4 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold uppercase mb-1" style={{ fontFamily: "var(--font-oswald)" }}>
                          {cat.modalidade}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {cat.peso} • {cat.inscritos} inscritos
                        </p>
                      </div>
                      <ChevronDown className="w-4 h-4 text-muted-foreground rotate-[-90deg]" />
                    </div>
                  </div>
                </Link>
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
