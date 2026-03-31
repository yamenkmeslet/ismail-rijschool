import type { DemoApiLanguage } from "@/lib/demo/demo-categories"

export function parseQuestionLanguage(param: string | null): DemoApiLanguage {
  const u = (param ?? "NL").toUpperCase()
  if (u === "EN" || u === "AR") return u
  return "NL"
}

/** Paginated list — empty list is enough for demo UI that does not call this API yet. */
export function getDemoQuestionsList(searchParams: URLSearchParams) {
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1)
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10) || 20))
  return {
    questions: [] as unknown[],
    total: 0,
    page,
    limit,
    totalPages: 0,
  }
}

/** Single question — minimal plausible shape for API consumers. */
export function getDemoQuestionById(id: string, language: DemoApiLanguage) {
  const qText =
    language === "AR"
      ? "سؤال تجريبي — وضع العرض"
      : language === "EN"
        ? "Demo question — preview mode"
        : "Demovraag — voorbeeldmodus"
  const expl =
    language === "AR"
      ? "هذا سؤال ثابت للعرض التوضيحي فقط."
      : language === "EN"
        ? "This is a static demo-only question."
        : "Dit is een statische demovraag."

  return {
    id,
    type: "MCQ",
    categoryId: "demo-cat-voorrang",
    difficulty: "MEDIUM",
    status: "PUBLISHED",
    mediaUrl: null,
    videoUrl: null,
    tags: [],
    translations: [
      {
        language,
        questionText: qText,
        explanation: expl,
      },
    ],
    answerOptions: [
      {
        id: "opt-a",
        optionKey: "A",
        isCorrect: true,
        translations: [{ language, text: language === "AR" ? "صحيح" : language === "EN" ? "Correct" : "Juist" }],
      },
      {
        id: "opt-b",
        optionKey: "B",
        isCorrect: false,
        translations: [{ language, text: language === "AR" ? "خطأ" : language === "EN" ? "Wrong" : "Fout" }],
      },
    ],
    category: {
      id: "demo-cat-voorrang",
      slug: "voorrang",
      translations: [{ language, title: "Voorrang", description: "Demo" }],
    },
  }
}
