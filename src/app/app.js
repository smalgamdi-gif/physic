/* Physics Learning Lab — application logic (additional design). Works offline from a local file. */
(function () {
  'use strict';

  // ---------- state ----------
  const KEY = 'physics-learning-lab-v1';
  const blank = () => ({ lessons: {}, mistakes: [], cards: {}, exams: [], days: {}, plan: null, prefs: { ar: true, theme: 'light' } });
  let S;
  try { S = Object.assign(blank(), JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { S = blank(); }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage unavailable */ } };
  const today = () => new Date().toISOString().slice(0, 10);
  const L = id => (S.lessons[id] = S.lessons[id] || { checks: {}, quiz: {}, quizBest: null, tryit: null, visits: 0 });

  // study-time tracking: count active minutes
  let lastTick = Date.now();
  setInterval(() => {
    if (document.hidden) { lastTick = Date.now(); return; }
    const d = today(); S.days[d] = (S.days[d] || 0) + (Date.now() - lastTick) / 60000; lastTick = Date.now(); save();
  }, 30000);

  // ---------- helpers ----------
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const allLessons = () => COURSE.flatMap(c => c.lessons.map(l => Object.assign({ ch: c }, l)));
  const lessonById = id => allLessons().find(l => l.id === id);
  const isAdd = src => /🧩|additional design/i.test(src || '');
  const srcPill = src => isAdd(src) ? `<span class="pill add" title="Additional design: not from the course files">🧩 Additional design</span>` : `<span class="pill src" title="From the course files">📘 ${esc(src)}</span>`;
  const ADD = `<span class="pill add" title="Additional design: not from the course files">🧩 Additional design</span>`;
  const EXT = `<span class="pill ext" title="From Serway & Jewett, Physics for Scientists and Engineers, 9th ed.: reference 1 in your course book (BK p.179), not course content">🔗 External reference · Serway</span>`;
  const SW = id => (window.SERWAY || {})[id];
  const swItem = p => p.o ? { q: `<span class="muted" style="font-size:13px">Serway ${p.id} · PDF p.${p.page}</span><br>${p.q}`, o: p.o, a: p.a, why: `${p.sol}<br><b>Book answer:</b> ${p.ans}` } : { q: `<span class="muted" style="font-size:13px">Serway ${p.id} · PDF p.${p.page}</span><br>${p.q}`, num: p.num, tol: p.tol, unit: p.unit, sol: `${p.sol}<br><b>Book answer:</b> ${p.ans}` };
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const fmt = (x, d = 3) => { if (!isFinite(x)) return String(x); const a = Math.abs(x); if (a !== 0 && (a >= 1e5 || a < 1e-3)) return x.toExponential(d - 1).replace('e', ' × 10^').replace('+', ''); return String(+x.toPrecision(d + 1)); };

  function parseNum(str) {
    if (str == null) return NaN;
    let s = String(str).trim().replace(/\s+/g, '').replace(/,/g, '').replace(/−/g, '-');
    s = s.replace(/[×x*]10\^?\(?([+-]?\d+)\)?/i, 'e$1');
    const sup = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-' };
    s = s.replace(/[×x*]10([⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)/, (m, p) => 'e' + p.split('').map(c => sup[c]).join(''));
    if (!/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i.test(s)) return NaN;
    return parseFloat(s);
  }
  function numOk(given, ans, tol) {
    const t = tol && tol > 0 ? tol : 0.005;
    if (ans === 0) return Math.abs(given) < 1e-9;
    return Math.abs(given - ans) <= Math.abs(ans) * t + 1e-12;
  }

  function logMistake(item, given, lessonId) {
    S.mistakes.unshift({ q: item.q, given: String(given), correct: item.o ? item.o[item.a] : (fmt(item.num ?? item.ans) + ' ' + (item.unit || '')), sol: item.why || item.sol || '', lessonId: lessonId || null, ts: Date.now(), reviewed: false });
    S.mistakes = S.mistakes.slice(0, 300); save();
  }

  // Renders one question (MCQ or numeric). onDone(correct) fires once.
  function qHTML(item, key) {
    if (item.o) {
      return `<div class="q" data-key="${key}"><div class="qt">${item.q}</div><div class="opts">${item.o.map((o, i) => `<button class="opt" data-i="${i}">${String.fromCharCode(65 + i)}. ${o}</button>`).join('')}</div><div class="fbwrap"></div></div>`;
    }
    return `<div class="q" data-key="${key}"><div class="qt">${item.q}</div><div class="numin"><input type="text" inputmode="decimal" placeholder="e.g. 2.5 or 1.6e-19"> <span class="muted">${esc(item.unit || '')}</span> <button class="btn small chk">Check</button></div><div class="fbwrap"></div></div>`;
  }
  function wireQ(root, item, onDone, opts = {}) {
    const box = root.querySelector('.q');
    const fb = box.querySelector('.fbwrap');
    let done = false;
    const show = (ok, extra) => {
      fb.innerHTML = `<div class="fb ${ok ? 'ok' : 'bad'}">${ok ? '✔ Correct' : '✘ Not quite'}${extra ? ' — ' + extra : ''}${opts.hideSol ? '' : `<div class="sol">${item.why || item.sol || ''}</div>`}</div>`;
    };
    if (item.o) {
      let picked = null;
      const grade = b => {
        if (done) return; done = true;
        const i = +b.dataset.i, ok = i === item.a;
        box.querySelectorAll('.opt').forEach(x => { x.disabled = true; if (!opts.hideSol && +x.dataset.i === item.a) x.classList.add('right'); });
        if (!ok) b.classList.add('wrong'); else b.classList.add('right');
        if (opts.hideSol) b.style.outline = '2px solid var(--brand)';
        if (!opts.silent) show(ok, ok ? '' : 'correct answer: ' + String.fromCharCode(65 + item.a));
        onDone && onDone(ok, item.o[i]);
      };
      box.querySelectorAll('.opt').forEach(b => b.onclick = () => {
        if (done) return;
        if (!opts.deferred) return grade(b);
        box.querySelectorAll('.opt').forEach(x => x.classList.remove('sel')); b.classList.add('sel'); picked = b;
      });
      return { check: () => { if (done) return true; if (!picked) { fb.innerHTML = `<div class="hint">No answer chosen yet.</div>`; return false; } grade(picked); return true; } };
    } else {
      const inp = box.querySelector('input'), btn = box.querySelector('.chk');
      const go = () => {
        if (done) return;
        const v = parseNum(inp.value);
        if (isNaN(v)) { fb.innerHTML = `<div class="hint">Enter a number (you can write 1.6e-19 or 1.6×10^-19).</div>`; return false; }
        done = true; inp.disabled = true; btn.disabled = true;
        const ok = numOk(v, item.num ?? item.ans, item.tol);
        if (!opts.silent) show(ok, ok ? '' : 'expected ≈ ' + fmt(item.num ?? item.ans) + ' ' + (item.unit || ''));
        onDone && onDone(ok, inp.value);
      };
      if (opts.deferred) btn.style.display = 'none';
      else { btn.onclick = go; inp.onkeydown = e => { if (e.key === 'Enter') go(); }; }
      return { check: () => done || go() !== false };
    }
  }
  // one "Check my answers" button for a group of questions answered first, graded together
  function checkAllBtn(holder, handles, onAll) {
    const b = document.createElement('button'); b.className = 'btn checkall'; b.textContent = '✔ Check my answers · تحقق من الإجابات';
    const msg = document.createElement('span'); msg.className = 'muted';
    const row = document.createElement('div'); row.className = 'row noprint'; row.style.marginTop = '10px'; row.append(b, msg); holder.after(row);
    b.onclick = () => { const left = handles.map(h => h.check()).filter(x => !x).length; msg.textContent = left ? `${left} question(s) still unanswered: answer them, then press again.` : ''; if (!left) { b.disabled = true; onAll && onAll(); } };
  }

  // ---------- mastery & recommendation ----------
  function mastery(id) {
    const st = S.lessons[id]; if (!st) return null;
    const l = lessonById(id); if (!l) return null;
    const parts = []; const w = [];
    if (st.quizBest != null) { parts.push(st.quizBest); w.push(0.6); }
    const nChecks = (l.checks || []).length; const cDone = Object.keys(st.checks).length;
    if (cDone) { parts.push(Object.values(st.checks).filter(Boolean).length / nChecks * 100); w.push(0.25); }
    if (st.tryit != null) { parts.push(st.tryit ? 100 : 0); w.push(0.15); }
    if (!parts.length) return null;
    const ws = w.reduce((a, b) => a + b, 0);
    return Math.round(parts.reduce((a, p, i) => a + p * w[i], 0) / ws);
  }
  const level = m => m == null ? ['Not started', 'pill'] : m >= 80 ? ['Mastered', 'pill ok'] : m >= 60 ? ['Developing', 'pill warn'] : ['Needs review', 'pill bad'];
  function chapterMastery(ch) {
    const ms = ch.lessons.map(l => mastery(l.id));
    const started = ms.filter(m => m != null);
    return { avg: started.length ? Math.round(started.reduce((a, b) => a + b, 0) / ch.lessons.length) : 0, started: started.length, total: ch.lessons.length };
  }
  function recommend() {
    const ls = allLessons();
    const weak = ls.find(l => { const m = mastery(l.id); return m != null && m < 60; });
    if (weak) return { l: weak, why: `Your mastery of “${weak.title}” is ${mastery(weak.id)}%. Revisit the worked example and retake the quiz before moving on.`, whyAr: 'مستواك في هذا الدرس منخفض؛ راجع المثال المحلول وأعد الاختبار قبل الانتقال.' };
    const dev = ls.find(l => { const m = mastery(l.id); return m != null && m < 80; });
    const next = ls.find(l => mastery(l.id) == null);
    if (dev && (!next || ls.indexOf(dev) < ls.indexOf(next))) return { l: dev, why: `You are close on “${dev.title}” (${mastery(dev.id)}%). One more quiz attempt should lock it in.`, whyAr: 'أنت قريب من الإتقان؛ محاولة أخرى في الاختبار تكفي.' };
    if (next) return { l: next, why: `Next topic in the course order: “${next.title}”.`, whyAr: 'الموضوع التالي حسب ترتيب المقرر.' };
    return { l: null, why: 'All lessons are at 80% or more. Use the Exam simulator to train under time pressure.', whyAr: 'أتقنت كل الدروس؛ تدرّب الآن على محاكي الاختبار.' };
  }
  function bar(m) { const c = m == null ? '' : m >= 80 ? 'ok' : m >= 60 ? 'warn' : 'bad'; return `<div class="bar ${c}"><i style="width:${m || 0}%"></i></div>`; }

  // ---------- views ----------
  const views = {};

  views.home = () => {
    const ls = allLessons();
    const ms = ls.map(l => mastery(l.id));
    const mastered = ms.filter(m => m != null && m >= 80).length;
    const started = ms.filter(m => m != null).length;
    const mins = Math.round(Object.values(S.days).reduce((a, b) => a + b, 0));
    const streak = (() => { let n = 0; const d = new Date(); for (;;) { const k = d.toISOString().slice(0, 10); if ((S.days[k] || 0) >= 1) { n++; d.setDate(d.getDate() - 1); } else break; } return n; })();
    const r = recommend();
    const due = dueCards().length;
    return `
      <h1>Welcome to your Physics Learning Lab</h1>
      <p class="sub">General Physics, 10 chapters, ${ls.length} lessons, built from your course files. <span class="pill src">📘 = from your course files</span> <span class="pill add">🧩 = additional design</span></p>
      <div class="ar">مرحبًا بك في مدرسك الخاص لمقرر الفيزياء العامة. المصطلحات والقوانين بالإنجليزية كما في مقررك، والشرح العربي مساعد. كل ما عليه 📘 مأخوذ من ملفاتك، وكل ما عليه 🧩 تصميم إضافي.</div>
      <div class="grid g4">
        <div class="card"><div class="stat">${mastered}/${ls.length}<small>lessons mastered (≥ 80%)</small></div></div>
        <div class="card"><div class="stat">${started}<small>lessons started</small></div></div>
        <div class="card"><div class="stat">${mins} min<small>study time · streak ${streak} day${streak === 1 ? '' : 's'}</small></div></div>
        <div class="card"><div class="stat">${due}<small>flashcards due today</small></div></div>
      </div>
      <div class="card">
        <h3 style="margin-top:0">🎯 Recommended next step</h3>
        <p>${r.why}</p><div class="ar">${r.whyAr}</div>
        ${r.l ? `<a class="btn" href="#lesson/${r.l.id}">Open: ${esc(r.l.title)}</a>` : `<a class="btn" href="#exam">Open the exam simulator</a>`}
        ${S.mistakes.filter(m => !m.reviewed).length ? ` <a class="btn ghost" href="#mistakes">Review ${S.mistakes.filter(m => !m.reviewed).length} mistakes</a>` : ''}
      </div>
      <h2>Chapters</h2>
      <div class="grid g2">${COURSE.map(c => { const cm = chapterMastery(c); return `<a class="card" style="text-decoration:none;color:inherit" href="#chapter/${c.id}"><div class="chap"><div><b>Ch ${c.n}. ${esc(c.title)}</b><div class="muted" style="font-size:13px">${c.lessons.length} lessons · <bdi>${c.ar}</bdi></div></div><b>${cm.avg}%</b></div>${bar(cm.avg)}</a>`; }).join('')}</div>
      <h2>How to use this tutor <span class="pill add">🧩</span></h2>
      <div class="card"><ol class="clean">
        <li>Open the recommended lesson and go through the 14 steps in order.</li>
        <li>Answer the quick checks and the short quiz <b>before</b> looking at solutions; your answers update your mastery.</li>
        <li>Every wrong answer goes to the <a href="#mistakes">Mistake journal</a>. Clear it weekly.</li>
        <li>Review <a href="#flashcards">Flashcards</a> daily (spaced repetition) and use <a href="#practice">Unlimited practice</a> for fresh numbers.</li>
        <li>Before exams: <a href="#plan">Study planner</a> → <a href="#exam">Exam simulator</a> → <a href="#report">Progress report</a>.</li>
      </ol><div class="ar">ابدأ بالدرس المقترح، أجب قبل رؤية الحل، راجع دفتر الأخطاء والبطاقات يوميًا، وقبل الاختبار استخدم المخطط والمحاكي.</div></div>`;
  };

  views.chapter = (id) => {
    const c = COURSE.find(x => x.id === id); if (!c) return views.home();
    const cm = chapterMastery(c);
    return `<h1>Chapter ${c.n}: ${esc(c.title)}</h1><p class="sub"><bdi>${c.ar}</bdi> · ${srcPill(c.src)}</p>
      <div class="card"><div class="chap"><b>Chapter mastery</b><b>${cm.avg}%</b></div>${bar(cm.avg)}</div>
      ${c.lessons.map((l, i) => { const m = mastery(l.id); const [lv, cls] = level(m); return `<a class="lessonlink" href="#lesson/${l.id}"><span><b>${c.n}.${i + 1} ${esc(l.title)}</b><br><small class="muted">${l.ar}</small></span><span class="row"><span class="${cls}">${lv}${m != null ? ' · ' + m + '%' : ''}</span></span></a>`; }).join('')}
      <div class="row noprint" style="margin-top:14px"><a class="btn ghost" href="#exam/${c.id}">Chapter exam</a><a class="btn ghost" href="#practice/${c.id}">Unlimited practice</a><a class="btn ghost" href="#formulas/${c.id}">Formula sheet</a></div>`;
  };

  views.lesson = (id) => {
    const l = lessonById(id); if (!l) return views.home();
    const st = L(id); st.visits++; save();
    const idx = allLessons().findIndex(x => x.id === id);
    const prev = allLessons()[idx - 1], next = allLessons()[idx + 1];
    const step = (n, title, arTitle, body) => `<div class="step"><div class="num">${n}</div><h3>${title} <span class="muted" style="font-weight:400;font-size:14px">· ${arTitle}</span></h3></div><div class="stepbody">${body}</div>`;
    const conds = l.formulas.filter(f => f.cond && f.cond !== '—');
    return `
      <div class="row muted" style="font-size:13px"><a href="#chapter/${l.ch.id}">Ch ${l.ch.n}. ${esc(l.ch.title)}</a> › lesson</div>
      <h1>${esc(l.title)}</h1>
      <p class="sub"><bdi>${l.ar}</bdi> · ${srcPill(l.src)}</p>
      ${step(1, 'What will you learn?', 'ماذا ستتعلم؟', `<ul class="clean">${l.goals.map(g => `<li>${g}</li>`).join('')}</ul><div class="ar">${l.goalsAr}</div>`)}
      ${step(2, 'Why do we need this?', 'لماذا نحتاجه؟', `<p>${l.why.en}</p><div class="ar">${l.why.ar}</div>`)}
      ${step(3, 'Step‑by‑step explanation', 'شرح متدرج', l.explain.map((e, i) => `<div class="card" style="margin:8px 0"><span class="pill">${i === 0 ? 'Basics' : i === l.explain.length - 1 && l.explain.length > 2 ? 'University level' : 'Building up'}</span><p style="margin:6px 0">${e.en}</p><div class="ar">${e.ar}</div></div>`).join(''))}
      ${step(4, 'English terms explained', 'المصطلحات', `<table><tr><th>Term</th><th class="arcell">بالعربية</th><th>Meaning</th></tr>${l.terms.map(t => `<tr><td><b>${t[0]}</b></td><td class="arcell">${t[1]}</td><td>${t[2]}</td></tr>`).join('')}</table>`)}
      ${step(5, 'Laws, symbols & units', 'القوانين والرموز والوحدات', l.formulas.map((f, fi) => `<div class="card" style="margin:8px 0"><b>${f.name}</b><div class="formula">${f.f}</div>${words(l, fi)}<table><tr><th>Symbol</th><th>Meaning</th><th>SI unit</th></tr>${f.sym.map(s => `<tr><td>${s[0]}</td><td>${s[1]}</td><td>${s[2]}</td></tr>`).join('')}</table></div>`).join(''))}
      ${step(6, 'Assumptions & when to use', 'الافتراضات وشروط الاستخدام', conds.length ? `<ul class="clean">${conds.map(f => `<li><b>${f.name}:</b> ${f.cond}</li>`).join('')}</ul>` : '<p class="muted">No special conditions beyond the definitions above.</p>')}
      ${step(7, 'Real‑life example', 'مثال من الحياة', `<div class="addbox">${ADD}<p style="margin:6px 0">${l.life.en}</p><div class="ar">${l.life.ar}</div></div>`)}
      ${step(8, 'Worked example, step by step', 'مثال محلول خطوة بخطوة', `<div class="card">${srcPill(l.worked.src)}<p><b>${l.worked.q}</b></p><ol class="clean" id="wsteps">${l.worked.steps.map((s, i) => `<li data-i="${i}" style="${i ? 'display:none' : ''}">${s}</li>`).join('')}</ol><div class="row noprint"><button class="btn small" id="wnext">Show next step</button><button class="btn small ghost" id="wall">Show all</button></div><p id="wans" style="display:none"><b>Answer:</b> ${l.worked.ans}</p>${l.worked.note ? `<div class="note">⚠ ${l.worked.note}</div>` : ''}</div>`)}
      ${step(9, 'Your turn: solve it yourself', 'دورك: حلّ بنفسك', `<div class="card" id="tryit">${srcPill(l.tryit.src)} <span class="pill add" title="The worked solution shown after you answer is additional design">solution 🧩</span>${qHTML({ q: l.tryit.q, num: l.tryit.ans, unit: l.tryit.unit }, 'try')}<div class="row noprint"><button class="btn small ghost" id="hintbtn">Need a hint?</button></div><div id="hintbox"></div></div>`)}
      ${step(10, 'Quick checks', 'أسئلة تحقق سريعة', `${ADD} <span class="muted" style="font-size:13px">(some reuse course examples, cited inside)</span><div id="checks">${l.checks.map((c, i) => `<div data-c="${i}">${qHTML(c, 'c' + i)}</div>`).join('')}</div>`)}
      ${step(11, 'Common mistakes & why they happen', 'أخطاء شائعة وأسبابها', `<div class="addbox">${ADD}<table>${l.mistakes.map(m => `<tr><td>✘ ${m[0]}</td><td>✔ ${m[1]}</td></tr>`).join('')}</table></div>`)}
      ${step(12, 'Summary for revision', 'ملخص للمراجعة', `<div class="card"><ul class="clean">${l.summary.map(s => `<li>${s}</li>`).join('')}</ul></div>`)}
      ${step(13, 'Short quiz (solutions appear only after you answer)', 'اختبار قصير', `${ADD} <span class="muted" style="font-size:13px">questions citing “BK Ex.” are the textbook's exercises; their solutions are additional design</span><div id="quiz">${l.quiz.map((q, i) => `<div data-q="${i}">${qHTML(q, 'q' + i)}</div>`).join('')}</div><div id="quizres"></div>`)}
      ${SW(l.id) ? `<div class="step"><div class="num">📗</div><h3>Go deeper with Serway <bdi class="muted" style="font-weight:400">· تعمّق أكثر من مرجع Serway</bdi></h3></div><div class="stepbody">${EXT}
        <div class="card"><b>Read:</b> ${SW(l.id).read.map(r => `§${r.sec} ${esc(r.title)} <span class="muted">(PDF p.${r.page})</span>`).join(' · ')}<div class="ar">اقرأ هذه الأقسام فقط؛ فهي تغطي موضوع هذا الدرس نفسه. باقي الكتاب أوسع من مقررك.</div></div>
        <div class="muted" style="font-size:13px">Extra problems on this same topic (odd‑numbered, paraphrased with the book's data). Serway uses g = 9.80 m/s² and k = 8.99×10⁹, so answers within about ±1% are accepted.</div>
        <div id="serway">${SW(l.id).probs.map((p, i) => `<div data-s="${i}">${qHTML(swItem(p), 's' + i)}</div>`).join('')}</div></div>` : ''}
      ${step(14, 'What next?', 'ماذا بعد؟', `<div class="card" id="nextbox"></div>`)}
      <div class="row noprint" style="margin-top:24px;justify-content:space-between">${prev ? `<a class="btn ghost" href="#lesson/${prev.id}">← ${esc(prev.title)}</a>` : '<span></span>'}${next ? `<a class="btn ghost" href="#lesson/${next.id}">${esc(next.title)} →</a>` : ''}</div>`;
  };
  function afterLesson(id) {
    const l = lessonById(id), st = L(id);
    // worked example stepper
    let shown = 1; const lis = [...document.querySelectorAll('#wsteps li')];
    const upd = () => { lis.forEach((li, i) => li.style.display = i < shown ? '' : 'none'); if (shown >= lis.length) { $('#wans').style.display = ''; $('#wnext').disabled = true; } };
    $('#wnext').onclick = () => { shown++; upd(); }; $('#wall').onclick = () => { shown = lis.length; upd(); };
    // try it
    let hintN = 0;
    $('#hintbtn').onclick = () => { hintN++; $('#hintbox').innerHTML = `<div class="hint">💡 ${l.tryit.hint}</div>` + (hintN > 1 ? `<div class="hint">If you are still stuck, answer anyway: the full solution appears after you check.</div>` : ''); };
    wireQ($('#tryit'), { q: l.tryit.q, num: l.tryit.ans, tol: l.tryit.tol, unit: l.tryit.unit, sol: l.tryit.sol }, (ok, given) => { st.tryit = ok; if (!ok) logMistake({ q: l.tryit.q, num: l.tryit.ans, unit: l.tryit.unit, sol: l.tryit.sol }, given, id); save(); renderNext(); });
    // checks
    checkAllBtn($('#checks'), l.checks.map((c, i) => wireQ(document.querySelector(`[data-c="${i}"]`), c, (ok, given) => { st.checks[i] = ok; if (!ok) logMistake(c, given, id); save(); renderNext(); }, { deferred: true })));
    // quiz
    const answers = {};
    const quizH = l.quiz.map((q, i) => wireQ(document.querySelector(`[data-q="${i}"]`), q, (ok, given) => {
      answers[i] = ok; if (!ok) logMistake(q, given, id);
      if (Object.keys(answers).length === l.quiz.length) {
        const pct = Math.round(Object.values(answers).filter(Boolean).length / l.quiz.length * 100);
        st.quizBest = Math.max(st.quizBest ?? 0, pct); st.quizLast = pct; st.quizAttempts = (st.quizAttempts || 0) + 1; save();
        $('#quizres').innerHTML = `<div class="card"><b>Quiz score: ${pct}%</b> (best ${st.quizBest}%) <button class="btn small ghost" id="retake">Retake quiz</button></div>`;
        $('#retake').onclick = () => route();
        renderNext();
      }
      save();
    }, { deferred: true }));
    checkAllBtn($('#quiz'), quizH);
    if (SW(id)) checkAllBtn($('#serway'), SW(id).probs.map((p, i) => wireQ(document.querySelector(`[data-s="${i}"]`), swItem(p), (ok, given) => { if (!ok) logMistake(swItem(p), given, id); save(); }, { deferred: true })));
    renderNext();
    function renderNext() {
      const m = mastery(id); const [lv, cls] = level(m);
      const ls = allLessons(); const i = ls.findIndex(x => x.id === id); const nx = ls[i + 1];
      let msg, ar;
      if (m == null) { msg = 'Answer the checks and quiz above to measure your mastery.'; ar = 'أجب عن الأسئلة لقياس مستواك.'; }
      else if (m >= 80) { msg = nx ? `Great: move on to “${nx.title}”. Add the formulas to your flashcards review.` : 'You finished the last lesson. Try a full exam.'; ar = 'ممتاز، انتقل للدرس التالي.'; }
      else if (m >= 60) { msg = 'Almost there: re‑read step 6 (conditions) and step 11 (mistakes), then retake the quiz.'; ar = 'اقتربت؛ راجع الشروط والأخطاء الشائعة ثم أعد الاختبار.'; }
      else { msg = 'Stay on this lesson: replay the worked example one step at a time, then use Unlimited practice for this chapter.'; ar = 'ابقَ في هذا الدرس؛ أعد المثال المحلول خطوة بخطوة وتدرّب أكثر.'; }
      $('#nextbox').innerHTML = `<div class="row"><span class="${cls}">${lv}${m != null ? ' · ' + m + '%' : ''}</span></div>${bar(m)}<p>${msg}</p><div class="ar">${ar}</div><div class="row noprint">${nx && m != null && m >= 80 ? `<a class="btn" href="#lesson/${nx.id}">Next lesson →</a>` : ''}<a class="btn ghost" href="#practice/${l.ch.id}">Practice this chapter</a></div>`;
    }
  }

  // ---------- practice generators (additional design) ----------
  const R = (a, b, d = 0) => +(a + Math.random() * (b - a)).toFixed(d);
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const G = [
    { ch: 'ch1', f: () => { const v = R(18, 144); return { q: `Convert ${v} km/h to m/s.`, ans: v / 3.6, unit: 'm/s', sol: `${v} × 1000 / 3600 = ${fmt(v / 3.6)} m/s` }; } },
    { ch: 'ch1', f: () => { const r = R(1, 20, 1); return { q: `Convert a density of ${r} g/cm³ to kg/m³.`, ans: r * 1000, unit: 'kg/m³', sol: `× 10³ → ${fmt(r * 1000)} kg/m³` }; } },
    { ch: 'ch2', f: () => { const a = R(2, 12), b = R(2, 12); return { q: `A = ${a} units east, B = ${b} units north. |A + B| = ?`, ans: Math.hypot(a, b), unit: 'units', sol: `√(${a}² + ${b}²) = ${fmt(Math.hypot(a, b))}` }; } },
    { ch: 'ch2', f: () => { const A = R(2, 20), t = pick([30, 37, 45, 53, 60, 120, 150, 210, 300]); return { q: `|A| = ${A}, θ = ${t}° from +x. Find Aₓ.`, ans: A * Math.cos(t * Math.PI / 180), unit: '', sol: `Aₓ = ${A} cos ${t}° = ${fmt(A * Math.cos(t * Math.PI / 180))}` }; } },
    { ch: 'ch2', f: () => { const a = [R(-5, 6), R(-5, 6), R(-5, 6)], b = [R(-5, 6), R(-5, 6), R(-5, 6)]; const d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; return { q: `A = ${a[0]}î + ${a[1]}ĵ + ${a[2]}k̂, B = ${b[0]}î + ${b[1]}ĵ + ${b[2]}k̂. A·B = ?`, ans: d, unit: '', sol: `${a[0]}·${b[0]} + ${a[1]}·${b[1]} + ${a[2]}·${b[2]} = ${d}` }; } },
    { ch: 'ch3', f: () => { const h = R(5, 120); const t = Math.sqrt(2 * h / 9.8); return { q: `A stone is dropped from rest from ${h} m. Time to reach the ground?`, ans: t, unit: 's', sol: `h = ½gt² → t = √(2·${h}/9.8) = ${fmt(t)} s` }; } },
    { ch: 'ch3', f: () => { const v = R(5, 40), a = R(1, 6, 1), d = R(10, 200); const vf = Math.sqrt(v * v + 2 * a * d); return { q: `A car at ${v} m/s accelerates at ${a} m/s² over ${d} m. Final speed?`, ans: vf, unit: 'm/s', sol: `v_f = √(${v}² + 2·${a}·${d}) = ${fmt(vf)} m/s` }; } },
    { ch: 'ch3', f: () => { const v = R(10, 60); return { q: `A ball is thrown up at ${v} m/s. Maximum height?`, ans: v * v / 19.6, unit: 'm', sol: `y_max = v²/2g = ${fmt(v * v / 19.6)} m` }; } },
    { ch: 'ch4', f: () => { const m = R(2, 50), F = R(10, 300); return { q: `A net force of ${F} N acts on ${m} kg. Acceleration?`, ans: F / m, unit: 'm/s²', sol: `a = F/m = ${fmt(F / m)} m/s²` }; } },
    { ch: 'ch4', f: () => { const m = R(40, 100), a = R(1, 4, 1), up = Math.random() < .5; const n = m * (9.8 + (up ? a : -a)); return { q: `A ${m} kg person stands on a scale in an elevator accelerating ${up ? 'upward' : 'downward'} at ${a} m/s². Scale reading?`, ans: n, unit: 'N', sol: `n = m(g ${up ? '+' : '−'} a) = ${fmt(n)} N` }; } },
    { ch: 'ch5', f: () => { const F = R(10, 200), d = R(1, 20), t = pick([0, 30, 45, 60, 90, 120]); const W = F * d * Math.cos(t * Math.PI / 180); return { q: `F = ${F} N at ${t}° to a displacement of ${d} m. Work?`, ans: Math.abs(W) < 1e-9 ? 0 : W, unit: 'J', sol: `W = Fd cos θ = ${fmt(W)} J` }; } },
    { ch: 'ch5', f: () => { const m = R(1, 1500), v = R(1, 30); return { q: `Kinetic energy of ${m} kg at ${v} m/s?`, ans: .5 * m * v * v, unit: 'J', sol: `½mv² = ${fmt(.5 * m * v * v)} J` }; } },
    { ch: 'ch5', f: () => { const m = R(1, 100), h = R(1, 30), t = R(2, 30); return { q: `${m} kg is lifted ${h} m in ${t} s. Average power?`, ans: m * 9.8 * h / t, unit: 'W', sol: `P = mgh/t = ${fmt(m * 9.8 * h / t)} W` }; } },
    { ch: 'ch6', f: () => { const h = R(1, 100), rho = pick([1000, 1025, 13600, 900]); return { q: `Pressure due to a ${h} m column of liquid of density ${rho} kg/m³ (no atmosphere)?`, ans: rho * 9.8 * h, unit: 'Pa', sol: `ρgh = ${fmt(rho * 9.8 * h)} Pa` }; } },
    { ch: 'ch6', f: () => { const r1 = R(2, 10), r2 = R(1, r1 - 0.5, 1), v1 = R(1, 5, 1); const v2 = v1 * (r1 / r2) ** 2; return { q: `Water flows at ${v1} m/s in a pipe of radius ${r1} cm that narrows to ${r2} cm. New speed?`, ans: v2, unit: 'm/s', sol: `v₂ = v₁(r₁/r₂)² = ${fmt(v2)} m/s` }; } },
    { ch: 'ch6', f: () => { const F = R(100, 5000), d = R(1, 4, 1), L = R(1, 10), dL = R(1, 9) / 1000; const A = Math.PI * (d / 2000) ** 2; const Y = F / A / (dL / L); return { q: `A ${L} m wire of diameter ${d} mm stretches ${fmt(dL * 1000)} mm under ${F} N. Young's modulus?`, ans: Y, unit: 'N/m²', sol: `A = π(${d / 2} mm)² ; Y = (F/A)/(ΔL/L) = ${fmt(Y)} N/m²` }; } },
    { ch: 'ch7', f: () => { const F = R(-40, 220); return { q: `Convert ${F} °F to °C.`, ans: (F - 32) * 5 / 9, unit: '°C', sol: `5/9 (${F} − 32) = ${fmt((F - 32) * 5 / 9)} °C` }; } },
    { ch: 'ch7', f: () => { const m = R(0.1, 5, 2), c = pick([[4186, 'water'], [900, 'aluminium'], [385, 'copper'], [2220, 'ice']]), dT = R(5, 80); return { q: `Heat to warm ${m} kg of ${c[1]} (c = ${c[0]} J/kg·K) by ${dT} K?`, ans: m * c[0] * dT, unit: 'J', sol: `Q = mcΔT = ${fmt(m * c[0] * dT)} J` }; } },
    { ch: 'ch7', f: () => { const L0 = R(1, 50), a = pick([1.2e-5, 1.7e-5, 1.8e-5, 2.4e-5]), dT = R(20, 400); return { q: `A ${L0} m bar (α = ${a.toExponential(1)} °C⁻¹) is heated by ${dT} °C. Expansion?`, ans: a * L0 * dT, unit: 'm', sol: `Δℓ = αℓΔT = ${fmt(a * L0 * dT)} m` }; } },
    { ch: 'ch8', f: () => { const q1 = R(1, 20), q2 = R(1, 20), r = R(1, 50); const F = 9e9 * q1 * 1e-6 * q2 * 1e-6 / (r / 100) ** 2; return { q: `Force between ${q1} μC and ${q2} μC, ${r} cm apart?`, ans: F, unit: 'N', sol: `F = kq₁q₂/r² = ${fmt(F)} N` }; } },
    { ch: 'ch8', f: () => { const a = R(2, 30), b = R(1, 10), d = R(1, 10) / 1000; const C = 8.85e-12 * (a / 100) * (b / 100) / d; return { q: `Parallel plates ${a} cm × ${b} cm, ${fmt(d * 1000)} mm apart, vacuum. Capacitance?`, ans: C, unit: 'F', sol: `C = ε₀A/d = ${fmt(C)} F` }; } },
    { ch: 'ch8', f: () => { const c1 = R(1, 20), c2 = R(1, 20), ser = Math.random() < .5; const C = ser ? c1 * c2 / (c1 + c2) : c1 + c2; return { q: `${c1} μF and ${c2} μF in ${ser ? 'series' : 'parallel'}. C_eq?`, ans: C, unit: 'μF', sol: ser ? `C₁C₂/(C₁+C₂) = ${fmt(C)} μF` : `C₁ + C₂ = ${C} μF` }; } },
    { ch: 'ch9', f: () => { const V = R(1, 240), R0 = R(2, 500); return { q: `${V} V across ${R0} Ω. Current?`, ans: V / R0, unit: 'A', sol: `I = V/R = ${fmt(V / R0)} A` }; } },
    { ch: 'ch9', f: () => { const r = [R(2, 60), R(2, 60), R(2, 60)]; const p = 1 / (1 / r[0] + 1 / r[1] + 1 / r[2]); return { q: `${r.join(' Ω, ')} Ω in parallel. R_eq?`, ans: p, unit: 'Ω', sol: `1/R = Σ1/Rᵢ → R = ${fmt(p)} Ω` }; } },
    { ch: 'ch9', f: () => { const V = pick([12, 120, 230, 240]), P = R(10, 2500); return { q: `A ${P} W device runs on ${V} V. Resistance?`, ans: V * V / P, unit: 'Ω', sol: `R = V²/P = ${fmt(V * V / P)} Ω` }; } },
    { ch: 'ch10', f: () => { const n = pick([1.33, 1.5, 1.52, 1.66, 2.42]), t = R(10, 70); const t2 = Math.asin(Math.sin(t * Math.PI / 180) / n) * 180 / Math.PI; return { q: `Light goes from air into a medium (n = ${n}) at ${t}°. Refraction angle?`, ans: t2, unit: '°', sol: `θ₂ = sin⁻¹(sin ${t}° / ${n}) = ${fmt(t2)}°` }; } },
    { ch: 'ch10', f: () => { const n = pick([1.33, 1.46, 1.5, 1.52, 1.66, 2.42]); const c = Math.asin(1 / n) * 180 / Math.PI; return { q: `Critical angle from a medium with n = ${n} into air?`, ans: c, unit: '°', sol: `sin θc = 1/${n} → θc = ${fmt(c)}°` }; } }
  ];
  const genFor = chId => G.filter(g => !chId || g.ch === chId);

  views.practice = (chId) => {
    const opts = COURSE.map(c => `<option value="${c.id}" ${c.id === chId ? 'selected' : ''}>Ch ${c.n}. ${esc(c.title)}</option>`).join('');
    return `<h1>Unlimited practice</h1><p class="sub">Fresh numbers every time, using only laws from your course. ${ADD}</p>
      <div class="ar">مسائل لا تنتهي بأرقام جديدة في كل مرة، مبنية على قوانين مقررك فقط.</div>
      <div class="card row noprint"><label>Chapter <select id="pch"><option value="">All chapters</option>${opts}</select></label><button class="btn" id="pnew">New problem</button><span class="muted" id="pscore"></span></div>
      <div id="pbox"></div>`;
  };
  function afterPractice(chId) {
    let n = 0, ok = 0;
    const gen = () => {
      const pool = genFor($('#pch').value); const g = pick(pool); const p = g.f(); p.tol = 0.01;
      $('#pbox').innerHTML = `<div class="card">${qHTML({ q: p.q, num: p.ans, unit: p.unit }, 'p')}</div>`;
      wireQ($('#pbox .card'), { q: p.q, num: p.ans, unit: p.unit, tol: 0.01, sol: p.sol }, (good, given) => { n++; if (good) ok++; else logMistake({ q: p.q, num: p.ans, unit: p.unit, sol: p.sol }, given, null); $('#pscore').textContent = `Session: ${ok}/${n} correct`; });
      $('#pbox input')?.focus();
    };
    $('#pnew').onclick = gen; $('#pch').onchange = gen; gen();
  }

  // ---------- exam simulator ----------
  let EXAM = null;
  views.exam = (chId) => {
    const boxes = COURSE.map(c => `<label style="display:inline-flex;gap:6px;margin:4px 12px 4px 0"><input type="checkbox" class="ech" value="${c.id}" ${!chId || chId === c.id ? 'checked' : ''}> Ch ${c.n}</label>`).join('');
    const hist = S.exams.slice(0, 8).map(e => `<tr><td>${new Date(e.ts).toLocaleString()}</td><td>${e.n}</td><td><b>${e.pct}%</b></td><td>${e.chs.join(', ')}</td></tr>`).join('');
    return `<h1>Exam simulator</h1><p class="sub">Timed, mixed questions, no feedback until you submit, like a real exam. ${ADD}</p>
      <div class="ar">محاكي اختبار: أسئلة مختلطة بزمن محدد، ولا تظهر الإجابات إلا بعد التسليم. (صيغة الاختبار الفعلية غير موجودة في ملفاتك، انظر G‑02.)</div>
      <div class="card noprint" id="esetup"><div>${boxes}</div>
      <div class="row" style="margin-top:8px"><label>Questions <select id="en"><option>10</option><option selected>15</option><option>20</option><option>30</option></select></label>
      <label>Minutes <select id="em"><option>10</option><option selected>20</option><option>30</option><option>45</option><option>60</option></select></label>
      <label><input type="checkbox" id="egen" checked> include fresh‑number problems</label>
      <button class="btn" id="estart">Start exam</button></div></div>
      <div id="ebox"></div>
      ${hist ? `<h2>Previous attempts</h2><div class="card"><table><tr><th>Date</th><th>Qs</th><th>Score</th><th>Chapters</th></tr>${hist}</table></div>` : ''}`;
  };
  function afterExam() {
    $('#estart').onclick = () => {
      const chs = [...document.querySelectorAll('.ech:checked')].map(x => x.value);
      if (!chs.length) return alert('Pick at least one chapter.');
      const n = +$('#en').value, mins = +$('#em').value;
      let pool = [];
      COURSE.filter(c => chs.includes(c.id)).forEach(c => c.lessons.forEach(l => { l.quiz.concat(l.checks).forEach(q => pool.push(Object.assign({ ch: c.id, lessonId: l.id }, q))); pool.push({ ch: c.id, lessonId: l.id, q: l.tryit.q, num: l.tryit.ans, tol: l.tryit.tol, unit: l.tryit.unit, sol: l.tryit.sol }); }));
      if ($('#egen').checked) genFor().filter(g => chs.includes(g.ch)).forEach(g => { for (let k = 0; k < 2; k++) { const p = g.f(); pool.push({ ch: g.ch, q: p.q, num: p.ans, unit: p.unit, tol: 0.01, sol: p.sol }); } });
      const qs = shuffle(pool).slice(0, n);
      EXAM = { qs, ans: {}, end: Date.now() + mins * 60000, chs };
      $('#esetup').style.display = 'none';
      $('#ebox').innerHTML = `<div class="card row" style="justify-content:space-between;position:sticky;top:60px;z-index:5"><span>Answer every question, then submit.</span><span class="timer" id="etimer"></span><button class="btn" id="esubmit">Submit</button></div>` + qs.map((q, i) => `<div data-e="${i}"><div class="muted" style="font-size:13px;margin-top:10px">Q${i + 1} · ${COURSE.find(c => c.id === q.ch).title}</div>${qHTML(q, 'e' + i)}</div>`).join('');
      qs.forEach((q, i) => wireQ(document.querySelector(`[data-e="${i}"]`), q, (ok, given) => { EXAM.ans[i] = { ok, given }; }, { silent: true, hideSol: true }));
      $('#esubmit').onclick = finish;
      const tick = () => { if (!EXAM) return; const left = Math.max(0, EXAM.end - Date.now()); $('#etimer').textContent = `${Math.floor(left / 60000)}:${String(Math.floor(left / 1000) % 60).padStart(2, '0')}`; if (left <= 0) finish(); else EXAM.t = setTimeout(tick, 500); };
      tick();
    };
    function finish() {
      if (!EXAM) return; clearTimeout(EXAM.t);
      const { qs, ans } = EXAM; const by = {};
      let good = 0;
      qs.forEach((q, i) => { const a = ans[i]; const ok = !!(a && a.ok); if (ok) good++; else logMistake(q, a ? a.given : '(blank)', q.lessonId); by[q.ch] = by[q.ch] || [0, 0]; by[q.ch][1]++; if (ok) by[q.ch][0]++; });
      const pct = Math.round(good / qs.length * 100);
      S.exams.unshift({ ts: Date.now(), n: qs.length, pct, chs: EXAM.chs.map(c => c.replace('ch', 'Ch ')), by }); save();
      $('#ebox').innerHTML = `<div class="card"><h2 style="margin-top:0">Score: ${pct}% (${good}/${qs.length})</h2>
        <table><tr><th>Chapter</th><th>Correct</th><th></th></tr>${Object.entries(by).map(([c, v]) => `<tr><td>${COURSE.find(x => x.id === c).title}</td><td>${v[0]}/${v[1]}</td><td style="width:40%">${bar(Math.round(v[0] / v[1] * 100))}</td></tr>`).join('')}</table>
        <p>Wrong and blank answers were added to your <a href="#mistakes">Mistake journal</a>.</p><div class="row"><a class="btn" href="#exam">New exam</a><a class="btn ghost" href="#report">Progress report</a></div></div>
        <h2>Review</h2>` + qs.map((q, i) => { const a = ans[i]; const ok = !!(a && a.ok); return `<div class="q"><div class="qt">Q${i + 1}. ${q.q}</div><div class="fb ${ok ? 'ok' : 'bad'}">${ok ? '✔' : '✘'} Your answer: ${esc(a ? (q.o ? a.given : a.given + ' ' + (q.unit || '')) : '(blank)')} · Correct: ${q.o ? q.o[q.a] : fmt(q.num) + ' ' + (q.unit || '')}<div class="sol">${q.why || q.sol || ''}</div></div></div>`; }).join('');
      EXAM = null; window.scrollTo(0, 0);
    }
  }

  // ---------- flashcards (Leitner) ----------
  const INTERVALS = [0, 1, 3, 7, 14, 30];
  function allCards() {
    const cards = [];
    COURSE.forEach(c => c.lessons.forEach(l => {
      l.formulas.forEach((f, i) => cards.push({ id: `${l.id}-f${i}`, ch: c.id, front: `<div class="muted" style="font-size:13px">Formula · Ch ${c.n}</div><b>${f.name}</b><div class="muted" style="font-size:14px">${l.title}</div>`, back: `<div class="formula">${f.f}</div>${words(l, i)}<div style="font-size:14px">${f.cond !== '—' ? f.cond : ''}</div>` }));
      l.terms.forEach((t, i) => cards.push({ id: `${l.id}-t${i}`, ch: c.id, front: `<div class="muted" style="font-size:13px">Term · Ch ${c.n}</div><b>${t[0]}</b>`, back: `${t[2]}<div class="ar" style="text-align:center">${t[1]}</div>` }));
    }));
    return cards;
  }
  function dueCards(chId) { const now = Date.now(); return allCards().filter(c => (!chId || c.ch === chId) && (!S.cards[c.id] || S.cards[c.id].due <= now)); }
  views.flashcards = (chId) => {
    const opts = COURSE.map(c => `<option value="${c.id}" ${c.id === chId ? 'selected' : ''}>Ch ${c.n}. ${esc(c.title)}</option>`).join('');
    const boxes = [0, 0, 0, 0, 0, 0]; allCards().forEach(c => boxes[(S.cards[c.id] || { box: 0 }).box]++);
    return `<h1>Flashcards</h1><p class="sub">Spaced repetition (Leitner boxes): cards you know come back later, cards you miss come back today. ${ADD}</p>
      <div class="ar">البطاقات التعليمية بالتكرار المتباعد: ما تعرفه يعود بعد أيام، وما تخطئ فيه يعود اليوم.</div>
      <div class="card row noprint"><label>Deck <select id="fch"><option value="">All chapters</option>${opts}</select></label><span class="muted">Boxes: ${boxes.map((b, i) => `${i}:${b}`).join(' · ')}</span></div>
      <div id="fbox"></div>`;
  };
  function afterFlash(chId) {
    const run = () => {
      const due = shuffle(dueCards($('#fch').value));
      if (!due.length) { $('#fbox').innerHTML = `<div class="card">🎉 No cards due in this deck. Come back tomorrow or pick another deck.</div>`; return; }
      const c = due[0];
      $('#fbox').innerHTML = `<div class="card flash" id="fcard"><div>${c.front}<div class="muted" style="font-size:13px;margin-top:10px">click to flip</div></div></div><div class="row noprint" id="fbtns" style="display:none"><button class="btn ghost" id="fno">✘ Didn't know</button><button class="btn" id="fyes">✔ Knew it</button><span class="muted">${due.length} due</span></div>`;
      $('#fcard').onclick = () => { $('#fcard').innerHTML = `<div class="back">${c.back}</div>`; $('#fbtns').style.display = ''; };
      const grade = ok => { const s = S.cards[c.id] || { box: 0 }; s.box = ok ? Math.min(5, s.box + 1) : 0; s.due = Date.now() + INTERVALS[s.box] * 86400000 + (ok ? 0 : 60000); S.cards[c.id] = s; save(); run(); };
      $('#fyes').onclick = () => grade(true); $('#fno').onclick = () => grade(false);
    };
    $('#fch').onchange = run; run();
  }

  // ---------- mistakes ----------
  views.mistakes = () => {
    const open = S.mistakes.filter(m => !m.reviewed);
    return `<h1>Mistake journal</h1><p class="sub">Every wrong answer is saved here so you can learn from it. ${ADD}</p>
      <div class="ar">دفتر الأخطاء: كل إجابة خاطئة تُحفظ هنا لتراجعها. اكتب لنفسك سبب الخطأ ثم علّمها كمراجَعة.</div>
      <div class="row noprint"><span class="pill ${open.length ? 'bad' : 'ok'}">${open.length} to review</span>${S.mistakes.length ? '<button class="btn small ghost" id="mclear">Delete reviewed</button>' : ''}</div>
      ${S.mistakes.length ? S.mistakes.map((m, i) => `<div class="card" style="${m.reviewed ? 'opacity:.55' : ''}"><div class="qt"><b>${m.q}</b></div><div>Your answer: <span class="pill bad">${esc(m.given)}</span> · Correct: <span class="pill ok">${m.correct}</span></div>${m.sol ? `<div class="muted" style="margin-top:6px">${m.sol}</div>` : ''}<div class="row noprint" style="margin-top:8px">${m.lessonId ? `<a class="btn small ghost" href="#lesson/${m.lessonId}">Open lesson</a>` : ''}<button class="btn small" data-rev="${i}">${m.reviewed ? 'Mark as open' : 'Mark reviewed'}</button><small class="muted">${new Date(m.ts).toLocaleDateString()}</small></div></div>`).join('') : '<div class="card">No mistakes yet. Answer some questions!</div>'}`;
  };
  function afterMistakes() {
    document.querySelectorAll('[data-rev]').forEach(b => b.onclick = () => { const m = S.mistakes[+b.dataset.rev]; m.reviewed = !m.reviewed; save(); route(); });
    const c = $('#mclear'); if (c) c.onclick = () => { S.mistakes = S.mistakes.filter(m => !m.reviewed); save(); route(); };
  }

  // ---------- formula sheet ----------
  // formula in words: Arabic line, then the same in English
  const words = (l, i) => { const w = (window.WORDS || {})[l.id + '#' + i]; return w ? `<div class="words"><div class="ar"><bdi>🗣 ${w[0]}</bdi></div><div class="en">🗣 <b>In words:</b> ${w[1]}</div></div>` : ''; };
  views.formulas = (chId) => `<h1>Formula & unit sheet</h1><p class="sub">Every law in the course with symbols, units and conditions. Print it for revision. <span class="pill src">📘 course files</span></p>
    <div class="row noprint"><button class="btn small" onclick="window.print()">Print / save as PDF</button>${COURSE.map(c => `<a class="btn small ghost" href="#formulas/${c.id}">Ch ${c.n}</a>`).join('')}<a class="btn small ghost" href="#formulas">All</a></div>
    ${COURSE.filter(c => !chId || c.id === chId).map(c => `<h2>Ch ${c.n}. ${esc(c.title)} <span class="muted" style="font-size:14px;font-weight:400"><bdi>${c.ar}</bdi> · ${c.src}</span></h2>${c.lessons.map(l => l.formulas.map((f, fi) => `<div class="card"><div class="row" style="justify-content:space-between"><b>${f.name}</b><a class="muted" style="font-size:13px" href="#lesson/${l.id}">${esc(l.title)}</a></div><div class="formula">${f.f}</div>${words(l, fi)}<div style="font-size:14px">${f.sym.map(s => `<b>${s[0]}</b>: ${s[1]} (${s[2]})`).join(' · ')}</div>${f.cond !== '—' ? `<div class="muted" style="font-size:14px">Condition: ${f.cond}</div>` : ''}</div>`).join('')).join('')}`).join('')}`;

  // ---------- tools ----------
  const UNITS = {
    Length: { m: 1, km: 1e3, cm: 1e-2, mm: 1e-3, 'μm': 1e-6, nm: 1e-9, in: 0.0254, ft: 0.3048, mile: 1609 },
    Mass: { kg: 1, g: 1e-3, mg: 1e-6, 'u (atomic)': 1.66e-27, slug: 14.59 },
    Time: { s: 1, ms: 1e-3, min: 60, h: 3600, day: 86400, year: 3.156e7 },
    Speed: { 'm/s': 1, 'km/h': 1 / 3.6, 'cm/s': 0.01, 'mi/h': 0.447 },
    Area: { 'm²': 1, 'cm²': 1e-4, 'mm²': 1e-6, 'km²': 1e6 },
    Volume: { 'm³': 1, 'cm³': 1e-6, L: 1e-3, mL: 1e-6 },
    Density: { 'kg/m³': 1, 'g/cm³': 1000 },
    Pressure: { Pa: 1, kPa: 1e3, atm: 1.013e5, 'cm Hg': 1333, 'lb/in²': 6895 },
    Energy: { J: 1, kJ: 1e3, cal: 4.186, kcal: 4186, eV: 1.602e-19, erg: 1e-7, kWh: 3.6e6 },
    Charge: { C: 1, mC: 1e-3, 'μC': 1e-6, nC: 1e-9, e: 1.6e-19, Ah: 3600 },
    Capacitance: { F: 1, 'μF': 1e-6, nF: 1e-9, pF: 1e-12 }
  };
  const DIM = { m: [1, 0, 0], L: [0, 1, 0], l: [0, 1, 0], r: [0, 1, 0], x: [0, 1, 0], d: [0, 1, 0], h: [0, 1, 0], t: [0, 0, 1], T: [0, 0, 1], v: [0, 1, -1], a: [0, 1, -2], g: [0, 1, -2], F: [1, 1, -2], W: [1, 2, -2], E: [1, 2, -2], P: [1, 2, -3], p: [1, -1, -2], rho: [1, -3, 0], A: [0, 2, 0], V: [0, 3, 0], f: [0, 0, -1], nu: [0, 0, -1], c: [0, 1, -1], G: [-1, 3, -2], h_planck: [1, 2, -1], eta: [1, -1, -1], k: [1, 0, -2], Y: [1, -1, -2] };
  function dimOf(expr) {
    const tokens = expr.replace(/\s+/g, '').match(/sqrt|[A-Za-z_]+|\d+(\.\d+)?|[\^\*\/\(\)\-]/g) || [];
    let i = 0;
    const add = (a, b, s = 1) => a.map((x, k) => x + s * b[k]);
    function factor() {
      let t = tokens[i++]; let d;
      if (t === 'sqrt') { i++; d = expr_(); i++; d = d.map(x => x / 2); }
      else if (t === '(') { d = expr_(); i++; }
      else if (/^\d/.test(t)) d = [0, 0, 0];
      else if (t === 'pi') d = [0, 0, 0];
      else if (DIM[t]) d = DIM[t].slice();
      else throw new Error('Unknown symbol: ' + t);
      if (tokens[i] === '^') { i++; let neg = 1; if (tokens[i] === '-') { neg = -1; i++; } const p = parseFloat(tokens[i++]) * neg; d = d.map(x => x * p); }
      return d;
    }
    function expr_() { let d = factor(); while (tokens[i] === '*' || tokens[i] === '/') { const op = tokens[i++]; d = add(d, factor(), op === '/' ? -1 : 1); } return d; }
    const d = expr_(); if (i < tokens.length) throw new Error('Could not read: ' + tokens.slice(i).join('')); return d;
  }
  const dimStr = d => { const s = ['M', 'L', 'T'].map((n, k) => d[k] ? n + (d[k] !== 1 ? `<sup>${+d[k].toFixed(2)}</sup>` : '') : '').join(''); return s || '1 (dimensionless)'; };
  const LAWS = [
    ['A car starts from rest with constant acceleration; you know a and the distance and want the final speed.', 'v_f² = v_i² + 2aΔx'],
    ['You know x(t) as a polynomial and want the velocity at t = 3 s.', 'v = dx/dt'],
    ['A box is pulled at an angle and you need the energy transferred by the pull.', 'W = F Δr cos θ'],
    ['Two point charges and the force between them.', 'F = k q₁q₂/r²'],
    ['Light enters water from air at a known angle.', 'n₁ sin θ₁ = n₂ sin θ₂'],
    ['Water flows from a wide pipe into a narrow one; you want the new speed.', 'A₁v₁ = A₂v₂'],
    ['A hydraulic lift: small force on a small piston.', 'f/a = F/A'],
    ['Hot metal is dropped into water; you want the final temperature.', 'Heat balance: Q_lost = Q_gained'],
    ['Ice at 0 °C melts completely.', 'Q = mL'],
    ['A wire stretches under a hanging mass.', 'F/A = Y ΔL/L'],
    ['You need the pressure 20 m under the sea surface.', 'P = P₀ + ρgh'],
    ['A heater on 230 V with known resistance: its power.', 'P = V²/R'],
    ['Three resistors share the same voltage.', '1/R_eq = Σ1/Rᵢ'],
    ['Capacitor plates of known area and gap in vacuum.', 'C = ε₀A/d'],
    ['Energy stored in a charged capacitor.', 'U = ½CV²'],
    ['Body hanging motionless from two strings.', 'ΣF = 0'],
    ['A cart accelerates under a known net force.', 'ΣF = ma'],
    ['A stone thrown up: how high does it go?', 'y_max = v_i²/2g'],
    ['A metal rail gets longer on a hot day.', 'Δℓ = αℓΔT'],
    ['Light going from glass to air: when does none escape?', 'sin θc = n₂/n₁'],
    ['Charge passing a point in a given time.', 'I = Δq/Δt'],
    ['Resistance of a wire from its length and diameter.', 'R = ρℓ/A'],
    ['Body lifted at constant speed: rate of energy use.', 'P = W/t'],
    ['Potential difference between capacitor plates with a uniform field.', 'ΔV = Ed']
  ];
  views.tools = () => {
    const cats = Object.keys(UNITS).map(k => `<option>${k}</option>`).join('');
    return `<h1>Tools</h1><p class="sub">Calculators that build skills the course asks for. ${ADD}</p>
      <div class="card"><h3 style="margin-top:0">🔁 Unit converter</h3><div class="ar">محوّل الوحدات مع إظهار معامل التحويل حتى تتعلم الطريقة.</div>
      <div class="row"><select id="ucat">${cats}</select><input id="uval" class="search" style="width:140px" value="1"><select id="ufrom"></select> → <select id="uto"></select></div><p id="uout" class="formula"></p>
      <div class="row"><b>Temperature:</b><input id="tval" class="search" style="width:110px" value="100"><select id="tfrom"><option>°C</option><option>°F</option><option>K</option></select><span id="tout"></span></div></div>
      <div class="card"><h3 style="margin-top:0">📐 Dimensional analysis checker</h3><div class="ar">اكتب طرفي المعادلة لتتحقق من التجانس البُعدي (الفصل الأول).</div>
      <p class="muted" style="font-size:14px">Symbols: m (mass), L/l/r/x/d/h (length), t/T (time), v, a, g, F, W/E (energy), P (power), p (pressure), rho, A (area), V (volume), f (frequency), c, G, eta, k (spring const.), Y. Use * / ^ ( ) and sqrt( ). Numbers and pi are dimensionless.</p>
      <div class="row"><input id="dl" class="search" style="width:200px" value="T"> = <input id="dr" class="search" style="width:260px" value="2*pi*sqrt(L/g)"><button class="btn small" id="dgo">Check</button></div><div id="dout"></div></div>
      <div class="card"><h3 style="margin-top:0">🧭 Which law should I use?</h3><div class="ar">تدريب على اختيار القانون المناسب: أهم مهارة في حل المسائل.</div><div id="lawbox"></div></div>`;
  };
  function afterTools() {
    const fill = () => { const u = Object.keys(UNITS[$('#ucat').value]).map(x => `<option>${x}</option>`).join(''); $('#ufrom').innerHTML = u; $('#uto').innerHTML = u; $('#uto').selectedIndex = 1; conv(); };
    const conv = () => { const t = UNITS[$('#ucat').value], v = parseNum($('#uval').value), a = t[$('#ufrom').value], b = t[$('#uto').value]; $('#uout').innerHTML = isNaN(v) ? 'Enter a number' : `${v} ${$('#ufrom').value} = ${fmt(v * a / b, 5)} ${$('#uto').value}   <span class="muted" style="font-size:14px">(factor ${fmt(a / b, 5)})</span>`; };
    $('#ucat').onchange = fill; ['#uval', '#ufrom', '#uto'].forEach(s => $(s).oninput = conv); fill();
    const tc = () => { const v = parseNum($('#tval').value), u = $('#tfrom').value; if (isNaN(v)) return; const C = u === '°C' ? v : u === '°F' ? (v - 32) * 5 / 9 : v - 273.15; $('#tout').innerHTML = `= <b>${fmt(C, 4)} °C</b> = <b>${fmt(C * 9 / 5 + 32, 4)} °F</b> = <b>${fmt(C + 273.15, 5)} K</b>`; };
    $('#tval').oninput = tc; $('#tfrom').onchange = tc; tc();
    $('#dgo').onclick = () => { try { const a = dimOf($('#dl').value), b = dimOf($('#dr').value); const same = a.every((x, k) => Math.abs(x - b[k]) < 1e-9); $('#dout').innerHTML = `<p>Left: <b>${dimStr(a)}</b> · Right: <b>${dimStr(b)}</b></p><div class="fb ${same ? 'ok' : 'bad'}">${same ? '✔ Dimensionally homogeneous (it may still be wrong by a dimensionless constant).' : '✘ Not homogeneous: the equation is wrong.'}</div>`; } catch (e) { $('#dout').innerHTML = `<div class="fb bad">${esc(e.message)}</div>`; } };
    let score = 0, total = 0;
    const lawQ = () => {
      const [sc, right] = pick(LAWS); const opts = shuffle([right, ...shuffle(LAWS.filter(l => l[1] !== right)).slice(0, 3).map(l => l[1])]);
      const item = { q: sc, o: opts, a: opts.indexOf(right), why: `Use <b>${right}</b>.` };
      $('#lawbox').innerHTML = qHTML(item, 'law') + `<div class="row" style="margin-top:8px"><button class="btn small" id="lawnext">Next scenario</button><span class="muted">${score}/${total}</span></div>`;
      wireQ($('#lawbox'), item, ok => { total++; if (ok) score++; $('#lawbox .muted:last-child').textContent = `${score}/${total}`; });
      $('#lawnext').onclick = lawQ;
    };
    lawQ();
  }

  // ---------- study planner ----------
  views.plan = () => {
    const p = S.plan;
    let body = '';
    if (p) {
      const days = Math.max(1, Math.ceil((new Date(p.exam) - new Date(today())) / 86400000));
      const ls = allLessons().filter(l => !p.chs.length || p.chs.includes(l.ch.id));
      const todo = ls.map(l => ({ l, m: mastery(l.id) })).filter(x => x.m == null || x.m < 80).sort((a, b) => (a.m ?? -1) - (b.m ?? -1));
      const studyDays = Math.max(1, days - 1);
      const perDay = Math.ceil(todo.length / studyDays) || 0;
      const rows = []; const d = new Date();
      for (let k = 0; k < Math.min(studyDays, 60); k++) {
        const items = todo.slice(k * perDay, (k + 1) * perDay);
        const date = new Date(d.getTime() + k * 86400000).toISOString().slice(0, 10);
        rows.push(`<tr><td>${date}</td><td>${items.length ? items.map(x => `<a href="#lesson/${x.l.id}">${esc(x.l.title)}</a>${x.m != null ? ` <span class="pill bad">${x.m}%</span>` : ''}`).join('<br>') : 'Flashcards + Unlimited practice'}</td><td>${k % 3 === 2 ? 'Mistake journal review' : 'Flashcards (10 min)'}</td></tr>`);
      }
      rows.push(`<tr><td>${new Date(new Date(p.exam).getTime() - 86400000).toISOString().slice(0, 10)}</td><td><b>Full exam simulation</b> (30 Qs, 45 min), then re‑read the formula sheet</td><td>Sleep well</td></tr>`);
      body = `<div class="card"><b>${days} day(s)</b> until your exam on ${p.exam}. ${todo.length} lesson(s) still below 80%, about ${perDay} per day, weakest first.</div><div class="card"><table><tr><th>Day</th><th>Lessons</th><th>Daily habit</th></tr>${rows.join('')}</table></div>`;
    }
    return `<h1>Study planner</h1><p class="sub">Builds a day‑by‑day plan from your exam date and your mastery, weakest topics first. ${ADD}</p>
      <div class="ar">أدخل موعد اختبارك، وسيوزّع المخطط الدروس غير المتقنة على الأيام المتبقية بدءًا بالأضعف.</div>
      <div class="card row noprint"><label>Exam date <input type="date" id="pdate" value="${p ? p.exam : ''}"></label><span>Chapters:</span>${COURSE.map(c => `<label><input type="checkbox" class="pch" value="${c.id}" ${!p || !p.chs.length || p.chs.includes(c.id) ? 'checked' : ''}> ${c.n}</label>`).join(' ')}<button class="btn" id="pgo">Build plan</button></div>${body}`;
  };
  function afterPlan() { $('#pgo').onclick = () => { const v = $('#pdate').value; if (!v) return alert('Pick your exam date.'); S.plan = { exam: v, chs: [...document.querySelectorAll('.pch:checked')].map(x => x.value) }; save(); route(); }; }

  // ---------- report ----------
  views.report = () => {
    const ls = allLessons();
    const mins = Math.round(Object.values(S.days).reduce((a, b) => a + b, 0));
    const last14 = [...Array(14)].map((_, k) => { const d = new Date(); d.setDate(d.getDate() - 13 + k); const key = d.toISOString().slice(0, 10); return [key.slice(5), Math.round(S.days[key] || 0)]; });
    const maxM = Math.max(10, ...last14.map(x => x[1]));
    const weak = ls.map(l => ({ l, m: mastery(l.id) })).filter(x => x.m != null && x.m < 60);
    const mByCh = {}; S.mistakes.forEach(m => { const l = m.lessonId && lessonById(m.lessonId); const k = l ? l.ch.title : 'Practice / exam'; mByCh[k] = (mByCh[k] || 0) + 1; });
    return `<h1>Progress report</h1><p class="sub">Generated ${new Date().toLocaleString()} · ${ADD}</p>
      <div class="row noprint"><button class="btn small" onclick="window.print()">Print / save as PDF</button><button class="btn small ghost" id="exp">Export backup</button><label class="btn small ghost">Import backup<input type="file" id="imp" accept=".json" style="display:none"></label><button class="btn small ghost" id="reset">Reset progress</button></div>
      <div class="grid g3" style="margin-top:12px"><div class="card"><div class="stat">${ls.filter(l => (mastery(l.id) ?? 0) >= 80).length}/${ls.length}<small>lessons mastered</small></div></div><div class="card"><div class="stat">${mins} min<small>total study time</small></div></div><div class="card"><div class="stat">${S.exams[0] ? S.exams[0].pct + '%' : '—'}<small>last exam score (${S.exams.length} taken)</small></div></div></div>
      <h2>Mastery by chapter</h2><div class="card"><table><tr><th>Chapter</th><th>Lessons started</th><th>Mastery</th><th style="width:35%"></th></tr>${COURSE.map(c => { const cm = chapterMastery(c); return `<tr><td>Ch ${c.n}. ${esc(c.title)}</td><td>${cm.started}/${cm.total}</td><td><b>${cm.avg}%</b></td><td>${bar(cm.avg)}</td></tr>`; }).join('')}</table></div>
      <h2>Lessons</h2><div class="card"><table><tr><th>Lesson</th><th>Quiz best</th><th>Attempts</th><th>Mastery</th></tr>${ls.map(l => { const st = S.lessons[l.id] || {}; const m = mastery(l.id); const [lv, cls] = level(m); return `<tr><td>${l.ch.n}. ${esc(l.title)}</td><td>${st.quizBest != null ? st.quizBest + '%' : '—'}</td><td>${st.quizAttempts || 0}</td><td><span class="${cls}">${lv}${m != null ? ' ' + m + '%' : ''}</span></td></tr>`; }).join('')}</table></div>
      <h2>Study time (last 14 days)</h2><div class="card"><svg viewBox="0 0 700 160" width="100%" role="img" aria-label="Minutes studied per day">${last14.map((x, k) => { const h = x[1] / maxM * 120; return `<rect x="${k * 50 + 8}" y="${130 - h}" width="34" height="${h}" rx="4" fill="var(--brand)"><title>${x[0]}: ${x[1]} min</title></rect><text x="${k * 50 + 25}" y="148" font-size="11" text-anchor="middle" fill="var(--muted)">${x[0]}</text>${x[1] ? `<text x="${k * 50 + 25}" y="${124 - h}" font-size="11" text-anchor="middle" fill="var(--ink)">${x[1]}</text>` : ''}`; }).join('')}</svg></div>
      <h2>Where mistakes happen</h2><div class="card">${Object.keys(mByCh).length ? `<table>${Object.entries(mByCh).sort((a, b) => b[1] - a[1]).map(([k, v]) => `<tr><td>${esc(k)}</td><td><b>${v}</b></td></tr>`).join('')}</table>` : 'No mistakes recorded yet.'}</div>
      <h2>Recommendations</h2><div class="card"><ul class="clean">${weak.length ? weak.map(x => `<li>Review <a href="#lesson/${x.l.id}">${esc(x.l.title)}</a> (${x.m}%)</li>`).join('') : '<li>No lesson below 60%. Keep going.</li>'}<li>${recommend().why}</li></ul></div>`;
  };
  function afterReport() {
    $('#exp').onclick = () => { const b = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = `physics-lab-backup-${today()}.json`; a.click(); };
    $('#imp').onchange = e => { const f = e.target.files[0]; if (!f) return; f.text().then(t => { try { S = Object.assign(blank(), JSON.parse(t)); save(); route(); } catch (err) { alert('Not a valid backup file.'); } }); };
    $('#reset').onclick = () => { if (confirm('Erase all progress on this computer?')) { const p = S.prefs; S = blank(); S.prefs = p; save(); route(); } };
  }

  // ---------- sources & gap summary ----------
  const GAPS = [
    ['G‑01', 'No lab manual, experiment sheets or lab rubric in the files.', 'Virtual Lab is fully additional design.'],
    ['G‑02/03', 'No course code, learning outcomes, prerequisites or grade distribution.', 'Exam simulator format is a guess.'],
    ['G‑04', 'S03 defines average acceleration as "average velocity / time".', 'Tutor uses Δv/Δt (book).'],
    ['G‑05', 'Ex 2.7 prints 40.1°; calculation gives 40.4°.', 'Both shown.'],
    ['G‑06', 'Ex 3.1 has different numbers in slides and book.', 'Both versions shown.'],
    ['G‑07', 'Book Ex 5.5 gives KE_f = 15 J; correct is 25 J (slides).', '25 J used.'],
    ['G‑08', 'Ex 5.9 statement uses 5t², solution 3t²; "from static" contradicts v(0) = −6 m/s.', 'Instructor review.'],
    ['G‑10', 'Ex 6.2 units (cm vs m).', 'Instructor review.'],
    ['G‑11', 'Ex 9.5 uses 0.2 mm diameter as radius.', 'Both readings shown.'],
    ['G‑12', 'Ex 9.2 converts cm² with 10⁻².', 'Correct value 2×10⁵ A/m² shown.'],
    ['G‑13', 'Old S09 vs S09U current definition.', 'S09U used.'],
    ['G‑20', 'S06 Ex 6.3 prints "106 N" for 10⁶ N.', 'Corrected.'],
    ['G‑24', 'Some textbook page numbers not seen in the scan.', 'Check your printed book.'],
    ['G‑26', 'Book Ex 4.3: 1.8/30 printed as 0.1 (is 0.06), so direction 11.3° should be 6.9°.', 'Corrected with note.'],
    ['G‑27', 'Book Ex 2.9 gives 17k̂; determinant gives k̂.', 'Corrected with note.']
  ];
  views.sources = () => `<h1>Sources & honesty notes</h1><p class="sub">What comes from your files, and what was added.</p>
    <div class="card"><table><tr><th>Code</th><th>File</th><th>Content</th></tr>
    ${[['S01', '01 (1).pdf', 'Units and Dimension'], ['S02', '02 (1).pdf', 'Vectors'], ['S03', '03 (1).pdf', 'Motion in one dimension'], ['S04', '04 (1).pdf', 'Laws of Motion'], ['S05', '05.pdf', 'Work and Energy'], ['S06', '06.pdf', 'Elasticity and Fluid Mechanics'], ['S07', '07.pdf', 'Heat'], ['S08', '08.pdf', 'Static Electricity'], ['S09', '09.pdf', 'Current and Resistance (old)'], ['S09U', 'Ch 9 Updated.pdf', 'Current and Resistance (used)'], ['S10', '10.pdf', 'Light'], ['BK p.N', 'G-Physics-Eng.pdf', 'Textbook "General Physics" (scan), printed page N']].map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</table></div>
    <div class="card"><span class="pill src">📘 course files</span> definitions, laws, symbols, worked examples, book exercises, figures referenced.<br><span class="pill add">🧩 additional design</span> real‑life examples, common mistakes, quick checks, quiz items without a citation, all solutions to book exercises, practice generators, flashcards, exam simulator, planner, virtual lab.</div>
    <div class="card"><span class="pill ext">🔗 external reference</span> Serway & Jewett, <i>Physics for Scientists and Engineers</i>, 9th ed.: the first reference listed in your course book (BK p.179). Each lesson links only the sections on the same topic, plus extra odd‑numbered problems whose answers match the book's answer key. It is not course content: if it differs from your slides, follow the slides.</div>
    <div class="ar">كل ما يحمل 📘 منقول من ملفاتك مع رقم الصفحة أو الشريحة، وكل ما يحمل 🧩 من تصميمي ولا يُعد جزءًا من المقرر.</div>
    <h2>Issues found in the sources (summary of the gap log)</h2><div class="card"><table><tr><th>ID</th><th>Issue</th><th>Handling</th></tr>${GAPS.map(g => `<tr><td>${g[0]}</td><td>${g[1]}</td><td>${g[2]}</td></tr>`).join('')}</table><p class="muted">Full table: <i>Course_Reference_and_Gap_Log.md</i> in this folder.</p></div>`;

  // ---------- search ----------
  function search(qs) {
    qs = qs.toLowerCase().trim(); if (qs.length < 2) return [];
    const out = [];
    allLessons().forEach(l => {
      const hay = [l.title, l.ar, ...l.terms.map(t => t.join(' ')), ...l.formulas.map(f => f.name + ' ' + f.f)].join(' ').toLowerCase();
      if (hay.includes(qs)) out.push(`<a href="#lesson/${l.id}">Ch ${l.ch.n} · ${esc(l.title)}</a>`);
    });
    return out.slice(0, 12);
  }

  // turn v_f, k_e, Q_lost … into subscripts (text outside tags only)
  function subs(html) { return html.split(/(<[^>]*>)/).map(p => p.startsWith('<') ? p : p.replace(/([A-Za-zθρΔσεμλαΣ])_([A-Za-z0-9]{1,6})/g, '$1<sub>$2</sub>')).join(''); }

  // ---------- router ----------
  const NAV = [['home', '🏠 Home', 'الرئيسية'], ['course', '📚 Course map', 'خريطة المقرر'], ['practice', '♾️ Unlimited practice', 'تدريب'], ['exam', '⏱️ Exam simulator', 'محاكي الاختبار'], ['flashcards', '🃏 Flashcards', 'البطاقات'], ['mistakes', '📓 Mistake journal', 'دفتر الأخطاء'], ['formulas', '∑ Formula sheet', 'القوانين'], ['tools', '🧰 Tools', 'أدوات'], ['plan', '🗓️ Study planner', 'مخطط المذاكرة'], ['report', '📈 Progress report', 'تقرير الإنجاز'], ['sources', '📘 Sources & gaps', 'المصادر']];
  views.course = () => `<h1>Course map</h1><p class="sub">General Physics · 10 chapters as ordered in your textbook. <span class="pill src">📘 BK chapter openers</span></p>` + COURSE.map(c => { const cm = chapterMastery(c); return `<div class="card"><div class="chap"><a href="#chapter/${c.id}"><b>Ch ${c.n}. ${esc(c.title)}</b></a><span class="muted"><bdi>${c.ar}</bdi> · ${c.src}</span></div>${bar(cm.avg)}${c.lessons.map((l, i) => { const m = mastery(l.id); const [lv, cls] = level(m); return `<a class="lessonlink" href="#lesson/${l.id}"><span>${c.n}.${i + 1} ${esc(l.title)}</span><span class="${cls}">${lv}${m != null ? ' ' + m + '%' : ''}</span></a>`; }).join('')}</div>`; }).join('');

  function sidebar(active) {
    const chs = COURSE.map(c => { const cm = chapterMastery(c); return `<a href="#chapter/${c.id}" class="${active === 'chapter/' + c.id ? 'active' : ''}"><span>${c.n}. ${esc(c.title)}</span><small>${cm.avg}%</small></a>`; }).join('');
    return NAV.map(n => `<a href="#${n[0]}" class="${active.split('/')[0] === n[0] ? 'active' : ''}"><span>${n[1]}</span><small>${n[2]}</small></a>`).join('') + `<div class="sec">Chapters</div>` + chs;
  }
  function route() {
    const h = (location.hash || '#home').slice(1); const [v, arg] = h.split('/');
    const view = views[v] || views.home;
    $('#main').innerHTML = subs(view(arg));
    $('#side').innerHTML = sidebar(h); $('#side').classList.remove('open');
    if (v === 'lesson') afterLesson(arg);
    if (v === 'practice') afterPractice(arg);
    if (v === 'exam') afterExam();
    if (v === 'flashcards') afterFlash(arg);
    if (v === 'mistakes') afterMistakes();
    if (v === 'tools') afterTools();
    if (v === 'plan') afterPlan();
    if (v === 'report') afterReport();
    window.scrollTo(0, 0);
  }

  function applyPrefs() {
    document.body.classList.toggle('hide-ar', !S.prefs.ar);
    document.documentElement.dataset.theme = S.prefs.theme;
    $('#tar').classList.toggle('on', S.prefs.ar); $('#tth').textContent = S.prefs.theme === 'dark' ? '☀️ Light' : '🌙 Dark';
  }
  document.addEventListener('DOMContentLoaded', () => {
    $('#tar').onclick = () => { S.prefs.ar = !S.prefs.ar; save(); applyPrefs(); };
    $('#tth').onclick = () => { S.prefs.theme = S.prefs.theme === 'dark' ? 'light' : 'dark'; save(); applyPrefs(); };
    $('#menu').onclick = () => $('#side').classList.toggle('open');
    const sr = $('#search'), res = $('#results');
    sr.oninput = () => { const r = search(sr.value); res.innerHTML = r.length ? `<div class="card results">${r.join('')}</div>` : ''; };
    res.onclick = () => { res.innerHTML = ''; sr.value = ''; };
    applyPrefs(); route();
  });
  window.addEventListener('hashchange', route);
  window.__PLL = { mastery, parseNum, numOk, dimOf, G, allLessons };
})();
