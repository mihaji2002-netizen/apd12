import { subjects, getSubject, searchContent } from './data/index.js';
import { MODULES } from './data/schema.js';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

let state = {
  subject: 'physics12',
  module: 'home',
  detailId: null,
  searchQuery: '',
  filters: {}
};

const MODULE_ROUTES = {
  'smart-book': 'smartBook',
  'archive': 'archive',
  'analysis': 'analysis',
  'traps': 'traps',
  'flashcards': 'flashcards',
  'night-before': 'nightBefore'
};

const MODULE_PATHS = Object.fromEntries(
  Object.entries(MODULE_ROUTES).map(([path, mod]) => [mod, path])
);

function parseHash() {
  const parts = (location.hash || '#/').slice(2).split('/').filter(Boolean);
  if (!parts.length) return { subject: null, module: 'home', detailId: null };
  const subject = parts[0];
  const mod = parts[1] ? (MODULE_ROUTES[parts[1]] || 'home') : 'home';
  const detailId = parts[2] || null;
  return { subject, module: mod, detailId };
}

function navigate(subject, module = 'home', detailId = null) {
  let path = '#/';
  if (subject) {
    path += subject;
    if (module && module !== 'home') {
      const routeKey = Object.entries(MODULE_ROUTES).find(([, v]) => v === module)?.[0] || module;
      path += '/' + routeKey;
      if (detailId) path += '/' + detailId;
    }
  }
  location.hash = path;
}

function render() {
  const parsed = parseHash();
  state = { ...state, ...parsed };

  const app = $('#app');
  if (!app) return;

  if (!state.subject) {
    app.innerHTML = renderHome();
    bindHome();
    return;
  }

  const subject = getSubject(state.subject);
  if (!subject) {
    app.innerHTML = `<div class="empty fade-in"><p>درس یافت نشد.</p><a href="#/">بازگشت</a></div>`;
    return;
  }

  app.innerHTML = renderShell(subject);
  bindShell(subject);
  renderModule(subject);
}

function renderHome() {
  const activeCards = subjects.filter(s => s.active).map(s => `
    <a href="#/${s.id}" class="card card-click fade-in" style="border-top:3px solid ${s.color}">
      <div class="card-tag">پایه ${s.grade} — ${s.bookCode}</div>
      <div class="card-title">${s.name}</div>
      <div class="card-text">پرونده محرمانه امتحان نهایی — ${s.meta?.totalQuestions || '—'} سؤال رسمی</div>
      <div class="card-meta">
        <span class="badge badge-gold">${s.meta?.examDuration || 80} دقیقه</span>
        <span class="badge">${s.lessons?.length || 0} درس</span>
        <span class="badge">${s.questions?.length || 0} سؤال استخراج‌شده</span>
      </div>
    </a>
  `).join('');

  const soonCards = subjects.filter(s => !s.active).map(s => `
    <div class="card fade-in" style="border-top:3px solid ${s.color};opacity:0.55">
      <div class="card-tag">به‌زودی</div>
      <div class="card-title">${s.name}</div>
      <div class="card-text">در فاز بعدی اضافه می‌شود.</div>
    </div>
  `).join('');

  const activeCount = subjects.filter(s => s.active).length;

  return `
    <div class="content" style="max-width:1100px;margin:0 auto">
      <div class="hero-panel fade-in">
        <div class="page-eyebrow">PEPSINO LAB</div>
        <h1 class="page-title">پرونده محرمانه<br>امتحان نهایی دوازدهم</h1>
        <p class="page-desc">اگر فقط چند روز تا امتحان مانده، دقیقاً بدان چه بخوانی و چه نخوانی. فقط امتحان نهایی — نه کنکور، نه المپیاد.</p>
        <div class="hero-stat-row">
          <div class="hero-stat"><div class="num">${activeCount}</div><div class="lbl">درس فعال</div></div>
          <div class="hero-stat"><div class="num">۱۴۰۴</div><div class="lbl">تمرکز اصلی</div></div>
          <div class="hero-stat"><div class="num">۶</div><div class="lbl">ماژول تخصصی</div></div>
        </div>
      </div>
      <div class="grid-2">${activeCards}</div>
      ${soonCards ? `<div class="page-header" style="margin-top:32px"><div class="page-eyebrow">فاز بعدی</div><h2 class="page-title" style="font-size:1.25rem">دروس در راه</h2></div><div class="grid-2">${soonCards}</div>` : ''}
    </div>`;
}

function bindHome() {}

function renderShell(subject) {
  const navItems = Object.values(MODULES).map(m => {
    const modId = MODULE_ROUTES[m.id] || m.id;
    const active = state.module === modId ? 'active' : '';
    return `<a href="#/${subject.id}/${m.id}" class="nav-item ${active}"><span class="nav-dot"></span>${m.label}</a>`;
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
          <div class="brand-title">پرونده نهایی</div>
          <div class="brand-sub">محرمانه — فقط برای ۲۰</div>
        </div>
        <a href="#/" class="nav-item"><span class="nav-dot"></span>مرکز فرمان</a>
        <div class="nav-label">دروس</div>
        ${subjectPills}
        <div class="nav-label">ماژول‌ها — ${subject.shortName}</div>
        ${navItems}
      </aside>
      <div class="main">
        <header class="topbar">
          <button class="menu-btn" id="menuBtn" aria-label="منو">☰</button>
          <div class="search-wrap">
            <input type="search" class="search-input" id="searchInput" placeholder="جستجو: درس، سؤال، فرمول، آیه..." value="${state.searchQuery}">
            <span class="search-icon">⌕</span>
          </div>
          <div class="topbar-meta">${subject.name} · ${subject.bookCode}</div>
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

  let searchTimer;
  $('#searchInput')?.addEventListener('input', (e) => {
    clearTimeout(searchTimer);
    state.searchQuery = e.target.value;
    searchTimer = setTimeout(() => showSearchResults(subject), 300);
  });
}

function showSearchResults(subject) {
  if (!state.searchQuery.trim()) {
    renderModule(subject);
    return;
  }
  const results = searchContent(state.searchQuery, { subject: subject.id });
  const el = $('#moduleContent');
  if (!el) return;
  el.innerHTML = `
    <div class="page-header fade-in">
      <div class="page-eyebrow">جستجو</div>
      <h1 class="page-title">${results.length} نتیجه برای «${state.searchQuery}»</h1>
    </div>
    <div class="grid-2">${results.map(r => `
      <a href="${r.url}" class="card card-click">
        <div class="card-tag" style="color:${r.color}">${r.subject} · ${r.type}</div>
        <div class="card-title">${r.title}</div>
      </a>
    `).join('') || '<div class="empty">نتیجه‌ای یافت نشد.</div>'}
    </div>`;
}

function renderModule(subject) {
  const el = $('#moduleContent');
  if (!el) return;

  const mod = state.module;
  if (mod === 'home' || !mod) {
    el.innerHTML = renderSubjectHome(subject);
    return;
  }
  if (mod === 'smartBook') {
    el.innerHTML = state.detailId ? renderLessonDetail(subject, state.detailId) : renderSmartBook(subject);
    return;
  }
  if (mod === 'archive') {
    el.innerHTML = state.detailId ? renderQuestionDetail(subject, state.detailId) : renderArchive(subject);
    if (!state.detailId) bindArchiveFilters(subject);
    return;
  }
  if (mod === 'analysis') { el.innerHTML = renderAnalysis(subject); return; }
  if (mod === 'traps') { el.innerHTML = renderTraps(subject); return; }
  if (mod === 'flashcards') { el.innerHTML = renderFlashcards(subject); return; }
  if (mod === 'nightBefore') { el.innerHTML = renderNightBefore(subject); return; }
}

function renderSubjectHome(subject) {
  const modules = [
    { key: 'smart-book', label: 'کتاب هوشمند', desc: 'هر درس: توضیح امتحانی، تله، فرمول، ارجاع' },
    { key: 'archive', label: 'آرشیو امتحان', desc: 'سؤالات رسمی با پاسخ و تحلیل' },
    { key: 'analysis', label: 'تحلیل ۱۴۰۴', desc: 'موضوعات تکراری و روند دشواری' },
    { key: 'traps', label: 'بانک تله‌ها', desc: 'جاهایی که نمره می‌پره' },
    { key: 'flashcards', label: 'فلش‌کارت', desc: 'مرور فشرده با تله و مثال امتحان' },
    { key: 'night-before', label: 'شب امتحان', desc: 'چک‌لیست آخر — فقط ضروری‌ها' }
  ];

  return `
    <div class="page-header fade-in">
      <div class="page-eyebrow" style="color:${subject.color}">${subject.bookCode}</div>
      <h1 class="page-title">${subject.name}</h1>
      <p class="page-desc">امتحان نهایی · ${subject.meta?.examDuration} دقیقه · ${subject.meta?.totalBarom} نمره</p>
    </div>
    <div class="grid-3">${modules.map(m => `
      <a href="#/${subject.id}/${m.key}" class="card card-click">
        <div class="card-title">${m.label}</div>
        <div class="card-text">${m.desc}</div>
      </a>
    `).join('')}</div>`;
}

function renderSmartBook(subject) {
  const lessons = subject.lessons || [];
  return `
    <div class="page-header fade-in">
      <div class="page-eyebrow">کتاب هوشمند</div>
      <h1 class="page-title">از کجای کتاب بخوانی؟</h1>
      <p class="page-desc">فقط آنچه در امتحان نهایی می‌آید — نه کل کتاب.</p>
    </div>
    <div class="grid-2">${lessons.map(l => `
      <a href="#/${subject.id}/smart-book/${l.id}" class="card card-click">
        <div class="card-tag">درس ${l.order} · ${l.bookPages}</div>
        <div class="card-title">${l.title}</div>
        <div class="card-text">${l.shortExplanation.slice(0, 120)}...</div>
        <div class="card-meta"><span class="badge badge-gold">${l.importance}</span></div>
      </a>
    `).join('')}</div>`;
}

function renderLessonDetail(subject, lessonId) {
  const lesson = subject.lessons?.find(l => l.id === lessonId);
  if (!lesson) return '<div class="empty">درس یافت نشد.</div>';

  return `
    <div class="lesson-detail fade-in">
      <a href="#/${subject.id}/smart-book" class="badge" style="display:inline-block;margin-bottom:16px">← بازگشت</a>
      <div class="page-header">
        <div class="page-eyebrow">درس ${lesson.order} · ${lesson.bookPages}</div>
        <h1 class="page-title">${lesson.title}</h1>
      </div>
      <div class="detail-block"><div class="detail-label">توضیح کوتاه</div><p>${lesson.shortExplanation}</p></div>
      <div class="detail-block"><div class="detail-label">توضیح امتحانی</div><p>${lesson.examExplanation}</p></div>
      <div class="detail-block trap"><div class="detail-label">تله رایج</div><p>${lesson.commonTrap}</p></div>
      <div class="detail-block"><div class="detail-label">جمله/آیه/قاعده مهم</div><p>${lesson.importantSentence}</p></div>
      <div class="detail-block tip"><div class="detail-label">فرمول / قاعده / آیه</div><p>${lesson.formulaOrRule}</p></div>
      <div class="detail-block tip"><div class="detail-label">نکته امتحان</div><p>${lesson.examTip}</p></div>
      <div class="detail-block"><div class="detail-label">ارتباط با امتحان‌های قبلی</div><ul>${(lesson.examConnections || []).map(c => `<li>${c}</li>`).join('')}</ul></div>
    </div>`;
}

function renderArchive(subject) {
  const questions = subject.questions || [];
  const years = [...new Set(questions.map(q => q.year))].sort((a, b) => b - a);
  const f = state.filters;
  const yearActive = f.year || '';
  const diffActive = f.difficulty || '';
  const nightActive = f.nightBefore || '';

  return `
    <div class="page-header fade-in">
      <div class="page-eyebrow">آرشیو امتحان نهایی</div>
      <h1 class="page-title">سؤالات رسمی</h1>
      <p class="page-desc">با پاسخ رسمی، تحلیل و ارجاع کتاب.</p>
    </div>
    <div class="filters">
      <button class="filter-btn ${yearActive === '' ? 'active' : ''}" data-filter="year" data-value="">همه سال‌ها</button>
      ${years.map(y => `<button class="filter-btn ${yearActive === String(y) ? 'active' : ''}" data-filter="year" data-value="${y}">${y}</button>`).join('')}
    </div>
    <div class="filters" style="margin-top:8px">
      <button class="filter-btn ${diffActive === '' ? 'active' : ''}" data-filter="difficulty" data-value="">همه سطح‌ها</button>
      <button class="filter-btn ${diffActive === 'easy' ? 'active' : ''}" data-filter="difficulty" data-value="easy">آسان</button>
      <button class="filter-btn ${diffActive === 'medium' ? 'active' : ''}" data-filter="difficulty" data-value="medium">متوسط</button>
      <button class="filter-btn ${diffActive === 'hard' ? 'active' : ''}" data-filter="difficulty" data-value="hard">سخت</button>
      <button class="filter-btn ${nightActive === 'true' ? 'active' : ''}" data-filter="nightBefore" data-value="true">شب امتحان</button>
    </div>
    <div class="grid-2" id="questionGrid">${questions.map(q => `
      <a href="#/${subject.id}/archive/${q.id}" class="card card-click question-card" data-year="${q.year}" data-difficulty="${q.difficulty}" data-night="${q.nightBefore}">
        <div class="card-tag">خرداد ${q.year} · ${q.barom} نمره</div>
        <div class="card-title">سؤال ${q.number} — ${q.topic}</div>
        <div class="card-text">${q.question.slice(0, 100)}...</div>
        <div class="card-meta">
          <span class="badge">${q.difficulty}</span>
          ${q.nightBefore ? '<span class="badge badge-red">شب امتحان</span>' : ''}
        </div>
      </a>
    `).join('')}</div>`;
}

function bindArchiveFilters(subject) {
  $$('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.filter;
      const value = btn.dataset.value;
      if (!key) return;
      state.filters = { ...state.filters, [key]: value };
      const el = $('#moduleContent');
      if (el) {
        el.innerHTML = renderArchive(subject);
        bindArchiveFilters(subject);
        applyArchiveFilters();
      }
    });
  });
  applyArchiveFilters();
}

function applyArchiveFilters() {
  const f = state.filters;
  $$('.question-card').forEach(card => {
    const year = card.dataset.year;
    const diff = card.dataset.difficulty;
    const night = card.dataset.night;
    const show =
      (!f.year || f.year === year) &&
      (!f.difficulty || f.difficulty === diff) &&
      (!f.nightBefore || f.nightBefore === night);
    card.style.display = show ? '' : 'none';
  });
}

function renderQuestionDetail(subject, qId) {
  const q = subject.questions?.find(x => x.id === qId);
  if (!q) return '<div class="empty">سؤال یافت نشد.</div>';
  const lesson = subject.lessons?.find(l => l.id === q.lessonId);

  return `
    <div class="question-detail fade-in">
      <a href="#/${subject.id}/archive" class="badge" style="display:inline-block;margin-bottom:16px">← بازگشت</a>
      <div class="page-header">
        <div class="page-eyebrow">سؤال ${q.number} · ${q.turn} ${q.year} · ${q.barom} نمره</div>
        <h1 class="page-title">${q.topic}</h1>
      </div>
      <div class="detail-block"><div class="detail-label">متن سؤال</div><p>${q.question}</p></div>
      <div class="detail-block tip"><div class="detail-label">پاسخ رسمی</div><p>${q.officialAnswer}</p></div>
      <div class="detail-block"><div class="detail-label">تحلیل</div><p>${q.explanation}</p></div>
      <div class="detail-block"><div class="detail-label">ارجاع کتاب</div><p>${q.bookRef}${lesson ? ` — ${lesson.title}` : ''}</p></div>
      <div class="card-meta" style="margin-top:16px">
        <span class="badge">${q.difficulty}</span>
        <span class="badge">تکرار: ${q.frequency}/۵</span>
        ${(q.tags || []).map(t => `<span class="badge">${t}</span>`).join('')}
      </div>
    </div>`;
}

function renderAnalysis(subject) {
  const a = subject.analysis1404 || {};
  return `
    <div class="page-header fade-in">
      <div class="page-eyebrow">تحلیل ۱۴۰۴</div>
      <h1 class="page-title">الگوی امتحان خرداد ۱۴۰۴</h1>
      <p class="page-desc">فقط بر اساس امتحان‌های آپلودشده — بدون آمار ساختگی.</p>
    </div>
    <div class="grid-2">
      <div class="card"><div class="card-title">موضوعات تکراری</div><ul class="night-list">${(a.repeatedTopics || []).map(t => `<li>${t}</li>`).join('')}</ul></div>
      <div class="card"><div class="card-title">الگوهای جدید</div><ul class="night-list">${(a.newPatterns || []).map(t => `<li>${t}</li>`).join('')}</ul></div>
      <div class="card"><div class="card-title">روند دشواری</div><p class="card-text">${a.difficultyTrend || '—'}</p></div>
      <div class="card"><div class="card-title">مفاهیم پرتکرار</div><ul class="night-list">${(a.highFrequency || []).map(t => `<li>${t}</li>`).join('')}</ul></div>
    </div>`;
}

function renderTraps(subject) {
  const traps = subject.traps || [];
  return `
    <div class="page-header fade-in">
      <div class="page-eyebrow">بانک تله‌ها</div>
      <h1 class="page-title">جاهایی که نمره می‌پره</h1>
      <p class="page-desc">دانش‌آموز بلد است، ولی نمره از دست می‌دهد.</p>
    </div>
    <div class="grid-2">${traps.map(t => `
      <div class="card">
        <div class="card-tag badge-red">${t.type}</div>
        <div class="card-title">${t.title}</div>
        <div class="detail-block trap" style="margin-top:12px"><div class="detail-label">چرا نمره می‌پره؟</div><p>${t.whyLoseMarks}</p></div>
        <div class="detail-block tip" style="margin-top:8px"><div class="detail-label">چطور جلوگیری کنی؟</div><p>${t.howToAvoid}</p></div>
        <div class="card-meta"><span class="badge">${t.examEvidence}</span></div>
      </div>
    `).join('')}</div>`;
}

function renderFlashcards(subject) {
  const cards = subject.flashcards || [];
  setTimeout(() => {
    $$('.flashcard').forEach(card => {
      card.addEventListener('click', () => card.classList.toggle('flipped'));
    });
  }, 0);

  return `
    <div class="page-header fade-in">
      <div class="page-eyebrow">گنجینه فلش‌کارت</div>
      <h1 class="page-title">مرور فشرده</h1>
      <p class="page-desc">روی کارت بزن تا پشت را ببینی.</p>
    </div>
    <div class="flashcard-grid">${cards.map(f => `
      <div class="flashcard">
        <div class="flashcard-inner">
          <div class="flashcard-face"><div class="fc-front">${f.front}</div><div class="fc-meta"><span class="badge">${f.sourcePage}</span><span class="badge badge-gold">تکرار ${f.examFrequency}</span></div></div>
          <div class="flashcard-face flashcard-back"><div class="fc-back">${f.back}</div><div class="fc-meta"><span class="badge badge-red">تله: ${f.commonTrap}</span><span class="badge">💡 ${f.memoryTrick}</span></div></div>
        </div>
      </div>
    `).join('')}</div>`;
}

function renderNightBefore(subject) {
  const n = subject.nightBefore || {};
  const trapMap = Object.fromEntries((subject.traps || []).map(t => [t.id, t]));
  const trapItems = (n.dangerousTraps || []).map(id => {
    const t = trapMap[id];
    return t ? `<li><a href="#/${subject.id}/traps">${t.title}</a> — ${t.howToAvoid}</li>` : `<li>${id}</li>`;
  }).join('');

  return `
    <div class="page-header fade-in">
      <div class="page-eyebrow">شب امتحان</div>
      <h1 class="page-title">فقط این‌ها — نه بیشتر</h1>
      <p class="page-desc">یک صفحه. آخرین مرور قبل از امتحان.</p>
    </div>
    <div class="night-grid">
      <div class="card night-card"><h3>باید بدانی</h3><ul class="night-list">${(n.mustKnow || []).map(i => `<li>${i}</li>`).join('')}</ul></div>
      <div class="card night-card"><h3>باید مرور کنی</h3><ul class="night-list">${(n.mustReview || []).map(i => `<li>${i}</li>`).join('')}</ul></div>
      <div class="card night-card"><h3>پرتکرارترین</h3><ul class="night-list">${(n.mostRepeated || []).map(i => `<li>${i}</li>`).join('')}</ul></div>
      <div class="card night-card"><h3>خطرناک‌ترین تله‌ها</h3><ul class="night-list">${trapItems || '<li>—</li>'}</ul></div>
      <div class="card night-card" style="grid-column:1/-1"><h3>چک‌لیست آخر</h3><ul class="night-list checklist">${(n.checklist || []).map(i => `<li>${i}</li>`).join('')}</ul></div>
    </div>`;
}

export function init() {
  window.addEventListener('hashchange', render);
  setTimeout(render, 400);
}

init();
