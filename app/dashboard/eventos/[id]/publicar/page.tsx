"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Settings, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PublicarCardPage() {
  const router = useRouter()

  // Mock data - seria substituído por dados reais da API
  const evento = {
    nome: "XFEST - POA",
    linkQR: "LinkQR para atletas e público",
  }

  const lutas = [
    {
      id: "1",
      numero: 1,
      atletaA: "Atleta A",
      atletaB: "Atleta B",
      horario: "---",
      ringue: "Ringue 1",
    },
    {
      id: "2",
      numero: 2,
      atletaA: "Atleta A",
      atletaB: "Atleta B",
      horario: "---",
      ringue: "Ringue 1",
    },
    {
      id: "3",
      numero: 3,
      atletaA: "Atleta A",
      atletaB: "Atleta B",
      horario: "---",
      ringue: "Ringue 1",
    },
    {
      id: "4",
      numero: 4,
      atletaA: "Atleta A",
      atletaB: "Atleta B",
      horario: "---",
      ringue: "Ringue 1",
    },
  ]

  const handleCopiarLink = () => {
    // Copiar link para clipboard
    navigator.clipboard.writeText(evento.linkQR)
    alert("Link copiado!")
  }

  const handlePublicar = () => {
    // Lógica de publicação
    alert("Card publicado com sucesso!")
    router.push("/dashboard/eventos")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-card border-b-2 border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="w-10 h-10 rounded-full hover:bg-secondary transition-colors flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="font-bold text-base" style={{ fontFamily: "var(--font-oswald)" }}>
                  Publicar card
                </h1>
                <p className="text-xs text-muted-foreground">Prévia pública</p>
              </div>
            </div>
            <button className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center hover:bg-secondary transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 overflow-auto pb-24">
          {/* Event Page Link */}
          <div className="bg-card border-2 border-border rounded-3xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="font-bold text-sm mb-1" style={{ fontFamily: "var(--font-oswald)" }}>
                  Página do evento
                </h2>
                <p className="text-xs text-muted-foreground">{evento.linkQR}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-2"
                onClick={handleCopiarLink}
              >
                Copiar
              </Button>
            </div>
          </div>

          {/* Fights Preview */}
          <div className="mb-6">
            <h3 className="text-sm font-bold mb-3" style={{ fontFamily: "var(--font-oswald)" }}>
              Lutas (prévia)
            </h3>
            <div className="space-y-3">
              {lutas.map((luta) => (
                <div
                  key={luta.id}
                  className="bg-card border-2 border-border rounded-3xl p-4 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-bold text-sm mb-1" style={{ fontFamily: "var(--font-oswald)" }}>
                        Luta {luta.numero}: {luta.atletaA} vs {luta.atletaB}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Horário: {luta.horario} • {luta.ringue}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-sm font-medium"
                    >
                      Editar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Publish Button */}
          <Button
            className="w-full h-14 rounded-3xl text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
            style={{ fontFamily: "var(--font-oswald)" }}
            onClick={handlePublicar}
          >
            Publicar agora
          </Button>
        </main>
      </div>

      {/* Desktop Layout - TODO: Implement desktop version */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-oswald)" }}>
            PUBLICAR CARD
          </h2>
          <p className="text-muted-foreground mb-8">
            Versão desktop em desenvolvimento
          </p>
          <Button onClick={() => router.back()}>
            Voltar
          </Button>
        </div>
      </div>
    </div>
  )
}
