"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Menu,
  Bell,
  Search,
  ChevronRight,
  Settings,
  LogOut,
  User,
  HelpCircle,
} from "lucide-react"
import Sidebar from "@/components/student/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { getLocaleFromPathname, withLocalePath } from "@/lib/i18n/path"
import { isLocale } from "@/lib/i18n/config"
import { getMessages } from "@/lib/i18n/messages"

function useBreadcrumbs() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const m = getMessages(locale)
  const segments = pathname.split("/").filter(Boolean)
  const filtered = segments[0] && isLocale(segments[0]) ? segments.slice(1) : segments
  const base = segments[0] && isLocale(segments[0]) ? `/${segments[0]}` : ""
  return filtered.map((seg, i) => ({
    label:
      seg === "dashboard"
        ? m.student.dashboard
        : seg === "practice"
          ? m.student.practice
          : seg === "categories"
            ? m.student.categories
            : seg === "exam"
              ? m.student.exam
              : seg === "wrong-answers"
                ? m.student.wrongAnswers
                : seg === "saved"
                  ? m.student.saved
                  : seg === "progress"
                    ? m.student.progress
                    : seg === "settings"
                      ? m.student.settings
                      : seg,
    href: base + "/" + filtered.slice(0, i + 1).join("/"),
    isLast: i === filtered.length - 1,
  }))
}

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const breadcrumbs = useBreadcrumbs()
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const m = getMessages(locale)
  const isLocalized = pathname ? /^\/(nl|en|ar)(\/|$)/.test(pathname) : false

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden" dir={locale === "ar" ? "rtl" : "ltr"}>
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        className="lg:flex lg:flex-shrink-0"
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top header */}
        <header className="flex items-center gap-4 h-16 px-4 lg:px-6 bg-white border-b border-gray-100 flex-shrink-0">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-sm flex-1 min-w-0">
            <Link
              href={isLocalized ? withLocalePath(locale, "/dashboard") : "/dashboard"}
              className="text-gray-400 hover:text-gray-600 transition-colors hidden sm:block"
            >
              Thuis
            </Link>
            {breadcrumbs.map(({ label, href, isLast }) => (
              <div key={href} className="flex items-center gap-1">
                <ChevronRight className="h-3.5 w-3.5 text-gray-300 hidden sm:block" />
                {isLast ? (
                  <span className="font-semibold text-gray-900 truncate">{label}</span>
                ) : (
                  <Link href={href} className="text-gray-500 hover:text-gray-700 transition-colors truncate">
                    {label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Search bar */}
          <div className="hidden md:flex relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={m.student.searchQuestions}
              className="pl-9 h-9 text-sm bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-9 w-9">
                  <Bell className="h-4 w-4 text-gray-500" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-blue-600 rounded-full" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  {m.student.notifications}
                  <Badge variant="secondary" className="text-xs">3 {m.student.newLabel}</Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {[
                  { title: "Streak bereikt! 🔥", desc: "Je hebt 7 dagen achter elkaar geoefend", time: "2 min" },
                  { title: "Nieuw oefenexamen", desc: "Jouw wekelijkse examen staat klaar", time: "1u" },
                  { title: "Resultaat verwerkt", desc: "Je laatste examen: 36/40 geslaagd!", time: "3u" },
                ].map((n) => (
                  <DropdownMenuItem key={n.title} className="flex flex-col items-start gap-0.5 p-3 cursor-pointer">
                    <span className="text-sm font-medium text-gray-900">{n.title}</span>
                    <span className="text-xs text-gray-500">{n.desc}</span>
                    <span className="text-xs text-gray-400">{n.time} geleden</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-lg hover:bg-gray-50 p-1 transition-colors">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="/avatar-placeholder.png" />
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-semibold">JV</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block text-sm font-medium text-gray-700">Jan</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>
                  <p className="font-semibold">Jan de Vries</p>
                  <p className="text-xs text-gray-500 font-normal">jan@voorbeeld.nl</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4" /> Mijn profiel
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="h-4 w-4" /> Instellingen
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                  <HelpCircle className="h-4 w-4" /> Help & Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600">
                  <LogOut className="h-4 w-4" /> Uitloggen
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
