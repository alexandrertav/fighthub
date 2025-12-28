"use client"

import { useState, use } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Chip } from "@/components/ui/chip"
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from "@/components/ui/modal"
import { Input } from "@/components/ui/input"
import { mockAthletes, mockBouts } from "@/lib/mock-data"

export default function AthleteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [activeTab, setActiveTab] = useState<"overview" | "history" | "ratings">("overview")
  const [showProposeModal, setShowProposeModal] = useState(false)

  const athlete = mockAthletes.find((a) => a.id === id)
  const athleteBouts = mockBouts.filter((b) => b.athleteRed.id === id || b.athleteBlue.id === id)

  if (!athlete) {
    return (
      <AppShell>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-oswald)" }}>
            ATLETA NÃO ENCONTRADO
          </h1>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      {/* Hero "Tale of the Tape" style */}
      <div className="relative bg-gradient-to-br from-secondary via-card to-secondary grain-overlay border-b-4 border-primary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                {athlete.verified && (
                  <Badge variant="default" className="mb-2">
                    VERIFIED
                  </Badge>
                )}
                {athlete.status === "Suspenso" && (
                  <Badge variant="destructive" className="mb-2 ml-2">
                    SUSPENSO
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowProposeModal(true)}
                  className="border-2 bg-transparent"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  PROPOR LUTA
                </Button>
                <Button
                  variant="outline"
                  onClick={() => console.log("TODO: Editar")}
                  className="border-2 bg-transparent"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  EDITAR
                </Button>
              </div>
            </div>

            <h1
              className="text-5xl md:text-7xl font-bold text-condensed leading-none mb-2"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              {athlete.name.toUpperCase()}
            </h1>
            {athlete.nickname && <p className="text-2xl text-muted-foreground italic mb-6">"{athlete.nickname}"</p>}

            <div className="flex flex-wrap gap-2 mb-8">
              <Chip variant="primary">{athlete.city}</Chip>
              <Chip>{athlete.team}</Chip>
            </div>

            {/* Tale of the Tape */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-card/50 border-2 border-border p-6">
              <div className="text-center">
                <div
                  className="text-3xl font-bold text-primary leading-none mb-1"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  {athlete.level}
                </div>
                <div className="text-xs text-muted-foreground text-expanded">NÍVEL</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold leading-none mb-1" style={{ fontFamily: "var(--font-oswald)" }}>
                  {athlete.record.wins}-{athlete.record.losses}-{athlete.record.draws}
                </div>
                <div className="text-xs text-muted-foreground text-expanded">RECORD</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold leading-none mb-1" style={{ fontFamily: "var(--font-oswald)" }}>
                  {athlete.primaryModality}
                </div>
                <div className="text-xs text-muted-foreground text-expanded">MODALIDADE</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="border-b-2 border-border mb-8">
          <div className="flex gap-1">
            {["overview", "history", "ratings"].map((tab) => (
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
                {tab === "overview" && "VISÃO GERAL"}
                {tab === "history" && "HISTÓRICO"}
                {tab === "ratings" && "RATINGS"}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border-2 border-border p-6">
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-oswald)" }}>
                INFORMAÇÕES
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm text-muted-foreground">Status</dt>
                  <dd className="font-medium">{athlete.status}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Cidade</dt>
                  <dd className="font-medium">{athlete.city}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Equipe</dt>
                  <dd className="font-medium">{athlete.team}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Federações</dt>
                  <dd className="font-medium">{athlete.federations.join(", ")}</dd>
                </div>
              </dl>
            </div>

            <div className="bg-card border-2 border-border p-6">
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-oswald)" }}>
                ESTATÍSTICAS
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm text-muted-foreground">Vitórias</dt>
                  <dd className="font-medium text-2xl text-green-500">{athlete.record.wins}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Derrotas</dt>
                  <dd className="font-medium text-2xl text-red-500">{athlete.record.losses}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Empates</dt>
                  <dd className="font-medium text-2xl">{athlete.record.draws}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-4">
            {athleteBouts.map((bout) => (
              <div key={bout.id} className="bg-card border-2 border-border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">
                      {bout.athleteRed.name} vs {bout.athleteBlue.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {bout.modality}
                    </p>
                  </div>
                  <Badge variant={bout.status === "Finalizada" ? "secondary" : "default"}>{bout.status}</Badge>
                </div>
                {bout.result && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-sm">
                      <span className="font-bold">
                        Resultado: {bout.result.winner === "Vermelho" ? bout.athleteRed.name : bout.athleteBlue.name}
                      </span>{" "}
                      por {bout.result.method}
                    </p>
                  </div>
                )}
              </div>
            ))}
            {athleteBouts.length === 0 && (
              <div className="bg-card border-2 border-border p-8 text-center">
                <p className="text-muted-foreground">Nenhuma luta registrada</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "ratings" && (
          <div className="bg-card border-2 border-border p-8 text-center">
            <p className="text-muted-foreground">Histórico de ratings será exibido aqui</p>
          </div>
        )}
      </div>

      {/* Propose Fight Modal */}
      <Modal open={showProposeModal} onOpenChange={setShowProposeModal}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>PROPOR LUTA</ModalTitle>
            <ModalDescription>Crie uma proposta de luta para {athlete.name}</ModalDescription>
          </ModalHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Evento (opcional)</label>
              <select className="w-full px-4 py-2 bg-background border-2 border-border text-sm rounded-sm">
                <option value="">Selecione um evento</option>
                <option>XFEST 2026</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Modalidade</label>
              <select className="w-full px-4 py-2 bg-background border-2 border-border text-sm rounded-sm">
                <option>Muay Thai</option>
                <option>Kickboxing</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Mensagem</label>
              <Input placeholder="Observações sobre a proposta..." className="border-2" />
            </div>
          </div>
          <ModalFooter>
            <Button
              variant="outline"
              onClick={() => setShowProposeModal(false)}
              className="border-2 bg-transparent"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              CANCELAR
            </Button>
            <Button
              onClick={() => {
                console.log("TODO: Enviar proposta")
                setShowProposeModal(false)
              }}
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              ENVIAR PROPOSTA
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </AppShell>
  )
}
