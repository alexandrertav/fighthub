import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: 1 | 2 | 3 | 4 | 5
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  className?: string
}

export function StarRating({ rating, size = "md", showLabel = false, className }: StarRatingProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            sizeClasses[size],
            star <= rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground",
          )}
        />
      ))}
      {showLabel && <span className="text-sm text-muted-foreground ml-1">{rating} de 5</span>}
    </div>
  )
}
