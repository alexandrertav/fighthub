"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AtletaDetalhesPage() {
  const router = useRouter()

  // Mock data - seria substituído por dados reais da API
  const atleta = {
    id: "1",
    nome: "Thiago Ferreira",
    modalidade: "Muay Thai",
    categoria: "Categoria 81",
    status: "pago",
    statusLabel: "PAGO",
    documentos: {
      rgCpf: { enviado: true, status: "aprovado" },
      atestadoMedico: { enviado: false, status: "pendente" },
    },
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
          <div className="bg-card border-2 border-border rounded-3xl p-6 mb-6">
            <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-oswald)" }}>
              {atleta.nome}
            </h2>
            <div className="flex items-center gap-3">
              <p className="text-sm text-muted-foreground">
                {atleta.modalidade} • {atleta.categoria} • {atleta.status}
              </p>
              <div className="px-3 py-1 rounded-full border-2 border-border bg-background">
                <span className="text-xs font-bold" style={{ fontFamily: "var(--font-oswald)" }}>
                  {atleta.statusLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Documentos Section */}
          <div className="mb-6">
            <h3 className="text-sm font-bold mb-3" style={{ fontFamily: "var(--font-oswald)" }}>
              Documentos
            </h3>
            <div className="space-y-3">
              {/* RG/CPF */}
              <div className="bg-card border-2 border-border rounded-3xl p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">RG/CPF</p>
                  <p className="text-xs text-muted-foreground">Enviado</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary" />
                </div>
              </div>

              {/* Atestado Médico */}
              <div className="bg-card border-2 border-border rounded-3xl p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Atestado médico</p>
                  <p className="text-xs text-muted-foreground">Pendente</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm font-medium"
                >
                  Cobrar
                </Button>
              </div>
            </div>
          </div>

          {/* Ações Section */}
          <div className="mb-6">
            <h3 className="text-sm font-bold mb-3" style={{ fontFamily: "var(--font-oswald)" }}>
              Ações
            </h3>
            <div className="space-y-3">
              {/* Casar luta */}
              <Button
                variant="outline"
                className="w-full h-12 rounded-3xl border-2 text-sm font-medium"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Casar luta
              </Button>

              {/* Marcar pendência */}
              <Button
                variant="outline"
                className="w-full h-12 rounded-3xl border-2 text-sm font-medium"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Marcar pendência
              </Button>

              {/* Estornar pagamento */}
              <Button
                variant="outline"
                className="w-full h-auto py-4 px-6 rounded-3xl border-2 text-left flex flex-col items-start gap-1"
              >
                <span className="text-sm font-medium" style={{ fontFamily: "var(--font-oswald)" }}>
                  Estornar pagamento (se não achar luta)
                </span>
                <span className="text-xs text-muted-foreground font-normal">
                  Opção: pagamento • reembolso total
                </span>
              </Button>
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
