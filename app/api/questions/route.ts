import { NextRequest, NextResponse } from "next/server"
import { isDemoAuthMode } from "@/lib/auth/mode"
import { getDemoQuestionsList } from "@/lib/demo/demo-questions-api"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: NextRequest) {
  try {
    const sp = request.nextUrl.searchParams

    if (isDemoAuthMode()) {
      return NextResponse.json(getDemoQuestionsList(sp))
    }

    const { Language } = await import("@prisma/client")
    const { getQuestions } = await import("@/services/questions")
    type QOpts = NonNullable<Parameters<typeof getQuestions>[0]>

    const categoryId = sp.get("categoryId") || undefined
    const difficulty = (sp.get("difficulty") as QOpts["difficulty"]) || undefined
    const type = (sp.get("type") as QOpts["type"]) || undefined
    const status = (sp.get("status") as QOpts["status"]) || undefined
    const language = (sp.get("language") as QOpts["language"]) || Language.NL
    const page = parseInt(sp.get("page") || "1", 10)
    const limit = parseInt(sp.get("limit") || "20", 10)
    const search = sp.get("search") || undefined

    const result = await getQuestions({
      categoryId,
      difficulty,
      type,
      status,
      language,
      page,
      limit,
      search,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching questions:", error)
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 })
  }
}
