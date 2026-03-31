import { NextResponse } from "next/server"
import {
  isDemoAuthMode,
  encodeDemoSession,
  demoSessionMaxAgeSeconds,
  DEMO_SESSION_COOKIE,
} from "@/lib/auth"

const DEMO_EMAIL = "demo@rijpro.app"
const DEMO_NAME = "Demo Student"

export async function POST(request: Request) {
  if (!isDemoAuthMode()) {
    return NextResponse.json({ error: "Demo auth disabled" }, { status: 404 })
  }

  let body: { demo?: boolean; email?: string; password?: string } = {}
  try {
    body = await request.json()
  } catch {
    /* empty body ok for probe */
  }

  const usePreset = body.demo === true

  const emailRaw = typeof body.email === "string" ? body.email.trim() : ""
  const passwordRaw = typeof body.password === "string" ? body.password : ""

  if (!usePreset && (!emailRaw || !passwordRaw)) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 })
  }

  const user = usePreset
    ? { email: DEMO_EMAIL, name: DEMO_NAME, role: "STUDENT" }
    : {
        email: emailRaw,
        name: emailRaw.split("@")[0] || "Student",
        role: "STUDENT",
      }

  const token = encodeDemoSession(user)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(DEMO_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: demoSessionMaxAgeSeconds(),
  })
  return res
}
