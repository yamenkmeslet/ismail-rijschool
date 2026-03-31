"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
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
  const [isDemoLoading, setIsDemoLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [demoModeUi, setDemoModeUi] = useState(false)

  useEffect(() => {
    fetch("/api/demo-auth/status", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setDemoModeUi(!!d.demo))
      .catch(() => setDemoModeUi(false))
  }, [])

  async function goToDashboard() {
    router.push(`/${params.locale}/dashboard`)
    router.refresh()
  }

  async function performLogin(body: { demo?: boolean; email?: string; password?: string }) {
    setError(null)
    const res = await fetch("/api/demo-auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    if (res.ok) {
      await goToDashboard()
      return
    }

    if (res.status === 404) {
      const { signIn } = await import("next-auth/react")
      if (!body.email?.trim() || !body.password) {
        setError("Production login requires email and password.")
        return
      }
      const r = await signIn("credentials", {
        email: body.email,
        password: body.password,
        redirect: false,
      })
      if (r?.error) {
        setError(r.error)
        return
      }
      await goToDashboard()
      return
    }

    const data = await res.json().catch(() => ({}))
    setError(typeof data.error === "string" ? data.error : "Login failed")
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !password) {
      setError(m.auth.loginMissingFields)
      return
    }
    setIsLoading(true)
    try {
      await performLogin({ email: email.trim(), password })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDemoLogin() {
    setIsDemoLoading(true)
    try {
      await performLogin({ demo: true })
    } finally {
      setIsDemoLoading(false)
    }
  }

  async function handleGoogleLogin() {
    setIsGoogleLoading(true)
    try {
      await performLogin({ demo: true })
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="space-y-6" dir={params.locale === "ar" ? "rtl" : "ltr"}>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">{m.auth.loginTitle}</h1>
        <p className="text-sm text-gray-500">{m.auth.loginSubtitle}</p>
        {demoModeUi ? (
          <p className="text-xs text-gray-500 pt-1 leading-relaxed">{m.auth.loginDemoHint}</p>
        ) : null}
      </div>

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <Button
        type="button"
        variant="brand"
        className="h-11 w-full font-semibold"
        onClick={handleDemoLogin}
        disabled={isDemoLoading || isLoading}
      >
        {isDemoLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {m.auth.loginDemoButton}
      </Button>

      <Button
        type="button"
        variant="outline"
        className="h-11 w-full border-gray-200 font-medium hover:bg-gray-50"
        onClick={handleGoogleLogin}
        disabled={isGoogleLoading || isLoading || isDemoLoading}
      >
        {isGoogleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {m.auth.loginAlt}
      </Button>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs font-medium text-gray-400">{m.auth.loginOr}</span>
        <Separator className="flex-1" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            {m.auth.loginEmail}
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="h-11"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              {m.auth.loginPassword}
            </Label>
            <Link
              href={`/${params.locale}/forgot-password`}
              className="text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              {m.auth.loginForgot}
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="h-11 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="rememberMe" checked={rememberMe} onCheckedChange={(c) => setRememberMe(!!c)} />
          <Label htmlFor="rememberMe" className="cursor-pointer text-sm font-normal text-gray-600">
            {m.auth.loginRemember}
          </Label>
        </div>

        <Button
          type="submit"
          className="h-11 w-full bg-blue-600 font-semibold text-white hover:bg-blue-700"
          disabled={isLoading || isDemoLoading}
        >
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
        <Link href={`/${params.locale}/register`} className="font-semibold text-blue-600 hover:text-blue-700">
          {m.auth.loginCreate}
        </Link>
      </p>
    </div>
  )
}
