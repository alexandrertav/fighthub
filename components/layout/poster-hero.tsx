import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PosterHeroProps {
  headline: string
  subheadline?: string
  badge?: string
  children?: ReactNode
  size?: "sm" | "md" | "lg"
  className?: string
}

export function PosterHero({ headline, subheadline, badge, children, size = "lg", className }: PosterHeroProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-secondary via-card to-secondary grain-overlay",
        size === "lg" && "py-24 md:py-32",
        size === "md" && "py-16 md:py-20",
        size === "sm" && "py-12 md:py-16",
        className,
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            currentColor 10px,
            currentColor 11px
          )`,
          }}
        />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          {badge && (
            <div className="inline-block">
              <span
                className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold text-expanded border-2 border-primary-foreground/20"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                {badge}
              </span>
            </div>
          )}

          <h1
            className={cn(
              "font-bold text-condensed leading-none text-balance",
              size === "lg" && "text-5xl md:text-7xl lg:text-8xl",
              size === "md" && "text-4xl md:text-5xl lg:text-6xl",
              size === "sm" && "text-3xl md:text-4xl lg:text-5xl",
            )}
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            {headline}
          </h1>

          {subheadline && (
            <p
              className={cn(
                "text-muted-foreground max-w-3xl mx-auto text-pretty",
                size === "lg" && "text-lg md:text-xl",
                size === "md" && "text-base md:text-lg",
                size === "sm" && "text-sm md:text-base",
              )}
            >
              {subheadline}
            </p>
          )}

          {children && <div className="flex flex-wrap items-center justify-center gap-4 pt-4">{children}</div>}
        </div>
      </div>
    </div>
  )
}
