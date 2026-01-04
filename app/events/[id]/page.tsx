"use client"

import { useState, useEffect } from "react"
import { use } from "react"
import { useRouter } from "next/navigation"
import { EventBanner } from "@/components/domain/event-banner"
import { FightCard } from "@/components/domain/fight-card"
import { Button } from "@/components/ui/button"
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from "@/components/ui/modal"
import { cn } from "@/lib/utils"
import { AppShell } from "@/components/layout/app-shell"
import { apiClient } from "@/lib/api"
import { Event, Bout, Registration } from "@/lib/types"

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"card" | "categories" | "inscriptions">("card")
  const [showMatchmakingModal, setShowMatchmakingModal] = useState(false)
  
  const [event, setEvent] = useState<Event | null>(null)
  const [eventBouts, setEventBouts] = useState<Bout[]>([])
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadEventData() {
      try {
        setLoading(true)
        setError(null)
        
        // Busca o evento pelo slug (id é o slug na URL)
        const eventData = await apiClient.get<Event>(`/api/public/events/by-slug/${id}`)
        setEvent(eventData)
        
        // TODO: Implementar endpoints de bouts e registrations no backend
        // const boutsData = await apiClient.get<Bout[]>(`/public/events/${eventData.id}/bouts`)
        // setEventBouts(boutsData)
        
        // const regsData = await apiClient.get<Registration[]>(`/public/events/${eventData.id}/registrations`)
        // setRegistrations(regsData)
        
      } catch (err) {
        console.error("Erro ao carregar evento:", err)
        setError(err instanceof Error ? err.message : "Erro ao carregar evento")
      } finally {
        setLoading(false)
      }
    }
    
    loadEventData()
  }, [id])


  if (loading) {
    return (
      <div className="relative min-h-screen bg-fight-black bg-grain-noise">
        <div className="absolute inset-0 bg-fight-gradient opacity-30 pointer-events-none" />
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-2xl font-bold text-fight uppercase">
            CARREGANDO...
          </h1>
        </div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="relative min-h-screen bg-fight-black bg-grain-noise">
        <div className="absolute inset-0 bg-fight-gradient opacity-30 pointer-events-none" />
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-3xl font-bold text-fight uppercase">
            EVENTO NÃO ENCONTRADO
          </h1>
          {error && (
            <p className="font-ui text-fight-secondary mt-4">{error}</p>
          )}
        </div>
      </div>
    )
  }

  const mainEvent = eventBouts.find((b) => b.cardPosition === "MAIN_EVENT")
  const coMain = eventBouts.find((b) => b.cardPosition === "CO_MAIN")
  const prelims = eventBouts.filter((b) => b.cardPosition === "PRELIM")

  return (
    <AppShell>
      <div className="relative min-h-screen bg-fight-black bg-grain-noise">
        <div className="absolute inset-0 bg-fight-gradient opacity-30 pointer-events-none" />
        
        <div className="relative z-10">
          <EventBanner event={event} />

        {/* CTA Buttons */}
        <div className="bg-fight-surface border-b border-fight">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={() => router.push(`/events/${id}/inscricao`)} 
                className="bg-fight-accent hover:bg-fight-accent-hover text-white font-display uppercase"
              >
                INSCREVER-SE
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowMatchmakingModal(true)}
                className="border border-fight hover:border-fight-hover bg-transparent text-fight font-display uppercase"
              >
                CASAR LUTAS
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="container mx-auto px-4 py-8">
          <div className="border-b border-fight mb-8">
            <div className="flex gap-1">
              {["card", "categories", "inscriptions"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={cn(
                    "px-6 py-3 font-display text-sm uppercase transition-colors",
                    activeTab === tab
                      ? "border-b-2 border-fight-accent text-fight-accent"
                      : "text-fight-secondary hover:text-fight"
                  )}
                >
                  {tab === "card" && "CARD"}
                  {tab === "categories" && "CATEGORIAS"}
                  {tab === "inscriptions" && "INSCRITOS"}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "card" && (
            <div className="space-y-8">
              {mainEvent && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-fight-accent mb-4 uppercase">
                    MAIN EVENT
                  </h2>
                  <div className="bg-fight-surface border border-fight rounded-lg p-6">
                    <FightCard bout={mainEvent} size="lg" />
                  </div>
                </div>
              )}
              {coMain && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-fight-accent mb-4 uppercase">
                    CO-MAIN EVENT
                  </h2>
                  <div className="bg-fight-surface border border-fight rounded-lg p-6">
                    <FightCard bout={coMain} size="md" />
                  </div>
                </div>
              )}
              {prelims.length > 0 && (
                <div>
                  <h2 className="font-display text-xl font-bold text-fight mb-4 uppercase">
                    CARD PRELIMINAR
                  </h2>
                  <div className="space-y-3">
                    {prelims.map((bout) => (
                      <div key={bout.id} className="bg-fight-surface border border-fight rounded-lg p-4">
                        <FightCard bout={bout} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {eventBouts.length === 0 && (
                <div className="text-center py-12 bg-fight-surface border border-fight rounded-lg">
                  <p className="font-ui text-lg text-fight-secondary">Card ainda não montado</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "categories" && (
            <div className="space-y-4">
              <div className="bg-fight-surface border border-fight rounded-lg p-6">
                <h3 className="font-display text-lg font-bold text-fight uppercase mb-4">Muay Thai</h3>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between p-3 bg-fight-black rounded border border-fight hover:border-fight-hover transition-colors">
                    <span className="font-ui text-fight">Peso Galo - até 61kg</span>
                    <span className="font-ui text-sm text-fight-secondary">3 inscritos</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-fight-black rounded border border-fight hover:border-fight-hover transition-colors">
                    <span className="font-ui text-fight">Peso Leve - até 70kg</span>
                    <span className="font-ui text-sm text-fight-secondary">5 inscritos</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-fight-black rounded border border-fight hover:border-fight-hover transition-colors">
                    <span className="font-ui text-fight">Peso Médio - até 80kg</span>
                    <span className="font-ui text-sm text-fight-secondary">4 inscritos</span>
                  </div>
                </div>
              </div>
              <div className="bg-fight-surface border border-fight rounded-lg p-6">
                <h3 className="font-display text-lg font-bold text-fight uppercase mb-4">Kickboxing</h3>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between p-3 bg-fight-black rounded border border-fight hover:border-fight-hover transition-colors">
                    <span className="font-ui text-fight">Peso Leve - até 70kg</span>
                    <span className="font-ui text-sm text-fight-secondary">2 inscritos</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-fight-black rounded border border-fight hover:border-fight-hover transition-colors">
                    <span className="font-ui text-fight">Peso Pesado - acima de 90kg</span>
                    <span className="font-ui text-sm text-fight-secondary">1 inscrito</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "inscriptions" && (
            <div className="space-y-3">
              {registrations.length === 0 ? (
                <div className="text-center py-12 bg-fight-surface border border-fight rounded-lg">
                  <p className="font-ui text-lg text-fight-secondary">Nenhuma inscrição ainda</p>
                </div>
              ) : (
                registrations.map((reg) => (
                  <div key={reg.id} className="bg-fight-surface border border-fight rounded-lg p-4 hover:border-fight-hover transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-display text-lg text-fight uppercase">{reg.fullName}</h4>
                        <p className="font-ui text-sm text-fight-secondary">
                          {reg.modality === "MUAY_THAI" ? "Muay Thai" : reg.modality} • {reg.level} • {reg.weight}kg • {reg.team}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <span className={`font-ui text-xs px-2 py-1 rounded ${
                            reg.status === "PAID" 
                              ? "bg-green-900/30 text-green-400 border border-green-800" 
                              : "bg-yellow-900/30 text-yellow-400 border border-yellow-800"
                          }`}>
                            {reg.status === "PAID" ? "PAGO" : "PENDENTE"}
                          </span>
                          <span className={`font-ui text-xs px-2 py-1 rounded ${
                            reg.matchStatus === "LUTA_CONFIRMADA" 
                              ? "bg-fight-accent/30 text-fight-accent border border-fight-accent" 
                              : "bg-fight-black text-fight-secondary border border-fight"
                          }`}>
                            {reg.matchStatus === "LUTA_CONFIRMADA" ? "LUTA CONFIRMADA" : 
                             reg.matchStatus === "LUTA_SUGERIDA" ? "LUTA SUGERIDA" : "SEM LUTA"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

        {/* Matchmaking Modal */}
        <Modal open={showMatchmakingModal} onOpenChange={setShowMatchmakingModal}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>MONTAR CARD</ModalTitle>
            <ModalDescription>Crie propostas de lutas para este evento</ModalDescription>
          </ModalHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Use os filtros para encontrar atletas compatíveis e criar propostas de luta
            </p>
          </div>
          <ModalFooter>
            <Button
              variant="outline"
              onClick={() => setShowMatchmakingModal(false)}
              className="border-2 bg-transparent"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              FECHAR
            </Button>
            <Button
              onClick={() => {
                console.log("TODO: Ir para matchmaking")
                setShowMatchmakingModal(false)
              }}
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              IR PARA MATCHMAKING
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </div>
      </div>
    </AppShell>
  )
}
