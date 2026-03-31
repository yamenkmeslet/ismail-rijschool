import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface TestimonialCardProps {
  name: string
  initials: string
  flag: string
  nationality: string
  rating: number
  quote: string
  role?: string
  className?: string
}

export function TestimonialCard({
  name,
  initials,
  flag,
  nationality,
  rating,
  quote,
  role,
  className,
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover",
        className
      )}
    >
      {/* Stars */}
      <div className="mb-4 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < rating
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200"
            )}
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="mb-6 flex-1 text-sm leading-relaxed text-slate-600">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-brand-sm">
          {initials}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-slate-900">{name}</span>
            <span className="text-base leading-none" role="img" aria-label={nationality}>
              {flag}
            </span>
          </div>
          {role && (
            <p className="text-xs text-slate-400">{role}</p>
          )}
        </div>
      </div>
    </div>
  )
}
