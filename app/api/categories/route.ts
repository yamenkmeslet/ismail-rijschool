import { NextRequest, NextResponse } from "next/server"
import { isDemoAuthMode } from "@/lib/auth/mode"
import { getDemoCategories, parseCategoriesLanguage } from "@/lib/demo/demo-categories"

/** Never statically analyze this route as fully static — avoids build-time request.url / DB issues. */
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const language = parseCategoriesLanguage(searchParams.get("language"))

    if (isDemoAuthMode()) {
      const categories = getDemoCategories(language)
      return NextResponse.json(categories)
    }

    const { Language } = await import("@prisma/client")
    const langEnum = language === "EN" ? Language.EN : language === "AR" ? Language.AR : Language.NL

    const { getCategories } = await import("@/services/questions")
    const categories = await getCategories(langEnum)
    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}
