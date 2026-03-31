/**
 * Demo auth: no NextAuth, Prisma adapter, DATABASE_URL, or NextAuth secrets.
 *
 * Default: demo ON (local dev + Vercel without extra env).
 * Production: set both DEMO_MODE=false and NEXT_PUBLIC_DEMO_MODE=false (e.g. in Vercel).
 */
export function isDemoAuthMode(): boolean {
  if (process.env.DEMO_MODE === "false" || process.env.NEXT_PUBLIC_DEMO_MODE === "false") {
    return false
  }
  return true
}
