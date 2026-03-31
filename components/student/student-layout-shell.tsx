"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
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

export type ShellUser = {
  name: string
  email: string
}

function userInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  const one = parts[0] ?? name
  return one.slice(0, 2).toUpperCase() || "?"
}

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

export function StudentLayoutShell({
  children,
  user,
}: {
  children: React.ReactNode
  user: ShellUser
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const breadcrumbs = useBreadcrumbs()
  const pathname = usePathname()
  const router = useRouter()
  const locale = getLocaleFromPathname(pathname)
  const m = getMessages(locale)
  const isLocalized = pathname ? /^\/(nl|en|ar)(\/|$)/.test(pathname) : false
  const settingsHref = isLocalized ? withLocalePath(locale, "/settings") : "/settings"
  const loginHref = isLocalized ? withLocalePath(locale, "/login") : "/login"
  const initials = userInitials(user.name)

  async function handleLogout() {
    try {
      const st = await fetch("/api/demo-auth/status", { cache: "no-store" }).then((r) => r.json())
      if (st.demo) {
        await fetch("/api/demo-auth/logout", { method: "POST" })
        router.push(loginHref)
        router.refresh()
        return
      }
    } catch {
      /* fall through */
    }
    window.location.href = `/api/auth/signout?callbackUrl=${encodeURIComponent(
      typeof window !== "undefined" ? `${window.location.origin}${loginHref}` : loginHref
    )}`
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50" dir={locale === "ar" ? "rtl" : "ltr"}>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        className="lg:flex lg:flex-shrink-0"
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-16 flex-shrink-0 items-center gap-4 border-b border-gray-100 bg-white px-4 lg:px-6">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="text-gray-500 transition-colors hover:text-gray-700 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <nav className="flex min-w-0 flex-1 items-center gap-1 text-sm">
            <Link
              href={isLocalized ? withLocalePath(locale, "/dashboard") : "/dashboard"}
              className="hidden text-gray-400 transition-colors hover:text-gray-600 sm:block"
            >
              {m.student.home}
            </Link>
            {breadcrumbs.map(({ label, href, isLast }) => (
              <div key={href} className="flex items-center gap-1">
                <ChevronRight className="hidden h-3.5 w-3.5 text-gray-300 sm:block" />
                {isLast ? (
                  <span className="truncate font-semibold text-gray-900">{label}</span>
                ) : (
                  <Link href={href} className="truncate text-gray-500 transition-colors hover:text-gray-700">
                    {label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="relative hidden max-w-xs w-full md:flex">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder={m.student.searchQuestions}
              className="h-9 border-gray-200 bg-gray-50 pl-9 text-sm focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-9 w-9">
                  <Bell className="h-4 w-4 text-gray-500" />
                  <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  {m.student.notifications}
                  <Badge variant="secondary" className="text-xs">
                    3 {m.student.newLabel}
                  </Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {[
                  { title: "Streak bereikt! 🔥", desc: "Je hebt 7 dagen achter elkaar geoefend", time: "2 min" },
                  { title: "Nieuw oefenexamen", desc: "Jouw wekelijkse examen staat klaar", time: "1u" },
                  { title: "Resultaat verwerkt", desc: "Je laatste examen: 36/40 geslaagd!", time: "3u" },
                ].map((n) => (
                  <DropdownMenuItem key={n.title} className="flex cursor-pointer flex-col items-start gap-0.5 p-3">
                    <span className="text-sm font-medium text-gray-900">{n.title}</span>
                    <span className="text-xs text-gray-500">{n.desc}</span>
                    <span className="text-xs text-gray-400">{n.time} geleden</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-gray-50"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="/avatar-placeholder.png" />
                    <AvatarFallback className="bg-blue-100 text-xs font-semibold text-blue-700">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm font-medium text-gray-700 md:block">{user.name}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs font-normal text-gray-500">{user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={settingsHref} className="flex cursor-pointer items-center gap-2">
                    <User className="h-4 w-4" /> {m.student.settings}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={settingsHref} className="flex cursor-pointer items-center gap-2">
                    <Settings className="h-4 w-4" /> {m.student.settings}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
                  <HelpCircle className="h-4 w-4" /> Help
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex cursor-pointer items-center gap-2 text-red-600 focus:text-red-600"
                  onSelect={(e) => {
                    e.preventDefault()
                    void handleLogout()
                  }}
                >
                  <LogOut className="h-4 w-4" /> {m.student.logOut}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
