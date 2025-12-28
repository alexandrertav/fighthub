"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FiltersBarProps {
  onSearch?: (value: string) => void
  onFilterChange?: (filters: Record<string, string>) => void
}

export function FiltersBar({ onSearch, onFilterChange }: FiltersBarProps) {
  return (
    <div className="bg-card border-2 border-border p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input placeholder="Buscar por nome..." onChange={(e) => onSearch?.(e.target.value)} className="border-2" />
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            className="px-4 py-2 bg-background border-2 border-border text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
            onChange={(e) => onFilterChange?.({ modality: e.target.value })}
          >
            <option value="">Todas modalidades</option>
            <option value="Muay Thai">Muay Thai</option>
            <option value="Kickboxing">Kickboxing</option>
          </select>
          <select
            className="px-4 py-2 bg-background border-2 border-border text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
            onChange={(e) => onFilterChange?.({ status: e.target.value })}
          >
            <option value="">Todos status</option>
            <option value="Ativo">Ativo</option>
            <option value="Suspenso">Suspenso</option>
            <option value="Inativo">Inativo</option>
          </select>
          <Button variant="outline" onClick={() => console.log("TODO: Resetar filtros")} className="border-2">
            Limpar
          </Button>
        </div>
      </div>
    </div>
  )
}
