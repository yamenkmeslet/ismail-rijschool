import {
  PrismaClient,
  UserRole,
  QuestionType,
  Difficulty,
  QuestionStatus,
  SubscriptionPlan,
  SubscriptionStatus,
  Language,
  ContentBlockType,
  OptionKey,
} from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Clean existing data
  await prisma.mockExamQuestion.deleteMany()
  await prisma.mockExam.deleteMany()
  await prisma.savedQuestion.deleteMany()
  await prisma.userQuestionAttempt.deleteMany()
  await prisma.subscription.deleteMany()
  await prisma.answerOptionTranslation.deleteMany()
  await prisma.answerOption.deleteMany()
  await prisma.questionTranslation.deleteMany()
  await prisma.question.deleteMany()
  await prisma.categoryTranslation.deleteMany()
  await prisma.category.deleteMany()
  await prisma.contentBlockTranslation.deleteMany()
  await prisma.contentBlock.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.user.deleteMany()

  console.log('✅ Cleaned existing data')

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@rijpro.nl',
      name: 'Admin User',
      role: UserRole.ADMIN,
      preferredLanguage: Language.NL,
      avatarUrl: null,
    },
  })

  // Create student users
  const studentUsers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'ahmed@example.com',
        name: 'Ahmed Mohammed',
        role: UserRole.STUDENT,
        preferredLanguage: Language.AR,
      },
    }),
    prisma.user.create({
      data: {
        email: 'sara@example.com',
        name: 'Sara van den Berg',
        role: UserRole.STUDENT,
        preferredLanguage: Language.NL,
      },
    }),
    prisma.user.create({
      data: {
        email: 'karim@example.com',
        name: 'Karim Bouali',
        role: UserRole.STUDENT,
        preferredLanguage: Language.EN,
      },
    }),
    prisma.user.create({
      data: {
        email: 'fatima@example.com',
        name: 'Fatima Al-Hassan',
        role: UserRole.STUDENT,
        preferredLanguage: Language.AR,
      },
    }),
    prisma.user.create({
      data: {
        email: 'jan@example.com',
        name: 'Jan de Vries',
        role: UserRole.STUDENT,
        preferredLanguage: Language.NL,
      },
    }),
  ])

  console.log('✅ Created users')

  // Create subscriptions
  await Promise.all([
    prisma.subscription.create({
      data: {
        userId: studentUsers[0].id,
        plan: SubscriptionPlan.PREMIUM,
        status: SubscriptionStatus.ACTIVE,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2025-01-01'),
      },
    }),
    prisma.subscription.create({
      data: {
        userId: studentUsers[1].id,
        plan: SubscriptionPlan.STANDARD,
        status: SubscriptionStatus.ACTIVE,
        startDate: new Date('2024-02-01'),
        endDate: new Date('2025-02-01'),
      },
    }),
    prisma.subscription.create({
      data: {
        userId: studentUsers[2].id,
        plan: SubscriptionPlan.BASIC,
        status: SubscriptionStatus.ACTIVE,
        startDate: new Date('2024-03-01'),
        endDate: new Date('2025-03-01'),
      },
    }),
  ])

  console.log('✅ Created subscriptions')

  // Create categories
  const categoryData = [
    {
      slug: 'verkeersregels',
      translations: [
        { language: Language.NL, title: "Verkeersregels", description: "Basisregels voor deelname aan het verkeer" },
        { language: Language.EN, title: "Traffic Rules", description: "Basic rules for participating in traffic" },
        { language: Language.AR, title: "قواعد المرور", description: "القواعد الأساسية للمشاركة في حركة المرور" },
      ],
    },
    {
      slug: 'voorrang',
      translations: [
        { language: Language.NL, title: 'Voorrang', description: 'Wie heeft voorrang in welke situatie' },
        { language: Language.EN, title: 'Right of Way', description: 'Who has right of way in which situation' },
        { language: Language.AR, title: 'حق الأولوية', description: 'من له حق الأولوية في أي موقف' },
      ],
    },
    {
      slug: 'verkeersborden',
      translations: [
        { language: Language.NL, title: 'Verkeersborden', description: 'Herkennen en begrijpen van verkeersborden' },
        { language: Language.EN, title: 'Traffic Signs', description: 'Recognizing and understanding traffic signs' },
        { language: Language.AR, title: 'إشارات المرور', description: 'التعرف على إشارات المرور وفهمها' },
      ],
    },
    {
      slug: 'gevaarherkenning',
      translations: [
        { language: Language.NL, title: 'Gevaarherkenning', description: 'Gevaarlijke situaties tijdig herkennen' },
        { language: Language.EN, title: 'Hazard Perception', description: 'Recognizing dangerous situations in time' },
        { language: Language.AR, title: 'إدراك المخاطر', description: 'التعرف على المواقف الخطرة في الوقت المناسب' },
      ],
    },
    {
      slug: 'parkeren',
      translations: [
        { language: Language.NL, title: 'Parkeren', description: 'Parkeersituaties en parkeerborden' },
        { language: Language.EN, title: 'Parking', description: 'Parking situations and parking signs' },
        { language: Language.AR, title: 'ركن السيارات', description: 'مواقف وإشارات ركن السيارات' },
      ],
    },
    {
      slug: 'voertuigveiligheid',
      translations: [
        { language: Language.NL, title: 'Voertuigveiligheid', description: 'Veiligheid en techniek van het voertuig' },
        { language: Language.EN, title: 'Vehicle Safety', description: 'Vehicle safety and technology' },
        { language: Language.AR, title: 'سلامة المركبة', description: 'سلامة المركبة وتقنياتها' },
      ],
    },
    {
      slug: 'kinderen-gordels',
      translations: [
        { language: Language.NL, title: 'Kinderen & Gordels', description: 'Veiligheid van kinderen en gordelgebruik' },
        { language: Language.EN, title: 'Children & Seatbelts', description: 'Children safety and seatbelt use' },
        { language: Language.AR, title: 'الأطفال وأحزمة الأمان', description: 'سلامة الأطفال واستخدام أحزمة الأمان' },
      ],
    },
    {
      slug: 'rijpositie',
      translations: [
        { language: Language.NL, title: 'Rijpositie', description: 'Correcte positie op de weg' },
        { language: Language.EN, title: 'Road Position', description: 'Correct position on the road' },
        { language: Language.AR, title: 'موضع القيادة', description: 'الموضع الصحيح على الطريق' },
      ],
    },
  ]

  const categories = await Promise.all(
    categoryData.map(async (cat) => {
      const category = await prisma.category.create({
        data: { slug: cat.slug },
      })
      await Promise.all(
        cat.translations.map((t) =>
          prisma.categoryTranslation.create({
            data: {
              categoryId: category.id,
              language: t.language,
              title: t.title,
              description: t.description,
            },
          })
        )
      )
      return category
    })
  )

  console.log('✅ Created categories')

  // Question data
  const questionsData = [
    // Traffic Rules Questions
    {
      categorySlug: 'verkeersregels',
      type: QuestionType.MCQ,
      difficulty: Difficulty.EASY,
      status: QuestionStatus.PUBLISHED,
      translations: [
        {
          language: Language.NL,
          questionText: 'Wat is de maximumsnelheid binnen de bebouwde kom?',
          explanation: 'Binnen de bebouwde kom geldt een maximumsnelheid van 50 km/u, tenzij anders aangegeven.',
        },
        {
          language: Language.EN,
          questionText: 'What is the maximum speed within built-up areas?',
          explanation: 'Within built-up areas, the maximum speed is 50 km/h, unless otherwise indicated.',
        },
        {
          language: Language.AR,
          questionText: 'ما هي السرعة القصوى داخل المناطق المبنية؟',
          explanation: 'داخل المناطق المبنية، السرعة القصوى هي 50 كيلومتر في الساعة، ما لم يُشر إلى خلاف ذلك.',
        },
      ],
      options: [
        { key: 'A', isCorrect: false, translations: [{ language: Language.NL, text: '30 km/u' }, { language: Language.EN, text: '30 km/h' }, { language: Language.AR, text: '30 كم/س' }] },
        { key: 'B', isCorrect: true, translations: [{ language: Language.NL, text: '50 km/u' }, { language: Language.EN, text: '50 km/h' }, { language: Language.AR, text: '50 كم/س' }] },
        { key: 'C', isCorrect: false, translations: [{ language: Language.NL, text: '70 km/u' }, { language: Language.EN, text: '70 km/h' }, { language: Language.AR, text: '70 كم/س' }] },
        { key: 'D', isCorrect: false, translations: [{ language: Language.NL, text: '100 km/u' }, { language: Language.EN, text: '100 km/h' }, { language: Language.AR, text: '100 كم/س' }] },
      ],
    },
    {
      categorySlug: 'verkeersregels',
      type: QuestionType.MCQ,
      difficulty: Difficulty.MEDIUM,
      status: QuestionStatus.PUBLISHED,
      translations: [
        {
          language: Language.NL,
          questionText: 'Wat is de maximumsnelheid op een autosnelweg?',
          explanation: 'Op autosnelwegen geldt in Nederland een maximumsnelheid van 130 km/u (overdag) of 100 km/u (\'s nachts op bepaalde snelwegen).',
        },
        {
          language: Language.EN,
          questionText: 'What is the maximum speed on a motorway?',
          explanation: 'On motorways in the Netherlands, the maximum speed is 130 km/h (daytime) or 100 km/h (nighttime on certain motorways).',
        },
        {
          language: Language.AR,
          questionText: 'ما هي السرعة القصوى على الطريق السريع؟',
          explanation: 'على الطرق السريعة في هولندا، السرعة القصوى هي 130 كيلومتر في الساعة (نهاراً) أو 100 كيلومتر في الساعة (ليلاً على بعض الطرق السريعة).',
        },
      ],
      options: [
        { key: 'A', isCorrect: false, translations: [{ language: Language.NL, text: '100 km/u' }, { language: Language.EN, text: '100 km/h' }, { language: Language.AR, text: '100 كم/س' }] },
        { key: 'B', isCorrect: false, translations: [{ language: Language.NL, text: '120 km/u' }, { language: Language.EN, text: '120 km/h' }, { language: Language.AR, text: '120 كم/س' }] },
        { key: 'C', isCorrect: true, translations: [{ language: Language.NL, text: '130 km/u' }, { language: Language.EN, text: '130 km/h' }, { language: Language.AR, text: '130 كم/س' }] },
        { key: 'D', isCorrect: false, translations: [{ language: Language.NL, text: '150 km/u' }, { language: Language.EN, text: '150 km/h' }, { language: Language.AR, text: '150 كم/س' }] },
      ],
    },
    // Priority questions
    {
      categorySlug: 'voorrang',
      type: QuestionType.MCQ,
      difficulty: Difficulty.MEDIUM,
      status: QuestionStatus.PUBLISHED,
      translations: [
        {
          language: Language.NL,
          questionText: 'U rijdt op een voorrangsweg. Een andere bestuurder wil invoegen vanuit een zijstraat. Wie heeft er voorrang?',
          explanation: 'Op een voorrangsweg heeft u als bestuurder altijd voorrang boven bestuurders die de weg willen oprijden vanuit een zijstraat.',
        },
        {
          language: Language.EN,
          questionText: 'You are driving on a priority road. Another driver wants to merge from a side street. Who has right of way?',
          explanation: 'On a priority road, you as the driver always have right of way over drivers who want to enter the road from a side street.',
        },
        {
          language: Language.AR,
          questionText: 'أنت تقود على طريق ذي أولوية. سائق آخر يريد الانضمام من شارع جانبي. من له حق الأولوية؟',
          explanation: 'على طريق الأولوية، لديك دائماً حق الأولوية على السائقين الذين يريدون دخول الطريق من شارع جانبي.',
        },
      ],
      options: [
        { key: 'A', isCorrect: true, translations: [{ language: Language.NL, text: 'U heeft voorrang' }, { language: Language.EN, text: 'You have right of way' }, { language: Language.AR, text: 'لديك حق الأولوية' }] },
        { key: 'B', isCorrect: false, translations: [{ language: Language.NL, text: 'De bestuurder uit de zijstraat heeft voorrang' }, { language: Language.EN, text: 'The driver from the side street has right of way' }, { language: Language.AR, text: 'للسائق من الشارع الجانبي حق الأولوية' }] },
        { key: 'C', isCorrect: false, translations: [{ language: Language.NL, text: 'De bestuurder die rechts rijdt heeft voorrang' }, { language: Language.EN, text: 'The driver on the right has right of way' }, { language: Language.AR, text: 'السائق على اليمين له حق الأولوية' }] },
        { key: 'D', isCorrect: false, translations: [{ language: Language.NL, text: 'Gelijkwaardig, dus rechts heeft voorrang' }, { language: Language.EN, text: 'Equal, so right has priority' }, { language: Language.AR, text: 'متساوون، لذا يمين له الأولوية' }] },
      ],
    },
    // Traffic signs
    {
      categorySlug: 'verkeersborden',
      type: QuestionType.IMAGE,
      difficulty: Difficulty.EASY,
      status: QuestionStatus.PUBLISHED,
      mediaUrl: 'https://images.unsplash.com/photo-1558981852-426c349dced4?w=400',
      translations: [
        {
          language: Language.NL,
          questionText: 'Wat betekent een rood achthoekig bord met "STOP" erop?',
          explanation: 'Een stopbord (B07) verplicht u volledig te stoppen voor de stopstreep en andere weggebruikers te laten voorgaan.',
        },
        {
          language: Language.EN,
          questionText: 'What does a red octagonal sign with "STOP" on it mean?',
          explanation: 'A stop sign (B07) requires you to come to a complete stop before the stop line and let other road users pass.',
        },
        {
          language: Language.AR,
          questionText: 'ماذا تعني لافتة ثمانية الأضلاع باللون الأحمر مع كلمة "STOP" عليها؟',
          explanation: 'تطلب منك لافتة التوقف (B07) التوقف الكامل قبل خط التوقف والسماح لمستخدمي الطريق الآخرين بالمرور.',
        },
      ],
      options: [
        { key: 'A', isCorrect: false, translations: [{ language: Language.NL, text: 'Gevaarlijk kruispunt, verlaag uw snelheid' }, { language: Language.EN, text: 'Dangerous intersection, reduce speed' }, { language: Language.AR, text: 'تقاطع خطير، قلل السرعة' }] },
        { key: 'B', isCorrect: true, translations: [{ language: Language.NL, text: 'Verplicht volledig stoppen' }, { language: Language.EN, text: 'Must stop completely' }, { language: Language.AR, text: 'يجب التوقف الكامل' }] },
        { key: 'C', isCorrect: false, translations: [{ language: Language.NL, text: 'Voorrang verlenen, maar stoppen hoeft niet' }, { language: Language.EN, text: 'Give way, but no need to stop' }, { language: Language.AR, text: 'أعطِ الأولوية لكن لا حاجة للتوقف' }] },
        { key: 'D', isCorrect: false, translations: [{ language: Language.NL, text: 'Parkeren verboden' }, { language: Language.EN, text: 'No parking' }, { language: Language.AR, text: 'ممنوع الوقوف' }] },
      ],
    },
    // Hazard perception
    {
      categorySlug: 'gevaarherkenning',
      type: QuestionType.MCQ,
      difficulty: Difficulty.HARD,
      status: QuestionStatus.PUBLISHED,
      translations: [
        {
          language: Language.NL,
          questionText: 'U rijdt op een natte weg. Hoe groot is de remweg bij 100 km/u vergeleken met een droge weg?',
          explanation: 'Op een natte weg is de remweg bij 100 km/u ongeveer twee keer zo groot als op een droge weg. Rijd bij nat wegdek altijd rustiger.',
        },
        {
          language: Language.EN,
          questionText: 'You are driving on a wet road. How much longer is the braking distance at 100 km/h compared to a dry road?',
          explanation: 'On a wet road, the braking distance at 100 km/h is approximately twice as long as on a dry road. Always drive more carefully on wet roads.',
        },
        {
          language: Language.AR,
          questionText: 'أنت تقود على طريق مبلل. ما مقدار الزيادة في مسافة الفرملة عند 100 كم/س مقارنة بالطريق الجاف؟',
          explanation: 'على طريق مبلل، تكون مسافة الفرملة عند 100 كيلومتر في الساعة ضعف مسافة الطريق الجاف تقريباً. دائماً تحرك بحذر على الطرق المبللة.',
        },
      ],
      options: [
        { key: 'A', isCorrect: false, translations: [{ language: Language.NL, text: 'Gelijk aan droog wegdek' }, { language: Language.EN, text: 'Same as dry road' }, { language: Language.AR, text: 'مثل الطريق الجاف' }] },
        { key: 'B', isCorrect: false, translations: [{ language: Language.NL, text: '25% langer' }, { language: Language.EN, text: '25% longer' }, { language: Language.AR, text: 'أطول بنسبة 25%' }] },
        { key: 'C', isCorrect: false, translations: [{ language: Language.NL, text: '50% langer' }, { language: Language.EN, text: '50% longer' }, { language: Language.AR, text: 'أطول بنسبة 50%' }] },
        { key: 'D', isCorrect: true, translations: [{ language: Language.NL, text: 'Twee keer zo lang' }, { language: Language.EN, text: 'Twice as long' }, { language: Language.AR, text: 'ضعف المسافة' }] },
      ],
    },
    // Vehicle safety
    {
      categorySlug: 'voertuigveiligheid',
      type: QuestionType.MCQ,
      difficulty: Difficulty.EASY,
      status: QuestionStatus.PUBLISHED,
      translations: [
        {
          language: Language.NL,
          questionText: 'Hoe vaak moet u de bandenspanning controleren?',
          explanation: 'Controleer de bandenspanning minimaal één keer per maand en altijd voor een lange rit. Juiste bandenspanning zorgt voor veiligheid en bespaart brandstof.',
        },
        {
          language: Language.EN,
          questionText: 'How often should you check tire pressure?',
          explanation: 'Check tire pressure at least once a month and always before a long trip. Correct tire pressure ensures safety and saves fuel.',
        },
        {
          language: Language.AR,
          questionText: 'كم مرة يجب عليك التحقق من ضغط الإطارات؟',
          explanation: 'تحقق من ضغط الإطارات مرة واحدة على الأقل في الشهر ودائماً قبل الرحلات الطويلة. الضغط الصحيح للإطارات يضمن السلامة ويوفر الوقود.',
        },
      ],
      options: [
        { key: 'A', isCorrect: false, translations: [{ language: Language.NL, text: 'Alleen bij de garage' }, { language: Language.EN, text: 'Only at the garage' }, { language: Language.AR, text: 'في الغاراج فقط' }] },
        { key: 'B', isCorrect: false, translations: [{ language: Language.NL, text: 'Eens per jaar' }, { language: Language.EN, text: 'Once a year' }, { language: Language.AR, text: 'مرة واحدة في السنة' }] },
        { key: 'C', isCorrect: true, translations: [{ language: Language.NL, text: 'Minimaal één keer per maand' }, { language: Language.EN, text: 'At least once a month' }, { language: Language.AR, text: 'مرة واحدة على الأقل في الشهر' }] },
        { key: 'D', isCorrect: false, translations: [{ language: Language.NL, text: 'Elke week' }, { language: Language.EN, text: 'Every week' }, { language: Language.AR, text: 'كل أسبوع' }] },
      ],
    },
    // Children & seatbelts
    {
      categorySlug: 'kinderen-gordels',
      type: QuestionType.MCQ,
      difficulty: Difficulty.MEDIUM,
      status: QuestionStatus.PUBLISHED,
      translations: [
        {
          language: Language.NL,
          questionText: 'Tot welke leeftijd moeten kinderen een kinderzitje gebruiken in de auto?',
          explanation: 'Kinderen moeten een kinderzitje gebruiken tot ze 1,35 meter lang zijn of 12 jaar oud zijn, afhankelijk van welke situatie het eerste bereikt wordt.',
        },
        {
          language: Language.EN,
          questionText: 'Until what age must children use a child seat in the car?',
          explanation: 'Children must use a child seat until they are 1.35 meters tall or 12 years old, whichever comes first.',
        },
        {
          language: Language.AR,
          questionText: 'حتى أي عمر يجب على الأطفال استخدام كرسي الأطفال في السيارة؟',
          explanation: 'يجب على الأطفال استخدام كرسي الأطفال حتى يبلغوا طول 1.35 متر أو 12 سنة، أيهما يأتي أولاً.',
        },
      ],
      options: [
        { key: 'A', isCorrect: false, translations: [{ language: Language.NL, text: 'Tot 8 jaar' }, { language: Language.EN, text: 'Until 8 years' }, { language: Language.AR, text: 'حتى 8 سنوات' }] },
        { key: 'B', isCorrect: false, translations: [{ language: Language.NL, text: 'Tot 10 jaar' }, { language: Language.EN, text: 'Until 10 years' }, { language: Language.AR, text: 'حتى 10 سنوات' }] },
        { key: 'C', isCorrect: true, translations: [{ language: Language.NL, text: 'Tot 1,35 m lang of 12 jaar' }, { language: Language.EN, text: 'Until 1.35m tall or 12 years' }, { language: Language.AR, text: 'حتى طول 1.35م أو 12 سنة' }] },
        { key: 'D', isCorrect: false, translations: [{ language: Language.NL, text: 'Tot 15 jaar' }, { language: Language.EN, text: 'Until 15 years' }, { language: Language.AR, text: 'حتى 15 سنة' }] },
      ],
    },
    // Road position
    {
      categorySlug: 'rijpositie',
      type: QuestionType.MCQ,
      difficulty: Difficulty.EASY,
      status: QuestionStatus.PUBLISHED,
      translations: [
        {
          language: Language.NL,
          questionText: 'Op welke rijstrook rijdt u bij voorkeur op een weg met twee rijstroken per richting?',
          explanation: 'U rijdt bij voorkeur op de rechter rijstrook. De linker rijstrook is bedoeld voor inhalen en daarna rijdt u weer naar rechts.',
        },
        {
          language: Language.EN,
          questionText: 'Which lane do you prefer to drive in on a road with two lanes per direction?',
          explanation: 'You preferably drive in the right lane. The left lane is for overtaking and afterwards you move back to the right.',
        },
        {
          language: Language.AR,
          questionText: 'في أي مسار تفضل القيادة على طريق به مسارين في كل اتجاه؟',
          explanation: 'تفضل القيادة في المسار الأيمن. المسار الأيسر للتجاوز وبعدها تعود إلى اليمين.',
        },
      ],
      options: [
        { key: 'A', isCorrect: false, translations: [{ language: Language.NL, text: 'Linker rijstrook' }, { language: Language.EN, text: 'Left lane' }, { language: Language.AR, text: 'المسار الأيسر' }] },
        { key: 'B', isCorrect: true, translations: [{ language: Language.NL, text: 'Rechter rijstrook' }, { language: Language.EN, text: 'Right lane' }, { language: Language.AR, text: 'المسار الأيمن' }] },
        { key: 'C', isCorrect: false, translations: [{ language: Language.NL, text: 'Midden van de weg' }, { language: Language.EN, text: 'Middle of the road' }, { language: Language.AR, text: 'منتصف الطريق' }] },
        { key: 'D', isCorrect: false, translations: [{ language: Language.NL, text: 'Maakt niet uit' }, { language: Language.EN, text: 'Does not matter' }, { language: Language.AR, text: 'لا يهم' }] },
      ],
    },
    // Parking
    {
      categorySlug: 'parkeren',
      type: QuestionType.MCQ,
      difficulty: Difficulty.MEDIUM,
      status: QuestionStatus.PUBLISHED,
      translations: [
        {
          language: Language.NL,
          questionText: 'Op welke afstand van een kruispunt mag u niet parkeren?',
          explanation: 'U mag niet parkeren binnen 5 meter van een kruispunt. Dit is om de zichtbaarheid te waarborgen en de doorstroming te bevorderen.',
        },
        {
          language: Language.EN,
          questionText: 'Within what distance from an intersection may you not park?',
          explanation: 'You may not park within 5 meters of an intersection. This is to ensure visibility and promote traffic flow.',
        },
        {
          language: Language.AR,
          questionText: 'على أي مسافة من التقاطع لا يجوز لك الوقوف؟',
          explanation: 'لا يجوز لك الوقوف على بُعد 5 أمتار من التقاطع. هذا لضمان الرؤية وتعزيز تدفق المرور.',
        },
      ],
      options: [
        { key: 'A', isCorrect: false, translations: [{ language: Language.NL, text: '3 meter' }, { language: Language.EN, text: '3 meters' }, { language: Language.AR, text: '3 أمتار' }] },
        { key: 'B', isCorrect: true, translations: [{ language: Language.NL, text: '5 meter' }, { language: Language.EN, text: '5 meters' }, { language: Language.AR, text: '5 أمتار' }] },
        { key: 'C', isCorrect: false, translations: [{ language: Language.NL, text: '10 meter' }, { language: Language.EN, text: '10 meters' }, { language: Language.AR, text: '10 أمتار' }] },
        { key: 'D', isCorrect: false, translations: [{ language: Language.NL, text: '15 meter' }, { language: Language.EN, text: '15 meters' }, { language: Language.AR, text: '15 أمتار' }] },
      ],
    },
    // More draft questions
    {
      categorySlug: 'verkeersregels',
      type: QuestionType.MCQ,
      difficulty: Difficulty.HARD,
      status: QuestionStatus.DRAFT,
      translations: [
        {
          language: Language.NL,
          questionText: 'Wat is de minimale volgafstand op de autosnelweg bij 120 km/u?',
          explanation: 'Op de autosnelweg moet u een volgafstand aanhouden van minimaal 2 seconden. Bij 120 km/u betekent dit circa 67 meter.',
        },
        {
          language: Language.EN,
          questionText: 'What is the minimum following distance on the motorway at 120 km/h?',
          explanation: 'On the motorway, you must maintain a following distance of at least 2 seconds. At 120 km/h, this means approximately 67 meters.',
        },
        {
          language: Language.AR,
          questionText: 'ما هي أدنى مسافة أمان على الطريق السريع بسرعة 120 كم/س؟',
          explanation: 'على الطريق السريع، يجب الحفاظ على مسافة متابعة لا تقل عن ثانيتين. عند 120 كيلومتر في الساعة، يعني ذلك حوالي 67 مترًا.',
        },
      ],
      options: [
        { key: 'A', isCorrect: false, translations: [{ language: Language.NL, text: '30 meter' }, { language: Language.EN, text: '30 meters' }, { language: Language.AR, text: '30 متراً' }] },
        { key: 'B', isCorrect: false, translations: [{ language: Language.NL, text: '50 meter' }, { language: Language.EN, text: '50 meters' }, { language: Language.AR, text: '50 متراً' }] },
        { key: 'C', isCorrect: true, translations: [{ language: Language.NL, text: 'Minimaal 2 seconden afstand' }, { language: Language.EN, text: 'Minimum 2 seconds distance' }, { language: Language.AR, text: 'مسافة ثانيتين على الأقل' }] },
        { key: 'D', isCorrect: false, translations: [{ language: Language.NL, text: 'Minimaal 100 meter' }, { language: Language.EN, text: 'Minimum 100 meters' }, { language: Language.AR, text: '100 متر على الأقل' }] },
      ],
    },
  ]

  // Create questions
  for (const qData of questionsData) {
    const category = categories.find(c => c.slug === qData.categorySlug)
    if (!category) continue

    const question = await prisma.question.create({
      data: {
        type: qData.type,
        categoryId: category.id,
        difficulty: qData.difficulty,
        status: qData.status,
        mediaUrl: qData.mediaUrl || null,
        videoUrl: null,
        tags: [],
      },
    })

    // Create translations
    await Promise.all(
      qData.translations.map(t =>
        prisma.questionTranslation.create({
          data: {
            questionId: question.id,
            language: t.language,
            questionText: t.questionText,
            explanation: t.explanation,
          },
        })
      )
    )

    // Create answer options
    for (const opt of qData.options) {
      const answerOption = await prisma.answerOption.create({
        data: {
          questionId: question.id,
          optionKey: opt.key as OptionKey,
          isCorrect: opt.isCorrect,
        },
      })

      await Promise.all(
        opt.translations.map(t =>
          prisma.answerOptionTranslation.create({
            data: {
              answerId: answerOption.id,
              language: t.language,
              text: t.text,
            },
          })
        )
      )
    }
  }

  console.log('✅ Created questions')

  // Create some mock exam attempts for students
  const allQuestions = await prisma.question.findMany({ where: { status: QuestionStatus.PUBLISHED } })

  if (allQuestions.length >= 5 && studentUsers.length > 0) {
    const mockExam1 = await prisma.mockExam.create({
      data: {
        userId: studentUsers[0].id,
        startedAt: new Date('2024-03-15T10:00:00Z'),
        completedAt: new Date('2024-03-15T10:42:00Z'),
        score: 37,
        totalQuestions: 40,
        passed: true,
      },
    })

    const mockExam2 = await prisma.mockExam.create({
      data: {
        userId: studentUsers[0].id,
        startedAt: new Date('2024-03-10T14:00:00Z'),
        completedAt: new Date('2024-03-10T14:38:00Z'),
        score: 32,
        totalQuestions: 40,
        passed: false,
      },
    })

    // Add some question attempts
    const questionsToUse = allQuestions.slice(0, Math.min(5, allQuestions.length))
    await Promise.all(
      questionsToUse.map((q, i) =>
        prisma.mockExamQuestion.create({
          data: {
            mockExamId: mockExam1.id,
            questionId: q.id,
            selectedAnswer: i % 4 === 0 ? 'A' : i % 4 === 1 ? 'B' : i % 4 === 2 ? 'C' : 'D',
            isCorrect: i % 5 !== 0,
          },
        })
      )
    )

    await Promise.all(
      questionsToUse.slice(0, 3).map((q, i) =>
        prisma.userQuestionAttempt.create({
          data: {
            userId: studentUsers[0].id,
            questionId: q.id,
            selectedAnswer: i % 2 === 0 ? 'A' : 'B',
            isCorrect: i % 2 === 0,
            attemptedAt: new Date(),
          },
        })
      )
    )

    // Save some questions
    await Promise.all(
      questionsToUse.slice(0, 2).map(q =>
        prisma.savedQuestion.create({
          data: {
            userId: studentUsers[0].id,
            questionId: q.id,
          },
        })
      )
    )

    console.log('✅ Created mock exams and attempts')
  }

  // Create content blocks
  const contentBlocks = [
    {
      key: 'hero',
      type: ContentBlockType.HERO,
      translations: [
        { language: Language.NL, title: 'Slaag voor je rijtheorie-examen op de eerste poging', body: 'Studeer slim met visuele vragen, oefenexamens en gedetailleerde uitleg. Beschikbaar in het Nederlands, Engels en Arabisch.' },
        { language: Language.EN, title: 'Pass your driving theory exam on the first try', body: 'Study smart with visual questions, practice exams, and detailed explanations. Available in Dutch, English, and Arabic.' },
        { language: Language.AR, title: 'اجتز امتحان نظرية القيادة من المحاولة الأولى', body: 'ادرس بذكاء مع أسئلة مرئية وامتحانات تدريبية وشروحات مفصلة. متوفر بالهولندية والإنجليزية والعربية.' },
      ],
    },
    {
      key: 'features_title',
      type: ContentBlockType.SECTION_TITLE,
      translations: [
        { language: Language.NL, title: 'Alles wat je nodig hebt om te slagen', body: 'Ons platform heeft alle tools die je nodig hebt voor een succesvolle voorbereiding.' },
        { language: Language.EN, title: 'Everything you need to succeed', body: 'Our platform has all the tools you need for successful preparation.' },
        { language: Language.AR, title: 'كل ما تحتاجه للنجاح', body: 'تمتلك منصتنا جميع الأدوات التي تحتاجها للتحضير الناجح.' },
      ],
    },
  ]

  for (const block of contentBlocks) {
    const cb = await prisma.contentBlock.create({
      data: { key: block.key, type: block.type },
    })
    await Promise.all(
      block.translations.map(t =>
        prisma.contentBlockTranslation.create({
          data: {
            contentBlockId: cb.id,
            language: t.language,
            title: t.title,
            body: t.body,
          },
        })
      )
    )
  }

  console.log('✅ Created content blocks')
  console.log('')
  console.log('🎉 Seed completed successfully!')
  console.log('')
  console.log('Test accounts:')
  console.log('  Admin:   admin@rijpro.nl')
  console.log('  Student: ahmed@example.com (Premium)')
  console.log('  Student: sara@example.com (Standard)')
  console.log('  Student: karim@example.com (Basic)')
}

main()
  .catch((e) => {
    console.error('Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
