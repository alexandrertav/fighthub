export interface Athlete {
  id: string
  name: string
  nickname?: string
  city: string
  team: string
  primaryModality: "Muay Thai" | "Kickboxing" // Only Muay Thai and Kickboxing
  level: "Amador" | "Semi-Pro" | "Profissional" // Fighter level
  height?: number // Height in cm
  age?: number
  stance?: "Destro" | "Canhoto" // Orthodox or Southpaw
  record: {
    wins: number
    losses: number
    draws: number
  }
  koPercentage?: number // KO percentage
  winsKO?: number
  winsDecision?: number
  lossesKO?: number
  lossesDecision?: number
  status: "Ativo" | "Suspenso" | "Inativo" // Translated to PT
  verified: boolean
  federations: string[]
}

export interface Event {
  id: string
  name: string
  date: string
  city: string
  venue: string
  federation: string
  status: "INSCRICOES_ABERTAS" | "FINALIZADO" // Only these two statuses
}

export interface Bout {
  id: string
  eventId: string
  athleteRed: {
    id: string
    name: string
    nickname?: string
    record: {
      wins: number
      losses: number
      draws: number
    }
  }
  athleteBlue: {
    id: string
    name: string
    nickname?: string
    record: {
      wins: number
      losses: number
      draws: number
    }
  }
  modality: "Muay Thai" | "Kickboxing" // Only these two modalities
  rounds?: number
  status: "Proposta" | "Confirmada" | "Finalizada" // Translated to PT
  cardPosition?: "Luta Principal" | "Co-Principal" | "Preliminar" // Translated to PT
  result?: {
    winner: "Vermelho" | "Azul" | "Empate" // Translated to PT
    method: string
    round?: number
  }
}

export interface Federation {
  id: string
  name: string
  abbreviation: string
  city: string
}

export interface RankingEntry {
  position: number
  athleteId: string
  athleteName: string
  team: string
  record: {
    wins: number
    losses: number
    draws: number
  }
  level: "Amador" | "Semi-Pro" | "Profissional" // Fighter level
  modality: "Muay Thai" | "Kickboxing" // Only these two
}
