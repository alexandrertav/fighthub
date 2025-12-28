"use client"

import { useState } from "react"
import Link from "next/link"
import { AppShell } from "@/components/layout/app-shell"
import { PosterHero } from "@/components/layout/poster-hero"
import { FiltersBar } from "@/components/domain/filters-bar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockAthletes } from "@/lib/mock-data"

export default function AthletesPage() {
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")

  return (
    <AppShell>
      <PosterHero size="sm" headline="ATLETAS" subheadline="Base completa de lutadores do Rio Grande do Sul" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-oswald)" }}>
            {mockAthletes.length} ATLETAS CADASTRADOS
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => console.log("TODO: Novo atleta")}
              className="border-2 bg-transparent"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              NOVO ATLETA
            </Button>
            <Button
              variant="outline"
              onClick={() => console.log("TODO: Exportar")}
              className="border-2 bg-transparent"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              EXPORTAR
            </Button>
          </div>
        </div>

        <FiltersBar />

        {/* Athletes Table */}
        <div className="mt-8 bg-card border-2 border-border overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b-2 border-border">
              <tr>
                <th
                  className="px-4 py-3 text-left text-sm font-bold text-expanded"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  NOME
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-bold text-expanded"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  CIDADE
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-bold text-expanded"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  EQUIPE
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-bold text-expanded"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  MODALIDADE
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-bold text-expanded"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  RECORD
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-bold text-expanded"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  NÍVEL
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-bold text-expanded"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockAthletes.map((athlete) => (
                <tr key={athlete.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/athletes/${athlete.id}`} className="font-medium hover:text-primary">
                      {athlete.name}
                      {athlete.verified && <span className="ml-2 text-primary text-xs">✓</span>}
                    </Link>
                    {athlete.nickname && <p className="text-xs text-muted-foreground italic">"{athlete.nickname}"</p>}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{athlete.city}</td>
                  <td className="px-4 py-3 text-sm">{athlete.team}</td>
                  <td className="px-4 py-3 text-sm">{athlete.primaryModality}</td>
                  <td className="px-4 py-3 text-sm font-medium">
                    {athlete.record.wins}-{athlete.record.losses}-{athlete.record.draws}
                  </td>
                  <td className="px-4 py-3 text-sm font-bold">{athlete.level}</td>
                  <td className="px-4 py-3">
                    <Badge variant={athlete.status === "Ativo" ? "default" : "destructive"}>{athlete.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  )
}
