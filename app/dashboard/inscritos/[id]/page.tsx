"use client"

import { useState, useEffect } from "react"
import { use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Trash2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { apiClient } from "@/lib/api"

export default function AtletaDetalhesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [atleta, setAtleta] = useState<any>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    loadAthleteData()
  }, [id])

  async function loadAthleteData() {
    try {
      setLoading(true)
      const data = await apiClient.get<any>(`/api/public/registrations/${id}`)
      console.log("📋 Dados do atleta:", data)
      setAtleta(data)
    } catch (error) {
      console.error("❌ Erro ao carregar atleta:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!confirm("Tem certeza que deseja remover este atleta? Esta ação não pode ser desfeita.")) {
      return
    }

    try {
      setDeleting(true)
      // Fazer requisição DELETE manualmente
      const res = await fetch(`/api/public/registrations/${id}`, {
        method: "DELETE",
      })
      
      if (!res.ok) {
        throw new Error("Erro ao remover atleta")
      }
      
      alert("Atleta removido com sucesso!")
      router.push("/dashboard/inscritos")
    } catch (error) {
      console.error("❌ Erro ao remover atleta:", error)
      alert("Erro ao remover atleta. Tente novamente.")
    } finally {
      setDeleting(false)
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

  if (!atleta) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Atleta não encontrado</p>
          <Button onClick={() => router.back()}>Voltar</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-card border-b-2 border-border p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full hover:bg-secondary transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-bold text-base" style={{ fontFamily: "var(--font-oswald)" }}>
                Inscrições
              </h1>
              <p className="text-xs text-muted-foreground">Detalhe do atleta</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 overflow-auto">
          {/* Athlete Info Card */}
          <div className="bg-card border-2 border-border rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-oswald)" }}>
              {atleta.fullName.toUpperCase()}
            </h2>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {getModalityLabel(atleta.modality)} • {atleta.level} • {atleta.team}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={cn(
                  "px-3 py-1 text-xs font-bold uppercase",
                  atleta.status === "PAID" ? "bg-green-500/10 text-green-500" :
                  atleta.status === "PENDING_PAYMENT" ? "bg-yellow-500/10 text-yellow-500" :
                  "bg-red-500/10 text-red-500"
                )}>
                  {getStatusLabel(atleta.status)}
                </span>
                <span className={cn(
                  "px-3 py-1 text-xs font-bold uppercase",
                  atleta.matchStatus === "LUTA_CONFIRMADA" ? "bg-blue-500/10 text-blue-500" :
                  atleta.matchStatus === "LUTA_SUGERIDA" ? "bg-purple-500/10 text-purple-500" :
                  "bg-gray-500/10 text-gray-500"
                )}>
                  {getMatchStatusLabel(atleta.matchStatus)}
                </span>
              </div>
            </div>
          </div>

          {/* Dados Pessoais */}
          <div className="bg-card border-2 border-border rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-oswald)" }}>
              DADOS PESSOAIS
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Idade</p>
                <p className="font-semibold">{atleta.age} anos</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Peso</p>
                <p className="font-semibold">{atleta.weight} kg</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Altura</p>
                <p className="font-semibold">{atleta.height} cm</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total de Lutas</p>
                <p className="font-semibold">{atleta.totalFights}</p>
              </div>
            </div>
            {atleta.recordNotes && (
              <div className="mt-4">
                <p className="text-xs text-muted-foreground mb-1">Cartel/Observações</p>
                <p className="text-sm">{atleta.recordNotes}</p>
              </div>
            )}
          </div>

          {/* Informações de Pagamento */}
          {atleta.payment && (
            <div className="bg-card border-2 border-border rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-oswald)" }}>
                PAGAMENTO
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Valor</p>
                  <p className="font-semibold">R$ {atleta.payment.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <p className="font-semibold">{atleta.payment.status}</p>
                </div>
                {atleta.payment.mpPaymentId && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">ID Mercado Pago</p>
                    <p className="text-xs font-mono">{atleta.payment.mpPaymentId}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Data do Pagamento</p>
                  <p className="text-sm">{new Date(atleta.payment.updatedAt).toLocaleString('pt-BR')}</p>
                </div>
              </div>
            </div>
          )}

          {/* Evento */}
          <div className="bg-card border-2 border-border rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-oswald)" }}>
              EVENTO
            </h3>
            <div className="space-y-2">
              <p className="font-semibold">{atleta.eventTitle}</p>
              <Link 
                href={`/events/${atleta.eventSlug}`}
                className="text-sm text-primary hover:underline"
              >
                Ver página do evento →
              </Link>
            </div>
          </div>


          {/* Ações Section */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-oswald)" }}>
              AÇÕES
            </h3>
            <div className="space-y-3">
              {/* Remover Atleta */}
              <Button
                onClick={handleDelete}
                disabled={deleting}
                variant="destructive"
                className="w-full h-12 rounded-lg text-sm font-medium"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    REMOVENDO...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    REMOVER ATLETA
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Esta ação removerá o atleta e seus dados de pagamento permanentemente
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Desktop Layout - TODO: Implement desktop version */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-oswald)" }}>
            DETALHES DO ATLETA
          </h2>
          <p className="text-muted-foreground mb-8">
            Versão desktop em desenvolvimento
          </p>
          <Button asChild>
            <Link href="/dashboard/inscritos">Voltar para Inscritos</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
