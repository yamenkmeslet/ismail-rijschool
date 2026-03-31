import Link from "next/link"
import { CircleDot } from "lucide-react"
import type { Locale } from "@/lib/i18n/config"

export default function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container flex min-h-screen items-center justify-center py-12">
        <div className="w-full max-w-md">
          <Link href={`/${params.locale}`} className="mb-8 flex items-center justify-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-brand-sm">
              <CircleDot className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              RijPro
            </span>
          </Link>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

