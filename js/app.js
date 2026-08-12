/* ============================================================
   AI Presales Academy — app logic
   ============================================================ */
(function () {
  'use strict';

  var MODULES = (window.MODULES_1 || []).concat(window.MODULES_2 || []);
  var INTERVIEW = window.INTERVIEW_QUESTIONS || [];
  var STORE_KEY = 'paie-progress-v1';
  var state = loadState();
  var quizStats = {};          // moduleId -> { answered, correct }
  var celebrated = false;      // confetti guard

  /* ---------------- helpers ---------------- */
  function loadState() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveState() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
  }
  function lessonDone(mid, i) { return (state[mid] || []).indexOf(i) > -1; }
  function actDone(mid, i) { return (state['act-' + mid] || []).indexOf(i) > -1; }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  /* Inline SVG icon from the sprite in index.html (Lucide-style, no emoji). */
  function ICON(name) {
    return '<svg class="ic" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
  }
  /* Module header icons — sprite symbol per module id. */
  var MODULE_ICONS = {
    m0: 'target', m1: 'brain', m2: 'search', m3: 'refresh', m4: 'folder', m5: 'cpu',
    m6: 'database', m7: 'globe', m8: 'box', m9: 'ruler', m10: 'users', m11: 'file', m12: 'rocket'
  };
  function moduleIcon(m) { return ICON(MODULE_ICONS[m.id] || 'sparkles'); }

  /* ---------------- progress math ---------------- */
  function totals() {
    var tot = 0, done = 0, i;
    for (i = 0; i < MODULES.length; i++) { tot += MODULES[i].lessons.length; }
    for (i = 0; i < MODULES.length; i++) { done += (state[MODULES[i].id] || []).length; }
    return { tot: tot, done: done };
  }
  function pct() {
    var t = totals();
    return t.tot ? Math.round((t.done / t.tot) * 100) : 0;
  }
  function modulePct(m) {
    return m.lessons.length ? Math.round(((state[m.id] || []).length / m.lessons.length) * 100) : 0;
  }

  /* ---------------- render: nav ---------------- */
  function renderNav() {
    var nav = document.getElementById('nav');
    var html = '<div class="nav-label">Syllabus</div>' +
      '<a class="nav-item anchor" href="#overview"><span class="nav-num">' + ICON('home') + '</span>Overview</a>';
    MODULES.forEach(function (m) {
      var done = (state[m.id] || []).length === m.lessons.length;
      html += '<a class="nav-item' + (done ? ' is-done' : '') + '" href="#' + m.id + '">' +
        '<span class="nav-num">' + m.num + '</span><span>' + esc(m.title.replace(/&amp;/g, '&')) + '</span>' +
        '<span class="nav-dot">' + ICON('check') + '</span></a>';
    });
    html += '<div class="nav-divider"></div>' +
      '<a class="nav-item anchor" href="#flashcards"><span class="nav-num">' + ICON('refresh') + '</span>Flashcards' +
      (srsDueCount() ? ' <span class="nav-badge">' + srsDueCount() + '</span>' : '') + '</a>' +
      '<a class="nav-item anchor" href="#interview"><span class="nav-num">' + ICON('mic') + '</span>Mock Interview</a>' +
      '<a class="nav-item anchor" href="#cheatsheet"><span class="nav-num">' + ICON('file') + '</span>Cheat Sheet</a>';
    nav.innerHTML = html;
  }

  /* ---------------- render: modules ---------------- */
  function lessonBody(l, idx) {
    var done = lessonDone(l.mid, idx);
    return '<details class="lesson" data-mid="' + l.mid + '" data-li="' + idx + '"' + (done ? ' data-done' : '') + '>' +
      '<summary><span class="l-num">' + String(idx + 1).padStart(2, '0') + '</span>' +
      '<span class="l-title">' + esc(l.title) + '</span>' +
      '<button type="button" class="l-check" title="Mark lesson complete" aria-label="Mark lesson complete">' + ICON('check') + '</button></summary>' +
      '<div class="l-body">' + l.body + '</div></details>';
  }

  function flipCards(terms) {
    return '<div class="terms-grid">' + terms.map(function (t) {
      return '<div class="flip" role="button" tabindex="0" aria-label="Flip card: ' + esc(t.term) + '"><div class="flip-inner">' +
        '<div class="flip-face flip-front">' + esc(t.term) + '</div>' +
        '<div class="flip-face flip-back">' + esc(t.def) + '</div>' +
        '</div></div>';
    }).join('') + '</div>';
  }

  function quizHTML(m) {
    var s = quizStats[m.id] || { answered: 0, correct: 0 };
    return '<div class="quiz" data-mid="' + m.id + '">' + m.quiz.map(function (q, qi) {
      return '<div class="quiz-q" data-qi="' + qi + '">' +
        '<p class="quiz-question">' + (qi + 1) + '. ' + esc(q.q) + '</p>' +
        '<div class="quiz-opts">' + q.options.map(function (o, oi) {
          return '<button class="quiz-opt" data-oi="' + oi + '">' + esc(o) + '</button>';
        }).join('') + '</div>' +
        '<p class="quiz-explain hidden" aria-live="polite"></p></div>';
    }).join('') +
      (s.answered === 0
        ? '<p class="quiz-retake">Not attempted yet — pick an answer below.</p>'
        : '<p class="quiz-retake">Quiz score: ' + s.answered + ' answered, ' + s.correct + ' correct. ' +
          '<button class="btn btn-ghost" data-retake="' + m.id + '">' + ICON('rotate') + ' Retake quiz</button></p>') +
      '</div>';
  }

  function activityHTML(m) {
    var a = m.activity;
    return '<ul class="act-steps" data-mid="' + m.id + '">' + a.steps.map(function (st, i) {
      var done = actDone(m.id, i);
      return '<li class="' + (done ? 'done' : '') + '"><input type="checkbox" data-ai="' + i + '"' + (done ? ' checked' : '') + '><span>' + esc(st) + '</span></li>';
    }).join('') + '</ul>' +
      '<div class="act-goal">' + ICON('flag') + ' Goal: ' + esc(a.goal) + '</div>';
  }

  function resourcesHTML(m) {
    return '<div class="res-list">' + m.resources.map(function (r) {
      return '<div class="res-item"><a href="' + esc(r.url) + '" target="_blank" rel="noopener">' + ICON('arrow-up-right') + ' ' + esc(r.label) + '</a>' +
        '<span class="res-note">' + esc(r.note) + '</span></div>';
    }).join('') + '</div>';
  }

  function moduleHTML(m, i) {
    var p = modulePct(m);
    var qs = quizStats[m.id] || { answered: 0, correct: 0 };
    var prev = i > 0 ? MODULES[i - 1] : null;
    var next = i < MODULES.length - 1 ? MODULES[i + 1] : null;
    var navHTML = '<nav class="ms-nav">' +
      (prev ? '<a class="btn btn-ghost" href="#' + prev.id + '">' + ICON('chevron-left') + ' Module ' + prev.num + '</a>' : '<span></span>') +
      (next ? '<a class="btn btn-ghost" href="#' + next.id + '">Module ' + next.num + ' ' + ICON('chevron-right') + '</a>' : '<span></span>') +
      '</nav>';
      return '<section class="module-section" id="' + m.id + '" data-search="' +
        esc((m.title + ' ' + m.tagline + ' ' + m.lessons.map(function (l) { return l.title; }).join(' ')).toLowerCase()) + '">' +
        '<header class="ms-head">' +
        '<div class="ms-icon" style="color:' + m.color + ';border-color:' + m.color + '44">' + moduleIcon(m) + '</div>' +
        '<div class="ms-meta">' +
        '<div class="ms-num">MODULE ' + m.num + '</div>' +
        '<h3 class="ms-title">' + m.title + '</h3>' +
        '<div class="ms-tagline">' + m.tagline + '</div></div>' +
        '<div class="ms-badges">' +
        '<span class="ms-chip">' + m.week + '</span>' +
        '<div class="ms-progress"><div class="gp-bar"><div class="gp-fill" style="width:' + p + '%"></div></div>' +
        '<span class="ms-progress-text">' + (state[m.id] || []).length + '/' + m.lessons.length + ' lessons</span></div>' +
        '<span class="ms-quizchip">' + ICON('clipboard') + ' Quiz ' + qs.correct + '/' + qs.answered + '</span>' +
        '</div></header>' +
        '<div class="ms-body">' +

        '<div class="ms-block"><div class="ms-block-title">' + ICON('target') + ' Objectives</div><ul class="obj-list">' +
        m.objectives.map(function (o) { return '<li>' + esc(o) + '</li>'; }).join('') + '</ul></div>' +

        (window.DIAGRAMS && window.DIAGRAMS[m.id]
          ? '<div class="ms-block"><div class="ms-block-title">' + ICON('map') + ' Module at a glance</div>' + renderDiagram(window.DIAGRAMS[m.id], m.color) + '</div>'
          : '') +

        '<div class="ms-block"><div class="ms-block-title">' + ICON('book') + ' Lessons — click to open, check when done</div><div class="lesson-list">' +
        m.lessons.map(function (l, i) { return lessonBody({ mid: m.id, title: l.title, body: l.body }, i); }).join('') + '</div></div>' +

        '<div class="ms-block"><div class="ms-block-title">' + ICON('layers') + ' Key terms — tap cards to flip</div>' + flipCards(m.terms) + '</div>' +

        '<div class="ms-block"><div class="ms-block-title">' + ICON('clipboard') + ' Quiz — 4 questions</div>' + quizHTML(m) + '</div>' +

        '<div class="ms-block"><div class="ms-block-title">' + ICON('wrench') + ' Activity</div>' + activityHTML(m) + '</div>' +

        '<div class="ms-block"><div class="ms-block-title">' + ICON('link') + ' Resources</div>' + resourcesHTML(m) + '</div>' +

        '</div>' + navHTML + '</section>';
  }

  function renderModules() {
    var host = document.getElementById('modules');
    host.innerHTML = MODULES.map(function (m, i) { return moduleHTML(m, i); }).join('');
  }

  /* ---------------- render: interview ---------------- */
  var interviewState = { cat: 'All', current: null, shownProbe: false, shownStruct: false, timer: null, seconds: 120 };
  var CATS = ['All'];

  function renderInterview() {
    // build category list
    CATS = ['All'];
    INTERVIEW.forEach(function (q) { if (CATS.indexOf(q.cat) < 0) CATS.push(q.cat); });

    var fh = '<button class="iq-chip' + (interviewState.cat === 'All' ? ' active' : '') + '" data-cat="All">All</button>' +
      CATS.slice(1).map(function (c) {
        return '<button class="iq-chip' + (interviewState.cat === c ? ' active' : '') + '" data-cat="' + esc(c) + '">' + esc(c) + '</button>';
      }).join('');
    document.getElementById('iqFilters').innerHTML = fh;

    updateCounter();
    drawQuestion();
  }

  function filteredQuestions() {
    return interviewState.cat === 'All'
      ? INTERVIEW
      : INTERVIEW.filter(function (q) { return q.cat === interviewState.cat; });
  }

  function drawQuestion() {
    var pool = filteredQuestions();
    if (!pool.length) { interviewState.current = null; return; }
    var q;
    if (pool.length === 1) { q = pool[0]; }
    else {
      var guard = 0;
      do { q = pool[Math.floor(Math.random() * pool.length)]; guard++; }
      while (interviewState.current && q === interviewState.current && guard < 10);
    }
    interviewState.current = q;
    interviewState.shownProbe = false;
    interviewState.shownStruct = false;
    document.getElementById('iqCard').innerHTML =
      '<span class="iq-cat">' + esc(q.cat) + '</span>' +
      '<p class="iq-question">' + esc(q.q) + '</p>' +
      '<div class="iq-reveal probe hidden" id="iqProbe"><b>' + ICON('bulb') + ' What they are really probing</b><p>' + esc(q.probe) + '</p></div>' +
      '<div class="iq-reveal struct hidden" id="iqStruct"><b>' + ICON('puzzle') + ' A strong answer structure</b><ul>' +
      q.structure.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></div>';
    updateCounter();
  }

  function updateCounter() {
    var pool = filteredQuestions();
    document.getElementById('iqCounter').textContent =
      interviewState.current
        ? 'Current: ' + esc(interviewState.current.cat) + ' · ' + pool.length + ' questions in this pool'
        : pool.length + ' questions in this pool · press Draw';
  }

  function setTimerBtn(running) {
    var b = document.getElementById('iqTimerBtn');
    if (b) {
      b.innerHTML = ICON('timer') + (running ? ' Stop timer' : ' Start 2-min timer');
      b.setAttribute('aria-pressed', running ? 'true' : 'false');
    }
  }
  function stopTimer(resetDisplay) {
    if (interviewState.timer) { clearInterval(interviewState.timer); interviewState.timer = null; }
    setTimerBtn(false);
    if (resetDisplay) { interviewState.seconds = 120; updateTimerDisplay(); }
  }
  function startTimer() {
    if (interviewState.timer) { clearInterval(interviewState.timer); interviewState.timer = null; }
    setTimerBtn(true);
    interviewState.seconds = 120;
    updateTimerDisplay();
    interviewState.timer = setInterval(function () {
      interviewState.seconds--;
      if (interviewState.seconds <= 0) {
        clearInterval(interviewState.timer);
        interviewState.timer = null;
        setTimerBtn(false);
        interviewState.seconds = 0;
      }
      updateTimerDisplay();
    }, 1000);
  }
  function updateTimerDisplay() {
    var el = document.getElementById('iqTimer');
    var m = Math.floor(interviewState.seconds / 60);
    var s = interviewState.seconds % 60;
    el.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    el.classList.toggle('low', interviewState.seconds <= 30 && interviewState.seconds > 0);
  }

  /* ---------------- global UI ---------------- */
  function updateUI() {
    var t = totals();
    var p = pct();
    var fill = document.getElementById('gpFill');
    var txt = document.getElementById('gpText');
    fill.style.width = p + '%';
    txt.textContent = p + '%';

    document.getElementById('statModules').textContent = MODULES.length;
    document.getElementById('statLessons').textContent = t.tot;
    document.getElementById('statQuiz').textContent = MODULES.reduce(function (a, m) { return a + m.quiz.length; }, 0);
    document.getElementById('statInterview').textContent = INTERVIEW.length;
    document.getElementById('statCards').textContent = deck.length;

    renderRoadmap();  // keep the learning-flow done-states in sync with progress

    MODULES.forEach(function (m) {
      var link = document.querySelector('.nav-item[href="#' + m.id + '"]');
      if (link) link.classList.toggle('is-done', (state[m.id] || []).length === m.lessons.length);
    });

    if (p === 100 && !celebrated && t.tot > 0) {
      celebrated = true;
      confetti();
      setTimeout(function () { celebrated = false; }, 4000);
    }
  }

  /* ---------------- confetti ---------------- */
  function confetti() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var colors = ['#22d3ee', '#818cf8', '#e879f9', '#34d399', '#fbbf24', '#f87171'];
    for (var i = 0; i < 80; i++) {
      var d = document.createElement('div');
      d.className = 'confetti';
      d.style.left = Math.random() * 100 + 'vw';
      d.style.background = colors[Math.floor(Math.random() * colors.length)];
      d.style.animationDuration = (1.6 + Math.random() * 1.6) + 's';
      d.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
      document.body.appendChild(d);
      (function (el) { setTimeout(function () { el.remove(); }, 4000); })(d);
    }
  }

  /* ---------------- search ---------------- */
  function applySearch() {
    var q = (document.getElementById('searchInput').value || '').trim().toLowerCase();
    var sections = document.querySelectorAll('.module-section');
    var visible = 0;
    sections.forEach(function (s) {
      var hit = !q || (s.getAttribute('data-search') || '').indexOf(q) > -1;
      s.style.display = hit ? '' : 'none';
      if (hit) visible++;
    });
    document.getElementById('searchCount').textContent = q
      ? (visible === 0
        ? 'No matches — try “RAG”, “VRAM”, “NVLink” or “RFP”.'
        : visible + ' of ' + sections.length + ' modules')
      : '';
  }

  /* ---------------- diagrams (SVG) ---------------- */
  var diagramSeq = 0;
  function renderDiagram(d, color) {
    if (!d || !d.nodes || !d.nodes.length) return '';
    var seq = diagramSeq++;
    var W = d.width || 900, H = d.height || 180;
    var markerId = 'darr' + seq;
    function nodeById(id) {
      for (var i = 0; i < d.nodes.length; i++) if (d.nodes[i].id === id) return d.nodes[i];
      return null;
    }
    var es = (d.edges || []).map(function (e) {
      var a = nodeById(e.a), b = nodeById(e.b);
      if (!a || !b) return '';
      var ax, ay, bx, by;
      var overlap = !(b.x > a.x + a.w || b.x + b.w < a.x);
      if (overlap && b.y > a.y) { ax = a.x + a.w / 2; ay = a.y + a.h; bx = b.x + b.w / 2; by = b.y; }
      else if (overlap && b.y < a.y) { ax = a.x + a.w / 2; ay = a.y; bx = b.x + b.w / 2; by = b.y + b.h; }
      else if (b.x > a.x) { ax = a.x + a.w; ay = a.y + a.h / 2; bx = b.x; by = b.y + b.h / 2; }
      else { ax = a.x; ay = a.y + a.h / 2; bx = b.x + b.w; by = b.y + b.h / 2; }
      var path;
      if (e.curve === 'top') {
        var topY = Math.min(a.y, b.y) - 46;
        path = 'M ' + ax + ' ' + ay + ' C ' + ax + ' ' + topY + ', ' + bx + ' ' + topY + ', ' + bx + ' ' + by;
      } else {
        var mx = (ax + bx) / 2;
        path = 'M ' + ax + ' ' + ay + ' C ' + mx + ' ' + ay + ', ' + mx + ' ' + by + ', ' + bx + ' ' + by;
      }
      var labelX = (ax + bx) / 2;
      var labelY;
      if (e.curve === 'top') labelY = Math.min(a.y, b.y) - 34;   // arc: below the loop top
      else if (ay === by) labelY = ay - 8;                        // horizontal: above the line
      else labelY = (ay + by) / 2;                                // vertical/diagonal: midpoint, clear of nodes
      return '<path d="' + path + '" class="d-edge" marker-end="url(#' + markerId + ')"/>' +
        (e.label ? '<text x="' + labelX + '" y="' + labelY + '" class="d-elabel" text-anchor="middle">' + esc(e.label) + '</text>' : '');
    }).join('');
    var ns = d.nodes.map(function (n, i) {
      var hasIcon = !!n.icon;
      var tx = hasIcon ? 34 : n.w / 2;
      var ta = hasIcon ? 'start' : 'middle';
      return '<g class="d-node" style="--di:' + i + '" transform="translate(' + n.x + ',' + n.y + ')">' +
        '<rect width="' + n.w + '" height="' + n.h + '" rx="11" class="d-rect"/>' +
        (n.icon ? '<use href="#i-' + esc(n.icon) + '" x="11" y="' + (n.h / 2 - 10) + '" width="20" height="20" class="d-icon"/>' : '') +
        (n.label ? '<text x="' + tx + '" y="' + (n.h / 2 - 4) + '" class="d-label" text-anchor="' + ta + '">' + esc(n.label) + '</text>' : '') +
        (n.sub ? '<text x="' + tx + '" y="' + (n.h / 2 + 14) + '" class="d-sub" text-anchor="' + ta + '">' + esc(n.sub) + '</text>' : '') +
        '</g>';
    }).join('');
    return '<div class="diagram" style="--dc:' + (color || '#818cf8') + '">' +
      '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="' + esc(d.caption || 'module diagram') + '">' +
      '<defs><marker id="' + markerId + '" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">' +
      '<path d="M0,0 L7,3.5 L0,7 Z" class="d-arrow"/></marker></defs>' +
      es + ns + '</svg>' +
      (d.caption ? '<p class="d-caption">' + esc(d.caption) + '</p>' : '') +
      '</div>';
  }

  /* ---------------- roadmap (learning flow) ---------------- */
  var ROADMAP_PHASES = [
    { name: 'Foundations', weeks: 'Wk 0–1', ids: ['m0', 'm1'] },
    { name: 'AI & Data', weeks: 'Wk 2–4', ids: ['m2', 'm3', 'm4'] },
    { name: 'Infrastructure', weeks: 'Wk 5–8', ids: ['m5', 'm6', 'm7', 'm8'] },
    { name: 'Sizing & BOM', weeks: 'Wk 9', ids: ['m9'] },
    { name: 'Presales & RFPs', weeks: 'Wk 10–11', ids: ['m10', 'm11'] },
    { name: 'Launch', weeks: 'Wk 12', ids: ['m12'] }
  ];
  function renderRoadmap() {
    var host = document.getElementById('roadmapApp');
    if (!host) return;
    var html = ROADMAP_PHASES.map(function (p, pi) {
      var pills = p.ids.map(function (id) {
        var m = null, i;
        for (i = 0; i < MODULES.length; i++) if (MODULES[i].id === id) m = MODULES[i];
        if (!m) return '';
        var done = (state[id] || []).length === m.lessons.length;
        return '<a class="rp-pill' + (done ? ' done' : '') + '" href="#' + id + '" style="--dc:' + m.color + '">' +
          '<span class="rp-num">' + m.num + '</span>' +
          '<span class="rp-icon">' + moduleIcon(m) + '</span>' +
          '<span class="rp-t">' + esc(m.title.replace(/&amp;/g, '&')) + '</span></a>';
      }).join('');
      return '<div class="rp-phase"><div class="rp-head"><span class="rp-name">' + esc(p.name) + '</span>' +
        '<span class="rp-weeks">' + esc(p.weeks) + '</span></div><div class="rp-pills">' + pills + '</div></div>';
    }).join('<div class="rp-arrow" aria-hidden="true">' + ICON('chevron-right') + '</div>');
    host.innerHTML = html;
  }

  /* ---------------- spaced repetition (SM-2) ---------------- */
  var SRS_KEY = 'paie-srs-v1';
  var NEW_PER_DAY = 20;
  var DAY_MS = 86400000;
  var deck = [];
  MODULES.forEach(function (m) {
    m.terms.forEach(function (t, i) {
      deck.push({ id: m.id + '::' + i, moduleId: m.id, term: t.term, def: t.def });
    });
  });
  var srs = loadSRS();
  var srsSession = { active: false, queue: [], idx: 0, revealed: false, reviewed: 0, relearned: 0 };

  function loadSRS() {
    try {
      var raw = JSON.parse(localStorage.getItem(SRS_KEY));
      if (raw && raw.cards && raw.meta) return raw;
    } catch (e) {}
    return { meta: { day: '', newDone: 0 }, cards: {} };
  }
  function saveSRS() { try { localStorage.setItem(SRS_KEY, JSON.stringify(srs)); } catch (e) {} }
  function todayKey() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function ensureDay() { var k = todayKey(); if (srs.meta.day !== k) { srs.meta.day = k; srs.meta.newDone = 0; } }
  function isNew(c) { return !srs.cards[c.id]; }
  function isDue(c) { var s = srs.cards[c.id]; return !!s && s.due <= Date.now(); }
  function dueCards() {
    return deck.filter(isDue).sort(function (a, b) { return srs.cards[a.id].due - srs.cards[b.id].due; });
  }
  function srsDueCount() { return dueCards().length; }
  function newCardsAvail() {
    ensureDay();
    return deck.filter(isNew).slice(0, Math.max(0, NEW_PER_DAY - srs.meta.newDone));
  }
  function reviewedToday() {
    var start = new Date(); start.setHours(0, 0, 0, 0);
    var n = 0;
    deck.forEach(function (c) { var s = srs.cards[c.id]; if (s && s.last >= start.getTime()) n++; });
    return n;
  }
  function nextReview() {
    var min = Infinity;
    deck.forEach(function (c) { var s = srs.cards[c.id]; if (s && s.due > Date.now() && s.due < min) min = s.due; });
    return isFinite(min) ? fmtDue(min) : '—';
  }
  function fmtDue(ts) {
    var diff = ts - Date.now();
    if (diff < 0) return 'relearning';
    var days = Math.round(diff / DAY_MS);
    if (days <= 0) return 'today';
    if (days === 1) return 'tomorrow';
    if (days < 30) return 'in ' + days + 'd';
    var d = new Date(ts);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return d.getDate() + ' ' + months[d.getMonth()];
  }
  function applyGrade(card, quality) {
    var s = srs.cards[card.id] || { ease: 2.5, interval: 0, reps: 0, due: 0 };
    if (quality < 3) { s.reps = 0; s.interval = 0; s.due = Date.now() + 10 * 60000; }
    else {
      // Easy skips ahead on the first two reviews; otherwise standard SM-2 ladder
      if (s.reps === 0) s.interval = quality === 5 ? 4 : 1;
      else if (s.reps === 1) s.interval = quality === 5 ? 16 : 6;
      else s.interval = Math.round(s.interval * s.ease);
      s.reps++;
      s.ease = Math.max(1.3, s.ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
      s.due = Date.now() + s.interval * DAY_MS;
    }
    s.last = Date.now();
    srs.cards[card.id] = s;
  }
  function startSRS() {
    ensureDay();
    var queue = dueCards().map(function (c) { return c.id; });
    newCardsAvail().forEach(function (c) { queue.push(c.id); });
    srsSession = { active: queue.length > 0, queue: queue, idx: 0, revealed: false, reviewed: 0, relearned: 0 };
    renderFlashcards();
  }
  function srsReveal() { if (srsSession.active && !srsSession.revealed) { srsSession.revealed = true; renderFlashcards(); } }
  function srsGrade(button) {
    if (!srsSession.active || !srsSession.revealed) return;
    var id = srsSession.queue[srsSession.idx];
    var card = null, i;
    for (i = 0; i < deck.length; i++) { if (deck[i].id === id) { card = deck[i]; break; } }
    if (!card) return;
    var wasNew = isNew(card);
    var quality = button === 0 ? 1 : button === 1 ? 4 : 5;
    ensureDay();
    applyGrade(card, quality);
    if (wasNew) srs.meta.newDone++;
    srsSession.reviewed++;
    if (button === 0) { srsSession.relearned++; srsSession.queue.push(id); }
    srsSession.idx++;
    srsSession.revealed = false;   // next card starts hidden
    if (srsSession.idx >= srsSession.queue.length) { srsSession.active = false; }
    saveSRS();
    renderNav();
    renderFlashcards();
  }
  function renderFlashcards() {
    var host = document.getElementById('srsApp');
    var browseWasOpen = false;
    var prevBrowse = host.querySelector('details.srs-browse');
    if (prevBrowse) browseWasOpen = !!prevBrowse.open;
    var newCount = deck.filter(isNew).length;
    var due = dueCards().length;
    var avail = newCardsAvail().length;
    var stats = '<div class="srs-stats">' +
      '<div class="srs-stat"><b>' + deck.length + '</b><span>total cards</span></div>' +
      '<div class="srs-stat"><b>' + due + '</b><span>due now</span></div>' +
      '<div class="srs-stat"><b>' + avail + '</b><span>new today (max ' + NEW_PER_DAY + '/day)</span></div>' +
      '<div class="srs-stat"><b>' + reviewedToday() + '</b><span>reviewed today</span></div>' +
      '<div class="srs-stat"><b>' + nextReview() + '</b><span>next review</span></div>' +
      '</div>';

    var cardHTML = '';
    if (srsSession.active) {
      var card = null, i, mod = null;
      for (i = 0; i < deck.length; i++) { if (deck[i].id === srsSession.queue[srsSession.idx]) { card = deck[i]; break; } }
      MODULES.forEach(function (m) { if (m.id === card.moduleId) mod = m; });
      var pos = Math.min(srsSession.idx + 1, srsSession.queue.length);
      var meta = '<div class="srs-meta"><span>MODULE ' + mod.num + '</span><span>' + pos + ' of ' + srsSession.queue.length + '</span></div>';
      if (!srsSession.revealed) {
        cardHTML = '<div class="srs-card" data-srs-action="reveal" role="button" tabindex="0">' +
          meta +
          '<div class="srs-front">' + esc(card.term) + '</div>' +
          '<div class="srs-hint">Click the card or press <kbd>Space</kbd> to reveal the answer</div></div>';
      } else {
        cardHTML = '<div class="srs-card revealed">' +
          meta +
          '<div class="srs-front">' + esc(card.term) + '</div>' +
          '<div class="srs-back">' + esc(card.def) + '</div>' +
          '<div class="srs-grades">' +
          '<button class="srs-grade again" data-srs-grade="0"><b>1</b> Again<small>relearn in 10 min</small></button>' +
          '<button class="srs-grade good" data-srs-grade="1"><b>2</b> Good<small>advance interval</small></button>' +
          '<button class="srs-grade easy" data-srs-grade="2"><b>3</b> Easy<small>longer gap</small></button>' +
          '</div>' +
          '<div class="srs-hint">Press <kbd>1</kbd>, <kbd>2</kbd> or <kbd>3</kbd> to grade</div></div>';
      }
    } else {
      cardHTML = '<div class="srs-empty">' +
        (srsSession.reviewed > 0
          ? '<p class="srs-done-title">' + ICON('trophy') + ' Session complete</p><p>' + srsSession.reviewed + ' reviewed · ' + srsSession.relearned + ' relearned · next review ' + nextReview() + '</p>'
          : (due === 0 && newCount === 0
            ? '<p>All ' + deck.length + ' cards are scheduled. Nothing due right now — come back for your next review.</p>'
            : '<p>You have <b>' + (due + avail) + ' cards ready</b>: ' + due + ' due now, ' + avail + ' new today. Hit Start to begin.</p>')) +
        '</div>';
    }

    var browse = '<details class="srs-browse"' + (browseWasOpen ? ' open' : '') + '><summary>Browse all ' + deck.length + ' cards</summary>' +
      '<div class="table-wrap"><table class="cs-table"><thead><tr><th>Term</th><th>Module</th><th>Status</th></tr></thead><tbody>' +
      deck.map(function (c) {
        var s = srs.cards[c.id];
        var status = !s ? 'New' : (s.interval === 0 ? 'Relearning' : fmtDue(s.due) + ' · ' + s.interval + 'd interval');
        var modName = '';
        MODULES.forEach(function (m) { if (m.id === c.moduleId) modName = m.num; });
        return '<tr><td>' + esc(c.term) + '</td><td>M' + modName + '</td><td>' + status + '</td></tr>';
      }).join('') +
      '</tbody></table></div></details>';

    host.innerHTML =
      '<div class="srs-toolbar">' +
      '<button class="btn btn-primary" data-srs-start>' + ICON('play') + ' Start session (' + (due + avail) + ')</button>' +
      '<button class="btn btn-ghost" data-srs-reset>' + ICON('rotate') + ' Reset flashcard progress</button>' +
      '</div>' +
      stats + cardHTML + browse +
      '<p class="srs-foot">SM-2 algorithm — intervals 1d → 6d → interval × ease, with <b>Easy</b> skipping ahead (4d → 16d). <b>Again</b> drops a card back to a 10-minute relearn. Grade honestly — the card is scheduled so it returns right before you\u2019d forget it.</p>';
  }

  /* ---------------- events ---------------- */
  document.addEventListener('click', function (e) {
    var el;

    // flip cards
    el = e.target.closest('.flip');
    if (el) { el.classList.toggle('flipped'); return; }

    // lesson completion toggle (via the check mark only)
    el = e.target.closest('.l-check');
    if (el) {
      e.preventDefault();
      var detailsEl = el.closest('.lesson');
      var mid = detailsEl.getAttribute('data-mid');
      var li = parseInt(detailsEl.getAttribute('data-li'), 10);
      var arr = state[mid] || [];
      var k = arr.indexOf(li);
      if (k > -1) { arr.splice(k, 1); detailsEl.removeAttribute('data-done'); el.setAttribute('aria-label', 'Mark lesson complete'); }
      else { arr.push(li); detailsEl.setAttribute('data-done', ''); el.setAttribute('aria-label', 'Mark lesson incomplete'); }
      state[mid] = arr;
      saveState();
      updateUI();
      var sec = document.getElementById(mid);
      if (sec) {
        var m = MODULES.filter(function (x) { return x.id === mid; })[0];
        var p = modulePct(m);
        var gp = sec.querySelector('.ms-progress .gp-fill');
        var gt = sec.querySelector('.ms-progress-text');
        if (gp) gp.style.width = p + '%';
        if (gt) gt.textContent = (state[mid] || []).length + '/' + m.lessons.length + ' lessons';
      }
      return;
    }

    // quiz answer
    el = e.target.closest('.quiz-opt');
    if (el) {
      var qWrap = el.closest('.quiz-q');
      var mid2 = el.closest('.quiz').getAttribute('data-mid');
      var qi = parseInt(qWrap.getAttribute('data-qi'), 10);
      var m2 = MODULES.filter(function (x) { return x.id === mid2; })[0];
      var qq = m2.quiz[qi];
      var opts = qWrap.querySelectorAll('.quiz-opt');
      var stats = quizStats[mid2] || (quizStats[mid2] = { answered: 0, correct: 0 });
      stats.answered++;
      var wasCorrect = parseInt(el.getAttribute('data-oi'), 10) === qq.correct;
      if (wasCorrect) stats.correct++;
      opts.forEach(function (o) {
        o.disabled = true;
        if (parseInt(o.getAttribute('data-oi'), 10) === qq.correct) o.classList.add('correct');
      });
      if (!wasCorrect) el.classList.add('wrong');
      var ex = qWrap.querySelector('.quiz-explain');
      ex.textContent = '✓ ' + qq.options[qq.correct] + ' — ' + qq.explain;
      ex.classList.remove('hidden');
      // update chip + retake footer
      var chip = qWrap.closest('.module-section').querySelector('.ms-quizchip');
      if (chip) chip.innerHTML = ICON('clipboard') + ' Quiz ' + stats.correct + '/' + stats.answered;
      var rt = qWrap.closest('.quiz').querySelector('.quiz-retake');
      if (rt) rt.innerHTML = 'Quiz score: ' + stats.answered + ' answered, ' + stats.correct + ' correct. ' +
        '<button class="btn btn-ghost" data-retake="' + mid2 + '">' + ICON('rotate') + ' Retake quiz</button>';
      return;
    }

    // retake quiz — re-render only that module's section
    el = e.target.closest('[data-retake]');
    if (el) {
      var rid = el.getAttribute('data-retake');
      quizStats[rid] = { answered: 0, correct: 0 };
      var sec2 = document.getElementById(rid);
      if (sec2) {
        var mm = MODULES.filter(function (x) { return x.id === rid; })[0];
        var tmp = document.createElement('div');
        tmp.innerHTML = moduleHTML(mm, MODULES.indexOf(mm));
        if (tmp.firstChild && sec2.parentNode) sec2.parentNode.replaceChild(tmp.firstChild, sec2);
        var newSec = document.getElementById(rid);
        if (newSec) {
          newSec.classList.add('in');
          newSec.querySelectorAll('.diagram').forEach(function (dg) { dg.classList.add('in'); });
        }
        if (newSec) initSpy();  // re-bind scrollspy to the replaced section
        if (newSec) newSec.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // SRS flashcards
    el = e.target.closest('[data-srs-start]');
    if (el) { startSRS(); return; }
    el = e.target.closest('[data-srs-action="reveal"]');
    if (el) { srsReveal(); return; }
    el = e.target.closest('[data-srs-grade]');
    if (el) { srsGrade(parseInt(el.getAttribute('data-srs-grade'), 10)); return; }
    el = e.target.closest('[data-srs-reset]');
    if (el) {
    if (confirm('Reset all flashcard progress?')) {
      srs = { meta: { day: '', newDone: 0 }, cards: {} };
      srsSession = { active: false, queue: [], idx: 0, revealed: false, reviewed: 0, relearned: 0 };
      saveSRS();
      renderNav();
      renderFlashcards();
    }
      return;
    }

    // interview filters
    el = e.target.closest('.iq-chip');
    if (el) {
      interviewState.cat = el.getAttribute('data-cat');
      stopTimer(true);
      document.querySelectorAll('.iq-chip').forEach(function (c) { c.classList.toggle('active', c === el); });
      updateCounter();
      drawQuestion();
      return;
    }
    if (e.target.id === 'iqNext') {
      stopTimer(true);
      drawQuestion();
      return;
    }
    if (e.target.id === 'iqRevealProbe') {
      var pr = document.getElementById('iqProbe');
      if (pr) pr.classList.remove('hidden');
      return;
    }
    if (e.target.id === 'iqRevealStruct') {
      var st = document.getElementById('iqStruct');
      if (st) st.classList.remove('hidden');
      return;
    }
    if (e.target.id === 'iqTimerBtn') {
      if (interviewState.timer) { stopTimer(true); }
      else { startTimer(); }
      return;
    }
  });

  document.addEventListener('change', function (e) {
    var cb = e.target.closest('input[type=checkbox][data-ai]');
    if (!cb) return;
    var li = cb.closest('li');
    var mid = cb.closest('ul').getAttribute('data-mid');
    var ai = parseInt(cb.getAttribute('data-ai'), 10);
    var key = 'act-' + mid;
    var arr = state[key] || [];
    var k = arr.indexOf(ai);
    if (cb.checked) { if (k < 0) arr.push(ai); li.classList.add('done'); }
    else { if (k > -1) arr.splice(k, 1); li.classList.remove('done'); }
    state[key] = arr;
    saveState();
  });

  document.addEventListener('input', function (e) {
    if (e.target.id === 'searchInput') applySearch();
  });

  // keyboard support for flip cards (Enter / Space)
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    if (!e.target || !e.target.closest) return;
    var fl = e.target.closest('.flip');
    if (fl) { e.preventDefault(); fl.classList.toggle('flipped'); }
  });

  // keyboard shortcuts for SRS session (Space reveal / grade, 1-3 grade)
  document.addEventListener('keydown', function (e) {
    if (!srsSession.active) return;
    var tag = document.activeElement && document.activeElement.tagName ? document.activeElement.tagName : '';
    if (tag === 'BUTTON' || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if (e.target && e.target.closest && e.target.closest('.flip')) return; // flip-card handler owns those
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (srsSession.revealed) { srsGrade(1); } else { srsReveal(); }
    } else if (e.key === '1' && srsSession.revealed) { srsGrade(0); }
    else if (e.key === '2' && srsSession.revealed) { srsGrade(1); }
    else if (e.key === '3' && srsSession.revealed) { srsGrade(2); }
  });

  document.getElementById('printBtn').addEventListener('click', function () {
    var lessons = document.querySelectorAll('details.lesson, details.srs-browse');
    var wasOpen = [];
    lessons.forEach(function (d) { wasOpen.push(d.open); d.open = true; });
    var restore = function () {
      lessons.forEach(function (d, i) { d.open = wasOpen[i]; });
      if (window.removeEventListener) window.removeEventListener('afterprint', restore);
    };
    setTimeout(function () {
      if (window.addEventListener) window.addEventListener('afterprint', restore);
      window.print();
      setTimeout(restore, 30000); // safety net if afterprint doesn't fire (long enough to not collapse while the dialog is open)
    }, 150);
  });

  // activity rows: clicking anywhere on the row toggles its checkbox
  document.addEventListener('click', function (e) {
    var li = e.target.closest('.act-steps li');
    if (li && !e.target.closest('input')) {
      var cb = li.querySelector('input[type=checkbox]');
      if (cb) cb.click();
    }
  });

  document.getElementById('resetBtn').addEventListener('click', function () {
    if (confirm('Reset all progress on this syllabus?')) {
      try { localStorage.removeItem(STORE_KEY); } catch (e) {}
      state = {};
      quizStats = {};
      renderModules();
      renderNav();
      revealAll();
      updateUI();
    }
  });

  function revealAll() {
    document.querySelectorAll('.module-section, .diagram, .roadmap-section').forEach(function (el) { el.classList.add('in'); });
  }

  // back-to-top button
  var toTop = document.getElementById('toTopBtn');
  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.addEventListener('scroll', function () {
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      toTop.classList.toggle('show', y > 600);
    }, { passive: true });
  }

  // scrollspy: highlight the sidebar item of the module currently in view
  var spy = null;
  function initSpy() {
    var spySections = document.querySelectorAll('.module-section, .page-section, .roadmap-section, #overview');
    if (!('IntersectionObserver' in window) || !spySections.length) return;
    if (spy) { spy.disconnect(); }
    spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var target = en.target.id;
        document.querySelectorAll('.nav-item').forEach(function (link) {
          var href = link.getAttribute('href');
          link.classList.toggle('is-active', href === '#' + target);
        });
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    spySections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------------- mobile drawer ---------------- */
  var navToggle = document.getElementById('navToggle');
  var navClose = document.getElementById('navClose');
  var sidebarEl = document.getElementById('sidebar');
  var scrim = document.getElementById('navScrim');
  function setNav(open) {
    if (!sidebarEl) return;
    sidebarEl.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
    if (scrim) scrim.classList.toggle('show', open);
    if (navToggle) { navToggle.setAttribute('aria-expanded', open ? 'true' : 'false'); navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); }
    if (navClose) { navClose.setAttribute('aria-expanded', open ? 'true' : 'false'); }
  }
  if (navToggle) navToggle.addEventListener('click', function () { setNav(!sidebarEl.classList.contains('open')); });
  if (navClose) navClose.addEventListener('click', function () { setNav(false); });
  if (scrim) scrim.addEventListener('click', function () { setNav(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setNav(false);
  });
  // close the drawer after choosing a nav destination
  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('.sidebar .nav-item')) setNav(false);
  });

  /* ---------------- PWA install ---------------- */
  var deferredPrompt = null;
  var installBtn = document.getElementById('installBtn');
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) installBtn.classList.remove('hidden');
  });
  window.addEventListener('appinstalled', function () {
    if (installBtn) installBtn.classList.add('hidden');
    deferredPrompt = null;
  });
  if (installBtn) installBtn.addEventListener('click', function () {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function () {
      deferredPrompt = null;
      if (installBtn) installBtn.classList.add('hidden');
    });
  });

  /* ---------------- service worker (offline app mode) ---------------- */
  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }

  /* ---------------- boot ---------------- */
  renderNav();
  renderModules();
  renderInterview();
  renderFlashcards();
  renderRoadmap();
  updateUI();
  updateTimerDisplay();

  initSpy();

  // scroll-reveal: fade sections and diagram nodes in as they enter the viewport
  var revealEls = document.querySelectorAll('.module-section, .diagram, .roadmap-section');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }
})();
