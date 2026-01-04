"use client"

import { useState, useEffect } from "react"
import { use } from "react"
import { useRouter } from "next/navigation"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, User, Weight, Ruler, Trophy, Users, Shield, Loader2 } from "lucide-react"
import { apiClient } from "@/lib/api"
import { Event } from "@/lib/types"
import Link from "next/link"

export default function InscricaoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    weight: "",
    height: "",
    totalFights: "",
    recordNotes: "",
    team: "",
    level: "AMADOR" as "AMADOR" | "SEMI_PRO",
    modality: "MUAY_THAI" as "BOXE" | "MUAY_THAI"
  })

  const handleModalityChange = (newModality: "BOXE" | "MUAY_THAI") => {
    console.log("Mudando modalidade para:", newModality)
    console.log("Estado atual:", formData.modality)
    setFormData(prev => {
      const updated = {...prev, modality: newModality}
      console.log("Novo estado:", updated.modality)
      return updated
    })
  }

  useEffect(() => {
    async function loadEvent() {
      try {
        const eventData = await apiClient.get<Event>(`/api/public/events/by-slug/${id}`)
        setEvent(eventData)
      } catch (err) {
        console.error("Erro ao carregar evento:", err)
      } finally {
        setLoading(false)
      }
    }
    loadEvent()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!event) return
    
    try {
      setSubmitting(true)
      
      const response = await apiClient.post<{ registrationId: string; checkoutUrl: string }>(
        `/api/public/events/${event.id}/registrations`,
        {
          fullName: formData.fullName,
          age: parseInt(formData.age),
          weight: parseFloat(formData.weight),
          height: parseFloat(formData.height),
          totalFights: parseInt(formData.totalFights),
          recordNotes: formData.recordNotes || undefined,
          team: formData.team,
          level: formData.level,
          modality: formData.modality
        }
      )
      
      window.location.href = response.checkoutUrl
      
    } catch (err) {
      console.error("Erro ao criar inscrição:", err)
      alert("Erro ao criar inscrição: " + (err instanceof Error ? err.message : "Erro desconhecido"))
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <AppShell>
        <div className="relative min-h-screen bg-fight-black bg-grain-noise flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-fight-accent animate-spin" />
        </div>
      </AppShell>
    )
  }

  if (!event) {
    return (
      <AppShell>
        <div className="relative min-h-screen bg-fight-black bg-grain-noise">
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="font-display text-3xl font-bold text-fight uppercase">
              EVENTO NÃO ENCONTRADO
            </h1>
          </div>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="relative min-h-screen bg-fight-black bg-grain-noise">
        <div className="absolute inset-0 bg-fight-gradient opacity-30 pointer-events-none" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="bg-fight-surface border-b-2 border-fight">
            <div className="container mx-auto px-4 py-6">
              <Link 
                href={`/events/${id}`}
                className="inline-flex items-center gap-2 text-fight-secondary hover:text-fight transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-ui text-sm">Voltar para o evento</span>
              </Link>
              
              <div className="mt-4">
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-fight uppercase mb-2">
                  INSCRIÇÃO
                </h1>
                <p className="font-ui text-lg text-fight-secondary">
                  {event.title}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-3">
                  <div className="flex items-center gap-2">
                    <span className="font-ui text-sm text-fight-secondary">Valor:</span>
                    <span className="font-display text-xl text-fight-accent">
                      R$ {event.price.toFixed(2)}
                    </span>
                  </div>
                  {event.date && (
                    <div className="flex items-center gap-2">
                      <span className="font-ui text-sm text-fight-secondary">Data:</span>
                      <span className="font-ui text-sm text-fight">
                        {new Date(event.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-center gap-2">
                      <span className="font-ui text-sm text-fight-secondary">Local:</span>
                      <span className="font-ui text-sm text-fight">{event.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Dados Pessoais */}
                <div className="bg-fight-surface border-2 border-fight rounded-lg p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-fight-accent/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-fight-accent" />
                    </div>
                    <h2 className="font-display text-xl md:text-2xl font-bold text-fight uppercase">
                      Dados Pessoais
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="font-ui text-sm font-medium mb-2 block text-fight-secondary">
                        Nome Completo *
                      </label>
                      <Input 
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        placeholder="Digite seu nome completo"
                        className="bg-fight-black border-fight hover:border-fight-hover focus:border-fight-accent text-fight h-12"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="font-ui text-sm font-medium mb-2 block text-fight-secondary">
                          Idade *
                        </label>
                        <Input 
                          required
                          type="number"
                          min="16"
                          max="60"
                          value={formData.age}
                          onChange={(e) => setFormData({...formData, age: e.target.value})}
                          placeholder="Ex: 25"
                          className="bg-fight-black border-fight hover:border-fight-hover focus:border-fight-accent text-fight h-12"
                        />
                      </div>

                      <div>
                        <label className="font-ui text-sm font-medium mb-2 block text-fight-secondary flex items-center gap-2">
                          <Weight className="w-4 h-4" />
                          Peso (kg) *
                        </label>
                        <Input 
                          required
                          type="number"
                          step="0.1"
                          min="40"
                          max="150"
                          value={formData.weight}
                          onChange={(e) => setFormData({...formData, weight: e.target.value})}
                          placeholder="Ex: 75.5"
                          className="bg-fight-black border-fight hover:border-fight-hover focus:border-fight-accent text-fight h-12"
                        />
                      </div>

                      <div>
                        <label className="font-ui text-sm font-medium mb-2 block text-fight-secondary flex items-center gap-2">
                          <Ruler className="w-4 h-4" />
                          Altura (cm) *
                        </label>
                        <Input 
                          required
                          type="number"
                          min="140"
                          max="220"
                          value={formData.height}
                          onChange={(e) => setFormData({...formData, height: e.target.value})}
                          placeholder="Ex: 175"
                          className="bg-fight-black border-fight hover:border-fight-hover focus:border-fight-accent text-fight h-12"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Experiência */}
                <div className="bg-fight-surface border-2 border-fight rounded-lg p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-fight-accent/20 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-fight-accent" />
                    </div>
                    <h2 className="font-display text-xl md:text-2xl font-bold text-fight uppercase">
                      Experiência
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="font-ui text-sm font-medium mb-2 block text-fight-secondary">
                          Total de Lutas *
                        </label>
                        <Input 
                          required
                          type="number"
                          min="0"
                          max="200"
                          value={formData.totalFights}
                          onChange={(e) => setFormData({...formData, totalFights: e.target.value})}
                          placeholder="Ex: 5"
                          className="bg-fight-black border-fight hover:border-fight-hover focus:border-fight-accent text-fight h-12"
                        />
                      </div>

                      <div>
                        <label className="font-ui text-sm font-medium mb-2 block text-fight-secondary flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Nível *
                        </label>
                        <select 
                          required
                          value={formData.level}
                          onChange={(e) => setFormData({...formData, level: e.target.value as "AMADOR" | "SEMI_PRO"})}
                          className="w-full h-12 px-4 bg-fight-black border border-fight hover:border-fight-hover focus:border-fight-accent text-fight rounded-md font-ui"
                        >
                          <option value="AMADOR">Amador</option>
                          <option value="SEMI_PRO">Semi-Profissional</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-ui text-sm font-medium mb-2 block text-fight-secondary">
                        Cartel / Observações
                      </label>
                      <textarea
                        value={formData.recordNotes}
                        onChange={(e) => setFormData({...formData, recordNotes: e.target.value})}
                        placeholder="Ex: 5V-2D-0E ou informações adicionais sobre sua experiência"
                        rows={3}
                        className="w-full px-4 py-3 bg-fight-black border border-fight hover:border-fight-hover focus:border-fight-accent text-fight rounded-md font-ui resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Equipe e Modalidade */}
                <div className="bg-fight-surface border-2 border-fight rounded-lg p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-fight-accent/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-fight-accent" />
                    </div>
                    <h2 className="font-display text-xl md:text-2xl font-bold text-fight uppercase">
                      Equipe e Modalidade
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="font-ui text-sm font-medium mb-2 block text-fight-secondary">
                        Equipe / Academia *
                      </label>
                      <Input 
                        required
                        value={formData.team}
                        onChange={(e) => setFormData({...formData, team: e.target.value})}
                        placeholder="Nome da sua equipe ou academia"
                        className="bg-fight-black border-fight hover:border-fight-hover focus:border-fight-accent text-fight h-12"
                      />
                    </div>

                    <div>
                      <label className="font-ui text-sm font-medium mb-2 block text-fight-secondary">
                        Modalidade *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => handleModalityChange("MUAY_THAI")}
                          onKeyDown={(e) => e.key === 'Enter' && handleModalityChange("MUAY_THAI")}
                          style={{ 
                            userSelect: 'none', 
                            WebkitUserSelect: 'none', 
                            pointerEvents: 'auto',
                            borderColor: formData.modality === "MUAY_THAI" ? '#ef4444' : '#525252',
                            backgroundColor: formData.modality === "MUAY_THAI" ? 'rgba(239, 68, 68, 0.1)' : '#0a0a0a',
                            color: formData.modality === "MUAY_THAI" ? '#ef4444' : '#e5e5e5'
                          }}
                          className="p-4 rounded-lg border-2 transition-all cursor-pointer select-none"
                        >
                          <div className="font-display text-lg uppercase pointer-events-none">Muay Thai</div>
                        </div>
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => handleModalityChange("BOXE")}
                          onKeyDown={(e) => e.key === 'Enter' && handleModalityChange("BOXE")}
                          style={{ 
                            userSelect: 'none', 
                            WebkitUserSelect: 'none', 
                            pointerEvents: 'auto',
                            borderColor: formData.modality === "BOXE" ? '#ef4444' : '#525252',
                            backgroundColor: formData.modality === "BOXE" ? 'rgba(239, 68, 68, 0.1)' : '#0a0a0a',
                            color: formData.modality === "BOXE" ? '#ef4444' : '#e5e5e5'
                          }}
                          className="p-4 rounded-lg border-2 transition-all cursor-pointer select-none"
                        >
                          <div className="font-display text-lg uppercase pointer-events-none">Boxe</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resumo e Submit */}
                <div className="bg-fight-surface border-2 border-fight-accent rounded-lg p-6 md:p-8">
                  <h3 className="font-display text-lg font-bold text-fight uppercase mb-4">
                    Resumo da Inscrição
                  </h3>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="font-ui text-sm text-fight-secondary">Evento:</span>
                      <span className="font-ui text-sm text-fight font-semibold">{event.title}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-ui text-sm text-fight-secondary">Valor da Inscrição:</span>
                      <span className="font-display text-xl text-fight-accent">R$ {event.price.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="bg-fight-black/50 border border-fight rounded-lg p-4 mb-6">
                    <p className="font-ui text-xs text-fight-secondary leading-relaxed">
                      Ao clicar em "FINALIZAR INSCRIÇÃO", você será redirecionado para o Mercado Pago para realizar o pagamento. 
                      Após a confirmação do pagamento, sua inscrição será processada e você receberá mais informações.
                    </p>
                  </div>

                  <Button 
                    type="submit"
                    disabled={submitting}
                    className="w-full h-14 bg-fight-accent hover:bg-fight-accent-hover text-white font-display text-lg uppercase"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        PROCESSANDO...
                      </span>
                    ) : (
                      "FINALIZAR INSCRIÇÃO"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
