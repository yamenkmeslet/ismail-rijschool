"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import type { Locale } from "@/lib/i18n/config"
import { getMessages } from "@/lib/i18n/messages"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

export default function LocalizedLoginPage({ params }: { params: { locale: Locale } }) {
  const router = useRouter()
  const m = getMessages(params.locale)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 300))
    router.push(`/${params.locale}/dashboard`)
    router.refresh()
  }

  async function handleGoogleLogin() {
    setIsGoogleLoading(true)
    await new Promise((r) => setTimeout(r, 300))
    router.push(`/${params.locale}/dashboard`)
    router.refresh()
  }

  return (
    <div className="space-y-6" dir={params.locale === "ar" ? "rtl" : "ltr"}>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">{m.auth.loginTitle}</h1>
        <p className="text-sm text-gray-500">{m.auth.loginSubtitle}</p>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full h-11 border-gray-200 hover:bg-gray-50 font-medium"
        onClick={handleGoogleLogin}
        disabled={isGoogleLoading}
      >
        {isGoogleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {m.auth.loginAlt}
      </Button>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-gray-400 font-medium">{m.auth.loginOr}</span>
        <Separator className="flex-1" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            {m.auth.loginEmail}
          </Label>
          <Input id="email" type="email" placeholder="name@example.com" className="h-11" />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              {m.auth.loginPassword}
            </Label>
            <Link href={`/${params.locale}/forgot-password`} className="text-xs text-blue-600 hover:text-blue-700 font-medium">
              {m.auth.loginForgot}
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="h-11 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="rememberMe" checked={rememberMe} onCheckedChange={(c) => setRememberMe(!!c)} />
          <Label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer font-normal">
            {m.auth.loginRemember}
          </Label>
        </div>

        <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {m.auth.loginAltLoading}
            </>
          ) : (
            m.auth.loginSubmit
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500">
        {m.auth.loginNoAccount}{" "}
        <Link href={`/${params.locale}/register`} className="text-blue-600 hover:text-blue-700 font-semibold">
          {m.auth.loginCreate}
        </Link>
      </p>
    </div>
  )
}

