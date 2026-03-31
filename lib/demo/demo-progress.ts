/**
 * Static progress payload for demo mode (matches shape from services/questions getUserProgress).
 */
export function getDemoProgress(_userId: string) {
  const now = new Date().toISOString()
  return {
    totalAnswered: 124,
    correctAnswers: 87,
    incorrectAnswers: 37,
    accuracy: 70,
    savedQuestions: 3,
    mockExams: [
      {
        id: "demo-mock-exam-1",
        score: 36,
        totalQuestions: 40,
        passed: true,
        startedAt: now,
        completedAt: now,
      },
    ],
    categoryStats: [
      {
        categoryId: "demo-cat-voorrang",
        category: {
          id: "demo-cat-voorrang",
          translations: [
            { language: "NL", title: "Voorrang", description: "Wie heeft voorrang" },
            { language: "EN", title: "Right of Way", description: "Who has priority" },
            { language: "AR", title: "حق الأولوية", description: "من له الأولوية" },
          ],
        },
        total: 20,
        correct: 15,
        accuracy: 75,
      },
      {
        categoryId: "demo-cat-verkeersborden",
        category: {
          id: "demo-cat-verkeersborden",
          translations: [
            { language: "NL", title: "Verkeersborden", description: "Borden herkennen" },
            { language: "EN", title: "Traffic Signs", description: "Recognize signs" },
            { language: "AR", title: "إشارات المرور", description: "التعرف على اللوحات" },
          ],
        },
        total: 18,
        correct: 12,
        accuracy: 67,
      },
    ],
    recentAttempts: [
      {
        id: "demo-attempt-1",
        questionId: "demo-q-1",
        isCorrect: true,
        attemptedAt: now,
      },
      {
        id: "demo-attempt-2",
        questionId: "demo-q-2",
        isCorrect: false,
        attemptedAt: now,
      },
    ],
  }
}

export function demoPostProgressResponse() {
  return {
    id: "demo-attempt",
    demo: true,
    message: "Not persisted in demo mode",
  }
}
