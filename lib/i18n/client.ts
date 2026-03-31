"use client"

import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n/path"
import { getMessages } from "@/lib/i18n/messages"

export function useLocale() {
  const pathname = usePathname()
  return getLocaleFromPathname(pathname)
}

export function useMessages() {
  const locale = useLocale()
  const m = getMessages(locale)
  return { locale, m }
}

