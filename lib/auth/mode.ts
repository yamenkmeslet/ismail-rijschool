/**
 * Demo auth: no NextAuth, Prisma adapter, or secrets.
 * Default: demo when DATABASE_URL is unset (e.g. Vercel without DB).
 * Override: DEMO_MODE / NEXT_PUBLIC_DEMO_MODE = "true" | "false"
 */
export function isDemoAuthMode(): boolean {
  const on =
    process.env.DEMO_MODE === "true" || process.env.NEXT_PUBLIC_DEMO_MODE === "true"
  const off =
    process.env.DEMO_MODE === "false" || process.env.NEXT_PUBLIC_DEMO_MODE === "false"
  if (on) return true
  if (off) return false
  return !process.env.DATABASE_URL
}
