import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config"

export function getLocaleFromPathname(pathname: string | null | undefined): Locale {
  if (!pathname) return defaultLocale
  const seg = pathname.split("/").filter(Boolean)[0]
  if (seg && isLocale(seg)) return seg
  return defaultLocale
}

export function withLocalePath(locale: Locale, href: string) {
  if (!href.startsWith("/")) return `/${locale}/${href}`
  return `/${locale}${href}`
}

