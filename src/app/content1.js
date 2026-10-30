/* Physics Learning Lab — course content, chapters 1–3.
   Source codes: S01..S10 = slide decks, S09U = "Ch 9 Updated", BK p.N = textbook printed page.
   Fields named life / mistakes / checks / quiz and every tryit solution are additional design (🧩). */
window.COURSE = window.COURSE || [];

COURSE.push({
  id: 'ch1', n: 1, title: 'Units and Dimension', ar: 'الوحدات والأبعاد', src: 'S01 · BK p.13–21',
  lessons: [
    {
      id: 'ch1-l1', title: 'Physical quantities & SI units', ar: 'الكميات الفيزيائية ووحدات النظام الدولي', src: 'S01 §1–2 · BK p.13–15',
      goals: ['Distinguish fundamental from derived quantities', 'Name the 7 SI base units and their symbols', 'Use prefixes from nano to giga'],
      goalsAr: 'ستتعلم الفرق بين الكميات الأساسية والمشتقة، ووحدات النظام الدولي السبع، وبادئات الوحدات.',
      why: { en: 'Every number in physics is meaningless without a unit: "300" could be metres or kilometres (BK p.13: Bisha–Abha example).', ar: 'الرقم بلا وحدة لا معنى له؛ 300 قد تكون مترًا أو كيلومترًا، لذلك نبدأ بالوحدات قبل أي قانون.' },
      explain: [
        { en: '<b>Fundamental quantities</b> "are not expressed in terms of other physical quantities": length, mass, time, electric current, temperature, luminous intensity, amount of substance.', ar: 'الكميات الأساسية (Fundamental quantities) هي «حجر البناء» في الفيزياء: لا نعرّفها بكميات أخرى، بل نقيسها مباشرة. وعددها سبع: الطول، والكتلة، والزمن، والتيار الكهربائي، ودرجة الحرارة، وشدة الإضاءة، وكمية المادة.' },
        { en: '<b>Derived quantities</b> "are defined in terms of the fundamental physical quantities": volume, velocity, density, acceleration, energy, power…', ar: 'الكميات المشتقة (Derived quantities) نحصل عليها بتركيب الكميات الأساسية بالضرب أو القسمة. مثلًا: السرعة = طول ÷ زمن، والكثافة = كتلة ÷ حجم، والحجم = طول × طول × طول. فكل كمية في المقرر غير السبع الأساسية هي كمية مشتقة.' },
        { en: 'SI base units: metre (m), kilogram (kg), second (s), ampere (A), kelvin (K), candela (cd), mole (mol).', ar: 'لكل كمية أساسية وحدة في النظام الدولي (SI): الطول بالمتر m، والكتلة بالكيلوغرام kg، والزمن بالثانية s، والتيار بالأمبير A، ودرجة الحرارة بالكلفن K، وشدة الإضاءة بالشمعة cd، وكمية المادة بالمول mol. انتبه: وحدة الكتلة الأساسية هي الكيلوغرام وليست الغرام.' },
        { en: 'University level: each base unit has a precise definition, e.g. the metre is the distance light travels in vacuum in {{1 // 299 792 458}} s; the second is 9 192 631 770 periods of Cs‑133 radiation (BK p.14).', ar: 'في المستوى الجامعي تُعرَّف كل وحدة تعريفًا دقيقًا لا يتغير: فالمتر هو المسافة التي يقطعها الضوء في الفراغ خلال {{1 // 299 792 458}} من الثانية، والثانية مرتبطة بعدد محدد من اهتزازات ذرة السيزيوم. الفكرة المهمة أن الوحدات مبنية على ثوابت في الطبيعة، فهي واحدة في كل مكان.' }
      ],
      terms: [['Fundamental quantity', 'كمية أساسية', 'Not defined from other quantities'], ['Derived quantity', 'كمية مشتقة', 'Built from fundamental quantities'], ['Prefix', 'بادئة', 'Power of ten written before a unit (k, m, μ…)'], ['Amount of substance', 'كمية المادة', 'Measured in mole (mol)'], ['Luminous intensity', 'شدة الإضاءة', 'Measured in candela (cd)']],
      formulas: [{ f: 'n = 10⁻⁹, μ = 10⁻⁶, m = 10⁻³, c = 10⁻², d = 10⁻¹, da = 10¹, k = 10³, M = 10⁶, G = 10⁹', name: 'SI prefixes (Table 1.1)', sym: [['n', 'nano', '10⁻⁹', 'نانو'], ['μ', 'micro', '10⁻⁶', 'مايكرو'], ['m', 'milli', '10⁻³', 'ملّي'], ['k', 'kilo', '10³', 'كيلو'], ['M', 'mega', '10⁶', 'ميغا'], ['G', 'giga', '10⁹', 'جيجا']], cond: 'm (milli) ≠ M (mega): case matters.' }],
      life: { en: 'A phone charger label "5 V, 2 A" uses two SI units; a 128 GB phone uses the giga prefix.', ar: 'ملصق شاحن الجوال 5V و2A يستخدم وحدات دولية، وسعة 128GB تستخدم البادئة جيجا.' },
      worked: { src: 'S01 slide "Converting units" · BK p.15', q: 'Convert 5 μm to metres.', steps: ['Write the conversion equation: 1 μm = 10⁻⁶ m', 'Multiply: 5 μm = 5 × 10⁻⁶ m'], ans: '5 × 10⁻⁶ m' },
      tryit: { src: 'BK p.21 Exercise 9', q: 'The proton mass is 1.6 × 10⁻²⁷ kg. Express it in grams.', ans: 1.6e-24, tol: 0.02, unit: 'g', hint: '1 kg = 10³ g, so multiply by 10³.', sol: '1.6 × 10⁻²⁷ × 10³ = 1.6 × 10⁻²⁴ g' },
      checks: [
        { q: 'Which is a derived quantity?', o: ['Mass', 'Time', 'Density', 'Electric current'], a: 2, why: 'Density = {{mass // volume}}, built from fundamental quantities.' },
        { q: 'The SI unit of temperature is…', o: ['°C', 'K', '°F', 'cal'], a: 1, why: 'Kelvin (K) is the SI base unit.' }
      ],
      mistakes: [['Writing M for milli', 'm = milli (10⁻³), M = mega (10⁶).'], ['Treating gram as the SI base unit', 'The SI base unit of mass is the kilogram.']],
      summary: ['7 fundamental quantities ↔ 7 SI base units', 'Derived quantities come from combinations', 'Prefixes are powers of ten'],
      quiz: [
        { q: 'How many SI base units are listed in the course?', num: 7, tol: 0, unit: '', sol: 'm, kg, s, A, K, cd, mol.' },
        { q: '50 km equals…', o: ['5 × 10³ m', '5 × 10⁴ m', '5 × 10⁵ m', '50 × 10⁻³ m'], a: 1, why: '50 × 10³ = 5 × 10⁴ m (S01).' },
        { q: 'Express 1.6 × 10⁻⁹ μC in coulombs (BK Ex.10).', num: 1.6e-15, tol: 0.02, unit: 'C', sol: '1 μC = 10⁻⁶ C → 1.6 × 10⁻¹⁵ C' }
      ]
    },
    {
      id: 'ch1-l2', title: 'Converting units', ar: 'تحويل الوحدات', src: 'S01 §3 · BK p.15–16',
      goals: ['Build a conversion equation', 'Convert compound units (km/h → m/s, g/cm³ → kg/m³)'],
      goalsAr: 'ستتعلم كتابة معادلة التحويل وتحويل الوحدات المركبة مثل km/h إلى m/s.',
      why: { en: 'Laws such as F = ma only give correct numbers when every quantity is in SI units.', ar: 'القوانين تعطي نتيجة صحيحة فقط إذا كانت كل الكميات بوحدات SI.' },
      explain: [
        { en: 'Start from an equality such as 1 min = 60 s. Multiply both sides by the same number to convert (3 min = 180 s).', ar: 'التحويل يبدأ دائمًا من مساواة صحيحة بين وحدتين، مثل 1 min = 60 s. ثم تضرب طرفيها في العدد نفسه: 3 min = 3 × 60 s = 180 s. وهكذا لا تحتاج أن تتذكر هل تضرب أو تقسم، لأن المساواة تقودك.' },
        { en: 'For compound units, replace each unit separately: km → 10³ m and h → 3600 s.', ar: 'الوحدة المركبة مثل km/h فيها وحدتان، فتستبدل كل واحدة وحدها: الكيلومتر = 1000 m، والساعة = 3600 s. لذلك 1 km/h = {{1000 m // 3600 s}} = {{1 // 3.6}} m/s، أي أن التحويل من km/h إلى m/s يكون بالقسمة على 3.6.' },
        { en: 'Powers apply to the prefix too: 1 cm³ = (10⁻² m)³ = 10⁻⁶ m³.', ar: 'إذا كانت الوحدة مربعة أو مكعبة فالأس يُطبَّق على معامل التحويل أيضًا. السنتيمتر = 10⁻² m، فالسنتيمتر المكعب = (10⁻² m)³ = 10⁻⁶ m³ وليس 10⁻² m³. وهذا من أكثر الأخطاء تكرارًا في المسائل.' }
      ],
      terms: [['Conversion factor', 'معامل التحويل', 'Number linking two units, e.g. 60 s/min'], ['Compound unit', 'وحدة مركبة', 'Unit made of several units, e.g. m/s']],
      formulas: [{ f: '1 km/h = {{10³ m // 3600 s}} = {{1 // 3.6}} m/s', name: 'Speed conversion', sym: [['km/h', 'kilometre per hour', '—', 'كيلومتر لكل ساعة'], ['m/s', 'metre per second (SI)', '—', 'متر لكل ثانية']], cond: 'Divide km/h by 3.6 to get m/s.' }, { f: '1 g/cm³ = {{10⁻³ kg // (10⁻²)³ m³}} = 10³ kg/m³', name: 'Density conversion', sym: [['ρ', 'density', 'kg/m³', 'الكثافة'], ['g/cm³', 'gram per cubic centimetre', '—', 'غرام لكل سنتيمتر مكعب']], cond: '—' }],
      life: { en: 'A road sign of 90 km/h means 25 m/s: in one second the car moves 25 m (S01 Ex 1.1).', ar: 'لوحة 90 km/h تعني أن السيارة تقطع 25 مترًا كل ثانية.' },
      worked: { src: 'S01 Ex 1.2 · BK p.16', q: 'Mercury density is 13.6 g/cm³. Express it in SI.', steps: ['ρ = 13.6 g/cm³', 'Replace g → 10⁻³ kg and cm³ → (10⁻²)³ m³', 'ρ = {{13.6 × 10⁻³ // 10⁻⁶}} = 1.36 × 10⁴ kg/m³'], ans: '1.36 × 10⁴ kg/m³' },
      tryit: { src: 'BK p.20 Exercise 8', q: 'An iron cube has mass 856 g and side 5.32 cm. Find its density in SI units.', ans: 5685, tol: 0.02, unit: 'kg/m³', hint: 'V = (5.32 cm)³ = 150.6 cm³; then convert g/cm³ to kg/m³.', sol: 'ρ = {{856 // 150.6}} = 5.685 g/cm³ = 5.685 × 10³ kg/m³' },
      checks: [
        { q: '72 km/h equals…', o: ['20 m/s', '7.2 m/s', '259 m/s', '2 m/s'], a: 0, why: '{{72 // 3.6}} = 20 m/s.' },
        { q: '1 cm² equals…', o: ['10⁻² m²', '10⁻⁴ m²', '10⁻⁶ m²', '10² m²'], a: 1, why: '(10⁻² m)² = 10⁻⁴ m².' }
      ],
      mistakes: [['Converting cm³ with 10⁻² only', 'Cube the factor: (10⁻²)³ = 10⁻⁶.'], ['Multiplying km/h by 3.6 to get m/s', 'Divide by 3.6; multiply to go from m/s to km/h.']],
      summary: ['Write an equality, then scale it', 'Convert each unit inside compound units', 'Raise prefixes to the same power as the unit'],
      quiz: [
        { q: 'Convert 9.8 m/s² to cm/s² (BK Ex.1).', num: 980, tol: 0.01, unit: 'cm/s²', sol: '9.8 × 100 = 980 cm/s²' },
        { q: 'Area of a square of side 20 cm in m² (BK Ex.7).', num: 0.04, tol: 0.01, unit: 'm²', sol: '(0.2 m)² = 0.04 m²' },
        { q: 'F = 50 m·g/s² (metre·gram per s²) in SI (BK Ex.6).', num: 0.05, tol: 0.01, unit: 'N', sol: '50 × 10⁻³ kg·m/s² = 0.05 N' }
      ]
    },
    {
      id: 'ch1-l3', title: 'Dimensional analysis', ar: 'تحليل الأبعاد', src: 'S01 §3 "Dimensional theory" · BK p.17–19',
      goals: ['Write dimensions [M], [L], [T] of derived quantities', 'Check that an equation is dimensionally homogeneous', 'Derive a relation (pendulum period) by dimensions'],
      goalsAr: 'ستتعلم كتابة أبعاد الكميات والتحقق من صحة القوانين واشتقاق علاقات بسيطة.',
      why: { en: 'Dimensional analysis is a free error‑check: if the two sides of your answer have different dimensions, it is wrong.', ar: 'تحليل الأبعاد فحص مجاني لأخطائك: إذا اختلفت أبعاد الطرفين فالجواب خاطئ.' },
      explain: [
        { en: 'In classical mechanics everything is expressed with mass [M], length [L], time [T].', ar: 'تحليل الأبعاد يعني أن نكتب كل كمية بدلالة ثلاث كميات فقط في الميكانيكا: الكتلة [M] والطول [L] والزمن [T]. مثلًا السرعة طول ÷ زمن، فبُعدها LT⁻¹.' },
        { en: 'The importance (S01): validation of physical laws, easily derive some physical laws, derive the units of physical constants.', ar: 'فائدته ثلاثية (S01): نتحقق به من صحة القانون، ونستنتج به بعض القوانين البسيطة، ونعرف به وحدة أي ثابت فيزيائي. إذا خرجت أبعاد طرفي المعادلة مختلفة فالمعادلة خاطئة بالتأكيد.' },
        { en: 'Table 1.2: [ρ]=ML⁻³, [v]=LT⁻¹, [a]=LT⁻², [F]=MLT⁻², [W]=ML²T⁻², [P]=ML²T⁻³.', ar: 'هذه أبعاد أهم الكميات (جدول 1.2 في الكتاب، صفحة 17): الكثافة ML⁻³، والسرعة LT⁻¹، والتسارع LT⁻²، والقوة MLT⁻²، والشغل ML²T⁻²، والقدرة ML²T⁻³. لاحظ أن كل واحدة تُبنى من التي قبلها: القوة = كتلة × تسارع، والشغل = قوة × مسافة، والقدرة = شغل ÷ زمن.' },
        { en: 'Limitation: numbers like 2π have no dimensions, so dimensional analysis cannot find them (BK p.19: "In practice, the constant C was equal to 2π").', ar: 'حدود الطريقة: الأرقام المجردة مثل 2π و ½ ليس لها أبعاد، فتحليل الأبعاد لا يستطيع إيجادها. لذلك يعطينا شكل القانون ولا يعطينا الثابت العددي؛ ففي قانون البندول عرفنا أن T تتناسب مع √(L/g)، لكن العدد 2π جاء من التجربة (BK p.19).' }
      ],
      terms: [['Dimension', 'بُعد', 'Expression of a quantity in M, L, T'], ['Dimensionally homogeneous', 'متجانس بُعديًا', 'Both sides have equal dimensions'], ['Dimensionless', 'عديم الأبعاد', 'Pure number, e.g. strain, angle, 2π']],
      formulas: [{ f: '[F] = [m][a] = M·LT⁻² = MLT⁻²', name: 'Example of dimension algebra', sym: [['[ ]', 'dimension of', '—', 'بُعد الكمية'], ['M, L, T', 'mass, length, time', '—', 'الكتلة، الطول، الزمن']], cond: 'Add/subtract only terms with identical dimensions.' }],
      life: { en: 'Engineers check spreadsheets by units: if a "speed" column ends up in m·s, a formula is wrong.', ar: 'المهندس يكتشف خطأ معادلته عندما تخرج وحدة السرعة m·s بدل m/s.' },
      worked: { src: 'S01 Ex 1.3 · BK p.18', q: 'Verify T = 2π√(L/g).', steps: ['Left side: [T]', 'Right side: √( {{L // LT⁻²}} ) = √(T²) = [T]', 'Both sides are [T] → dimensionally homogeneous.'], ans: 'Correct dimensionally' },
      tryit: { src: 'BK p.20 Exercise 4', q: 'Verify F = mv²/r. What is the dimension of the right side? (type the power of T)', ans: -2, tol: 0, unit: 'power of T', hint: '{{[m][v]² // [r]}} = {{M (LT⁻¹)² // L}}', sol: '{{M L² T⁻² // L}} = MLT⁻² = [F] ✓ → power of T is −2' },
      checks: [
        { q: 'Dimension of power P = W/t:', o: ['ML²T⁻²', 'ML²T⁻³', 'MLT⁻²', 'ML⁻³'], a: 1, why: 'ML²T⁻² ÷ T = ML²T⁻³.' },
        { q: 'Dimensional analysis can determine…', o: ['the constant 2π', 'whether an equation is homogeneous', 'the sign of a result', 'numerical constants'], a: 1, why: 'It cannot find pure numbers.' }
      ],
      mistakes: [['Assigning a dimension to 2π or angles', 'They are dimensionless.'], ['Adding quantities with different dimensions', 'Only like dimensions can be added.']],
      summary: ['Use [M], [L], [T]', 'Valid equation ⇒ same dimensions on both sides', 'Cannot find numeric constants'],
      quiz: [
        { q: 'Dimension of work W = F·d:', o: ['MLT⁻²', 'ML²T⁻²', 'ML²T⁻³', 'M L⁻¹T⁻²'], a: 1, why: 'MLT⁻² × L.' },
        { q: 'In T = c·L^α·m^β·g^γ (BK Ex 1.4) the exponent γ equals…', num: -0.5, tol: 0, unit: '', sol: '−2γ = 1 → γ = −½; α = ½; β = 0.' },
        { q: 'The dimension of pressure P = F/A is ML^xT⁻². x = ?', num: -1, tol: 0, unit: '', sol: '{{MLT⁻² // L²}} = ML⁻¹T⁻² (Appendix BK p.177).' }
      ]
    }
  ]
});

COURSE.push({
  id: 'ch2', n: 2, title: 'Vectors', ar: 'المتجهات', src: 'S02 · BK p.25–37',
  lessons: [
    {
      id: 'ch2-l1', title: 'Scalars, vectors & vector properties', ar: 'الكميات القياسية والمتجهة وخواص المتجهات', src: 'S02 §1 + Properties · BK p.25, 28',
      goals: ['Tell scalar from vector quantities', 'Use equality, commutative, associative, inverse, subtraction and scalar multiplication'],
      goalsAr: 'ستميّز بين الكمية القياسية والمتجهة وتتعرف خواص المتجهات.',
      why: { en: 'Displacement, velocity, force and fields are vectors; adding them like ordinary numbers gives wrong answers.', ar: 'الإزاحة والسرعة والقوة متجهات، وجمعها كأعداد عادية يعطي نتائج خاطئة.' },
      explain: [
        { en: '<b>Scalar</b>: defined by magnitude only (distance, mass, time). <b>Vector</b>: magnitude and direction (displacement, velocity, acceleration, force).', ar: 'الكمية القياسية (Scalar) يكفي لوصفها رقم ووحدة، مثل الكتلة 5 kg أو الزمن 10 s. أما الكمية المتجهة (Vector) فتحتاج رقمًا ووحدة واتجاهًا، مثل الإزاحة 30 m شرقًا أو القوة 20 N لأعلى. والسؤال الذي يفرّق بينهما: هل يتغير المعنى إذا تغير الاتجاه؟' },
        { en: 'BK p.25 example: going home→mosque (30 m east) and back: distance 60 m, but the displacement vectors are opposite.', ar: 'مثال الكتاب (BK p.25): تمشي من البيت إلى المسجد 30 m شرقًا ثم ترجع. المسافة التي مشيتها 60 m، لكن متجه الذهاب نحو الشرق ومتجه العودة نحو الغرب، فهما متعاكسان ومجموعهما صفر، أي أنك رجعت إلى نقطة البداية.' },
        { en: 'Properties: A = B (same magnitude and direction); A + B = B + A; (A + B) + C = A + (B + C); A + (−A) = 0; A − B = A + (−B); B = nA (n < 0 reverses direction).', ar: 'خواص المتجهات: يتساوى متجهان إذا تساويا في المقدار والاتجاه معًا. والجمع إبدالي (A + B = B + A) وتجميعي. ومعكوس المتجه −A له المقدار نفسه واتجاه معاكس، والطرح هو جمع المعكوس: A − B = A + (−B). وضرب المتجه في عدد سالب يعكس اتجاهه.' }
      ],
      terms: [['Scalar', 'كمية قياسية', 'Magnitude only'], ['Vector', 'متجه', 'Magnitude + direction'], ['Commutative', 'إبدالي', 'Order does not matter'], ['Associative', 'تجميعي', 'Grouping does not matter'], ['Inverse vector', 'المتجه المعكوس', 'Same magnitude, opposite direction']],
      formulas: [{ f: 'C = A − B = A + (−B)', name: 'Vector subtraction', sym: [['A, B', 'vectors', 'same unit', 'متجهان'], ['−B', 'inverse of B', 'same unit', 'معكوس المتجه B'], ['C', 'difference A − B', 'same unit', 'الفرق']], cond: '—' }],
      life: { en: 'A GPS shows "2 km north‑east" (vector) while the trip meter shows "3.4 km" (scalar distance).', ar: 'الخرائط تعطي إزاحة باتجاه، وعداد السيارة يعطي مسافة.' },
      worked: { src: 'BK p.25', q: 'A man walks 30 m east to the mosque and returns. Distance and net displacement?', steps: ['Distance = 30 + 30 = 60 m (scalar)', 'Displacement = +30 m + (−30 m) = 0'], ans: 'd = 60 m, Δx = 0' },
      tryit: { src: '🧩 additional design', q: 'If A = 5 units east, what is the magnitude of −2A?', ans: 10, tol: 0, unit: 'units', hint: 'Multiplying by n scales the magnitude by |n|.', sol: '|−2| × 5 = 10 units, pointing west.' },
      checks: [
        { q: 'Which is a vector?', o: ['Mass', 'Distance', 'Force', 'Time'], a: 2, why: 'Force has direction.' },
        { q: 'A + (−A) equals…', o: ['2A', '0', 'A²', '−2A'], a: 1, why: 'Inverse vector property.' }
      ],
      mistakes: [['Saying velocity and speed are the same', 'Velocity is a vector, speed is a scalar.'], ['Thinking −A has negative magnitude', 'Magnitude is always positive; the minus flips direction.']],
      summary: ['Scalar = magnitude; vector = magnitude + direction', 'Vector addition is commutative and associative', 'Subtraction = adding the inverse'],
      quiz: [
        { q: 'Which pair are both scalars?', o: ['Speed, mass', 'Velocity, time', 'Force, energy', 'Displacement, distance'], a: 0, why: 'Speed and mass have no direction.' },
        { q: 'If B = −3A and |A| = 2, |B| = ?', num: 6, tol: 0, unit: '', sol: '|−3| × 2 = 6' }
      ]
    },
    {
      id: 'ch2-l2', title: 'Adding vectors (graphical & trigonometric)', ar: 'جمع المتجهات بالرسم والمثلثات', src: 'S02 §2 · BK p.26–27',
      goals: ['Add two perpendicular vectors with Pythagoras', 'Use the cosine and sine rules for any angle'],
      goalsAr: 'ستجمع متجهين متعامدين بفيثاغورس، وأي متجهين بقانوني جيب التمام والجيب.',
      why: { en: 'Two forces of 4 N each do not make 8 N unless they act in the same direction.', ar: 'قوتان كل منهما 4 نيوتن لا تعطيان 8 نيوتن إلا إذا كانتا في الاتجاه نفسه.' },
      explain: [
        { en: 'Head‑to‑tail: draw B starting at the head of A; the resultant C goes from the tail of A to the head of B.', ar: 'طريقة الرأس للذيل (Head‑to‑tail): ارسم المتجه الأول، ثم ابدأ رسم الثاني من رأس الأول. المحصلة هي السهم الذي يبدأ من ذيل الأول وينتهي عند رأس الثاني، أي أنها الطريق المختصر من البداية إلى النهاية.' },
        { en: 'Right angle: C = √(A² + B²), θ = tan⁻¹( {{B // A}} ).', ar: 'إذا كان المتجهان متعامدين (بينهما 90°) فهما ضلعا مثلث قائم والمحصلة وتره. لذلك مقدارها C = √(A² + B²) من فيثاغورس، واتجاهها θ = tan⁻¹( {{B // A}} ) مقيسًا من المتجه A.' },
        { en: 'Any angle: C = √(A² + B² − 2AB cos θ) where θ is the angle <b>inside the triangle</b> (opposite C); direction by sine rule {{sin β // B}} = {{sin θ // C}}.', ar: 'إذا كانت الزاوية بينهما غير قائمة نستخدم قانون جيب التمام: C = √(A² + B² − 2AB cos θ). المهم أن θ هنا هي الزاوية داخل المثلث المقابلة للمحصلة، وتساوي 180° ناقص الزاوية بين ذيلي المتجهين. ثم نجد الاتجاه بقانون الجيب.' }
      ],
      terms: [['Resultant', 'المحصلة', 'Single vector equal to the sum'], ['Head‑to‑tail', 'رأس لذيل', 'Graphical addition method'], ['Cosine rule', 'قانون جيب التمام', 'C² = A² + B² − 2AB cos θ']],
      formulas: [
        { f: 'C = √(A² + B²) ,  θ = tan⁻¹( {{B // A}} )', name: 'Perpendicular vectors', sym: [['A, B', 'perpendicular vectors', 'same unit', 'متجهان متعامدان'], ['C', 'resultant magnitude', 'same as A', 'مقدار المحصلة'], ['θ', 'angle of C from A', '°', 'زاوية المحصلة مع A']], cond: 'Only when A ⟂ B.' },
        { f: 'C = √(A² + B² − 2AB cos θ)', name: 'Cosine rule', sym: [['A, B', 'the two magnitudes', 'same unit', 'مقدارا المتجهين'], ['C', 'resultant magnitude', 'same as A', 'مقدار المحصلة'], ['θ', 'angle between A and B inside the triangle', '°', 'الزاوية داخل المثلث']], cond: 'θ is the triangle angle (Ex 2.2 uses 60°, i.e. 180° − 120°).' }
      ],
      life: { en: 'A boat heading north at 4 m/s in a 3 m/s east current moves at 5 m/s relative to the shore.', ar: 'قارب يتجه شمالًا 4 م/ث في تيار شرقي 3 م/ث سرعته المحصلة 5 م/ث.' },
      worked: { src: 'S02 Ex 2.2 · BK p.27', q: 'A = 6, B = 9 with 120° between them (tail to tail). Find C.', steps: ['Triangle angle = 180° − 120° = 60°', 'C = √(6² + 9² − 2·6·9·cos 60°) = √63 = 7.9', 'sin β = {{9 // 7.9}} sin 60° → β = 80.6°'], ans: 'C = 7.9, β = 80.6°' },
      tryit: { src: 'BK p.36 Exercise 1', q: 'A = 10 units along +x, B = 7 units at 30° from +x. Find |A + B|.', ans: 16.44, tol: 0.02, unit: 'units', hint: 'Use components: Rx = 10 + 7cos30, Ry = 7sin30.', sol: 'Rx = 16.06, Ry = 3.5 → |R| = 16.44 at 12.3°' },
      checks: [
        { q: 'A = 4 east, B = 4 north. |A + B| ≈ ?', o: ['8', '5.7', '4', '0'], a: 1, why: '√32 = 5.66 (S02 Ex 2.1).' },
        { q: 'Max possible |A + B| for A = 3, B = 4:', o: ['5', '7', '1', '12'], a: 1, why: 'Same direction: 3 + 4.' }
      ],
      mistakes: [['Using the 120° between the tails in the cosine rule', 'Use the triangle angle (180° − 120° = 60°) with the minus sign, or use 120° with + sign.'], ['Adding magnitudes directly', 'Only valid when vectors are parallel.']],
      summary: ['Perpendicular → Pythagoras + tan⁻¹', 'Any angle → cosine rule + sine rule', '|A − B| ≤ |A + B| ≤ A + B'],
      quiz: [
        { q: 'A = 3, B = 4, perpendicular. Angle of C from A (°):', num: 53.13, tol: 0.01, unit: '°', sol: 'tan⁻¹( {{4 // 3}} ) = 53.1°' },
        { q: 'A = 5, B = 5 with a triangle angle of 60°. C = ?', num: 5, tol: 0.01, unit: '', sol: '√(25 + 25 − 50·0.5) = 5' }
      ]
    },
    {
      id: 'ch2-l3', title: 'Vector components & unit vectors', ar: 'تحليل المتجهات ومتجهات الوحدة', src: 'S02 §3 · BK p.29–30',
      goals: ['Resolve a vector into Ax and Ay', 'Write vectors with î, ĵ, k̂', 'Add vectors by components'],
      goalsAr: 'ستحلل المتجه إلى مركبتين وتكتبه بمتجهات الوحدة وتجمع بالمركبات.',
      why: { en: 'Components turn hard geometry into simple addition; every later chapter (forces, work, fields) uses them.', ar: 'المركبات تحول الهندسة الصعبة إلى جمع بسيط، وتُستخدم في كل الفصول التالية.' },
      explain: [
        { en: 'A vector A at angle θ from +x: Aₓ = A cos θ, A_y = A sin θ, so A = A cos θ î + A sin θ ĵ.', ar: 'أي متجه مائل يمكن تفكيكه إلى جزأين متعامدين: جزء أفقي Aₓ = A cos θ وجزء رأسي A_y = A sin θ، بشرط أن تُقاس θ من محور x الموجب. تخيّل ظل المتجه على الأرض (الأفقي) وظله على الجدار (الرأسي).' },
        { en: 'Unit vectors î, ĵ, k̂ point along x, y, z (right‑hand system).', ar: 'متجهات الوحدة î و ĵ و k̂ أسهم طول كل منها 1، وتشير في اتجاه المحاور x و y و z. فعندما نكتب 3î + 4ĵ نعني: 3 وحدات في اتجاه x و 4 وحدات في اتجاه y.' },
        { en: 'Sum: A + B = (Aₓ + Bₓ)î + (A_y + B_y)ĵ + (A_z + B_z)k̂; magnitude √(Rₓ² + R_y² + R_z²).', ar: 'لجمع متجهات كثيرة: اجمع كل المركبات السينية معًا، وكل المركبات الصادية معًا، ولا تخلط بينهما. فتحصل على مركبتي المحصلة Rₓ و R_y، ثم مقدارها √(Rₓ² + R_y²). هذه أسهل طريقة وأدقها لأي عدد من المتجهات.' }
      ],
      terms: [['Component', 'مركبة', 'Projection on an axis'], ['Unit vector', 'متجه وحدة', 'Magnitude 1, shows direction'], ['Right‑hand system', 'نظام اليد اليمنى', 'Orientation of x, y, z']],
      formulas: [{ f: 'Aₓ = A cos θ ,  A_y = A sin θ', name: 'Components', sym: [['A', 'magnitude', '—', 'مقدار المتجه'], ['Aₓ, A_y', 'x‑ and y‑components', 'same as A', 'المركبتان السينية والصادية'], ['θ', 'angle from +x axis', '°', 'الزاوية من محور x الموجب']], cond: 'θ measured counter‑clockwise from +x.' }, { f: 'A + B = (Aₓ+Bₓ)î + (A_y+B_y)ĵ + (A_z+B_z)k̂', name: 'Component addition', sym: [['î ĵ k̂', 'unit vectors along x, y, z', '—', 'متجهات الوحدة'], ['Aₓ, A_y, A_z', 'components of A', 'same as A', 'مركبات المتجه']], cond: '—' }],
      life: { en: 'A plane flying 200 km/h at 30° north of east gains 100 km/h northward each hour (A sin 30°).', ar: 'طائرة تطير 200 كم/س بزاوية 30° شمال الشرق تتقدم شمالًا 100 كم كل ساعة.' },
      worked: { src: 'S02 Ex 2.3 · BK p.30', q: 'A = 3 cm at 60° with +x. Find components.', steps: ['Aₓ = 3 cos 60° = 1.5 î', 'A_y = 3 sin 60° = 2.6 ĵ'], ans: 'A = 1.5î + 2.6ĵ cm' },
      tryit: { src: 'BK p.36 Exercise 6c', q: '|A| = 10 m, θ = 235°. Find Aₓ.', ans: -5.736, tol: 0.02, unit: 'm', hint: 'cos 235° is negative (third quadrant).', sol: 'Aₓ = 10 cos 235° = −5.74 m; A_y = 10 sin 235° = −8.19 m' },
      checks: [
        { q: 'A = 4î + 6ĵ + 2k̂ and B = 3î + 3ĵ − 2k̂. A + B = ?', o: ['7î + 9ĵ', '7î + 9ĵ + 4k̂', 'î + 3ĵ + 4k̂', '12î + 18ĵ'], a: 0, why: 'S02 Ex 2.4: z‑components cancel.' },
        { q: 'For θ = 150°, the x‑component is…', o: ['positive', 'negative', 'zero', 'equal to A'], a: 1, why: 'cos 150° < 0.' }
      ],
      mistakes: [['Using sin for the x‑component', 'With θ from +x: x ↔ cos, y ↔ sin.'], ['Measuring θ from the y‑axis without adjusting', 'Convert the angle to be from +x first.']],
      summary: ['Aₓ = A cos θ, A_y = A sin θ', 'Add like components', 'Magnitude from Pythagoras'],
      quiz: [
        { q: 'Vector AB from A(2,1) to B(−1,2) (BK Ex.5): x‑component?', num: -3, tol: 0, unit: '', sol: 'AB = B − A = (−3, 1) → −3î + ĵ' },
        { q: '|A| = 4 m, θ = 150°: A_y = ?', num: 2, tol: 0.01, unit: 'm', sol: '4 sin 150° = 2 m' },
        { q: 'A = 2î + 2ĵ, B = 4î + 4ĵ. C = A + 2B: x‑component (BK Ex.7c)?', num: 10, tol: 0, unit: '', sol: 'C = 10î + 10ĵ' }
      ]
    },
    {
      id: 'ch2-l4', title: 'Scalar (dot) and vector (cross) products', ar: 'الضرب القياسي والضرب الاتجاهي', src: 'S02 "Vector product" · BK p.31–35',
      goals: ['Compute A·B both ways', 'Find the angle between vectors', 'Compute A×B with the determinant and right‑hand rule'],
      goalsAr: 'ستحسب الضرب القياسي والاتجاهي وتجد الزاوية بين متجهين.',
      why: { en: 'Work is a dot product (W = F·Δr, Chapter 5); torque and magnetic force are cross products.', ar: 'الشغل ضرب قياسي (الفصل 5)، والعزم ضرب اتجاهي.' },
      explain: [
        { en: '<b>Scalar product</b>: A·B = AB cos θ = AₓBₓ + A_y B_y + A_z B_z → a scalar; commutative. î·î = 1, î·ĵ = 0.', ar: 'الضرب القياسي (Dot product) يأخذ متجهين ويعطيك عددًا وليس متجهًا: A·B = AB cos θ، أو بالمركبات AₓBₓ + A_y B_y + A_z B_z. وترتيب الضرب لا يهم (A·B = B·A). ومنه î·î = 1 لأن الزاوية صفر، و î·ĵ = 0 لأنهما متعامدان.' },
        { en: 'Angle: cos θ = {{A·B // AB}}. If A·B = 0 the vectors are orthogonal.', ar: 'من الضرب القياسي نجد الزاوية بين متجهين: cos θ = {{A·B // AB}}. فإذا كان الناتج صفرًا كان cos θ = 0 أي θ = 90°، فالمتجهان متعامدان. وهذه طريقة سريعة لاختبار التعامد.' },
        { en: '<b>Vector product</b>: A×B = AB sin θ n̂, perpendicular to both (right‑hand rule); A×B = −B×A. î×ĵ = k̂, ĵ×k̂ = î, k̂×î = ĵ, î×î = 0.', ar: 'الضرب الاتجاهي (Cross product) يعطيك متجهًا جديدًا عموديًا على المتجهين معًا، مقداره AB sin θ واتجاهه بقاعدة اليد اليمنى. وهنا الترتيب مهم: A×B = −B×A. ومنه î×ĵ = k̂ و î×î = 0.' },
        { en: 'Determinant form: A×B = î(A_yB_z − A_zB_y) − ĵ(AₓB_z − A_zBₓ) + k̂(AₓB_y − A_yBₓ).', ar: 'عندما يكون المتجهان بالمركبات نحسب الضرب الاتجاهي بالمحدد: نضع î ĵ k̂ في الصف الأول، ثم مركبات A، ثم مركبات B. انتبه للإشارة السالبة أمام حد ĵ؛ نسيانها هو الخطأ الشائع، وقد وقع فيه الكتاب نفسه في مثال 2.9 (G‑27).' }
      ],
      terms: [['Dot product', 'الضرب القياسي (النقطي)', 'Gives a scalar'], ['Cross product', 'الضرب الاتجاهي', 'Gives a vector'], ['Orthogonal', 'متعامد', 'θ = 90°'], ['Right‑hand rule', 'قاعدة اليد اليمنى', 'Direction of A×B']],
      formulas: [
        { f: 'A·B = AB cos θ = AₓBₓ + A_y B_y + A_z B_z', name: 'Scalar product', sym: [['A·B', 'scalar product (a number)', 'product of units', 'الضرب القياسي'], ['θ', 'angle between A and B', '°', 'الزاوية بين المتجهين']], cond: 'Result is a scalar.' },
        { f: '|A×B| = AB sin θ', name: 'Vector product magnitude', sym: [['|A×B|', 'size of the vector product', 'product of units', 'مقدار الضرب الاتجاهي'], ['θ', 'angle between A and B', '°', 'الزاوية بين المتجهين'], ['n̂', 'unit vector ⟂ to A and B', '—', 'متجه وحدة عمودي على A و B']], cond: 'A×B = −B×A' }
      ],
      life: { en: 'Pushing a trolley with a handle at an angle: only F cos θ moves it forward (dot product idea).', ar: 'عند دفع عربة بزاوية، الجزء المفيد من القوة هو F cos θ.' },
      worked: { src: 'S02 Ex 2.7 · BK p.32–33 (see gap G‑05)', q: 'Angle between A = 2î + 2ĵ − k̂ and B = 6î + 3ĵ + 2k̂.', steps: ['A·B = 12 + 6 − 2 = 16', 'A = √9 = 3, B = √49 = 7', 'θ = cos⁻¹( {{16 // 21}} ) = cos⁻¹(0.762)', 'θ = 40.4° (the source prints 40.1°; 40.4° is the computed value)'], ans: 'θ ≈ 40.4°', note: 'Source value 40.1° differs from the calculation: logged as G‑05 for instructor review.' },
      tryit: { src: 'BK p.37 Exercise 10', q: 'A = 3î − 4ĵ + 2k̂, B = −2î + 3ĵ + 3k̂. Find the x‑component of A×B.', ans: -18, tol: 0, unit: '', hint: 'x: A_yB_z − A_zB_y = (−4)(3) − (2)(3).', sol: 'A×B = −18î − 13ĵ + k̂' },
      checks: [
        { q: 'A·B for A = 100, B = 20, θ = 60°:', o: ['2000', '1000', '1732', '0'], a: 1, why: 'S02 Ex 2.5: 100·20·cos60 = 1000.' },
        { q: 'î × ĵ = ?', o: ['0', '1', 'k̂', '−k̂'], a: 2, why: 'Right‑hand cyclic order.' }
      ],
      mistakes: [['Forgetting the minus sign before the ĵ term', 'Expand the determinant carefully: +, −, +.'], ['Thinking A×B = B×A', 'They are opposite.']],
      summary: ['Dot → scalar, uses cos', 'Cross → vector, uses sin, ⟂ to both', 'A·B = 0 ⇒ orthogonal'],
      quiz: [
        { q: 'A = 20î + 10ĵ, B = 6î + 2ĵ. A·B = ? (S02 Ex 2.6)', num: 140, tol: 0, unit: '', sol: '120 + 20 = 140' },
        { q: '|A×B| for |A| = 50, |B| = 20, θ = 45° (BK Ex.8):', num: 707.1, tol: 0.01, unit: '', sol: '1000 sin 45° = 707.1' },
        { q: 'A = 3î + 3ĵ + 3k̂, B = 2î + ĵ − 3k̂ are…', o: ['parallel', 'orthogonal', 'equal', 'opposite'], a: 1, why: 'A·B = 6 + 3 − 9 = 0 (BK Ex.9).' },
        { q: 'A = 3î − 4ĵ, B = −2î + 3ĵ. z‑component of A×B (Ex 2.9)?', num: 1, tol: 0, unit: '', sol: '(3)(3) − (−4)(−2) = 9 − 8 = 1 → k̂. (The book prints 17k̂: gap G‑27.)' }
      ]
    }
  ]
});

COURSE.push({
  id: 'ch3', n: 3, title: 'Motion in one dimension', ar: 'الحركة في بُعد واحد', src: 'S03 · BK p.41–53',
  lessons: [
    {
      id: 'ch3-l1', title: 'Displacement & distance', ar: 'الإزاحة والمسافة', src: 'S03 §1 · BK p.41–42',
      goals: ['Compute displacement Δx = x₂ − x₁', 'Compute total distance along a path'],
      goalsAr: 'ستحسب الإزاحة (متجهة) والمسافة (قياسية) لمسار معطى.',
      why: { en: 'Velocity and acceleration are built on displacement, not distance.', ar: 'السرعة المتجهة والتسارع يُبنيان على الإزاحة وليس المسافة.' },
      explain: [
        { en: 'Displacement is a vector that depends only on the starting and ending points: Δx = x₂ − x₁.', ar: 'الإزاحة (Displacement) هي التغير في الموقع: Δx = x₂ − x₁، أي الموقع النهائي ناقص الموقع الابتدائي. لا يهمها الطريق الذي سلكته، فقط من أين بدأت وأين انتهيت، وإشارتها تخبرك بالاتجاه.' },
        { en: 'Distance is a scalar equal to the actual length of the path.', ar: 'المسافة (Distance) هي طول الطريق الذي قطعته فعلًا، مهما تعرّج أو رجعت. وهي كمية قياسية موجبة دائمًا، مثل قراءة عداد المسافة في السيارة.' },
        { en: '|Δx| ≤ d always; they are equal only for motion in one direction without turning back.', ar: 'لذلك مقدار الإزاحة إما أقل من المسافة أو يساويها، ولا يكون أكبر منها أبدًا. ويتساويان فقط إذا تحرك الجسم في خط مستقيم واتجاه واحد دون رجوع.' }
      ],
      terms: [['Displacement', 'الإزاحة', 'Δx = x₂ − x₁ (vector)'], ['Distance', 'المسافة', 'Path length (scalar)'], ['Position', 'الموقع', 'x relative to an origin']],
      formulas: [{ f: 'Δx = x₂ − x₁', name: 'Displacement (3.1)', sym: [['Δx', 'displacement', 'm', 'الإزاحة'], ['x₁, x₂', 'initial, final position', 'm', 'الموقع الابتدائي والنهائي']], cond: 'Sign shows direction.' }],
      life: { en: 'A 400 m running track: after one lap the distance is 400 m but the displacement is 0.', ar: 'في مضمار 400 م، بعد لفة كاملة المسافة 400 م والإزاحة صفر.' },
      worked: { src: 'S03 Ex 3.1 (slide version, see G‑06)', q: 'Runner O → A (500 m) → B (200 m) → C (300 m), positions on a line. Distance and displacement?', steps: ['Distance = OA + AB + BC = 500 + 300 + 100 = 900 m', 'Displacement = x_C − x_O = 300 − 0 = 300 m'], ans: 'd = 900 m, Δx = 300 m', note: 'The textbook version (BK p.41–42) uses 1320 m east, 940 m west, 320 m east → Δx = 700 m, d = 2580 m.' },
      tryit: { src: 'BK p.41–42 Ex 3.1 (book version)', q: 'Runners go 1320 m east, then 940 m west, then 320 m east. Find the displacement.', ans: 700, tol: 0, unit: 'm', hint: 'Take east as +.', sol: '1320 − 940 + 320 = 700 m east (distance 2580 m)' },
      checks: [
        { q: 'Car goes 3 km east then 3 km west. Displacement?', o: ['6 km', '0', '3 km', '−6 km'], a: 1, why: 'Back to the start.' },
        { q: 'Which can be negative?', o: ['Distance', 'Displacement', 'Both', 'Neither'], a: 1, why: 'Displacement sign gives direction.' }
      ],
      mistakes: [['Adding the leg lengths for displacement', 'Use positions: final − initial.']],
      summary: ['Δx = x₂ − x₁ (vector)', 'd = path length (scalar)', '|Δx| ≤ d'],
      quiz: [
        { q: 'x₁ = 0, x₂ = 10 m but the path was 3 + 2 + 6 + 2.5 + 4 m (S03). Distance?', num: 17.5, tol: 0, unit: 'm', sol: 'Sum of path segments = 17.5 m' },
        { q: 'Same motion: displacement?', num: 10, tol: 0, unit: 'm', sol: '10 − 0 = 10 m' }
      ]
    },
    {
      id: 'ch3-l2', title: 'Speed, average & instantaneous velocity', ar: 'السرعة القياسية والمتوسطة واللحظية', src: 'S03 §2 · BK p.42–44',
      goals: ['Compute average speed s = {{d // Δt}}', 'Compute average velocity {{Δx // Δt}}', 'Differentiate x(t) to get v(t)'],
      goalsAr: 'ستحسب السرعة القياسية المتوسطة والسرعة المتجهة المتوسطة واللحظية بالاشتقاق.',
      why: { en: 'Speedometers show instantaneous speed; trip planners use average speed.', ar: 'عداد السرعة يعرض السرعة اللحظية، وتخطيط الرحلة يستخدم المتوسطة.' },
      explain: [
        { en: 'Average speed s = {{d // Δt}} (scalar). Average velocity v_av = {{Δx // Δt}} = {{x₂ − x₁ // t₂ − t₁}} (vector).', ar: 'السرعة القياسية المتوسطة (Average speed) = المسافة ÷ الزمن، وهي عدد موجب. أما السرعة المتجهة المتوسطة (Average velocity) = الإزاحة ÷ الزمن، ولها اتجاه. فإذا ركضت حول ملعب ورجعت إلى مكانك تكون سرعتك القياسية كبيرة، لكن سرعتك المتجهة المتوسطة صفر.' },
        { en: 'Instantaneous velocity is the limit as Δt → 0: v = {{dx // dt}} (3.3).', ar: 'السرعة اللحظية (Instantaneous velocity) هي سرعتك عند لحظة معينة، مثل قراءة عداد السرعة الآن. رياضيًا نأخذ المتوسط على زمن صغير جدًا يقترب من الصفر، وهذا هو المشتقة: v = {{dx // dt}}.' },
        { en: 'Power rule: {{d // dt}}(tⁿ) = n tⁿ⁻¹, derivative of a constant = 0.', ar: 'قاعدة الاشتقاق التي تحتاجها: مشتقة tⁿ هي n tⁿ⁻¹، أي ننزل الأس ونضربه ثم ننقص الأس واحدًا، ومشتقة العدد الثابت صفر. مثال: إذا كان x = 6t² − t + 1 فإن v = 12t − 1.' }
      ],
      terms: [['Average speed', 'السرعة القياسية المتوسطة', '{{d // Δt}}'], ['Average velocity', 'السرعة المتجهة المتوسطة', '{{Δx // Δt}}'], ['Instantaneous velocity', 'السرعة اللحظية', '{{dx // dt}}']],
      formulas: [{ f: 'v_av = {{Δx // Δt}} ,  v = {{dx // dt}}', name: 'Velocity (3.2, 3.3)', sym: [['v_av', 'average velocity', 'm/s', 'السرعة المتوسطة'], ['v', 'instantaneous velocity', 'm/s', 'السرعة اللحظية'], ['Δx', 'displacement', 'm', 'الإزاحة'], ['t', 'time', 's', 'الزمن']], cond: '—' }],
      life: { en: 'Bisha → Makkah 450 km in 9 h: average 50 km/h even if the speedometer showed 120 at times.', ar: 'رحلة بيشة–مكة 450 كم في 9 ساعات متوسطها 50 كم/س.' },
      worked: { src: 'S03 Ex 3.2 · BK p.43–44', q: 'x(t) = 6t² − t + 1. Find v at t = 3 s and v_av between 0 and 3 s.', steps: ['x(0) = 1 m, x(3) = 52 m → Δx = 51 m', 'v = {{dx // dt}} = 12t − 1 → v(3) = 35 m/s', 'v_av = {{51 // 3}} = 17 m/s'], ans: 'v(3) = 35 m/s, v_av = 17 m/s' },
      tryit: { src: 'BK p.53 Exercise 7', q: 'x(t) = 3t − 4t² + t³. Find the average velocity between t = 2 s and t = 4 s.', ans: 7, tol: 0.01, unit: 'm/s', hint: 'x(2) = −2 m, x(4) = 12 m.', sol: 'v_av = {{12 − (−2) // 2}} = 7 m/s; v(3) = 3 − 24 + 27 = 6 m/s' },
      checks: [
        { q: 'x = 2t³ + 2t + 1. v at t = 5 s (S03)?', o: ['152 m/s', '252 m/s', '62 m/s', '50 m/s'], a: 0, why: 'v = 6t² + 2 = 152.' },
        { q: 'The slope of an x–t graph is…', o: ['acceleration', 'velocity', 'distance', 'time'], a: 1, why: 'v = {{dx // dt}}.' }
      ],
      mistakes: [['Dividing distance by time for average velocity', 'Use displacement.'], ['Substituting t before differentiating', 'Differentiate first, then substitute.']],
      summary: ['s = {{d // Δt}}', 'v_av = {{Δx // Δt}}', 'v = {{dx // dt}}'],
      quiz: [
        { q: 'Player: path 17.5 m, Δx = 10 m, 5 s. Average speed?', num: 3.5, tol: 0, unit: 'm/s', sol: '{{17.5 // 5}} = 3.5 m/s (S03)' },
        { q: 'Same player: average velocity?', num: 2, tol: 0, unit: 'm/s', sol: '{{10 // 5}} = 2 m/s' },
        { q: 'Car 450 km from 7 am to 4 pm (BK Ex.2). Average velocity in km/h?', num: 50, tol: 0.01, unit: 'km/h', sol: '{{450 // 9}} = 50 km/h (assuming 450 km is the straight‑line separation)' }
      ]
    },
    {
      id: 'ch3-l3', title: 'Acceleration', ar: 'التسارع', src: 'S03 §3 · BK p.45–46',
      goals: ['Compute a_av = {{Δv // Δt}}', 'Differentiate v(t) to get a(t)', 'Interpret the sign of acceleration'],
      goalsAr: 'ستحسب التسارع المتوسط واللحظي وتفهم معنى إشارته.',
      why: { en: 'Acceleration links motion to forces (Newton\'s 2nd law, Chapter 4).', ar: 'التسارع هو الجسر بين الحركة والقوة في الفصل الرابع.' },
      explain: [
        { en: 'Average acceleration: "the rate of velocity change in time", a_av = {{Δv // Δt}} = {{v₂ − v₁ // t₂ − t₁}} (3.4).', ar: 'التسارع (Acceleration) يقيس سرعة تغير السرعة: كم تزيد السرعة أو تنقص في كل ثانية. التسارع المتوسط = (السرعة النهائية − السرعة الابتدائية) ÷ الزمن، ووحدته m/s². فتسارع 2 m/s² يعني أن السرعة تزيد 2 m/s كل ثانية.' },
        { en: '⚠ The slide S03 words it as "average velocity divided by the time interval"; the equation ({{Δv // Δt}}) and the book are the reference (gap G‑04).', ar: 'تنبيه: شريحة المقرر S03 تقول «السرعة المتوسطة مقسومة على الزمن»، وهذه صياغة غير دقيقة. التعريف الصحيح في الكتاب والقانون هو تغير السرعة ÷ الزمن {{Δv // Δt}}، فاعتمده (G‑04).' },
        { en: 'Instantaneous acceleration a = {{dv // dt}} = {{d²x // dt²}} (3.5).', ar: 'التسارع اللحظي هو التسارع عند لحظة معينة، ونحسبه بالاشتقاق: a = {{dv // dt}}. أي نشتق السرعة مرة، أو نشتق الموقع مرتين.' },
        { en: 'Negative a does not necessarily mean slowing down: if a and v are both negative, the object speeds up (BK p.45).', ar: 'التسارع السالب لا يعني دائمًا أن الجسم يبطئ. الجسم يبطئ إذا كانت إشارة التسارع عكس إشارة السرعة، ويسرع إذا كانت إشارتاهما متشابهتين. فإذا كانت السرعة سالبة والتسارع سالبًا فالجسم تزداد سرعته (BK p.45).' }
      ],
      terms: [['Acceleration', 'التسارع', 'Rate of change of velocity'], ['Deceleration', 'التباطؤ', 'Speed decreasing (a opposite to v)']],
      formulas: [{ f: 'a_av = {{Δv // Δt}} ,  a = {{dv // dt}}', name: 'Acceleration (3.4, 3.5)', sym: [['a_av', 'average acceleration', 'm/s²', 'التسارع المتوسط'], ['a', 'instantaneous acceleration', 'm/s²', 'التسارع اللحظي'], ['Δv', 'change of velocity', 'm/s', 'تغير السرعة'], ['t', 'time', 's', 'الزمن']], cond: '—' }],
      life: { en: 'A car going 0 → 100 km/h in 10 s has an average acceleration of 2.78 m/s².', ar: 'سيارة من 0 إلى 100 كم/س في 10 ثوانٍ تسارعها 2.78 م/ث².' },
      worked: { src: 'S03 Ex 3.3 · BK p.45–46', q: 'x(t) = 2t³ − 3t² + 2t. Find a at t = 3 s.', steps: ['v = 6t² − 6t + 2', 'a = 12t − 6', 'a(3) = 36 − 6 = 30 m/s²'], ans: '30 m/s²' },
      tryit: { src: 'BK p.52 Exercise 3a', q: 'A train at 30 m/s slows to a stop in 44 s. Find its acceleration.', ans: -0.682, tol: 0.02, unit: 'm/s²', hint: 'a = {{0 − 30 // 44}}', sol: 'a = −0.68 m/s² (deceleration)' },
      checks: [
        { q: 'v from 3 m/s to 5 m/s in 5 s. a_av?', o: ['0.4 m/s²', '1.6 m/s²', '8 m/s²', '2 m/s²'], a: 0, why: 'S03: a = {{5 − 3 // 5}}.' },
        { q: 'v = −5 m/s and a = −2 m/s². The object is…', o: ['slowing down', 'speeding up', 'at rest', 'moving at constant speed'], a: 1, why: 'Same signs ⇒ speeding up.' }
      ],
      mistakes: [['Negative acceleration = slowing down', 'Compare signs of a and v.'], ['Using the slide wording "average velocity / time"', 'Use {{Δv // Δt}}.']],
      summary: ['a_av = {{Δv // Δt}}', 'a = {{dv // dt}}', 'Same signs of a and v ⇒ speeding up'],
      quiz: [
        { q: 'x = 2t³ + t² + 1. a at t = 5 s (S03)?', num: 62, tol: 0, unit: 'm/s²', sol: 'v = 6t² + 2t, a = 12t + 2 = 62' },
        { q: 'Classify: a motorcycle approaching a red light (BK Ex.10f).', o: ['Positive (speeding up)', 'Negative (deceleration)', 'Zero'], a: 1, why: 'It slows down.' }
      ]
    },
    {
      id: 'ch3-l4', title: 'Constant acceleration & free fall', ar: 'الحركة بتسارع ثابت والسقوط الحر', src: 'S03 §4 · BK p.46–51',
      goals: ['Choose the right kinematic equation', 'Solve free‑fall problems with a sign convention', 'Find maximum height and flight time'],
      goalsAr: 'ستختار المعادلة المناسبة من معادلات الحركة الثلاث، وتحل مسائل السقوط الحر.',
      why: { en: 'Most exam motion problems are solved with three equations; the skill is choosing the right one.', ar: 'أغلب مسائل الحركة تُحل بثلاث معادلات، والمهارة في اختيار المناسبة.' },
      explain: [
        { en: 'If a is constant: (3.6) v_f = at + v_i · (3.7) x_f = ½at² + v_i t + x_i · (3.8) v_f² = v_i² + 2aΔx.', ar: 'عندما يكون التسارع ثابتًا لدينا ثلاث معادلات: v_f = v_i + at لحساب السرعة بعد زمن، و x_f = x_i + v_i t + ½at² لحساب الموقع بعد زمن، و v_f² = v_i² + 2aΔx للعلاقة بين السرعة والمسافة بدون زمن. ولا تصلح هذه المعادلات إذا كان التسارع يتغير.' },
        { en: 'Pick the equation that does not contain the quantity you neither know nor need (no t → use 3.8).', ar: 'كيف تختار المعادلة؟ اكتب المعطيات والمطلوب، ثم انظر إلى الكمية التي لا تعرفها ولا تحتاجها، واختر المعادلة التي لا تحتوي عليها. مثلًا: إذا لم يُذكر الزمن ولم يُطلب، فاستخدم v_f² = v_i² + 2aΔx.' },
        { en: 'Free fall: a = g = 9.8 m/s² toward Earth\'s centre, independent of mass (air resistance neglected). Choose + direction first: Ex 3.5 takes down +, Ex 3.6 takes up +.', ar: 'السقوط الحر (Free fall) حركة بتسارع ثابت هو g = 9.8 m/s² نحو الأرض، ولا يعتمد على كتلة الجسم إذا أهملنا مقاومة الهواء. وقبل الحل حدد الاتجاه الموجب: مثال 3.5 يأخذ الأسفل موجبًا، ومثال 3.6 يأخذ الأعلى موجبًا، فتتغير إشارة g حسب اختيارك.' },
        { en: 'Thrown up: y_max = {{v_i² // 2g}}, t_max = {{v_i // g}}, flight time back to the same level = 2 t_max.', ar: 'للجسم المقذوف لأعلى: عند أقصى ارتفاع تصبح سرعته صفرًا. لذلك أقصى ارتفاع y_max = {{v_i² // 2g}}، وزمن الصعود t_max = {{v_i // g}}، وزمن الرجوع إلى المستوى نفسه ضعف زمن الصعود.' }
      ],
      terms: [['Constant acceleration', 'تسارع ثابت', 'a does not change'], ['Free fall', 'السقوط الحر', 'Motion under gravity only'], ['Maximum height', 'أقصى ارتفاع', 'Where v = 0'], ['Flight time', 'زمن التحليق', 'Time to return']],
      formulas: [
        { f: 'v_f = v_i + at', name: '(3.6)', sym: [['v_i, v_f', 'initial/final velocity', 'm/s', 'السرعة الابتدائية والنهائية'], ['a', 'acceleration', 'm/s²', 'التسارع'], ['t', 'time', 's', 'الزمن']], cond: 'a constant' },
        { f: 'x_f = x_i + v_i t + ½at²', name: '(3.7)', sym: [['x_i, x_f', 'initial/final position', 'm', 'الموقع الابتدائي والنهائي'], ['v_i', 'initial velocity', 'm/s', 'السرعة الابتدائية'], ['a', 'acceleration', 'm/s²', 'التسارع'], ['t', 'time', 's', 'الزمن']], cond: 'a constant' },
        { f: 'v_f² = v_i² + 2aΔx', name: '(3.8)', sym: [['v_i, v_f', 'initial/final velocity', 'm/s', 'السرعة الابتدائية والنهائية'], ['a', 'acceleration', 'm/s²', 'التسارع'], ['Δx', 'displacement', 'm', 'الإزاحة']], cond: 'a constant; no time' }
      ],
      life: { en: 'Dropping a phone from 1.2 m: it hits the floor after √(2·1.2/9.8) ≈ 0.49 s; that is why you can rarely catch it.', ar: 'الجوال الساقط من 1.2 م يصل الأرض بعد نصف ثانية تقريبًا.' },
      worked: { src: 'S03 Ex 3.4 · BK p.48', q: 'Car from rest, a = 2.5 m/s². (a) time to travel 50 m (b) velocity then.', steps: ['50 = ½(2.5)t² → t² = 40 → t = 6.32 s', 'v_f² = 0 + 2(2.5)(50) = 250 → v = 15.81 m/s'], ans: 't = 6.32 s, v = 15.81 m/s' },
      tryit: { src: 'BK p.52 Exercise 6', q: 'A stone is thrown up at 29.4 m/s from the top of a 34.3 m minaret. When does it hit the ground?', ans: 7, tol: 0.02, unit: 's', hint: 'Up +: −34.3 = 29.4t − 4.9t² → t² − 6t − 7 = 0.', sol: 't = 7 s (t_max = 3 s; impact speed 39.2 m/s)' },
      checks: [
        { q: 'Which equation has no time?', o: ['v_f = v_i + at', 'x = v_i t + ½at²', 'v_f² = v_i² + 2aΔx', 'v = {{dx // dt}}'], a: 2, why: '(3.8).' },
        { q: 'Thrown up at 60 m/s: maximum height (BK p.51)?', o: ['183.7 m', '367 m', '60 m', '6.1 m'], a: 0, why: 'y_max = {{60² // 2 × 9.8}}.' }
      ],
      mistakes: [['Mixing sign conventions inside one problem', 'Fix + once and keep it.'], ['Using these equations when a changes with time', 'Then use derivatives (Lesson 3).'], ['Setting a = 0 at the top of the flight', 'v = 0 at the top, but a = g still.']],
      summary: ['3 equations, constant a only', 'Free fall: |a| = 9.8 m/s²', 'y_max = {{v² // 2g}}, t_max = {{v // g}}'],
      quiz: [
        { q: 'Thrown down at 60 m/s, hits ground after 5 s. Height (S03 Ex 3.5)?', num: 422.5, tol: 0.01, unit: 'm', sol: '60·5 + ½·9.8·25 = 422.5 m' },
        { q: 'Same object: impact speed?', num: 109, tol: 0.01, unit: 'm/s', sol: '60 + 9.8·5 = 109 m/s' },
        { q: 'Arrow reaches 122.5 m. Total flight time (BK Ex.5)?', num: 10, tol: 0.02, unit: 's', sol: 'v_i = √(2·9.8·122.5) = 49 m/s → t = {{2 × 49 // 9.8}} = 10 s' },
        { q: 'Plane needs 360 km/h on a 1200 m runway from rest (BK Ex.9). a = ?', num: 4.17, tol: 0.02, unit: 'm/s²', sol: 'a = {{100² // 2 × 1200}} = 4.17 m/s²' },
        { q: 'Bus at 45 km/h brakes, hits a car 40 m ahead after 4 s (BK Ex.8). Deceleration magnitude?', num: 1.25, tol: 0.02, unit: 'm/s²', sol: '40 = 12.5·4 + ½a·16 → a = −1.25 m/s²; speed at impact 7.5 m/s' }
      ]
    }
  ]
});
