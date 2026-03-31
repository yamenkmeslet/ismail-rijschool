"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { getMessages } from "@/lib/i18n/messages"
import type { Locale } from "@/lib/i18n/config"

const loginSchema = z.object({
  email: z.string().min(1, "Email required"),
  password: z.string().min(1, "Password required"),
  rememberMe: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>

function localeFromPath(pathname: string | null): Locale {
  const m = pathname?.match(/^\/(nl|en|ar)(\/|$)/)
  return (m?.[1] as Locale) ?? "nl"
}

export default function LoginPage() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = localeFromPath(pathname ?? null)
  const m = getMessages(locale)

  const dashboardHref = (() => {
    const mloc = pathname?.match(/^\/(nl|en|ar)(\/|$)/)
    return mloc?.[1] ? `/${mloc[1]}/dashboard` : "/dashboard"
  })()
  const registerHref = (() => {
    const mloc = pathname?.match(/^\/(nl|en|ar)(\/|$)/)
    return mloc?.[1] ? `/${mloc[1]}/register` : "/register"
  })()

  const [showPassword, setShowPassword] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isDemoLoading, setIsDemoLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [demoModeUi, setDemoModeUi] = useState(false)

  useEffect(() => {
    fetch("/api/demo-auth/status", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setDemoModeUi(!!d.demo))
      .catch(() => setDemoModeUi(false))
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  })

  const rememberMe = watch("rememberMe")

  async function goToDashboard() {
    router.push(dashboardHref)
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

  async function onSubmit(data: LoginFormData) {
    await performLogin({ email: data.email, password: data.password })
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
    <div className="space-y-6" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">{m.auth.loginTitle}</h1>
        <p className="text-sm text-gray-500">{m.auth.loginSubtitle}</p>
        {demoModeUi ? <p className="pt-1 text-xs leading-relaxed text-gray-500">{m.auth.loginDemoHint}</p> : null}
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
        disabled={isDemoLoading || isSubmitting}
      >
        {isDemoLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {m.auth.loginDemoButton}
      </Button>

      <Button
        type="button"
        variant="outline"
        className="h-11 w-full border-gray-200 font-medium hover:bg-gray-50"
        onClick={handleGoogleLogin}
        disabled={isGoogleLoading || isSubmitting || isDemoLoading}
      >
        {isGoogleLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        )}
        {m.auth.loginAlt}
      </Button>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs font-medium text-gray-400">{m.auth.loginOr}</span>
        <Separator className="flex-1" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            {m.auth.loginEmail}
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="naam@voorbeeld.nl"
            className={`h-11 ${errors.email ? "border-red-400" : ""}`}
            autoComplete="email"
            {...register("email")}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              {m.auth.loginPassword}
            </Label>
            <Link href="/forgot-password" className="text-xs font-medium text-blue-600 hover:text-blue-700">
              {m.auth.loginForgot}
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`h-11 pr-10 ${errors.password ? "border-red-400" : ""}`}
              autoComplete="current-password"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="rememberMe"
            checked={rememberMe}
            onCheckedChange={(checked) => setValue("rememberMe", !!checked)}
          />
          <Label htmlFor="rememberMe" className="cursor-pointer text-sm font-normal text-gray-600">
            {m.auth.loginRemember}
          </Label>
        </div>

        <Button
          type="submit"
          className="h-11 w-full bg-blue-600 font-semibold text-white hover:bg-blue-700"
          disabled={isSubmitting || isDemoLoading}
        >
          {isSubmitting ? (
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
        <Link href={registerHref} className="font-semibold text-blue-600 hover:text-blue-700">
          {m.auth.loginCreate}
        </Link>
      </p>
    </div>
  )
}
