import { NextRequest, NextResponse } from "next/server"
import { isDemoAuthMode } from "@/lib/auth/mode"
import { getDemoCategories, parseCategoriesLanguage } from "@/lib/demo/demo-categories"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: NextRequest) {
  try {
    const language = parseCategoriesLanguage(request.nextUrl.searchParams.get("language"))

    if (isDemoAuthMode()) {
      return NextResponse.json({ categories: getDemoCategories(language) })
    }

    const { Language } = await import("@prisma/client")
    const { getCategories } = await import("@/services/questions")
    const langEnum = language === "EN" ? Language.EN : language === "AR" ? Language.AR : Language.NL
    const categories = await getCategories(langEnum)
    return NextResponse.json({ categories })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}
