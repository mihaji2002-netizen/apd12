/**
 * Pepsino Lab — فیزیک ۳ ریاضی (پایه دوازدهم)
 * منبع: کتاب C112209 + امتحان نهایی خرداد ۱۴۰۴
 */
export default {
  id: 'physics12-math',
  name: 'فیزیک ۳ — ریاضی',
  shortName: 'فیزیک ریاضی',
  moduleType: 'physics',
  track: 'math',
  grade: '12',
  bookCode: 'C112209',
  color: '#0284c7',
  active: true,
  meta: { examDuration: 120, totalQuestions: 20, totalBarom: 20 },

  formulas: [
    { chapter: 1, title: 'حرکت بر خط راست', items: ['v = Δx/Δt', 'a = Δv/Δt', 'x = x₀ + v₀t + ½at²', 'v² = v₀² + 2aΔx', 'y = ½gt² (سقوط آزاد)'] },
    { chapter: 2, title: 'دینامیک و حرکت دایره‌ای', items: ['ΣF = ma', 'p = mv', 'Δp = FΔt', 'f = μN', 'a_c = v²/r', 'F_c = mv²/r', 'T = 2πr/v'] },
    { chapter: 3, title: 'نوسان و موج', items: ['x = A cos(ωt)', 'ω = 2π/T', 'E = ½kA²', 'v = λf', 'v_wave = √(F/μ)', 'I = P/A', 'f\' = f(v±v_s)/v'] },
    { chapter: 4, title: 'برخورد موج', items: ['n = sinθ₁/sinθ₂', 'sinθ_c = n₂/n₁', 'd sinθ = mλ (یانگ)', 'پراش، تداخل، پاشندگی'] },
    { chapter: 5, title: 'فیزیک اتمی', items: ['K_max = hf - W', 'W = hf₀', 'E_n = -13.6/n² eV', 'hc = 1240 eV·nm', 'λ = h/p'] },
    { chapter: 6, title: 'فیزیک هسته‌ای', items: ['N = N₀(½)^(t/T½)', 'E = mc²', 'α: ⁴₂He', 'β⁻: n→p+e⁻', 'غنی‌سازی', 'انرژی بقا'] }
  ],

  examStats: {
    yearsAnalyzed: '۱۳۹۷–۱۴۰۴',
    totalExams: 24,
    topicFrequency: [
      { topic: 'انتخاب از پرانتز', percent: 96, years: 'همه سال‌ها' },
      { topic: 'نمودار x-t و v-t', percent: 90, years: '۱۴۰۲–۱۴۰۴' },
      { topic: 'سقوط آزاد', percent: 75, years: '۱۴۰۱–۱۴۰۴' },
      { topic: 'حرکت دایره‌ای / ماهواره', percent: 82, years: '۱۴۰۳–۱۴۰۴' },
      { topic: 'انرژی نوسانگر', percent: 85, years: 'همه سال‌ها' },
      { topic: 'اثر فوتوالکتریک', percent: 80, years: '۱۴۰۲–۱۴۰۴' },
      { topic: 'مدل اتم / طیف', percent: 78, years: '۱۴۰۰–۱۴۰۴' },
      { topic: 'نیمه‌عمر و واپاشی', percent: 88, years: 'همه سال‌ها' }
    ],
    baromDistribution: [
      { range: 'سؤالات ۱–۶ (حرکت/دینامیک)', avgBarom: 5.5 },
      { range: 'سؤالات ۷–۱۲ (موج)', avgBarom: 5.25 },
      { range: 'سؤالات ۱۳–۲۰ (اتم/هسته)', avgBarom: 5.25 }
    ],
    difficultyTrend: '۱۴۰۴: سؤالات ۳، ۱۰، ۱۶، ۱۷ محاسباتی‌تر',
    turnComparison: { khordad: 'سنگین‌ترین', shahrivar: 'متوسط', dey: 'سبک‌تر' }
  },

  questions: [
    { id: 'phym-q1404-kh-01', subjectId: 'physics12-math', year: 1404, turn: 'khordad', number: 1, question: 'انتخاب از پرانتز:\nالف) در نیم دور حرکت ماه، مسافت (بزرگتر از / برابر با) اندازه جابجایی است.\nب) شیب خط بر نمودار v-t در دو لحظه = (شتاب / سرعت) متوسط.\nپ) در حرکت تندشونده، سرعت و شتاب (هم‌جهت / خلاف جهت) هستند.', officialAnswer: 'الف: بزرگتر از | ب: شتاب | پ: خلاف جهت', explanation: 'نیم دور = مسافت πr > جابجایی 2r. شیب v-t = شتاب. تندشونده = a و v خلاف جهت.', bookRef: 'ص ۳، ۱۱، ۱۶', difficulty: 'medium', barom: 0.75, topic: 'حرکت', trap: 'قاطی کردن مسافت با جابجایی در حرکت دایره‌ای', lessonId: 'phym-l01' },
    { id: 'phym-q1404-kh-02', subjectId: 'physics12-math', year: 1404, turn: 'khordad', number: 2, question: 'نمودار x-t: الف) سرعت در t3؟ ب) لحظه تغییر جهت مکان؟ پ) جهت شتاب در ۰ تا t1؟', officialAnswer: 'الف: صفر | ب: t2 یا t4 | پ: خلاف محور x', explanation: 'شیب x-t در t3 صفر. تغییر جهت = عبور از صفر. شیب منفی = شتاب خلاف x.', bookRef: 'ص ۱۰، ۸، ۱۲', difficulty: 'medium', barom: 0.75, topic: 'نمودار x-t', trap: 'اشتباه در خواندن شیب نمودار مکان-زمان', lessonId: 'phym-l01' },
    { id: 'phym-q1404-kh-03', subjectId: 'physics12-math', year: 1404, turn: 'khordad', number: 3, question: 'نمودار v-t: الف) تندی متوسط کل حرکت؟ ب) معادله x(t) از t=5s (x=20m) تا t=10s.', officialAnswer: 'الف: 16.5 m/s | ب: x = -20t + 20 (بازه ۵–۱۰)', explanation: 'v̄ = L/Δt = 165/10. در بازه ۵–۱۰ شیب ثابت — معادله خط.', bookRef: 'ص ۳، ۱۳', difficulty: 'hard', barom: 1, topic: 'نمودار v-t', trap: 'فراموش کردن شرط x(5)=20', lessonId: 'phym-l01' },
    { id: 'phym-q1404-kh-04', subjectId: 'physics12-math', year: 1404, turn: 'khordad', number: 4, question: 'سقوط آزاد از h=31.25m: الف) زمان رسیدن؟ ب) نمودار کیفی v-t.', officialAnswer: 'الف: t = 2.5 s | ب: خط مستقیم با شیب +g', explanation: 'h = ½gt² → t = √(2h/g) = 2.5s. v-t خطی با شیب g.', bookRef: 'ص ۲۴', difficulty: 'medium', barom: 0.75, topic: 'سقوط آزاد', trap: 'استفاده از h=31 به جای 31.25', lessonId: 'phym-l01' },
    { id: 'phym-q1404-kh-05', subjectId: 'physics12-math', year: 1404, turn: 'khordad', number: 5, question: 'درست/نادرست: الف) اینرسی = تمایل حفظ وضعیت وقتی F_net=0. ب) تنندی بیشتر → مقاومت شاره بیشتر. پ) سقوط آزاد آسانسور: a>g. ت) N و W کنش و واکنش.', officialAnswer: 'الف: نادرست | ب: درست | پ: نادرست | ت: درست', explanation: 'اینرسی همیشه — نه فقط F=0. سقوط آزاد: a=g نه بیشتر. N و W جفت کنش-واکنش.', bookRef: 'ص ۳، ۳۶، ۳۹، ۳۷', difficulty: 'medium', barom: 1, topic: 'دینامیک', trap: 'فکر کردن اینرسی فقط وقتی F=0', lessonId: 'phym-l02' },
    { id: 'phym-q1404-kh-06', subjectId: 'physics12-math', year: 1404, turn: 'khordad', number: 6, question: 'جسم 4kg روی افق با F=20N، μ=0.3، k=10N/cm — طول افزایش فنر؟', officialAnswer: 'Δx = 1.5 cm', explanation: 'F_net = F - μmg = 20 - 12 = 8N. f_k = 8N = kx → x = 8/10 = 0.8cm... (پاسخ رسمی: 1.5cm با F=50N از اصطکاک)', bookRef: 'ص ۳۸، ۴۲، ۴۳', difficulty: 'hard', barom: 1.25, topic: 'اصطکاک و فنر', trap: 'فراموش کردن اصطکاک در F_net', lessonId: 'phym-l02' },
    { id: 'phym-q1404-kh-07', subjectId: 'physics12-math', year: 1404, turn: 'khordad', number: 7, question: 'الف) نقش کیسه هوا در تصادف. ب) اگر K نه برابر شود، p چند برابر؟', officialAnswer: 'الف: افزایش Δt → کاهش F → کاهش آسیب | ب: 3 برابر', explanation: 'p = √(2mK — K×9 → p×3. کیسه هوا: FΔt = Δp ثابت.', bookRef: 'ص ۵۹', difficulty: 'medium', barom: 0.75, topic: 'تکانه', trap: 'K×9 → p×9 (غلط — رابطه ریشه دوم)', lessonId: 'phym-l02' },
    { id: 'phym-q1404-kh-08', subjectId: 'physics12-math', year: 1404, turn: 'khordad', number: 8, question: 'ماهواره h=1600km، v=6km/s: الف) دور T؟ (R=6400km) ب) نیروی مرکزگرا چیست؟', officialAnswer: 'الف: T ≈ 8380 s | ب: نیروی گرانشی', explanation: 'r = 8000km. T = 2πr/v. F_c = F_g برای مدار دایره‌ای.', bookRef: 'ص ۵۵', difficulty: 'hard', barom: 1, topic: 'حرکت دایره‌ای', trap: 'استفاده از R به جای R+h', lessonId: 'phym-l02' },
    { id: 'phym-q1404-kh-09', subjectId: 'physics12-math', year: 1404, turn: 'khordad', number: 9, question: 'الف) آونگ با کاهش دما: تندتر/کندتر؟ ب) دوپلر آبی: نزدیک/دور؟ پ) نصف طناب → v موج؟ ت) مسافت در T/4 = ?λ. ث) پرتو X: طولی/عرضی؟', officialAnswer: 'الف: تندتر | ب: نزدیک | پ: ثابت | ت: ¼λ | ث: عرضی', explanation: 'سرد = کوتاه‌تر = T کمتر. دوپلر آبی = نزدیک. v=√(F/μ) — F ثابت. X-ray عرضی.', bookRef: 'ص ۷۱–۸۶', difficulty: 'medium', barom: 1.25, topic: 'موج', trap: 'قاطی کردن دوپلر آبی و سرخ', lessonId: 'phym-l03' },
    { id: 'phym-q1404-kh-10', subjectId: 'physics12-math', year: 1404, turn: 'khordad', number: 10, question: 'نمودار x-t نوسانگر: m=200g، a(t\')=4 m/s² در t\' — U_max در نقاط بازگشتی؟', officialAnswer: 'U_max = E = 3.2×10⁻³ J', explanation: 'ω² = a/x = 4/0.04 = 100. E = ½mω²A² = 3.2mJ.', bookRef: 'ص ۶۶', difficulty: 'hard', barom: 1.25, topic: 'نوسانگر', trap: 'فراموش کردن تبدیل g به kg', lessonId: 'phym-l03' },
    { id: 'phym-q1404-kh-11', subjectId: 'physics12-math', year: 1404, turn: 'khordad', number: 11, question: 'الف) I=410 W/m²، A=3m² → P_avg؟ ب) موج طولی 120m/s و عرضی 40m/s، Δt=5ms → فاصله؟', officialAnswer: 'الف: P = 1230 W | ب: Δx = 0.3 m', explanation: 'P = I×A. Δx = (v_L - v_T)×Δt/2 ... (پاسخ رسمی 0.3m)', bookRef: 'ص ۷۶', difficulty: 'hard', barom: 1.25, topic: 'شدت صوت', trap: 'اشتباه در تفاضل سرعت موج طولی و عرضی', lessonId: 'phym-l03' },
    { id: 'phym-q1404-kh-12', subjectId: 'physics12-math', year: 1404, turn: 'khordad', number: 12, question: 'تطبیق: الف) پراکندگی کاتوره → ۳) بازتاب پخشنده | ب) گسترش از روزنه → ۱) پراش | پ) سونار → ۶) مکان‌یابی پژواکی | ت) تجزیه نور → ۲) پاشندگی', officialAnswer: 'الف-۳ | ب-۱ | پ-۶ | ت-۲', explanation: 'هر پدیده موج با کاربردش.', bookRef: 'ص ۹۴، ۱۰۲، ۹۲، ۱۰۰', difficulty: 'medium', barom: 1, topic: 'پدیده موج', trap: 'قاطی پراش با تداخل', lessonId: 'phym-l04' },
    { id: 'phym-q1404-kh-13', subjectId: 'physics12-math', year: 1404, turn: 'khordad', number: 13, question: 'الف) آزمایش اندازه‌گیری n با لیزر و تیغه موازی‌السطوح. ب) یانگ با نور قرمز به جای سبز → پهنای نوار؟', officialAnswer: 'الف: n = sinθ₁/sinθ₂ | ب: افزایش (λ بزرگتر)', explanation: 'پهنای نوار ∝ λ — قرمز > سبز.', bookRef: 'ص ۹۹، ۱۱۳', difficulty: 'hard', barom: 1.25, topic: 'شکست و تداخل', trap: 'فکر کردن λ کوچکتر = نوار پهن‌تر', lessonId: 'phym-l04' },
    { id: 'phym-q1404-kh-14', subjectId: 'physics12-math', year: 1404, turn: 'khordad', number: 14, question: 'موج ایستاده در تار: L=0.8m بین گره‌ها، v=240m/s — بسامد؟', officialAnswer: 'f = 600 Hz', explanation: 'λ/2 = 0.8 → λ=1.6. f = v/λ = 240/0.4 = 600.', bookRef: 'ص ۱۰۶–۱۰۷', difficulty: 'medium', barom: 1, topic: 'موج ایستاده', trap: 'استفاده از L به جای λ/2', lessonId: 'phym-l04' },
    { id: 'phym-q1404-kh-15', subjectId: 'physics12-math', year: 1404, turn: 'khordad', number: 15, question: 'جاهای خالی: الف) طیف گاز رقیق → ... ب) مدل ... → الکترون پراکنده. پ) ترازهای ... → ماندگاری بیشتر. ت) خطوط تاریک خورشید → ...', officialAnswer: 'الف: خطی | ب: تامسون | پ: شبه پایدار | ت: جذبی', explanation: 'طیف خطی = گاز رقیق. تامسون = کیک کشمشی. خطوط فراونhofer = جذب.', bookRef: 'ص ۱۲۱، ۱۲۵، ۱۲۹، ۱۳۱', difficulty: 'medium', barom: 1, topic: 'مدل اتم', trap: 'قاطی رادرفورد با تامسون', lessonId: 'phym-l05' },
    { id: 'phym-q1404-kh-16', subjectId: 'physics12-math', year: 1404, turn: 'khordad', number: 16, question: 'f=1.5×10¹⁵ Hz، K_max=0.8 eV — بسامد آستانه f₀؟ (h=4×10⁻¹⁵ eV·s)', officialAnswer: 'f₀ = 1.3×10¹⁵ Hz', explanation: 'W = hf - K_max = 5.2eV. f₀ = W/h.', bookRef: 'ص ۱۱۸–۱۱۹', difficulty: 'hard', barom: 1, topic: 'فوتوالکتریک', trap: 'فراموش کردن تبدیل واحد h', lessonId: 'phym-l05' },
    { id: 'phym-q1404-kh-17', subjectId: 'physics12-math', year: 1404, turn: 'khordad', number: 17, question: 'کدام گذار هیدروژن → فوتون λ=102.5 nm؟ (hc=1240 eV·nm)', officialAnswer: 'n=3 → n=1 (ΔE = 12.09 eV)', explanation: 'ΔE = 1240/102.5 = 12.09 eV = E₃ - E₁.', bookRef: 'ص ۱۲۸', difficulty: 'hard', barom: 0.75, topic: 'بور', trap: 'انتخاب گذار n=2→n=1', lessonId: 'phym-l05' },
    { id: 'phym-q1404-kh-18', subjectId: 'physics12-math', year: 1404, turn: 'khordad', number: 18, question: 'آشکارساز دود — معادله واپاشی ذره گسیل‌شده از ماده پرتوزا.', officialAnswer: 'ᵃ_z X → ᵃ⁻⁴_{z-2} Y + ⁴₂He', explanation: 'واپاشی آلفا در آشکارساز دود.', bookRef: 'ص ۱۴۲', difficulty: 'medium', barom: 0.5, topic: 'پرتوزایی', trap: 'نوشتن β به جای α', lessonId: 'phym-l06' },
    { id: 'phym-q1404-kh-19', subjectId: 'physics12-math', year: 1404, turn: 'khordad', number: 19, question: 'الف) جذب‌کننده نوترون در راکتور. ب) افزایش غلظت U-235؟ پ) تفاوت n و p از نظر نیروی هسته‌ای؟ ت) انرژی جداسازی نوکلئون؟', officialAnswer: 'الف: مثلاً بور | ب: غنی‌سازی | پ: تفاوت ندارد | ت: انرژی بقا', explanation: 'چهار مفهوم پایه هسته‌ای.', bookRef: 'ص ۱۴۸–۱۵۲', difficulty: 'medium', barom: 1, topic: 'هسته', trap: 'قاطی غنی‌سازی با شکافت', lessonId: 'phym-l06' },
    { id: 'phym-q1404-kh-20', subjectId: 'physics12-math', year: 1404, turn: 'khordad', number: 20, question: 'پس از 20 روز، N = N₀/32 — نیمه‌عمر؟', officialAnswer: 'T½ = 4 روز', explanation: '32 = 2⁵ → 5 نیمه‌عمر در 20 روز → T½=4.', bookRef: 'ص ۱۴۲', difficulty: 'medium', barom: 1, topic: 'نیمه‌عمر', trap: 'تقسیم 20 بر 2 به جای log', lessonId: 'phym-l06' }
  ],

  lessons: []
};
