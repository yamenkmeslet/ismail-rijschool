import * as React from "react"
import { notFound } from "next/navigation"
import { getDir, isLocale, type Locale } from "@/lib/i18n/config"

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!isLocale(params.locale)) notFound()
  const locale = params.locale as Locale
  const dir = getDir(locale)

  return (
    <div lang={locale} dir={dir} className={dir === "rtl" ? "rtl" : "ltr"}>
      {children}
    </div>
  )
}

