import Link from "next/link"
import { LucideIcon, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface CategoryCardProps {
  slug: string
  icon: LucideIcon
  iconColor?: string
  iconBg?: string
  title: string
  description?: string
  questionCount: number
  answeredCount: number
  accuracy?: number
  difficulty?: "Makkelijk" | "Gemiddeld" | "Moeilijk"
  className?: string
}

const difficultyColors = {
  Makkelijk: "border-green-200 text-green-700 bg-green-50",
  Gemiddeld: "border-orange-200 text-orange-700 bg-orange-50",
  Moeilijk: "border-red-200 text-red-700 bg-red-50",
}

export default function CategoryCard({
  slug,
  icon: Icon,
  iconColor = "text-blue-600",
  iconBg = "bg-blue-50",
  title,
  description,
  questionCount,
  answeredCount,
  accuracy,
  difficulty,
  className,
}: CategoryCardProps) {
  const progress = Math.round((answeredCount / questionCount) * 100)

  return (
    <Link
      href={`/practice/${slug}`}
      className={cn(
        "group bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 flex flex-col gap-4",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0", iconBg)}>
            <Icon className={cn("h-5 w-5", iconColor)} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition-colors">
              {title}
            </h3>
            {description && (
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{description}</p>
            )}
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-0.5" />
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">
            {answeredCount} / {questionCount} vragen
          </span>
          <span className="font-semibold text-gray-700">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {accuracy !== undefined ? (
          <div className="text-xs text-gray-500">
            Nauwkeurigheid:{" "}
            <span
              className={cn(
                "font-semibold",
                accuracy >= 80 ? "text-green-600" : accuracy >= 60 ? "text-orange-500" : "text-red-500"
              )}
            >
              {accuracy}%
            </span>
          </div>
        ) : (
          <div className="text-xs text-gray-400">Nog niet begonnen</div>
        )}
        {difficulty && (
          <Badge variant="outline" className={cn("text-xs px-2 py-0.5", difficultyColors[difficulty])}>
            {difficulty}
          </Badge>
        )}
      </div>
    </Link>
  )
}
