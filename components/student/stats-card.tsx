import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  icon: LucideIcon
  iconColor?: string
  iconBg?: string
  title: string
  value: string | number
  description?: string
  trend?: number // positive = up, negative = down, 0 = flat
  trendLabel?: string
  className?: string
}

export default function StatsCard({
  icon: Icon,
  iconColor = "text-blue-600",
  iconBg = "bg-blue-50",
  title,
  value,
  description,
  trend,
  trendLabel,
  className,
}: StatsCardProps) {
  const trendIsUp = trend !== undefined && trend > 0
  const trendIsDown = trend !== undefined && trend < 0
  const trendIsFlat = trend !== undefined && trend === 0

  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-3">
            <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", iconBg)}>
              <Icon className={cn("h-4.5 w-4.5", iconColor)} style={{ height: "18px", width: "18px" }} />
            </div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900 leading-none">{value}</p>
            {description && (
              <p className="text-xs text-gray-500">{description}</p>
            )}
          </div>
        </div>
      </div>

      {trend !== undefined && (
        <div className="mt-3 pt-3 border-t border-gray-50">
          <div
            className={cn(
              "flex items-center gap-1 text-xs font-medium",
              trendIsUp && "text-green-600",
              trendIsDown && "text-red-500",
              trendIsFlat && "text-gray-400"
            )}
          >
            {trendIsUp && <TrendingUp className="h-3.5 w-3.5" />}
            {trendIsDown && <TrendingDown className="h-3.5 w-3.5" />}
            {trendIsFlat && <Minus className="h-3.5 w-3.5" />}
            <span>
              {trendIsUp && "+"}
              {trend}%
            </span>
            {trendLabel && <span className="text-gray-400 font-normal">{trendLabel}</span>}
          </div>
        </div>
      )}
    </div>
  )
}
