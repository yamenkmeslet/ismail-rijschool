import { StudentLayoutShell } from "@/components/student/student-layout-shell"
import { requireStudentAccess } from "@/lib/auth/guard"
import type { Locale } from "@/lib/i18n/config"

export default async function LocaleStudentLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  const auth = await requireStudentAccess(`/${params.locale}/login`)
  const user = { name: auth.user.name, email: auth.user.email }
  return <StudentLayoutShell user={user}>{children}</StudentLayoutShell>
}
