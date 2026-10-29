/* Arabic reads right to left. Inside an Arabic sentence each run of Latin text, numbers or formulas is wrapped in
   <bdi dir="ltr"> so it stays one left‑to‑right unit: "R = V/I" or a drawn fraction is never reordered by the bidi
   algorithm. Runs on every .ar / .arcell element as soon as it appears on the page. */
(function () {
  const A = '؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿';
  const HAS_AR = new RegExp('[' + A + ']');
  const TOK = new RegExp('([' + A + ']+)|(\\s+)|([^\\s' + A + ']+)', 'g');
  const SEL = '.ar, .arcell';
  function fix(el) {
    if (el.dataset.rtl) return; el.dataset.rtl = '1';
    const atoms = [];
    [...el.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        let m; TOK.lastIndex = 0;
        while ((m = TOK.exec(n.data))) {
          if (m[1]) atoms.push({ t: 'A', s: m[0] });
          else if (m[2]) atoms.push({ t: 'S', s: m[0] });
          else { const p = m[0].match(/^([«»"“”]*)(.*?)([.,;:!?،؛«»"“”]*)$/); if (p[1]) atoms.push({ t: 'P', s: p[1] }); if (p[2]) atoms.push({ t: 'L', s: p[2] }); if (p[3]) atoms.push({ t: 'P', s: p[3] }); }
        }
      } else if (n.nodeType === 1 && n.tagName !== 'BR' && !HAS_AR.test(n.textContent)) atoms.push({ t: 'L', n });
      else { if (n.nodeType === 1 && n.tagName !== 'BR') fix(n); atoms.push({ t: 'A', n }); }
    });
    if (!atoms.some(a => a.t === 'L')) return;
    const out = document.createDocumentFragment(), node = a => a.n || document.createTextNode(a.s);
    let run = null, gap = [];
    // a bracket belongs to the formula only if its partner is inside it too: "(ليس …)" keeps its brackets in the Arabic text
    const balance = () => {
      const txt = () => run.map(a => a.s || '').join(''), cnt = c => txt().split(c).length - 1;
      while (run.length && run[0].s && run[0].s[0] === '(' && cnt('(') > cnt(')')) { out.appendChild(document.createTextNode('(')); run[0] = { t: 'L', s: run[0].s.slice(1) }; if (!run[0].s) run.shift(); }
      let tail = '';
      while (run.length && run[run.length - 1].s && /\)$/.test(run[run.length - 1].s) && cnt(')') > cnt('(')) { const l = run[run.length - 1]; tail = ')' + tail; run[run.length - 1] = { t: 'L', s: l.s.slice(0, -1) }; if (!run[run.length - 1].s) run.pop(); }
      return tail;
    };
    const close = () => { let tail = ''; if (run) tail = balance(); if (run && !run.length) run = null; if (run) { const b = document.createElement('bdi'); b.dir = 'ltr'; run.forEach(a => b.appendChild(node(a))); out.appendChild(b); run = null; } if (tail) out.appendChild(document.createTextNode(tail)); gap.forEach(a => out.appendChild(node(a))); gap = []; };
    atoms.forEach(a => {
      if (a.t === 'L') { if (run) { gap.forEach(g => run.push(g)); gap = []; run.push(a); } else { gap.forEach(g => out.appendChild(node(g))); gap = []; run = [a]; } }
      else if (a.t === 'S') { if (run) gap.push(a); else out.appendChild(node(a)); }
      else { close(); out.appendChild(node(a)); }
    });
    close();
    el.textContent = ''; el.appendChild(out);
  }
  const scan = root => { if (root.matches && root.matches(SEL)) fix(root); if (root.querySelectorAll) root.querySelectorAll(SEL).forEach(fix); };
  new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if (n.nodeType === 1) scan(n); }))).observe(document.body, { childList: true, subtree: true });
  scan(document.body);
  window.__RTL = { fix, scan };
})();
