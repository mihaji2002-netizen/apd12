import physics12 from './physics12.js';
import religion12 from './religion12.js';
import arabic12 from './arabic12.js';

const comingSoon = [
  { id: 'persian12', name: 'فارسی ۳', shortName: 'فارسی', grade: '12', bookCode: '—', color: '#8b5cf6', active: false, meta: { examDuration: 80, totalQuestions: 0, totalBarom: 20 }, lessons: [], questions: [] },
  { id: 'chemistry12', name: 'شیمی ۳', shortName: 'شیمی', grade: '12', bookCode: '—', color: '#10b981', active: false, meta: { examDuration: 80, totalQuestions: 0, totalBarom: 20 }, lessons: [], questions: [] },
  { id: 'biology12', name: 'زیست ۳', shortName: 'زیست', grade: '12', bookCode: '—', color: '#22c55e', active: false, meta: { examDuration: 80, totalQuestions: 0, totalBarom: 20 }, lessons: [], questions: [] },
  { id: 'english12', name: 'انگلیسی ۳', shortName: 'انگلیسی', grade: '12', bookCode: '—', color: '#3b82f6', active: false, meta: { examDuration: 80, totalQuestions: 0, totalBarom: 20 }, lessons: [], questions: [] }
];

export const subjects = [physics12, religion12, arabic12, ...comingSoon];

export function getSubject(id) {
  return subjects.find(s => s.id === id);
}

export function getAllQuestions() {
  return subjects.flatMap(s => (s.questions || []).map(q => ({ ...q, subjectName: s.name, subjectColor: s.color })));
}

export function getAllLessons() {
  return subjects.flatMap(s => (s.lessons || []).map(l => ({ ...l, subjectName: s.name, subjectColor: s.color })));
}

export function getAllTraps() {
  return subjects.flatMap(s => (s.traps || []).map(t => ({ ...t, subjectName: s.name, subjectColor: s.color })));
}

export function getAllFlashcards() {
  return subjects.flatMap(s => (s.flashcards || []).map(f => ({ ...f, subjectName: s.name, subjectColor: s.color })));
}

export function searchContent(query, filters = {}) {
  const q = (query || '').trim().toLowerCase();
  if (!q && !Object.keys(filters).length) return [];

  const results = [];
  const match = (text) => !q || (text || '').toLowerCase().includes(q);

  subjects.forEach(subject => {
    if (filters.subject && filters.subject !== subject.id) return;

    (subject.lessons || []).forEach(lesson => {
      if (filters.lesson && filters.lesson !== lesson.id) return;
      const text = [lesson.title, lesson.shortExplanation, lesson.examExplanation, lesson.formulaOrRule].join(' ');
      if (match(text)) results.push({ type: 'lesson', id: lesson.id, title: lesson.title, subject: subject.name, color: subject.color, url: `#/${subject.id}/smart-book/${lesson.id}` });
    });

    (subject.questions || []).forEach(question => {
      if (filters.year && filters.year !== question.year) return;
      if (filters.turn && filters.turn !== question.turn) return;
      if (filters.difficulty && filters.difficulty !== question.difficulty) return;
      const text = [question.question, question.officialAnswer, question.topic, ...(question.tags || [])].join(' ');
      if (match(text)) results.push({ type: 'question', id: question.id, title: `سؤال ${question.number} — ${question.year} ${question.turn}`, subject: subject.name, color: subject.color, url: `#/${subject.id}/archive/${question.id}` });
    });

    (subject.traps || []).forEach(trap => {
      const text = [trap.title, trap.description, trap.whyLoseMarks].join(' ');
      if (match(text)) results.push({ type: 'trap', id: trap.id, title: trap.title, subject: subject.name, color: subject.color, url: `#/${subject.id}/traps` });
    });

    (subject.flashcards || []).forEach(fc => {
      const text = [fc.front, fc.back, fc.memoryTrick].join(' ');
      if (match(text)) results.push({ type: 'flashcard', id: fc.id, title: fc.front, subject: subject.name, color: subject.color, url: `#/${subject.id}/flashcards` });
    });
  });

  return results.slice(0, 40);
}
