export type NextEvent = {
  id: string
  dateISO: string // "2026-01-17T21:00:00-03:00"
  dateLabel: string // "17 DE JANEIRO DE 2026 ÀS 21:00 BRT" (já pronto pra UI)
  titleLine1: string // "BKFC 86 MOHEGAN SUN"
  titleLine2: string // "LANE VS PAGUE ON DAZN"
  locationLabel?: string // opcional
  mainCardImage?: string // imagem de fundo do hero (local ou placeholder)
  promoThumb?: string // thumbnail do evento (local ou placeholder)
}
