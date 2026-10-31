/* Physics Learning Lab — application logic (additional design). Works offline from a local file. */
(function () {
  'use strict';

  // ---------- state ----------
  const KEY = 'physics-learning-lab-v1';
  const blank = () => ({ lessons: {}, mistakes: [], cards: {}, exams: [], days: {}, plan: null, found: {}, placement: null, prefs: { ar: true, theme: null } });
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
  const ARL = id => ((window.AR || {}).lessons || {})[id] || null;
  const ARC = id => ((window.AR || {}).chapters || {})[id] || '';
  const arLine = t => t ? `<div class="ar arsub">${t}</div>` : '';
  // 🔊 reads an English term aloud with the browser's own voice (works offline where the device has an English voice)
  const CAN_SAY = 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
  const plain = h => String(h).replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, ' ').trim();
  const say = h => CAN_SAY ? `<button class="say noprint" data-say="${esc(plain(h))}" title="Listen · استمع" aria-label="Listen to ${esc(plain(h))}">🔊</button>` : '';
  // spoken form of a term: read symbols and dashes the way a teacher would say them
  const SAYW = { 'α': ' alpha', 'β': ' beta', 'γ': ' gamma', 'δ': ' delta', 'Δ': ' delta', 'ε': ' epsilon', 'θ': ' theta', 'λ': ' lambda', 'μ': ' mu', 'ρ': ' rho', 'σ': ' sigma', 'τ': ' tau', 'φ': ' phi', 'ω': ' omega', 'Ω': ' ohms', 'π': ' pi', '₀': ' zero', '₁': ' one', '₂': ' two' };
  const sayText = t => t.replace(/[‑‐]/g, '-').replace(/\s+[–—]\s+/g, ', ').replace(/[–—]/g, '-').replace(/\s*\/\s*/g, ', ').replace(/&/g, ' and ').replace(/…/g, '')
    .replace(/_/g, ' ').replace(/[αβγδΔεθλμρστφωΩπ₀₁₂]/g, c => SAYW[c]).replace(/\s+/g, ' ').trim();
  // pick a clear English voice: neural/online voices first, then well-known US voices, then any en-US, then any English
  let VOICE = null;
  function pickVoice() {
    const vs = CAN_SAY ? speechSynthesis.getVoices() : []; if (!vs.length) return;
    const en = vs.filter(v => /^en[-_]/i.test(v.lang)), us = en.filter(v => /^en[-_]US/i.test(v.lang));
    const score = v => (/natural|online|neural/i.test(v.name) ? 8 : 0) + (/google us english|aria|jenny|guy|zira|samantha|alex/i.test(v.name) ? 4 : 0) + (/^en[-_]US/i.test(v.lang) ? 2 : /^en[-_]GB/i.test(v.lang) ? 1 : 0) + (v.localService ? 0 : 1);
    VOICE = (us.length ? us : en).sort((a, b) => score(b) - score(a))[0] || null;
  }
  if (CAN_SAY) { pickVoice(); try { speechSynthesis.addEventListener('voiceschanged', pickVoice); } catch (e) { /* older browsers */ } }
  function speak(text, btn) {
    try {
      speechSynthesis.cancel(); if (!VOICE) pickVoice();
      const u = new SpeechSynthesisUtterance(sayText(text)); u.lang = VOICE ? VOICE.lang : 'en-US'; u.rate = 0.85; u.pitch = 1;
      if (VOICE) u.voice = VOICE;
      if (btn) { btn.classList.add('on'); u.onend = u.onerror = () => btn.classList.remove('on'); }
      speechSynthesis.speak(u);
    } catch (e) { /* speech not available */ }
  }
  const ADD = `<span class="pill add" title="Additional design: not from the course files">🧩 Additional design</span>`;
  const EXT = `<span class="pill ext" title="From Serway & Jewett, Physics for Scientists and Engineers, 9th ed.: reference 1 in your course book (BK p.179), not course content">🔗 External reference · Serway</span>`;
  const SW = id => (window.SERWAY || {})[id];
  const swItem = p => p.o ? { q: `<span class="muted" style="font-size:13px">Serway ${p.id} · PDF p.${p.page}</span><br>${p.q}`, o: p.o, a: p.a, why: `${p.sol}<br><b>Book answer:</b> ${p.ans}` } : { q: `<span class="muted" style="font-size:13px">Serway ${p.id} · PDF p.${p.page}</span><br>${p.q}`, num: p.num, tol: p.tol, unit: p.unit, sol: `${p.sol}<br><b>Book answer:</b> ${p.ans}` };
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  // {{a // b}} in the content is drawn as a fraction: a over b
  const mathify = s => String(s).replace(/\{\{(.+?)\s*\/\/\s*(.+?)\}\}/g, (m, a, b) => `<span class="frac"><span class="nu">${a.trim()}</span><span class="de">${b.trim()}</span></span>`);
  // fuller Arabic goals and reasons, and three real-life examples per lesson (content_life.js)
  window.COURSE.forEach(c => c.lessons.forEach(l => { const x = (window.LIFE || {})[l.id]; if (!x) return; if (x.goalsAr) l.goalsAr = x.goalsAr; if (x.whyAr) l.why.ar = x.whyAr; if (x.life) l.lifeList = x.life; }));
  (function deepMath(o) { for (const k in o) { const v = o[k]; if (typeof v === 'string') { if (v.includes('{{')) o[k] = mathify(v); } else if (v && typeof v === 'object') deepMath(v); } })([window.COURSE, window.FORMS || {}]);
  const fx = s => subs(mathify(s));
  // inside a Claude link the page runs in a frame where print, downloads and confirm() are blocked
  const FRAMED = (() => { try { return window.self !== window.top; } catch (e) { return true; } })();
  document.documentElement.classList.toggle('framed', FRAMED);
  // a yes/no question shown in the page itself (confirm() does not work everywhere)
  function inlineConfirm(holder, html, onYes) {
    holder.innerHTML = `<div class="inconf"><span>${html}</span><button class="btn small" data-y>Yes</button><button class="btn small ghost" data-n>Cancel</button></div>`;
    holder.querySelector('[data-y]').onclick = () => { holder.innerHTML = ''; onYes(); };
    holder.querySelector('[data-n]').onclick = () => { holder.innerHTML = ''; };
  }
  // text the viewer can copy when a file download is not possible
  function copyBox(holder, text, label) {
    holder.innerHTML = `<p class="muted" style="margin:8px 0 0">${label}</p><textarea class="copybox" id="copytxt" readonly></textarea><button class="btn small" id="copybtn">Copy</button> <span class="muted" id="copymsg"></span>`;
    const ta = holder.querySelector('textarea'); ta.value = text;
    holder.querySelector('#copybtn').onclick = () => { const done = () => holder.querySelector('#copymsg').textContent = 'Copied.'; try { navigator.clipboard.writeText(text).then(done, () => { ta.select(); holder.querySelector('#copymsg').textContent = 'Selected: press Ctrl+C to copy.'; }); } catch (e) { ta.select(); } };
  }
  const fmt = (x, d = 3) => { if (!isFinite(x)) return String(x); const a = Math.abs(x); if (a !== 0 && (a >= 1e5 || a < 1e-3)) return x.toExponential(d - 1).replace('e', ' × 10^').replace('+', ''); return String(+x.toPrecision(d + 1)); };

  // A number answer may be a plain number (2.5, 1.6e-19, 1.6×10^-19, 1.6×10⁻¹⁹) or a short calculation:
  // + − × ÷ ^ ( ), √ / sqrt, π / pi, sin cos tan (degrees), log (base 10). Anything else is not read.
  function parseNum(str) {
    if (str == null) return NaN;
    let s = String(str).trim().replace(/\s+/g, '').replace(/,/g, '').replace(/[−–]/g, '-');
    if (!s) return NaN;
    if (/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i.test(s)) return parseFloat(s);
    const sup = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-' };
    s = s.replace(/[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, m => '^(' + m.split('').map(c => sup[c]).join('') + ')')
      .replace(/[×·]/g, '*').replace(/÷/g, '/').replace(/π/g, 'pi').replace(/√/g, 'sqrt').replace(/(\d|\))x(?=[\d(.])/gi, '$1*').toLowerCase();
    const tk = s.match(/\d+\.?\d*(?:e[+-]?\d+)?|\.\d+(?:e[+-]?\d+)?|[a-z]+|[-+*/^()]/g);
    if (!tk || tk.join('') !== s) return NaN;
    let i = 0;
    const F = { sqrt: Math.sqrt, sin: x => Math.sin(x * Math.PI / 180), cos: x => Math.cos(x * Math.PI / 180), tan: x => Math.tan(x * Math.PI / 180), log: Math.log10, ln: Math.log };
    const starts = t => t != null && (/^[\d.]/.test(t) || /^[a-z]/.test(t) || t === '(');
    function prim() {
      const t = tk[i++];
      if (t == null) throw 0;
      if (/^[\d.]/.test(t)) return parseFloat(t);
      if (t === 'pi') return Math.PI;
      if (t === '(') { const v = expr(); if (tk[i++] !== ')') throw 0; return v; }
      if (F[t]) return F[t](unary());
      throw 0;
    }
    function power() { const b = prim(); if (tk[i] === '^') { i++; return Math.pow(b, unary()); } return b; }
    function unary() { if (tk[i] === '-') { i++; return -unary(); } if (tk[i] === '+') { i++; return unary(); } return power(); }
    function term() { let v = unary(); for (;;) { if (tk[i] === '*') { i++; v *= unary(); } else if (tk[i] === '/') { i++; v /= unary(); } else if (starts(tk[i])) v *= unary(); else return v; } }
    function expr() { let v = term(); while (tk[i] === '+' || tk[i] === '-') { const op = tk[i++]; const w = term(); v = op === '+' ? v + w : v - w; } return v; }
    try { const v = expr(); return i === tk.length && isFinite(v) ? v : NaN; } catch (e) { return NaN; }
  }
  const pretty = x => fmt(x).replace(/ × 10\^(-?\d+)/, (m, e) => ' × 10' + e.replace(/-/g, '⁻').replace(/\d/g, d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]));
  // key bar under every number box: inserts at the cursor and keeps the box focused
  const KEYS = [['×10ⁿ', '×10^', 'times ten to the power'], ['^', '^', 'power'], ['√', '√(', 'square root'], ['π', 'π', 'pi'], ['(', '(', ''], [')', ')', ''], ['×', '×', 'multiply'], ['÷', '÷', 'divide'], ['−', '-', 'minus'], ['⌫', null, 'delete']];
  const keyBar = () => `<div class="mkeys" role="toolbar" aria-label="Answer keys">${KEYS.map(k => `<button type="button" class="mk" data-k="${k[1] == null ? '' : esc(k[1])}" ${k[1] == null ? 'data-del="1"' : ''} title="${k[2]}">${k[0]}</button>`).join('')}</div><div class="mprev" aria-live="polite"></div>`;
  document.addEventListener('mousedown', e => { if (e.target.closest('.mk')) e.preventDefault(); });
  // the bar appears the first time the box is used and then stays, so nothing jumps when the box loses focus
  document.addEventListener('focusin', e => { const n = e.target.closest && e.target.closest('.numin'); if (n && e.target.tagName === 'INPUT') n.classList.add('kb'); });
  document.addEventListener('click', e => {
    const k = e.target.closest('.mk'); if (!k) return;
    const inp = k.closest('.numin').querySelector('input'); if (inp.disabled) return;
    const a = inp.selectionStart ?? inp.value.length, b = inp.selectionEnd ?? a;
    if (k.dataset.del) { if (a === b && a > 0) inp.setRangeText('', a - 1, a, 'end'); else inp.setRangeText('', a, b, 'end'); }
    else inp.setRangeText(k.dataset.k, a, b, 'end');
    inp.focus(); inp.dispatchEvent(new Event('input', { bubbles: true }));
  });
  document.addEventListener('input', e => {
    const inp = e.target; if (!inp.closest || !inp.closest('.numin')) return;
    const box = inp.closest('.numin').querySelector('.mprev'); if (!box) return;
    const raw = inp.value.trim(), v = parseNum(raw);
    box.innerHTML = !raw ? '' : isNaN(v) ? '<span class="hint">Not a number yet: use digits, ×10^, ^, √, π, ( ) and + − × ÷</span>' : (/^[+-]?(\d+\.?\d*|\.\d+)$/.test(raw.replace(/,/g, '')) ? '' : `Your answer reads as <b>${pretty(v)}</b>`);
  });
  function numOk(given, ans, tol) {
    const t = tol && tol > 0 ? tol : 0.005;
    if (ans === 0) return Math.abs(given) < 1e-9;
    return Math.abs(given - ans) <= Math.abs(ans) * t + 1e-12;
  }

  // worked-example solver: blank out the result after the last usable "=" in a step
  const STEPNUM = /^\s*([+\-−]?(?:\d{1,3}(?: \d{3})+|\d+)(?:\.\d+)?(?:\s*×\s*10[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)?|10[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)(?=$|[\s°,(])/;
  function stepBlank(s) {
    for (let i = s.lastIndexOf('='); i >= 0; i = i ? s.lastIndexOf('=', i - 1) : -1) {
      const rest = s.slice(i + 1), m = rest.match(STEPNUM);
      if (!m) continue;
      const after = rest.slice(m[0].length), u = after.match(/^\s*([^\s,()→=]*)/), tail = after.slice(u[0].length);
      if (!/^\s*($|[,(→;]|=\s*[A-Za-zΑ-ω]|at\b|in\b)/.test(tail) || /^[−+\-·×/]/.test(u[1])) continue;
      let t = m[1].replace(/\s/g, '').replace(/−/g, '-');
      if (/^10[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]/.test(t)) t = '1×' + t;
      return { pre: s.slice(0, i + 1) + ' ', num: t, unit: u[1], post: tail };
    }
    return null;
  }

  const VARY = window.VARY || {};
  function workedLis(steps) {
    return steps.map((s, i) => { const b = stepBlank(s); return `<li data-i="${i}"${b ? ` data-num="${esc(b.num)}"` : ''}><div class="wq">${b ? `${b.pre}<input type="text" inputmode="decimal" aria-label="Result of step ${i + 1}" placeholder="?"> ${esc(b.unit)}${b.post} <button class="btn small wchk">Check</button>` : `<span class="muted">Work this step out on paper, then press <b>Show step</b> to compare. · اكتب هذه الخطوة في ورقتك ثم اضغط «أظهر الخطوة» للمقارنة.</span>`}<div class="wfb"></div></div><div class="wfull">${s}</div></li>`; }).join('');
  }

  function logMistake(item, given, lessonId) {
    S.mistakes.unshift({ q: item.q, given: String(given), correct: item.o ? item.o[item.a] : (fmt(item.num ?? item.ans) + ' ' + (item.unit || '')), sol: item.why || item.sol || '', lessonId: lessonId || null, ts: Date.now(), reviewed: false });
    S.mistakes = S.mistakes.slice(0, 300); save();
  }

  // Renders one question (MCQ or numeric). onDone(correct) fires once.
  function qHTML(item, key) {
    if (item.o) {
      return `<div class="q" data-key="${key}"><div class="qt">${fx(item.q)}</div><div class="opts">${item.o.map((o, i) => `<button class="opt" data-i="${i}">${String.fromCharCode(65 + i)}. ${fx(o)}</button>`).join('')}</div><div class="fbwrap"></div></div>`;
    }
    return `<div class="q" data-key="${key}"><div class="qt">${fx(item.q)}</div><div class="numin"><input type="text" inputmode="text" autocomplete="off" spellcheck="false" placeholder="e.g. 2.5, 1.6×10^-19 or 9e9*2e-6/0.03^2"> <span class="muted">${esc(item.unit || '')}</span> <button class="btn small chk">Check</button>${keyBar()}</div><div class="fbwrap"></div></div>`;
  }
  function wireQ(root, item, onDone, opts = {}) {
    const box = root.querySelector('.q');
    const fb = box.querySelector('.fbwrap');
    let done = false;
    const show = (ok, extra) => {
      fb.innerHTML = `<div class="fb ${ok ? 'ok' : 'bad'}">${ok ? '✔ Correct' : '✘ Not quite'}${extra ? ' — ' + extra : ''}${opts.hideSol ? '' : `<div class="sol">${fx(item.why || item.sol || '')}</div>`}</div>`;
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
        if (isNaN(v)) { fb.innerHTML = `<div class="hint">Enter a number or a calculation, e.g. 1.6×10^-19 or 9e9*2e-6/0.03^2.</div>`; return false; }
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
    if (!S.placement && !ls.some(l => mastery(l.id) != null)) return { href: '#placement', label: 'Take the placement test', why: 'New here? A 15‑minute placement test checks the maths and reading skills the course assumes, then tells you where to start.', whyAr: 'أول مرة؟ اختبار تحديد المستوى (ربع ساعة) يقيس المهارات التي يفترضها المقرر، ثم يخبرك من أين تبدأ.' };
    if (next) { const gap = (PREREQ[next.ch.id] || []).map(skillById).find(k => { const m = skillScore(k.id); return m != null && m < 80; });
      if (gap) return { href: `#skill-${gap.id}`, label: `Open: ${gap.title}`, why: `Before “${next.title}”, strengthen a skill chapter ${next.ch.n} needs: “${gap.title}” (${skillScore(gap.id)}%).`, whyAr: `قبل هذا الدرس قوِّ مهارة يحتاجها الفصل: ${gap.ar}.` }; }
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
      <h1>${S.prefs.name ? `Welcome, ${esc(S.prefs.name)}` : 'Welcome to your Physics Learning Lab'}</h1>
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
        ${r.href ? `<a class="btn" href="${r.href}">${esc(r.label)}</a>` : r.l ? `<a class="btn" href="#lesson-${r.l.id}">Open: ${esc(r.l.title)}</a>` : `<a class="btn" href="#exam">Open the exam simulator</a>`}
        ${S.mistakes.filter(m => !m.reviewed).length ? ` <a class="btn ghost" href="#mistakes">Review ${S.mistakes.filter(m => !m.reviewed).length} mistakes</a>` : ''}
      </div>
      <h2>Chapters</h2>
      <div class="grid g2">${COURSE.map(c => { const cm = chapterMastery(c); return `<a class="card" style="text-decoration:none;color:inherit" href="#chapter-${c.id}"><div class="chap"><div><b>Ch ${c.n}. ${esc(c.title)}</b><div class="muted" style="font-size:13px">${c.lessons.length} lessons · <bdi>${c.ar}</bdi></div></div><b>${cm.avg}%</b></div>${bar(cm.avg)}</a>`; }).join('')}</div>
      <h2>How to use this tutor <span class="pill add">🧩</span></h2>
      <div class="card"><ol class="clean">
        <li>New to the course? Take the <a href="#placement">Placement test</a>, then study the <a href="#found">Unit 0</a> skills it marks.</li>
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
    return `<h1>Chapter ${c.n}: ${esc(c.title)}</h1><p class="sub"><bdi>${c.ar}</bdi> · ${srcPill(c.src)}</p>${arLine(ARC(c.id))}
      <div class="card"><div class="chap"><b>Chapter mastery</b><b>${cm.avg}%</b></div>${bar(cm.avg)}</div>
      ${readyBox(c)}
      ${c.lessons.map((l, i) => { const m = mastery(l.id); const [lv, cls] = level(m); return `<a class="lessonlink" href="#lesson-${l.id}"><span><b>${c.n}.${i + 1} ${esc(l.title)}</b><br><small class="muted">${l.ar}</small>${ARL(l.id) ? `<small class="ar arsub">${ARL(l.id).d}</small>` : ''}</span><span class="row"><span class="${cls}">${lv}${m != null ? ' · ' + m + '%' : ''}</span></span></a>`; }).join('')}
      <div class="row noprint" style="margin-top:14px"><a class="btn ghost" href="#exam-${c.id}">Chapter exam</a><a class="btn ghost" href="#practice-${c.id}">Unlimited practice</a><a class="btn ghost" href="#formulas-${c.id}">Formula sheet</a></div>`;
  };

  views.lesson = (id) => {
    const l = lessonById(id); if (!l) return views.home();
    const st = L(id); st.visits++; save();
    const idx = allLessons().findIndex(x => x.id === id);
    const prev = allLessons()[idx - 1], next = allLessons()[idx + 1];
    const step = (n, title, arTitle, body) => `<div class="step"><div class="num">${n}</div><h3>${title} <span class="muted" style="font-weight:400;font-size:14px">· ${arTitle}</span></h3></div><div class="stepbody">${body}</div>`;
    const conds = l.formulas.filter(f => f.cond && f.cond !== '—');
    return `
      <div class="row muted" style="font-size:13px"><a href="#chapter-${l.ch.id}">Ch ${l.ch.n}. ${esc(l.ch.title)}</a> › lesson</div>
      <h1>${esc(l.title)} ${say(l.title)}</h1>
      <p class="sub"><bdi>${l.ar}</bdi> · ${srcPill(l.src)}</p>${arLine((ARL(l.id) || {}).d)}
      ${step(1, 'What will you learn?', 'ماذا ستتعلم؟', `<ul class="clean">${l.goals.map(g => `<li>${g}</li>`).join('')}</ul><div class="ar">${l.goalsAr}</div>`)}
      ${step(2, 'Why do we need this?', 'لماذا نحتاجه؟', `<p>${l.why.en}</p><div class="ar">${l.why.ar}</div>`)}
      ${step(3, 'Step‑by‑step explanation', 'شرح متدرج', l.explain.map((e, i) => `<div class="card" style="margin:8px 0"><span class="pill">${i === 0 ? 'Basics' : i === l.explain.length - 1 && l.explain.length > 2 ? 'University level' : 'Building up'}</span><p style="margin:6px 0">${e.en}</p><div class="ar">${e.ar}</div></div>`).join(''))}
      ${step(4, 'English terms explained', 'المصطلحات', `<table><tr><th>Term</th><th class="arcell">بالعربية</th><th>Meaning</th></tr>${l.terms.map(t => `<tr><td><b>${t[0]}</b> ${say(t[0])}</td><td class="arcell">${t[1]}</td><td>${t[2]}</td></tr>`).join('')}</table>`)}
      ${step(5, 'Laws, symbols & units', 'القوانين والرموز والوحدات', l.formulas.map((f, fi) => `<div class="card" style="margin:8px 0"><b>${f.name}</b><div class="formula big">${f.f}</div>${words(l, fi)}${symTable(f)}${formsHTML(l, fi)}</div>`).join(''))}
      ${step(6, 'Assumptions & when to use', 'الافتراضات وشروط الاستخدام', conds.length ? `<ul class="clean">${conds.map(f => `<li><b>${f.name}:</b> ${f.cond}</li>`).join('')}</ul>` : '<p class="muted">No special conditions beyond the definitions above.</p>')}
      ${step(7, l.lifeList ? 'Real‑life examples' : 'Real‑life example', l.lifeList ? 'أمثلة من الحياة' : 'مثال من الحياة', l.lifeList ? `${ADD}<div class="lifelist">${l.lifeList.map(x => `<div class="life"><span class="lic" aria-hidden="true">${x[0]}</span><div class="lbody"><p>${x[1]}</p><div class="ar">${x[2]}</div></div></div>`).join('')}</div>` : `<div class="addbox">${ADD}<p style="margin:6px 0">${l.life.en}</p><div class="ar">${l.life.ar}</div></div>`)}
      ${step(8, 'Worked example, step by step', 'مثال محلول خطوة بخطوة', `<div class="card"><span id="wsrc">${srcPill(l.worked.src)}</span><span class="pill add" title="Solving it step by step yourself is additional design">step-by-step solver 🧩</span><p><b id="wq">${l.worked.q}</b></p><div id="war">${arLine((ARL(l.id) || {}).w)}</div><div class="wprompt" id="wprompt"></div><ol class="clean wsteps" id="wsteps">${workedLis(l.worked.steps)}</ol><div class="row noprint wbtns"><button class="btn small" id="wnext">Show step · أظهر الخطوة</button><button class="btn small ghost" id="wall">Show all · أظهر الكل</button><button class="btn small ghost" id="wreset" disabled>↺ Reset · إعادة تعيين</button>${VARY[l.id] ? '<button class="btn small ghost" id="wnew">🎲 New numbers · أرقام جديدة</button><button class="btn small ghost" id="worig" style="display:none">📘 Original numbers · الأرقام الأصلية</button>' : ''}</div><div id="wscore"></div><p id="wans" style="display:none"><b>Answer:</b> <span id="wansv">${l.worked.ans}</span></p>${l.worked.note ? `<div class="note" id="wnote">⚠ ${l.worked.note}</div>` : ''}</div>`)}
      ${step(9, 'Your turn: solve it yourself', 'دورك: حلّ بنفسك', `<div class="card" id="tryit">${srcPill(l.tryit.src)} <span class="pill add" title="The worked solution shown after you answer is additional design">solution 🧩</span>${qHTML({ q: l.tryit.q + arLine((ARL(l.id) || {}).t), num: l.tryit.ans, unit: l.tryit.unit }, 'try')}<div class="row noprint"><button class="btn small ghost" id="hintbtn">Need a hint?</button></div><div id="hintbox"></div></div>`)}
      ${step(10, 'Quick checks', 'أسئلة تحقق سريعة', `${ADD} <span class="muted" style="font-size:13px">(some reuse course examples, cited inside)</span><div id="checks">${l.checks.map((c, i) => `<div data-c="${i}">${qHTML(c, 'c' + i)}</div>`).join('')}</div>`)}
      ${step(11, 'Common mistakes & why they happen', 'أخطاء شائعة وأسبابها', `<div class="addbox">${ADD}<table>${l.mistakes.map((m, mi) => `<tr><td>✘ ${m[0]}</td><td>✔ ${m[1]}</td></tr>${ARL(l.id) && ARL(l.id).m[mi] ? `<tr class="armr"><td colspan="2"><div class="ar arsub">${ARL(l.id).m[mi]}</div></td></tr>` : ''}`).join('')}</table></div>`)}
      ${step(12, 'Summary for revision', 'ملخص للمراجعة', `<div class="card"><ul class="clean">${l.summary.map(s => `<li>${s}</li>`).join('')}</ul>${arLine((ARL(l.id) || {}).s)}</div>`)}
      ${step(13, 'Short quiz (solutions appear only after you answer)', 'اختبار قصير', `${ADD} <span class="muted" style="font-size:13px">questions citing “BK Ex.” are the textbook's exercises; their solutions are additional design</span><div id="quiz">${l.quiz.map((q, i) => `<div data-q="${i}">${qHTML(q, 'q' + i)}</div>`).join('')}</div><div id="quizres"></div>`)}
      ${SW(l.id) ? `<div class="step"><div class="num">📗</div><h3>Go deeper with Serway <bdi class="muted" style="font-weight:400">· تعمّق أكثر من مرجع Serway</bdi></h3></div><div class="stepbody">${EXT}
        <div class="card"><b>Read:</b> ${SW(l.id).read.map(r => `§${r.sec} ${esc(r.title)} <span class="muted">(PDF p.${r.page})</span>`).join(' · ')}<div class="ar">اقرأ هذه الأقسام فقط؛ فهي تغطي موضوع هذا الدرس نفسه. باقي الكتاب أوسع من مقررك.</div></div>
        <div class="muted" style="font-size:13px">Extra problems on this same topic (odd‑numbered, paraphrased with the book's data). Serway uses g = 9.80 m/s² and k = 8.99×10⁹, so answers within about ±1% are accepted.</div>
        <div id="serway">${SW(l.id).probs.map((p, i) => `<div data-s="${i}">${qHTML(swItem(p), 's' + i)}</div>`).join('')}</div></div>` : ''}
      ${step(14, 'What next?', 'ماذا بعد؟', `<div class="card" id="nextbox"></div>`)}
      <div class="row noprint" style="margin-top:24px;justify-content:space-between">${prev ? `<a class="btn ghost" href="#lesson-${prev.id}">← ${esc(prev.title)}</a>` : '<span></span>'}${next ? `<a class="btn ghost" href="#lesson-${next.id}">${esc(next.title)} →</a>` : ''}</div>`;
  };
  function afterLesson(id) {
    const l = lessonById(id), st = L(id);
    // worked example stepper
    let lis = [], wst = [];
    const wupd = () => {
      const k = wst.length;
      lis.forEach((li, i) => { li.className = i < k ? 'done ' + wst[i] : i === k ? 'cur' : 'todo'; });
      $('#wnext').disabled = $('#wall').disabled = k >= lis.length; $('#wreset').disabled = k === 0;
      $('#wans').style.display = k >= lis.length ? '' : 'none';
      const self = wst.filter(x => x === 'self').length, nb = lis.filter(li => li.dataset.num).length;
      $('#wprompt').innerHTML = k >= lis.length ? '' : `Step ${k + 1} of ${lis.length}: ${lis[k].dataset.num ? 'fill in the result, then press Check · اكتب الناتج ثم اضغط Check' : 'think it through first · فكّر في الخطوة أولًا'}`;
      $('#wscore').innerHTML = k >= lis.length ? `<div class="fb ${self === nb ? 'ok' : ''}">${self === nb ? '🎉 ' : ''}You solved ${self} of ${nb} result steps yourself. · حللت ${self} من ${nb} خطوات بنفسك.${self < nb ? ' Press Reset to try again without help. · اضغط «إعادة تعيين» لتحاول من جديد دون مساعدة.' : ''}${VARY[id] ? ' Press 🎲 New numbers to test your understanding on fresh data. · اضغط «أرقام جديدة» لتقيس فهمك بأرقام مختلفة.' : ''}</div>` : '';
      if (k < lis.length) { const inp = lis[k].querySelector('input'); if (inp && document.activeElement && document.activeElement.closest && document.activeElement.closest('#wsteps,.wbtns')) inp.focus(); }
    };
    const wwire = () => {
      lis = [...document.querySelectorAll('#wsteps li')]; wst.length = 0;
      lis.forEach((li, i) => {
        const inp = li.querySelector('input'); if (!inp) return;
        const chk = () => {
          if (wst.length !== i) return;
          const g = parseNum(inp.value), fb = li.querySelector('.wfb');
          if (isNaN(g)) { fb.innerHTML = '<div class="fb bad">Type a number, e.g. 2.5 or 1.6e-19 · اكتب رقمًا</div>'; return; }
          if (numOk(g, parseNum(li.dataset.num), 0.02)) { fb.innerHTML = ''; wst.push('self'); wupd(); }
          else fb.innerHTML = '<div class="fb bad">✘ Not yet. Check your arithmetic and powers of ten, try again, or press Show step. · ليس بعد؛ راجع الحساب وقوى العشرة، أو اضغط «أظهر الخطوة».</div>';
        };
        li.querySelector('.wchk').onclick = chk;
        inp.onkeydown = e => { if (e.key === 'Enter') chk(); };
      });
      wupd();
    };
    $('#wnext').onclick = () => { if (wst.length < lis.length) { wst.push('shown'); wupd(); } };
    $('#wall').onclick = () => { while (wst.length < lis.length) wst.push('shown'); wupd(); };
    $('#wreset').onclick = () => { wst.length = 0; lis.forEach(li => { const inp = li.querySelector('input'); if (inp) inp.value = ''; li.querySelector('.wfb').innerHTML = ''; }); wupd(); };
    // 🎲 same method, new data (content_vary.js); 📘 back to the course's own numbers
    const wset = (w, varied) => {
      $('#wq').innerHTML = fx(w.q); $('#wansv').innerHTML = fx(w.ans); $('#wsteps').innerHTML = fx(workedLis(w.steps));
      $('#wsrc').innerHTML = varied ? `<span class="pill add" title="New numbers are additional design; the method is the course's">🧩 new numbers · method from ${esc(l.worked.src)}</span>` : srcPill(l.worked.src);
      $('#war').style.display = varied ? 'none' : ''; if ($('#wnote')) $('#wnote').style.display = varied ? 'none' : '';
      if ($('#worig')) $('#worig').style.display = varied ? '' : 'none';
      wwire();
    };
    if ($('#wnew')) { $('#wnew').onclick = () => wset(VARY[id](), true); $('#worig').onclick = () => wset(l.worked, false); }
    wwire();
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
      $('#nextbox').innerHTML = `<div class="row"><span class="${cls}">${lv}${m != null ? ' · ' + m + '%' : ''}</span></div>${bar(m)}<p>${msg}</p><div class="ar">${ar}</div><div class="row noprint">${nx && m != null && m >= 80 ? `<a class="btn" href="#lesson-${nx.id}">Next lesson →</a>` : ''}<a class="btn ghost" href="#practice-${l.ch.id}">Practice this chapter</a></div>`;
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
    { ch: 'ch3', f: () => { const h = R(5, 120); const t = Math.sqrt(2 * h / 9.8); return { q: `A stone is dropped from rest from ${h} m. Time to reach the ground?`, ans: t, unit: 's', sol: `h = ½gt² → t = √( {{2 × ${h} // 9.8}} ) = ${fmt(t)} s` }; } },
    { ch: 'ch3', f: () => { const v = R(5, 40), a = R(1, 6, 1), d = R(10, 200); const vf = Math.sqrt(v * v + 2 * a * d); return { q: `A car at ${v} m/s accelerates at ${a} m/s² over ${d} m. Final speed?`, ans: vf, unit: 'm/s', sol: `v_f = √(${v}² + 2·${a}·${d}) = ${fmt(vf)} m/s` }; } },
    { ch: 'ch3', f: () => { const v = R(10, 60); return { q: `A ball is thrown up at ${v} m/s. Maximum height?`, ans: v * v / 19.6, unit: 'm', sol: `y_max = {{v_i² // 2g}} = {{${v}² // 2 × 9.8}} = ${fmt(v * v / 19.6)} m` }; } },
    { ch: 'ch4', f: () => { const m = R(2, 50), F = R(10, 300); return { q: `A net force of ${F} N acts on ${m} kg. Acceleration?`, ans: F / m, unit: 'm/s²', sol: `a = {{ΣF // m}} = {{${F} // ${m}}} = ${fmt(F / m)} m/s²` }; } },
    { ch: 'ch4', f: () => { const m = R(40, 100), a = R(1, 4, 1), up = Math.random() < .5; const n = m * (9.8 + (up ? a : -a)); return { q: `A ${m} kg person stands on a scale in an elevator accelerating ${up ? 'upward' : 'downward'} at ${a} m/s². Scale reading?`, ans: n, unit: 'N', sol: `n = m(g ${up ? '+' : '−'} a) = ${fmt(n)} N` }; } },
    { ch: 'ch5', f: () => { const F = R(10, 200), d = R(1, 20), t = pick([0, 30, 45, 60, 90, 120]); const W = F * d * Math.cos(t * Math.PI / 180); return { q: `F = ${F} N at ${t}° to a displacement of ${d} m. Work?`, ans: Math.abs(W) < 1e-9 ? 0 : W, unit: 'J', sol: `W = Fd cos θ = ${fmt(W)} J` }; } },
    { ch: 'ch5', f: () => { const m = R(1, 1500), v = R(1, 30); return { q: `Kinetic energy of ${m} kg at ${v} m/s?`, ans: .5 * m * v * v, unit: 'J', sol: `½mv² = ${fmt(.5 * m * v * v)} J` }; } },
    { ch: 'ch5', f: () => { const m = R(1, 100), h = R(1, 30), t = R(2, 30); return { q: `${m} kg is lifted ${h} m in ${t} s. Average power?`, ans: m * 9.8 * h / t, unit: 'W', sol: `P = {{m g h // t}} = {{${m} × 9.8 × ${h} // ${t}}} = ${fmt(m * 9.8 * h / t)} W` }; } },
    { ch: 'ch6', f: () => { const h = R(1, 100), rho = pick([1000, 1025, 13600, 900]); return { q: `Pressure due to a ${h} m column of liquid of density ${rho} kg/m³ (no atmosphere)?`, ans: rho * 9.8 * h, unit: 'Pa', sol: `ρgh = ${fmt(rho * 9.8 * h)} Pa` }; } },
    { ch: 'ch6', f: () => { const r1 = R(2, 10), r2 = R(1, r1 - 0.5, 1), v1 = R(1, 5, 1); const v2 = v1 * (r1 / r2) ** 2; return { q: `Water flows at ${v1} m/s in a pipe of radius ${r1} cm that narrows to ${r2} cm. New speed?`, ans: v2, unit: 'm/s', sol: `v₂ = v₁(r₁/r₂)² = ${fmt(v2)} m/s` }; } },
    { ch: 'ch6', f: () => { const F = R(100, 5000), d = R(1, 4, 1), L = R(1, 10), dL = R(1, 9) / 1000; const A = Math.PI * (d / 2000) ** 2; const Y = F / A / (dL / L); return { q: `A ${L} m wire of diameter ${d} mm stretches ${fmt(dL * 1000)} mm under ${F} N. Young's modulus?`, ans: Y, unit: 'N/m²', sol: `A = π(${d / 2} mm)² ; Y = (F/A)/(ΔL/L) = ${fmt(Y)} N/m²` }; } },
    { ch: 'ch7', f: () => { const F = R(-40, 220); return { q: `Convert ${F} °F to °C.`, ans: (F - 32) * 5 / 9, unit: '°C', sol: `{{5 // 9}} (${F} − 32) = ${fmt((F - 32) * 5 / 9)} °C` }; } },
    { ch: 'ch7', f: () => { const m = R(0.1, 5, 2), c = pick([[4186, 'water'], [900, 'aluminium'], [385, 'copper'], [2220, 'ice']]), dT = R(5, 80); return { q: `Heat to warm ${m} kg of ${c[1]} (c = ${c[0]} J/kg·K) by ${dT} K?`, ans: m * c[0] * dT, unit: 'J', sol: `Q = mcΔT = ${fmt(m * c[0] * dT)} J` }; } },
    { ch: 'ch7', f: () => { const L0 = R(1, 50), a = pick([1.2e-5, 1.7e-5, 1.8e-5, 2.4e-5]), dT = R(20, 400); return { q: `A ${L0} m bar (α = ${a.toExponential(1)} °C⁻¹) is heated by ${dT} °C. Expansion?`, ans: a * L0 * dT, unit: 'm', sol: `Δℓ = αℓΔT = ${fmt(a * L0 * dT)} m` }; } },
    { ch: 'ch8', f: () => { const q1 = R(1, 20), q2 = R(1, 20), r = R(1, 50); const F = 9e9 * q1 * 1e-6 * q2 * 1e-6 / (r / 100) ** 2; return { q: `Force between ${q1} μC and ${q2} μC, ${r} cm apart?`, ans: F, unit: 'N', sol: `F = {{k q₁ q₂ // r²}} = {{9×10⁹ × ${q1}×10⁻⁶ × ${q2}×10⁻⁶ // (${r / 100})²}} = ${fmt(F)} N` }; } },
    { ch: 'ch8', f: () => { const a = R(2, 30), b = R(1, 10), d = R(1, 10) / 1000; const C = 8.85e-12 * (a / 100) * (b / 100) / d; return { q: `Parallel plates ${a} cm × ${b} cm, ${fmt(d * 1000)} mm apart, vacuum. Capacitance?`, ans: C, unit: 'F', sol: `C = {{ε₀ A // d}} = ${fmt(C)} F` }; } },
    { ch: 'ch8', f: () => { const c1 = R(1, 20), c2 = R(1, 20), ser = Math.random() < .5; const C = ser ? c1 * c2 / (c1 + c2) : c1 + c2; return { q: `${c1} μF and ${c2} μF in ${ser ? 'series' : 'parallel'}. C_eq?`, ans: C, unit: 'μF', sol: ser ? `C_eq = {{C₁ C₂ // C₁ + C₂}} = {{${c1} × ${c2} // ${c1} + ${c2}}} = ${fmt(C)} μF` : `C₁ + C₂ = ${C} μF` }; } },
    { ch: 'ch9', f: () => { const V = R(1, 240), R0 = R(2, 500); return { q: `${V} V across ${R0} Ω. Current?`, ans: V / R0, unit: 'A', sol: `I = {{V // R}} = {{${V} // ${R0}}} = ${fmt(V / R0)} A` }; } },
    { ch: 'ch9', f: () => { const r = [R(2, 60), R(2, 60), R(2, 60)]; const p = 1 / (1 / r[0] + 1 / r[1] + 1 / r[2]); return { q: `${r.join(' Ω, ')} Ω in parallel. R_eq?`, ans: p, unit: 'Ω', sol: `{{1 // R_eq}} = {{1 // ${r[0]}}} + {{1 // ${r[1]}}} + {{1 // ${r[2]}}} → R_eq = ${fmt(p)} Ω` }; } },
    { ch: 'ch9', f: () => { const V = pick([12, 120, 230, 240]), P = R(10, 2500); return { q: `A ${P} W device runs on ${V} V. Resistance?`, ans: V * V / P, unit: 'Ω', sol: `R = {{V² // P}} = {{${V}² // ${P}}} = ${fmt(V * V / P)} Ω` }; } },
    { ch: 'ch10', f: () => { const n = pick([1.33, 1.5, 1.52, 1.66, 2.42]), t = R(10, 70); const t2 = Math.asin(Math.sin(t * Math.PI / 180) / n) * 180 / Math.PI; return { q: `Light goes from air into a medium (n = ${n}) at ${t}°. Refraction angle?`, ans: t2, unit: '°', sol: `θ₂ = sin⁻¹( {{sin ${t}° // ${n}}} ) = ${fmt(t2)}°` }; } },
    { ch: 'ch10', f: () => { const n = pick([1.33, 1.46, 1.5, 1.52, 1.66, 2.42]); const c = Math.asin(1 / n) * 180 / Math.PI; return { q: `Critical angle from a medium with n = ${n} into air?`, ans: c, unit: '°', sol: `sin θ_c = {{1 // ${n}}} → θ_c = ${fmt(c)}°` }; } }
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
      <button class="btn" id="estart">Start exam</button><span class="hint" id="emsg"></span></div></div>
      <div id="ebox"></div>
      ${hist ? `<h2>Previous attempts</h2><div class="card"><table><tr><th>Date</th><th>Qs</th><th>Score</th><th>Chapters</th></tr>${hist}</table></div>` : ''}`;
  };
  // The exam runs in a full-screen window over the page: one question at a time, a question map, a countdown,
  // answers can be changed until you submit, and nothing is graded before submitting.
  function afterExam() {
    $('#estart').onclick = () => {
      const chs = [...document.querySelectorAll('.ech:checked')].map(x => x.value);
      if (!chs.length) { $('#emsg').textContent = 'Pick at least one chapter.'; return; }
      const n = +$('#en').value, mins = +$('#em').value;
      let pool = [];
      COURSE.filter(c => chs.includes(c.id)).forEach(c => c.lessons.forEach(l => { l.quiz.concat(l.checks).forEach(q => pool.push(Object.assign({ ch: c.id, lessonId: l.id }, q))); pool.push({ ch: c.id, lessonId: l.id, q: l.tryit.q, num: l.tryit.ans, tol: l.tryit.tol, unit: l.tryit.unit, sol: l.tryit.sol }); }));
      if ($('#egen').checked) genFor().filter(g => chs.includes(g.ch)).forEach(g => { for (let k = 0; k < 2; k++) { const p = g.f(); pool.push({ ch: g.ch, q: p.q, num: p.ans, unit: p.unit, tol: 0.01, sol: p.sol }); } });
      const qs = shuffle(pool).slice(0, n);
      const chName = id => COURSE.find(c => c.id === id);
      openTest({ qs, mins, hash: location.hash || '#exam', noun: 'exam', nounAr: 'الاختبار',
        title: '📝 Exam <span class="muted" style="font-weight:400">· الاختبار</span>', sub: `${chs.map(c => 'Ch ' + chName(c).n).join(', ')} · ${qs.length} questions · ${mins} min`,
        label: q => `Ch ${chName(q.ch).n}. ${esc(chName(q.ch).title)}`, onFinish: (st, timeUp) => examResults(st, timeUp, chs) });
    };
  }
  // The test window: full screen over the page, one question at a time, a question map, a timer (a countdown when the
  // test has a time limit, otherwise the time used), answers can be changed until submitting, nothing graded before.
  function openTest(cfg) {
    const qs = cfg.qs;
    EXAM = Object.assign({ ans: {}, start: Date.now(), end: cfg.mins ? Date.now() + cfg.mins * 60000 : null, cur: 0, flags: {}, seen: {} }, cfg);
    const ov = document.createElement('div'); ov.className = 'exam-ov'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', cfg.noun);
    ov.innerHTML = subs(`<header class="exhead">
        <div class="extitle"><span>${cfg.title}</span><small class="muted">${cfg.sub}</small></div>
        <div class="extimer${EXAM.end ? '' : ' up'}" id="etimer" aria-live="off" title="${EXAM.end ? 'Time left' : 'Time used (no time limit)'}">--:--</div>
        <div class="exact"><span class="muted" id="eprog"></span><button class="btn" id="esubmit">${cfg.submitLabel || 'Submit · تسليم'}</button><button class="tog" id="efs" title="Full screen">⛶</button><button class="tog" id="equit" title="Leave">✕</button></div>
      </header>
      <div class="extime"><i id="etbar"></i></div>
      <div class="exbody">
        <nav class="expal" aria-label="Questions">${qs.map((q, i) => `<button data-go="${i}">${i + 1}</button>`).join('')}<div class="exkey"><span><i class="k ans"></i>answered · أجبت</span><span><i class="k skip"></i>skipped · تخطيته</span><span><i class="k flag"></i>flagged · للمراجعة</span><span><i class="k"></i>not opened yet · لم تفتحه</span></div></nav>
        <section class="exmain">${qs.map((q, i) => `<div class="exq" data-e="${i}" hidden><div class="row" style="justify-content:space-between"><div class="muted" style="font-size:13px">Question ${i + 1} of ${qs.length} · ${cfg.label(q, i)}</div><button class="tog eflag" data-flag="${i}">⚑ Flag for review</button></div>${qHTML(q, 'e' + i)}</div>`).join('')}
          <div class="row exnav"><button class="btn ghost" id="eprev">← Previous</button><button class="btn" id="enext">Next →</button></div>
          <div id="econfirm"></div></section>
      </div>`);
    document.body.appendChild(ov); document.body.classList.add('exam-open');
    EXAM.ov = ov;
    EXAM.h = qs.map((q, i) => wireQ(ov.querySelector(`[data-e="${i}"]`), q, (ok, given) => { EXAM.ans[i] = { ok, given }; }, { silent: true, hideSol: true, deferred: true }));
    const answered = i => { const b = ov.querySelector(`[data-e="${i}"]`); return qs[i].o ? !!b.querySelector('.opt.sel') : b.querySelector('input').value.trim() !== ''; };
    const paint = () => {
      // a question you opened and left without an answer is marked "skipped"
      ov.querySelectorAll('[data-go]').forEach(b => { const i = +b.dataset.go, a = answered(i); b.classList.toggle('ans', a); b.classList.toggle('skip', !a && !!EXAM.seen[i] && i !== EXAM.cur); b.classList.toggle('flag', !!EXAM.flags[i]); b.classList.toggle('cur', i === EXAM.cur); b.title = a ? 'answered' : EXAM.seen[i] && i !== EXAM.cur ? 'skipped: not answered yet' : i === EXAM.cur ? 'current question' : 'not opened yet'; });
      ov.querySelectorAll('[data-flag]').forEach(b => b.classList.toggle('on', !!EXAM.flags[+b.dataset.flag]));
      const n = qs.filter((q, i) => answered(i)).length; $('#eprog').textContent = `${n} / ${qs.length} answered`;
      if (!EXAM.end) $('#etbar').style.width = (n / qs.length * 100) + '%';
    };
    const go = i => { EXAM.seen[EXAM.cur] = true; EXAM.cur = Math.max(0, Math.min(qs.length - 1, i)); EXAM.seen[EXAM.cur] = true; ov.querySelectorAll('.exq').forEach(d => d.hidden = +d.dataset.e !== EXAM.cur); $('#eprev').disabled = EXAM.cur === 0; $('#enext').textContent = EXAM.cur === qs.length - 1 ? 'Review & submit' : 'Next →'; paint(); const inp = ov.querySelector(`[data-e="${EXAM.cur}"] input`); if (inp) inp.focus(); ov.querySelector('.exmain').scrollTop = 0; };
    EXAM.go = go;
    ov.addEventListener('click', e => {
      const t = e.target.closest('button'); if (!t) return;
      if (t.dataset.go) go(+t.dataset.go);
      else if (t.dataset.flag) { const i = +t.dataset.flag; EXAM.flags[i] = !EXAM.flags[i]; paint(); }
      else if (t.classList.contains('opt')) setTimeout(paint);
    });
    ov.addEventListener('input', paint);
    $('#eprev').onclick = () => go(EXAM.cur - 1);
    $('#enext').onclick = () => EXAM.cur === qs.length - 1 ? askSubmit() : go(EXAM.cur + 1);
    $('#esubmit').onclick = askSubmit;
    const quit = () => { $('#econfirm').innerHTML = `<div class="card exconf"><b>Leave the ${cfg.noun}? · الخروج من ${cfg.nounAr}؟</b><p>Your answers will be lost and nothing is saved.</p><div class="ar">ستضيع إجاباتك ولن تُحفظ النتيجة.</div><div class="row"><button class="btn" id="eleave">Leave the ${cfg.noun}</button><button class="btn ghost" id="estay">Back to the ${cfg.noun}</button></div></div>`; $('#eleave').onclick = closeExam; $('#estay').onclick = () => { $('#econfirm').innerHTML = ''; }; $('#econfirm').scrollIntoView({ block: 'nearest' }); };
    $('#equit').onclick = quit;
    $('#efs').onclick = () => { try { const r = document.fullscreenElement ? document.exitFullscreen() : ov.requestFullscreen(); if (r && r.catch) r.catch(() => {}); } catch (err) { /* full screen not allowed here */ } };
    function askSubmit() {
      const open = qs.map((q, i) => i).filter(i => !answered(i)), fl = Object.keys(EXAM.flags).filter(k => EXAM.flags[k]).map(Number);
      const skipped = open.filter(i => EXAM.seen[i]), unseen = open.filter(i => !EXAM.seen[i]);
      const links = a => a.map(i => `<a href="#" data-jump="${i}">${i + 1}</a>`).join(', ');
      $('#econfirm').innerHTML = `<div class="card exconf"><b>Submit the ${cfg.noun}? · تسليم ${cfg.nounAr}؟</b>
        ${open.length ? `<p>⚠ ${open.length} question(s) not answered. They count as wrong.</p>${skipped.length ? `<p>Skipped · تخطيتها: ${links(skipped)}</p>` : ''}${unseen.length ? `<p>Not opened yet · لم تفتحها: ${links(unseen)}</p>` : ''}<div class="ar">لم تجب عن ${open.length} سؤال، وستُحسب خاطئة.</div>` : '<p>All questions answered.</p>'}
        ${fl.length ? `<p>⚑ Flagged for review: ${fl.map(i => `<a href="#" data-jump="${i}">${i + 1}</a>`).join(', ')}</p>` : ''}
        <div class="row"><button class="btn" id="eyes">Yes, submit · نعم، سلّم</button><button class="btn ghost" id="eno">Back to the ${cfg.noun}</button></div></div>`;
      $('#econfirm').querySelectorAll('[data-jump]').forEach(a => a.onclick = e => { e.preventDefault(); $('#econfirm').innerHTML = ''; go(+a.dataset.jump); });
      $('#eyes').onclick = () => finishTest(false); $('#eno').onclick = () => { $('#econfirm').innerHTML = ''; };
      $('#econfirm').scrollIntoView({ block: 'nearest' });
    }
    EXAM.keys = e => {
      if (!EXAM) return;
      if (e.key === 'Escape') { e.preventDefault(); quit(); }
      else if (!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) go(EXAM.cur + (e.key === 'ArrowRight' ? 1 : -1));
    };
    document.addEventListener('keydown', EXAM.keys);
    const mmss = ms => `${String(Math.floor(ms / 60000)).padStart(2, '0')}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')}`;
    const tick = () => {
      if (!EXAM) return;
      const t = $('#etimer');
      if (EXAM.end) {
        const left = Math.max(0, EXAM.end - Date.now()), total = EXAM.end - EXAM.start;
        t.textContent = mmss(left); t.classList.toggle('low', left <= Math.min(120000, total * 0.2)); t.classList.toggle('last', left <= 60000);
        $('#etbar').style.width = (left / total * 100) + '%';
        if (left <= 0) { finishTest(true); return; }
      } else t.textContent = '⏱ ' + mmss(Date.now() - EXAM.start);
      EXAM.t = setTimeout(tick, 250);
    };
    go(0); tick();
  }
  function closeExam() {
    if (!EXAM) return;
    clearTimeout(EXAM.t); document.removeEventListener('keydown', EXAM.keys);
    if (document.fullscreenElement) { try { document.exitFullscreen().catch(() => {}); } catch (e) { /* not in full screen */ } }
    EXAM.ov.remove(); document.body.classList.remove('exam-open');
    EXAM = null;
  }
  function finishTest(timeUp) {
    if (!EXAM) return;
    EXAM.h.forEach(h => h.check());
    const st = EXAM; st.used = Math.round((Date.now() - st.start) / 1000);
    closeExam();
    if (location.hash !== st.hash) location.hash = st.hash;
    st.onFinish(st, timeUp);
    window.scrollTo(0, 0);
  }
  // every question after the test: your answer, the right answer and why
  const shownAns = (q, a) => !a || a.given === '(blank)' ? '<i class="muted">no answer</i>' : q.o ? a.given : `${esc(a.given)}${parseNum(a.given) !== +a.given && !isNaN(parseNum(a.given)) ? ` <span class="muted">(= ${pretty(parseNum(a.given))})</span>` : ''} ${q.unit || ''}`;
  const rightAns = q => q.o ? q.o[q.a] : `${pretty(q.num)} ${q.unit || ''}`;
  function reviewHTML(qs, ans, label) {
    return qs.map((q, i) => { const a = ans[i], ok = !!(a && a.ok), blank = !a || a.given === '' ;
      return `<div class="rev ${ok ? 'ok' : 'bad'}"><div class="revhead"><b>Q${i + 1}</b><span class="muted">${label(q, i)}</span><span class="pill ${ok ? 'ok' : 'bad'}">${ok ? '✔ Correct · صحيحة' : blank ? '— Not answered · لم تُجب' : '✘ Wrong · خاطئة'}</span></div>
        <div class="qt">${q.q}</div>
        <div class="revans"><div><small>Your answer · إجابتك</small><div class="${ok ? 'okv' : 'badv'}">${shownAns(q, a)}</div></div><div><small>Correct answer · الإجابة الصحيحة</small><div class="okv">${rightAns(q)}</div></div></div>
        ${q.why || q.sol ? `<div class="revwhy"><small>Why · التوضيح</small><div>${q.why || q.sol}</div></div>` : ''}</div>`; }).join('');
  }
  function examResults(st, timeUp, chs) {
    const { qs, ans } = st; const by = {};
    let good = 0;
    qs.forEach((q, i) => { const a = ans[i]; const ok = !!(a && a.ok); if (ok) good++; else logMistake(q, a ? a.given : '(blank)', q.lessonId); by[q.ch] = by[q.ch] || [0, 0]; by[q.ch][1]++; if (ok) by[q.ch][0]++; });
    const pct = Math.round(good / qs.length * 100);
    S.exams.unshift({ ts: Date.now(), n: qs.length, pct, chs: chs.map(c => c.replace('ch', 'Ch ')), by }); save();
    $('#esetup').style.display = 'none';
    $('#ebox').innerHTML = fx(`<div class="card"><h2 style="margin-top:0">Score: ${pct}% (${good}/${qs.length})</h2>${timeUp ? '<p class="note">⏰ Time was up: the exam was submitted automatically. · انتهى الوقت وسُلِّم الاختبار تلقائيًا.</p>' : ''}<p class="muted">Time used: ${Math.floor(st.used / 60)} min ${st.used % 60} s</p>
      <table><tr><th>Chapter</th><th>Correct</th><th></th></tr>${Object.entries(by).map(([c, v]) => `<tr><td>${COURSE.find(x => x.id === c).title}</td><td>${v[0]}/${v[1]}</td><td style="width:40%">${bar(Math.round(v[0] / v[1] * 100))}</td></tr>`).join('')}</table>
      <p>Wrong and blank answers were added to your <a href="#mistakes">Mistake journal</a>.</p><div class="row"><button class="btn" onclick="location.hash='#exam';location.reload()">New exam</button><a class="btn ghost" href="#report">Progress report</a></div></div>
      <h2>Review: every question · مراجعة كل الأسئلة</h2>` + reviewHTML(qs, ans, st.label));
  }

  // ---------- the instructor's exam style (content_drexam.js, docs/Old_Exams.md) ----------
  const DRX = window.DREXAM || null;
  // a number answer turned into four choices, with the slips seen in the instructor's distractors (×10, ÷10, ×2, sign)
  function toMCQ(q, num, unit, sol, extra) {
    const u = unit ? ' ' + unit : '', key = x => pretty(x) + u, seen = new Set([key(num)]), o = [key(num)];
    for (const f of shuffle([10, 0.1, 2, 0.5, 3, 1 / 3, -1, 1.5])) { if (o.length === 4) break; const x = num * f; if (!isFinite(x) || x === num || seen.has(key(x))) continue; seen.add(key(x)); o.push(key(x)); }
    if (o.length < 4 || num === 0) return null;
    const so = shuffle(o); return Object.assign({ q, o: so, a: so.indexOf(key(num)), why: sol || '' }, extra);
  }
  function drPools(F, onlyOld) {
    const chs = F.chs || COURSE.map(c => c.id), pool = { '1.1': [], '2.1': [] };
    const add = it => { if (it && chs.includes(it.ch)) pool[it.clo].push(it); };
    DRX.OLD.forEach(q => add(Object.assign({ old: true }, q)));
    if (onlyOld) return { chs, pool };
    DRX.STYLE.forEach(g => { for (let k = 0; k < 3; k++) { const r = g.f(), o = shuffle([r.ans, ...r.wrong]); if (new Set(o).size < 4) continue; add({ ch: r.ch || g.ch, clo: g.clo, q: r.q, o, a: o.indexOf(r.ans), why: r.why, src: 'Dr‑style, new numbers 🧩' }); } });
    COURSE.forEach(c => c.lessons.forEach(l => l.quiz.concat(l.checks).forEach(q => {
      if (q.o) { const keep = q.o.some(o => /above|both|none/i.test(o)), o = keep ? q.o : shuffle(q.o); add(Object.assign({ ch: c.id, clo: '1.1', lessonId: l.id, src: 'Lesson ' + c.n + ' · ' + l.title }, q, { o, a: o.indexOf(q.o[q.a]) })); }
      else if (q.num) add(toMCQ(q.q, q.num, q.unit, q.sol, { ch: c.id, clo: '2.1', lessonId: l.id, src: 'Lesson ' + c.n + ' · ' + l.title }));
    })));
    G.forEach(g => { const p = g.f(); add(toMCQ(p.q, p.ans, p.unit, p.sol, { ch: g.ch, clo: '2.1', src: 'Practice generator 🧩' })); });
    return { chs, pool };
  }
  // spread the questions over the chapters, the instructor's own questions first in each chapter, CLO 1.1 before CLO 2.1
  function drBuild(fmt, onlyOld) {
    const F = DRX.FORMATS[fmt], { chs, pool } = drPools(F, onlyOld);
    if (onlyOld) return pool['1.1'].concat(pool['2.1']);
    const take = (clo, n) => {
      const by = {}; chs.forEach(c => { const all = pool[clo].filter(q => q.ch === c); by[c] = shuffle(all.filter(q => q.old)).concat(shuffle(all.filter(q => !q.old))); });
      // interleave old and new so a test is not all old questions
      chs.forEach(c => { const o = by[c].filter(q => q.old), r = by[c].filter(q => !q.old), m = []; while (o.length || r.length) { if (o.length) m.push(o.shift()); if (r.length) m.push(r.shift()); if (r.length) m.push(r.shift()); } by[c] = m; });
      const out = [], seen = new Set(); let order = shuffle(chs), guard = 0;
      while (out.length < n && guard++ < 2000) { for (const c of order) { if (out.length >= n) break; const q = by[c].shift(); if (q && !seen.has(q.q)) { seen.add(q.q); out.push(q); } } if (chs.every(c => !by[c].length)) break; order = shuffle(chs); }
      return out;
    };
    return take('1.1', F.k).concat(take('2.1', F.n - F.k));
  }
  views.drexam = () => {
    if (!DRX) return '<h1>Not available</h1>';
    S.drx = S.drx || [];
    const F = DRX.FORMATS, best = f => { const a = S.drx.filter(x => x.fmt === f); return a.length ? Math.max(...a.map(x => x.marks)) : null; };
    const card = (k, f) => `<div class="card drf"><h3 style="margin-top:0">${f.title} <span class="muted" style="font-weight:400">· ${f.ar}</span></h3>
      <div class="drmeta"><span>📝 ${f.n} questions</span><span>⏱ ${f.mins} min</span><span>🎯 ${f.n * f.mark} marks (${f.mark} each)</span><span>📚 ${f.chs ? 'Ch 1–4' : 'all chapters'}</span></div>
      <p class="muted" style="font-size:13px;margin:6px 0">📘 ${f.src}${f.assumed ? `<br>⚠ ${f.assumed}` : ''}</p>
      <div class="row"><button class="btn" data-drgo="${k}">Start · ابدأ</button><button class="btn ghost small" data-drold="${k}">Only the instructor's questions</button>${best(k) != null ? `<span class="pill ${best(k) === f.n * f.mark ? 'ok' : ''}">Best: ${best(k)}/${f.n * f.mark}</span>` : ''}</div></div>`;
    const hist = S.drx.slice(0, 8).map(e => `<tr><td>${new Date(e.ts).toLocaleString()}</td><td>${F[e.fmt].title}${e.only ? ' (old Qs)' : ''}</td><td><b>${e.marks}/${e.total}</b></td></tr>`).join('');
    return `<h1>Exam in your instructor's style <span class="muted" style="font-size:18px;font-weight:400">· اختبار بأسلوب الدكتور</span></h1>
      <p class="sub">Built from the instructor's old final, midterm and LMS assignment. <span class="pill src">📘 old exams</span> ${ADD}</p>
      <div class="ar">نفس شكل اختبارات الدكتور: اختيار من متعدد بأربعة خيارات، درجة لكل سؤال، أسئلة الوحدات والتعريفات والقوانين (CLO 1.1) أولًا ثم المسائل القصيرة (CLO 2.1). تجد أسئلة الدكتور القديمة نفسها مع أسئلة جديدة بنفس أسلوبه. هدفك الدرجة الكاملة: بعد التسليم يظهر لك ما ينقصك وأين تراجعه، وتعيد الأسئلة التي أخطأت فيها حتى تتقنها.</div>
      <div class="card"><b>His style, from the photos:</b><ul class="clean" style="margin:6px 0 0">
        <li>All questions are multiple choice A–D, one mark each (0.5 in the LMS assignment). No written solutions.</li>
        <li>CLO 1.1 first: SI units, prefixes, definitions, Newton's laws as equations. Then CLO 2.1: one formula, one substitution, round numbers.</li>
        <li>The key word is underlined. Typical traps: distance vs displacement, × instead of ÷ in unit conversion, adding magnitudes instead of Pythagoras, v ≠ 0 at maximum height.</li></ul>
        <p class="muted" style="font-size:13px;margin:6px 0 0">Full transcription: docs/Old&#95;Exams.md · نص الأسئلة الكامل في ملف Old&#95;Exams.md</p></div>
      <div class="grid g3">${Object.entries(F).map(([k, f]) => card(k, f)).join('')}</div>
      <div id="drbox"></div>
      ${hist ? `<h2>Your attempts</h2><div class="card"><table><tr><th>Date</th><th>Exam</th><th>Marks</th></tr>${hist}</table></div>` : ''}`;
  };
  function afterDrexam() {
    if (!DRX) return;
    const start = (fmt, only, qsIn) => {
      const F = DRX.FORMATS[fmt], qs = qsIn || drBuild(fmt, only);
      const mins = qsIn ? Math.max(5, Math.ceil(qs.length * F.mins / F.n)) : only ? Math.ceil(qs.length * 1.5) : F.mins;
      const chName = id => COURSE.find(c => c.id === id);
      openTest({ qs, mins, hash: '#drexam', noun: 'exam', nounAr: 'الاختبار',
        title: `🎓 ${F.title} <span class="muted" style="font-weight:400">· ${F.ar}</span>`, sub: `${qsIn ? 'Retry of your wrong questions · ' : ''}${qs.length} questions · ${mins} min · ${qs.length * F.mark} marks`,
        label: q => `CLO ${q.clo} · Ch ${chName(q.ch).n} · ${q.old ? '📘 ' + esc(q.src) : esc(q.src || '')}`, onFinish: (st, timeUp) => drResults(st, timeUp, fmt, only, !!qsIn) });
    };
    document.querySelectorAll('[data-drgo]').forEach(b => b.onclick = () => start(b.dataset.drgo, false));
    document.querySelectorAll('[data-drold]').forEach(b => b.onclick = () => start(b.dataset.drold, true));
    window.__drStart = start;
  }
  function drResults(st, timeUp, fmt, only, retry) {
    const F = DRX.FORMATS[fmt], { qs, ans } = st, mark = F.mark;
    const by = {}, clo = { '1.1': [0, 0], '2.1': [0, 0] }, wrong = [];
    qs.forEach((q, i) => { const ok = !!(ans[i] && ans[i].ok); by[q.ch] = by[q.ch] || [0, 0]; by[q.ch][1]++; clo[q.clo][1]++; if (ok) { by[q.ch][0]++; clo[q.clo][0]++; } else { wrong.push(q); logMistake(q, ans[i] ? ans[i].given : '(blank)', q.lessonId); } });
    const good = qs.length - wrong.length, marks = +(good * mark).toFixed(1), total = +(qs.length * mark).toFixed(1), full = !wrong.length;
    if (!retry) { S.drx = S.drx || []; S.drx.unshift({ ts: Date.now(), fmt, only, marks, total }); save(); }
    const chName = id => COURSE.find(c => c.id === id);
    const plan = Object.entries(by).filter(([, v]) => v[0] < v[1]).map(([c, v]) => { const ch = chName(c), ls = [...new Set(wrong.filter(q => q.ch === c).map(q => q.lessonId).filter(Boolean))];
      return `<li><b>Ch ${ch.n}. ${esc(ch.title)}</b>: ${v[1] - v[0]} lost mark(s) → ${ls.length ? ls.map(id => `<a href="#lesson-${id}">${esc(lessonById(id).title)}</a>`).join(', ') : `<a href="#chapter-${c}">review the chapter</a>`}</li>`; }).join('');
    $('#drbox').innerHTML = fx(`<div class="card"><h2 style="margin-top:0">${full ? '🏆 ' : ''}Marks: ${marks} / ${total} <span class="muted" style="font-size:16px;font-weight:400">(${good}/${qs.length} correct)</span></h2>
      ${timeUp ? '<p class="note">⏰ Time was up: the exam was submitted automatically. · انتهى الوقت وسُلِّم الاختبار تلقائيًا.</p>' : ''}
      <table><tr><th>Part</th><th>Correct</th><th></th></tr>${Object.entries(clo).filter(([, v]) => v[1]).map(([k, v]) => `<tr><td>CLO ${k} · ${k === '1.1' ? 'units, definitions, laws' : 'calculations'}</td><td>${v[0]}/${v[1]}</td><td style="width:40%">${bar(Math.round(v[0] / v[1] * 100))}</td></tr>`).join('')}
      ${Object.entries(by).map(([c, v]) => `<tr><td>Ch ${chName(c).n}. ${esc(chName(c).title)}</td><td>${v[0]}/${v[1]}</td><td>${bar(Math.round(v[0] / v[1] * 100))}</td></tr>`).join('')}</table>
      ${full ? '<p class="fb ok">Full mark! Try a new exam: the questions change every time. · الدرجة الكاملة! جرّب اختبارًا جديدًا، فالأسئلة تتغير كل مرة.</p>'
        : `<h3>Road to full mark · طريقك للدرجة الكاملة</h3><ol class="clean">${plan}</ol><div class="ar">راجع الدروس المذكورة، ثم أعد الأسئلة التي أخطأت فيها فقط حتى تحلها كلها صحيحة، ثم اختبارًا جديدًا كاملًا.</div>`}
      <div class="row" style="margin-top:10px">${full ? '' : `<button class="btn" id="drretry">Retry my ${wrong.length} wrong question(s) · أعد الخاطئة</button>`}<button class="btn ${full ? '' : 'ghost'}" id="drnew">New ${F.title.toLowerCase()} · اختبار جديد</button></div></div>
      <h2>Review: every question · مراجعة كل الأسئلة</h2>` + reviewHTML(qs, ans, st.label));
    if ($('#drretry')) $('#drretry').onclick = () => window.__drStart(fmt, only, shuffle(wrong).map(q => Object.assign({}, q)));
    $('#drnew').onclick = () => window.__drStart(fmt, only);
    $('#drbox').scrollIntoView({ block: 'start' });
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
  // one card per rearranged form: "how do you find R in Ohm's law?" (own deck, so the regular decks stay the same size)
  function formCards() {
    const cards = [];
    COURSE.forEach(c => c.lessons.forEach(l => l.formulas.forEach((f, i) => (FM(l, i) || []).forEach((x, k) => {
      if (x.base) return;
      cards.push({ id: `${l.id}-f${i}-v${k}`, ch: c.id, form: true, front: `<div class="muted" style="font-size:13px">Law form · Ch ${c.n} · ${esc(l.title)}</div><div class="formula">${f.f}</div><b>How do you find ${x.find}?</b><div class="muted" style="font-size:14px">${x.en}</div><div class="ar" style="text-align:center">${x.ar}</div>`,
        back: `<div class="formula">${x.f}</div>${chain(x.steps)}<div style="font-size:14px">${x.how}</div><div class="ar" style="text-align:center">${x.howAr}</div>` });
    }))));
    return cards;
  }
  function dueCards(chId) { const now = Date.now(); return (chId === 'forms' ? formCards() : allCards()).filter(c => (!chId || chId === 'forms' || c.ch === chId) && (!S.cards[c.id] || S.cards[c.id].due <= now)); }
  views.flashcards = (chId) => {
    const opts = COURSE.map(c => `<option value="${c.id}" ${c.id === chId ? 'selected' : ''}>Ch ${c.n}. ${esc(c.title)}</option>`).join('');
    const boxes = [0, 0, 0, 0, 0, 0]; allCards().forEach(c => boxes[(S.cards[c.id] || { box: 0 }).box]++);
    return `<h1>Flashcards</h1><p class="sub">Spaced repetition (Leitner boxes): cards you know come back later, cards you miss come back today. ${ADD}</p>
      <div class="ar">البطاقات التعليمية بالتكرار المتباعد: ما تعرفه يعود بعد أيام، وما تخطئ فيه يعود اليوم.</div>
      <div class="card row noprint"><label>Deck <select id="fch"><option value="">All chapters</option>${opts}<option value="forms" ${chId === 'forms' ? 'selected' : ''}>🔀 Law forms: how do I find…? (all chapters)</option></select></label><span class="muted">Boxes: ${boxes.map((b, i) => `${i}:${b}`).join(' · ')}</span></div>
      <div id="fbox"></div>`;
  };
  function afterFlash(chId) {
    const run = () => {
      const due = shuffle(dueCards($('#fch').value));
      if (!due.length) { $('#fbox').innerHTML = `<div class="card">🎉 No cards due in this deck. Come back tomorrow or pick another deck.</div>`; return; }
      const c = due[0];
      $('#fbox').innerHTML = subs(`<div class="card flash" id="fcard"><div>${c.front}<div class="muted" style="font-size:13px;margin-top:10px">click to flip</div></div></div><div class="row noprint" id="fbtns" style="display:none"><button class="btn ghost" id="fno">✘ Didn't know</button><button class="btn" id="fyes">✔ Knew it</button><span class="muted">${due.length} due</span></div>`);
      $('#fcard').onclick = () => { $('#fcard').innerHTML = subs(`<div class="back">${c.back}</div>`); $('#fbtns').style.display = ''; };
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
      ${S.mistakes.length ? S.mistakes.map((m, i) => `<div class="card" style="${m.reviewed ? 'opacity:.55' : ''}"><div class="qt"><b>${m.q}</b></div><div>Your answer: <span class="pill bad">${esc(m.given)}</span> · Correct: <span class="pill ok">${m.correct}</span></div>${m.sol ? `<div class="muted" style="margin-top:6px">${m.sol}</div>` : ''}<div class="row noprint" style="margin-top:8px">${m.lessonId ? `<a class="btn small ghost" href="#lesson-${m.lessonId}">Open lesson</a>` : ''}<button class="btn small" data-rev="${i}">${m.reviewed ? 'Mark as open' : 'Mark reviewed'}</button><small class="muted">${new Date(m.ts).toLocaleDateString()}</small></div></div>`).join('') : '<div class="card">No mistakes yet. Answer some questions!</div>'}`;
  };
  function afterMistakes() {
    document.querySelectorAll('[data-rev]').forEach(b => b.onclick = () => { const m = S.mistakes[+b.dataset.rev]; m.reviewed = !m.reviewed; save(); route(); });
    const c = $('#mclear'); if (c) c.onclick = () => { S.mistakes = S.mistakes.filter(m => !m.reviewed); save(); route(); };
  }

  // ---------- every form of a law (content_forms.js) ----------
  const FM = (l, i) => (window.FORMS || {})[l.id + '#' + i];
  function symTable(f) {
    const ar = f.sym.some(s => s[3]);
    return `<table><tr><th>Symbol</th><th>Meaning</th>${ar ? '<th class="arcell">بالعربية</th>' : ''}<th>SI unit</th></tr>${f.sym.map(s => `<tr><td>${s[0]}</td><td>${s[1]}</td>${ar ? `<td class="arcell">${s[3] || ''}</td>` : ''}<td>${s[2]}</td></tr>`).join('')}</table>`;
  }
  const chain = steps => `<div class="chain">${steps.map(s => `<span>${s}</span>`).join('<span class="arr">⟹</span>')}</div>`;
  const formRow = x => `<div class="form"><div class="find"><small>find</small><span>${x.find}</span></div><div class="fbody"><div class="formula">${x.f}</div>
    <div class="fdesc">${x.base ? '<span class="pill src">📘 course form</span>' : '<span class="pill add" title="The course law, rearranged with algebra">🧩 rearranged</span>'} ${x.base ? '' : 'To find '}${x.en}</div><div class="ar">${x.ar}</div>
    ${x.steps ? `<div class="how"><div class="muted" style="font-size:13px">How do we get it? · كيف وصلنا لهذا الشكل؟</div>${chain(x.steps)}<div class="fdesc">${x.how}</div><div class="ar">${x.howAr}</div></div>` : ''}</div></div>`;
  function formsHTML(l, i) {
    const fs = FM(l, i); if (!fs) return '';
    return `<div class="forms"><div class="fh">🔀 One law, ${fs.length} forms <span class="muted" style="font-weight:400">· قانون واحد بعدة أشكال</span> <a class="noprint" style="font-size:13px;font-weight:400" href="#rearrange">how does rearranging work?</a></div>
      <div class="ar">كل شكل يحسب كمية مختلفة: الرمز في المربع هو ما يحسبه الشكل، وتحته متى تستخدمه وكيف خرج من قانون المقرر.</div>${fs.map(formRow).join('')}</div>`;
  }
  const RULES = [
    ['multiplied by something (V = R I, want R)', 'divide by it', 'مضروب في رمز: اقسم الطرفين على هذا الرمز'],
    ['divided by something (ρ = {{m // V}}, want m)', 'multiply by it', 'مقسوم على رمز: اضرب الطرفين فيه'],
    ['in the denominator (I = {{V // R}}, want R)', 'multiply by it first, then divide', 'موجود في المقام: اضرب الطرفين فيه أولًا ليصعد للبسط، ثم اقسم'],
    ['with something added (T_K = T_C + 273, want T_C)', 'subtract it', 'أُضيف إليه شيء: اطرحه من الطرفين'],
    ['with something subtracted (Δx = x₂ − x₁, want x₂)', 'add it', 'طُرح منه شيء: أضفه للطرفين'],
    ['squared (KE = ½ m v², want v)', 'take the square root, as the last step', 'مربّع: خذ الجذر التربيعي في آخر خطوة'],
    ['under a square root (C = √(A² + B²), want B)', 'square both sides first', 'تحت الجذر: ربّع الطرفين أولًا'],
    ['upside down ({{1 // R_eq}} = …)', 'work out the other side, then flip both sides', 'في صورة مقلوب: احسب الطرف الآخر ثم اقلب الطرفين']
  ];
  const TRIANGLE = ['V = R I', 'Q = C V', 'ΣF = m a', 'P = V I', 'F_w = m g', 'm = ρ V', 'F = P A', 'W = P t', 'F = q E', 'I = J A', 'Δq = I Δt', 'Q = m L'];
  views.rearrange = () => {
    const ohm = lessonById('ch9-l2');
    return `<h1>Rearranging a law <span class="muted" style="font-size:18px;font-weight:400">· كيف أغيّر شكل القانون</span></h1>
    <p class="sub">One law answers several questions: move symbols until the one you want stands alone. ${ADD}</p>
    <div class="ar">القانون الواحد يحسب أكثر من كمية. تخيّل القانون ميزانًا: أي عملية تعملها على طرف لازم تعملها على الطرف الثاني، حتى يبقى المجهول وحده في طرف.</div>
    <div class="card"><h3 style="margin-top:0">The rules · القواعد</h3><table><tr><th>If the symbol you want is…</th><th>do this to both sides</th><th class="arcell">بالعربية</th></tr>${RULES.map(r => `<tr><td>${r[0]}</td><td><b>${r[1]}</b></td><td class="arcell">${r[2]}</td></tr>`).join('')}</table></div>
    <div class="card"><h3 style="margin-top:0">Example: I want the resistance · مثال: أبي أحسب المقاومة</h3>
      <p>Ohm's law in the course is <b>V = R I</b>. R is <i>multiplied</i> by I, so divide both sides by I. On the right, I ÷ I = 1 and R is left alone:</p>
      ${chain(['V = R I', '{{V // I}} = {{R I // I}}', 'R = {{V // I}}'])}
      <div class="ar">القانون في المقرر V = RI، والمقاومة R مضروبة في التيار I. نقسم الطرفين على I: في الطرف الأيمن RI ÷ I تُختصر I ويبقى R، وفي الطرف الأيسر يبقى V ÷ I. فيصير القانون R = V ÷ I، يعني: <b>المقاومة = فرق الجهد ÷ التيار</b>.</div>
      <p>Numbers: a lamp draws 0.5 A on 12 V → R = {{12 // 0.5}} = 24 Ω.</p>
      <p style="margin-bottom:0">The same law has three forms, one for each symbol:</p>${formsHTML(ohm, 0)}</div>
    <div class="card"><h3 style="margin-top:0">Shortcut for three‑symbol laws: the triangle · طريقة المثلث</h3>
      <div class="row" style="align-items:center;gap:22px"><svg viewBox="0 0 220 170" width="200" role="img" aria-label="Triangle with V on top, R and I at the bottom"><polygon points="110,8 212,162 8,162" style="fill:var(--brand-soft);stroke:var(--brand);stroke-width:2"/><line x1="58" y1="88" x2="162" y2="88" style="stroke:var(--brand);stroke-width:2"/><line x1="110" y1="88" x2="110" y2="162" style="stroke:var(--brand);stroke-width:2"/><text x="110" y="70" text-anchor="middle" style="fill:var(--ink);font:700 30px Cambria,serif">V</text><text x="76" y="140" text-anchor="middle" style="fill:var(--ink);font:700 28px Cambria,serif">R</text><text x="144" y="140" text-anchor="middle" style="fill:var(--ink);font:700 28px Cambria,serif">I</text></svg>
      <div style="flex:1;min-width:220px"><p>Cover the symbol you want with your finger. What is left is its form:</p><ul class="clean"><li>cover <b>R</b> → V over I → R = {{V // I}}</li><li>cover <b>I</b> → V over R → I = {{V // R}}</li><li>cover <b>V</b> → R next to I → V = R I</li></ul>
      <div class="ar">غطِّ الرمز المطلوب بإصبعك، والباقي هو شكل القانون: إذا كان الباقي فوق وتحت فهو قسمة، وإذا كانا متجاورين فهو ضرب.</div></div></div>
      <p>It works for every law of the form <b>A = B × C</b> in the course:</p><div class="fchips">${TRIANGLE.map(t => `<span class="fchip">${t}</span>`).join('')}</div>
      <div class="note">⚠ Only for laws of one product. For laws with squares, sums or fractions such as R = {{ρ ℓ // A}}, use the rules above.</div></div>
    <div class="card"><h3 style="margin-top:0">Example with a fraction: R = {{ρ ℓ // A}}, I want the length ℓ · مثال بكسر</h3>
      ${chain(['R = {{ρ ℓ // A}}', 'R A = ρ ℓ', 'ℓ = {{R A // ρ}}'])}
      <p>A is in the denominator, so first multiply both sides by A. Now ℓ is multiplied by ρ, so divide by ρ.</p><div class="ar">A في المقام، فنضرب الطرفين في A ليصعد. بعدها ℓ مضروب في ρ، فنقسم الطرفين على ρ.</div></div>
    <div class="card"><h3 style="margin-top:0">Practice: pick the right form · تدرّب: اختر الشكل الصحيح</h3><div class="ar">تمرين لا ينتهي من قوانين كل الفصول: يُعطى لك القانون والكمية المطلوبة، واختر الشكل الذي يحسبها.</div><div id="rbox"></div></div>
    <p>Every law's forms are listed in its lesson (step 5) and in the <a href="#formulas">Formula sheet</a>.</p>`;
  };
  function afterRearrange() {
    const pool = [];
    allLessons().forEach(l => l.formulas.forEach((f, i) => { const fs = FM(l, i); if (fs && fs.some(x => !x.base)) pool.push({ l, f, fs }); }));
    let score = 0, total = 0;
    const next = () => {
      let item;
      for (let k = 0; k < 60 && !item; k++) {
        const { l, f, fs } = pick(pool), target = pick(fs.filter(x => !x.base));
        const others = shuffle(fs.filter(x => x !== target && x.find !== target.find)).slice(0, 3);
        if (others.length < 2) continue;
        const opts = shuffle([target, ...others]);
        item = { q: `<span class="muted" style="font-size:13px">Ch ${l.ch.n} · ${esc(l.title)}</span><div class="formula">${f.f}</div>Which form gives <b>${target.find}</b>: ${target.en}?`, o: opts.map(x => x.f), a: opts.indexOf(target), why: target.steps ? chain(target.steps) + target.how + `<div class="ar">${target.howAr}</div>` : '' };
      }
      $('#rbox').innerHTML = qHTML(item, 'r') + `<div class="row" style="margin-top:8px"><button class="btn small" id="rnext">Next law</button><span class="muted" id="rscore">${score}/${total}</span></div>`;
      wireQ($('#rbox'), item, ok => { total++; if (ok) score++; $('#rscore').textContent = `${score}/${total}`; });
      $('#rnext').onclick = next;
    };
    next();
  }

  // ---------- formula sheet ----------
  // formula in words: Arabic line, then the same in English
  const words = (l, i) => { const w = (window.WORDS || {})[l.id + '#' + i]; return w ? `<div class="words"><div class="ar"><bdi>🗣 ${w[0]}</bdi></div><div class="en">🗣 <b>In words:</b> ${w[1]}</div></div>` : ''; };
  // one-page A4 sheet of every course law with the units of its symbols (for the night before the exam)
  const SKIPU = new Set(['—', 'same unit', 'same as A', 'product of units', 'units', 'same unit as A']);
  const CONSTS = [['g', '9.8 m/s²'], ['k', '9×10⁹ N·m²/C²'], ['ε₀', '8.85×10⁻¹² C²/N·m²'], ['e', '1.6×10⁻¹⁹ C'], ['c', '3×10⁸ m/s'], ['σ', '5.67×10⁻⁸ W/m²K⁴'], ['1 cal', '4.186 J'], ['P₀', '1.013×10⁵ Pa'], ['T_K', 'T_C + 273']];
  views.a4 = () => `<div class="noprint"><h1>A4 formula sheet <span class="muted" style="font-size:18px;font-weight:400">· ورقة القوانين للطباعة</span></h1>
    <p class="sub">All ${COURSE.reduce((n, c) => n + c.lessons.reduce((m, l) => m + l.formulas.length, 0), 0)} laws of the course with the unit of every symbol, on one A4 page. <span class="pill src">📘 course files</span></p>
    <div class="row" style="margin-bottom:12px">${FRAMED ? `<span class="note">Printing is blocked inside the Claude link. Print the PDF sheet from your folder, or open this page from your own copy or GitHub. · الطباعة لا تعمل داخل رابط Claude؛ اطبع ملف PDF من مجلدك أو افتح الموقع من نسختك أو من GitHub.</span>` : `<button class="btn" onclick="window.print()">🖨 Print / save as PDF</button><span class="muted">Choose A4, portrait, scale 100%, margins "None" or "Minimum".</span>`}</div></div>
    <div class="a4sheet">
      <div class="a4head"><b>General Physics · Formula & unit sheet</b><span>${CONSTS.map(c => `${c[0]} = ${c[1]}`).join(' · ')}</span></div>
      <div class="a4cols">${COURSE.map(c => `<section class="a4ch"><h4>${c.n}. ${esc(c.title)} <bdi>${c.ar}</bdi></h4>${c.lessons.map(l => l.formulas.map(f => {
        const us = []; const seen = new Set();
        f.sym.forEach(x => { const u = String(x[2] || '').trim(); if (!u || SKIPU.has(u) || seen.has(x[0])) return; seen.add(x[0]); us.push(`<i>${x[0]}</i> ${u}`); });
        return `<div class="a4f"><div class="a4eq">${f.f}</div>${us.length ? `<div class="a4u">${us.join(' · ')}</div>` : ''}</div>`;
      }).join('')).join('')}</section>`).join('')}</div>
      <div class="a4foot">Units: SI unless stated. Δ = final − initial. Angles in Snell's law and work are measured as defined in each lesson. Physics Learning Lab · smalgamdi-gif.github.io/physic</div>
    </div>`;
  views.formulas = (chId) => `<h1>Formula & unit sheet</h1><p class="sub">Every law in the course with symbols, units and conditions. Print it for revision. <span class="pill src">📘 course files</span></p>
    <div class="row noprint"><button class="btn small printbtn" onclick="window.print()">Print / save as PDF</button>${COURSE.map(c => `<a class="btn small ghost" href="#formulas-${c.id}">Ch ${c.n}</a>`).join('')}<a class="btn small ghost" href="#formulas">All</a></div>
    <div class="card noprint">🔀 Under each law you see all its forms: the <b>bold symbol</b> is what that form finds. Open a lesson to see how each form comes from the course law, or read <a href="#rearrange">Rearranging a law</a>.<div class="ar">تحت كل قانون تجد كل أشكاله، والرمز العريض هو ما يحسبه ذلك الشكل. وطريقة الوصول لكل شكل موجودة داخل الدرس وفي صفحة «ترتيب القوانين».</div></div>
    ${COURSE.filter(c => !chId || c.id === chId).map(c => `<h2>Ch ${c.n}. ${esc(c.title)} <span class="muted" style="font-size:14px;font-weight:400"><bdi>${c.ar}</bdi> · ${c.src}</span></h2>${c.lessons.map(l => l.formulas.map((f, fi) => `<div class="card"><div class="row" style="justify-content:space-between"><b>${f.name}</b><a class="muted" style="font-size:13px" href="#lesson-${l.id}">${esc(l.title)}</a></div><div class="formula">${f.f}</div>${words(l, fi)}<div style="font-size:14px">${f.sym.map(s => `<b>${s[0]}</b>: ${s[1]} (${s[2]})`).join(' · ')}</div>${f.cond !== '—' ? `<div class="muted" style="font-size:14px">Condition: ${f.cond}</div>` : ''}${FM(l, fi) ? `<div class="fchips">${FM(l, fi).map(x => `<span class="fchip" title="${esc(x.en)}"><b>${x.find}</b>${x.f}</span>`).join('')}</div>` : ''}</div>`).join('')).join('')}`).join('')}`;

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
        rows.push(`<tr><td>${date}</td><td>${items.length ? items.map(x => `<a href="#lesson-${x.l.id}">${esc(x.l.title)}</a>${x.m != null ? ` <span class="pill bad">${x.m}%</span>` : ''}`).join('<br>') : 'Flashcards + Unlimited practice'}</td><td>${k % 3 === 2 ? 'Mistake journal review' : 'Flashcards (10 min)'}</td></tr>`);
      }
      rows.push(`<tr><td>${new Date(new Date(p.exam).getTime() - 86400000).toISOString().slice(0, 10)}</td><td><b>Full exam simulation</b> (30 Qs, 45 min), then re‑read the formula sheet</td><td>Sleep well</td></tr>`);
      body = `<div class="card"><b>${days} day(s)</b> until your exam on ${p.exam}. ${todo.length} lesson(s) still below 80%, about ${perDay} per day, weakest first.</div><div class="card"><table><tr><th>Day</th><th>Lessons</th><th>Daily habit</th></tr>${rows.join('')}</table></div>`;
    }
    return `<h1>Study planner</h1><p class="sub">Builds a day‑by‑day plan from your exam date and your mastery, weakest topics first. ${ADD}</p>
      <div class="ar">أدخل موعد اختبارك، وسيوزّع المخطط الدروس غير المتقنة على الأيام المتبقية بدءًا بالأضعف.</div>
      <div class="card row noprint"><label>Exam date <input type="date" id="pdate" value="${p ? p.exam : ''}"></label><span>Chapters:</span>${COURSE.map(c => `<label><input type="checkbox" class="pch" value="${c.id}" ${!p || !p.chs.length || p.chs.includes(c.id) ? 'checked' : ''}> ${c.n}</label>`).join(' ')}<button class="btn" id="pgo">Build plan</button><span class="hint" id="pmsg"></span></div>${body}`;
  };
  function afterPlan() { $('#pgo').onclick = () => { const v = $('#pdate').value; if (!v) { $('#pmsg').textContent = 'Pick your exam date.'; return; } S.plan = { exam: v, chs: [...document.querySelectorAll('.pch:checked')].map(x => x.value) }; save(); route(); }; }

  // ---------- report ----------
  views.report = () => {
    const ls = allLessons();
    const mins = Math.round(Object.values(S.days).reduce((a, b) => a + b, 0));
    const last14 = [...Array(14)].map((_, k) => { const d = new Date(); d.setDate(d.getDate() - 13 + k); const key = d.toISOString().slice(0, 10); return [key.slice(5), Math.round(S.days[key] || 0)]; });
    const maxM = Math.max(10, ...last14.map(x => x[1]));
    const weak = ls.map(l => ({ l, m: mastery(l.id) })).filter(x => x.m != null && x.m < 60);
    const mByCh = {}; S.mistakes.forEach(m => { const l = m.lessonId && lessonById(m.lessonId); const k = l ? l.ch.title : 'Practice / exam'; mByCh[k] = (mByCh[k] || 0) + 1; });
    return `<h1>Progress report</h1>${S.prefs.name ? `<p class="sub"><b>${esc(S.prefs.name)}</b>${S.prefs.sid ? ` · Trainee ID · رقم المتدرب: <b dir="ltr">${esc(S.prefs.sid)}</b>` : ''}</p>` : ''}<p class="sub">Generated ${new Date().toLocaleString()} · ${ADD}</p>
      <div class="row noprint"><button class="btn small printbtn" onclick="window.print()">Print / save as PDF</button><button class="btn small ghost" id="exp">Export backup</button><label class="btn small ghost">Import backup<input type="file" id="imp" accept=".json" style="display:none"></label><button class="btn small ghost" id="reset">Reset progress</button></div><div id="repmsg"></div>
      <div class="grid g3" style="margin-top:12px"><div class="card"><div class="stat">${ls.filter(l => (mastery(l.id) ?? 0) >= 80).length}/${ls.length}<small>lessons mastered</small></div></div><div class="card"><div class="stat">${mins} min<small>total study time</small></div></div><div class="card"><div class="stat">${S.exams[0] ? S.exams[0].pct + '%' : '—'}<small>last exam score (${S.exams.length} taken)</small></div></div></div>
      <h2>Mastery by chapter</h2><div class="card"><table><tr><th>Chapter</th><th>Lessons started</th><th>Mastery</th><th style="width:35%"></th></tr>${COURSE.map(c => { const cm = chapterMastery(c); return `<tr><td>Ch ${c.n}. ${esc(c.title)}</td><td>${cm.started}/${cm.total}</td><td><b>${cm.avg}%</b></td><td>${bar(cm.avg)}</td></tr>`; }).join('')}</table></div>
      <h2>Lessons</h2><div class="card"><table><tr><th>Lesson</th><th>Quiz best</th><th>Attempts</th><th>Mastery</th></tr>${ls.map(l => { const st = S.lessons[l.id] || {}; const m = mastery(l.id); const [lv, cls] = level(m); return `<tr><td>${l.ch.n}. ${esc(l.title)}</td><td>${st.quizBest != null ? st.quizBest + '%' : '—'}</td><td>${st.quizAttempts || 0}</td><td><span class="${cls}">${lv}${m != null ? ' ' + m + '%' : ''}</span></td></tr>`; }).join('')}</table></div>
      <h2>Study time (last 14 days)</h2><div class="card"><svg viewBox="0 0 700 160" width="100%" role="img" aria-label="Minutes studied per day">${last14.map((x, k) => { const h = x[1] / maxM * 120; return `<rect x="${k * 50 + 8}" y="${130 - h}" width="34" height="${h}" rx="4" fill="var(--brand)"><title>${x[0]}: ${x[1]} min</title></rect><text x="${k * 50 + 25}" y="148" font-size="11" text-anchor="middle" fill="var(--muted)">${x[0]}</text>${x[1] ? `<text x="${k * 50 + 25}" y="${124 - h}" font-size="11" text-anchor="middle" fill="var(--ink)">${x[1]}</text>` : ''}`; }).join('')}</svg></div>
      <h2>Where mistakes happen</h2><div class="card">${Object.keys(mByCh).length ? `<table>${Object.entries(mByCh).sort((a, b) => b[1] - a[1]).map(([k, v]) => `<tr><td>${esc(k)}</td><td><b>${v}</b></td></tr>`).join('')}</table>` : 'No mistakes recorded yet.'}</div>
      <h2>Unit 0: Foundations</h2><div class="card"><table><tr><th>Skill</th><th>Level</th><th style="width:35%"></th></tr>${SKILLS().map(k => `<tr><td><a href="#skill-${k.id}">${esc(k.title)}</a></td><td>${skillPill(k.id)}</td><td>${bar(skillScore(k.id))}</td></tr>`).join('')}</table>${S.placement ? `<p class="muted">Placement test: ${S.placement.pct}% on ${new Date(S.placement.ts).toLocaleDateString()}</p>` : '<p class="muted">Placement test not taken yet.</p>'}</div>
      <h2>Recommendations</h2><div class="card"><ul class="clean">${weak.length ? weak.map(x => `<li>Review <a href="#lesson-${x.l.id}">${esc(x.l.title)}</a> (${x.m}%)</li>`).join('') : '<li>No lesson below 60%. Keep going.</li>'}<li>${recommend().why}</li></ul></div>`;
  };
  function afterReport() {
    $('#exp').onclick = () => {
      const json = JSON.stringify(S, null, 1);
      if (FRAMED) return copyBox($('#repmsg'), json, 'Downloads are blocked here. Copy this text and save it as a .json file; use “Import backup” to load it again.');
      const b = new Blob([json], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = `physics-lab-backup-${today()}.json`; a.click();
    };
    $('#imp').onchange = e => { const f = e.target.files[0]; if (!f) return; f.text().then(t => { try { S = Object.assign(blank(), JSON.parse(t)); save(); route(); } catch (err) { $('#repmsg').innerHTML = '<p class="hint">That file is not a valid backup: choose a .json file saved with “Export backup”.</p>'; } }); };
    $('#reset').onclick = () => inlineConfirm($('#repmsg'), 'Erase all progress on this device? This cannot be undone.', () => { const p = S.prefs; S = blank(); S.prefs = p; save(); route(); });
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
      const hay = [l.title, l.ar, ...l.terms.map(t => t.join(' ')), ...l.formulas.map(f => f.name + ' ' + f.f)].join(' ').replace(/<[^>]+>/g, '').toLowerCase();
      if (hay.includes(qs)) out.push(`<a href="#lesson-${l.id}">Ch ${l.ch.n} · ${esc(l.title)}</a>`);
    });
    SKILLS().forEach(k => { if ((k.title + ' ' + k.ar).toLowerCase().includes(qs)) out.push(`<a href="#skill-${k.id}">Unit 0 · ${esc(k.title)}</a>`); });
    return out.slice(0, 12);
  }

  // turn v_f, k_e, Q_lost … into subscripts (text outside tags only)
  function subs(html) { return html.split(/(<[^>]*>)/).map(p => p.startsWith('<') ? p : p.replace(/([A-Za-zθρΔσεμλαΣ])_([A-Za-z0-9]{1,6})/g, '$1<sub>$2</sub>')).join(''); }

  // ---------- router ----------
  const NAV = [['home', '🏠 Home', 'الرئيسية'], ['course', '📚 Course map', 'خريطة المقرر'], ['practice', '♾️ Practice', 'تدريب'], ['exam', '⏱️ Exam', 'الاختبار'], ['drexam', '🎓 Dr\'s exam style', 'بأسلوب الدكتور'], ['flashcards', '🃏 Flashcards', 'البطاقات'], ['mistakes', '📓 Mistakes', 'دفتر الأخطاء'], ['formulas', '∑ Formulas', 'القوانين'], ['a4', '🖨 A4 sheet', 'ورقة A4'], ['rearrange', '🔀 Law forms', 'أشكال القانون'], ['tools', '🧰 Tools', 'أدوات'], ['plan', '🗓️ Planner', 'مخطط المذاكرة'], ['report', '📈 Progress', 'تقرير الإنجاز'], ['sources', '📘 Sources', 'المصادر']];
  // ---------- Unit 0: foundation skills, placement test, readiness checks (content_found.js) ----------
  const SKILLS = () => window.FOUND || [];
  const skillById = id => SKILLS().find(k => k.id === id);
  function skillScore(id) { const st = S.found[id]; if (st && st.best != null) return st.best; const p = S.placement && S.placement.res[id]; return p ? Math.round(p[0] / p[1] * 100) : null; }
  const skillPill = id => { const m = skillScore(id); const [lv, cls] = level(m); return `<span class="${cls}">${lv}${m != null ? ' · ' + m + '%' : ''}</span>`; };
  const usesLinks = k => k.uses.map(u => u[0] === 'lab' ? `<a href="Virtual_Lab.html">⚗ Virtual lab</a> <span class="muted">(${u[1]})</span>` : `<a href="#lesson-${u[0]}">${esc(lessonById(u[0]).title)}</a> <span class="muted">(${u[1]})</span>`).join('<br>');
  function readyBox(c) {
    const ks = (PREREQ[c.id] || []).map(skillById).filter(Boolean); if (!ks.length) return '';
    return `<div class="card ready"><h3 style="margin-top:0">🧱 Are you ready for this chapter? <span class="muted" style="font-weight:400">· هل أنت جاهز؟</span></h3>
      <div class="ar">هذا الفصل يعتمد على هذه المهارات من الوحدة صفر. حل سؤالًا واحدًا لكل مهارة لتعرف هل تحتاج مراجعتها قبل البدء.</div>
      ${ks.map(k => `<div class="lessonlink"><span><a href="#skill-${k.id}"><b>${esc(k.title)}</b></a><br><small class="muted">${k.ar}</small></span>${skillPill(k.id)}</div>`).join('')}
      <div class="row noprint" style="margin-top:8px"><button class="btn small" id="rdygo" data-ch="${c.id}">Quick readiness check (${ks.length} questions)</button></div><div id="rdybox"></div></div>`;
  }
  function afterChapter(id) {
    const b = $('#rdygo'); if (!b) return;
    b.onclick = () => {
      b.disabled = true; const ks = PREREQ[id].map(skillById); const items = ks.map(k => k.gen()); const res = {};
      $('#rdybox').innerHTML = items.map((it, i) => `<div data-rd="${i}"><div class="muted" style="font-size:13px;margin-top:8px">${esc(ks[i].title)}</div>${qHTML(it, 'rd' + i)}</div>`).join('') + '<div id="rdyres"></div>';
      checkAllBtn($('#rdyres'), items.map((it, i) => wireQ(document.querySelector(`[data-rd="${i}"]`), it, ok => { res[ks[i].id] = ok; if (!ok) logMistake(it, '(readiness)', null); }, { deferred: true })), () => {
        const miss = ks.filter(k => !res[k.id]);
        $('#rdyres').innerHTML = `<div class="card">${miss.length ? `<b>Review before you start:</b> ${miss.map(k => `<a href="#skill-${k.id}">${esc(k.title)}</a>`).join(' · ')}<div class="ar">راجع هذه المهارات قبل البدء بالفصل: ${miss.map(k => k.ar).join('، ')}.</div>` : '<b>✔ You are ready. Start the first lesson.</b><div class="ar">أنت جاهز، ابدأ بالدرس الأول.</div>'}</div>`;
      });
    };
  }
  views.found = () => `<h1>Unit 0: Foundations <span class="muted" style="font-size:18px;font-weight:400">· الوحدة صفر: التأسيس</span></h1>
    <p class="sub">The maths and reading skills the course uses without teaching them. ${ADD}</p>
    <div class="ar">مقرر الفيزياء يفترض أنك تعرف هذه المهارات (سجل الفجوات G‑03). كل مهارة فيها شرح عربي مبسط، ومثال محلول، وتمارين بأرقام جديدة كل مرة، وروابط للدروس التي تستخدمها.</div>
    <div class="card row" style="justify-content:space-between"><span>${S.placement ? `Placement test taken on ${new Date(S.placement.ts).toLocaleDateString()}: <b>${S.placement.pct}%</b>` : 'Not sure where to start? Take the placement test first.'}</span><a class="btn ${S.placement ? 'ghost' : ''}" href="#placement">${S.placement ? 'Retake placement test' : 'Placement test'}</a></div>
    <div class="grid g2">${SKILLS().map((k, i) => `<a class="card" style="text-decoration:none;color:inherit" href="#skill-${k.id}"><div class="chap"><div><b>0.${i + 1} ${esc(k.title)}</b><div class="muted" style="font-size:13px"><bdi>${k.ar}</bdi></div></div>${skillPill(k.id)}</div>${bar(skillScore(k.id))}<div class="muted" style="font-size:12.5px;margin-top:6px">Used in: ${k.uses.map(u => u[0] === 'lab' ? 'lab' : 'Ch ' + lessonById(u[0]).ch.n).filter((x, j, a) => a.indexOf(x) === j).join(', ')}</div></a>`).join('')}</div>`;
  views.skill = id => {
    const k = skillById(id); if (!k) return views.found();
    const i = SKILLS().indexOf(k), nx = SKILLS()[i + 1];
    return `<div class="row muted" style="font-size:13px"><a href="#found">Unit 0: Foundations</a> › skill</div>
      <h1>0.${i + 1} ${esc(k.title)}</h1><p class="sub"><bdi>${k.ar}</bdi> · ${ADD} ${skillPill(id)}</p>
      <div class="card"><h3 style="margin-top:0">📖 Explanation · الشرح</h3>${k.explain.map(e => `<div class="ar">${e[0]}</div><p class="en-help">${e[1]}</p>`).join('')}
      ${k.link ? `<a class="btn small ghost" href="${k.link}">Full guide: rearranging laws</a>` : ''}</div>
      <div class="card"><h3 style="margin-top:0">✏️ Worked example · مثال محلول</h3><p><b>${k.example.q}</b></p><ol class="clean">${k.example.steps.map(x => `<li>${x}</li>`).join('')}</ol><p><b>Answer:</b> ${k.example.ans}</p></div>
      <div class="card"><h3 style="margin-top:0">🎯 Practice: 5 fresh questions · تدريب</h3><div class="ar">أجب عن الأسئلة كلها ثم اضغط «تحقق». 4 من 5 تعني أنك أتقنت المهارة.</div><div id="skq"></div><div id="skres"></div></div>
      <div class="card"><h3 style="margin-top:0">📍 Where the course uses it · أين تحتاجها في المقرر</h3>${usesLinks(k)}</div>
      <div class="row noprint" style="justify-content:space-between;margin-top:18px"><a class="btn ghost" href="#found">← Unit 0</a>${nx ? `<a class="btn ghost" href="#skill-${nx.id}">${esc(nx.title)} →</a>` : `<a class="btn ghost" href="#lesson-ch1-l1">Start Chapter 1 →</a>`}</div>`;
  };
  function afterSkill(id) {
    const k = skillById(id); if (!k) return;
    const run = () => {
      const items = [0, 1, 2, 3, 4].map(() => k.gen()); const res = {};
      $('#skres').innerHTML = '';
      $('#skq').innerHTML = items.map((it, i) => `<div data-sk="${i}">${qHTML(it, 'sk' + i)}</div>`).join('');
      checkAllBtn($('#skq'), items.map((it, i) => wireQ(document.querySelector(`[data-sk="${i}"]`), it, (ok, given) => { res[i] = ok; if (!ok) logMistake(it, given, null); }, { deferred: true })), () => {
        const pct = Math.round(Object.values(res).filter(Boolean).length / items.length * 100);
        const st = S.found[id] = S.found[id] || {}; st.best = Math.max(st.best ?? 0, pct); st.last = pct; st.n = (st.n || 0) + 1; save();
        $('#skres').innerHTML = `<div class="card"><b>Score: ${pct}%</b> (best ${st.best}%) ${pct >= 80 ? '✔ Mastered.' : 'Read the explanation again and try a new set.'}<div class="ar">${pct >= 80 ? 'ممتاز، أتقنت هذه المهارة.' : 'أعد قراءة الشرح والمثال، ثم جرّب مجموعة جديدة.'}</div><button class="btn small ghost" id="sknew">New set of questions</button></div>`;
        $('#sknew').onclick = () => { document.querySelectorAll('.checkall').forEach(x => x.closest('.row').remove()); run(); };
      });
    };
    run();
  }
  views.placement = () => `<h1>Placement test <span class="muted" style="font-size:18px;font-weight:400">· اختبار تحديد المستوى</span></h1>
    <p class="sub">${SKILLS().length * 2} questions, two on each foundation skill. No time limit, no feedback until the end. ${ADD}</p>
    <div class="ar">سؤالان على كل مهارة من مهارات الوحدة صفر. أجب بصدق ولا تستعجل، والنتيجة تحدد لك من أين تبدأ: المهارات التي تتقنها تتخطاها، والباقي تراجعه قبل فصوله.</div>
    <div id="plbox"><div class="card"><ul class="clean"><li>Opens full screen, one question at a time, with a map of all ${SKILLS().length * 2} questions.</li><li>Change any answer before you finish. No time limit: the clock only shows the time used.</li><li>For number answers you can type a calculation, e.g. <code>9e9*2e-6/0.03^2</code>, and use the key bar (×10ⁿ, √, π…).</li><li>At the end you see every question with the right answer and why.</li></ul>
      <div class="ar">يفتح بملء الشاشة، سؤالًا سؤالًا، ويمكنك تغيير أي إجابة قبل الإنهاء. لا يوجد وقت محدد. وفي النهاية ترى كل سؤال مع الإجابة الصحيحة وتوضيحها.</div><button class="btn" id="plgo">Start the placement test · ابدأ الاختبار</button></div></div>`;
  function afterPlacement() {
    $('#plgo').onclick = () => {
      const qs = []; SKILLS().forEach(k => { for (let j = 0; j < 2; j++) qs.push(Object.assign({ skill: k.id }, k.gen())); });
      openTest({ qs, mins: 0, hash: '#placement', noun: 'test', nounAr: 'الاختبار', submitLabel: 'Finish · إنهاء',
        title: '🧭 Placement test <span class="muted" style="font-weight:400">· تحديد المستوى</span>', sub: `${qs.length} questions · 2 per foundation skill · no time limit`,
        label: q => esc(skillById(q.skill).title), onFinish: placementResults });
    };
  }
  function placementResults(st) {
    const { qs, ans } = st;
    const res = {}; qs.forEach((q, i) => { const r = res[q.skill] = res[q.skill] || [0, 0]; r[1]++; if (ans[i] && ans[i].ok) r[0]++; else logMistake(q, ans[i] ? ans[i].given : '(blank)', null); });
    const good = Object.values(res).reduce((a, r) => a + r[0], 0), pct = Math.round(good / qs.length * 100);
    S.placement = { ts: Date.now(), res, pct }; save();
    const weak = SKILLS().filter(k => res[k.id][0] < 2);
    $('#plbox').innerHTML = fx(`<div class="card"><h2 style="margin-top:0">Result: ${pct}% (${good}/${qs.length})</h2><p class="muted">Time used: ${Math.floor(st.used / 60)} min ${st.used % 60} s</p>
      <table><tr><th>Skill</th><th>Correct</th><th>Next step</th></tr>${SKILLS().map(k => { const r = res[k.id]; return `<tr><td><a href="#skill-${k.id}">${esc(k.title)}</a><br><small class="muted">${k.ar}</small></td><td><b>${r[0]}/${r[1]}</b></td><td>${r[0] === 2 ? '<span class="pill ok">skip it</span>' : r[0] === 1 ? '<span class="pill warn">quick review</span>' : '<span class="pill bad">study it</span>'}</td></tr>`; }).join('')}</table>
      ${weak.length ? `<p><b>Your plan:</b> study ${weak.map(k => `<a href="#skill-${k.id}">${esc(k.title)}</a>`).join(', ')}, then start Chapter 1. Each chapter page also shows which of these it needs.</p><div class="ar">خطتك: راجع المهارات المعلَّمة أعلاه بالترتيب، ثم ابدأ الفصل الأول. وصفحة كل فصل تذكّرك بالمهارات التي يحتاجها.</div><div class="row"><a class="btn" href="#skill-${weak[0].id}">Start with: ${esc(weak[0].title)}</a><button class="btn ghost" onclick="location.reload()">Retake the test</button></div>` : `<p><b>Your foundations are solid.</b> Start Chapter 1.</p><div class="ar">أساسك قوي، ابدأ الفصل الأول مباشرة.</div><a class="btn" href="#lesson-ch1-l1">Start Chapter 1</a>`}
      <p class="muted" style="font-size:13px">Wrong answers were added to your mistake journal.</p></div>
      <h2>Review: every question · مراجعة كل الأسئلة</h2><div class="ar">لكل سؤال: إجابتك، والإجابة الصحيحة، وتوضيح طريقة الوصول لها. الأسئلة الخاطئة مكتوب تحتها رابط المهارة لتراجعها.</div>` +
      reviewHTML(qs, ans, q => `<a href="#skill-${q.skill}">${esc(skillById(q.skill).title)}</a>`));
  }
  // ---------- glossary & problem language ----------
  views.glossary = () => `<h1>Course glossary <span class="muted" style="font-size:18px;font-weight:400">· قاموس المقرر</span></h1>
    <p class="sub">Every English term from the lessons with its Arabic and meaning. <span class="pill src">📘 terms from the lessons</span></p>
    <div class="ar">كل المصطلحات الإنجليزية في الدروس مع معناها بالعربي. ابحث بالعربي أو بالإنجليزي.</div>
    <div class="card row noprint"><input id="gq" class="search" style="width:260px" placeholder="Search · ابحث"><select id="gch"><option value="">All chapters</option>${COURSE.map(c => `<option value="${c.id}">Ch ${c.n}. ${esc(c.title)}</option>`).join('')}</select><span class="muted" id="gn"></span></div>
    <div class="card"><table id="gtab"><tr><th>Term</th><th class="arcell">بالعربية</th><th>Meaning</th><th>Lesson</th></tr>${allLessons().flatMap(l => l.terms.map(t => `<tr data-ch="${l.ch.id}" data-h="${esc((t.join(' ')).toLowerCase())}"><td><b>${t[0]}</b> ${say(t[0])}</td><td class="arcell">${t[1]}</td><td>${t[2]}</td><td><a href="#lesson-${l.id}">${l.ch.n}. ${esc(l.title)}</a></td></tr>`)).join('')}</table></div>`;
  function afterGlossary() {
    const f = () => { const q = $('#gq').value.trim().toLowerCase(), ch = $('#gch').value; let n = 0; document.querySelectorAll('#gtab tr[data-h]').forEach(r => { const ok = (!ch || r.dataset.ch === ch) && (!q || r.dataset.h.includes(q)); r.style.display = ok ? '' : 'none'; if (ok) n++; }); $('#gn').textContent = `${n} terms`; };
    $('#gq').oninput = f; $('#gch').onchange = f; f();
  }
  views.phrases = () => `<h1>Problem language <span class="muted" style="font-size:18px;font-weight:400">· لغة المسائل</span></h1>
    <p class="sub">Words in an English problem that hide a number or tell you what to do. ${ADD}</p>
    <div class="ar">كثير من الأخطاء سببها فهم السؤال لا الفيزياء. هذه الكلمات تتكرر في أسئلة المقرر، وبعضها يعطيك رقمًا دون أن يكتبه، مثل from rest التي تعني أن السرعة الابتدائية صفر.</div>
    ${PHRASES.map(g => `<div class="card"><h3 style="margin-top:0">${g.sec}</h3><table><tr><th>In the problem</th><th class="arcell">بالعربية</th><th>What it tells you</th></tr>${g.rows.map(r => `<tr><td><b>${r[0]}</b> ${say(r[0])}</td><td class="arcell">${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</table></div>`).join('')}
    <div class="card"><h3 style="margin-top:0">Drill · تدريب</h3><div id="phbox"></div></div>`;
  function afterPhrases() {
    const rows = PHRASES.flatMap(g => g.rows); let score = 0, total = 0;
    const next = () => {
      const r = pick(rows), o = shuffle([r[2], ...shuffle(rows.filter(x => x[2] !== r[2])).slice(0, 3).map(x => x[2])]);
      const item = { q: `In a problem you read “<b>${r[0]}</b>”. What does it tell you?`, o, a: o.indexOf(r[2]), why: `${r[0]} = ${r[1]} → ${r[2]}` };
      $('#phbox').innerHTML = qHTML(item, 'ph') + `<div class="row" style="margin-top:8px"><button class="btn small" id="phnext">Next</button><span class="muted" id="phs">${score}/${total}</span></div>`;
      wireQ($('#phbox'), item, ok => { total++; if (ok) score++; $('#phs').textContent = `${score}/${total}`; });
      $('#phnext').onclick = next;
    };
    next();
  }

  const FNAV = [['placement', '🧭 Placement', 'تحديد المستوى'], ['found', '🧱 Unit 0', 'الوحدة صفر'], ['glossary', '🔤 Glossary', 'قاموس المقرر'], ['phrases', '🗝️ Problem words', 'لغة المسائل']];
  views.course = () => `<h1>Course map</h1><p class="sub">General Physics · 10 chapters as ordered in your textbook. <span class="pill src">📘 BK chapter openers</span></p>` + COURSE.map(c => { const cm = chapterMastery(c); return `<div class="card"><div class="chap"><a href="#chapter-${c.id}"><b>Ch ${c.n}. ${esc(c.title)}</b></a><span class="muted"><bdi>${c.ar}</bdi> · ${c.src}</span></div>${arLine(ARC(c.id))}${bar(cm.avg)}${c.lessons.map((l, i) => { const m = mastery(l.id); const [lv, cls] = level(m); return `<a class="lessonlink" href="#lesson-${l.id}"><span>${c.n}.${i + 1} ${esc(l.title)} <small class="muted"><bdi>· ${l.ar}</bdi></small>${ARL(l.id) ? `<small class="ar arsub">${ARL(l.id).d}</small>` : ''}</span><span class="${cls}">${lv}${m != null ? ' ' + m + '%' : ''}</span></a>`; }).join('')}</div>`; }).join('');

  function sidebar(active) {
    const chs = COURSE.map(c => { const cm = chapterMastery(c); return `<a href="#chapter-${c.id}" class="nl chl ${active === 'chapter/' + c.id || active.startsWith('lesson/' + c.id + '-') ? 'active' : ''}"><span>${c.n}. ${esc(c.title)}</span><small>${cm.avg}%</small></a>`; }).join('');
    const on = n => active.split('/')[0] === n[0] || (n[0] === 'found' && active.startsWith('skill'));
    const link = n => `<a href="#${n[0]}" class="nl ${on(n) ? 'active' : ''}" title="${n[1].replace(/^\S+\s/, '')} · ${n[2]}"><span>${n[1]}</span><small>${n[2]}</small></a>`;
    // collapsible groups; the group holding the open page always stays open
    const g = S.prefs.groups || {};
    const group = (id, icon, en, ar, n, html, has) => { const open = has || g[id] !== false; return `<button class="grp" data-g="${id}" aria-expanded="${open}"><span class="gi" aria-hidden="true">${icon}</span><span class="gt">${en}</span><span class="ga">${ar}</span><span class="caret" aria-hidden="true"><svg viewBox="0 0 10 10" width="10" height="10"><path d="M3.5 1.5 7 5l-3.5 3.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button><div class="grpbody${open ? '' : ' closed'}">${html}</div>`; };
    return link(NAV[0]) + group('tools', '🧰', 'Study tools', 'أدوات المذاكرة', NAV.length - 1, NAV.slice(1).map(link).join(''), NAV.slice(1).some(on))
      + group('found', '🧱', 'Foundation', 'التأسيس', FNAV.length, FNAV.map(link).join(''), FNAV.some(on))
      + group('chapters', '📚', 'Chapters', 'الفصول', COURSE.length, chs, active.startsWith('chapter/') || active.startsWith('lesson/'))
      + `<a class="sidelab" href="Virtual_Lab.html"><span>⚗ Virtual Lab</span><small dir="rtl">المعمل الافتراضي · 11 تجربة</small></a>`;
  }
  function route() {
    // addresses look like #lesson-ch6-l1 (older links #lesson/ch6-l1 still work)
    const m = (location.hash || '#home').slice(1).match(/^([a-z]+)(?:[-/](.+))?$/) || [, 'home'];
    const v = m[1], arg = m[2], h = arg ? `${v}/${arg}` : v;
    const view = views[v] || views.home;
    $('#main').innerHTML = fx(view(arg)) + RIGHTS;
    $('#side').innerHTML = sidebar(h); $('#side').classList.remove('open');
    if (v === 'lesson') afterLesson(arg);
    if (v === 'practice') afterPractice(arg);
    if (v === 'exam') afterExam();
    if (v === 'drexam') afterDrexam();
    if (v === 'flashcards') afterFlash(arg);
    if (v === 'mistakes') afterMistakes();
    if (v === 'tools') afterTools();
    if (v === 'rearrange') afterRearrange();
    if (v === 'chapter') afterChapter(arg);
    if (v === 'skill') afterSkill(arg);
    if (v === 'placement') afterPlacement();
    if (v === 'glossary') afterGlossary();
    if (v === 'phrases') afterPhrases();
    if (v === 'plan') afterPlan();
    if (v === 'report') afterReport();
    // remember the page, so a refresh (or reopening the site) comes back here
    if (location.hash) { S.prefs.last = location.hash; save(); }
    if (restoreY != null) { const y = restoreY; restoreY = null; requestAnimationFrame(() => window.scrollTo(0, y)); } else window.scrollTo(0, 0);
  }
  // on load: no address in the link → reopen the last page, and return to where it was scrolled
  let restoreY = null;
  try {
    if (!location.hash && S.prefs.last) history.replaceState(null, '', S.prefs.last);
    if (S.prefs.scroll && S.prefs.scroll.h === location.hash) restoreY = S.prefs.scroll.y;
  } catch (e) { /* the address cannot be changed here */ }
  let scrollT = 0;
  window.addEventListener('scroll', () => { clearTimeout(scrollT); scrollT = setTimeout(() => { if (EXAM) return; S.prefs.scroll = { h: location.hash, y: Math.round(window.scrollY) }; save(); }, 400); }, { passive: true });

  const ICON = {
    sun: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 13.4A8.5 8.5 0 1 1 10.6 3.5a6.6 6.6 0 0 0 9.9 9.9z"/></svg>' };
  // the theme button shows the mode it switches to
  const themeBtn = (b, dark) => { b.innerHTML = `<span class="ti">${dark ? ICON.sun : ICON.moon}</span><span class="tl">${dark ? 'Light' : 'Dark'}</span>`; b.title = dark ? 'Switch to light mode' : 'Switch to dark mode'; };
  const effTheme = () => document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  function applyPrefs() {
    document.body.classList.toggle('hide-ar', !S.prefs.ar);
    // no saved choice: follow the device (or the viewer's) setting
    if (S.prefs.theme) document.documentElement.dataset.theme = S.prefs.theme;
    $('#tar').classList.toggle('on', S.prefs.ar); $('#tar').setAttribute('aria-pressed', String(S.prefs.ar)); themeBtn($('#tth'), effTheme() === 'dark');
  }
  document.addEventListener('DOMContentLoaded', () => {
    $('#tar').onclick = () => { S.prefs.ar = !S.prefs.ar; save(); applyPrefs(); };
    // light/dark is one setting shared with the lab (key "pll-theme"); a change in one open tab reaches the other
    $('#tth').onclick = () => { S.prefs.theme = effTheme() === 'dark' ? 'light' : 'dark'; save(); try { localStorage.setItem('pll-theme', S.prefs.theme); } catch (e) { /* no storage */ } applyPrefs(); };
    try { const t = localStorage.getItem('pll-theme'); if (t) S.prefs.theme = t; else if (S.prefs.theme) localStorage.setItem('pll-theme', S.prefs.theme); } catch (e) { /* no storage */ }
    window.addEventListener('storage', e => { if (e.key !== 'pll-theme' || !e.newValue) return; S.prefs.theme = e.newValue; save(); applyPrefs(); });
    // ☰ hides or shows the side menu: a slide-in panel on phones, a collapsible column on wider screens (remembered)
    const wide = matchMedia('(min-width: 861px)');
    const applySide = () => { document.body.classList.toggle('side-closed', S.prefs.side === false); $('#menu').setAttribute('aria-expanded', String(wide.matches ? S.prefs.side !== false : $('#side').classList.contains('open'))); };
    $('#menu').onclick = () => { if (wide.matches) { S.prefs.side = S.prefs.side === false; save(); } else $('#side').classList.toggle('open'); applySide(); };
    $('#side').addEventListener('click', e => { const b = e.target.closest('.grp'); if (!b) return; const body = b.nextElementSibling, open = body.classList.toggle('closed') === false;
      b.setAttribute('aria-expanded', String(open)); S.prefs.groups = Object.assign({}, S.prefs.groups, { [b.dataset.g]: open }); save(); });
    applySide();
    // the side menu and sticky bars sit just under the header, whose height changes when it wraps on phones
    const hdr = () => document.documentElement.style.setProperty('--hdr', $('.top').offsetHeight + 'px');
    hdr(); if (window.ResizeObserver) new ResizeObserver(hdr).observe($('.top')); else window.addEventListener('resize', hdr);
    const sr = $('#search'), res = $('#results');
    sr.oninput = () => { const r = search(sr.value); res.innerHTML = r.length ? `<div class="card results">${r.join('')}</div>` : ''; };
    res.onclick = () => { res.innerHTML = ''; sr.value = ''; };
    applyPrefs(); route();
    document.addEventListener('click', e => { const b = e.target.closest('.say'); if (b) { e.preventDefault(); e.stopPropagation(); speak(b.dataset.say, b); } }, true);
    $('#who').onclick = () => welcome(true);
    showWho();
    let seen = false; try { seen = sessionStorage.getItem('pll-welcomed') === '1'; } catch (e) { /* ignore */ }
    if (!S.prefs.name || !S.prefs.sid || !seen) welcome(false);
  });
  function showWho() { const n = S.prefs.name || 'Sign in'; $('#whon').textContent = n; $('#who').title = `${n}${S.prefs.sid ? ' · ' + S.prefs.sid : ''} · بياناتك`; }
  // entry screen: asks the student's name the first time, then greets them on each visit
  // © line shown on the entry screen, at the foot of every page and in the lab
  const RIGHTS = `<footer class="rights">© 2026 Physics Learning Lab · All rights reserved · جميع الحقوق محفوظة<br><span>Course slides and textbook content (📘) belong to their authors and are quoted for study only. · محتوى المقرر ملك لمؤلفيه، ومقتبس هنا للمذاكرة فقط.</span></footer>`;
  // entry screen: asks the trainee's name and ID the first time, then greets them on each visit
  function welcome(edit) {
    const name = S.prefs.name || '', sid = S.prefs.sid || '', first = !name || !sid || edit;
    const all = allLessons(), done = all.filter(l => mastery(l.id) != null).length;
    const avg = done ? Math.round(all.reduce((t, l) => t + (mastery(l.id) || 0), 0) / all.length) : 0;
    const r = !first ? recommend() : null;
    const box = document.createElement('div'); box.id = 'welcome'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
    box.innerHTML = fx(`<div class="wcard"><div class="watom">⚛</div>
      <h2>${first ? 'Welcome to Physics Learning Lab' : `Welcome back, ${esc(name)}!`}</h2>
      <div class="ar">${first ? 'أهلاً بك في مختبر تعلم الفيزياء. اكتب اسمك ورقم المتدرب ليرحّب بك الموقع ويحفظ تقدمك على هذا الجهاز.' : `أهلاً بعودتك يا ${esc(name)}! أكملت ${done} من ${all.length} درساً، ومتوسط إتقانك ${avg}%.`}</div>
      ${first ? `<label class="wlab">Your name · الاسم<input id="wname" maxlength="40" value="${esc(name)}" placeholder="e.g. Saad · مثلاً سعد" autocomplete="name"></label>
        <label class="wlab">Trainee ID · رقم المتدرب<input id="wsid" maxlength="15" value="${esc(sid)}" inputmode="numeric" dir="ltr" placeholder="e.g. 443012345" autocomplete="off"></label><div class="hint" id="wmsg"></div>`
        : `<p class="wid">🪪 Trainee ID · رقم المتدرب: <b dir="ltr">${esc(sid)}</b></p><div class="wstats"><div><b>${done}/${all.length}</b><small>lessons started</small></div><div><b>${avg}%</b><small>average mastery</small></div></div>${r && r.l ? `<p class="muted" style="margin:6px 0 0">Next: <a href="#lesson-${r.l.id}" id="wgonext">${esc(r.l.title)}</a></p>` : ''}`}
      <div class="row" style="justify-content:center;margin-top:14px"><button class="btn" id="wgo">${first ? 'Start · ابدأ' : 'Continue · متابعة'}</button>${!first ? '<button class="btn ghost" id="wchg">Not you? · غيّر البيانات</button>' : ''}</div>
      <p class="muted" style="font-size:12.5px;margin:12px 0 0">Your name, ID and progress stay in this browser only. · بياناتك وتقدمك محفوظة في هذا المتصفح فقط.</p>${RIGHTS}</div>`);
    document.body.appendChild(box);
    const close = () => { box.remove(); try { sessionStorage.setItem('pll-welcomed', '1'); } catch (e) { /* ignore */ } showWho(); route(); };
    if (first) {
      const inp = $('#wname'), idf = $('#wsid'); setTimeout(() => (name && !edit ? idf : inp).focus(), 50);
      idf.oninput = () => { $('#wmsg').textContent = ''; idf.value = idf.value.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/\D/g, ''); };
      const go = () => {
        const v = inp.value.trim().replace(/\s+/g, ' '), id = idf.value.trim();
        if (!v) { $('#wmsg').textContent = 'Please write your name. · اكتب اسمك من فضلك.'; inp.focus(); return; }
        if (!/^\d{4,15}$/.test(id)) { $('#wmsg').textContent = 'Write your trainee ID in digits (4–15). · اكتب رقم المتدرب بالأرقام.'; idf.focus(); return; }
        S.prefs.name = v; S.prefs.sid = id; save(); close();
      };
      $('#wgo').onclick = go; inp.onkeydown = idf.onkeydown = e => { if (e.key === 'Enter') go(); };
    } else {
      $('#wgo').onclick = close; $('#wchg').onclick = () => { box.remove(); welcome(true); };
      if ($('#wgonext')) $('#wgonext').onclick = () => { box.remove(); try { sessionStorage.setItem('pll-welcomed', '1'); } catch (e) { /* ignore */ } };
    }
  }
  window.addEventListener('hashchange', () => { if (EXAM) { history.replaceState(null, '', EXAM.hash); return; } route(); });
  window.addEventListener('beforeunload', e => { if (EXAM) { e.preventDefault(); e.returnValue = ''; } });
  window.__PLL = { mastery, parseNum, numOk, dimOf, G, allLessons };
})();
