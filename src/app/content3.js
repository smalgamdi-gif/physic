/* Physics Learning Lab — course content, chapters 7–10. */
COURSE.push({
  id: 'ch7', n: 7, title: 'Heat', ar: 'الحرارة', src: 'S07 · BK p.105–121',
  lessons: [
    {
      id: 'ch7-l1', title: 'Temperature scales', ar: 'مقاييس درجة الحرارة', src: 'S07 §1 · BK p.105–107',
      goals: ['List thermometric properties', 'Convert between °C, °F and K'],
      goalsAr: 'ستعرف الخواص التي تعتمد عليها الترمومترات وتحوّل بين المقاييس الثلاثة.',
      why: { en: 'Gas laws and radiation need kelvin; weather reports use °C or °F.', ar: 'قوانين الغازات والإشعاع تحتاج الكلفن.' },
      explain: [
        { en: 'Thermometers use a property that changes with temperature: liquid volume, gas volume (constant P), gas pressure (constant V), solid dimensions, electrical resistance, emitted wavelength.', ar: 'الترمومتر يعتمد على خاصية فيزيائية تتغير بالحرارة.' },
        { en: 'Fixed points: Celsius 0–100, Fahrenheit 32–212 (180 divisions), Kelvin 273.15–373.15.', ar: 'نقاط التجمد والغليان في المقاييس الثلاثة.' },
        { en: 'T_C/100 = (T_K − 273)/100 = (T_F − 32)/180 → T_C = 5/9 (T_F − 32), T_K = T_C + 273 (7.1, 7.2).', ar: 'العلاقة العامة بين المقاييس.' },
        { en: 'Absolute zero −273.15 °C = 0 K (gas pressure → 0, Fig 7.2). Write K, not °K (G‑17).', ar: 'الصفر المطلق −273.15 °C.' }
      ],
      terms: [['Temperature', 'درجة الحرارة', 'Measure of hotness'], ['Thermometer', 'مقياس الحرارة', 'Uses a thermometric property'], ['Absolute zero', 'الصفر المطلق', '0 K']],
      formulas: [{ f: 'T_C = {{5 // 9}} (T_F − 32) ,  T_K = T_C + 273', name: '(7.1–7.2)', sym: [['T_C, T_F, T_K', 'temperatures', '°C, °F, K']], cond: 'ΔT in °C equals ΔT in K.' }],
      life: { en: 'A fever of 104 °F is 40 °C.', ar: 'حمى 104 فهرنهايت تساوي 40 مئوية.' },
      worked: { src: 'S07 Ex 7.1 · BK p.107', q: 'Room temperature 100 °F in °C and K?', steps: ['T_C = 5/9 (100 − 32) = 37.8 °C', 'T_K = 37.8 + 273 = 310.8 K'], ans: '37.8 °C, 310.8 K' },
      tryit: { src: 'BK p.120 Exercise 1', q: 'Oxygen freezes at −362 °F. Value in °C?', ans: -218.9, tol: 0.01, unit: '°C', hint: '5/9 × (−362 − 32)', sol: '5/9 × (−394) = −218.9 °C' },
      checks: [
        { q: 'At what Celsius reading is the Fahrenheit reading twice it? (BK Ex 7.2)', o: ['160 °C', '−40 °C', '80 °C', '320 °C'], a: 0, why: 'x/100 = (2x − 32)/180 → x = 160.' },
        { q: '−10 °C in °F (BK Ex.2)?', o: ['14 °F', '−14 °F', '50 °F', '−23 °F'], a: 0, why: '9/5(−10) + 32.' }
      ],
      mistakes: [['Adding 32 before multiplying by 9/5', 'T_F = 9/5 T_C + 32.'], ['Writing °K', 'Use K.']],
      summary: ['°C 0–100, °F 32–212, K 273–373', 'T_C = 5/9(T_F − 32)', 'T_K = T_C + 273'],
      quiz: [
        { q: '−40 °C in °F?', num: -40, tol: 0, unit: '°F', sol: '🧩 the two scales meet at −40.' },
        { q: '300 K in °C?', num: 27, tol: 0, unit: '°C', sol: '300 − 273 = 27 °C' }
      ]
    },
    {
      id: 'ch7-l2', title: 'Thermal expansion', ar: 'التمدد الحراري', src: 'S07 §2 · BK p.108–112',
      goals: ['Use Δℓ = αℓΔT', 'Relate γ = 2α and β = 3α', 'Explain the anomaly of water'],
      goalsAr: 'ستحسب التمدد الطولي والسطحي والحجمي وتفهم شذوذ الماء.',
      why: { en: 'Rails, bridges and pipelines need expansion gaps (Fig 7.4).', ar: 'السكك والجسور تحتاج فواصل تمدد.' },
      explain: [
        { en: 'Atoms vibrate more at higher temperature, so distances between them grow.', ar: 'تزداد اهتزازات الذرات فتتباعد.' },
        { en: 'Linear: Δℓ = αℓ₁ΔT, ℓ₂ = ℓ₁(1 + αΔT) (7.3). Area: S₂ = S₁(1 + γΔT), γ = 2α (7.4). Volume: V₂ = V₁(1 + βΔT), β = 3α (7.5).', ar: 'التمدد الطولي والسطحي والحجمي.' },
        { en: 'α "defined as the amount of change in length for each temperature change of one‑degree Kelvin" (relative change).', ar: 'معامل التمدد الطولي هو التغير النسبي في الطول لكل درجة.' },
        { en: 'Water anomaly: from 0 °C to 4 °C water contracts; its volume is minimal (density maximal) at 4 °C, so lakes freeze from the top (BK p.111–112).', ar: 'شذوذ الماء: أعلى كثافة عند 4 °C فتتجمد البحيرات من الأعلى.' },
        { en: 'A hole in a plate expands as if it were made of the plate material (Ex 7.4).', ar: 'الثقب في صفيحة يتمدد كأنه من مادة الصفيحة.' }
      ],
      terms: [['Linear expansion coefficient α', 'معامل التمدد الطولي', '°C⁻¹'], ['Surface coefficient γ', 'معامل التمدد السطحي', '2α'], ['Volume coefficient β', 'معامل التمدد الحجمي', '3α'], ['Anomaly of water', 'شذوذ الماء', 'Max density at 4 °C']],
      formulas: [{ f: 'Δℓ = α ℓ ΔT ,  ΔS = γ S ΔT ,  ΔV = β V ΔT', name: '(7.3–7.5)', sym: [['α', 'linear coefficient', '°C⁻¹ or K⁻¹'], ['ΔT', 'temperature change', '°C or K']], cond: 'γ = 2α, β = 3α (small αΔT).' }],
      life: { en: 'Power lines sag more in summer because they are longer.', ar: 'أسلاك الكهرباء تتدلى صيفًا لأنها أطول.' },
      worked: { src: 'S07 example · BK Ex 7.3 p.112', q: 'Copper bar 10 m at 0 °C heated to 500 °C, α = 1.8×10⁻⁵ °C⁻¹. Expansion?', steps: ['Δℓ = 1.8×10⁻⁵ × 10 × 500', 'Δℓ = 0.09 m → ℓ₂ = 10.09 m', 'β = 3α = 5.4×10⁻⁵ °C⁻¹'], ans: 'Δℓ = 0.09 m' },
      tryit: { src: 'S07 example · BK Ex 7.5 p.113', q: 'A 0.55 m³ metal box at 20 °C is heated to 100 °C, α = 1.7×10⁻⁵. ΔV = ?', ans: 0.002244, tol: 0.02, unit: 'm³', hint: 'β = 3α', sol: 'ΔV = 3·1.7×10⁻⁵·0.55·80 = 2.24×10⁻³ m³' },
      checks: [
        { q: 'A square plate 100 cm side grows by 1 cm, α = 1.25×10⁻⁵ (BK Ex 7.4). ΔT?', o: ['800 °C', '80 °C', '8000 °C', '400 °C'], a: 0, why: 'ΔT = 1/(100·1.25×10⁻⁵).' },
        { q: 'Water has maximum density at…', o: ['0 °C', '4 °C', '100 °C', '−4 °C'], a: 1, why: 'Anomaly of water.' }
      ],
      mistakes: [['Using β = α for volumes', 'β = 3α.'], ['Thinking a hole shrinks on heating', 'It expands.']],
      summary: ['Δℓ = αℓΔT', 'γ = 2α, β = 3α', 'Water: densest at 4 °C'],
      quiz: [
        { q: 'Same plate (Ex 7.4): hole of diameter 20 cm becomes…', num: 20.2, tol: 0.005, unit: 'cm', sol: '20(1 + 1.25×10⁻⁵·800) = 20.2 cm' },
        { q: 'β for copper with α = 1.8×10⁻⁵ °C⁻¹?', num: 5.4e-5, tol: 0.01, unit: '°C⁻¹', sol: '3α' }
      ]
    },
    {
      id: 'ch7-l3', title: 'Specific heat, heat capacity & latent heat', ar: 'الحرارة النوعية والسعة الحرارية والحرارة الكامنة', src: 'S07 §3 · BK p.113–116',
      goals: ['Use Q = cmΔT, Q = CΔT, Q = mL', 'Solve heat‑balance (calorimetry) problems'],
      goalsAr: 'ستحسب كمية الحرارة وتحل مسائل الاتزان الحراري (المسعر).',
      why: { en: 'Cooking, air‑conditioning and engine cooling all rely on heat capacity.', ar: 'الطبخ والتكييف وتبريد المحركات تعتمد على السعة الحرارية.' },
      explain: [
        { en: 'Heat is energy. Q acquired or lost is proportional to m and ΔT: Q = cmΔT (7.6). Heat capacity C: Q = CΔT (7.7).', ar: 'الحرارة طاقة، وتتناسب مع الكتلة وتغير درجة الحرارة.' },
        { en: 'Latent heat L: heat to change phase at constant temperature: Q = mL (7.8).', ar: 'الحرارة الكامنة لتغيير الحالة عند درجة ثابتة.' },
        { en: 'Units: calorie (heat to raise 1 g of water by 1 °C); 1 cal = 4.18 J (Joule\'s mechanical equivalent). c_water = 1 cal/g·°C = 4186 J/kg·K (🧩 conversion).', ar: 'السعر الحراري = 4.18 جول تقريبًا.' },
        { en: 'Heat balance in an insulated system: heat lost by hot bodies = heat gained by cold bodies (Ex 7.8).', ar: 'في نظام معزول: الحرارة المفقودة = الحرارة المكتسبة.' }
      ],
      terms: [['Specific heat c', 'الحرارة النوعية', 'J/kg·K or cal/g·°C'], ['Heat capacity C', 'السعة الحرارية', 'J/K'], ['Latent heat L', 'الحرارة الكامنة', 'J/kg'], ['Calorimeter', 'المسعر', 'Insulated container']],
      formulas: [
        { f: 'Q = c m ΔT', name: '(7.6)', sym: [['c', 'specific heat', 'J/kg·K'], ['m', 'mass', 'kg']], cond: 'No phase change.' },
        { f: 'Q = m L', name: '(7.8)', sym: [['L', 'latent heat', 'J/kg']], cond: 'Constant temperature during phase change.' },
        { f: 'Σ Q_lost = Σ Q_gained', name: 'Heat balance', sym: [['Q', 'heat', 'J or cal']], cond: 'Insulated system.' }
      ],
      life: { en: 'Sand on the beach gets hot quickly while the sea stays cool: water has a much larger c.', ar: 'الرمل يسخن بسرعة والبحر يبقى باردًا لأن الحرارة النوعية للماء أكبر.' },
      worked: { src: 'BK Ex 7.8 p.116', q: '75 g copper (c = 0.092) at 312 °C into 220 g water at 12 °C in glass (C = 45 cal/K). Final T?', steps: ['Heat lost = 75·0.092·(312 − T)', 'Heat gained = 220·1·(T − 12) + 45(T − 12)', '2152.8 − 6.9T = 265T − 3180 → 5332.8 = 271.9T', 'T = 19.6 °C'], ans: 'T = 19.6 °C' },
      tryit: { src: 'BK p.121 Exercise 8', q: 'Heat to turn 30 g of ice at −5 °C into water at 20 °C (c_ice = 0.5, L = 80 cal/g, c_w = 1)?', ans: 3075, tol: 0.01, unit: 'cal', hint: 'Three steps: warm ice, melt, warm water.', sol: '30·0.5·5 + 30·80 + 30·1·20 = 75 + 2400 + 600 = 3075 cal' },
      checks: [
        { q: '720 g ice from −10 °C to 0 °C, c = 2220 J/kg·K (S07 Ex 7.6). Q?', o: ['15 984 J', '239 760 J', '1598 J', '22 200 J'], a: 0, why: '0.72·2220·10.' },
        { q: 'Melting 720 g of ice, L = 333 kJ/kg (S07 Ex 7.7). Q?', o: ['239 760 J', '15 984 J', '333 000 J', '2.4 J'], a: 0, why: '0.72·333 000.' }
      ],
      mistakes: [['Using Q = cmΔT through a phase change', 'Add Q = mL for the change.'], ['Mixing grams with J/kg·K', 'Match units (G‑14).']],
      summary: ['Q = cmΔT', 'Q = mL', 'Lost = gained'],
      quiz: [
        { q: '20 g of water cools from 90 °C to 30 °C (BK Ex.6). Heat released?', num: 1200, tol: 0, unit: 'cal', sol: '20·1·60 = 1200 cal' },
        { q: 'Metal 30 g at 100 °C into 150 g water + 20 g Al cup (c = 0.21) at 20 °C, final 25 °C (BK Ex.7). c_metal?', num: 0.343, tol: 0.02, unit: 'cal/g·°C', sol: '(150 + 4.2)·5 = 771 cal = 30·c·75 → c = 0.343' },
        { q: 'Calorimeter BK Ex.9: initial metal temperature?', num: 448, tol: 0.02, unit: '°C', sol: 'Gained: 100·80 + 500·10 + 70·0.2·10 = 13 140 cal = 300·0.1·(T − 10) → T = 448 °C' },
        { q: '150 cal to 100 g Al (c = 0.2) and 100 g Cu (c = 0.092). Which rises more? (BK Ex.4)', o: ['Aluminium', 'Copper', 'Same'], a: 1, why: 'ΔT_Cu = 16.3 °C vs ΔT_Al = 7.5 °C.' }
      ]
    },
    {
      id: 'ch7-l4', title: 'Heat transfer: conduction, convection, radiation', ar: 'انتقال الحرارة: التوصيل والحمل والإشعاع', src: 'S07 §4 · BK p.116–118',
      goals: ['Use H = k_c A (T₁ − T₂)/x', 'Describe convection', 'Use Stefan–Boltzmann Q = σAT⁴'],
      goalsAr: 'ستتعرف طرق انتقال الحرارة الثلاث وتحسب التوصيل والإشعاع.',
      why: { en: 'Insulation, cooking pots and the Sun warming Earth are the three modes in action.', ar: 'العزل وأواني الطبخ وتسخين الشمس للأرض أمثلة على الطرق الثلاث.' },
      explain: [
        { en: 'Conduction: heat Q through a slab is ∝ A, (T₁ − T₂), t and ∝ 1/x. Rate H = Q/t = k_c A (T₁ − T₂)/x (7.9).', ar: 'التوصيل يعتمد على المساحة وفرق الحرارة والسمك.' },
        { en: 'Convection: movement of the fluid itself; hot water rises because its density decreases (Fig 7.8).', ar: 'الحمل: انتقال المادة الساخنة نفسها.' },
        { en: 'Radiation: electromagnetic waves, no medium needed. Stefan–Boltzmann: Q = σAT⁴, σ = 5.67×10⁻⁸ W/m²K⁴, T in kelvin; Q here is energy per second of a black body (G‑16).', ar: 'الإشعاع لا يحتاج وسطًا، ويتناسب مع T⁴ بالكلفن.' }
      ],
      terms: [['Thermal conductivity k_c', 'معامل التوصيل الحراري', 'W/m·K'], ['Temperature gradient', 'الميل الحراري', '(T₁ − T₂)/x'], ['Convection', 'الحمل', 'Fluid motion'], ['Radiation', 'الإشعاع', 'EM waves'], ['Black body', 'الجسم الأسود', 'Ideal emitter']],
      formulas: [{ f: 'H = {{k_c A (T₁ − T₂) // x}}', name: 'Conduction (7.9)', sym: [['H', 'heat rate', 'W or cal/s'], ['x', 'thickness', 'm']], cond: 'Steady state.' }, { f: 'Q = σ A T⁴', name: 'Stefan–Boltzmann (7.10)', sym: [['σ', '5.67×10⁻⁸', 'W/m²K⁴'], ['T', 'absolute temperature', 'K']], cond: 'Ideal black body; per second.' }],
      life: { en: 'Double‑glazed windows trap air (poor conductor) to cut heat loss.', ar: 'النوافذ المزدوجة تحبس الهواء الرديء التوصيل.' },
      worked: { src: '🧩 built on (7.9), data of BK Ex.5', q: 'Copper bar 1 m, A = 2 cm², ends at 100 °C and 0 °C, k = 0.2 cal/s·cm·°C. Heat in 10 min?', steps: ['H = 0.2 × 2 × 100/100 = 0.4 cal/s', 'Q = 0.4 × 600 = 240 cal'], ans: '240 cal ≈ 1004 J' },
      tryit: { src: '🧩 additional design', q: 'A black body of area 1 m² at 300 K. Radiated power?', ans: 459.3, tol: 0.01, unit: 'W', hint: 'σ T⁴ with T = 300 K', sol: '5.67×10⁻⁸ × 300⁴ = 459 W' },
      checks: [
        { q: 'Which needs no medium?', o: ['Conduction', 'Convection', 'Radiation'], a: 2, why: 'EM waves travel in vacuum.' },
        { q: 'Doubling slab thickness makes H…', o: ['double', 'half', 'same', '4×'], a: 1, why: 'H ∝ 1/x.' }
      ],
      mistakes: [['Using °C in σT⁴', 'Convert to K.']],
      summary: ['Conduction H = kA ΔT/x', 'Convection: fluid moves', 'Radiation σAT⁴ (K)'],
      quiz: [{ q: 'If T (in K) doubles, radiated power becomes ×…', num: 16, tol: 0, unit: '', sol: '2⁴ = 16' }]
    }
  ]
});

COURSE.push({
  id: 'ch8', n: 8, title: 'Static Electricity', ar: 'الكهرباء الساكنة', src: 'S08 · BK p.125–143',
  lessons: [
    {
      id: 'ch8-l1', title: 'Electric charge & Coulomb\'s law', ar: 'الشحنة الكهربائية وقانون كولوم', src: 'S08 §1–2 · BK p.125–130',
      goals: ['Describe charging by friction, contact, induction', 'Compute F = {{k q₁q₂ // r²}}', 'Find the net force from several charges'],
      goalsAr: 'ستتعرف طرق الشحن وتحسب القوة الكهربائية بين شحنتين ومحصلة عدة قوى.',
      why: { en: 'Laser printers and paint sprayers use electrostatic forces (BK p.125).', ar: 'الطابعات الليزرية وبخاخات الطلاء تستخدم القوى الكهروستاتيكية.' },
      explain: [
        { en: 'Two kinds of charge: negative (electron) and positive (proton). e = 1.6×10⁻¹⁹ C. Like charges repel, unlike attract.', ar: 'نوعان من الشحنات؛ المتشابهة تتنافر والمختلفة تتجاذب.' },
        { en: 'Charging: friction (electrons transfer), contact (charge shared), induction without contact.', ar: 'الشحن بالدلك والتلامس والحث.' },
        { en: 'Coulomb\'s law: "the magnitude of electrical force between two charged particles is directly proportional to the product … (q₁q₂) and inversely with the square of the distance (r²)": F = {{k_e q₁q₂ // r²}}, k_e = {{1 // 4πε₀}} ≈ 9×10⁹ N·m²/C² (8.1).', ar: 'قانون كولوم: القوة تتناسب مع حاصل ضرب الشحنتين وعكسيًا مع مربع المسافة.' },
        { en: 'Several charges: compute each force separately, then add as vectors (BK Ex 8.4).', ar: 'مع عدة شحنات نجمع القوى جمعًا اتجاهيًا.' }
      ],
      terms: [['Coulomb (C)', 'كولوم', 'Unit of charge'], ['Elementary charge e', 'الشحنة الأولية', '1.6×10⁻¹⁹ C'], ['Induction', 'الحث', 'Charging without contact'], ['Permittivity ε₀', 'السماحية', '8.85×10⁻¹² C²/N·m²']],
      formulas: [{ f: 'F = {{k_e |q₁ q₂| // r²}}', name: 'Coulomb (8.1)', sym: [['F', 'electric force', 'N', 'القوة الكهربائية'], ['k_e', 'Coulomb constant = {{1 // 4πε₀}} ≈ 9×10⁹', 'N·m²/C²', 'ثابت كولوم'], ['q₁, q₂', 'the two charges', 'C', 'الشحنتان'], ['r', 'distance between the charges', 'm', 'المسافة بين الشحنتين']], cond: 'Point charges. Use the sizes of the charges, then get the direction from their signs: like charges repel, unlike attract.' }],
      life: { en: 'A balloon rubbed on hair sticks to a wall by induction.', ar: 'البالون المدلوك بالشعر يلتصق بالجدار بالحث.' },
      worked: { src: 'S08 Ex 8.1 · BK p.128', q: 'Force between a sodium nucleus (Z = 11) and an electron 1.2×10⁻¹¹ m away?', steps: ['q₁ = 11×1.6×10⁻¹⁹ C, q₂ = 1.6×10⁻¹⁹ C', 'F = {{9×10⁹ × (17.6×10⁻¹⁹)(1.6×10⁻¹⁹) // (1.2×10⁻¹¹)²}}', 'F = 1.76×10⁻⁵ N (attractive)'], ans: '1.76 × 10⁻⁵ N' },
      tryit: { src: 'BK p.142 Exercise 3', q: '+10 μC and −6 μC, 0.5 cm apart in vacuum. Force magnitude?', ans: 21600, tol: 0.01, unit: 'N', hint: 'r = 0.005 m', sol: 'F = {{9×10⁹ × 60×10⁻¹² // 2.5×10⁻⁵}} = 21 600 N, attraction' },
      checks: [
        { q: 'Distance doubles → F becomes…', o: ['F/2', 'F/4', '2F', '4F'], a: 1, why: 'F ∝ {{1 // r²}}.' },
        { q: 'Repulsive force 2.4 N on +5 μC at 25 cm. Unknown charge? (S08 Ex 8.2)', o: ['+3.33 μC', '−3.33 μC', '+33 μC', '+0.33 μC'], a: 0, why: 'q = {{F r² // k q}}.' }
      ],
      mistakes: [['Forgetting to square r', 'F ∝ {{1 // r²}}.'], ['Not converting μC and cm', 'μC = 10⁻⁶ C, cm = 10⁻² m.']],
      summary: ['Like repel, unlike attract', 'F = {{k q₁q₂ // r²}}', 'Net force = vector sum'],
      quiz: [
        { q: 'Equal charges 3×10⁻⁵ C, 6 m apart. Distance from q₁ where force on q₃ is zero (BK Ex.1)?', num: 3, tol: 0, unit: 'm', sol: 'Equal charges → midpoint, 3 m' },
        { q: 'BK Ex 8.4: q_A = 3 μC between q_B = 5 μC (2 cm) and q_C = 12 μC (5 cm). Net force on A?', num: 207.9, tol: 0.01, unit: 'N', sol: '337.5 − 129.6 = 207.9 N' }
      ]
    },
    {
      id: 'ch8-l2', title: 'Electric field', ar: 'المجال الكهربائي', src: 'S08 §3 · BK p.130–131',
      goals: ['Compute E = {{F // q_t}} = {{k q // r²}}', 'Draw field lines'],
      goalsAr: 'ستحسب شدة المجال الكهربائي وترسم خطوطه.',
      why: { en: 'The field tells the force on any charge placed at a point, without knowing that charge first.', ar: 'المجال يحدد القوة على أي شحنة توضع في النقطة.' },
      explain: [
        { en: '"The electrical field at a point is defined as the electrical force affecting a positive point‑test charge of the unit placed at that point": E = {{F // q_t}} = {{k_e q // r²}} (8.2). Unit N/C.', ar: 'المجال = القوة على وحدة الشحنات الموجبة.' },
        { en: 'Direction: away from + charges, toward − charges. Field lines: density ∝ field strength (Faraday) (Fig 8.6).', ar: 'خطوط المجال تخرج من الموجب وتدخل السالب، وكثافتها تدل على الشدة.' }
      ],
      terms: [['Electric field', 'المجال الكهربائي', 'Force per unit positive charge'], ['Test charge', 'شحنة الاختبار', 'Small positive charge'], ['Field lines', 'خطوط المجال', 'Visual representation']],
      formulas: [{ f: 'E = {{F // q_t}} = {{k_e q // r²}}', name: '(8.2)', sym: [['E', 'electric field', 'N/C', 'المجال الكهربائي'], ['F', 'force on the test charge', 'N', 'القوة على شحنة الاختبار'], ['q_t', 'test charge', 'C', 'شحنة الاختبار'], ['q', 'charge that makes the field', 'C', 'الشحنة المولّدة للمجال'], ['r', 'distance from q', 'm', 'البعد عن الشحنة']], cond: 'kq/r² is for a point charge. E points away from + charges and toward − charges.' }],
      life: { en: 'Thunderclouds create fields strong enough to ionise air → lightning.', ar: 'السحب الرعدية تولد مجالًا يؤين الهواء فيحدث البرق.' },
      worked: { src: 'S08 Ex 8.3 · BK p.131', q: 'Field 5 m from +10 μC?', steps: ['E = {{9×10⁹ × 10×10⁻⁶ // 5²}}', 'E = 3600 N/C, away from the charge'], ans: '3600 N/C' },
      tryit: { src: 'BK p.142 Exercise 2', q: 'Field 3.5 cm from +2 μC?', ans: 1.469e7, tol: 0.01, unit: 'N/C', hint: 'r = 0.035 m', sol: 'E = {{9×10⁹ × 2×10⁻⁶ // (0.035)²}} = 1.47×10⁷ N/C' },
      checks: [{ q: 'Field lines of a negative charge point…', o: ['outward', 'inward', 'in circles'], a: 1, why: 'Toward − charges.' }],
      mistakes: [['Using the test charge in E = {{kq // r²}}', 'q is the source charge.']],
      summary: ['E = {{F // q_t}}', 'E = {{kq // r²}}', 'Out of +, into −'],
      quiz: [{ q: 'A 2 μC charge feels 0.04 N. E = ?', num: 20000, tol: 0, unit: 'N/C', sol: '🧩 E = {{0.04 // 2×10⁻⁶}} = 2×10⁴ N/C' }]
    },
    {
      id: 'ch8-l3', title: 'Electric potential', ar: 'الجهد الكهربائي', src: 'S08 §4 · BK p.131–135',
      goals: ['Use ΔV = {{W // q_t}} and ΔV = Ed', 'Compute V = {{kq // r}} and sum potentials'],
      goalsAr: 'ستحسب فرق الجهد في مجال منتظم وجهد شحنة نقطية ومجموع الجهود.',
      why: { en: 'Batteries and sockets are rated in volts: potential is how electric energy is delivered.', ar: 'البطاريات تُقاس بالفولت، والجهد هو طريقة نقل الطاقة الكهربائية.' },
      explain: [
        { en: 'ΔV = V_A − V_B = {{W // q_t}}: work per unit positive charge moved against the field (8.3). 1 V = 1 J/C.', ar: 'فرق الجهد = الشغل لكل وحدة شحنة.' },
        { en: 'Uniform field (between plates): ΔV = Ed (8.4).', ar: 'في المجال المنتظم ΔV = Ed.' },
        { en: 'Point charge: V = {{k_e q // r}} (8.5), a scalar with sign. Several charges: add algebraically.', ar: 'جهد الشحنة النقطية كمية قياسية بإشارة، وتُجمع جبريًا.' }
      ],
      terms: [['Potential difference', 'فرق الجهد', 'Volt'], ['Electric potential', 'الجهد الكهربائي', 'Work per unit charge from infinity'], ['Volt', 'الفولت', 'J/C']],
      formulas: [{ f: 'ΔV = {{W // q_t}} = E d', name: '(8.3–8.4)', sym: [['ΔV', 'potential difference', 'V', 'فرق الجهد'], ['W', 'work to move the charge', 'J', 'الشغل'], ['q_t', 'test charge', 'C', 'شحنة الاختبار'], ['E', 'uniform field', 'N/C = V/m', 'المجال المنتظم'], ['d', 'distance along the field', 'm', 'المسافة باتجاه المجال']], cond: 'Ed for a uniform field.' }, { f: 'V = {{k_e q // r}}', name: '(8.5)', sym: [['V', 'potential', 'V', 'الجهد'], ['q', 'point charge, with its sign', 'C', 'الشحنة بإشارتها'], ['r', 'distance from the charge', 'm', 'البعد عن الشحنة']], cond: 'Point charge, V(∞) = 0.' }],
      life: { en: 'A 9 V battery gives each coulomb 9 J of energy.', ar: 'بطارية 9 فولت تعطي كل كولوم 9 جول.' },
      worked: { src: 'BK Ex 8.5 p.134–135', q: 'q₁ = −2 μC at origin, q₂ = +9 μC at 4 cm on y. V at P (6 cm on x)?', steps: ['V₁ = {{9×10⁹ × (−2×10⁻⁶) // 0.06}} = −3×10⁵ V', 'r₂ = √(0.06² + 0.04²) = 0.0721 m → V₂ = {{9×10⁹ × 9×10⁻⁶ // 0.0721}} = 11.23×10⁵ V', 'V = 8.23×10⁵ V'], ans: '8.23 × 10⁵ V' },
      tryit: { src: 'BK p.142 Exercise 4', q: 'Moving 25 μC 10 cm against a uniform field raises its energy by 4 mJ. ΔV = ?', ans: 160, tol: 0.01, unit: 'V', hint: 'ΔV = {{W // q}}', sol: 'ΔV = {{4×10⁻³ // 25×10⁻⁶}} = 160 V; E = {{160 // 0.1}} = 1600 V/m' },
      checks: [
        { q: 'Plates 0.2 cm apart, E = 1000 N/C (S08 Ex 8.5). ΔV?', o: ['2 V', '200 V', '0.2 V', '2000 V'], a: 0, why: '1000·0.002.' },
        { q: 'V of −2 μC at 6 cm (S08)?', o: ['−3×10⁵ V', '3×10⁵ V', '−5×10⁶ V', '0'], a: 0, why: 'Sign kept.' }
      ],
      mistakes: [['Adding potentials as vectors', 'Potential is scalar: add with signs.'], ['Using r² in V', 'V ∝ {{1 // r}}, E ∝ {{1 // r²}}.']],
      summary: ['ΔV = {{W // q}}', 'ΔV = Ed', 'V = {{kq // r}} (scalar)'],
      quiz: [{ q: 'V at 1 m from 8 μC (BK Ex.5)?', num: 72000, tol: 0, unit: 'V', sol: 'V = {{9×10⁹ × 8×10⁻⁶ // 1}} = 7.2×10⁴ V' }]
    },
    {
      id: 'ch8-l4', title: 'Capacitors: capacitance, combinations, energy', ar: 'المكثفات: السعة والتوصيل والطاقة', src: 'S08 §5 · BK p.135–141',
      goals: ['Use Q = CV and C = ε₀A/d', 'Combine capacitors in series/parallel', 'Compute stored energy'],
      goalsAr: 'ستحسب السعة وتوصيل المكثفات والطاقة المخزنة.',
      why: { en: 'Camera flashes and defibrillators store energy in capacitors.', ar: 'فلاش الكاميرا وجهاز إنعاش القلب يخزنان الطاقة في مكثفات.' },
      explain: [
        { en: 'Q ∝ V → Q = CV (8.6). Capacitance C (farad, F = C/V): "the amount of electrical charge accumulated on the capacitor plate when a unit difference of voltage is applied".', ar: 'السعة = الشحنة لكل وحدة جهد.' },
        { en: 'Parallel plates: C = {{ε₀A // d}} (8.7), ε₀ = 8.85×10⁻¹² C²/N·m².', ar: 'سعة المكثف المستوي تزيد بالمساحة وتقل بالمسافة.' },
        { en: 'Series: same Q, V adds → {{1 // C_eq}} = Σ{{1 // Cᵢ}} (8.8). Parallel: same V, Q adds → C_eq = ΣCᵢ (8.9). (Opposite to resistors!)', ar: 'التوالي: نفس الشحنة. التوازي: نفس الجهد. عكس المقاومات.' },
        { en: 'Energy: U = {{Q² // 2C}} = ½CV² = ½QV (8.10).', ar: 'الطاقة المخزنة ½CV².' }
      ],
      terms: [['Capacitance', 'السعة', 'C = Q/V'], ['Farad', 'الفاراد', 'C/V'], ['Dielectric', 'العازل', 'Insulator between plates'], ['Series / parallel', 'توالي / توازي', 'Connection types']],
      formulas: [
        { f: 'Q = C V ,  C = {{ε₀ A // d}}', name: '(8.6–8.7)', sym: [['Q', 'charge on one plate', 'C', 'شحنة اللوح'], ['C', 'capacitance', 'F', 'السعة'], ['V', 'voltage between the plates', 'V', 'فرق الجهد'], ['ε₀', 'permittivity of free space 8.85×10⁻¹²', 'C²/N·m²', 'سماحية الفراغ'], ['A', 'plate area', 'm²', 'مساحة اللوح'], ['d', 'separation', 'm', 'المسافة بين اللوحين']], cond: 'Vacuum between plates.' },
        { f: 'Series: {{1 // C_eq}} = {{1 // C₁}} + {{1 // C₂}} + …   ·   Parallel: C_eq = C₁ + C₂ + …', name: '(8.8–8.9)', sym: [['C_eq', 'equivalent capacitance', 'F', 'السعة المكافئة'], ['C₁, C₂', 'each capacitor', 'F', 'سعة كل مكثف']], cond: 'Series: same Q on each. Parallel: same V on each.' },
        { f: 'U = ½ C V² = {{Q² // 2C}} = ½ Q V', name: '(8.10)', sym: [['U', 'stored energy', 'J', 'الطاقة المخزنة'], ['C', 'capacitance', 'F', 'السعة'], ['V', 'voltage', 'V', 'فرق الجهد'], ['Q', 'charge', 'C', 'الشحنة']], cond: '—' }
      ],
      life: { en: 'A phone touchscreen detects your finger as a change in capacitance.', ar: 'شاشة اللمس تكتشف إصبعك من تغير السعة.' },
      worked: { src: 'S08 Ex 8.9 · BK p.140–141', q: 'C₁ = C₂ = 6 μF in parallel, then in series with C₃ = 12 μF, V = 50 V. C_t, Q_t, charges?', steps: ['C₁₂ = 12 μF', '{{1 // C_t}} = {{1 // 12}} + {{1 // 12}} = {{2 // 12}} → C_t = 6 μF', 'Q_t = 6×10⁻⁶·50 = 3×10⁻⁴ C = Q₃', 'V₃ = V₁₂ = 25 V → Q₁ = Q₂ = 1.5×10⁻⁴ C'], ans: 'C_t = 6 μF, Q_t = 3×10⁻⁴ C' },
      tryit: { src: 'BK p.143 Exercise 8', q: 'Two capacitors: series 10 μF, parallel 45 μF. Larger capacitance?', ans: 30, tol: 0.01, unit: 'μF', hint: 'C₁ + C₂ = 45, C₁C₂ = 450', sol: 'Roots of x² − 45x + 450 = 0: 30 μF and 15 μF' },
      checks: [
        { q: '10 cm × 10 cm plates, 0.2 cm apart, vacuum (S08 Ex 8.7). C?', o: ['4.42×10⁻¹¹ F', '4.42×10⁻⁹ F', '8.85×10⁻¹² F', '0.05 F'], a: 0, why: 'C = {{ε₀A // d}}.' },
        { q: '20 μF at 1000 V. U? (S08 Ex 8.8)', o: ['10 J', '20 J', '0.01 J', '1000 J'], a: 0, why: '½·20×10⁻⁶·10⁶.' }
      ],
      mistakes: [['Using resistor rules for capacitors', 'Capacitors: parallel adds directly.']],
      summary: ['Q = CV, C = {{ε₀A // d}}', 'Series: same Q; parallel: same V', 'U = ½CV²'],
      quiz: [
        { q: 'Three 10 μF in series (BK Ex.9). C_eq?', num: 3.33, tol: 0.01, unit: 'μF', sol: 'C_eq = {{10 // 3}} = 3.33 μF' },
        { q: 'A = 0.1 m², d = 0.01 m, vacuum (BK Ex.6). C in pF?', num: 88.5, tol: 0.01, unit: 'pF', sol: 'C = {{8.85×10⁻¹² × 0.1 // 0.01}} = 8.85×10⁻¹¹ F = 88.5 pF' },
        { q: 'C₁, 5C₁, 5C₁ in series on 30 V (BK Ex.7). V across C₁?', num: 21.43, tol: 0.01, unit: 'V', sol: 'V ∝ 1/C → V₁ : V₂ : V₃ = 1 : 0.2 : 0.2 → V₁ = {{30 // 1.4}} = 21.4 V, V₂ = V₃ = 4.29 V' }
      ]
    }
  ]
});

COURSE.push({
  id: 'ch9', n: 9, title: 'Current and Resistance', ar: 'التيار والمقاومة', src: 'S09U (supersedes S09) · BK p.147–158',
  lessons: [
    {
      id: 'ch9-l1', title: 'Electric current & current density', ar: 'التيار الكهربائي وكثافة التيار', src: 'S09U §1 · BK p.147–149',
      goals: ['Compute I = {{Δq // Δt}}', 'Use I = nevA and J = {{I // A}} = nev', 'Find drift speed'],
      goalsAr: 'ستحسب شدة التيار وكثافته وسرعة الانجراف.',
      why: { en: 'Choosing wire thickness for a home appliance depends on current density.', ar: 'اختيار سمك سلك الجهاز يعتمد على كثافة التيار.' },
      explain: [
        { en: 'S09U: "The electric current is defined as the rate of flow of electric charge through the conductor. The direction of the current is opposite the direction of flow of electrons." I = {{dq // dt}}; 1 A = 1 C/s (9.1).', ar: 'التيار معدل تدفق الشحنة، واتجاهه عكس حركة الإلكترونات.' },
        { en: '⚠ The older S09 says "rate of flow of negative charges"; use S09U (gap G‑13).', ar: 'تنبيه: اعتمد تعريف الملف المحدَّث.' },
        { en: 'Microscopic: Δq = nevAΔt → I = nevA (9.2); J = {{I // A}} = nev (9.3) in A/m²; n = {{ρN_A // A_mass}} for one free electron per atom.', ar: 'الصيغة المجهرية للتيار وكثافته.' }
      ],
      terms: [['Current', 'التيار', 'Ampere'], ['Current density', 'كثافة التيار', 'A/m²'], ['Drift speed', 'سرعة الانجراف', 'v of carriers'], ['Charge carriers', 'حاملات الشحنة', 'Free electrons']],
      formulas: [{ f: 'I = {{dq // dt}} = n e v A', name: '(9.1–9.2)', sym: [['I', 'current', 'A', 'التيار'], ['q', 'charge', 'C', 'الشحنة'], ['t', 'time', 's', 'الزمن'], ['n', 'free electrons per m³', 'm⁻³', 'عدد الإلكترونات الحرة في المتر المكعب'], ['e', 'electron charge 1.6×10⁻¹⁹', 'C', 'شحنة الإلكترون'], ['v', 'drift speed', 'm/s', 'سرعة الانجراف'], ['A', 'cross‑section area', 'm²', 'مساحة المقطع']], cond: 'Average current: I = {{Δq // Δt}}.' }, { f: 'J = {{I // A}} = n e v', name: '(9.3)', sym: [['J', 'current density', 'A/m²', 'كثافة التيار'], ['I', 'current', 'A', 'التيار'], ['A', 'cross‑section area', 'm²', 'مساحة المقطع']], cond: '—' }],
      life: { en: 'Electrons drift slower than a snail (~10⁻⁴ m/s), yet lights switch on instantly because the field travels fast.', ar: 'الإلكترونات تنجرف ببطء شديد، لكن المجال ينتشر بسرعة فتضيء المصابيح فورًا.' },
      worked: { src: 'BK Ex 9.3 p.149', q: 'Copper wire A = 2×10⁻⁶ m², I = 8 A, n = 8×10²⁸ m⁻³. J and v?', steps: ['J = {{I // A}} = {{8 // 2×10⁻⁶}} = 4×10⁶ A/m²', 'v = {{J // ne}} = {{4×10⁶ // 8×10²⁸ × 1.6×10⁻¹⁹}}', 'v = 3.13×10⁻⁴ m/s'], ans: 'v = 3.13 × 10⁻⁴ m/s' },
      tryit: { src: 'S09U Ex 9.2 (see G‑12)', q: '2 A through a cross‑section of 0.1 cm². J = ?', ans: 200000, tol: 0.01, unit: 'A/m²', hint: '1 cm² = 10⁻⁴ m², so A = 1×10⁻⁵ m²', sol: 'J = {{2 // 10⁻⁵}} = 2×10⁵ A/m² (the slides convert with 10⁻² and print 2000 A/m²)' },
      checks: [{ q: '10 C in 50 ms (Ex 9.1). I?', o: ['200 A', '0.5 A', '500 A', '20 A'], a: 0, why: 'I = {{10 // 0.05}} = 200 A.' }],
      mistakes: [['Converting cm² with 10⁻²', 'cm² → 10⁻⁴ m².']],
      summary: ['I = {{dq // dt}}', 'I = nevA', 'J = {{I // A}} = nev'],
      quiz: [
        { q: '40 Ah battery at 0.5 A (BK Ex.1). Hours?', num: 80, tol: 0, unit: 'h', sol: 't = {{40 // 0.5}} = 80 h' },
        { q: 'Copper wire r = 1 mm, I = 4 A, n = 8.5×10²⁸ (BK Ex.4). Drift speed?', num: 9.36e-5, tol: 0.02, unit: 'm/s', sol: 'J = 1.27×10⁶ A/m² → v = 9.36×10⁻⁵ m/s' }
      ]
    },
    {
      id: 'ch9-l2', title: 'Ohm\'s law & resistivity', ar: 'قانون أوم والمقاومية', src: 'S09U §2 · BK p.149–152',
      goals: ['Use V = RI', 'Use R = {{ρℓ // A}} and ρ = {{1 // σ}}'],
      goalsAr: 'ستطبق قانون أوم وتحسب المقاومة من أبعاد السلك.',
      why: { en: 'Every circuit calculation starts from V = RI.', ar: 'كل حسابات الدوائر تبدأ من V = RI.' },
      explain: [
        { en: 'Ohm\'s law: "the voltage difference between the two ends of a conductor is proportional to the intensity of the electrical current passing through it, when its temperature is constant": V = RI (9.5). 1 Ω = 1 V/A.', ar: 'قانون أوم عند ثبوت درجة الحرارة.' },
        { en: 'Microscopic form J = σE. Resistivity ρ = {{1 // σ}} (Ω·m).', ar: 'المقاومية مقلوب الموصلية.' },
        { en: 'R = {{ρℓ // A}} (9.4): ∝ length, ∝ {{1 // area}}. Doubling both length and radius halves R (Ex 9.4).', ar: 'المقاومة تزيد بالطول وتقل بالمساحة.' }
      ],
      terms: [['Resistance', 'المقاومة', 'Ω'], ['Resistivity ρ', 'المقاومة النوعية', 'Ω·m'], ['Conductivity σ', 'الموصلية', '1/(Ω·m)'], ['Ohmic', 'أومي', 'Obeys V ∝ I']],
      formulas: [{ f: 'V = R I', name: '(9.5)', sym: [['V', 'voltage', 'V', 'فرق الجهد'], ['R', 'resistance', 'Ω', 'المقاومة'], ['I', 'current', 'A', 'التيار']], cond: 'Constant temperature.' }, { f: 'R = {{ρ ℓ // A}} ,  ρ = {{1 // σ}}', name: '(9.4)', sym: [['R', 'resistance', 'Ω', 'المقاومة'], ['ρ', 'resistivity', 'Ω·m', 'المقاومية'], ['ℓ', 'length', 'm', 'الطول'], ['A', 'cross‑section area = πr²', 'm²', 'مساحة المقطع'], ['σ', 'conductivity', '(Ω·m)⁻¹', 'الموصلية']], cond: 'A uses the radius: r = d/2.' }],
      life: { en: 'Extension cords for heaters are thick: a larger A means less resistance and less heating.', ar: 'تمديدات السخانات سميكة لتقليل المقاومة.' },
      worked: { src: 'S09U Ex 9.5 · BK p.152 (see G‑11)', q: 'Nichrome wire 1 m, "0.2 mm diameter", ρ = 10⁻⁶ Ω·m, 20 V. R and I?', steps: ['Source solution uses r = 0.2 mm: R = {{10⁻⁶ × 1 // π × (0.2×10⁻³)²}} = 7.96 Ω → I = {{20 // 7.96}} = 2.5 A', 'If 0.2 mm is the diameter, r = 0.1 mm: R = 31.8 Ω → I = 0.63 A'], ans: 'Source: 7.96 Ω, 2.5 A', note: 'Ask your instructor which reading is intended (G‑11).' },
      tryit: { src: 'BK p.158 Exercise 3', q: 'Silver 10 cm long across 20 V, ρ = 1.59×10⁻⁸ Ω·m. Current density?', ans: 1.258e10, tol: 0.02, unit: 'A/m²', hint: 'E = {{V // ℓ}}, J = {{E // ρ}}', sol: 'E = {{20 // 0.1}} = 200 V/m → J = {{200 // 1.59×10⁻⁸}} = 1.26×10¹⁰ A/m²' },
      checks: [{ q: 'Doubling length and radius makes R…', o: ['double', 'half', '4×', 'same'], a: 1, why: 'ℓ×2, A×4 → R/2 (Ex 9.4).' }],
      mistakes: [['Using diameter for r', 'Halve it.']],
      summary: ['V = RI', 'R = {{ρℓ // A}}', 'σ = {{1 // ρ}}'],
      quiz: [
        { q: 'Iron ρ = 10×10⁻⁸ Ω·m (BK Ex.2). σ = ?', num: 1e7, tol: 0.01, unit: 'S/m', sol: 'σ = {{1 // 10⁻⁷}} = 10⁷ (Ω·m)⁻¹' },
        { q: 'Nichrome wire 48 Ω on 240 V (BK Ex.8). I = ?', num: 5, tol: 0, unit: 'A', sol: 'I = {{240 // 48}} = 5 A' }
      ]
    },
    {
      id: 'ch9-l3', title: 'Electric power', ar: 'القدرة الكهربائية', src: 'S09U §3 · BK p.153',
      goals: ['Use P = VI = RI² = {{V² // R}}'],
      goalsAr: 'ستحسب القدرة الكهربائية بالصيغ الثلاث.',
      why: { en: 'Electricity bills charge for energy = power × time.', ar: 'فاتورة الكهرباء تحسب الطاقة = القدرة × الزمن.' },
      explain: [
        { en: 'Power: energy per unit time to move charges: P = {{W // Δt}} = {{QV // Δt}} = VI (9.6).', ar: 'القدرة الكهربائية = VI.' },
        { en: 'With Ohm\'s law: P = RI² = {{V² // R}}. Choose the form that uses the known quantities.', ar: 'اختر الصيغة حسب المعطيات.' }
      ],
      terms: [['Electric power', 'القدرة الكهربائية', 'Watt'], ['Kilowatt‑hour', 'كيلوواط ساعة', '3.6×10⁶ J (Appendix)']],
      formulas: [{ f: 'P = V I = R I² = {{V² // R}}', name: '(9.6)', sym: [['P', 'power', 'W', 'القدرة'], ['V', 'voltage', 'V', 'الجهد'], ['I', 'current', 'A', 'التيار'], ['R', 'resistance', 'Ω', 'المقاومة']], cond: 'Use the V and I of the same device.' }],
      life: { en: 'A 2000 W kettle on 230 V draws about 8.7 A.', ar: 'غلاية 2000 واط على 230 فولت تسحب 8.7 أمبير.' },
      worked: { src: 'S09U Ex 9.6 · BK p.153', q: '8 Ω heater on 120 V. I and P?', steps: ['I = {{V // R}} = {{120 // 8}} = 15 A', 'P = {{V² // R}} = {{120² // 8}} = 1800 W'], ans: '15 A, 1800 W' },
      tryit: { src: 'BK p.158 Exercise 5', q: '480 Ω bulb on 240 V. Power?', ans: 120, tol: 0, unit: 'W', hint: 'P = {{V² // R}}', sol: 'P = {{240² // 480}} = {{57 600 // 480}} = 120 W' },
      checks: [{ q: 'Oven 1800 W on 240 V (BK Ex.6). I?', o: ['7.5 A', '0.13 A', '432 A', '75 A'], a: 0, why: 'I = {{P // V}} = {{1800 // 240}} = 7.5 A.' }],
      mistakes: [['Using P = {{V² // R}} with the wrong V', 'V across that resistor.']],
      summary: ['P = VI', 'P = I²R = {{V² // R}}'],
      quiz: [{ q: 'Same oven: resistance?', num: 32, tol: 0, unit: 'Ω', sol: 'R = {{V² // P}} = {{57 600 // 1800}} = 32 Ω' }]
    },
    {
      id: 'ch9-l4', title: 'Resistors in series and parallel', ar: 'توصيل المقاومات على التوالي والتوازي', src: 'S09U §4 · BK p.154–157',
      goals: ['Combine resistors', 'Solve mixed networks and branch currents'],
      goalsAr: 'ستحسب المقاومة المكافئة لدوائر التوالي والتوازي والمختلطة.',
      why: { en: 'House outlets are in parallel so each device gets the full voltage.', ar: 'مقابس المنزل على التوازي ليحصل كل جهاز على الجهد كاملًا.' },
      explain: [
        { en: 'Series: same current; ΔV = IR₁ + IR₂ → R_eq = R₁ + R₂ + … (9.7).', ar: 'التوالي: نفس التيار، والمقاومات تُجمع.' },
        { en: 'Parallel: same voltage; I = I₁ + I₂ → {{1 // R_eq}} = {{1 // R₁}} + {{1 // R₂}} + … (9.8).', ar: 'التوازي: نفس الجهد، ونجمع المقلوبات.' },
        { en: 'Mixed: simplify step by step from the innermost group (Ex 9.9).', ar: 'المختلطة: بسّط خطوة خطوة.' }
      ],
      terms: [['Series', 'توالي', 'One path'], ['Parallel', 'توازي', 'Several branches'], ['Equivalent resistance', 'المقاومة المكافئة', 'R_eq']],
      formulas: [{ f: 'Series: R_eq = R₁ + R₂ + …   ·   Parallel: {{1 // R_eq}} = {{1 // R₁}} + {{1 // R₂}} + …', name: '(9.7–9.8)', sym: [['R_eq', 'equivalent resistance', 'Ω', 'المقاومة المكافئة'], ['R₁, R₂', 'each resistor', 'Ω', 'كل مقاومة']], cond: 'Series: same I in each. Parallel: same V on each.' }],
      life: { en: 'Old Christmas lights in series all go dark when one bulb fails.', ar: 'أضواء الزينة القديمة على التوالي تنطفئ كلها إذا تعطل مصباح.' },
      worked: { src: 'S09U Ex 9.9 · BK p.156–157', q: 'R₁ = 10 Ω in series with [ (R₂ = 5 + R₃ = 5) ∥ R₄ = 10 ], 15 V between a and c.', steps: ['R₂₃ = 10 Ω', '{{1 // R₂₃₄}} = {{1 // 10}} + {{1 // 10}} → R₂₃₄ = 5 Ω', 'R_ac = 10 + 5 = 15 Ω → I = 1 A, 0.5 A in each branch'], ans: '15 Ω, 1 A' },
      tryit: { src: 'BK p.158 Exercise 7', q: 'A 50 Ω wire is cut into five equal parts connected in parallel. R_eq?', ans: 2, tol: 0, unit: 'Ω', hint: 'Each part 10 Ω', sol: 'R_eq = {{R // n}} = {{10 // 5}} = 2 Ω' },
      checks: [
        { q: '18, 12, 6 Ω in series (Ex 9.7)?', o: ['36 Ω', '3.3 Ω', '12 Ω', '6 Ω'], a: 0, why: 'Sum.' },
        { q: 'Same in parallel (Ex 9.8)?', o: ['3.3 Ω', '36 Ω', '11 Ω', '0.3 Ω'], a: 0, why: '{{1 // R}} = {{1 // 18}} + {{1 // 12}} + {{1 // 6}} = {{11 // 36}} → R = {{36 // 11}} = 3.3 Ω.' }
      ],
      mistakes: [['Forgetting to invert 1/R_eq', 'Take the reciprocal at the end.']],
      summary: ['Series adds R', 'Parallel adds {{1 // R}}', 'R_parallel < smallest R'],
      quiz: [{ q: 'Two 6 Ω in parallel then 3 Ω in series. R_eq?', num: 6, tol: 0, unit: 'Ω', sol: '🧩 3 + 3 = 6 Ω' }]
    }
  ]
});

COURSE.push({
  id: 'ch10', n: 10, title: 'Light', ar: 'الضوء', src: 'S10 · BK p.161–174',
  lessons: [
    {
      id: 'ch10-l1', title: 'Nature of light & reflection', ar: 'طبيعة الضوء والانعكاس', src: 'S10 §1–2 · BK p.161–164',
      goals: ['Summarise the particle–wave history', 'State the two laws of reflection', 'Compute deviation by two mirrors'],
      goalsAr: 'ستتعرف تاريخ طبيعة الضوء وقانوني الانعكاس.',
      why: { en: 'Mirrors in cars, periscopes and road signs (retro‑reflection) use reflection.', ar: 'المرايا وإشارات الطريق العاكسة تستخدم الانعكاس.' },
      explain: [
        { en: 'Newton: particles; Huygens (1678): waves; Young (1801): interference; Hertz (1887): EM waves; Planck (1900) & Einstein (1905): photons → light has a dual nature.', ar: 'الضوء له طبيعة مزدوجة: موجية وجسيمية.' },
        { en: 'Laws of reflection: (1) incident ray, reflected ray and normal lie in one plane; (2) θ₁ = θ₂ (10.1), angles measured from the normal.', ar: 'زاوية السقوط = زاوية الانعكاس، وتُقاس من العمود المقام.' },
        { en: 'Regular reflection (smooth mirror) vs diffuse reflection (rough surface).', ar: 'الانعكاس المنتظم والانعكاس المنتشر.' },
        { en: 'Two mirrors at angle Φ: total deviation = 360° − 2Φ; at 90° the ray returns (retro‑reflection) (BK p.164–165).', ar: 'مرآتان بزاوية Φ: الانحراف 360 − 2Φ.' }
      ],
      terms: [['Normal', 'العمود المقام', 'Line ⟂ to surface'], ['Angle of incidence', 'زاوية السقوط', 'θ₁'], ['Diffuse reflection', 'الانعكاس المنتشر', 'From rough surfaces'], ['Photon', 'الفوتون', 'Light quantum']],
      formulas: [{ f: 'θ₁ = θ₂', name: 'Law of reflection (10.1)', sym: [['θ', 'angle from the normal', '°']], cond: '—' }],
      life: { en: 'Bicycle reflectors use corner mirrors to send light back to the car.', ar: 'عاكسات الدراجة ترد الضوء إلى السيارة.' },
      worked: { src: 'S10 Ex 10.1 · BK p.164', q: 'Two mirrors at 90°. Total deviation?', steps: ['First reflection deviates 180° − 2θ', 'Second: 180° − 2(90° − θ)', 'Total = 360° − 180° = 180°'], ans: '180°' },
      tryit: { src: 'BK p.174 Exercise 9', q: 'Mirrors at 120°. Total deviation?', ans: 120, tol: 0, unit: '°', hint: '360 − 2Φ', sol: '360 − 240 = 120°' },
      checks: [{ q: 'Angles of incidence are measured from…', o: ['the surface', 'the normal', 'the horizon'], a: 1, why: 'Always from the normal.' }],
      mistakes: [['Measuring from the mirror surface', 'Use the normal.']],
      summary: ['Dual nature', 'θᵢ = θᵣ', 'Deviation 360 − 2Φ'],
      quiz: [{ q: 'A ray hits a mirror at 35° to the surface. Angle of reflection (from normal)?', num: 55, tol: 0, unit: '°', sol: '🧩 90 − 35 = 55°' }]
    },
    {
      id: 'ch10-l2', title: 'Refraction & Snell\'s law', ar: 'الانكسار وقانون سنل', src: 'S10 §3 · BK p.165–170',
      goals: ['Use n = c/v and n₁ sin θ₁ = n₂ sin θ₂', 'Find wavelength in a medium λₙ = λ/n'],
      goalsAr: 'ستطبق قانون سنل وتحسب سرعة الضوء وطوله الموجي في الوسط.',
      why: { en: 'Glasses, cameras and the apparent depth of pools come from refraction.', ar: 'النظارات والكاميرات وظاهرة العمق الظاهري سببها الانكسار.' },
      explain: [
        { en: 'Refraction laws: incident, reflected, refracted rays and the normal lie in one plane; sin θ₁/sin θ₂ = v₁/v₂ (10.2).', ar: 'نسبة الجيبين = نسبة السرعتين.' },
        { en: 'Refractive index n = c/v (> 1). Snell: n₁ sin θ₁ = n₂ sin θ₂ (10.3). Vacuum n = 1.', ar: 'معامل الانكسار وقانون سنل.' },
        { en: 'Frequency does not change between media; therefore n = λ/λₙ and n₁λ₁ = n₂λ₂.', ar: 'التردد لا يتغير، فيتغير الطول الموجي.' },
        { en: 'Into a denser medium the ray bends toward the normal; the path is reversible (Fig 10.6).', ar: 'عند الدخول لوسط أكبر معاملًا ينكسر مقتربًا من العمود.' }
      ],
      terms: [['Refraction', 'الانكسار', 'Change of direction at a boundary'], ['Refractive index', 'معامل الانكسار', 'n = c/v'], ['Snell\'s law', 'قانون سنل', 'n₁ sin θ₁ = n₂ sin θ₂']],
      formulas: [{ f: 'n = {{c // v}} = {{λ // λₙ}}', name: 'Refractive index', sym: [['c', '3×10⁸ m/s', 'm/s'], ['λₙ', 'wavelength in medium', 'm']], cond: 'f constant.' }, { f: 'n₁ sin θ₁ = n₂ sin θ₂', name: 'Snell (10.3)', sym: [['θ', 'angle from normal', '°']], cond: '—' }],
      life: { en: 'A straw looks bent in a glass of water.', ar: 'الماصة تبدو مكسورة في كوب الماء.' },
      worked: { src: 'S10 Ex 10.3 · BK p.168–169', q: '589 nm, air → glass (n = 1.52) at 30°. θ₂, v, λₙ?', steps: ['θ₂ = sin⁻¹(sin30°/1.52) = 19.2°', 'v = 3×10⁸/1.52 = 1.97×10⁸ m/s', 'λₙ = 589/1.52 = 388 nm'], ans: '19.2°, 1.97×10⁸ m/s, 388 nm' },
      tryit: { src: 'BK p.174 Exercise 8', q: 'Air → medium n = 1.458 at θ₁ = 45°. θ₂?', ans: 29.0, tol: 0.01, unit: '°', hint: 'sin θ₂ = sin45°/1.458', sol: 'sin θ₂ = 0.485 → θ₂ = 29.0°' },
      checks: [
        { q: 'Air → water (1.33) at 30° (Ex 10.2). θ₂?', o: ['22°', '42°', '30°', '48.8°'], a: 0, why: 'sin⁻¹(0.376).' },
        { q: 'When light enters glass, what stays constant? (BK Ex.2)', o: ['speed', 'wavelength', 'frequency'], a: 2, why: 'f is set by the source.' }
      ],
      mistakes: [['Thinking frequency changes', 'Speed and wavelength change; f does not.']],
      summary: ['n = c/v', 'n₁ sin θ₁ = n₂ sin θ₂', 'λₙ = λ/n'],
      quiz: [
        { q: 'λ = 495 nm in air, 434 nm in liquid (BK Ex.1). n?', num: 1.141, tol: 0.01, unit: '', sol: '495/434 = 1.14' },
        { q: 'Glass n = 1.66 (BK Ex.6). Speed of light ×10⁸ m/s?', num: 1.807, tol: 0.01, unit: '×10⁸ m/s', sol: '3/1.66 = 1.81' },
        { q: 'He‑Ne 632.8 nm (BK Ex.4). Frequency ×10¹⁴ Hz?', num: 4.74, tol: 0.01, unit: '×10¹⁴ Hz', sol: 'f = c/λ = 4.74×10¹⁴ Hz' },
        { q: 'Same laser in glass n = 1.5 (BK Ex.5). λₙ?', num: 421.9, tol: 0.01, unit: 'nm', sol: '632.8/1.5' }
      ]
    },
    {
      id: 'ch10-l3', title: 'Dispersion & total internal reflection', ar: 'التشتت والانعكاس الكلي الداخلي', src: 'S10 §3 · BK p.170–172',
      goals: ['Explain dispersion and the rainbow', 'Compute the critical angle'],
      goalsAr: 'ستفسر تحلل الضوء وتحسب الزاوية الحرجة.',
      why: { en: 'Fibre‑optic internet relies on total internal reflection.', ar: 'الإنترنت بالألياف البصرية يعتمد على الانعكاس الكلي الداخلي.' },
      explain: [
        { en: 'Dispersion: n depends on λ; red has a smaller n than violet, so each colour refracts at a different angle (prism, rainbow).', ar: 'التشتت: معامل الانكسار يقل بزيادة الطول الموجي.' },
        { en: 'From larger n to smaller n the ray bends away from the normal. At θ₂ = 90° the incident angle is the critical angle: sin θ_c = n₂/n₁ (10.4).', ar: 'الزاوية الحرجة عند انكسار الشعاع موازيًا للسطح.' },
        { en: 'If θ₁ > θ_c, all light is reflected back: total internal reflection (only when n₁ > n₂).', ar: 'إذا زادت زاوية السقوط عن الحرجة يحدث انعكاس كلي.' }
      ],
      terms: [['Dispersion', 'التشتت (التحلل)', 'n depends on λ'], ['Critical angle', 'الزاوية الحرجة', 'sin θ_c = n₂/n₁'], ['Total internal reflection', 'الانعكاس الكلي الداخلي', 'θ₁ > θ_c']],
      formulas: [{ f: 'sin θ_c = {{n₂ // n₁}}', name: '(10.4)', sym: [['n₁', 'denser medium', '—'], ['n₂', 'less dense', '—']], cond: 'n₁ > n₂ only.' }],
      life: { en: 'Diamonds sparkle because their small critical angle (≈ 24°) traps light inside.', ar: 'يلمع الألماس لأن زاويته الحرجة صغيرة.' },
      worked: { src: 'S10 Ex 10.5 · BK p.172', q: 'Glass (n = 1.5) → air. θ_c?', steps: ['sin θ_c = 1/1.5 = 0.667', 'θ_c = 42°'], ans: '42°' },
      tryit: { src: 'BK p.174 Exercise 10', q: 'Water (n = 1.33) → air. θ_c?', ans: 48.75, tol: 0.01, unit: '°', hint: 'sin⁻¹(1/1.33)', sol: 'θ_c = 48.8°' },
      checks: [{ q: 'TIR can happen when light goes…', o: ['air → glass', 'glass → air', 'both'], a: 1, why: 'Needs n₁ > n₂.' }],
      mistakes: [['Swapping n₁ and n₂ in sin θ_c', 'Smaller over larger.']],
      summary: ['Red bends least', 'sin θ_c = n₂/n₁', 'TIR when θ > θ_c'],
      quiz: [{ q: 'Which colour has the largest refractive index in glass?', o: ['Red', 'Green', 'Violet'], a: 2, why: 'Shorter λ → larger n.' }]
    }
  ]
});
