/**
 * Pepsino Lab — Module schema per subject track
 */

export const SUBJECT_MODULES = {
  physics: [
    { id: 'formulas', label: 'خلاصه فرمول‌ها', icon: '∑', desc: 'تمام فرمول‌های کل کتاب — فصل‌به‌فصل' },
    { id: 'exam-stats', label: 'تحلیل آماری نهایی', icon: '📊', desc: 'آمار کل سوالات امتحانات نهایی سال‌های قبل' },
    { id: 'exam-1404', label: 'خرداد ۱۴۰۴ — سؤال‌به‌سؤال', icon: '🎯', desc: 'متن عین امتحان + تحلیل + تله' }
  ],
  religion: [
    { id: 'verses-summary', label: 'خلاصه آیات و پیام‌ها', icon: '📖', desc: 'تمام آیات و پیام‌های کلیدی کتاب' },
    { id: 'exam-1404', label: 'خرداد ۱۴۰۴ — مو‌به‌مو', icon: '🎯', desc: '۲۷ سؤال عین امتحان با تحلیل دقیق' },
    { id: 'common-mistakes', label: 'اشتباهات رایج', icon: '⚠️', desc: 'جاهایی که دانش‌آموز بلد است ولی نمره می‌دهد' }
  ],
  arabic: [
    { id: 'grammar-rules', label: 'خلاصه قواعد', icon: '📐', desc: 'تمام قواعد نحو و صرف کتاب درسی' },
    { id: 'exam-1404', label: 'تحلیل نهایی ۱۴۰۴', icon: '🎯', desc: '۱۵ سؤال خرداد با تحلیل موشکافانه' },
    { id: 'vocabulary', label: 'گنجینه لغت', icon: '💎', desc: 'واژه‌نامه کامل لغات عربی دوازدهم' }
  ]
};

export const EXAM_TURNS = {
  khordad: { id: 'khordad', label: 'خرداد' },
  shahrivar: { id: 'shahrivar', label: 'شهریور' },
  dey: { id: 'dey', label: 'دی' }
};

export const DIFFICULTY = {
  easy: { id: 'easy', label: 'آسان', level: 1 },
  medium: { id: 'medium', label: 'متوسط', level: 2 },
  hard: { id: 'hard', label: 'دشوار', level: 3 }
};

export function getModulesForSubject(subject) {
  return SUBJECT_MODULES[subject.moduleType] || [];
}
