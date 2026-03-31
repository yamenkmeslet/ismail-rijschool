"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Dumbbell,
  Grid3x3,
  ClipboardCheck,
  XCircle,
  Bookmark,
  BarChart3,
  Settings,
  Car,
  X,
  Zap,
  Crown,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getLocaleFromPathname, withLocalePath } from "@/lib/i18n/path"
import { getMessages } from "@/lib/i18n/messages"

const navItems = [
  { href: "/dashboard", key: "dashboard", icon: LayoutDashboard },
  { href: "/practice", key: "practice", icon: Dumbbell },
  { href: "/categories", key: "categories", icon: Grid3x3 },
  { href: "/exam", key: "exam", icon: ClipboardCheck },
  { href: "/wrong-answers", key: "wrongAnswers", icon: XCircle },
  { href: "/saved", key: "saved", icon: Bookmark },
  { href: "/progress", key: "progress", icon: BarChart3 },
  { href: "/settings", key: "settings", icon: Settings },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
  className?: string
}

export default function Sidebar({ isOpen = true, onClose, className }: SidebarProps) {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const m = getMessages(locale)
  const isLocalized = pathname ? /^\/(nl|en|ar)(\/|$)/.test(pathname) : false

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && onClose && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 bg-white border-r border-gray-100 flex flex-col",
          "transform transition-transform duration-200 ease-in-out",
          "lg:relative lg:translate-x-0 lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-gray-100 flex-shrink-0">
          <Link
            href={isLocalized ? withLocalePath(locale, "/dashboard") : "/dashboard"}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <Car className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-sm">RijPro</span>
          </Link>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {navItems.map(({ href, key, icon: Icon }) => {
            const targetHref = isLocalized ? withLocalePath(locale, href) : href
            const isActive = pathname === targetHref || pathname.startsWith(targetHref + "/")
            const label = (m.student as any)[key] as string
            return (
              <Link
                key={href}
                href={targetHref}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 flex-shrink-0 transition-colors",
                    isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                  )}
                />
                {label}
                {isActive && (
                  <ChevronRight className="ml-auto h-3 w-3 text-blue-400" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Upgrade section */}
        <div className="px-3 py-3 border-t border-gray-100">
          <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-3.5 space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600">
                <Zap className="h-3.5 w-3.5 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">{m.student.upgradeTitle}</p>
                <p className="text-xs text-gray-500">{m.student.upgradeSub}</p>
              </div>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: "35%" }} />
            </div>
            <Button
              size="sm"
              className="w-full h-8 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold gap-1.5"
            >
              <Crown className="h-3 w-3" />
              {m.student.upgradeBtn}
            </Button>
          </div>
        </div>

        {/* User profile */}
        <div className="px-3 pb-4">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src="/avatar-placeholder.png" alt="User" />
              <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-semibold">
                JV
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">Jan de Vries</p>
              <p className="text-xs text-gray-500 truncate">jan@voorbeeld.nl</p>
            </div>
            <Badge variant="outline" className="text-xs px-1.5 py-0.5 border-orange-200 text-orange-600 bg-orange-50 flex-shrink-0">
              {m.student.freePlan}
            </Badge>
          </div>
        </div>
      </aside>
    </>
  )
}
