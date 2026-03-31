import { cn } from "@/lib/utils"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
  highlighted?: boolean
}

export function FeatureCard({
  icon,
  title,
  description,
  className,
  highlighted = false,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-2xl border p-6 backdrop-blur-md transition-all duration-300",
        highlighted
          ? "border-blue-200/80 bg-gradient-to-br from-blue-50/95 to-indigo-50/90 shadow-brand ring-1 ring-blue-100/50"
          : "border-white/50 bg-white/65 ring-1 ring-slate-200/40 hover:border-blue-200/70 hover:bg-white/85 hover:shadow-card-hover hover:ring-blue-100/60",
        "hover:-translate-y-1",
        className
      )}
    >
      {highlighted && (
        <div className="absolute -top-3 left-6">
          <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
            Populair
          </span>
        </div>
      )}
      <div
        className={cn(
          "mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300",
          highlighted
            ? "bg-blue-600 text-white"
            : "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
        )}
      >
        {icon}
      </div>
      <h3
        className={cn(
          "mb-2 text-lg font-semibold",
          highlighted ? "text-blue-900" : "text-slate-900"
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "text-sm leading-relaxed",
          highlighted ? "text-blue-700" : "text-slate-500"
        )}
      >
        {description}
      </p>
    </div>
  )
}
