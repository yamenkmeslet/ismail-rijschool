import { Check, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PricingFeature {
  text: string
  included: boolean
}

interface PricingCardProps {
  name: string
  price: number
  annualPrice?: number
  period?: string
  description: string
  features: PricingFeature[]
  ctaLabel: string
  ctaHref?: string
  popular?: boolean
  badge?: string
  annual?: boolean
  className?: string
}

export function PricingCard({
  name,
  price,
  annualPrice,
  period = "maand",
  description,
  features,
  ctaLabel,
  ctaHref = "/register",
  popular = false,
  badge,
  annual = false,
  className,
}: PricingCardProps) {
  const displayPrice = annual && annualPrice ? annualPrice : price

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border p-8 transition-all duration-300",
        popular
          ? "border-blue-500 bg-gradient-to-b from-blue-600 to-indigo-700 text-white shadow-glow-lg scale-105"
          : "border-slate-200/80 bg-white/75 backdrop-blur-md hover:border-blue-200/80 hover:bg-white/90 hover:shadow-card-hover",
        className
      )}
    >
      {(popular || badge) && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold shadow-md",
              popular
                ? "bg-orange-400 text-white"
                : "bg-blue-600 text-white"
            )}
          >
            {badge ?? "Meest populair"}
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3
          className={cn(
            "text-xl font-bold",
            popular ? "text-white" : "text-slate-900"
          )}
        >
          {name}
        </h3>
        <p
          className={cn(
            "mt-1 text-sm",
            popular ? "text-blue-200" : "text-slate-500"
          )}
        >
          {description}
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-end gap-1">
          <span
            className={cn(
              "text-4xl font-extrabold tracking-tight",
              popular ? "text-white" : "text-slate-900"
            )}
          >
            €{displayPrice.toFixed(2).replace(".", ",")}
          </span>
          <span
            className={cn(
              "mb-1.5 text-sm",
              popular ? "text-blue-200" : "text-slate-500"
            )}
          >
            /{period}
          </span>
        </div>
        {annual && annualPrice && (
          <p
            className={cn(
              "mt-1 text-xs",
              popular ? "text-blue-200" : "text-slate-400"
            )}
          >
            Jaarlijks gefactureerd — bespaar{" "}
            {Math.round((1 - annualPrice / price) * 100)}%
          </p>
        )}
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <span
              className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                feature.included
                  ? popular
                    ? "bg-white/20 text-white"
                    : "bg-blue-50 text-blue-600"
                  : popular
                  ? "bg-white/10 text-blue-300"
                  : "bg-slate-50 text-slate-300"
              )}
            >
              {feature.included ? (
                <Check className="h-3 w-3" />
              ) : (
                <Minus className="h-3 w-3" />
              )}
            </span>
            <span
              className={cn(
                "text-sm",
                feature.included
                  ? popular
                    ? "text-white"
                    : "text-slate-700"
                  : popular
                  ? "text-blue-300 line-through"
                  : "text-slate-400 line-through"
              )}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      <Button
        asChild
        size="lg"
        variant={popular ? "outline" : "brand"}
        className={cn(
          "w-full font-semibold",
          popular &&
            "border-0 bg-white/95 text-blue-700 shadow-sm backdrop-blur-sm hover:bg-white hover:text-blue-800"
        )}
      >
        <a href={ctaHref}>{ctaLabel}</a>
      </Button>
    </div>
  )
}
