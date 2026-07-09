import { subjects, getSubject, searchContent } from './data/index.js';
import { getModulesForSubject } from './data/schema.js';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

let state = {
  subject: null,
  module: 'home',
  detailId: null,
  searchQuery: '',
  vocabFilter: ''
};

const MODULE_ROUTES = {
  'formulas': 'formulas',
  'exam-stats': 'examStats',
  'exam-1404': 'exam1404',
  'verses-summary': 'versesSummary',
  'common-mistakes': 'commonMistakes',
  'grammar-rules': 'grammarRules',
  'vocabulary': 'vocabulary'
};

function parseHash() {
  const parts = (location.hash || '#/').slice(2).split('/').filter(Boolean);
  if (!parts.length) return { subject: null, module: 'home', detailId: null };
  const subject = parts[0];
  const mod = parts[1] ? (MODULE_ROUTES[parts[1]] || 'home') : 'home';
  const detailId = parts[2] || null;
  return { subject, module: mod, detailId };
}

function render() {
  const parsed = parseHash();
  state = { ...state, ...parsed };

  const app = $('#app');
  if (!app) return;

  if (!state.subject) {
    app.innerHTML = renderHome();
    return;
  }

  const subject = getSubject(state.subject);
  if (!subject) {
    app.innerHTML = `<div class="content empty fade-in"><p>درس یافت نشد.</p><a href="#/" class="badge">بازگشت</a></div>`;
    return;
  }

  app.innerHTML = renderShell(subject);
  bindShell(subject);
  renderModule(subject);
}

function renderHome() {
  const cards = subjects.filter(s => s.active).map(s => `
    <a href="#/${s.id}" class="card card-click fade-in">
      <span class="card-icon">${s.track === 'math' ? '📐' : s.track === 'exp' ? '🔬' : s.moduleType === 'religion' ? '📿' : '📚'}</span>
      <div class="card-tag">${s.bookCode} · پایه ${s.grade}</div>
      <div class="card-title">${s.name}</div>
      <div class="card-text">امتحان نهایی خرداد ۱۴۰۴ — ${s.meta?.totalQuestions || '—'} سؤال</div>
      <div class="card-meta">
        <span class="badge">${s.meta?.examDuration || 80} دقیقه</span>
        <span class="badge badge-gold">${s.meta?.totalBarom || 20} نمره</span>
      </div>
    </a>
  `).join('');

  return `
    <div class="content" style="max-width:1100px;margin:0 auto">
      <div class="hero-panel fade-in">
        <div class="page-eyebrow">PEPSINO LAB</div>
        <h1 class="page-title">آمادگی امتحان نهایی<br>پایه دوازدهم</h1>
        <p class="page-desc">تحلیل موشکافانه، فرمول‌ها، آیات، قواعد و سؤالات عین امتحان خرداد ۱۴۰۴</p>
        <div class="hero-stat-row">
          <div class="hero-stat"><div class="num">۴</div><div class="lbl">درس</div></div>
          <div class="hero-stat"><div class="num">۱۴۰۴</div><div class="lbl">تمرکز اصلی</div></div>
          <div class="hero-stat"><div class="num">۸۰+</div><div class="lbl">سؤال تحلیل‌شده</div></div>
        </div>
      </div>
      <div class="grid-2">${cards}</div>
    </div>`;
}

function renderShell(subject) {
  const modules = getModulesForSubject(subject);
  const navItems = modules.map(m => {
    const modId = MODULE_ROUTES[m.id] || m.id;
    const active = state.module === modId ? 'active' : '';
    return `<a href="#/${subject.id}/${m.id}" class="nav-item ${active}"><span class="nav-dot"></span>${m.icon} ${m.label}</a>`;
  }).join('');

  const subjectPills = subjects.filter(s => s.active).map(s =>
    `<a href="#/${s.id}" class="subject-pill ${s.id === subject.id ? 'active' : ''}"><span class="subject-dot" style="background:${s.color}"></span>${s.shortName}</a>`
  ).join('');

  return `
    <div class="overlay" id="overlay"></div>
    <div class="shell">
      <aside class="sidebar" id="sidebar">
        <div class="brand">
          <div class="brand-tag">PEPSINO LAB</div>
          <div class="brand-title">نهایی ۱۴۰۴</div>
          <div class="brand-sub">تحلیل · فرمول · تله</div>
        </div>
        <a href="#/" class="nav-item"><span class="nav-dot"></span>🏠 صفحه اصلی</a>
        <div class="nav-label">دروس</div>
        ${subjectPills}
        <div class="nav-label">${subject.shortName}</div>
        ${navItems}
      </aside>
      <div class="main">
        <header class="topbar">
          <button class="menu-btn" id="menuBtn" aria-label="منو">☰</button>
          <div class="search-wrap">
            <input type="search" class="search-input" id="searchInput" placeholder="جستجو..." value="${state.searchQuery}">
            <span class="search-icon">⌕</span>
          </div>
          <div class="topbar-meta">${subject.name}</div>
        </header>
        <main class="content" id="moduleContent"></main>
      </div>
    </div>`;
}

function bindShell(subject) {
  $('#menuBtn')?.addEventListener('click', () => {
    $('#sidebar')?.classList.toggle('open');
    $('#overlay')?.classList.toggle('open');
  });
  $('#overlay')?.addEventListener('click', () => {
    $('#sidebar')?.classList.remove('open');
    $('#overlay')?.classList.remove('open');
  });
  let t;
  $('#searchInput')?.addEventListener('input', (e) => {
    clearTimeout(t);
    state.searchQuery = e.target.value;
    t = setTimeout(() => showSearch(subject), 300);
  });
}

function showSearch(subject) {
  if (!state.searchQuery.trim()) { renderModule(subject); return; }
  const results = searchContent(state.searchQuery, { subject: subject.id });
  const el = $('#moduleContent');
  el.innerHTML = `
    <div class="page-header fade-in">
      <h1 class="page-title">${results.length} نتیجه</h1>
    </div>
    <div class="grid-2">${results.map(r => `
      <a href="${r.url}" class="card card-click">
        <div class="card-tag">${r.type}</div>
        <div class="card-title">${r.title}</div>
      </a>
    `).join('') || '<div class="empty">نتیجه‌ای نیست</div>'}</div>`;
}

function renderModule(subject) {
  const el = $('#moduleContent');
  if (!el) return;
  const mod = state.module;

  if (mod === 'home' || !mod) { el.innerHTML = renderSubjectHome(subject); return; }
  if (mod === 'formulas') { el.innerHTML = renderFormulas(subject); return; }
  if (mod === 'examStats') { el.innerHTML = renderExamStats(subject); return; }
  if (mod === 'exam1404') {
    el.innerHTML = state.detailId ? renderQuestionDetail(subject, state.detailId) : renderExam1404(subject);
    if (state.detailId) bindQuestionNav(subject);
    return;
  }
  if (mod === 'versesSummary') { el.innerHTML = renderVersesSummary(subject); return; }
  if (mod === 'commonMistakes') { el.innerHTML = renderCommonMistakes(subject); return; }
  if (mod === 'grammarRules') { el.innerHTML = renderGrammarRules(subject); return; }
  if (mod === 'vocabulary') { el.innerHTML = renderVocabulary(subject); bindVocabFilter(subject); return; }
}

function renderSubjectHome(subject) {
  const modules = getModulesForSubject(subject);
  return `
    <div class="page-header fade-in">
      <div class="page-eyebrow" style="color:${subject.color}">${subject.bookCode}</div>
      <h1 class="page-title">${subject.name}</h1>
      <p class="page-desc">امتحان نهایی · ${subject.meta?.examDuration} دقیقه · ${subject.meta?.totalBarom} نمره</p>
    </div>
    <div class="grid-2">${modules.map(m => `
      <a href="#/${subject.id}/${m.id}" class="card card-click">
        <span class="card-icon">${m.icon}</span>
        <div class="card-title">${m.label}</div>
        <div class="card-text">${m.desc}</div>
      </a>
    `).join('')}</div>`;
}

function renderFormulas(subject) {
  const formulas = subject.formulas || [];
  return `
    <div class="page-header fade-in">
      <div class="page-eyebrow">∑ فرمول‌ها</div>
      <h1 class="page-title">خلاصه فرمول‌های کل کتاب</h1>
      <p class="page-desc">${subject.bookCode} — ${formulas.length} فصل</p>
    </div>
    ${formulas.map(f => `
      <div class="formula-card fade-in">
        <h4>فصل ${f.chapter}: ${f.title}</h4>
        ${f.items.map(i => `<code>${i}</code>`).join('')}
      </div>
    `).join('')}`;
}

function renderExamStats(subject) {
  const s = subject.examStats || {};
  const topics = s.topicFrequency || [];
  return `
    <div class="page-header fade-in">
      <div class="page-eyebrow">📊 آمار</div>
      <h1 class="page-title">تحلیل آماری امتحانات نهایی</h1>
      <p class="page-desc">بر اساس ${s.yearsAnalyzed || '—'} — ${s.totalExams || '—'} امتحان</p>
    </div>
    <div class="card fade-in" style="margin-bottom:20px">
      <div class="card-title">روند دشواری</div>
      <p class="card-text">${s.difficultyTrend || '—'}</p>
      <div class="card-meta">
        <span class="badge">خرداد: ${s.turnComparison?.khordad || '—'}</span>
        <span class="badge">شهریور: ${s.turnComparison?.shahrivar || '—'}</span>
        <span class="badge">دی: ${s.turnComparison?.dey || '—'}</span>
      </div>
    </div>
    <div class="card fade-in">
      <div class="card-title">فراوانی موضوعات (%)</div>
      ${topics.map(t => `
        <div class="stat-bar">
          <div class="stat-bar-label"><span>${t.topic}</span><span>${t.percent}%</span></div>
          <div class="stat-bar-track"><div class="stat-bar-fill" style="width:${t.percent}%"></div></div>
        </div>
      `).join('')}
    </div>
    ${(s.baromDistribution || []).length ? `
      <div class="grid-2" style="margin-top:20px">
        ${s.baromDistribution.map(b => `
          <div class="card"><div class="card-title">${b.range}</div><div class="card-text">میانگین بارم: ${b.avgBarom}</div></div>
        `).join('')}
      </div>` : ''}`;
}

function renderExam1404(subject) {
  const qs = (subject.questions || []).filter(q => q.year === 1404 && q.turn === 'khordad');
  return `
    <div class="page-header fade-in">
      <div class="page-eyebrow">🎯 خرداد ۱۴۰۴</div>
      <h1 class="page-title">امتحان نهایی — سؤال‌به‌سؤال</h1>
      <p class="page-desc">${qs.length} سؤال عین متن امتحان + پاسخ رسمی + تحلیل + تله</p>
    </div>
    ${subject.exam1404Analysis?.sharpPoints ? `
      <div class="card fade-in" style="margin-bottom:20px;border-right:4px solid var(--orange)">
        <div class="card-title">نکات موشکافانه</div>
        <ul class="night-list">${subject.exam1404Analysis.sharpPoints.map(p => `<li>${p}</li>`).join('')}</ul>
      </div>` : ''}
    <div class="question-nav fade-in">
      ${qs.map(q => `
        <a href="#/${subject.id}/exam-1404/${q.id}" class="q-nav-btn" title="سؤال ${q.number}">${q.number}</a>
      `).join('')}
    </div>
    <div class="grid-2">${qs.map(q => `
      <a href="#/${subject.id}/exam-1404/${q.id}" class="card card-click">
        <div class="card-tag">سؤال ${q.number} · ${q.barom} نمره</div>
        <div class="card-title">${q.topic}</div>
        <div class="card-text">${q.question.slice(0, 120)}...</div>
        ${q.trap ? `<span class="badge badge-red">تله: ${q.trap.slice(0, 40)}</span>` : ''}
      </a>
    `).join('')}</div>`;
}

function renderQuestionDetail(subject, qId) {
  const qs = (subject.questions || []).filter(q => q.year === 1404);
  const idx = qs.findIndex(q => q.id === qId);
  const q = qs[idx];
  if (!q) return '<div class="empty">سؤال یافت نشد</div>';

  const prev = qs[idx - 1];
  const next = qs[idx + 1];
  const trap = q.trap || findTrapForQuestion(subject, q);

  return `
    <div class="fade-in">
      <div class="exam-progress">
        <span>سؤال ${q.number} از ${qs.length}</span>
        <span class="badge">${q.barom} نمره</span>
        <span class="badge">${q.difficulty}</span>
      </div>
      <div class="question-nav">
        ${qs.map(qq => `
          <a href="#/${subject.id}/exam-1404/${qq.id}" class="q-nav-btn ${qq.id === qId ? 'active' : ''}">${qq.number}</a>
        `).join('')}
      </div>
      <div class="page-header">
        <div class="page-eyebrow">خرداد ۱۴۰۴ · ${q.topic}</div>
        <h1 class="page-title">سؤال ${q.number}</h1>
      </div>
      <div class="detail-block"><div class="detail-label">📋 متن سؤال (عین امتحان)</div><p style="white-space:pre-wrap">${q.question}</p></div>
      <div class="detail-block tip"><div class="detail-label">✅ پاسخ رسمی</div><p style="white-space:pre-wrap">${q.officialAnswer}</p></div>
      <div class="detail-block"><div class="detail-label">🔍 تحلیل مو‌به‌مو</div><p>${q.explanation}</p></div>
      ${trap ? `<div class="detail-block trap"><div class="detail-label">⚠️ تله / اشتباه رایج</div><p>${trap}</p></div>` : ''}
      <div class="detail-block"><div class="detail-label">📖 ارجاع کتاب</div><p>${q.bookRef || '—'}</p></div>
      <div style="display:flex;gap:12px;margin-top:24px;flex-wrap:wrap">
        ${prev ? `<a href="#/${subject.id}/exam-1404/${prev.id}" class="badge">← سؤال ${prev.number}</a>` : ''}
        <a href="#/${subject.id}/exam-1404" class="badge">فهرست سؤالات</a>
        ${next ? `<a href="#/${subject.id}/exam-1404/${next.id}" class="badge">سؤال ${next.number} →</a>` : ''}
      </div>
    </div>`;
}

function findTrapForQuestion(subject, q) {
  if (q.trap) return q.trap;
  const trap = (subject.traps || []).find(t => t.examEvidence?.includes(String(q.number)));
  return trap ? `${trap.title}: ${trap.howToAvoid}` : null;
}

function bindQuestionNav(subject) {
  document.addEventListener('keydown', onKeyNav);
  function onKeyNav(e) {
    const qs = (subject.questions || []).filter(q => q.year === 1404);
    const idx = qs.findIndex(q => q.id === state.detailId);
    if (e.key === 'ArrowLeft' && qs[idx + 1]) location.hash = `#/${subject.id}/exam-1404/${qs[idx + 1].id}`;
    if (e.key === 'ArrowRight' && qs[idx - 1]) location.hash = `#/${subject.id}/exam-1404/${qs[idx - 1].id}`;
  }
}

function renderVersesSummary(subject) {
  const items = subject.versesSummary || [];
  return `
    <div class="page-header fade-in">
      <div class="page-eyebrow">📖 آیات و پیام‌ها</div>
      <h1 class="page-title">خلاصه کل آیات و پیام‌های کتاب</h1>
      <p class="page-desc">${items.length} آیه/پیام کلیدی</p>
    </div>
    <div class="grid-2">${items.map(v => `
      <div class="card">
        <div class="card-tag">${v.lesson} · ${v.page}</div>
        <div class="card-title" style="font-family:inherit">${v.verse}</div>
        <div class="card-text">${v.message}</div>
      </div>
    `).join('')}</div>`;
}

function renderCommonMistakes(subject) {
  const items = subject.commonMistakes || (subject.traps || []).map(t => ({
    title: t.title, wrong: t.description, correct: t.howToAvoid, examRef: t.examEvidence
  }));
  return `
    <div class="page-header fade-in">
      <div class="page-eyebrow">⚠️ اشتباهات</div>
      <h1 class="page-title">اشتباهات رایج امتحان نهایی</h1>
    </div>
    <div class="grid-2">${items.map(m => `
      <div class="card">
        <div class="card-title">${m.title}</div>
        <div class="detail-block trap" style="margin-top:12px"><div class="detail-label">❌ اشتباه</div><p>${m.wrong}</p></div>
        <div class="detail-block tip" style="margin-top:8px"><div class="detail-label">✅ درست</div><p>${m.correct}</p></div>
        <span class="badge">${m.examRef || ''}</span>
      </div>
    `).join('')}</div>`;
}

function renderGrammarRules(subject) {
  const rules = subject.grammarRules || [];
  return `
    <div class="page-header fade-in">
      <div class="page-eyebrow">📐 قواعد</div>
      <h1 class="page-title">خلاصه قواعد نحو و صرف</h1>
    </div>
    ${rules.map(r => `
      <div class="formula-card fade-in">
        <h4>${r.lesson}</h4>
        <ul class="night-list">${r.rules.map(rule => `<li>${rule}</li>`).join('')}</ul>
      </div>
    `).join('')}`;
}

function renderVocabulary(subject) {
  const all = subject.vocabulary || [];
  const q = (state.vocabFilter || '').trim().toLowerCase();
  const filtered = q ? all.filter(v =>
    [v.word, v.meaning, v.root, v.lesson].some(x => (x || '').toLowerCase().includes(q))
  ) : all;
  return `
    <div class="page-header fade-in">
      <div class="page-eyebrow">💎 گنجینه لغت</div>
      <h1 class="page-title">واژه‌نامه عربی دوازدهم</h1>
      <p class="page-desc">${all.length} واژه · ${filtered.length} نمایش</p>
    </div>
    <div class="search-wrap" style="max-width:400px;margin-bottom:20px">
      <input type="search" class="search-input" id="vocabSearch" placeholder="جستجوی لغت..." value="${state.vocabFilter}">
    </div>
    <div class="vocab-grid" id="vocabGrid">${filtered.map(v => `
      <div class="vocab-item">
        <div class="vocab-ar">${v.word}</div>
        <div class="vocab-fa">${v.meaning}</div>
        <div class="card-meta"><span class="badge">${v.lesson}</span><span class="badge">${v.root}</span></div>
      </div>
    `).join('') || '<div class="empty">یافت نشد</div>'}</div>`;
}

function bindVocabFilter(subject) {
  let t;
  $('#vocabSearch')?.addEventListener('input', (e) => {
    clearTimeout(t);
    state.vocabFilter = e.target.value;
    t = setTimeout(() => {
      const el = $('#moduleContent');
      if (el) { el.innerHTML = renderVocabulary(subject); bindVocabFilter(subject); }
    }, 200);
  });
}

window.addEventListener('hashchange', render);
setTimeout(render, 400);
