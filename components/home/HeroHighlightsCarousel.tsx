"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Countdown } from "./Countdown"
import type { Highlight } from "@/lib/types/highlight"

interface HeroHighlightsCarouselProps {
  items: Highlight[]
}

export function HeroHighlightsCarousel({ items }: HeroHighlightsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const currentItem = items[currentIndex]

  // Auto-rotate carousel
  useEffect(() => {
    if (isPaused || items.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, 7000) // 7 seconds

    return () => clearInterval(interval)
  }, [isPaused, items.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsPaused(true)
    // Resume autoplay after 10 seconds
    setTimeout(() => setIsPaused(false), 10000)
  }

  const goToPrevious = () => {
    goToSlide((currentIndex - 1 + items.length) % items.length)
  }

  const goToNext = () => {
    goToSlide((currentIndex + 1) % items.length)
  }

  const handleCTAClick = (action: string) => {
    console.log(`[v0] CTA clicked: ${action}`)
    // TODO: Implement actual action (open modal, navigate, etc.)
  }

  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[70vh] overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Abstract poster background using CSS */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentItem.type === "event"
              ? "bg-gradient-to-br from-background via-card to-background"
              : "bg-gradient-to-tr from-card via-secondary to-background"
          }`}
        />

        {/* Decorative shapes */}
        {currentItem.type === "event" && (
          <>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
          </>
        )}

        {/* Dark overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />

        {/* Grain texture */}
        <div className="absolute inset-0 grain-overlay opacity-50" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-12 md:py-16 h-full min-h-[60vh] md:min-h-[70vh]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
          {/* Main content - Left side */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            {/* Date label */}
            <div
              className="inline-block text-primary text-sm md:text-base font-bold tracking-wider uppercase"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              {currentItem.dateLabel}
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-condensed leading-none uppercase"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                {currentItem.titleLine1}
              </h1>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-condensed leading-none uppercase text-foreground/90"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                {currentItem.titleLine2}
              </h2>
            </div>

            {/* Location (if available) */}
            {currentItem.locationLabel && <p className="text-lg text-muted-foreground">{currentItem.locationLabel}</p>}

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 md:gap-4">
              <Button
                size="lg"
                onClick={() => handleCTAClick(currentItem.ctas.primary)}
                className="text-base md:text-lg font-bold"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                {currentItem.ctas.primary}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleCTAClick(currentItem.ctas.secondary)}
                className="border-2 bg-transparent text-base md:text-lg font-bold"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                {currentItem.ctas.secondary}
              </Button>
            </div>

            {/* Countdown or Info banner */}
            <div className="pt-4">
              {currentItem.type === "event" && currentItem.dateISO ? (
                <Countdown targetDate={currentItem.dateISO} />
              ) : (
                <div className="inline-flex items-center gap-3 bg-card/50 border-2 border-primary/30 px-6 py-3">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <p
                    className="text-sm md:text-base font-bold text-foreground/90"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    VAGAS LIMITADAS • CERTIFICAÇÃO OFICIAL
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Carousel controls */}
      {items.length > 1 && (
        <>
          {/* Navigation arrows - hidden on mobile */}
          <div className="hidden md:flex absolute inset-y-0 left-0 right-0 items-center justify-between px-4 pointer-events-none">
            <button
              onClick={goToPrevious}
              className="pointer-events-auto bg-background/30 hover:bg-background/50 backdrop-blur-sm rounded-full p-3 transition-colors"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="pointer-events-auto bg-background/30 hover:bg-background/50 backdrop-blur-sm rounded-full p-3 transition-colors"
              aria-label="Próximo slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-primary w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Ir para slide ${index + 1}`}
                aria-current={index === currentIndex ? "true" : "false"}
              />
            ))}
          </div>
        </>
      )}
    </section>    
  )
}
