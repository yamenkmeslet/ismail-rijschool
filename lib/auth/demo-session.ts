export const DEMO_SESSION_COOKIE = "rijpro_demo_session"

export type DemoSessionUser = {
  email: string
  name: string
  role: string
}

type Payload = DemoSessionUser & { exp: number }

const MAX_AGE_SEC = 60 * 60 * 24 * 7

export function demoSessionMaxAgeSeconds(): number {
  return MAX_AGE_SEC
}

export function encodeDemoSession(user: DemoSessionUser): string {
  const payload: Payload = {
    ...user,
    exp: Date.now() + MAX_AGE_SEC * 1000,
  }
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url")
}

export function parseDemoSessionPayload(raw: string | undefined): DemoSessionUser | null {
  if (!raw) return null
  try {
    const decoded = Buffer.from(raw, "base64url").toString("utf8")
    const data = JSON.parse(decoded) as Partial<Payload>
    if (!data.email || typeof data.email !== "string") return null
    if (data.exp != null && data.exp < Date.now()) return null
    return {
      email: data.email,
      name: typeof data.name === "string" ? data.name : data.email.split("@")[0] || "Student",
      role: typeof data.role === "string" ? data.role : "STUDENT",
    }
  } catch {
    return null
  }
}

export function getDemoUserFromCookies(cookieStore: {
  get: (name: string) => { value: string } | undefined
}): DemoSessionUser | null {
  const raw = cookieStore.get(DEMO_SESSION_COOKIE)?.value
  return parseDemoSessionPayload(raw)
}
