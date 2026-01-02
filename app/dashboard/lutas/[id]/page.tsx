"use client"

import { useState } from "react"
import { use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CasarLutasBoard({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [selectedAtletas, setSelectedAtletas] = useState<string[]>([])

  // Mock data - seria substituído por dados reais da API
  const categoria = {
    id,
    modalidade: "Muay Thai",
    peso: "81kg",
    nivel: "Profissional",
  }

  const atletas = [
    { id: "1", nome: "Alexandre", equipe: "Tormann", peso: "81kg", vitorias: 12, derrotas: 3 },
    { id: "2", nome: "Pedro", equipe: "Elite Thai", peso: "80kg", vitorias: 8, derrotas: 2 },
  ]

  const hasConflict = selectedAtletas.length === 2 && selectedAtletas.includes("2") && selectedAtletas.includes("3")

  const handleAtletaClick = (atletaId: string) => {
    setSelectedAtletas((prev) => {
      if (prev.includes(atletaId)) {
        return prev.filter((id) => id !== atletaId)
      }
      if (prev.length < 2) {
        return [...prev, atletaId]
      }
      return prev
    })
  }

  return (
    <div className="relative min-h-screen bg-fight-black bg-grain-noise flex flex-col">
      <div className="absolute inset-0 bg-fight-gradient opacity-30 pointer-events-none" />
      
      {/* Mobile Layout */}
      <div className="relative lg:hidden flex flex-col min-h-screen z-10">
        {/* Header */}
        <header className="bg-fight-surface border-b border-fight p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="w-10 h-10 flex items-center justify-center hover:bg-fight-black transition-colors rounded"
              >
                <ArrowLeft className="w-5 h-5 text-fight" />
              </button>
              <div>
                <h1 className="font-display text-lg text-fight uppercase">
                  {categoria.modalidade}
                </h1>
                <p className="font-ui text-xs text-fight-secondary">
                  {categoria.peso} • {categoria.nivel}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 pt-6 pb-6 overflow-auto">
          {/* Header Info */}
          <div className="bg-card border-2 border-border p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Selecione 2 atletas</p>
                <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-oswald)" }}>
                  {selectedAtletas.length}/2
                </div>
              </div>
              {selectedAtletas.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedAtletas([])}
                  className="border-2"
                >
                  Limpar
                </Button>
              )}
            </div>
          </div>

          {/* Athletes Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {atletas.map((atleta) => (
              <button
                key={atleta.id}
                onClick={() => handleAtletaClick(atleta.id)}
                className={cn(
                  "bg-card border-2 p-4 min-h-[120px] transition-all text-left",
                  selectedAtletas.includes(atleta.id)
                    ? "border-primary"
                    : "border-border hover:border-primary/50"
                )}
              >
                <p className="font-bold text-sm mb-1" style={{ fontFamily: "var(--font-oswald)" }}>
                  {atleta.nome.toUpperCase()}
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  {atleta.equipe}
                </p>
                <p className="text-xs text-muted-foreground">
                  {atleta.peso} • {atleta.vitorias}V-{atleta.derrotas}D
                </p>
              </button>
            ))}
          </div>

          {/* Conflicts Alert */}
          {hasConflict && (
            <div className="bg-destructive/10 border-2 border-destructive/50 p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-destructive mb-1">
                    Atenção: Diferença de experiência
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Considere equilibrar melhor o card
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Button */}
          <Button
            className="w-full h-12"
            style={{ fontFamily: "var(--font-oswald)" }}
            disabled={selectedAtletas.length !== 2}
            onClick={() => {
              if (selectedAtletas.length === 2) {
                const atletasSelecionados = atletas.filter(a => selectedAtletas.includes(a.id))
                router.push(`/dashboard/lutas/${id}/montar-card?atleta1=${atletasSelecionados[0].id}&atleta2=${atletasSelecionados[1].id}`)
              }
            }}
          >
            CONFIRMAR LUTA
          </Button>
        </main>
      </div>

      {/* Desktop Layout - TODO: Implement desktop version */}
      <div className="relative hidden lg:flex flex-1 items-center justify-center p-8 z-10">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold mb-4 text-fight uppercase">
            CASAR LUTAS
          </h2>
          <p className="font-ui text-fight-secondary mb-8">
            Versão desktop em desenvolvimento
          </p>
          <Button 
            onClick={() => router.back()}
            className="bg-fight-accent hover:bg-fight-accent-hover text-white font-display uppercase"
          >
            Voltar
          </Button>
        </div>
      </div>
    </div>
  )
}
