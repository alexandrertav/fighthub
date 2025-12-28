"use client"

import { useEffect, useState } from "react"

interface CountdownProps {
  targetDate: string // ISO date string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const difference = +new Date(targetDate) - +new Date()

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (!timeLeft) return null

  const timeBlocks = [
    { value: timeLeft.days, label: "DIAS" },
    { value: timeLeft.hours, label: "HORAS" },
    { value: timeLeft.minutes, label: "MIN" },
    { value: timeLeft.seconds, label: "SEG" },
  ]

  return (
    <div className="flex items-stretch gap-2 md:gap-3">
      {timeBlocks.map((block, index) => (
        <div key={block.label} className="flex items-stretch gap-2 md:gap-3">
          {/* Card */}
          <div className="bg-card border-2 border-border px-3 py-3 md:px-4 md:py-4 min-w-[64px] md:min-w-[74px] text-center flex flex-col items-center justify-center">
            <div
              className="text-3xl md:text-4xl font-bold text-primary leading-none tabular-nums"
              style={{
                fontFamily: "var(--font-oswald)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {String(block.value).padStart(2, "0")}
            </div>

            <div
              className="mt-1 text-[10px] md:text-xs text-muted-foreground tracking-wider leading-none"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              {block.label}
            </div>
          </div>

          {/* Separator (desktop only) */}
          {index < timeBlocks.length - 1 && (
            <div
              className="hidden md:flex items-center justify-center text-2xl font-bold text-muted-foreground"
              aria-hidden="true"
            >
              :
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
