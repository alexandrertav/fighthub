import type * as React from "react"
import { cn } from "@/lib/utils"

interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary"
}

export function Chip({ className, variant = "default", ...props }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-medium",
        variant === "default" && "bg-muted text-muted-foreground",
        variant === "primary" && "bg-primary/20 text-primary",
        variant === "secondary" && "bg-secondary text-secondary-foreground",
        className,
      )}
      {...props}
    />
  )
}
