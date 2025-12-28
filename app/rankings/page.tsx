"use client"

import { useState } from "react"
import Link from "next/link"
import { AppShell } from "@/components/layout/app-shell"
import { PosterHero } from "@/components/layout/poster-hero"
import { Button } from "@/components/ui/button"
import { mockRankings } from "@/lib/mock-data"

export default function RankingsPage() {
  const [selectedModality, setSelectedModality] = useState("all")

  const filteredRankings = mockRankings.filter((entry) => {
    if (selectedModality !== "all" && entry.modality !== selectedModality) return false
    return true
  })

  return (
    <AppShell>
      <PosterHero size="sm" headline="RANKINGS" subheadline="Rankings oficiais de atletas do Rio Grande do Sul" />

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-card border-2 border-border p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block" style={{ fontFamily: "var(--font-oswald)" }}>
                MODALIDADE
              </label>
              <select
                className="w-full px-4 py-2 bg-background border-2 border-border text-sm rounded-sm"
                value={selectedModality}
                onChange={(e) => setSelectedModality(e.target.value)}
              >
                <option value="all">Todas</option>
                <option value="Muay Thai">Muay Thai</option>
                <option value="Kickboxing">Kickboxing</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button onClick={() => console.log("TODO: Gerar sugestões")} style={{ fontFamily: "var(--font-oswald)" }}>
                GERAR SUGESTÕES
              </Button>
            </div>
          </div>
        </div>

        {/* Rankings Table */}
        <div className="bg-card border-2 border-border overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b-2 border-border">
              <tr>
                <th
                  className="px-4 py-3 text-center text-sm font-bold text-expanded w-20"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  #
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-bold text-expanded"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  ATLETA
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-bold text-expanded"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  EQUIPE
                </th>
                <th
                  className="px-4 py-3 text-center text-sm font-bold text-expanded"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  RECORD
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-bold text-expanded"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  MODALIDADE
                </th>
                <th
                  className="px-4 py-3 text-center text-sm font-bold text-expanded"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  NÍVEL
                </th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRankings.map((entry) => (
                <tr key={entry.athleteId} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-4 text-center">
                    <span
                      className="text-3xl font-bold text-primary leading-none"
                      style={{ fontFamily: "var(--font-oswald)" }}
                    >
                      {entry.position}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <Link href={`/athletes/${entry.athleteId}`} className="font-bold hover:text-primary text-lg">
                      {entry.athleteName}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">{entry.team}</td>
                  <td className="px-4 py-4 text-center font-medium">
                    <span className="text-green-500">{entry.record.wins}</span>-
                    <span className="text-red-500">{entry.record.losses}</span>-{entry.record.draws}
                  </td>
                  <td className="px-4 py-4 text-sm">{entry.modality}</td>
                  <td className="px-4 py-4 text-center">
                    <span className="text-xs font-bold px-2 py-1 rounded" style={{ fontFamily: "var(--font-oswald)" }}>
                      {entry.level}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <Link href={`/athletes/${entry.athleteId}`}>
                      <Button variant="outline" size="sm" className="border-2 bg-transparent">
                        VER
                      </Button>
                    </Link>
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
