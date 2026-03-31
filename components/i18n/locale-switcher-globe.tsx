"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Globe2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { locales, localeMeta, type Locale, isLocale } from "@/lib/i18n/config"

function replaceLocaleInPath(pathname: string, nextLocale: Locale) {
  const parts = pathname.split("/")
  const maybeLocale = parts[1]
  if (maybeLocale && isLocale(maybeLocale)) {
    parts[1] = nextLocale
    return parts.join("/") || `/${nextLocale}`
  }
  return `/${nextLocale}${pathname.startsWith("/") ? "" : "/"}${pathname}`
}

export function LocaleSwitcherGlobe({
  locale,
  label,
  className,
  variant = "ghost",
}: {
  locale: Locale
  label: string
  className?: string
  variant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const pathname = usePathname()
  const router = useRouter()
  const current = localeMeta[locale]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant={variant}
          size="sm"
          className={cn(
            "gap-2 rounded-full border border-white/10 bg-white/60 text-slate-700 shadow-sm backdrop-blur-md hover:bg-white/80",
            className
          )}
          aria-label={label}
        >
          <motion.span
            className="inline-flex items-center"
            initial={false}
            whileHover={{ rotate: 18, scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            <Globe2 className="h-4 w-4 text-blue-700" />
          </motion.span>
          <span className="text-xs font-semibold">
            {current.flag} {locale.toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs text-slate-500">{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {locales.map((l) => {
          const meta = localeMeta[l]
          const active = l === locale
          return (
            <DropdownMenuItem
              key={l}
              onClick={() => {
                const nextPath = replaceLocaleInPath(pathname, l)
                router.push(nextPath)
                router.refresh()
              }}
              className={cn("flex items-center gap-2", active && "font-semibold")}
            >
              <span className="text-base">{meta.flag}</span>
              <div className="flex-1">
                <div className="text-sm">{meta.nativeLabel}</div>
                <div className="text-xs text-slate-500">{meta.label}</div>
              </div>
              {active ? <Check className="h-4 w-4 text-blue-600" /> : null}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

