import { StudentLayoutShell } from "@/components/student/student-layout-shell"
import { requireStudentAccess } from "@/lib/auth/guard"

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const auth = await requireStudentAccess("/login")
  const user = { name: auth.user.name, email: auth.user.email }
  return <StudentLayoutShell user={user}>{children}</StudentLayoutShell>
}
