export type HighlightType = "event" | "news"

export interface Highlight {
  id: string
  type: HighlightType
  dateISO?: string // Only for events
  dateLabel: string
  titleLine1: string
  titleLine2: string
  locationLabel?: string
  ctas: {
    primary: string
    secondary: string
    tertiary?: string // For floating card
  }
}
