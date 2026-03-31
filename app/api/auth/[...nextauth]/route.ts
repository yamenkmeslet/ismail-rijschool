import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { isDemoAuthMode } from "@/lib/auth/mode"

async function realAuthHandler() {
  const NextAuth = (await import("next-auth")).default
  const { authOptions } = await import("@/lib/auth/production")
  return NextAuth(authOptions)
}

export async function GET(request: NextRequest, context: { params: { nextauth: string[] } }) {
  if (isDemoAuthMode()) {
    return NextResponse.json(
      { error: "NextAuth is disabled in demo mode. Use the login page to start a demo session." },
      { status: 404 }
    )
  }
  const handler = await realAuthHandler()
  return handler(request, context)
}

export async function POST(request: NextRequest, context: { params: { nextauth: string[] } }) {
  return GET(request, context)
}
