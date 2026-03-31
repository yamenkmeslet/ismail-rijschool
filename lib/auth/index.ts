export { isDemoAuthMode } from "./mode"
export { requireStudentAccess, type StudentAuthResult } from "./guard"
export {
  DEMO_SESSION_COOKIE,
  encodeDemoSession,
  parseDemoSessionPayload,
  getDemoUserFromCookies,
  demoSessionMaxAgeSeconds,
  type DemoSessionUser,
} from "./demo-session"
