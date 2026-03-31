import { NextResponse } from "next/server"
import { isDemoAuthMode, DEMO_SESSION_COOKIE } from "@/lib/auth"

export async function POST() {
  if (!isDemoAuthMode()) {
    return NextResponse.json({ error: "Not in demo mode" }, { status: 404 })
  }
  const res = NextResponse.json({ ok: true })
  res.cookies.set(DEMO_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  })
  return res
}
