/* Unit 0: the maths and reading skills the course assumes (gap G‑03: "content assumes algebra, trigonometry, basic derivatives").
   All of this is additional design (🧩). Each skill: Arabic‑first explanation, one worked example, a generator of fresh
   questions (same item format as the lessons: {q, o, a, why} or {q, num, tol, unit, sol}), and the lessons that use it. */
(function () {
  const R = (a, b, d = 0) => +(a + Math.random() * (b - a)).toFixed(d);
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const sig = (x, n = 3) => +x.toPrecision(n);
  const sup = n => String(n).replace(/-/g, '⁻').replace(/\d/g, d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]);
  const sci = x => { if (x === 0) return '0'; const e = Math.floor(Math.log10(Math.abs(x))); const m = sig(x / 10 ** e); return `${m} × 10${sup(e)}`; };
  const deg = r => r * 180 / Math.PI, rad = d => d * Math.PI / 180;
  // multiple choice from a right answer and distractors (duplicates removed)
  const mcq = (q, right, wrong, why) => { const o = shuffle([right, ...[...new Set(wrong.filter(w => w !== right))].slice(0, 3)]); return { q, o, a: o.indexOf(right), why }; };

  window.FOUND = [
    {
      id: 'f1', title: 'Powers of ten & scientific notation', ar: 'القوى العشرية والصيغة العلمية',
      uses: [['ch1-l1', 'prefixes such as μ = 10⁻⁶'], ['ch8-l1', 'charges like e = 1.6 × 10⁻¹⁹ C'], ['ch9-l1', 'tiny drift speeds and huge n']],
      explain: [
        ['الصيغة العلمية تكتب الرقم على شكل a × 10ⁿ حيث a بين 1 و 10. مثال: 4500 = 4.5 × 10³ ، و 0.00032 = 3.2 × 10⁻⁴.', 'Scientific notation writes a number as a × 10ⁿ with 1 ≤ a < 10: 4500 = 4.5 × 10³, 0.00032 = 3.2 × 10⁻⁴.'],
        ['الأس الموجب يعني رقمًا كبيرًا (الفاصلة تتحرك يمينًا)، والأس السالب يعني رقمًا صغيرًا أقل من 1 (الفاصلة تتحرك يسارًا). عدد الخانات التي تحركت بها الفاصلة هو الأس.', 'A positive power means a big number, a negative power a number below 1. The number of places the decimal point moves is the power.'],
        ['عند الضرب: اضرب الأرقام واجمع الأسس. عند القسمة: اقسم الأرقام واطرح الأسس. مثال: (2 × 10³)(3 × 10⁴) = 6 × 10⁷.', 'Multiplying: multiply the numbers, add the powers. Dividing: divide the numbers, subtract the powers.'],
        ['في الآلة الحاسبة: اكتب 1.6 ثم زر EXP (أو ×10ˣ) ثم −19. لا تكتب × 10 ^ يدويًا لأنها تسبب أخطاء في الأقواس.', 'On the calculator type 1.6, then EXP (or ×10ˣ), then −19. Do not type × 10 ^ by hand.']
      ],
      example: { q: 'Write 0.000052 in scientific notation.', steps: ['Move the decimal point to get a number between 1 and 10: 5.2', 'It moved 5 places to the right, so the power is −5', '0.000052 = 5.2 × 10⁻⁵'], ans: '5.2 × 10⁻⁵' },
      gen: () => pick([
        () => { const m = R(1.1, 9.9, 1), e = pick([-9, -7, -6, -5, -4, -3, 3, 4, 5, 6, 8]); const x = m * 10 ** e; const s = e < 0 ? x.toFixed(-e + 1) : String(Math.round(x)); return { q: `Write ${s} as ${m} × 10ⁿ. What is n?`, num: e, tol: 0, unit: '', sol: `The decimal point moves ${Math.abs(e)} places ${e < 0 ? 'right, so n is negative' : 'left, so n is positive'}: n = ${e}.` }; },
        () => { const a = R(1.5, 4.5, 1), b = R(1.5, 4.5, 1), m = R(-9, 9), n = R(-9, 9); const x = a * b * 10 ** (m + n); return { q: `(${a} × 10${sup(m)}) × (${b} × 10${sup(n)}) = ?`, num: x, tol: 0.01, unit: '', sol: `Multiply ${a} × ${b} = ${sig(a * b)}, add the powers ${m} + (${n}) = ${m + n}: ${sci(x)}` }; },
        () => { const a = R(4, 9.8, 1), b = R(1.2, 3.9, 1), m = R(-8, 8), n = R(-8, 8); const x = a / b * 10 ** (m - n); return { q: `{{${a} × 10${sup(m)} // ${b} × 10${sup(n)}}} = ?`, num: x, tol: 0.01, unit: '', sol: `Divide ${a} ÷ ${b} = ${sig(a / b)}, subtract the powers ${m} − (${n}) = ${m - n}: ${sci(x)}` }; }
      ])()
    },
    {
      id: 'f2', title: 'Exponent rules & converting squared units', ar: 'قوانين الأسس وتحويل الوحدات المربعة والمكعبة',
      uses: [['ch1-l2', '1 cm³ = (10⁻²)³ m³ = 10⁻⁶ m³'], ['ch6-l1', 'wire areas in mm²'], ['ch9-l1', 'cm² → m² (the slides get this wrong, G‑12)']],
      explain: [
        ['قوانين الأسس الأربعة: 10ᵐ × 10ⁿ = 10ᵐ⁺ⁿ ، و 10ᵐ ÷ 10ⁿ = 10ᵐ⁻ⁿ ، و (10ᵐ)ⁿ = 10ᵐˣⁿ ، و 10⁻ⁿ = 1 ÷ 10ⁿ.', 'The four rules: 10ᵐ × 10ⁿ = 10ᵐ⁺ⁿ, 10ᵐ ÷ 10ⁿ = 10ᵐ⁻ⁿ, (10ᵐ)ⁿ = 10ᵐⁿ, 10⁻ⁿ = 1/10ⁿ.'],
        ['الوحدة المربعة يُربَّع معامل تحويلها: 1 cm = 10⁻² m إذن 1 cm² = (10⁻²)² m² = 10⁻⁴ m². والمكعبة يُكعَّب: 1 cm³ = 10⁻⁶ m³.', 'A squared unit squares its factor: 1 cm² = (10⁻²)² m² = 10⁻⁴ m². A cubed unit cubes it: 1 cm³ = 10⁻⁶ m³.'],
        ['أشهر خطأ: تحويل cm² بـ 10⁻² فقط. هذا الخطأ موجود حتى في شرائح المقرر (مثال 9.2، الفجوة G‑12).', 'The classic mistake is converting cm² with 10⁻² only; it even appears in the course slides (Ex 9.2, gap G‑12).']
      ],
      example: { q: 'Convert 2.5 mm² to m².', steps: ['1 mm = 10⁻³ m', '1 mm² = (10⁻³)² m² = 10⁻⁶ m²', '2.5 mm² = 2.5 × 10⁻⁶ m²'], ans: '2.5 × 10⁻⁶ m²' },
      gen: () => pick([
        () => { const a = R(-6, 6), b = R(-6, 6), c = R(-6, 6); return { q: `{{10${sup(a)} × 10${sup(b)} // 10${sup(c)}}} = 10ⁿ. What is n?`, num: a + b - c, tol: 0, unit: '', sol: `Add the top powers, subtract the bottom: ${a} + (${b}) − (${c}) = ${a + b - c}` }; },
        () => { const a = pick([-3, -2, 2, 3, 6]), b = pick([2, 3]); return { q: `(10${sup(a)})${sup(b)} = 10ⁿ. What is n?`, num: a * b, tol: 0, unit: '', sol: `Multiply the powers: ${a} × ${b} = ${a * b}` }; },
        () => { const [u, e] = pick([['cm', -2], ['mm', -3], ['km', 3]]), p = pick([2, 3]); return { q: `1 ${u}${sup(p)} = 10ⁿ m${sup(p)}. What is n?`, num: e * p, tol: 0, unit: '', sol: `1 ${u} = 10${sup(e)} m, so 1 ${u}${sup(p)} = (10${sup(e)})${sup(p)} m${sup(p)} = 10${sup(e * p)} m${sup(p)}` }; },
        () => { const v = R(1.5, 9.5, 1); return { q: `Convert ${v} cm² to m².`, num: v * 1e-4, tol: 0.01, unit: 'm²', sol: `1 cm² = 10⁻⁴ m² → ${v} × 10⁻⁴ m²` }; }
      ])()
    },
    {
      id: 'f3', title: 'Rearranging an equation', ar: 'ترتيب المعادلة وعزل المجهول',
      uses: [['ch9-l2', 'R = V/I from V = RI'], ['ch4-l2', 'm = ΣF/a'], ['ch8-l1', 'r from Coulomb\'s law']],
      link: '#rearrange',
      explain: [
        ['المعادلة ميزان: أي عملية تعملها على طرف لازم تعملها على الطرف الثاني. الهدف أن يبقى الرمز المطلوب وحده.', 'An equation is a balance: do the same to both sides until the symbol you want stands alone.'],
        ['إذا كان المجهول مضروبًا في شيء فاقسم عليه، وإذا كان مقسومًا على شيء فاضرب فيه، وإذا كان في المقام فاضرب فيه أولًا ليصعد.', 'Multiplied → divide; divided → multiply; in the denominator → multiply first so it moves up.'],
        ['رتّب القانون بالرموز أولًا ثم عوّض بالأرقام في النهاية؛ هذا يقلل الأخطاء ويوضح الحل للمصحح.', 'Rearrange with symbols first and substitute numbers last.']
      ],
      example: { q: 'From P = {{V² // R}}, find R.', steps: ['Multiply both sides by R: P R = V²', 'Divide both sides by P: R = {{V² // P}}'], ans: 'R = {{V² // P}}' },
      gen: () => {
        const L = shuffle(['a', 'b', 'c', 'x', 'y', 'k', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'w']);
        const [x, y, z] = L;
        return pick([
          () => mcq(`If ${x} = ${y} ${z}, then ${y} = ?`, `{{${x} // ${z}}}`, [`${x} ${z}`, `{{${z} // ${x}}}`, `${x} − ${z}`], `${y} is multiplied by ${z}: divide both sides by ${z}.`),
          () => mcq(`If ${x} = {{${y} // ${z}}}, then ${z} = ?`, `{{${y} // ${x}}}`, [`${x} ${y}`, `{{${x} // ${y}}}`, `${y} − ${x}`], `${z} is in the denominator: multiply both sides by ${z} (${x} ${z} = ${y}), then divide by ${x}.`),
          () => mcq(`If ${x} = {{${y} // ${z}}}, then ${y} = ?`, `${x} ${z}`, [`{{${x} // ${z}}}`, `{{${z} // ${x}}}`, `${x} + ${z}`], `${y} is divided by ${z}: multiply both sides by ${z}.`),
          () => mcq(`If ${x} = ${y} + ${z}, then ${z} = ?`, `${x} − ${y}`, [`${x} + ${y}`, `${y} − ${x}`, `{{${x} // ${y}}}`], `Subtract ${y} from both sides.`),
          () => mcq(`If ${x} = ${y} ${z}², then ${z} = ?`, `√( {{${x} // ${y}}} )`, [`{{${x} // ${y}}}`, `( {{${x} // ${y}}} )²`, `√(${x} ${y})`], `Divide by ${y}, then take the square root.`),
          () => mcq(`If ${x} = {{${y} ${z} // ${L[3]}}}, then ${L[3]} = ?`, `{{${y} ${z} // ${x}}}`, [`{{${x} ${z} // ${y}}}`, `${x} ${y} ${z}`, `{{${x} // ${y} ${z}}}`], `Multiply both sides by ${L[3]}, then divide by ${x}.`)
        ])();
      }
    },
    {
      id: 'f4', title: 'Proportion: direct, inverse, inverse‑square', ar: 'التناسب الطردي والعكسي والتربيعي',
      uses: [['ch4-l2', 'a ∝ ΣF and a ∝ 1/m'], ['ch8-l1', 'F ∝ 1/r²'], ['ch9-l2', 'R ∝ ℓ and R ∝ 1/A']],
      explain: [
        ['طردي y ∝ x: إذا تضاعف x تضاعف y. عكسي y ∝ 1/x: إذا تضاعف x صار y النصف.', 'Direct y ∝ x: double x → double y. Inverse y ∝ 1/x: double x → half y.'],
        ['تربيعي y ∝ x²: إذا تضاعف x صار y أربعة أضعاف. تربيعي عكسي y ∝ 1/x²: إذا تضاعف x صار y الربع.', 'Square y ∝ x²: double x → 4 × y. Inverse square y ∝ 1/x²: double x → y/4.'],
        ['القاعدة: ارفع معامل التغيير لأسّ الرمز في القانون. في F = kq₁q₂/r² أسّ r هو −2، فإذا صار r ثلاثة أضعاف تصبح F مضروبة في 3⁻² = 1/9.', 'Raise the change factor to the power of the symbol in the law: in F = kq₁q₂/r² the power of r is −2, so r × 3 gives F × 3⁻² = F/9.']
      ],
      example: { q: 'In KE = ½ m v², the speed is doubled. What happens to KE?', steps: ['The power of v is 2', '2² = 4', 'KE becomes 4 times bigger'], ans: 'KE × 4' },
      gen: () => {
        const laws = [['F = {{k q₁ q₂ // r²}}', 'F', 'r', -2], ['F = {{k q₁ q₂ // r²}}', 'F', 'q₁', 1], ['KE = ½ m v²', 'KE', 'v', 2], ['KE = ½ m v²', 'KE', 'm', 1], ['a = {{ΣF // m}}', 'a', 'm', -1], ['R = {{ρ ℓ // A}}', 'R', 'ℓ', 1], ['R = {{ρ ℓ // A}}', 'R', 'A', -1], ['C = {{ε₀ A // d}}', 'C', 'd', -1], ['P = {{V² // R}}', 'P', 'V', 2], ['E = {{k q // r²}}', 'E', 'r', -2], ['V = {{k q // r}}', 'V', 'r', -1], ['y_max = {{v_i² // 2g}}', 'y_max', 'v_i', 2], ['U = ½ C V²', 'U', 'V', 2]];
        const [law, out, sym, p] = pick(laws), k = pick([2, 3, 4]);
        const say = e => e === 0 ? 'unchanged' : e > 0 ? `${out} × ${k ** e}` : `{{${out} // ${k ** -e}}}`;
        return mcq(`In ${law}, ${sym} is multiplied by ${k}. ${out} becomes…`, say(p), [say(-p), say(p > 0 ? 1 : -1), say(p > 0 ? -1 : 1), say(2 * p > 2 ? 1 : 2)], `The power of ${sym} is ${p}: ${k}${sup(p)} → ${say(p)}.`);
      }
    },
    {
      id: 'f5', title: 'Areas & volumes: radius vs diameter', ar: 'المساحة والحجم: نصف القطر والقطر',
      uses: [['ch6-l1', 'area of a wire A = πr²'], ['ch9-l2', 'R = ρℓ/A (gap G‑11 mixes diameter and radius)'], ['ch6-l4', 'pipe sections']],
      explain: [
        ['مساحة الدائرة A = πr² حيث r نصف القطر. إذا أُعطيت القطر d فنصف القطر r = d ÷ 2 قبل التربيع.', 'Circle area A = πr². If the diameter d is given, use r = d/2 before squaring.'],
        ['المربع: الضلع². المستطيل: الطول × العرض. المكعب: الضلع³. الأسطوانة: πr²h. الكرة: (4/3)πr³.', 'Square: side². Rectangle: length × width. Cube: side³. Cylinder: πr²h. Sphere: (4/3)πr³.'],
        ['حوّل الأطوال إلى متر أولًا ثم احسب المساحة؛ هكذا تتجنب خطأ 10⁻² بدل 10⁻⁴.', 'Convert lengths to metres first, then compute the area.']
      ],
      example: { q: 'A wire has diameter 0.4 mm. Find its cross‑section area in m².', steps: ['r = d/2 = 0.2 mm = 0.2 × 10⁻³ m', 'A = πr² = π(0.2 × 10⁻³)²', 'A = 1.26 × 10⁻⁷ m²'], ans: '1.26 × 10⁻⁷ m²' },
      gen: () => pick([
        () => { const d = R(0.2, 3, 1); const A = Math.PI * (d / 2 * 1e-3) ** 2; return { q: `A wire has diameter ${d} mm. Cross‑section area in m²?`, num: A, tol: 0.01, unit: 'm²', sol: `r = ${d}/2 = ${sig(d / 2)} mm = ${sig(d / 2)} × 10⁻³ m → A = π r² = ${sci(A)} m²` }; },
        () => { const r = R(1, 12), A = Math.PI * (r / 100) ** 2; return { q: `A pipe has radius ${r} cm. Cross‑section area in m²?`, num: A, tol: 0.01, unit: 'm²', sol: `r = ${r / 100} m → A = π r² = ${sci(A)} m²` }; },
        () => { const a = R(2, 40), b = R(2, 40), A = a * b * 1e-4; return { q: `A plate measures ${a} cm × ${b} cm. Area in m²?`, num: A, tol: 0.01, unit: 'm²', sol: `${a / 100} m × ${b / 100} m = ${sci(A)} m²` }; },
        () => { const s = R(2, 15), V = (s / 100) ** 3; return { q: `A cube has side ${s} cm. Volume in m³?`, num: V, tol: 0.01, unit: 'm³', sol: `(${s / 100} m)³ = ${sci(V)} m³` }; }
      ])()
    },
    {
      id: 'f6', title: 'Right triangles: sin, cos, tan', ar: 'المثلث القائم: الجيب وجيب التمام والظل',
      uses: [['ch2-l3', 'vector components A cos θ, A sin θ'], ['ch4-l2', 'a force pulling at an angle'], ['ch5-l1', 'W = F Δr cos θ'], ['ch10-l2', 'Snell\'s law uses sin']],
      explain: [
        ['في المثلث القائم: sin θ = المقابل ÷ الوتر ، cos θ = المجاور ÷ الوتر ، tan θ = المقابل ÷ المجاور. (SOH‑CAH‑TOA)', 'In a right triangle: sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent (SOH‑CAH‑TOA).'],
        ['لإيجاد الزاوية نستخدم الدوال العكسية: θ = tan⁻¹(المقابل ÷ المجاور). وتأكد أن الآلة الحاسبة على وضع الدرجات DEG.', 'To find the angle use the inverse functions, e.g. θ = tan⁻¹(opposite/adjacent). Keep the calculator in DEG mode.'],
        ['فيثاغورس: الوتر² = الضلع الأول² + الضلع الثاني². قيم تحفظها: sin 30° = 0.5 ، cos 60° = 0.5 ، tan 45° = 1.', 'Pythagoras: hypotenuse² = a² + b². Worth knowing: sin 30° = 0.5, cos 60° = 0.5, tan 45° = 1.']
      ],
      example: { q: 'A 20 N force pulls at 30° above the horizontal. Find its horizontal part.', steps: ['The horizontal part is next to the angle: adjacent → cos', 'Fₓ = F cos θ = 20 cos 30°', 'Fₓ = 20 × 0.866 = 17.3 N'], ans: '17.3 N' },
      gen: () => pick([
        () => { const h = R(5, 50), t = pick([20, 25, 30, 37, 40, 53, 60, 70]); return { q: `Hypotenuse ${h}, angle ${t}°. Side next to the angle (adjacent)?`, num: h * Math.cos(rad(t)), tol: 0.01, unit: '', sol: `adjacent = hypotenuse × cos θ = ${h} cos ${t}° = ${sig(h * Math.cos(rad(t)))}` }; },
        () => { const h = R(5, 50), t = pick([20, 25, 30, 37, 40, 53, 60, 70]); return { q: `Hypotenuse ${h}, angle ${t}°. Side opposite the angle?`, num: h * Math.sin(rad(t)), tol: 0.01, unit: '', sol: `opposite = hypotenuse × sin θ = ${h} sin ${t}° = ${sig(h * Math.sin(rad(t)))}` }; },
        () => { const a = R(2, 20), b = R(2, 20); return { q: `Opposite side ${b}, adjacent side ${a}. Angle θ in degrees?`, num: deg(Math.atan(b / a)), tol: 0.01, unit: '°', sol: `θ = tan⁻¹( {{${b} // ${a}}} ) = ${sig(deg(Math.atan(b / a)))}°` }; },
        () => { const a = R(2, 20), b = R(2, 20); return { q: `The two short sides are ${a} and ${b}. Hypotenuse?`, num: Math.hypot(a, b), tol: 0.01, unit: '', sol: `√(${a}² + ${b}²) = ${sig(Math.hypot(a, b))}` }; }
      ])()
    },
    {
      id: 'f7', title: 'Sine rule & cosine rule', ar: 'قانون الجيب وقانون جيب التمام',
      uses: [['ch2-l2', 'adding two vectors at any angle']],
      explain: [
        ['لأي مثلث (ليس بالضرورة قائمًا): قانون جيب التمام c² = a² + b² − 2ab cos C ، حيث C الزاوية المقابلة للضلع c والمحصورة بين a و b.', 'For any triangle: cosine rule c² = a² + b² − 2ab cos C, where C is the angle between a and b, opposite c.'],
        ['قانون الجيب: {{a // sin A}} = {{b // sin B}} = {{c // sin C}} ، ونستخدمه لإيجاد زاوية بعد معرفة الأضلاع.', 'Sine rule: {{a // sin A}} = {{b // sin B}} = {{c // sin C}}; use it to find an angle once the sides are known.'],
        ['إذا كانت C = 90° فإن cos 90° = 0 ويصبح قانون جيب التمام هو فيثاغورس.', 'If C = 90°, cos 90° = 0 and the cosine rule becomes Pythagoras.']
      ],
      example: { q: 'Two sides 6 and 9 with 60° between them. Third side?', steps: ['c² = 6² + 9² − 2·6·9·cos 60°', 'c² = 36 + 81 − 54 = 63', 'c = 7.94'], ans: '7.94' },
      gen: () => pick([
        () => { const a = R(3, 15), b = R(3, 15), C = pick([40, 50, 60, 70, 100, 110, 120]); const c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(rad(C))); return { q: `Sides ${a} and ${b} with ${C}° between them. Third side?`, num: c, tol: 0.01, unit: '', sol: `c = √(${a}² + ${b}² − 2·${a}·${b}·cos ${C}°) = ${sig(c)}` }; },
        () => { const A = pick([30, 40, 50]), B = pick([60, 70, 80]), a = R(4, 12); const b = a * Math.sin(rad(B)) / Math.sin(rad(A)); return { q: `In a triangle, angle A = ${A}° faces side a = ${a}, and angle B = ${B}°. Side b?`, num: b, tol: 0.01, unit: '', sol: `b = {{a sin B // sin A}} = {{${a} sin ${B}° // sin ${A}°}} = ${sig(b)}` }; }
      ])()
    },
    {
      id: 'f8', title: 'Graphs: slope & intercept', ar: 'الرسم البياني: الميل والمقطع',
      uses: [['ch3-l2', 'slope of x–t = velocity'], ['ch3-l3', 'slope of v–t = acceleration'], ['lab', 'every virtual‑lab experiment fits a straight line']],
      explain: [
        ['الخط المستقيم معادلته y = m x + b ، حيث m الميل و b المقطع (قيمة y عندما x = 0).', 'A straight line is y = m x + b: m is the slope, b the intercept (the value of y at x = 0).'],
        ['الميل = {{Δy // Δx}} = {{y₂ − y₁ // x₂ − x₁}} ، أي التغير في الرأسي ÷ التغير في الأفقي، ووحدته = وحدة y ÷ وحدة x.', 'Slope = {{Δy // Δx}} = {{y₂ − y₁ // x₂ − x₁}}; its unit is the unit of y over the unit of x.'],
        ['في الفيزياء: ميل منحنى الموقع والزمن = السرعة، وميل منحنى السرعة والزمن = التسارع، والمساحة تحت منحنى السرعة = الإزاحة.', 'In physics: slope of x–t = velocity, slope of v–t = acceleration, area under v–t = displacement.']
      ],
      example: { q: 'A v–t line passes through (2 s, 4 m/s) and (6 s, 16 m/s). Acceleration?', steps: ['slope = {{16 − 4 // 6 − 2}}', 'slope = {{12 // 4}} = 3', 'a = 3 m/s²'], ans: '3 m/s²' },
      gen: () => pick([
        () => { const x1 = R(0, 4), x2 = x1 + R(2, 6), m = R(-5, 8, 1) || 2, b = R(-10, 10); const y1 = m * x1 + b, y2 = m * x2 + b; return { q: `A straight line passes through (${x1}, ${sig(y1)}) and (${x2}, ${sig(y2)}). Slope?`, num: m, tol: 0.01, unit: '', sol: `slope = {{${sig(y2)} − ${sig(y1)} // ${x2} − ${x1}}} = ${m}` }; },
        () => { const t1 = R(0, 3), t2 = t1 + R(2, 6), a = R(1, 5, 1), v0 = R(0, 10); return { q: `On a v–t graph the line passes through (${t1} s, ${sig(v0 + a * t1)} m/s) and (${t2} s, ${sig(v0 + a * t2)} m/s). Acceleration?`, num: a, tol: 0.01, unit: 'm/s²', sol: `a = slope = {{Δv // Δt}} = ${a} m/s²` }; },
        () => { const m = R(2, 9), b = R(-5, 5), x = R(1, 10); return { q: `y = ${m}x ${b < 0 ? '−' : '+'} ${Math.abs(b)}. What is y when x = ${x}?`, num: m * x + b, tol: 0.001, unit: '', sol: `y = ${m} × ${x} ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${m * x + b}` }; },
        () => { const v = R(2, 12), t = R(2, 10); return { q: `A car moves at a constant ${v} m/s for ${t} s. Area under its v–t graph (its displacement)?`, num: v * t, tol: 0.001, unit: 'm', sol: `rectangle area = ${v} × ${t} = ${v * t} m` }; }
      ])()
    },
    {
      id: 'f9', title: 'Derivatives: the power rule', ar: 'الاشتقاق بقاعدة القوة',
      uses: [['ch3-l2', 'v = dx/dt'], ['ch3-l3', 'a = dv/dt'], ['ch5-l4', 'P = dW/dt'], ['ch9-l1', 'I = dq/dt']],
      explain: [
        ['قاعدة القوة: مشتقة tⁿ هي n tⁿ⁻¹ ، أي ننزل الأس ضاربًا ثم نطرح من الأس واحدًا. مشتقة الثابت = صفر، ومشتقة t = 1.', 'Power rule: the derivative of tⁿ is n tⁿ⁻¹. The derivative of a constant is 0, of t is 1.'],
        ['المعامل يبقى مضروبًا: مشتقة 6t² = 12t ، ومشتقة 2t³ = 6t².', 'A coefficient stays: d/dt(6t²) = 12t, d/dt(2t³) = 6t².'],
        ['السرعة = مشتقة الموقع، والتسارع = مشتقة السرعة. بعد الاشتقاق عوّض الزمن المطلوب.', 'Velocity = derivative of position, acceleration = derivative of velocity. Substitute the time after differentiating.']
      ],
      example: { q: 'x = 6t² − t + 1. Find v at t = 3 s.', steps: ['v = {{dx // dt}} = 12t − 1', 'v(3) = 12 × 3 − 1', 'v = 35 m/s'], ans: '35 m/s' },
      gen: () => { const a = R(1, 4), b = R(-5, 5), c = R(-6, 6), d = R(0, 9), t = R(1, 5); const term = (k, s) => k === 0 ? '' : `${k < 0 ? ' − ' : ' + '}${Math.abs(k) === 1 && s ? '' : Math.abs(k)}${s}`;
        const x = `${a}t³${term(b, 't²')}${term(c, 't')}${term(d, '')}`;
        return pick([
          () => ({ q: `x(t) = ${x} (m). Velocity at t = ${t} s?`, num: 3 * a * t * t + 2 * b * t + c, tol: 0.001, unit: 'm/s', sol: `v = {{dx // dt}} = ${3 * a}t²${term(2 * b, 't')}${term(c, '')} → v(${t}) = ${3 * a * t * t + 2 * b * t + c} m/s` }),
          () => ({ q: `x(t) = ${x} (m). Acceleration at t = ${t} s?`, num: 6 * a * t + 2 * b, tol: 0.001, unit: 'm/s²', sol: `v = ${3 * a}t²${term(2 * b, 't')}${term(c, '')} → a = {{dv // dt}} = ${6 * a}t${term(2 * b, '')} → a(${t}) = ${6 * a * t + 2 * b} m/s²` })
        ])(); }
    },
    {
      id: 'f10', title: 'Quadratic equations', ar: 'المعادلة التربيعية',
      uses: [['ch3-l4', 'time of flight when a body is thrown from a height'], ['ch8-l4', 'two capacitors from their series and parallel values']],
      explain: [
        ['المعادلة التربيعية شكلها a x² + b x + c = 0 ، وحلها بالقانون العام: x = {{−b ± √(b² − 4ac) // 2a}}.', 'A quadratic a x² + b x + c = 0 is solved by x = {{−b ± √(b² − 4ac) // 2a}}.'],
        ['تعطي غالبًا جوابين. في الفيزياء الزمن لا يكون سالبًا، فنختار الجواب الموجب.', 'It usually gives two answers; a time cannot be negative, so keep the positive one.'],
        ['تظهر في السقوط الحر عندما تكون هناك سرعة ابتدائية وارتفاع: ½ a t² + v_i t − Δx = 0.', 'It appears in free fall with a starting speed and a height: ½ a t² + v_i t − Δx = 0.']
      ],
      example: { q: 'Solve t² − 6t − 7 = 0 (time in s).', steps: ['a = 1, b = −6, c = −7', 't = {{6 ± √(36 + 28) // 2}} = {{6 ± 8 // 2}}', 't = 7 or t = −1 → t = 7 s'], ans: '7 s' },
      gen: () => pick([
        () => { const r1 = R(2, 12), r2 = -R(1, 9), b = -(r1 + r2), c = r1 * r2; return { q: `Solve t² ${b < 0 ? '−' : '+'} ${Math.abs(b)}t ${c < 0 ? '−' : '+'} ${Math.abs(c)} = 0. Positive root?`, num: r1, tol: 0.001, unit: 's', sol: `t = {{${-b} ± √(${b * b} ${c < 0 ? '+' : '−'} ${Math.abs(4 * c)}) // 2}} → t = ${r1} or ${r2}; keep ${r1} s` }; },
        () => { const v = pick([4.9, 9.8, 14.7, 19.6]), T = R(2, 6); const h = +(v * T + 4.9 * T * T).toFixed(1); return { q: `A stone is thrown down at ${v} m/s from ${h} m. Time to reach the ground? (down +, g = 9.8)`, num: T, tol: 0.01, unit: 's', sol: `${h} = ${v}t + 4.9t² → 4.9t² + ${v}t − ${h} = 0 → t = {{−${v} + √(${v}² + 4·4.9·${h}) // 2·4.9}} = ${T} s` }; }
      ])()
    },
    {
      id: 'f11', title: 'Calculator, brackets & rounding', ar: 'الآلة الحاسبة والأقواس والتقريب',
      uses: [['ch8-l1', 'k q₁q₂ ÷ r² needs brackets around the denominator'], ['ch10-l2', 'sin and sin⁻¹ in DEG mode'], ['ch1-l2', 'final answers to 3 significant figures']],
      explain: [
        ['ضع المقام كله بين قوسين: {{a // b × c}} تُكتب في الآلة a ÷ (b × c). بدون أقواس تقسم على b ثم تضرب في c فيخرج جواب خاطئ.', 'Put the whole denominator in brackets: {{a // b × c}} is typed a ÷ (b × c). Without brackets the calculator divides by b and then multiplies by c.'],
        ['تأكد أن الآلة على وضع الدرجات DEG قبل حساب sin و cos و tan. علامة الخطأ: sin 30 تعطي −0.988 بدل 0.5.', 'Check DEG mode before sin, cos, tan: if sin 30 gives −0.988 the calculator is in radians.'],
        ['لا تقرّب في منتصف الحل. قرّب الجواب النهائي فقط، عادة إلى ثلاثة أرقام معنوية: 0.0045678 ≈ 0.00457 ، و 123 456 ≈ 1.23 × 10⁵.', 'Do not round in the middle. Round only the final answer, usually to 3 significant figures.']
      ],
      example: { q: 'Compute {{9×10⁹ × 2×10⁻⁶ // 0.03²}}.', steps: ['Type: 9 EXP 9 × 2 EXP −6 ÷ ( 0.03 x² )', '= {{18 000 // 0.0009}}', '= 2 × 10⁷'], ans: '2 × 10⁷' },
      gen: () => pick([
        () => { const a = R(20, 200), b = R(2, 9), c = R(2, 9); return { q: `Compute {{${a} // ${b} × ${c}}}.`, num: a / (b * c), tol: 0.005, unit: '', sol: `${a} ÷ (${b} × ${c}) = ${sig(a / (b * c))}. Without brackets you would get ${sig(a / b * c)}.` }; },
        () => { const x = R(1000, 99999) / pick([1, 10, 1e3, 1e5]); const r = sig(x); return { q: `Round ${x} to 3 significant figures.`, num: r, tol: 0.0004, unit: '', sol: `The first three digits that are not leading zeros: ${r}` }; },
        () => mcq('How do you type {{6 // 2 × 3}} on a calculator?', '6 ÷ (2 × 3)', ['6 ÷ 2 × 3', '(6 ÷ 2) × 3', '6 × 2 ÷ 3'], 'The whole denominator goes in brackets; the answer is 1, not 9.'),
        () => mcq('Your calculator gives sin 30 = −0.988. What is wrong?', 'It is in radian mode', ['Nothing, that is correct', 'The battery is low', 'You must type sin⁻¹'], 'sin 30° = 0.5. Switch to DEG mode.')
      ])()
    }
  ];
  // which foundation skills each chapter leans on (used for the "Are you ready?" check)
  window.PREREQ = { ch1: ['f1', 'f2', 'f11'], ch2: ['f6', 'f7', 'f3'], ch3: ['f9', 'f8', 'f10', 'f3'], ch4: ['f3', 'f4', 'f6'], ch5: ['f6', 'f3', 'f4'], ch6: ['f5', 'f2', 'f3'], ch7: ['f3', 'f1', 'f11'], ch8: ['f1', 'f4', 'f11'], ch9: ['f5', 'f2', 'f4'], ch10: ['f6', 'f11', 'f3'] };

  // problem language: phrases that hide numbers or tell you what to do
  window.PHRASES = [
    { sec: 'Hidden numbers · كلمات تخفي أرقامًا', rows: [
      ['starts from rest / released from rest', 'يبدأ من السكون', 'v_i = 0'],
      ['dropped', 'يُترك ليسقط', 'v_i = 0 and a = g downward'],
      ['comes to rest / stops', 'يتوقف', 'v_f = 0'],
      ['maximum height / highest point', 'أقصى ارتفاع', 'v = 0 at the top'],
      ['thrown vertically upward', 'قُذف رأسيًا لأعلى', 'up is +, so a = −g'],
      ['returns to the same level', 'يعود إلى المستوى نفسه', 'Δy = 0, flight time = 2 t_max'],
      ['constant velocity / uniform motion', 'سرعة ثابتة', 'a = 0 and ΣF = 0'],
      ['constant acceleration', 'تسارع ثابت', 'the equations 3.6–3.8 apply'],
      ['at rest / in equilibrium', 'ساكن / متزن', 'ΣF = 0'],
      ['frictionless / smooth surface', 'أملس / بدون احتكاك', 'no friction force'],
      ['neglect air resistance / free fall', 'أهمل مقاومة الهواء / سقوط حر', 'a = g = 9.8 m/s²'],
      ['uniform electric field', 'مجال كهربائي منتظم', 'E is the same everywhere, ΔV = Ed'],
      ['point charge', 'شحنة نقطية', 'use {{k q // r²}} and {{k q // r}}'],
      ['in vacuum / in air', 'في الفراغ / في الهواء', 'n = 1 and ε₀ for capacitors'],
      ['insulated container', 'وعاء معزول', 'heat lost = heat gained'],
      ['identical resistors / capacitors', 'مقاومات أو مكثفات متماثلة', 'all have the same value: nR, {{R // n}}'],
      ['diameter', 'القطر', 'halve it: r = {{d // 2}}']
    ] },
    { sec: 'Question words · أفعال السؤال', rows: [
      ['find / calculate / determine', 'أوجد / احسب / حدد', 'a number with its unit'],
      ['estimate', 'قدّر', 'a rough value is enough'],
      ['show that / prove', 'أثبت / بيّن أن', 'reach the given result step by step'],
      ['verify / check', 'تحقق', 'test it, e.g. with dimensions'],
      ['derive', 'اشتق', 'build the formula from laws you know'],
      ['magnitude and direction', 'المقدار والاتجاه', 'two answers: a size and an angle'],
      ['express in SI units', 'عبّر بوحدات النظام الدولي', 'convert to m, kg, s, A, K'],
      ['compare / ratio', 'قارن / النسبة', 'divide one by the other']
    ] },
    { sec: 'Linking words · كلمات الربط', rows: [
      ['respectively', 'على الترتيب', 'values match the names in the same order'],
      ['per', 'لكل', 'divide: km per hour = km/h'],
      ['rate of …', 'معدل …', '… divided by time'],
      ['directly proportional to', 'يتناسب طرديًا مع', 'y ∝ x'],
      ['inversely proportional to', 'يتناسب عكسيًا مع', 'y ∝ {{1 // x}}'],
      ['net / resultant', 'المحصلة', 'the vector sum of all of them'],
      ['initial / final', 'ابتدائي / نهائي', 'subscripts i and f'],
      ['average / instantaneous', 'متوسط / لحظي', '{{Δx // Δt}} versus {{dx // dt}}'],
      ['twice / doubled / halved', 'الضعف / يتضاعف / يتنصف', '× 2 or ÷ 2'],
      ['perpendicular / parallel', 'متعامد / موازٍ', 'at 90° / at 0°']
    ] }
  ];
})();
