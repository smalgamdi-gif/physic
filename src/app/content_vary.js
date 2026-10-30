/* Physics Learning Lab — "New numbers" for the worked examples (🧩 additional design).
   Each generator keeps the method and the steps of the course's worked example (same lesson id)
   and only changes the data. Every result is computed here, never copied from the course.
   A step's checked value is the number after its last "=" (see stepBlank in app.js). */
window.VARY = (function () {
  const R = (a, b, d = 0) => { const p = 10 ** d; return Math.round((a + Math.random() * (b - a)) * p) / p; };
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const sup = e => String(e).split('').map(c => SUP[c]).join('');
  const minus = s => s.replace(/^-/, '−');
  // number as shown in a step: plain up to 99 999, otherwise m×10ⁿ
  function n(x, s = 3) {
    if (x === 0) return '0';
    const a = Math.abs(x);
    if (a >= 1e5 || a < 1e-3) { const [m, e] = x.toExponential(s - 1).split('e'); return minus(String(+m)) + '×10' + sup(+e); }
    if (Number.isInteger(x)) return minus(String(x));
    return minus(String(+x.toPrecision(s)));
  }
  const v = (x, s) => parseFloat(n(x, s).replace('−', '-').replace(/×10(.*)/, (m, p) => 'e' + p.split('').map(c => Object.keys(SUP).find(k => SUP[k] === c)).join('')));
  const rad = d => d * Math.PI / 180, deg = r => r * 180 / Math.PI;
  const co = x => x === 1 ? '' : x;
  const signed = x => x < 0 ? '− ' + Math.abs(x) : '+ ' + x;

  return {
    'ch1-l1'() {
      const [p, e] = pick([['μm', -6], ['nm', -9], ['mm', -3], ['km', 3], ['cm', -2]]), x = R(2, 95);
      return { q: `Convert ${x} ${p} to metres.`, steps: [`Write the conversion equation: 1 ${p} = 10${sup(e)} m`, `Multiply: ${x} ${p} = ${x} × 10${sup(e)} m`], ans: `${x} × 10${sup(e)} m` };
    },
    'ch1-l2'() {
      const d = R(0.7, 19.3, 1);
      return { q: `A liquid's density is ${d} g/cm³. Express it in SI.`, steps: [`ρ = ${d} g/cm³`, 'Replace g → 10⁻³ kg and cm³ → (10⁻²)³ m³', `ρ = {{${d} × 10⁻³ // 10⁻⁶}} = ${n(d * 1000, 4)} kg/m³`], ans: `${n(d * 1000, 4)} kg/m³` };
    },
    'ch2-l1'() {
      const d = R(10, 900);
      return { q: `A man walks ${d} m east to the mosque and returns. Distance and net displacement?`, steps: [`Distance = ${d} + ${d} = ${2 * d} m (scalar)`, `Displacement = +${d} m + (−${d} m) = 0`], ans: `d = ${2 * d} m, Δx = 0` };
    },
    'ch2-l2'() {
      for (;;) {
        const A = R(3, 12), B = R(3, 12), th = pick([100, 110, 120, 130, 135, 140, 150]), t = 180 - th;
        const S = v(A * A + B * B - 2 * A * B * Math.cos(rad(t)), 3), C = v(Math.sqrt(S), 3);
        if (B * B >= A * A + C * C || B / C * Math.sin(rad(t)) > 0.97) continue; // keep β acute so sin⁻¹ gives the right angle
        const be = v(deg(Math.asin(B / C * Math.sin(rad(t)))), 3);
        return { q: `A = ${A}, B = ${B} with ${th}° between them (tail to tail). Find C.`, steps: [`Triangle angle = 180° − ${th}° = ${t}°`, `C = √(${A}² + ${B}² − 2·${A}·${B}·cos ${t}°) = √${n(S)} = ${n(C)}`, `sin β = {{${B} // ${n(C)}}} sin ${t}° → β = ${n(be)}°`], ans: `C = ${n(C)}, β = ${n(be)}°` };
      }
    },
    'ch2-l3'() {
      const A = R(2, 12), t = pick([20, 25, 30, 35, 40, 45, 50, 55, 65, 70]), ax = v(A * Math.cos(rad(t)), 3), ay = v(A * Math.sin(rad(t)), 3);
      return { q: `A = ${A} cm at ${t}° with +x. Find components.`, steps: [`Aₓ = ${A} cos ${t}° = ${n(ax)} î`, `A_y = ${A} sin ${t}° = ${n(ay)} ĵ`], ans: `A = ${n(ax)}î + ${n(ay)}ĵ cm` };
    },
    'ch2-l4'() {
      for (;;) {
        const r = () => pick([-3, -2, -1, 1, 2, 3, 4, 5, 6]), a = [r(), r(), r()], b = [r(), r(), r()];
        const p = a.map((x, i) => x * b[i]), dot = p[0] + p[1] + p[2], sa = a.reduce((s, x) => s + x * x, 0), sb = b.reduce((s, x) => s + x * x, 0);
        const ma = v(Math.sqrt(sa), 3), mb = v(Math.sqrt(sb), 3), c = v(dot / (ma * mb), 3);
        if (Math.abs(c) < 0.1 || Math.abs(c) > 0.95) continue;
        const th = v(deg(Math.acos(c)), 3), vec = x => `${x[0]}î ${signed(x[1])}ĵ ${signed(x[2])}k̂`;
        return { q: `Angle between A = ${vec(a)} and B = ${vec(b)}.`, steps: [`A·B = ${p[0]} ${signed(p[1])} ${signed(p[2])} = ${dot}`, `A = √${sa} = ${n(ma)}, B = √${sb} = ${n(mb)}`, `cos θ = {{${dot} // ${n(ma)} × ${n(mb)}}} = ${n(c)}`, `θ = cos⁻¹(${n(c)}) = ${n(th)}°`], ans: `θ ≈ ${n(th)}°` };
      }
    },
    'ch3-l1'() {
      const A = R(6, 18) * 50, B = R(1, A / 50 - 2) * 50, C = R(B / 10 + 1, A / 10 - 1) * 10;
      return { q: `Runner O → A (${A} m) → B (${B} m) → C (${C} m), positions on a line. Distance and displacement?`, steps: [`Distance = OA + AB + BC = ${A} + ${A - B} + ${C - B} = ${2 * A - 2 * B + C} m`, `Displacement = x_C − x_O = ${C} − 0 = ${C} m`], ans: `d = ${2 * A - 2 * B + C} m, Δx = ${C} m` };
    },
    'ch3-l2'() {
      const a = R(2, 8), b = R(1, 5), c = R(0, 5), t = R(2, 5), X = a * t * t - b * t + c, D = X - c;
      return { q: `x(t) = ${a}t² − ${co(b)}t + ${c}. Find v at t = ${t} s and v_av between 0 and ${t} s.`, steps: [`x(0) = ${c} m, x(${t}) = ${X} m → Δx = ${D} m`, `v = {{dx // dt}} = ${2 * a}t − ${b} → v(${t}) = ${2 * a * t - b} m/s`, `v_av = {{${D} // ${t}}} = ${n(D / t)} m/s`], ans: `v(${t}) = ${2 * a * t - b} m/s, v_av = ${n(D / t)} m/s` };
    },
    'ch3-l3'() {
      const p = R(1, 4), q = R(1, 5), r = R(1, 6), t = R(2, 5);
      return { q: `x(t) = ${co(p)}t³ − ${co(q)}t² + ${co(r)}t. Find a at t = ${t} s.`, steps: [`v = ${3 * p}t² − ${2 * q}t + ${r}`, `a = ${6 * p}t − ${2 * q}`, `a(${t}) = ${6 * p * t} − ${2 * q} = ${6 * p * t - 2 * q} m/s²`], ans: `${6 * p * t - 2 * q} m/s²` };
    },
    'ch3-l4'() {
      const a = R(1, 5, 1), d = R(20, 150), t2 = v(2 * d / a, 4), V2 = v(2 * a * d, 4);
      return { q: `Car from rest, a = ${a} m/s². (a) time to travel ${d} m (b) velocity then.`, steps: [`${d} = ½(${a})t² → t² = ${n(t2, 4)} → t = ${n(Math.sqrt(t2))} s`, `v_f² = 0 + 2(${a})(${d}) = ${n(V2, 4)} → v = ${n(Math.sqrt(V2))} m/s`], ans: `t = ${n(Math.sqrt(t2))} s, v = ${n(Math.sqrt(V2))} m/s` };
    },
    'ch4-l1'() {
      const F1 = R(5, 40), ph = pick([30, 40, 45, 50, 60]), th = pick([20, 30, 40, 45, 60]);
      const F3 = v(F1 * Math.cos(rad(ph)) / Math.cos(rad(th)), 3), F2 = v(F1 * Math.sin(rad(ph)) + F3 * Math.sin(rad(th)), 3);
      return { q: `Static body: F₁ = ${F1} N at φ = ${ph}° (up‑left), F₃ at θ = ${th}° (up‑right), F₂ down. Find F₃ and F₂.`, steps: [`ΣFₓ: F₃ cos ${th}° − ${F1} cos ${ph}° = 0 → F₃ = ${n(F3)} N`, `ΣF_y: ${F1} sin ${ph}° + ${n(F3)} sin ${th}° − F₂ = 0 → F₂ = ${n(F2)} N`], ans: `F₃ = ${n(F3)} N, F₂ = ${n(F2)} N` };
    },
    'ch4-l2'() {
      const F = R(5, 60), t = pick([20, 25, 30, 35, 40, 45, 50, 60]), m = R(2, 12), fx = v(F * Math.cos(rad(t)), 3), fy = v(F * Math.sin(rad(t)), 3);
      return { q: `F = ${F} N at ${t}° acts on m = ${m} kg. Find aₓ, a_y and a.`, steps: [`Fₓ = ${F} cos ${t}° = ${n(fx)} N, F_y = ${F} sin ${t}° = ${n(fy)} N`, `aₓ = {{${n(fx)} // ${m}}} = ${n(fx / m)} m/s², a_y = {{${n(fy)} // ${m}}} = ${n(fy / m)} m/s²`, `a = {{${F} // ${m}}} = ${n(F / m)} m/s² at ${t}° (same direction as F)`], ans: `a = ${n(F / m)} m/s² at ${t}°` };
    },
    'ch4-l3'() {
      const W = R(5, 100) * 10;
      return { q: `An object of weight ${W} N rests on a table. Reaction force n?`, steps: ['Object at rest: ΣF_y = 0', `n − W = 0 → n = W = ${W} N`], ans: `n = ${W} N` };
    },
    'ch5-l1'() {
      const F = R(5, 40) * 10, t = pick([30, 37, 45, 53, 60]), d = R(1, 10);
      return { q: `Two ${F} N forces act; F₁ at ${t}° to the motion, F₂ perpendicular; Δr = ${d} m. Total work?`, steps: ['F₂ ⟂ motion → W₂ = 0', `W₁ = ${F} × ${d} × cos ${t}° = ${n(F * d * Math.cos(rad(t)))} J`], ans: `W = ${n(F * d * Math.cos(rad(t)))} J` };
    },
    'ch5-l2'() {
      const m = R(8, 25) * 100, u = R(10, 35), d = R(20, 80), W = -0.5 * m * u * u;
      return { q: `${m} kg car at ${u} m/s stops in ${d} m. Work by brakes?`, steps: ['KE_f = 0', `W = 0 − ½·${m}·${u}² = ${n(W)} J`], ans: `W = ${n(W)} J` };
    },
    'ch5-l3'() {
      for (;;) {
        const fx = R(5, 30), fy = R(10, 40), m = R(1, 5), x1 = R(1, 4), y1 = R(1, 3), dx = R(1, 4), dy = R(1, 3);
        const W = fx * dx + fy * dy, PE = v(m * 9.8 * dy, 3);
        if (W - PE < 2) continue;
        const vf = Math.sqrt(2 * (W - PE) / m);
        return { q: `F = ${fx}î + ${fy}ĵ N moves a ${m} kg particle (from rest) from ${x1}î + ${y1}ĵ to ${x1 + dx}î + ${y1 + dy}ĵ m (y vertical). Find W, ΔPE, v_f.`, steps: [`Δr = ${dx}î + ${dy}ĵ → W = ${fx * dx} + ${fy * dy} = ${W} J`, `ΔPE = ${m}·9.8·(${y1 + dy} − ${y1}) = ${n(PE)} J`, `${W} = ½·${m}·v_f² + ${n(PE)} → v_f = ${n(vf)} m/s`], ans: `v_f = ${n(vf)} m/s` };
      }
    },
    'ch5-l4'() {
      const m = R(1, 20), h = R(1, 10), t = R(2, 20), W = v(m * 9.8 * h, 4);
      return { q: `${m} kg raised ${h} m in ${t} s. Work and power?`, steps: [`W = mgh = ${m}·9.8·${h} = ${n(W, 4)} J`, `P = {{${n(W, 4)} // ${t}}} = ${n(W / t, 4)} W`], ans: `P = ${n(W / t, 4)} W` };
    },
    'ch6-l1'() {
      const F = R(10, 60) * 100, L = R(2, 12), dmm = pick([1, 1.5, 2, 2.5, 3, 3.5, 4]), dL = R(0.2, 1.2, 1);
      const A = v(Math.PI * (dmm / 2 * 1e-3) ** 2, 3), st = v(F / A, 3), sn = v(dL / 100 / L, 3);
      return { q: `${F} N on a ${L} m wire of diameter ${dmm} mm, extension ${dL} cm. Stress, strain, Y?`, steps: [`A = π(${n(dmm / 2 * 1e-3)})² = ${n(A)} m²`, `Stress = {{F // A}} = {{${F} // ${n(A)}}} = ${n(st)} N/m²`, `Strain = {{ΔL // L}} = {{${n(dL / 100)} // ${L}}} = ${n(sn)}`, `Y = {{stress // strain}} = {{${n(st)} // ${n(sn)}}} = ${n(st / sn)} N/m²`], ans: `Y = ${n(st / sn)} N/m²` };
    },
    'ch6-l2'() {
      const h = R(10, 120), A = R(1, 4, 1), P = v(1e5 + 1025 * 9.8 * h, 4);
      return { q: `Submarine at ${h} m, hatch area ${A} m², ρ = 1025 kg/m³. Force on hatch?`, steps: [`P = P₀ + ρgh = 10⁵ + 1025·9.8·${h} = ${n(P, 4)} Pa`, `F = PA = ${n(P * A, 4)} N`], ans: `F = ${n(P * A)} N` };
    },
    'ch6-l3'() {
      const a = R(1, 5), b = R(10, 30), F = R(10, 60) * 100, k = (b / a) ** 2;
      return { q: `Piston radii ${a} cm and ${b} cm. Large piston force ${F} N. Small piston force?`, steps: [`f = {{F a // A}} = {{${F} × π × ${n(a / 100)}² // π × ${n(b / 100)}²}}`, `f = {{${F} // ${n(k, 4)}}} = ${n(F / k)} N`], ans: `f = ${n(F / k)} N` };
    },
    'ch6-l4'() {
      const P1 = R(1000, 3000, 1), v1 = R(0.2, 1, 1), v2 = R(v1 + 0.2, 2, 1), D = v(0.5 * 1000 * (v2 * v2 - v1 * v1), 4);
      return { q: `Horizontal tube: P₁ = ${P1} Pa at v₁ = ${v1} m/s. P₂ where v₂ = ${v2} m/s?`, steps: ['P₂ = P₁ − ½ρ(v₂² − v₁²)', `= ${P1} − ½·10³·(${n(v2 * v2)} − ${n(v1 * v1)}) = ${P1} − ${n(D, 4)}`, `P₂ = ${n(P1 - D, 5)} Pa`], ans: `${n(P1 - D, 5)} N/m²` };
    },
    'ch7-l1'() {
      const F = R(-40, 212), C = v((F - 32) * 5 / 9, 3);
      return { q: `Temperature ${minus(String(F))} °F in °C and K?`, steps: [`T_C = {{5 // 9}} (${minus(String(F))} − 32) = ${n(C)} °C`, `T_K = ${n(C)} + 273 = ${n(C + 273, 4)} K`], ans: `${n(C)} °C, ${n(C + 273, 4)} K` };
    },
    'ch7-l2'() {
      const L = R(1, 20), T = R(10, 80) * 10, a = pick([1.2, 1.7, 1.8, 2.4]), dl = v(a * 1e-5 * L * T, 3);
      return { q: `Metal bar ${L} m at 0 °C heated to ${T} °C, α = ${a}×10⁻⁵ °C⁻¹. Expansion?`, steps: [`Δℓ = ${a}×10⁻⁵ × ${L} × ${T} = ${n(dl)} m`, `ℓ₂ = ${L} + ${n(dl)} = ${n(L + dl, 5)} m`, `β = 3α = ${n(3 * a * 1e-5)} °C⁻¹`], ans: `Δℓ = ${n(dl)} m` };
    },
    'ch7-l3'() {
      const m1 = R(50, 150), T1 = R(150, 400), m2 = R(100, 300), T2 = R(10, 25), C = R(30, 60);
      const a = v(m1 * 0.092, 4), lhs = v(a * T1, 5), k = m2 + C, rhs = k * T2, T = (lhs + rhs) / (a + k);
      return { q: `${m1} g copper (c = 0.092) at ${T1} °C into ${m2} g water at ${T2} °C in glass (C = ${C} cal/K). Final T?`, steps: [`Heat lost = ${m1}·0.092·(${T1} − T)`, `Heat gained = ${m2}·1·(T − ${T2}) + ${C}(T − ${T2})`, `${n(lhs, 5)} − ${n(a, 4)}T = ${k}T − ${rhs} → ${n(lhs + rhs, 5)} = ${n(a + k, 5)}T`, `T = ${n(T)} °C`], ans: `T = ${n(T)} °C` };
    },
    'ch7-l4'() {
      const L = R(2, 20) * 10, A = R(1, 6), dT = R(5, 20) * 10, t = R(2, 30), H = v(0.2 * A * dT / L, 3), Q = v(H * t * 60, 3);
      return { q: `Copper bar ${L} cm, A = ${A} cm², ends at ${dT} °C and 0 °C, k = 0.2 cal/s·cm·°C. Heat in ${t} min?`, steps: [`H = {{0.2 × ${A} × ${dT} // ${L}}} = ${n(H)} cal/s`, `Q = ${n(H)} × ${t * 60} = ${n(Q)} cal`], ans: `${n(Q)} cal ≈ ${n(Q * 4.186)} J` };
    },
    'ch8-l1'() {
      const Z = R(2, 20), r = R(0.5, 5, 1), F = v(9e9 * Z * 1.6e-19 * 1.6e-19 / (r * 1e-11) ** 2, 3);
      return { q: `Force between a nucleus with Z = ${Z} protons and an electron ${r}×10⁻¹¹ m away?`, steps: [`q₁ = ${Z}×1.6×10⁻¹⁹ C, q₂ = 1.6×10⁻¹⁹ C`, `F = {{9×10⁹ × (${n(Z * 1.6e-19)})(1.6×10⁻¹⁹) // (${r}×10⁻¹¹)²}}`, `F = ${n(F)} N (attractive)`], ans: `${n(F)} N` };
    },
    'ch8-l2'() {
      const q = R(1, 50), r = R(1, 10), E = v(9e9 * q * 1e-6 / (r * r), 3);
      return { q: `Field ${r} m from +${q} μC?`, steps: [`E = {{9×10⁹ × ${q}×10⁻⁶ // ${r}²}}`, `E = ${n(E)} N/C, away from the charge`], ans: `${n(E)} N/C` };
    },
    'ch8-l3'() {
      for (;;) {
      const q1 = -R(1, 9), q2 = R(1, 9), a = R(2, 9), b = R(2, 9);
      const V1 = v(9e9 * q1 * 1e-6 / (a / 100), 3), r2 = v(Math.hypot(a, b) / 100, 3), V2 = v(9e9 * q2 * 1e-6 / r2, 3);
      if (Math.abs(V1 + V2) < 0.2 * Math.max(-V1, V2)) continue; // avoid near-cancelling sums
      return { q: `q₁ = ${minus(String(q1))} μC at origin, q₂ = +${q2} μC at ${b} cm on y. V at P (${a} cm on x)?`, steps: [`V₁ = {{9×10⁹ × (${minus(String(q1))}×10⁻⁶) // ${n(a / 100)}}} = ${n(V1)} V`, `r₂ = √(${n(a / 100)}² + ${n(b / 100)}²) = ${n(r2)} m → V₂ = {{9×10⁹ × ${q2}×10⁻⁶ // ${n(r2)}}} = ${n(V2)} V`, `V = ${n(V1 + V2)} V`], ans: `${n(V1 + V2)} V` };
      }
    },
    'ch8-l4'() {
      const c = R(1, 12), c3 = R(2, 24), V = R(2, 20) * 5, c12 = 2 * c, ct = v(c12 * c3 / (c12 + c3), 3), Qt = v(ct * 1e-6 * V, 3), V3 = v(Qt / (c3 * 1e-6), 3), V12 = v(V - V3, 3);
      return { q: `C₁ = C₂ = ${c} μF in parallel, then in series with C₃ = ${c3} μF, V = ${V} V. C_t, Q_t, charges?`, steps: [`C₁₂ = ${c} + ${c} = ${c12} μF`, `{{1 // C_t}} = {{1 // ${c12}}} + {{1 // ${c3}}} → C_t = ${n(ct)} μF`, `Q_t = ${n(ct)}×10⁻⁶·${V} = ${n(Qt)} C = Q₃`, `V₃ = {{Q₃ // C₃}} = ${n(V3)} V`, `V₁₂ = ${V} − ${n(V3)} = ${n(V12)} V → Q₁ = Q₂ = ${n(c * 1e-6 * V12)} C`], ans: `C_t = ${n(ct)} μF, Q_t = ${n(Qt)} C` };
    },
    'ch9-l1'() {
      const A = R(1, 9), I = R(1, 30), J = v(I / (A * 1e-6), 3);
      return { q: `Copper wire A = ${A}×10⁻⁶ m², I = ${I} A, n = 8×10²⁸ m⁻³. J and v?`, steps: [`J = {{I // A}} = {{${I} // ${A}×10⁻⁶}} = ${n(J)} A/m²`, `v = {{J // ne}} = {{${n(J)} // 8×10²⁸ × 1.6×10⁻¹⁹}}`, `v = ${n(J / (8e28 * 1.6e-19))} m/s`], ans: `v = ${n(J / (8e28 * 1.6e-19))} m/s` };
    },
    'ch9-l2'() {
      const L = R(0.5, 3, 1), r = R(0.1, 0.5, 2), V = R(5, 30), Rw = v(1e-6 * L / (Math.PI * (r * 1e-3) ** 2), 3);
      return { q: `Nichrome wire ${L} m, radius ${r} mm, ρ = 10⁻⁶ Ω·m, ${V} V. R and I?`, steps: [`R = {{10⁻⁶ × ${L} // π × (${n(r * 1e-3)})²}} = ${n(Rw)} Ω`, `I = {{${V} // ${n(Rw)}}} = ${n(V / Rw)} A`], ans: `${n(Rw)} Ω, ${n(V / Rw)} A` };
    },
    'ch9-l3'() {
      const Rh = R(5, 60), V = pick([110, 120, 220, 230, 240]);
      return { q: `${Rh} Ω heater on ${V} V. I and P?`, steps: [`I = {{V // R}} = {{${V} // ${Rh}}} = ${n(V / Rh)} A`, `P = {{V² // R}} = {{${V}² // ${Rh}}} = ${n(V * V / Rh, 4)} W`], ans: `${n(V / Rh)} A, ${n(V * V / Rh, 4)} W` };
    },
    'ch9-l4'() {
      const R1 = R(2, 20), R2 = R(1, 10), R3 = R(1, 10), R4 = R(2, 20), V = R(3, 24), R23 = R2 + R3, Rp = v(R23 * R4 / (R23 + R4), 3), Rac = v(R1 + Rp, 3), I = v(V / Rac, 3), I23 = v(I * R4 / (R23 + R4), 3);
      return { q: `R₁ = ${R1} Ω in series with [ (R₂ = ${R2} + R₃ = ${R3}) ∥ R₄ = ${R4} ], ${V} V between a and c.`, steps: [`R₂₃ = ${R2} + ${R3} = ${R23} Ω`, `{{1 // R₂₃₄}} = {{1 // ${R23}}} + {{1 // ${R4}}} → R₂₃₄ = ${n(Rp)} Ω`, `R_ac = ${R1} + ${n(Rp)} = ${n(Rac)} Ω → I = {{${V} // ${n(Rac)}}} = ${n(I)} A`, `I₂₃ = ${n(I)} × {{${R4} // ${R23} + ${R4}}} = ${n(I23)} A, I₄ = ${n(I)} − ${n(I23)} = ${n(I - I23)} A`], ans: `${n(Rac)} Ω, ${n(I)} A` };
    },
    'ch10-l2'() {
      const lam = R(400, 700), nn = R(1.3, 1.9, 2), t = R(15, 70), t2 = v(deg(Math.asin(Math.sin(rad(t)) / nn)), 3);
      return { q: `${lam} nm, air → glass (n = ${nn}) at ${t}°. θ₂, v, λₙ?`, steps: [`θ₂ = sin⁻¹( {{sin ${t}° // ${nn}}} ) = ${n(t2)}°`, `v = {{c // n}} = {{3×10⁸ // ${nn}}} = ${n(3e8 / nn)} m/s`, `λₙ = {{λ // n}} = {{${lam} // ${nn}}} = ${n(lam / nn)} nm`], ans: `${n(t2)}°, ${n(3e8 / nn)} m/s, ${n(lam / nn)} nm` };
    },
    'ch10-l3'() {
      const nn = R(1.3, 2.42, 2), s = v(1 / nn, 3);
      return { q: `Glass (n = ${nn}) → air. θ_c?`, steps: [`sin θ_c = {{1 // ${nn}}} = ${n(s)}`, `θ_c = ${n(deg(Math.asin(s)))}°`], ans: `${n(deg(Math.asin(s)))}°` };
    }
  };
})();
