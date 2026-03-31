import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { isDemoAuthMode, getDemoUserFromCookies } from "@/lib/auth"

export async function GET() {
  const demo = isDemoAuthMode()
  if (!demo) {
    return NextResponse.json({ demo: false })
  }
  const user = getDemoUserFromCookies(await cookies())
  return NextResponse.json({ demo: true, authenticated: !!user })
}
