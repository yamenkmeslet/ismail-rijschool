import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { isDemoAuthMode } from "@/lib/auth/mode"
import { getDemoUserFromCookies, type DemoSessionUser } from "@/lib/auth/demo-session"

export type StudentAuthResult =
  | { mode: "demo"; user: DemoSessionUser }
  | {
      mode: "production"
      user: { email: string; name: string; role: string; id: string }
    }

/**
 * Server-only: require an authenticated student session or redirect to login.
 */
export async function requireStudentAccess(loginPath: string): Promise<StudentAuthResult> {
  if (isDemoAuthMode()) {
    const user = getDemoUserFromCookies(await cookies())
    if (!user) redirect(loginPath)
    return { mode: "demo", user }
  }

  const { getServerSession } = await import("next-auth")
  const { authOptions } = await import("@/lib/auth/production")
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect(loginPath)

  return {
    mode: "production",
    user: {
      id: (session.user as { id?: string }).id ?? "",
      email: session.user.email,
      name: session.user.name ?? session.user.email,
      role: (session.user as { role?: string }).role ?? "STUDENT",
    },
  }
}
