"use client"

import { useState } from "react"
import { use } from "react"
import { EventBanner } from "@/components/domain/event-banner"
import { FightCard } from "@/components/domain/fight-card"
import { Button } from "@/components/ui/button"
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from "@/components/ui/modal"
import { Input } from "@/components/ui/input"
import { mockEvents, mockBouts } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { AppShell } from "@/components/layout/app-shell"

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [activeTab, setActiveTab] = useState<"card" | "categories" | "inscriptions">("card")
  const [showInscriptionModal, setShowInscriptionModal] = useState(false)
  const [showMatchmakingModal, setShowMatchmakingModal] = useState(false)

  const event = mockEvents.find((e) => e.id === id)
  const eventBouts = mockBouts.filter((b) => b.eventId === id)

  if (!event) {
    return (
      <div className="relative min-h-screen bg-fight-black bg-grain-noise">
        <div className="absolute inset-0 bg-fight-gradient opacity-30 pointer-events-none" />
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-3xl font-bold text-fight uppercase">
            EVENTO NÃO ENCONTRADO
          </h1>
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
                onClick={() => setShowInscriptionModal(true)} 
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
              {[
                { nome: "Thiago Ferreira", modalidade: "Muay Thai", peso: "81kg", categoria: "Peso Médio" },
                { nome: "Lucas Silva", modalidade: "Kickboxing", peso: "75kg", categoria: "Peso Leve" },
                { nome: "Marina Costa", modalidade: "Muay Thai", peso: "57kg", categoria: "Peso Galo" },
                { nome: "Pedro Santos", modalidade: "Muay Thai", peso: "69kg", categoria: "Peso Leve" },
              ].map((atleta, idx) => (
                <div key={idx} className="bg-fight-surface border border-fight rounded-lg p-4 hover:border-fight-hover transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-display text-lg text-fight uppercase">{atleta.nome}</h4>
                      <p className="font-ui text-sm text-fight-secondary">
                        {atleta.modalidade} • {atleta.categoria} • {atleta.peso}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-fight hover:border-fight-accent text-fight font-ui"
                    >
                      Ver Perfil
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Inscription Modal */}
        <Modal open={showInscriptionModal} onOpenChange={setShowInscriptionModal}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>INSCREVER-SE NO EVENTO</ModalTitle>
            <ModalDescription>Preencha as informações para se inscrever neste evento</ModalDescription>
          </ModalHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Categoria</label>
              <select className="w-full px-4 py-2 bg-background border-2 border-border text-sm rounded-sm">
                <option>MMA - Peso Leve</option>
                <option>MMA - Peso Médio</option>
                <option>Boxe - Peso Pesado</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Observações</label>
              <Input placeholder="Informações adicionais..." className="border-2" />
            </div>
          </div>
          <ModalFooter>
            <Button
              variant="outline"
              onClick={() => setShowInscriptionModal(false)}
              className="border-2 bg-transparent"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              CANCELAR
            </Button>
            <Button
              onClick={() => {
                console.log("TODO: Enviar inscrição")
                setShowInscriptionModal(false)
              }}
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              ENVIAR INSCRIÇÃO
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
