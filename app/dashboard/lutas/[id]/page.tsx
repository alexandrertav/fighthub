"use client"

import { useState, useEffect } from "react"
import { use } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { apiClient } from "@/lib/api"

export default function CasarLutasBoard({ params }: { params: Promise<{ id: string }> }) {
  const { id: categoryId } = use(params)
  const router = useRouter()
  const searchParams = useSearchParams()
  const eventId = searchParams.get("eventId")
  
  const [selectedAtletas, setSelectedAtletas] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [categoria, setCategoria] = useState<any>(null)
  const [atletas, setAtletas] = useState<any[]>([])

  useEffect(() => {
    if (eventId) {
      loadCategory()
    }
  }, [eventId, categoryId])

  async function loadCategory() {
    try {
      setLoading(true)
      const data = await apiClient.get<any>(`/api/promoter/events/${eventId}/matchmaking`)
      console.log("🎯 Dados matchmaking:", data)
      
      // Encontrar a categoria específica
      const cat = data.categories.find((c: any) => c.id === decodeURIComponent(categoryId))
      
      if (cat) {
        setCategoria(cat)
        setAtletas(cat.athletes)
      }
    } catch (error) {
      console.error("❌ Erro ao carregar categoria:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleConfirmarLuta() {
    if (selectedAtletas.length !== 2) return

    try {
      setCreating(true)
      const response = await fetch("/api/promoter/matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          athlete1Id: selectedAtletas[0],
          athlete2Id: selectedAtletas[1],
          confirmed: true,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Erro ao criar luta")
      }

      alert("✅ Luta confirmada com sucesso!")
      router.push("/dashboard/lutas")
    } catch (error: any) {
      console.error("❌ Erro ao confirmar luta:", error)
      alert(error.message || "Erro ao confirmar luta")
    } finally {
      setCreating(false)
    }
  }

  function getModalityLabel(modality: string) {
    return modality === "MUAY_THAI" ? "Muay Thai" : "Boxe"
  }

  // Verificar compatibilidade de peso
  const hasConflict = selectedAtletas.length === 2 && (() => {
    const athlete1 = atletas.find(a => a.id === selectedAtletas[0])
    const athlete2 = atletas.find(a => a.id === selectedAtletas[1])
    if (!athlete1 || !athlete2) return false
    const weightDiff = Math.abs(athlete1.weight - athlete2.weight)
    return weightDiff > 3 // Alerta se diferença > 3kg
  })()

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!categoria) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Categoria não encontrada</p>
          <Button onClick={() => router.back()}>Voltar</Button>
        </div>
      </div>
    )
  }

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
                  {getModalityLabel(categoria.modality)}
                </h1>
                <p className="font-ui text-xs text-fight-secondary">
                  {categoria.weightRange}kg • {categoria.level}
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
                  {atleta.fullName.toUpperCase()}
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  {atleta.team}
                </p>
                <p className="text-xs text-muted-foreground">
                  {atleta.weight}kg • {atleta.totalFights} lutas
                </p>
                {atleta.recordNotes && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {atleta.recordNotes}
                  </p>
                )}
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
            disabled={selectedAtletas.length !== 2 || creating}
            onClick={handleConfirmarLuta}
          >
            {creating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                CONFIRMANDO...
              </>
            ) : (
              "CONFIRMAR LUTA"
            )}
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
