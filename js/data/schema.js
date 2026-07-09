/**
 * Pepsino Lab — Data Schema
 * Stable IDs for all content entities
 */

export const MODULES = {
  smartBook: { id: 'smart-book', label: 'کتاب هوشمند', icon: 'book' },
  archive: { id: 'archive', label: 'آرشیو امتحان نهایی', icon: 'archive' },
  analysis: { id: 'analysis', label: 'تحلیل ۱۴۰۴', icon: 'chart' },
  traps: { id: 'traps', label: 'بانک تله‌ها', icon: 'alert' },
  flashcards: { id: 'flashcards', label: 'گنجینه فلش‌کارت', icon: 'cards' },
  nightBefore: { id: 'night-before', label: 'شب امتحان', icon: 'moon' }
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

export const IMPORTANCE = {
  critical: { id: 'critical', label: 'حیاتی', stars: 5 },
  high: { id: 'high', label: 'بالا', stars: 4 },
  medium: { id: 'medium', label: 'متوسط', stars: 3 },
  low: { id: 'low', label: 'پایین', stars: 2 }
};

/**
 * @typedef {Object} Subject
 * @property {string} id
 * @property {string} name
 * @property {string} shortName
 * @property {string} grade
 * @property {string} bookCode
 * @property {string} color
 * @property {boolean} active
 */

/**
 * @typedef {Object} Lesson
 * @property {string} id
 * @property {string} subjectId
 * @property {number} order
 * @property {string} title
 * @property {string} bookPages
 * @property {string} shortExplanation
 * @property {string} examExplanation
 * @property {string} commonTrap
 * @property {string} importantSentence
 * @property {string} formulaOrRule
 * @property {string} examTip
 * @property {string[]} examConnections
 * @property {string} importance
 */

/**
 * @typedef {Object} ExamQuestion
 * @property {string} id
 * @property {string} subjectId
 * @property {number} year
 * @property {string} turn
 * @property {number} number
 * @property {string} question
 * @property {string} officialAnswer
 * @property {string} explanation
 * @property {string} bookRef
 * @property {string} difficulty
 * @property {number} barom
 * @property {string} topic
 * @property {string[]} tags
 * @property {string[]} similarIds
 * @property {string} lessonId
 * @property {number} frequency
 * @property {boolean} nightBefore
 */

/**
 * @typedef {Object} Trap
 * @property {string} id
 * @property {string} subjectId
 * @property {string} lessonId
 * @property {string} type
 * @property {string} title
 * @property {string} description
 * @property {string} whyLoseMarks
 * @property {string} howToAvoid
 * @property {string} examEvidence
 */

/**
 * @typedef {Object} Flashcard
 * @property {string} id
 * @property {string} subjectId
 * @property {string} lessonId
 * @property {string} front
 * @property {string} back
 * @property {string} importance
 * @property {string} sourcePage
 * @property {number} examFrequency
 * @property {string} commonTrap
 * @property {string} memoryTrick
 * @property {string} examExample
 * @property {Object} [extra] - subject-specific fields
 */
