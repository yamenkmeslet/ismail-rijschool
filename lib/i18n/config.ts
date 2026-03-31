export const locales = ["nl", "en", "ar"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "nl"

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export function getDir(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr"
}

export const localeMeta: Record<Locale, { label: string; nativeLabel: string; flag: string }> = {
  nl: { label: "Dutch", nativeLabel: "Nederlands", flag: "🇳🇱" },
  en: { label: "English", nativeLabel: "English", flag: "🇬🇧" },
  ar: { label: "Arabic", nativeLabel: "العربية", flag: "🇸🇦" },
}

