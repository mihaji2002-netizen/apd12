import physics12Exp from './physics12-exp.js';
import physics12Math from './physics12-math.js';
import religion12 from './religion12.js';
import arabic12 from './arabic12.js';

export const subjects = [physics12Exp, physics12Math, religion12, arabic12];

export function getSubject(id) {
  return subjects.find(s => s.id === id);
}

export function searchContent(query, filters = {}) {
  const q = (query || '').trim().toLowerCase();
  if (!q) return [];

  const results = [];
  const match = (text) => (text || '').toLowerCase().includes(q);

  subjects.forEach(subject => {
    if (filters.subject && filters.subject !== subject.id) return;

    (subject.questions || []).forEach(question => {
      const text = [question.question, question.officialAnswer, question.topic, question.trap].join(' ');
      if (match(text)) results.push({
        type: 'سؤال', id: question.id, title: `سؤال ${question.number} — ${question.topic}`,
        url: `#/${subject.id}/exam-1404/${question.id}`
      });
    });

    (subject.formulas || []).forEach(f => {
      const text = [f.title, ...(f.items || [])].join(' ');
      if (match(text)) results.push({ type: 'فرمول', title: f.title, url: `#/${subject.id}/formulas` });
    });

    (subject.versesSummary || []).forEach(v => {
      if (match([v.verse, v.message, v.lesson].join(' '))) results.push({ type: 'آیه', title: v.verse, url: `#/${subject.id}/verses-summary` });
    });

    (subject.vocabulary || []).forEach(v => {
      if (match([v.word, v.meaning].join(' '))) results.push({ type: 'لغت', title: v.word, url: `#/${subject.id}/vocabulary` });
    });

    (subject.grammarRules || []).forEach(g => {
      if (match([g.lesson, ...(g.rules || [])].join(' '))) results.push({ type: 'قاعده', title: g.lesson, url: `#/${subject.id}/grammar-rules` });
    });
  });

  return results.slice(0, 30);
}
