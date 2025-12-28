"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { PosterHero } from "@/components/layout/poster-hero"
import { FightCard } from "@/components/domain/fight-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from "@/components/ui/modal"
import { mockBouts, mockEvents } from "@/lib/mock-data"
import { AlertTriangle } from "lucide-react"

export default function MatchmakingPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState("")
  const [selectedModality, setSelectedModality] = useState("MMA")
  const [selectedWeight, setSelectedWeight] = useState("Peso Leve")

  const suggestedBouts = mockBouts.filter((b) => b.status === "PROPOSTA").slice(0, 3)
  const upcomingEvents = mockEvents.filter((e) => new Date(e.date) > new Date())

  return (
    <AppShell>
      <PosterHero
        size="sm"
        headline="MATCHMAKING"
        subheadline="Sistema inteligente para criação de cards equilibrados"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-card border-2 border-border p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-oswald)" }}>
                PARÂMETROS
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Evento</label>
                  <select
                    className="w-full px-3 py-2 bg-background border-2 border-border text-sm rounded-sm"
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                  >
                    <option value="">Sem evento específico</option>
                    {upcomingEvents.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Modalidade</label>
                  <select
                    className="w-full px-3 py-2 bg-background border-2 border-border text-sm rounded-sm"
                    value={selectedModality}
                    onChange={(e) => setSelectedModality(e.target.value)}
                  >
                    <option>MMA</option>
                    <option>Boxe</option>
                    <option>Muay Thai</option>
                    <option>Jiu-Jitsu</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Categoria de Peso</label>
                  <select
                    className="w-full px-3 py-2 bg-background border-2 border-border text-sm rounded-sm"
                    value={selectedWeight}
                    onChange={(e) => setSelectedWeight(e.target.value)}
                  >
                    <option>Peso Pena</option>
                    <option>Peso Leve</option>
                    <option>Peso Meio-Médio</option>
                    <option>Peso Médio</option>
                    <option>Peso Meio-Pesado</option>
                    <option>Peso Pesado</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Nível</label>
                  <select className="w-full px-3 py-2 bg-background border-2 border-border text-sm rounded-sm">
                    <option>Todos</option>
                    <option>Iniciante</option>
                    <option>Intermediário</option>
                    <option>Profissional</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Distância Máxima (km)</label>
                  <select className="w-full px-3 py-2 bg-background border-2 border-border text-sm rounded-sm">
                    <option>Sem limite</option>
                    <option>50 km</option>
                    <option>100 km</option>
                    <option>200 km</option>
                  </select>
                </div>
                <Button
                  className="w-full"
                  onClick={() => console.log("TODO: Gerar sugestões")}
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  GERAR SUGESTÕES
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-oswald)" }}>
                SUGESTÕES DE LUTAS
              </h2>
              <Badge>{suggestedBouts.length} sugestões</Badge>
            </div>

            <div className="space-y-6">
              {suggestedBouts.map((bout) => (
                <div key={bout.id} className="space-y-3">
                  <FightCard bout={bout} />

                  {/* Alerts */}
                  <div className="flex flex-wrap gap-2">
                    {Math.abs(bout.athleteRed.rating - bout.athleteBlue.rating) > 200 && (
                      <div className="flex items-center gap-2 text-sm text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 rounded-sm">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Diferença de rating alta (mais de 200 pontos)</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button onClick={() => setShowCreateModal(true)} style={{ fontFamily: "var(--font-oswald)" }}>
                      CRIAR PROPOSTA
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => console.log("TODO: Editar parâmetros")}
                      className="border-2 bg-transparent"
                      style={{ fontFamily: "var(--font-oswald)" }}
                    >
                      EDITAR PARÂMETROS
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => console.log("TODO: Descartar")}
                      className="border-2 bg-transparent"
                      style={{ fontFamily: "var(--font-oswald)" }}
                    >
                      DESCARTAR
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {suggestedBouts.length === 0 && (
              <div className="bg-card border-2 border-border p-12 text-center">
                <p className="text-xl text-muted-foreground mb-4">Nenhuma sugestão disponível</p>
                <p className="text-sm text-muted-foreground">
                  Ajuste os parâmetros de busca e clique em "Gerar Sugestões"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Proposal Modal */}
      <Modal open={showCreateModal} onOpenChange={setShowCreateModal}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>CRIAR PROPOSTA</ModalTitle>
            <ModalDescription>Confirme os detalhes da proposta de luta</ModalDescription>
          </ModalHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              A proposta será enviada para ambos os atletas e seus representantes
            </p>
          </div>
          <ModalFooter>
            <Button
              variant="outline"
              onClick={() => setShowCreateModal(false)}
              className="border-2 bg-transparent"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              CANCELAR
            </Button>
            <Button
              onClick={() => {
                console.log("TODO: Criar proposta")
                setShowCreateModal(false)
              }}
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              CONFIRMAR PROPOSTA
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </AppShell>
  )
}
