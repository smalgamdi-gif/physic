/* Physics Virtual Lab — every experiment is ADDITIONAL DESIGN (the course files contain no lab manual, gap G-01).
   Each simulation uses only equations that appear in the course files (source cited per experiment). */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const fmt = (x, d = 3) => { if (!isFinite(x)) return '—'; const a = Math.abs(x); if (a !== 0 && (a >= 1e5 || a < 1e-3)) return x.toExponential(d - 1); return String(+x.toPrecision(d + 1)); };
  // {{a // b}} is drawn as a fraction a over b (same markup as the tutor)
  const mathify = s => String(s).replace(/\{\{(.+?)\s*\/\/\s*(.+?)\}\}/g, (m, a, b) => `<span class="frac"><span class="nu">${a.trim()}</span><span class="de">${b.trim()}</span></span>`);
  const rad = d => d * Math.PI / 180, deg = r => r * 180 / Math.PI;
  const gauss = () => { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
  const roundTo = (x, res) => Math.round(x / res) * res;
  let NOISE = true;
  const noisy = (x, rel, res) => { let y = NOISE ? x * (1 + rel * gauss()) : x; return res ? roundTo(y, res) : y; };
  const css = v => getComputedStyle(document.documentElement).getPropertyValue(v).trim();

  // ---------- linear fit ----------
  function fit(pts, origin) {
    const n = pts.length; if (n < 2) return null;
    let m, b = 0, se;
    if (origin) {
      const sxy = pts.reduce((a, p) => a + p[0] * p[1], 0), sxx = pts.reduce((a, p) => a + p[0] * p[0], 0);
      m = sxy / sxx; const res = pts.reduce((a, p) => a + (p[1] - m * p[0]) ** 2, 0); se = Math.sqrt(res / Math.max(1, n - 1) / sxx);
    } else {
      const mx = pts.reduce((a, p) => a + p[0], 0) / n, my = pts.reduce((a, p) => a + p[1], 0) / n;
      const sxx = pts.reduce((a, p) => a + (p[0] - mx) ** 2, 0), sxy = pts.reduce((a, p) => a + (p[0] - mx) * (p[1] - my), 0);
      m = sxy / sxx; b = my - m * mx; const res = pts.reduce((a, p) => a + (p[1] - m * p[0] - b) ** 2, 0); se = n > 2 ? Math.sqrt(res / (n - 2) / sxx) : 0;
    }
    const my = pts.reduce((a, p) => a + p[1], 0) / n; const sst = pts.reduce((a, p) => a + (p[1] - my) ** 2, 0); const ssr = pts.reduce((a, p) => a + (p[1] - m * p[0] - b) ** 2, 0);
    return { m, b, se, r2: sst ? 1 - ssr / sst : 1 };
  }
  function plot(cv, pts, f, xl, yl) {
    const c = cv.getContext('2d'), W = cv.width, H = cv.height, P = { l: 62, r: 16, t: 14, b: 44 };
    c.clearRect(0, 0, W, H); c.fillStyle = css('--panel'); c.fillRect(0, 0, W, H);
    const ink = css('--ink'), mut = css('--muted'), line = css('--line'), br = css('--brand'), ac = css('--accent');
    c.font = '12px Segoe UI, sans-serif';
    if (!pts.length) { c.fillStyle = mut; c.fillText('Record measurements to build the graph', W / 2 - 110, H / 2); return; }
    const xs = pts.map(p => p[0]).concat(0), ys = pts.map(p => p[1]).concat(0);
    let x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    if (x1 === x0) x1 = x0 + 1; if (y1 === y0) y1 = y0 + 1;
    x1 += (x1 - x0) * .08; y1 += (y1 - y0) * .08;
    const X = x => P.l + (x - x0) / (x1 - x0) * (W - P.l - P.r), Y = y => H - P.b - (y - y0) / (y1 - y0) * (H - P.t - P.b);
    c.strokeStyle = line; c.lineWidth = 1; c.fillStyle = mut;
    for (let i = 0; i <= 5; i++) { const gx = x0 + (x1 - x0) * i / 5, gy = y0 + (y1 - y0) * i / 5; c.beginPath(); c.moveTo(X(gx), P.t); c.lineTo(X(gx), H - P.b); c.stroke(); c.beginPath(); c.moveTo(P.l, Y(gy)); c.lineTo(W - P.r, Y(gy)); c.stroke(); c.fillText(fmt(gx, 2), X(gx) - 12, H - P.b + 16); c.fillText(fmt(gy, 2), 4, Y(gy) + 4); }
    c.fillStyle = ink; c.fillText(xl, W / 2 - c.measureText(xl).width / 2, H - 8);
    c.save(); c.translate(14, H / 2); c.rotate(-Math.PI / 2); c.fillText(yl, -c.measureText(yl).width / 2, 0); c.restore();
    if (f) { c.strokeStyle = ac; c.lineWidth = 2; c.setLineDash([6, 4]); c.beginPath(); c.moveTo(X(x0), Y(f.m * x0 + f.b)); c.lineTo(X(x1), Y(f.m * x1 + f.b)); c.stroke(); c.setLineDash([]); }
    c.fillStyle = br; pts.forEach(p => { c.beginPath(); c.arc(X(p[0]), Y(p[1]), 4.5, 0, 7); c.fill(); });
  }

  // ---------- drawing helpers ----------
  function ctxOf(cv) { const c = cv.getContext('2d'); c.clearRect(0, 0, cv.width, cv.height); c.fillStyle = css('--panel'); c.fillRect(0, 0, cv.width, cv.height); c.font = '13px Segoe UI, sans-serif'; c.lineCap = 'round'; return c; }
  function arrow(c, x1, y1, x2, y2, col, w = 3, label) {
    c.strokeStyle = col; c.fillStyle = col; c.lineWidth = w; c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke();
    const a = Math.atan2(y2 - y1, x2 - x1); c.beginPath(); c.moveTo(x2, y2); c.lineTo(x2 - 12 * Math.cos(a - .4), y2 - 12 * Math.sin(a - .4)); c.lineTo(x2 - 12 * Math.cos(a + .4), y2 - 12 * Math.sin(a + .4)); c.fill();
    if (label) c.fillText(label, x2 + 6, y2 - 6);
  }
  const box = (c, x, y, w, h, fill, stroke) => { c.fillStyle = fill; c.fillRect(x, y, w, h); if (stroke) { c.strokeStyle = stroke; c.lineWidth = 1.5; c.strokeRect(x, y, w, h); } };
  const txt = (c, s, x, y, col) => { c.fillStyle = col || css('--ink'); c.fillText(s, x, y); };

  // ---------- experiments ----------
  const g0 = 9.8;
  const EX = [
    {
      id: 'freefall', title: 'E1 · Free fall: measuring g', ar: 'السقوط الحر وقياس تسارع الجاذبية', src: 'S03 §4 · BK p.48–51', law: 'y = v_i t + ½ g t²  (dropped from rest: h = ½ g t²)',
      objective: 'Measure the free‑fall acceleration g by timing a ball dropped from different heights.',
      apparatus: ['Steel ball and electromagnetic release', 'Two photogates and digital timer (resolution 0.001 s)', 'Metre rule (resolution 1 mm)', 'Planet selector (to compare Earth, Moon, Mars: weights 980 N, 162 N, 371 N for 100 kg, BK p.59)'],
      procedure: ['Set the drop height h.', 'Release the ball and read the fall time t from the timer.', 'Record (h, t). Repeat for at least 6 heights between 0.2 m and 2 m.', 'Plot h against t². The slope equals g/2.', 'Compute g = 2 × slope and the percentage difference from 9.8 m/s².'],
      controls: [{ id: 'h', label: 'Height h', min: 0.1, max: 2, step: 0.05, value: 1, unit: 'm' }, { id: 'planet', label: 'Planet', options: [['Earth', 9.8], ['Moon', 1.62], ['Mars', 3.71]] }],
      cols: ['h (m)', 't (s)', 't² (s²)'],
      measure: s => { const t = noisy(Math.sqrt(2 * s.h / s.planet), 0.004, 0.001); return [s.h, t, t * t]; },
      xy: r => [r[2], r[0]], xl: 't² (s²)', yl: 'h (m)', origin: true,
      result: (f, s) => { const g = 2 * f.m; return `g = 2 × slope = <b>${fmt(g)} ± ${fmt(2 * f.se, 2)} m/s²</b> · accepted ${s.planet} m/s² · difference ${fmt(Math.abs(g - s.planet) / s.planet * 100, 2)} %`; },
      draw: (cv, s, t) => { const c = ctxOf(cv); const H = cv.height; const top = 30, scale = (H - 70) / 2; box(c, 60, H - 30, 200, 6, css('--muted')); box(c, 40, 10, 6, H - 40, css('--line'));
        const T = Math.sqrt(2 * s.h / s.planet); const tt = (t / 1000) % (T + 0.8); const y = tt < T ? 0.5 * s.planet * tt * tt : s.h;
        const yTop = H - 30 - s.h * scale; c.strokeStyle = css('--accent'); c.setLineDash([4, 4]); c.beginPath(); c.moveTo(80, yTop); c.lineTo(240, yTop); c.stroke(); c.setLineDash([]);
        c.fillStyle = css('--brand'); c.beginPath(); c.arc(160, yTop + y * scale - 8, 8, 0, 7); c.fill();
        txt(c, `h = ${s.h} m`, 250, yTop + 4); txt(c, `t = ${fmt(Math.min(tt, T), 3)} s`, 250, yTop + 22, css('--muted')); txt(c, 'photogate', 250, H - 36, css('--muted')); box(c, 120, H - 40, 80, 4, css('--accent')); box(c, 120, yTop - 4, 80, 4, css('--accent')); },
      errors: ['Reaction‑free timing removes human error, but the release delay of the magnet adds a small constant time.', 'Air resistance makes t slightly longer at large heights (ignored by the course\'s free‑fall model).', 'Height measured to the wrong point of the ball (top vs bottom) gives a systematic offset → non‑zero intercept.'],
      discussion: [['Why plot h against t² instead of h against t?', 'Because h = ½gt² is linear in t²; a straight line through the origin is easy to fit and its slope is g/2.'], ['Does a heavier ball fall faster in this model?', 'No. g does not depend on mass (BK p.49), if air resistance is neglected.'], ['What would a non‑zero intercept suggest?', 'A systematic error, e.g. measuring h from the wrong point or a delay in the timer start.']],
      skills: ['Aligning photogates vertically with a plumb line', 'Reading a metre rule without parallax', 'Checking the release mechanism is repeatable']
    },
    {
      id: 'forcetable', title: 'E2 · Force table: adding vectors', ar: 'طاولة القوى: جمع المتجهات', src: 'S02 §2–3 · BK p.26–30', law: 'R = √(Rₓ² + R_y²),  Rₓ = ΣF cos θ,  R_y = ΣF sin θ',
      objective: 'Find the resultant of two forces experimentally (by balancing with a third force) and compare with the component method.',
      apparatus: ['Circular force table with angle scale (resolution 1°)', 'Three pulleys, strings and hanger masses', 'Central ring and pin'],
      procedure: ['Set F₁ and F₂ (magnitude and angle).', 'Find the equilibrant: adjust a third force until the ring is centred (the simulation finds it with realistic scatter).', 'The resultant equals the equilibrant in magnitude, opposite in direction.', 'Compute R with components and compare.', 'Record several pairs; plot measured R against calculated R (slope should be 1).'],
      controls: [{ id: 'f1', label: 'F₁', min: 0.5, max: 10, step: 0.5, value: 4, unit: 'N' }, { id: 'a1', label: 'θ₁', min: 0, max: 360, step: 5, value: 0, unit: '°' }, { id: 'f2', label: 'F₂', min: 0.5, max: 10, step: 0.5, value: 4, unit: 'N' }, { id: 'a2', label: 'θ₂', min: 0, max: 360, step: 5, value: 90, unit: '°' }],
      cols: ['F₁ (N)', 'θ₁ (°)', 'F₂ (N)', 'θ₂ (°)', 'R measured (N)', 'θ_R measured (°)', 'R calculated (N)'],
      calc: s => { const rx = s.f1 * Math.cos(rad(s.a1)) + s.f2 * Math.cos(rad(s.a2)), ry = s.f1 * Math.sin(rad(s.a1)) + s.f2 * Math.sin(rad(s.a2)); return { R: Math.hypot(rx, ry), th: (deg(Math.atan2(ry, rx)) + 360) % 360 }; },
      measure(s) { const k = this.calc(s); return [s.f1, s.a1, s.f2, s.a2, noisy(k.R, 0.02, 0.05), roundTo(k.th + (NOISE ? 1.5 * gauss() : 0), 1), +k.R.toFixed(3)]; },
      xy: r => [r[6], r[4]], xl: 'R calculated (N)', yl: 'R measured (N)', origin: true,
      result: f => `slope = <b>${fmt(f.m)}</b> (ideal 1.000) · R² = ${fmt(f.r2, 4)}`,
      draw(cv, s) { const c = ctxOf(cv); const cx = cv.width / 2 - 60, cy = cv.height / 2, k = 13; c.strokeStyle = css('--line'); c.lineWidth = 1; c.beginPath(); c.arc(cx, cy, 140, 0, 7); c.stroke(); for (let a = 0; a < 360; a += 30) { txt(c, a + '°', cx + 152 * Math.cos(rad(a)) - 10, cy - 152 * Math.sin(rad(a)) + 4, css('--muted')); }
        const r = this.calc(s); arrow(c, cx, cy, cx + s.f1 * k * Math.cos(rad(s.a1)), cy - s.f1 * k * Math.sin(rad(s.a1)), css('--brand'), 3, 'F₁'); arrow(c, cx, cy, cx + s.f2 * k * Math.cos(rad(s.a2)), cy - s.f2 * k * Math.sin(rad(s.a2)), css('--brand'), 3, 'F₂'); arrow(c, cx, cy, cx + r.R * k * Math.cos(rad(r.th)), cy - r.R * k * Math.sin(rad(r.th)), css('--accent'), 3, 'R'); c.setLineDash([5, 4]); arrow(c, cx, cy, cx - r.R * k * Math.cos(rad(r.th)), cy + r.R * k * Math.sin(rad(r.th)), css('--muted'), 2, 'equilibrant'); c.setLineDash([]);
        txt(c, `R = ${fmt(r.R)} N at ${fmt(r.th)}°`, cv.width - 200, 30); txt(c, `Rₓ = ${fmt(r.R * Math.cos(rad(r.th)))} N`, cv.width - 200, 52, css('--muted')); txt(c, `R_y = ${fmt(r.R * Math.sin(rad(r.th)))} N`, cv.width - 200, 72, css('--muted')); },
      errors: ['Friction in the pulleys: the ring can sit slightly off centre.', 'Angle scale read to ±1°.', 'Mass of the hangers not included in F.'],
      discussion: [['Why is the equilibrant equal and opposite to the resultant?', 'For equilibrium ΣF = 0 (Newton\'s first law, S04), so the third force must cancel R.'], ['When is |F₁ + F₂| equal to F₁ + F₂?', 'Only when the forces point in the same direction.']],
      skills: ['Levelling the force table', 'Tapping the table to reduce pulley friction', 'Reading angles at the string, not the pulley rim']
    },
    {
      id: 'newton2', title: 'E3 · Newton\'s second law: cart and hanging mass', ar: 'قانون نيوتن الثاني: عربة وثقل معلّق', src: 'S04 §3 · BK p.59–62, Exercise 4 p.66', law: 'ΣF = m a  →  a = {{m_h g // M + m_h}}',
      objective: 'Show that acceleration is proportional to the net force when the total mass is constant, and find the system mass from the slope.',
      apparatus: ['Low‑friction track and cart (M)', 'Pulley, string, slotted masses (moved between cart and hanger so total mass stays constant)', 'Motion sensor (acceleration resolution 0.01 m/s²)'],
      procedure: ['Choose the total system mass (cart + all slotted masses).', 'Put mass m_h on the hanger; the rest stays on the cart.', 'Release; read the acceleration a.', 'Move 20 g from cart to hanger and repeat (keep total mass constant).', 'Plot a against F = m_h g. Slope = 1/(total mass).'],
      controls: [{ id: 'M', label: 'Total mass M + m_h', min: 0.3, max: 2, step: 0.05, value: 1, unit: 'kg' }, { id: 'mh', label: 'Hanging mass m_h', min: 0.01, max: 0.2, step: 0.01, value: 0.05, unit: 'kg' }, { id: 'fric', label: 'Track friction', options: [['None (ideal)', 0], ['Small (0.02 N)', 0.02]] }],
      cols: ['m_h (kg)', 'F = m_h g (N)', 'a (m/s²)'],
      measure: s => { const F = s.mh * g0; const a = Math.max(0, (F - s.fric) / s.M); return [s.mh, F, noisy(a, 0.015, 0.01)]; },
      xy: r => [r[1], r[2]], xl: 'F = m_h g (N)', yl: 'a (m/s²)', origin: false,
      result: (f, s) => `slope = ${fmt(f.m)} kg⁻¹ → mass = 1/slope = <b>${fmt(1 / f.m)} kg</b> (set: ${s.M} kg) · intercept ${fmt(f.b, 2)} m/s²${Math.abs(f.b) > 0.02 ? ' (a negative intercept reveals friction)' : ''}`,
      draw: (cv, s, t) => { const c = ctxOf(cv); const W = cv.width; const a = Math.max(0, (s.mh * g0 - s.fric) / s.M); const T = (t / 1000) % 2.2; const x = Math.min(0.5 * a * T * T, 1.6); const px = 60 + x * 220;
        box(c, 40, 140, W - 140, 6, css('--muted')); box(c, px, 104, 90, 36, css('--brand')); txt(c, 'cart', px + 30, 126, css('--panel')); c.fillStyle = css('--ink'); c.beginPath(); c.arc(px + 15, 146, 6, 0, 7); c.arc(px + 75, 146, 6, 0, 7); c.fill();
        c.strokeStyle = css('--ink'); c.lineWidth = 1.5; c.beginPath(); c.moveTo(px + 90, 120); c.lineTo(W - 92, 120); c.stroke(); c.beginPath(); c.arc(W - 92, 132, 12, 0, 7); c.stroke(); c.beginPath(); c.moveTo(W - 80, 132); c.lineTo(W - 80, 170 + x * 60); c.stroke();
        box(c, W - 94, 170 + x * 60, 28, 26, css('--accent')); txt(c, `${(s.mh * 1000).toFixed(0)} g`, W - 136, 190 + x * 60); txt(c, `a = ${fmt(a)} m/s²`, 50, 40); txt(c, `T = ${fmt(s.mh * g0 - s.mh * a)} N (string tension)`, 50, 62, css('--muted')); },
      errors: ['Friction on the track (try the "Small" option: the line no longer passes through the origin).', 'String or pulley mass neglected.', 'Not keeping the total mass constant changes the slope during the experiment.'],
      discussion: [['Why move masses from the cart to the hanger instead of adding new ones?', 'To keep the accelerated mass constant, so a ∝ F is tested with one variable at a time.'], ['Why is the tension less than m_h g?', 'The hanger accelerates downward: m_h g − T = m_h a, so T = m_h(g − a).']],
      skills: ['Levelling the track', 'Aligning the string parallel to the track', 'Catching the cart safely before it hits the pulley']
    },
    {
      id: 'young', title: 'E4 · Young\'s modulus of a wire', ar: 'معامل يونغ لسلك', src: 'S06 §1 · BK p.87–89', law: '{{F // A}} = Y {{ΔL // L}},   A = π ( {{d // 2}} )²',
      objective: 'Load a long wire, measure its extension and find Young\'s modulus from the stress–strain graph.',
      apparatus: ['Long wire clamped at the top', 'Slotted masses (0.5 kg each)', 'Vernier/micrometer scale for extension (resolution 0.01 mm)', 'Micrometer for diameter', 'Material selector: steel, copper, aluminium (🧩 typical textbook values: Y = 2.0×10¹¹, 1.1×10¹¹, 7.0×10¹⁰ N/m²; not in your course files)'],
      procedure: ['Measure L and the diameter d (use the radius r = d/2 for the area).', 'Add load m; read the extension ΔL.', 'Record stress F/A and strain ΔL/L for 6–8 loads.', 'Plot stress against strain; the slope in the straight (elastic) region is Y.', 'Unload to check the wire returns to its length (below the elastic limit).'],
      controls: [{ id: 'mat', label: 'Material', options: [['Steel', 2.0e11], ['Copper', 1.1e11], ['Aluminium', 7.0e10]] }, { id: 'L', label: 'Length L', min: 1, max: 3, step: 0.1, value: 2, unit: 'm' }, { id: 'd', label: 'Diameter d', min: 0.3, max: 1.2, step: 0.05, value: 0.5, unit: 'mm' }, { id: 'm', label: 'Load m', min: 0, max: 8, step: 0.25, value: 2, unit: 'kg' }],
      lim: { 2.0e11: 2.5e8, 1.1e11: 0.7e8, 7.0e10: 0.4e8 },
      ext(s) { const A = Math.PI * (s.d / 2000) ** 2, st = s.m * g0 / A, lim = this.lim[s.mat]; const strain = st <= lim ? st / s.mat : lim / s.mat + (st - lim) / (s.mat * 0.15); return { A, st, strain, over: st > lim }; },
      measure(s) { const e = this.ext(s); const dL = noisy(e.strain * s.L * 1000, 0.01, 0.01); return [s.m, +(s.m * g0).toFixed(2), +(e.st / 1e6).toFixed(3), dL, dL / 1000 / s.L]; },
      cols: ['m (kg)', 'F (N)', 'stress (MPa)', 'ΔL (mm)', 'strain'],
      xy: r => [r[4], r[2] * 1e6], xl: 'strain ΔL/L', yl: 'stress F/A (N/m²)', origin: true,
      filter(r, s) { return r[2] * 1e6 <= this.lim[s.mat] * 1.001; },
      result: (f, s) => `Fitted only the readings inside the elastic limit (points beyond it are shown in the table but excluded). Y = slope = <b>${fmt(f.m)} N/m²</b> (reference ${fmt(s.mat)} N/m²) · difference ${fmt(Math.abs(f.m - s.mat) / s.mat * 100, 2)} %. Keep only points in the straight region.`,
      draw(cv, s) { const c = ctxOf(cv); const e = this.ext(s); box(c, 60, 20, 160, 10, css('--muted')); const len = 140 + e.strain * s.L * 1000 * 6; c.strokeStyle = css('--ink'); c.lineWidth = Math.max(1, s.d * 3); c.beginPath(); c.moveTo(140, 30); c.lineTo(140, 30 + len); c.stroke();
        box(c, 115, 30 + len, 50, 18 + s.m * 1.5, css('--accent')); txt(c, `${s.m} kg`, 120, 44 + len); txt(c, `stress = ${fmt(e.st)} N/m²`, 260, 60); txt(c, `strain = ${fmt(e.strain)}`, 260, 82); txt(c, `ΔL = ${fmt(e.strain * s.L * 1000)} mm`, 260, 104);
        if (e.over) { c.fillStyle = css('--bad'); c.fillText('⚠ Beyond the elastic limit: permanent stretch (Fig 6.2)', 260, 140); } },
      errors: ['Using the diameter instead of the radius in A = πr² (a factor‑4 error).', 'Kinks in the wire at small loads: start with a small "straightening" load.', 'Exceeding the elastic limit: the graph bends, and the wire does not return.'],
      discussion: [['Why use a long, thin wire?', 'ΔL = FL/(AY) is larger for large L and small A, so it can be measured accurately.'], ['What happens beyond the elastic limit?', 'The wire is permanently deformed; Hooke region formulas no longer apply (BK p.88, Fig 6.2).']],
      skills: ['Using a micrometer at several points along the wire', 'Reading a vernier scale', 'Adding loads gently to avoid shock']
    },
    {
      id: 'venturi', title: 'E5 · Venturi tube: continuity & Bernoulli', ar: 'أنبوب فنتوري: الاستمرارية وبرنولي', src: 'S06 §4 · BK p.96–99', law: 'A₁v₁ = A₂v₂,   P₁ − P₂ = ½ρ(v₂² − v₁²)',
      objective: 'Measure the pressure drop in a narrowing horizontal pipe and verify Bernoulli\'s equation.',
      apparatus: ['Horizontal Venturi tube (wide radius r₁, narrow radius r₂)', 'Flow meter (L/min)', 'Two vertical manometer tubes (height resolution 1 mm of water)'],
      procedure: ['Set the flow rate R.', 'Compute v₁ = R/A₁ and v₂ = R/A₂.', 'Read the height difference Δh between the two manometer tubes; ΔP = ρgΔh.', 'Repeat for 6 flow rates.', 'Plot ΔP against (v₂² − v₁²). The slope should be ρ/2 = 500 kg/m³ for water.'],
      controls: [{ id: 'R', label: 'Flow rate R', min: 1, max: 20, step: 0.5, value: 8, unit: 'L/min' }, { id: 'r1', label: 'Wide radius r₁', min: 0.6, max: 1.5, step: 0.05, value: 1, unit: 'cm' }, { id: 'r2', label: 'Narrow radius r₂', min: 0.2, max: 0.6, step: 0.05, value: 0.4, unit: 'cm' }],
      calc: s => { const R = s.R / 60000, A1 = Math.PI * (s.r1 / 100) ** 2, A2 = Math.PI * (s.r2 / 100) ** 2, v1 = R / A1, v2 = R / A2; return { v1, v2, dP: 0.5 * 1000 * (v2 * v2 - v1 * v1) }; },
      measure(s) { const k = this.calc(s); const dh = noisy(k.dP / (1000 * g0) * 1000, 0.015, 1); return [s.R, +k.v1.toFixed(3), +k.v2.toFixed(3), dh, dh / 1000 * 1000 * g0, k.v2 ** 2 - k.v1 ** 2]; },
      cols: ['R (L/min)', 'v₁ (m/s)', 'v₂ (m/s)', 'Δh (mm)', 'ΔP (Pa)', 'v₂² − v₁² (m²/s²)'],
      xy: r => [r[5], r[4]], xl: 'v₂² − v₁² (m²/s²)', yl: 'ΔP (Pa)', origin: true,
      result: f => `slope = <b>${fmt(f.m)} kg/m³</b> → ρ = 2 × slope = ${fmt(2 * f.m)} kg/m³ (water 1000 kg/m³)`,
      draw(cv, s) { const c = ctxOf(cv); const k = this.calc(s); const y = 150, W = cv.width; const h1 = s.r1 * 30, h2 = s.r2 * 30;
        c.fillStyle = css('--brand-soft'); c.beginPath(); c.moveTo(30, y - h1); c.lineTo(200, y - h1); c.lineTo(260, y - h2); c.lineTo(360, y - h2); c.lineTo(420, y - h1); c.lineTo(W - 30, y - h1); c.lineTo(W - 30, y + h1); c.lineTo(420, y + h1); c.lineTo(360, y + h2); c.lineTo(260, y + h2); c.lineTo(200, y + h1); c.lineTo(30, y + h1); c.closePath(); c.fill(); c.strokeStyle = css('--ink'); c.lineWidth = 1.5; c.stroke();
        const base = 100; const P1h = 70, P2h = Math.max(4, P1h - k.dP / (1000 * g0) * 1000 / 4); box(c, 110, y - h1 - P1h - 4, 12, P1h + 4, css('--brand')); box(c, 304, y - h2 - P2h - (h1 - h2) - 4, 12, P2h + (h1 - h2) + 4, css('--brand'));
        arrow(c, 60, y, 60 + Math.min(80, k.v1 * 40), y, css('--accent'), 3, 'v₁'); arrow(c, 280, y, 280 + Math.min(120, k.v2 * 25), y, css('--accent'), 3, 'v₂');
        txt(c, `v₁ = ${fmt(k.v1)} m/s, v₂ = ${fmt(k.v2)} m/s`, 30, 30); txt(c, `ΔP = ${fmt(k.dP)} Pa → Δh = ${fmt(k.dP / (1000 * g0) * 1000)} mm`, 30, 52, css('--muted')); void base; },
      errors: ['Viscosity (real water is not ideal) causes extra pressure loss.', 'Bubbles in the manometer tubes.', 'Radius measurement errors are squared in the area.'],
      discussion: [['Why is the pressure lower in the narrow section?', 'v is larger there (continuity), and with constant P + ½ρv² the pressure must drop (Bernoulli).'], ['Which ideal‑fluid assumptions does the simulation use?', 'Incompressible, non‑viscous, steady, irrotational flow (BK p.96).']],
      skills: ['Bleeding air from manometer tubes', 'Reading the meniscus at eye level', 'Timing a volume to calibrate the flow meter']
    },
    {
      id: 'calorimetry', title: 'E6 · Calorimetry: specific heat of an unknown metal', ar: 'المسعر: الحرارة النوعية لفلز مجهول', src: 'S07 §3 · BK p.113–116, Exercise 7 p.120', law: 'Q = c m ΔT,   heat lost = heat gained',
      objective: 'Identify an unknown metal by measuring its specific heat with the method of mixtures.',
      apparatus: ['Insulated aluminium calorimeter cup (c = 0.21 cal/g·°C, BK p.121)', 'Thermometer (resolution 0.1 °C)', 'Balance (resolution 0.1 g)', 'Boiling water bath (metal heated to 100 °C)', 'Unknown metal sample (hidden: one of Al 0.215, Fe 0.11, Cu 0.092, Pb 0.031 cal/g·°C)'],
      procedure: ['Weigh the cup and the water; record the water temperature T_w.', 'Heat the metal to 100 °C in the bath.', 'Transfer it quickly into the water; stir; record the highest steady temperature T_f.', 'Apply heat balance: m_s c_s (100 − T_f) = (m_w·1 + m_cup·0.21)(T_f − T_w).', 'Repeat with different water masses; average c_s and identify the metal.'],
      controls: [{ id: 'metal', label: 'Sample', options: [['Unknown A', 0.215], ['Unknown B', 0.11], ['Unknown C', 0.092], ['Unknown D', 0.031]] }, { id: 'ms', label: 'Sample mass', min: 20, max: 200, step: 5, value: 100, unit: 'g' }, { id: 'mw', label: 'Water mass', min: 50, max: 300, step: 10, value: 150, unit: 'g' }, { id: 'tw', label: 'Water temperature', min: 10, max: 30, step: 0.5, value: 20, unit: '°C' }],
      Tf: s => { const cup = 40 * 0.21, a = s.ms * s.metal, b = s.mw + cup; return (a * 100 + b * s.tw) / (a + b); },
      measure(s) { const Tf = roundTo(this.Tf(s) + (NOISE ? 0.08 * gauss() : 0), 0.1); const cs = (s.mw + 40 * 0.21) * (Tf - s.tw) / (s.ms * (100 - Tf)); return [s.ms, s.mw, s.tw, Tf, +cs.toFixed(4)]; },
      cols: ['m_sample (g)', 'm_water (g)', 'T_w (°C)', 'T_f (°C)', 'c_sample (cal/g·°C)'],
      xy: r => [r[1], r[4]], xl: 'water mass (g)', yl: 'c measured (cal/g·°C)', origin: false, avg: 4,
      result: (f, s, rows) => { const avg = rows.reduce((a, r) => a + r[4], 0) / rows.length; const names = [['aluminium', 0.215], ['iron', 0.11], ['copper', 0.092], ['lead', 0.031]]; const best = names.reduce((a, b) => Math.abs(b[1] - avg) < Math.abs(a[1] - avg) ? b : a); return `mean c = <b>${fmt(avg)} cal/g·°C</b> = ${fmt(avg * 4186)} J/kg·K → closest: <b>${best[0]}</b> (${best[1]}). <span class="muted">Check with the "Reveal" button.</span>`; },
      draw(cv, s, t) { const c = ctxOf(cv); const Tf = this.Tf(s); const tt = (t / 1000) % 8; const T = tt < 1 ? s.tw : Tf - (Tf - s.tw) * Math.exp(-(tt - 1) * 1.5);
        box(c, 60, 80, 150, 140, css('--line'), css('--ink')); box(c, 66, 120, 138, 96, css('--brand-soft')); box(c, 110, tt < 1 ? 20 + tt * 120 : 160, 50, 30, css('--accent')); txt(c, 'metal', 116, (tt < 1 ? 20 + tt * 120 : 160) + 20, css('--panel'));
        box(c, 240, 40, 14, 180, css('--line'), css('--ink')); const fill = (T - 0) / 100 * 170; box(c, 243, 217 - fill, 8, fill, css('--bad'));
        txt(c, `T = ${fmt(T, 3)} °C`, 270, 120); txt(c, `final ≈ ${fmt(Tf, 3)} °C`, 270, 142, css('--muted')); txt(c, 'cup + water', 90, 240, css('--muted')); },
      reveal: s => `The sample's specific heat is ${s.metal} cal/g·°C.`,
      errors: ['Heat lost to the air during the transfer (sample cools before entering the water).', 'Heat absorbed by the thermometer and stirrer.', 'Reading T_f before the mixture is uniform.'],
      discussion: [['Why use the highest steady temperature?', 'At that point the sample and water are in thermal equilibrium; heat lost = heat gained.'], ['Why must the cup\'s heat capacity be included?', 'The cup warms from T_w to T_f too, so it also gains heat (BK Ex 7.8 includes the glass).']],
      skills: ['Fast, splash‑free transfer of the hot sample', 'Stirring gently and continuously', 'Reading a thermometer to 0.1 °C']
    },
    {
      id: 'expansion', title: 'E7 · Linear expansion of a metal rod', ar: 'التمدد الطولي لقضيب فلزي', src: 'S07 §2 · BK p.108–112', law: 'Δℓ = α ℓ₀ ΔT',
      objective: 'Measure the linear expansion coefficient α by heating a rod and reading a dial gauge.',
      apparatus: ['Hollow metal rod with steam jacket', 'Dial gauge (resolution 0.01 mm)', 'Thermometer (resolution 0.5 °C)', 'Rod selector (α from the course: copper 1.8×10⁻⁵, a 1.7×10⁻⁵ metal, a 1.25×10⁻⁵ metal; BK Ex 7.3–7.5)'],
      procedure: ['Measure the rod length ℓ₀ at room temperature.', 'Pass steam/hot water; wait for a steady temperature T.', 'Read Δℓ on the dial gauge.', 'Record at least 6 temperatures.', 'Plot Δℓ against ΔT; α = slope / ℓ₀.'],
      controls: [{ id: 'al', label: 'Rod', options: [['Copper (α = 1.8×10⁻⁵)', 1.8e-5], ['Metal B (α = 1.7×10⁻⁵)', 1.7e-5], ['Metal C (α = 1.25×10⁻⁵)', 1.25e-5]] }, { id: 'L0', label: 'Length ℓ₀', min: 0.3, max: 1, step: 0.05, value: 0.6, unit: 'm' }, { id: 'T', label: 'Temperature', min: 25, max: 100, step: 5, value: 60, unit: '°C' }],
      measure: s => { const dT = s.T - 20; const dl = noisy(s.al * s.L0 * dT * 1000, 0.015, 0.01); return [s.T, dT, dl]; },
      cols: ['T (°C)', 'ΔT (°C)', 'Δℓ (mm)'],
      xy: r => [r[1], r[2] / 1000], xl: 'ΔT (°C)', yl: 'Δℓ (m)', origin: true,
      result: (f, s) => `α = slope/ℓ₀ = <b>${fmt(f.m / s.L0)} °C⁻¹</b> (rod: ${s.al.toExponential(2)}) · difference ${fmt(Math.abs(f.m / s.L0 - s.al) / s.al * 100, 2)} %`,
      draw: (cv, s) => { const c = ctxOf(cv); const dT = s.T - 20; const ext = s.al * s.L0 * dT * 1000; const len = s.L0 * 380; box(c, 30, 120, len, 22, css('--accent')); box(c, 30 + len, 120, ext * 60, 22, css('--bad')); box(c, 20, 100, 10, 60, css('--ink'));
        c.strokeStyle = css('--ink'); c.lineWidth = 2; c.beginPath(); c.arc(70 + len + 40, 90, 30, 0, 7); c.stroke(); const a = -Math.PI / 2 + ext * 2 * Math.PI; arrow(c, 110 + len, 90, 110 + len + 22 * Math.cos(a), 90 + 22 * Math.sin(a), css('--bad'), 2);
        txt(c, `T = ${s.T} °C, ΔT = ${dT} °C`, 30, 40); txt(c, `Δℓ = ${fmt(ext)} mm (dial gauge)`, 30, 62, css('--muted')); txt(c, '(expansion drawn ×60)', 30, 180, css('--muted')); },
      errors: ['The rod is not at a uniform temperature (read when steady).', 'The dial gauge support also expands.', 'Initial temperature taken as 20 °C: measure it.'],
      discussion: [['Why is Δℓ so small?', 'α is about 10⁻⁵ °C⁻¹, so a 1 m rod heated by 50 °C grows less than 1 mm.'], ['How would the volume coefficient compare?', 'β = 3α (BK p.111).']],
      skills: ['Zeroing a dial gauge', 'Handling steam safely', 'Waiting for thermal equilibrium']
    },
    {
      id: 'ohm', title: 'E8 · Ohm\'s law, resistivity and combinations', ar: 'قانون أوم والمقاومية وتوصيل المقاومات', src: 'S09U §2, §4 · BK p.149–157', law: 'V = R I,   R = {{ρ ℓ // A}},   series R = ΣRᵢ,   parallel {{1 // R}} = Σ {{1 // Rᵢ}}',
      objective: 'Verify Ohm\'s law, find an unknown resistance from the V–I graph, and check series/parallel rules.',
      apparatus: ['Variable DC supply (0–12 V)', 'Ammeter (resolution 1 mA) and voltmeter (resolution 0.01 V)', 'Resistors and a resistance wire'],
      procedure: ['Choose the circuit mode.', 'Vary the supply voltage V in steps.', 'Record V and I.', 'Plot V against I; slope = R (or R_eq).', 'In "resistance wire" mode vary the length ℓ at fixed V and plot R against ℓ: slope = ρ/A.'],
      controls: [{ id: 'mode', label: 'Circuit', options: [['Single unknown resistor', 0], ['R₁ and R₂ in series', 1], ['R₁ and R₂ in parallel', 2], ['Resistance wire (vary length)', 3]] }, { id: 'V', label: 'Supply V', min: 0.5, max: 12, step: 0.5, value: 6, unit: 'V' }, { id: 'R1', label: 'R₁', min: 10, max: 200, step: 5, value: 100, unit: 'Ω' }, { id: 'R2', label: 'R₂', min: 10, max: 200, step: 5, value: 50, unit: 'Ω' }, { id: 'len', label: 'Wire length ℓ', min: 0.1, max: 1, step: 0.05, value: 0.5, unit: 'm' }],
      hidden: 47 + Math.round(Math.random() * 100),
      Req(s) { return s.mode === 0 ? this.hidden : s.mode === 1 ? s.R1 + s.R2 : s.mode === 2 ? s.R1 * s.R2 / (s.R1 + s.R2) : 1.1e-6 * s.len / (Math.PI * (0.2e-3) ** 2); },
      measure(s) { const R = this.Req(s); const I = noisy(s.V / R, 0.01, 0.001); const Vm = noisy(s.V, 0.003, 0.01); return [s.mode, s.mode === 3 ? s.len : 0, Vm, I, +(Vm / I).toFixed(2)]; },
      cols: ['mode', 'ℓ (m)', 'V (V)', 'I (A)', 'V/I (Ω)'],
      xy(r, s) { return s.mode === 3 ? [r[1], r[4]] : [r[3], r[2]]; }, xlf: s => s.mode === 3 ? 'ℓ (m)' : 'I (A)', ylf: s => s.mode === 3 ? 'R (Ω)' : 'V (V)', origin: true, filter: (r, s) => r[0] === s.mode,
      result(f, s) { if (s.mode === 3) { const A = Math.PI * (0.2e-3) ** 2; return `slope = ρ/A = ${fmt(f.m)} Ω/m → ρ = <b>${fmt(f.m * A)} Ω·m</b> (wire radius 0.2 mm; nichrome‑like value 1.1×10⁻⁶ Ω·m, cf. BK Ex 9.5)`; } const th = this.Req(s); return `R = slope = <b>${fmt(f.m)} Ω</b>${s.mode ? ` · theory ${fmt(th)} Ω (${s.mode === 1 ? 'R₁ + R₂' : 'R₁R₂/(R₁+R₂)'})` : ''}`; },
      reveal(s) { return `The unknown resistor is ${this.hidden} Ω.`; },
      draw(cv, s) { const c = ctxOf(cv); const R = this.Req(s), I = s.V / R; c.strokeStyle = css('--ink'); c.lineWidth = 2; c.strokeRect(60, 50, 360, 160);
        box(c, 50, 110, 20, 40, css('--panel'), css('--ink')); txt(c, `${s.V} V`, 10, 135); const res = (x, y, lab) => { box(c, x, y - 10, 70, 20, css('--accent')); txt(c, lab, x + 6, y + 5, css('--panel')); };
        if (s.mode === 0) res(200, 50, 'R = ?'); else if (s.mode === 1) { res(140, 50, `R₁ ${s.R1}`); res(280, 50, `R₂ ${s.R2}`); } else if (s.mode === 2) { c.strokeRect(160, 30, 140, 40); res(195, 30, `R₁ ${s.R1}`); res(195, 70, `R₂ ${s.R2}`); } else { box(c, 140, 46, 200 * s.len + 20, 8, css('--bad')); txt(c, `wire ℓ = ${s.len} m`, 160, 40); }
        c.beginPath(); c.arc(420, 130, 16, 0, 7); c.fillStyle = css('--panel'); c.fill(); c.stroke(); txt(c, 'A', 415, 135); txt(c, `I = ${fmt(I * 1000)} mA`, 440, 135); txt(c, `R_eq = ${s.mode === 0 ? '?' : fmt(R) + ' Ω'}`, 440, 160, css('--muted')); txt(c, `P = VI = ${fmt(s.V * I)} W`, 440, 185, css('--muted')); },
      errors: ['Meter resolution and calibration.', 'Wire heating at high current changes R (Ohm\'s law needs constant temperature).', 'Contact resistance at the clips.'],
      discussion: [['What does a straight V–I line through the origin show?', 'The conductor is ohmic: V ∝ I at constant temperature.'], ['Why is the parallel R_eq smaller than either resistor?', 'Each branch adds another path, so the total current is larger for the same V.']],
      skills: ['Connecting the ammeter in series and the voltmeter in parallel', 'Choosing meter ranges', 'Switching off between readings to avoid heating']
    },
    {
      id: 'capacitor', title: 'E9 · Parallel‑plate capacitor', ar: 'المكثف ذو اللوحين المتوازيين', src: 'S08 §5 · BK p.136–141', law: 'C = {{ε₀ A // d}},   U = ½ C V²',
      objective: 'Show that C ∝ 1/d and determine ε₀ from the slope of C against 1/d.',
      apparatus: ['Two square plates on a sliding rail (side adjustable)', 'Spacers to set d (resolution 0.1 mm)', 'Capacitance meter (resolution 0.1 pF)'],
      procedure: ['Set the plate side a (A = a²).', 'Set separation d and read C.', 'Repeat for 6 separations.', 'Plot C against 1/d; slope = ε₀A.', 'Compute ε₀ = slope / A and compare with 8.85×10⁻¹² C²/N·m².'],
      controls: [{ id: 'a', label: 'Plate side a', min: 10, max: 30, step: 1, value: 20, unit: 'cm' }, { id: 'd', label: 'Separation d', min: 1, max: 10, step: 0.5, value: 3, unit: 'mm' }, { id: 'V', label: 'Charging voltage', min: 1, max: 100, step: 1, value: 50, unit: 'V' }],
      measure: s => { const A = (s.a / 100) ** 2, C = 8.85e-12 * A / (s.d / 1000); const Cm = noisy(C * 1e12, 0.01, 0.1); return [s.a, s.d, 1000 / s.d, Cm, +(0.5 * Cm * 1e-12 * s.V * s.V * 1e9).toFixed(3)]; },
      cols: ['a (cm)', 'd (mm)', '1/d (m⁻¹)', 'C (pF)', 'U (nJ)'],
      xy: r => [r[2], r[3] * 1e-12], xl: '1/d (m⁻¹)', yl: 'C (F)', origin: true, filter: (r, s) => r[0] === s.a,
      result: (f, s) => { const A = (s.a / 100) ** 2; return `ε₀ = slope/A = <b>${fmt(f.m / A)} C²/N·m²</b> (accepted 8.85×10⁻¹²) · difference ${fmt(Math.abs(f.m / A - 8.85e-12) / 8.85e-12 * 100, 2)} %`; },
      draw: (cv, s) => { const c = ctxOf(cv); const gap = s.d * 10, h = s.a * 5; const x = 200; box(c, x - 8 - gap / 2, 140 - h / 2, 8, h, css('--bad')); box(c, x + gap / 2, 140 - h / 2, 8, h, css('--brand')); for (let i = 0; i < 7; i++) arrow(c, x - gap / 2 + 2, 140 - h / 2 + (i + .5) * h / 7, x + gap / 2 - 2, 140 - h / 2 + (i + .5) * h / 7, css('--muted'), 1);
        const C = 8.85e-12 * (s.a / 100) ** 2 / (s.d / 1000); txt(c, `C = ${fmt(C * 1e12)} pF`, 330, 100); txt(c, `Q = CV = ${fmt(C * s.V * 1e9)} nC`, 330, 122, css('--muted')); txt(c, `U = ½CV² = ${fmt(0.5 * C * s.V * s.V * 1e9)} nJ`, 330, 144, css('--muted')); txt(c, `E = V/d = ${fmt(s.V / (s.d / 1000))} V/m`, 330, 166, css('--muted')); txt(c, '+', x - 30 - gap / 2, 60); txt(c, '−', x + 20 + gap / 2, 60); },
      errors: ['Edge (fringing) effects at large d make C larger than ε₀A/d.', 'Stray capacitance of the leads adds a constant (non‑zero intercept).', 'Plates not exactly parallel.'],
      discussion: [['Why does C increase when d decreases?', 'C = ε₀A/d: the field for a given charge is the same but V = Ed is smaller, so Q/V is larger.'], ['What happens to U when V doubles?', 'U = ½CV² becomes four times larger.']],
      skills: ['Keeping plates parallel with spacers', 'Zeroing the capacitance meter with leads attached', 'Discharging a capacitor safely']
    },
    {
      id: 'snell', title: 'E10 · Refraction: Snell\'s law & critical angle', ar: 'الانكسار: قانون سنل والزاوية الحرجة', src: 'S10 §3 · BK p.165–172', law: 'n₁ sin θ₁ = n₂ sin θ₂,   sin θc = n₂/n₁',
      objective: 'Measure refraction angles, find the refractive index from a sin–sin graph, and observe total internal reflection.',
      apparatus: ['Ray box / laser', 'Semicircular block (hidden n option)', 'Protractor disc (resolution 0.5°)'],
      procedure: ['Choose the direction: air → block or block → air.', 'Set the incident angle θ₁ (from the normal).', 'Read the refraction angle θ₂.', 'Repeat for 6–8 angles.', 'Plot sin θ₁ against sin θ₂ (air → block): slope = n. For block → air, increase θ₁ until the ray grazes the surface: that is θc.'],
      controls: [{ id: 'n', label: 'Block', options: [['Water (n = 1.33)', 1.33], ['Glass (n = 1.5)', 1.5], ['Glass (n = 1.52)', 1.52], ['Unknown block', 1.46]] }, { id: 'dir', label: 'Direction', options: [['Air → block', 0], ['Block → air', 1]] }, { id: 'th', label: 'Incident angle θ₁', min: 0, max: 89, step: 1, value: 30, unit: '°' }],
      calc: s => { const n1 = s.dir ? s.n : 1, n2 = s.dir ? 1 : s.n; const sv = n1 * Math.sin(rad(s.th)) / n2; return { n1, n2, tir: sv > 1, th2: sv > 1 ? null : deg(Math.asin(sv)), crit: s.dir ? deg(Math.asin(1 / s.n)) : null }; },
      measure(s) { const k = this.calc(s); const t2 = k.tir ? NaN : roundTo(k.th2 + (NOISE ? 0.4 * gauss() : 0), 0.5); return [s.dir, s.th, k.tir ? 'TIR' : t2, +Math.sin(rad(s.th)).toFixed(4), k.tir ? '—' : +Math.sin(rad(t2)).toFixed(4)]; },
      cols: ['dir', 'θ₁ (°)', 'θ₂ (°)', 'sin θ₁', 'sin θ₂'],
      xy: r => typeof r[4] === 'number' ? (r[0] ? [r[3], r[4]] : [r[4], r[3]]) : null,
      xlf: s => s.dir ? 'sin θ₁ (in block)' : 'sin θ₂ (in block)', ylf: s => s.dir ? 'sin θ₂ (in air)' : 'sin θ₁ (in air)', origin: true, filter: (r, s) => r[0] === s.dir,
      result(f, s) { const k = this.calc(s); return s.dir ? `slope = n = <b>${fmt(f.m)}</b> · predicted critical angle sin⁻¹(1/n) = ${fmt(deg(Math.asin(Math.min(1, 1 / f.m))))}°` : `n = slope = <b>${fmt(f.m)}</b>`; },
      reveal: s => `n = ${s.n}; critical angle = ${fmt(deg(Math.asin(1 / s.n)))}°`,
      draw(cv, s) { const c = ctxOf(cv); const k = this.calc(s); const cx = 260, cy = 150, R = 120; c.fillStyle = css('--brand-soft'); if (s.dir) { c.beginPath(); c.moveTo(cx - R, cy); c.arc(cx, cy, R, Math.PI, 0, true); c.fill(); } else { c.beginPath(); c.moveTo(cx - R, cy); c.arc(cx, cy, R, 0, Math.PI, false); c.fill(); }
        c.strokeStyle = css('--muted'); c.setLineDash([4, 4]); c.beginPath(); c.moveTo(cx, cy - R - 10); c.lineTo(cx, cy + R + 10); c.stroke(); c.setLineDash([]); c.beginPath(); c.moveTo(cx - R - 20, cy); c.lineTo(cx + R + 20, cy); c.stroke();
        const a = rad(s.th); arrow(c, cx - R * Math.sin(a), cy - R * Math.cos(a), cx, cy, css('--bad'), 3); const refl = css('--muted');
        arrow(c, cx, cy, cx + R * Math.sin(a), cy - R * Math.cos(a), k.tir ? css('--bad') : refl, k.tir ? 3 : 1, k.tir ? 'total internal reflection' : 'reflected');
        if (!k.tir) { const b = rad(k.th2); arrow(c, cx, cy, cx + R * Math.sin(b), cy + R * Math.cos(b), css('--bad'), 3, `θ₂ = ${fmt(k.th2)}°`); }
        txt(c, `θ₁ = ${s.th}°`, cx - R - 10, cy - R + 10); txt(c, s.dir ? 'block (top) → air (bottom)' : 'air (top) → block (bottom)', 20, 24, css('--muted')); if (k.crit) txt(c, `θc = ${fmt(k.crit)}°`, 20, 46, css('--muted')); },
      errors: ['Ray not aimed at the centre of the flat face (the curved face then refracts too).', 'Protractor read to ±0.5°.', 'Wide beam: mark the centre of the ray.'],
      discussion: [['Why use a semicircular block?', 'A ray aimed at the centre meets the curved surface along a radius (normal), so it is not refracted there.'], ['Why does total internal reflection only occur from block to air?', 'It needs n₁ > n₂ so that n₁ sin θ₁/n₂ can exceed 1 (BK p.172).']],
      skills: ['Aligning the block with the protractor centre', 'Working in a darkened room', 'Laser safety (never look into the beam)']
    },
    {
      id: 'coulomb', title: 'E11 · Coulomb\'s law with a torsion/force sensor', ar: 'قانون كولوم بمستشعر قوة', src: 'S08 §2 · BK p.126–130', law: 'F = {{k q₁ q₂ // r²}},   k ≈ 9×10⁹ N·m²/C²',
      objective: 'Show that the electric force varies as 1/r² and determine k from the slope.',
      apparatus: ['Two small conducting spheres on insulating stands', 'High‑voltage charger (charges set in nC)', 'Force sensor (resolution 0.1 mN)', 'Distance scale (resolution 1 mm)'],
      procedure: ['Charge both spheres (q₁, q₂).', 'Set the centre‑to‑centre distance r.', 'Read the force F.', 'Repeat for 6 distances.', 'Plot F against 1/r²; slope = k q₁q₂ → k = slope/(q₁q₂).'],
      controls: [{ id: 'q1', label: 'q₁', min: 10, max: 100, step: 5, value: 50, unit: 'nC' }, { id: 'q2', label: 'q₂', min: 10, max: 100, step: 5, value: 50, unit: 'nC' }, { id: 'r', label: 'Distance r', min: 2, max: 15, step: 0.5, value: 5, unit: 'cm' }],
      measure: s => { const F = 9e9 * s.q1 * 1e-9 * s.q2 * 1e-9 / (s.r / 100) ** 2; const Fm = noisy(F * 1000, 0.02, 0.1); return [s.q1, s.q2, s.r, 1 / (s.r / 100) ** 2, Fm]; },
      cols: ['q₁ (nC)', 'q₂ (nC)', 'r (cm)', '1/r² (m⁻²)', 'F (mN)'],
      xy: r => [r[3], r[4] / 1000], xl: '1/r² (m⁻²)', yl: 'F (N)', origin: true, filter: (r, s) => r[0] === s.q1 && r[1] === s.q2,
      result: (f, s) => { const k = f.m / (s.q1 * 1e-9 * s.q2 * 1e-9); return `k = slope/(q₁q₂) = <b>${fmt(k)} N·m²/C²</b> (course value 9×10⁹) · difference ${fmt(Math.abs(k - 9e9) / 9e9 * 100, 2)} %`; },
      draw: (cv, s) => { const c = ctxOf(cv); const x1 = 120, x2 = 120 + s.r * 22; c.fillStyle = css('--bad'); c.beginPath(); c.arc(x1, 140, 16, 0, 7); c.fill(); c.fillStyle = css('--bad'); c.beginPath(); c.arc(x2, 140, 16, 0, 7); c.fill(); txt(c, '+', x1 - 4, 145, css('--panel')); txt(c, '+', x2 - 4, 145, css('--panel'));
        const F = 9e9 * s.q1 * 1e-9 * s.q2 * 1e-9 / (s.r / 100) ** 2; const L = Math.min(90, 10 + F * 1000 * 4); arrow(c, x2 + 18, 140, x2 + 18 + L, 140, css('--accent'), 3, 'F'); arrow(c, x1 - 18, 140, x1 - 18 - L, 140, css('--accent'), 3);
        txt(c, `r = ${s.r} cm`, (x1 + x2) / 2 - 20, 190); txt(c, `F = ${fmt(F * 1000)} mN (repulsive)`, 20, 40); txt(c, `E at sphere 2 = kq₁/r² = ${fmt(9e9 * s.q1 * 1e-9 / (s.r / 100) ** 2)} N/C`, 20, 62, css('--muted')); },
      errors: ['Charge leaks away in humid air (readings drift with time).', 'Spheres are not point charges at small r (induced charge redistribution).', 'Nearby objects and the experimenter\'s body disturb the field.'],
      discussion: [['How does F change when r is halved?', 'It becomes four times larger (F ∝ 1/r²).'], ['How could you tell if the charges were opposite?', 'The force would be attractive; F would point toward the other sphere.']],
      skills: ['Charging spheres reproducibly', 'Keeping hands and leads away from the spheres', 'Taking readings quickly before charge leaks']
    }
  ];

  // each law in words: Arabic, then English
  const LAWW = {
    freefall: ['المسافة = السرعة الابتدائية × الزمن + نصف × تسارع الجاذبية × مربع الزمن (ومن السكون: الارتفاع = نصف × تسارع الجاذبية × مربع الزمن)', 'distance = initial velocity × time + one half × g × time squared (from rest: height = one half × g × time squared)'],
    forcetable: ['مقدار المحصلة = جذر (مربع المركّبة السينية + مربع المركّبة الصادية) ، وكل مركّبة = مجموع (القوة × جيب تمام أو جيب زاويتها)', 'magnitude of resultant = square root of (x‑component squared + y‑component squared), and each component = sum of (force × cosine or sine of its angle)'],
    newton2: ['محصلة القوى = الكتلة × التسارع ، إذن التسارع = الكتلة المعلّقة × تسارع الجاذبية ÷ (كتلة العربة + الكتلة المعلّقة)', 'net force = mass × acceleration, so acceleration = hanging mass × g ÷ (cart mass + hanging mass)'],
    young: ['القوة ÷ المساحة = معامل يونغ × (الاستطالة ÷ الطول الأصلي) ، ومساحة المقطع = π × مربع نصف القطر', 'force ÷ area = Young\'s modulus × (extension ÷ original length), and cross‑section area = π × radius squared'],
    venturi: ['المساحة × السرعة ثابتة على طول الأنبوب ، وفرق الضغط = نصف × الكثافة × (مربع السرعة الثانية − مربع السرعة الأولى)', 'area × speed is the same along the tube, and pressure difference = one half × density × (speed 2 squared − speed 1 squared)'],
    calorimetry: ['كمية الحرارة = الحرارة النوعية × الكتلة × التغير في درجة الحرارة ، والحرارة المفقودة = الحرارة المكتسبة', 'heat = specific heat × mass × change in temperature, and heat lost = heat gained'],
    expansion: ['التغير في الطول = معامل التمدد الطولي × الطول الأصلي × التغير في درجة الحرارة', 'change in length = linear expansion coefficient × original length × change in temperature'],
    ohm: ['الجهد = المقاومة × التيار ، والمقاومة = المقاومية × الطول ÷ المساحة ، توالي: المكافئة = مجموع المقاومات ، توازي: مقلوب المكافئة = مجموع المقلوبات', 'voltage = resistance × current, resistance = resistivity × length ÷ area; series: equivalent = sum of resistances; parallel: 1 ÷ equivalent = sum of (1 ÷ each resistance)'],
    capacitor: ['السعة = سماحية الفراغ × مساحة اللوح ÷ المسافة بين اللوحين ، والطاقة = نصف × السعة × مربع الجهد', 'capacitance = permittivity of free space × plate area ÷ plate separation, and energy = one half × capacitance × voltage squared'],
    snell: ['معامل انكسار الأول × جيب زاوية السقوط = معامل انكسار الثاني × جيب زاوية الانكسار ، وجيب الزاوية الحرجة = معامل الأقل كثافة ÷ معامل الأكثر كثافة', 'refractive index 1 × sine of incidence angle = refractive index 2 × sine of refraction angle, and sine of critical angle = index of less dense ÷ index of denser medium'],
    coulomb: ['القوة = ثابت كولوم × حاصل ضرب الشحنتين ÷ مربع المسافة', 'force = Coulomb\'s constant × product of the charges ÷ distance squared']
  };
  // ---------- UI ----------
  let cur = EX[0];
  const state = {}; const data = {};
  EX.forEach(e => { state[e.id] = {}; e.controls.forEach(k => state[e.id][k.id] = k.options ? k.options[0][1] : k.value); data[e.id] = []; });
  const notes = {};
  try { const saved = JSON.parse(localStorage.getItem('physics-virtual-lab-v1') || '{}'); Object.keys(saved.data || {}).forEach(k => { if (data[k]) data[k] = saved.data[k]; }); Object.keys(saved.notes || {}).forEach(k => notes[k] = saved.notes[k]); } catch (e) { /* storage unavailable */ }
  const persist = () => { try { localStorage.setItem('physics-virtual-lab-v1', JSON.stringify({ data, notes })); } catch (e) { /* ignore */ } };

  function renderList() { $('#exlist').innerHTML = EX.map(e => `<a href="#${e.id}" class="${e === cur ? 'active' : ''}">${esc(e.title)}<small>${e.ar}</small></a>`).join(''); }
  function render() {
    const e = cur, s = state[e.id];
    $('#exp').innerHTML = `
      <div class="row" style="justify-content:space-between"><h1>${esc(e.title)}</h1><span class="pill add">🧩 Additional design · law from ${esc(e.src)}</span></div>
      <p class="sub"><bdi>${e.ar}</bdi></p>
      <div class="formula">${mathify(e.law)}</div>${LAWW[e.id] ? `<div class="words"><div class="ar"><bdi>🗣 ${LAWW[e.id][0]}</bdi></div><div class="en">🗣 <b>In words:</b> ${LAWW[e.id][1]}</div></div>` : ''}
      <div class="grid g2">
        <div class="card"><h3>🎯 Objective</h3><p>${e.objective}</p><h3>🧪 Apparatus (virtual)</h3><ul>${e.apparatus.map(a => `<li>${a}</li>`).join('')}</ul></div>
        <div class="card"><h3>📋 Procedure</h3><ol>${e.procedure.map(a => `<li>${a}</li>`).join('')}</ol></div>
      </div>
      <div class="card"><div class="row" style="justify-content:space-between"><h3 style="margin:0">🔬 Simulation</h3><label class="muted"><input type="checkbox" id="noise" ${NOISE ? 'checked' : ''}> realistic measurement errors</label></div>
        <canvas id="sim" width="640" height="260" style="width:100%;max-width:640px;display:block;margin:8px auto"></canvas>
        <div class="controls">${e.controls.map(k => k.options ? `<label>${k.label}<select data-k="${k.id}">${k.options.map(o => `<option value="${o[1]}" ${o[1] == s[k.id] ? 'selected' : ''}>${o[0]}</option>`).join('')}</select></label>` : `<label>${k.label} <b><span data-v="${k.id}">${s[k.id]}</span> ${k.unit}</b><input type="range" data-k="${k.id}" min="${k.min}" max="${k.max}" step="${k.step}" value="${s[k.id]}"></label>`).join('')}</div>
        <div class="row" style="margin-top:10px"><button class="btn" id="rec">● Record measurement</button><button class="btn ghost" id="auto">Auto‑sweep 7 readings</button><button class="btn ghost" id="undo">Undo last</button><button class="btn ghost" id="clr">Clear table</button>${e.reveal ? '<button class="btn ghost" id="rev">Reveal true value</button>' : ''}<button class="btn ghost" id="csv">Export CSV</button></div><div id="revbox" class="muted"></div></div>
      <div class="grid g2">
        <div class="card"><h3>📊 Data table</h3><div style="overflow:auto;max-height:320px"><table id="tbl"></table></div></div>
        <div class="card"><h3>📈 Graph & analysis</h3><canvas id="plot" width="520" height="300" style="width:100%"></canvas><div id="res" class="result"></div></div>
      </div>
      <div class="grid g2">
        <div class="card"><h3>⚠️ Sources of error & uncertainty</h3><ul>${e.errors.map(a => `<li>${a}</li>`).join('')}</ul><h3>✋ Skills that need the real apparatus</h3><ul>${e.skills.map(a => `<li>${a}</li>`).join('')}</ul><p class="muted" style="font-size:13px">A simulation cannot train these hands‑on skills: practise them in your real lab sessions.</p></div>
        <div class="card"><h3>💬 Discussion questions</h3>${e.discussion.map((d, i) => `<div class="dq"><b>${i + 1}. ${d[0]}</b><textarea data-n="${i}" placeholder="Write your answer first…">${esc((notes[e.id] || {})[i] || '')}</textarea><button class="btn small ghost" data-show="${i}">Show model answer</button><div class="model" id="m${i}" hidden>${d[1]}</div></div>`).join('')}</div>
      </div>
      <div class="row noprint"><button class="btn" onclick="window.print()">🖨 Print lab report</button><span class="muted">Prints the procedure, your data, graph, result and answers.</span></div>`;
    document.querySelectorAll('[data-k]').forEach(inp => inp.oninput = () => { const v = parseFloat(inp.value); s[inp.dataset.k] = v; const sp = document.querySelector(`[data-v="${inp.dataset.k}"]`); if (sp) sp.textContent = v; if (inp.tagName === 'SELECT') analyse(); });
    $('#noise').onchange = ev => { NOISE = ev.target.checked; };
    $('#rec').onclick = () => { const row = e.measure(s); data[e.id].push(row); persist(); analyse(); };
    $('#auto').onclick = () => { const k = e.controls.find(c => !c.options && ['h', 'm', 'mh', 'R', 'T', 'V', 'd', 'th', 'r', 'len', 'mw', 'f1'].includes(c.id)); if (!k) return; const sweepId = e.id === 'ohm' && s.mode === 3 ? 'len' : k.id; const kk = e.controls.find(c => c.id === sweepId); const old = s[sweepId]; for (let i = 0; i < 7; i++) { s[sweepId] = +(kk.min + (kk.max - kk.min) * (i + 1) / 8).toFixed(4); if (e.id === 'snell' && s.dir) s[sweepId] = +(5 + i * (Math.min(80, deg(Math.asin(1 / s.n)) + 8) - 5) / 6).toFixed(1); data[e.id].push(e.measure(s)); } s[sweepId] = old; persist(); analyse(); };
    $('#undo').onclick = () => { data[e.id].pop(); persist(); analyse(); };
    $('#clr').onclick = () => { if (confirm('Clear all readings for this experiment?')) { data[e.id] = []; persist(); analyse(); } };
    if ($('#rev')) $('#rev').onclick = () => { $('#revbox').textContent = e.reveal(s); };
    $('#csv').onclick = () => { const rows = [e.cols.join(',')].concat(data[e.id].map(r => r.join(','))); const b = new Blob([rows.join('\n')], { type: 'text/csv' }); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = e.id + '-data.csv'; a.click(); };
    document.querySelectorAll('[data-show]').forEach(b => b.onclick = () => { $('#m' + b.dataset.show).hidden = false; });
    document.querySelectorAll('textarea[data-n]').forEach(t => t.oninput = () => { notes[e.id] = notes[e.id] || {}; notes[e.id][t.dataset.n] = t.value; persist(); });
    analyse();
  }
  function analyse() {
    const e = cur, s = state[e.id];
    const rows = data[e.id].filter(r => !e.filter || e.filter(r, s));
    $('#tbl').innerHTML = `<tr>${e.cols.map(c => `<th>${c}</th>`).join('')}</tr>` + data[e.id].map(r => `<tr>${r.map(v => `<td>${typeof v === 'number' ? fmt(v, 4) : esc(v)}</td>`).join('')}</tr>`).join('');
    const pts = rows.map(r => e.xy(r, s)).filter(p => p && isFinite(p[0]) && isFinite(p[1]));
    const f = pts.length >= 2 ? fit(pts, e.origin) : null;
    plot($('#plot'), pts, f, e.xlf ? e.xlf(s) : e.xl, e.ylf ? e.ylf(s) : e.yl);
    $('#res').innerHTML = f ? `<p>Best‑fit line${e.origin ? ' through the origin' : ''}: slope = ${fmt(f.m)} ± ${fmt(f.se, 2)}${e.origin ? '' : `, intercept = ${fmt(f.b)}`}, R² = ${fmt(f.r2, 4)}</p><p>${e.result(f, s, rows)}</p>` : `<p class="muted">Record at least 2 readings${e.filter ? ' with the current setting' : ''} to fit a line.</p>`;
  }

  let t0 = performance.now();
  function loop(now) { const cv = $('#sim'); if (cv && cur.draw) cur.draw(cv, state[cur.id], now - t0); requestAnimationFrame(loop); }
  function route() { const id = location.hash.slice(1); cur = EX.find(e => e.id === id) || EX[0]; renderList(); render(); window.scrollTo(0, 0); }
  window.addEventListener('hashchange', route);
  document.addEventListener('DOMContentLoaded', () => {
    $('#theme').onclick = () => { const r = document.documentElement; r.dataset.theme = r.dataset.theme === 'dark' ? 'light' : 'dark'; analyse(); };
    route(); requestAnimationFrame(loop);
  });
  window.__LAB = { EX, fit, state, data };
})();
