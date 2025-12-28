"use client"

import { useState } from "react"
import { use } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { EventBanner } from "@/components/domain/event-banner"
import { FightCard } from "@/components/domain/fight-card"
import { Button } from "@/components/ui/button"
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from "@/components/ui/modal"
import { Input } from "@/components/ui/input"
import { mockEvents, mockBouts } from "@/lib/mock-data"

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [activeTab, setActiveTab] = useState<"card" | "categories" | "inscriptions" | "results">("card")
  const [showInscriptionModal, setShowInscriptionModal] = useState(false)
  const [showMatchmakingModal, setShowMatchmakingModal] = useState(false)

  const event = mockEvents.find((e) => e.id === id)
  const eventBouts = mockBouts.filter((b) => b.eventId === id)

  if (!event) {
    return (
      <AppShell>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-oswald)" }}>
            EVENTO NÃO ENCONTRADO
          </h1>
        </div>
      </AppShell>
    )
  }

  const mainEvent = eventBouts.find((b) => b.cardPosition === "MAIN_EVENT")
  const coMain = eventBouts.find((b) => b.cardPosition === "CO_MAIN")
  const prelims = eventBouts.filter((b) => b.cardPosition === "PRELIM")

  return (
    <AppShell>
      <EventBanner event={event} />

      {/* CTA Buttons */}
      <div className="bg-secondary/30 border-b-2 border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setShowInscriptionModal(true)} style={{ fontFamily: "var(--font-oswald)" }}>
              INSCREVER-SE
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowMatchmakingModal(true)}
              className="border-2 bg-transparent"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              MONTAR CARD
            </Button>
            <Button
              variant="outline"
              onClick={() => console.log("TODO: Publicar card")}
              className="border-2 bg-transparent"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              PUBLICAR CARD
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="border-b-2 border-border mb-8">
          <div className="flex gap-1">
            {["card", "categories", "inscriptions", "results"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-3 font-bold text-sm transition-colors ${
                  activeTab === tab
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                {tab === "card" && "CARD"}
                {tab === "categories" && "CATEGORIAS"}
                {tab === "inscriptions" && "INSCRITOS"}
                {tab === "results" && "RESULTADOS"}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "card" && (
          <div className="space-y-8">
            {mainEvent && (
              <div>
                <h2
                  className="text-3xl font-bold text-primary mb-4 text-expanded"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  MAIN EVENT
                </h2>
                <FightCard bout={mainEvent} size="lg" />
              </div>
            )}
            {coMain && (
              <div>
                <h2
                  className="text-3xl font-bold text-primary mb-4 text-expanded"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  CO-MAIN EVENT
                </h2>
                <FightCard bout={coMain} size="md" />
              </div>
            )}
            {prelims.length > 0 && (
              <div>
                <h2
                  className="text-3xl font-bold text-primary mb-4 text-expanded"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  CARD PRELIMINAR
                </h2>
                <div className="space-y-4">
                  {prelims.map((bout) => (
                    <FightCard key={bout.id} bout={bout} size="sm" />
                  ))}
                </div>
              </div>
            )}
            {eventBouts.length === 0 && (
              <div className="text-center py-12 bg-card border-2 border-border">
                <p className="text-xl text-muted-foreground">Card ainda não montado</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "categories" && (
          <div className="bg-card border-2 border-border p-8 text-center">
            <p className="text-muted-foreground">Categorias disponíveis serão exibidas aqui</p>
          </div>
        )}

        {activeTab === "inscriptions" && (
          <div className="bg-card border-2 border-border p-8 text-center">
            <p className="text-muted-foreground">Lista de inscritos será exibida aqui</p>
          </div>
        )}

        {activeTab === "results" && (
          <div className="space-y-4">
            {eventBouts
              .filter((b) => b.result)
              .map((bout) => (
                <div key={bout.id} className="bg-card border-2 border-border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold">
                        {bout.athleteRed.name} vs {bout.athleteBlue.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {bout.modality} • {bout.weightClass}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">
                        {bout.result?.winner === "RED" ? bout.athleteRed.name : bout.athleteBlue.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {bout.result?.method} • R{bout.result?.round}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            {eventBouts.filter((b) => b.result).length === 0 && (
              <div className="bg-card border-2 border-border p-8 text-center">
                <p className="text-muted-foreground">Resultados ainda não disponíveis</p>
              </div>
            )}
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
    </AppShell>
  )
}
