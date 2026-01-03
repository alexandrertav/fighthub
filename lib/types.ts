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
  slug: string
  title: string
  price: number
  allowedModalities: ("BOXE" | "MUAY_THAI")[]
  date: string | null
  location: string | null
  status: "DRAFT" | "PUBLISHED" | "FINISHED"
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

export interface Registration {
  id: string
  eventId: string
  fullName: string
  age: number
  weight: number
  height: number
  totalFights: number
  recordNotes?: string
  team: string
  level: "AMADOR" | "SEMI_PRO"
  modality: "BOXE" | "MUAY_THAI"
  status: "PENDING_PAYMENT" | "PAID" | "REFUNDED" | "CANCELED"
  matchStatus: "SEM_LUTA" | "LUTA_SUGERIDA" | "LUTA_CONFIRMADA"
  paymentId?: string
}

export interface CreateRegistrationDto {
  fullName: string
  age: number
  weight: number
  height: number
  totalFights: number
  recordNotes?: string
  team: string
  level: "AMADOR" | "SEMI_PRO"
  modality: "BOXE" | "MUAY_THAI"
}

export interface RegistrationResponse {
  registrationId: string
  checkoutUrl: string
  status: "PENDING_PAYMENT"
  matchStatus: "SEM_LUTA"
}
