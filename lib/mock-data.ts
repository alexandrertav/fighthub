import type { Athlete, Event, Bout, Federation, RankingEntry } from "./types"

export const mockFederations: Federation[] = [
  { id: "fed1", name: "Federação Gaúcha de Muay Thai", abbreviation: "FGMT", city: "Porto Alegre" },
  { id: "fed2", name: "Liga Sul de Kickboxing", abbreviation: "LSK", city: "Caxias do Sul" },
]

export const mockAthletes: Athlete[] = [
  {
    id: "thiago-ferreira",
    name: "Thiago Ferreira",
    nickname: "Vampiro",
    city: "Porto Alegre",
    team: "Warriors",
    primaryModality: "Muay Thai",
    level: "Profissional",
    height: 176,
    age: 29,
    stance: "Destro",
    record: { wins: 17, losses: 3, draws: 0 },
    koPercentage: 71,
    winsKO: 12,
    winsDecision: 5,
    lossesKO: 1,
    lossesDecision: 2,
    status: "Ativo",
    verified: true,
    federations: ["FGMT"],
  },
]

export const mockEvents: Event[] = [
  {
    id: "6958b35b9919123678e02029",
    slug: "xfest-striking-x4rhc",
    title: "XFEST STRIKING",
    price: 150.00,
    allowedModalities: ["MUAY_THAI", "BOXE"],
    date: "2026-02-08",
    location: "Cachoeirinha - Distrito Arena",
    status: "PUBLISHED",
  },
]

export const mockBouts: Bout[] = [
  {
    id: "bout1",
    eventId: "xfest-2026",
    athleteRed: {
      id: "thiago-ferreira",
      name: "Thiago Ferreira",
      nickname: "Vampiro",
      record: { wins: 17, losses: 3, draws: 0 },
    },
    athleteBlue: {
      id: "opponent",
      name: "A Definir",
      nickname: "",
      record: { wins: 0, losses: 0, draws: 0 },
    },
    modality: "Muay Thai",
    rounds: 5,
    status: "Proposta",
    cardPosition: "Luta Principal",
  },
]

export const mockRankings: RankingEntry[] = [
  {
    position: 1,
    athleteId: "thiago-ferreira",
    athleteName: "Thiago Ferreira",
    team: "Warriors",
    record: { wins: 17, losses: 3, draws: 0 },
    level: "Profissional",
    modality: "Muay Thai",
  },
]
