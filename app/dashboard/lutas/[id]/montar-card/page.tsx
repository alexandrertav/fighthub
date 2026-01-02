"use client"

import { useState } from "react"
import { use } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MontarCardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isConfirming, setIsConfirming] = useState(false)

  const atleta1Id = searchParams.get("atleta1")
  const atleta2Id = searchParams.get("atleta2")

  // Mock data - seria substituído por dados reais da API
  const categoria = {
    modalidade: "Muay Thai",
    peso: "81kg",
    nivel: "Profissional",
  }

  const atletas = [
    { id: "1", nome: "Alexandre", equipe: "Tormann", peso: "81kg", vitorias: 12, derrotas: 3 },
    { id: "2", nome: "Pedro", equipe: "Elite Thai", peso: "80kg", vitorias: 8, derrotas: 2 },

  ]

  const atleta1 = atletas.find(a => a.id === atleta1Id)
  const atleta2 = atletas.find(a => a.id === atleta2Id)

  const handleConfirmar = () => {
    setIsConfirming(true)
    // Simular confirmação
    setTimeout(() => {
      router.push("/dashboard/lutas")
    }, 1500)
  }

  if (!atleta1 || !atleta2) {
    return (
      <div className="relative min-h-screen bg-fight-black bg-grain-noise flex items-center justify-center">
        <div className="absolute inset-0 bg-fight-gradient opacity-30 pointer-events-none" />
        <div className="relative z-10 text-center">
          <p className="font-ui text-fight-secondary">Atletas não encontrados</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-fight-black bg-grain-noise flex flex-col">
      <div className="absolute inset-0 bg-fight-gradient opacity-30 pointer-events-none" />
      
      {/* Mobile Layout */}
      <div className="relative lg:hidden flex flex-col min-h-screen z-10">
        {/* Header */}
        <header className="bg-fight-surface border-b border-fight p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 flex items-center justify-center hover:bg-fight-black transition-colors rounded"
            >
              <ArrowLeft className="w-5 h-5 text-fight" />
            </button>
            <div>
              <h1 className="font-display text-lg text-fight uppercase">
                Montar Card
              </h1>
              <p className="font-ui text-xs text-fight-secondary">
                {categoria.modalidade} • {categoria.peso}
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 pt-6 pb-6 overflow-auto">
          {/* Header Card */}
          <div className="bg-card border-2 border-border p-6 mb-6">
            <h2 className="text-3xl font-bold text-condensed uppercase mb-2" style={{ fontFamily: "var(--font-oswald)" }}>
              MONTAR CARD
            </h2>
            <p className="text-sm text-muted-foreground">
              {categoria.modalidade} • {categoria.peso} • {categoria.nivel}
            </p>
          </div>

          {/* Fight Preview - Landing Page Style */}
          <div className="space-y-4 mb-6">
            {/* Atleta 1 - Vermelho */}
            <div className="bg-card border-2 border-primary p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-xs text-primary uppercase font-bold tracking-wider">CORNER VERMELHO</span>
              </div>
              <h3 className="text-2xl font-bold uppercase mb-2" style={{ fontFamily: "var(--font-oswald)" }}>
                {atleta1.nome}
              </h3>
              <p className="text-sm text-muted-foreground mb-1">
                {atleta1.equipe} • {atleta1.peso}
              </p>
              <p className="text-sm text-muted-foreground">
                {atleta1.vitorias}V - {atleta1.derrotas}D
              </p>
            </div>

            {/* VS */}
            <div className="text-center py-2">
              <span className="text-5xl font-bold text-primary" style={{ fontFamily: "var(--font-oswald)" }}>VS</span>
            </div>

            {/* Atleta 2 - Azul */}
            <div className="bg-card border-2 border-blue-500 p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-blue-500 uppercase font-bold tracking-wider">CORNER AZUL</span>
              </div>
              <h3 className="text-2xl font-bold uppercase mb-2" style={{ fontFamily: "var(--font-oswald)" }}>
                {atleta2.nome}
              </h3>
              <p className="text-sm text-muted-foreground mb-1">
                {atleta2.equipe} • {atleta2.peso}
              </p>
              <p className="text-sm text-muted-foreground">
                {atleta2.vitorias}V - {atleta2.derrotas}D
              </p>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-card border-2 border-border p-4 mb-6">
            <h4 className="text-sm font-bold uppercase mb-3" style={{ fontFamily: "var(--font-oswald)" }}>Detalhes</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rounds:</span>
                <span className="font-semibold">3 x 3min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Categoria:</span>
                <span className="font-semibold">{categoria.modalidade}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-12 border-2"
              style={{ fontFamily: "var(--font-oswald)" }}
              onClick={() => router.back()}
              disabled={isConfirming}
            >
              VOLTAR
            </Button>
            <Button
              className="h-12"
              style={{ fontFamily: "var(--font-oswald)" }}
              onClick={handleConfirmar}
              disabled={isConfirming}
            >
              {isConfirming ? (
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  CONFIRMADO!
                </span>
              ) : (
                "CONFIRMAR"
              )}
            </Button>
          </div>
        </main>
      </div>

      {/* Desktop Layout */}
      <div className="relative hidden lg:flex flex-1 items-center justify-center p-8 z-10">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold mb-4 text-fight uppercase">
            Montar Card
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
