/* Physics Learning Lab — course content, chapters 4–6. */
COURSE.push({
  id: 'ch4', n: 4, title: 'Laws of Motion', ar: 'قوانين الحركة', src: 'S04 · BK p.57–67',
  lessons: [
    {
      id: 'ch4-l1', title: 'Force & Newton\'s first law (equilibrium)', ar: 'القوة وقانون نيوتن الأول (الاتزان)', src: 'S04 §1–2 · BK p.57–60',
      goals: ['Treat force as a vector', 'State Newton\'s first law and inertia', 'Solve equilibrium problems with ΣFₓ = 0, ΣF_y = 0'],
      goalsAr: 'ستتعامل مع القوة كمتجه، وتفهم القانون الأول والقصور الذاتي، وتحل مسائل الاتزان.',
      why: { en: 'Bridges, shelves and hanging signs stay still because forces balance; engineers design them with ΣF = 0.', ar: 'الجسور والرفوف تبقى ساكنة لأن القوى متزنة.' },
      explain: [
        { en: 'Force is a vector. Contact forces (kick, push, spring) vs field forces (gravity, no contact) (BK p.57).', ar: 'القوة (Force) هي ما يدفع الجسم أو يسحبه، وهي متجهة: لها مقدار واتجاه. بعض القوى تحتاج تلامسًا، مثل الركلة والدفع وشد النابض، وبعضها يؤثر عن بعد بدون تلامس، مثل الجاذبية، وتسمى قوى المجال.' },
        { en: '<b>Newton\'s first law</b>: "In the absence of external forces, an object at rest remains at rest and an object in motion continues in motion with a constant velocity." ΣF = 0 (4.1).', ar: 'قانون نيوتن الأول: إذا كانت محصلة القوى على الجسم صفرًا (ΣF = 0)، فالجسم الساكن يبقى ساكنًا، والمتحرك يبقى متحركًا بالسرعة نفسها وفي خط مستقيم. يعني أن الحركة لا تحتاج قوة لتستمر، بل تحتاج قوة لتتغير.' },
        { en: 'Inertia: resistance to change of motion; mass measures inertia (kg).', ar: 'القصور الذاتي (Inertia) هو ميل الجسم إلى مقاومة أي تغيير في حركته. والكتلة هي مقياس هذا القصور: الشاحنة كتلتها كبيرة، فيصعب تحريكها ويصعب إيقافها.' },
        { en: 'Equilibrium method: draw forces, resolve into x and y, set each sum to zero, solve.', ar: 'خطوات حل مسائل الاتزان: ارسم كل القوى المؤثرة على الجسم، ثم حلّل كل قوة إلى مركبتين x و y، ثم اجعل مجموع مركبات x صفرًا ومجموع مركبات y صفرًا، ثم احسب المجهول من المعادلتين.' }
      ],
      terms: [['Net force', 'القوة المحصلة', 'Vector sum ΣF'], ['Inertia', 'القصور الذاتي', 'Resistance to change of motion'], ['Equilibrium', 'الاتزان', 'ΣF = 0'], ['Field force', 'قوة مجال', 'Acts without contact']],
      formulas: [{ f: 'ΣF = 0  ⇔  ΣFₓ = 0 and ΣF_y = 0', name: 'First law / equilibrium (4.1)', sym: [['ΣF', 'net force', 'N', 'القوة المحصلة'], ['ΣFₓ, ΣF_y', 'components of the net force', 'N', 'مركبتا القوة المحصلة']], cond: 'Body at rest or at constant velocity.' }],
      life: { en: 'Passengers lurch forward when a bus brakes: their bodies keep moving (inertia).', ar: 'يندفع الركاب للأمام عند فرملة الحافلة بسبب القصور الذاتي.' },
      worked: { src: 'S04 Ex 4.2 · BK p.60', q: 'Static body: F₁ = 10 N at φ = 60° (up‑left), F₃ at θ = 30° (up‑right), F₂ down. Find F₃ and F₂.', steps: ['ΣFₓ: F₃ cos 30° − 10 cos 60° = 0 → F₃ = 5.8 N', 'ΣF_y: 10 sin 60° + 5.8 sin 30° − F₂ = 0 → F₂ = 11.6 N'], ans: 'F₃ = 5.8 N, F₂ = 11.6 N' },
      tryit: { src: 'BK p.66 Exercise 3', q: 'A 10 kg block hangs from two strings at 60° and 30° to the horizontal. Find the tension in the 60° string.', ans: 84.9, tol: 0.02, unit: 'N', hint: 'T₁cos60 = T₂cos30 and T₁sin60 + T₂sin30 = 98 N.', sol: 'T₁ = 84.9 N (60° string), T₂ = 49 N. 🧩 Assumes angles measured from the horizontal ceiling; check the figure.' },
      checks: [
        { q: 'Forces 200 N right, 70, 60, 40 N left. Net? (S04 Ex 4.1)', o: ['30 N right', '370 N', '30 N left', '0'], a: 0, why: '200 − 170 = 30 N.' },
        { q: 'An object moves at constant velocity. Then… (BK Quiz 1)', o: ['only one force acts', 'ΣF ≠ 0', 'ΣF = 0'], a: 2, why: 'First law.' }
      ],
      mistakes: [['Thinking motion needs a force', 'Constant velocity needs no net force.'], ['Forgetting to resolve inclined forces', 'Always split into x and y.']],
      summary: ['Force is a vector', 'ΣF = 0 ⇒ rest or constant velocity', 'Solve equilibrium per axis'],
      quiz: [
        { q: 'A ball rolls on a frictionless floor at 2 m/s. With no forces, after 10 s its speed is…', num: 2, tol: 0, unit: 'm/s', sol: 'Constant velocity (first law).' },
        { q: 'The property that measures inertia is…', o: ['weight', 'mass', 'volume', 'speed'], a: 1, why: 'Mass (kg).' }
      ]
    },
    {
      id: 'ch4-l2', title: 'Newton\'s second law', ar: 'قانون نيوتن الثاني', src: 'S04 §3 · BK p.59–64',
      goals: ['Apply ΣF = ma in components', 'Distinguish mass and weight', 'Solve 2‑body and elevator problems'],
      goalsAr: 'ستطبق ΣF = ma بالمركبات وتفرّق بين الكتلة والوزن.',
      why: { en: 'This single law predicts the motion of cars, rockets and elevators.', ar: 'هذا القانون وحده يتنبأ بحركة السيارات والصواريخ والمصاعد.' },
      explain: [
        { en: '"The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass": ΣF = ma (4.2).', ar: 'قانون نيوتن الثاني: تسارع الجسم يزيد إذا زادت القوة المحصلة، ويقل إذا زادت كتلته، ويكون في اتجاه القوة المحصلة: ΣF = ma. فإذا دفعت عربة فارغة ثم عربة محمّلة بالقوة نفسها، تتسارع الفارغة أكثر.' },
        { en: '1 N is the force that gives 1 kg an acceleration of 1 m/s²: 1 N = 1 kg·m/s².', ar: 'وحدة القوة النيوتن N: هو القوة التي تعطي جسمًا كتلته 1 kg تسارعًا قدره 1 m/s². لذلك N = kg·m/s².' },
        { en: 'Weight F_w = mg; a 100 kg person weighs 980 N on Earth, 162 N on the Moon, 371 N on Mars (BK p.59). Mass stays 100 kg.', ar: 'الوزن (Weight) هو قوة جذب الأرض للجسم: F_w = mg، ويقاس بالنيوتن. الكتلة ثابتة في أي مكان، أما الوزن فيتغير بتغير g: شخص كتلته 100 kg وزنه 980 N على الأرض و 162 N على القمر، وكتلته تبقى 100 kg (BK p.59).' },
        { en: 'Use components: ΣFₓ = maₓ, ΣF_y = ma_y. a points in the direction of the net force.', ar: 'إذا كانت القوى في اتجاهات مختلفة، طبّق القانون على كل محور وحده: ΣFₓ = maₓ و ΣF_y = ma_y، ثم اجمع مركبتي التسارع لتحصل على مقداره واتجاهه.' }
      ],
      terms: [['Mass', 'الكتلة', 'Amount of inertia (kg)'], ['Weight', 'الوزن', 'Gravitational force mg (N)'], ['Newton (N)', 'نيوتن', 'kg·m/s²'], ['Tension', 'الشد', 'Force in a string']],
      formulas: [{ f: 'ΣF = m a', name: 'Second law (4.2)', sym: [['ΣF', 'net force', 'N', 'القوة المحصلة'], ['m', 'mass', 'kg', 'الكتلة'], ['a', 'acceleration', 'm/s²', 'التسارع']], cond: 'Inertial frame; ΣF is the vector sum.' }, { f: 'F_w = m g', name: 'Weight', sym: [['F_w', 'weight', 'N', 'الوزن'], ['m', 'mass', 'kg', 'الكتلة'], ['g', '9.8 m/s²', 'm/s²', 'تسارع الجاذبية']], cond: 'Near Earth\'s surface' }],
      life: { en: 'In an elevator accelerating upward a scale shows more than your weight: n = m(g + a).', ar: 'في مصعد يتسارع للأعلى يقرأ الميزان أكثر من وزنك.' },
      worked: { src: 'S04 slide example', q: 'F = 20 N at 30° acts on m = 5 kg. Find aₓ, a_y and a.', steps: ['Fₓ = 20 cos 30° = 17.3 N, F_y = 20 sin 30° = 10 N', 'aₓ = {{17.3 // 5}} = 3.46 m/s², a_y = {{10 // 5}} = 2 m/s²', 'a = {{20 // 5}} = 4 m/s² at 30° (same direction as F)'], ans: 'a = 4 m/s² at 30°' },
      tryit: { src: 'BK p.66 Exercise 4', q: 'Masses 10 kg and 5 kg hang over a frictionless pulley. Find the acceleration.', ans: 3.27, tol: 0.02, unit: 'm/s²', hint: 'a = {{(m₁ − m₂) g // m₁ + m₂}}.', sol: 'a = {{5 × 9.8 // 15}} = 3.27 m/s²; T = {{2 m₁ m₂ g // m₁ + m₂}} = 65.3 N' },
      checks: [
        { q: 'Same force, mass tripled. Acceleration becomes (BK Quiz 2)…', o: ['a', 'a/3', '3a'], a: 1, why: 'a ∝ {{1 // m}}.' },
        { q: 'A body weighs 24.4 N on Earth. Mass? (S04 Ex 4.4)', o: ['2.5 kg', '24.4 kg', '239 kg', '0.4 kg'], a: 0, why: '{{24.4 // 9.8}}.' }
      ],
      mistakes: [['Using a single force instead of ΣF', 'Sum all forces first.'], ['Writing weight in kg', 'Weight is a force in N.']],
      summary: ['ΣF = ma (vector)', 'Weight = mg', 'Work per axis'],
      quiz: [
        { q: '80 kg person in an elevator accelerating up at 3 m/s². Scale reading? (BK Ex.5)', num: 1024, tol: 0.01, unit: 'N', sol: 'n = 80(9.8 + 3) = 1024 N (down: 544 N)' },
        { q: '1200 kg car, 0 → 100 km/h in 10 s. Force? (BK Ex.8)', num: 3333, tol: 0.02, unit: 'N', sol: 'a = {{27.78 // 10}} = 2.778 → F = 3333 N' },
        { q: 'Ice block slides down a frictionless 20° incline. a = ? (BK Ex.2a)', num: 3.35, tol: 0.02, unit: 'm/s²', sol: 'a = g sin 20° = 3.35 m/s² down the slope' },
        { q: 'Child 30 kg pulled by 9 N (60° above x) and 12 N (30° below x). |a| = ? (BK Ex 4.3)', num: 0.5, tol: 0.03, unit: 'm/s²', sol: 'ΣFₓ = 14.89 N, ΣF_y = 1.79 N → aₓ = 0.496, a_y = 0.06 → a ≈ 0.50 m/s² at 6.9° (book prints a_y = 0.1, 11.3°: gap G‑26)' }
      ]
    },
    {
      id: 'ch4-l3', title: 'Newton\'s third law', ar: 'قانون نيوتن الثالث', src: 'S04 §4 · BK p.64–65',
      goals: ['Identify action–reaction pairs', 'Find the normal force'],
      goalsAr: 'ستحدد أزواج الفعل ورد الفعل وتحسب القوة العمودية.',
      why: { en: 'Walking, swimming and rockets all work by pushing on something that pushes back.', ar: 'المشي والسباحة والصواريخ كلها تعمل بالفعل ورد الفعل.' },
      explain: [
        { en: '"Every action has an equal and opposite reaction": F₁₂ = −F₂₁ (4.3).', ar: 'قانون نيوتن الثالث: إذا أثّر جسم على جسم آخر بقوة، أثّر الثاني على الأول بقوة مساوية لها في المقدار ومعاكسة في الاتجاه: F₁₂ = −F₂₁. فعندما تدفع الحائط يدفعك الحائط بالقوة نفسها.' },
        { en: 'The two forces act on <b>different bodies</b>, so they never cancel each other.', ar: 'القوتان (الفعل ورد الفعل) تؤثر كل واحدة منهما على جسم مختلف، لذلك لا تلغي إحداهما الأخرى أبدًا. لا تجمعهما في معادلة جسم واحد؛ القوى المؤثرة على الجسم نفسه فقط هي التي تدخل في معادلته.' },
        { en: 'A book on a table: Earth pulls the book down (mg); the table pushes the book up (normal force n). For the book at rest n = mg (first law); the reaction to n is the book pushing the table.', ar: 'مثال الكتاب على الطاولة: الأرض تسحب الكتاب لأسفل بقوة mg، والطاولة تدفعه لأعلى بالقوة العمودية n. تساويهما هنا سببه أن الكتاب ساكن (القانون الأول) وليس القانون الثالث. أما رد فعل n فهو دفع الكتاب للطاولة لأسفل.' }
      ],
      terms: [['Action–reaction pair', 'زوج الفعل ورد الفعل', 'Equal, opposite, on different bodies'], ['Normal force', 'القوة العمودية', 'Contact force ⟂ to surface']],
      formulas: [{ f: 'F₁₂ = −F₂₁', name: 'Third law (4.3)', sym: [['F₁₂', 'force by body 1 on body 2', 'N', 'قوة الجسم 1 على الجسم 2'], ['F₂₁', 'force by body 2 on body 1', 'N', 'قوة الجسم 2 على الجسم 1']], cond: 'Always, for any interaction.' }],
      life: { en: 'When you jump off a small boat, the boat moves backward.', ar: 'عندما تقفز من قارب صغير يتحرك القارب للخلف.' },
      worked: { src: 'S04 Ex 4.5 · BK p.65', q: 'An object of weight 200 N rests on a table. Reaction force n?', steps: ['Object at rest: ΣF_y = 0', 'n − W = 0 → n = W = 200 N'], ans: 'n = 200 N' },
      tryit: { src: 'BK p.67 Exercise 7', q: 'A compressed spring pushes a 2 kg and a 1 kg ball apart on a frictionless table. If the 2 kg ball gets a = 3 m/s², what is the 1 kg ball\'s acceleration?', ans: 6, tol: 0.01, unit: 'm/s²', hint: 'Equal and opposite forces: F = 2 × 3 = 6 N on each.', sol: 'a = {{6 // 1}} = 6 m/s²: the lighter ball moves away faster. 🧩 numbers added to the book\'s conceptual question.' },
      checks: [
        { q: 'Floor exerts a normal force on… (chair on rug, book on chair, BK Ex.10)', o: ['all three', 'only the book', 'only the rug', 'the chair'], a: 2, why: 'The floor touches only the rug.' },
        { q: 'Action and reaction cancel because they are opposite.', o: ['True', 'False'], a: 1, why: 'They act on different bodies.' }
      ],
      mistakes: [['Calling weight and normal force an action–reaction pair', 'Weight pairs with the book pulling Earth.'], ['Assuming n = mg always', 'Not on inclines or in accelerating elevators.']],
      summary: ['F₁₂ = −F₂₁', 'Pairs act on different bodies', 'n found from ΣF'],
      quiz: [
        { q: 'Earth pulls a 70 kg man with 686 N. The man pulls Earth with…', num: 686, tol: 0.01, unit: 'N', sol: 'Equal magnitude, opposite direction.' },
        { q: 'On an incline the normal force is…', o: ['mg', 'mg cos θ', 'mg sin θ', '0'], a: 1, why: '🧩 component perpendicular to surface.' }
      ]
    }
  ]
});

COURSE.push({
  id: 'ch5', n: 5, title: 'Work and Energy', ar: 'الشغل والطاقة', src: 'S05 · BK p.71–83',
  lessons: [
    {
      id: 'ch5-l1', title: 'Work done by a constant force', ar: 'الشغل المبذول بقوة ثابتة', src: 'S05 §1 · BK p.71–74',
      goals: ['Compute W = FΔr cos θ', 'Compute W = F·Δr with components', 'Recognise zero and negative work'],
      goalsAr: 'ستحسب الشغل بالمقادير وبالمركبات، وتعرف متى يكون صفرًا أو سالبًا.',
      why: { en: 'Work measures energy transferred; it explains why carrying a bag horizontally does no work on it by the vertical lifting force.', ar: 'الشغل يقيس الطاقة المنقولة.' },
      explain: [
        { en: 'Work is "the process of energy transfer to the motion of an object via application of a force": W = F·Δr = ΔrF cos θ (5.1).', ar: 'الشغل (Work) في الفيزياء معناه نقل طاقة إلى جسم بقوة تحركه مسافة. فإذا لم يتحرك الجسم فلا شغل مهما كانت القوة كبيرة. ويُحسب بالقانون W = F Δr cos θ، حيث θ الزاوية بين اتجاه القوة واتجاه الحركة.' },
        { en: 'Unit: joule, J = N·m = kg·m²/s². Work is a scalar.', ar: 'وحدة الشغل الجول J، ويساوي نيوتن × متر. والشغل كمية قياسية: له مقدار وإشارة، لكن ليس له اتجاه.' },
        { en: 'θ = 90° ⇒ W = 0; θ > 90° ⇒ W < 0 (energy taken from the system).', ar: 'الزاوية تحدد إشارة الشغل: إذا كانت القوة في اتجاه الحركة (θ = 0°) فالشغل موجب وأكبر ما يمكن، وإذا كانت عمودية على الحركة (θ = 90°) فالشغل صفر، وإذا كانت عكس الحركة، مثل الاحتكاك، فالشغل سالب ويأخذ طاقة من الجسم.' }
      ],
      terms: [['Work', 'الشغل', 'W = F·Δr'], ['Joule', 'الجول', 'N·m'], ['Displacement', 'الإزاحة', 'Δr']],
      formulas: [{ f: 'W = F·Δr = F Δr cos θ', name: 'Work (5.1)', sym: [['W', 'work', 'J', 'الشغل'], ['F', 'force', 'N', 'القوة'], ['Δr', 'displacement', 'm', 'الإزاحة'], ['θ', 'angle between F and Δr', '°', 'الزاوية بين القوة والإزاحة']], cond: 'Constant force.' }],
      life: { en: 'Pulling a suitcase by its handle at 60°: only half of your pull does work moving it forward.', ar: 'عند سحب حقيبة بزاوية 60° نصف قوتك فقط تبذل شغلًا للأمام.' },
      worked: { src: 'S05 Ex 5.4 · BK p.74', q: 'Two 200 N forces act; F₁ at 60° to the motion, F₂ perpendicular; Δr = 2 m. Total work?', steps: ['F₂ ⟂ motion → W₂ = 0', 'W₁ = 200 × 2 × cos 60° = 200 J'], ans: 'W = 200 J' },
      tryit: { src: 'BK p.82 Exercise 3', q: 'F = 15î + 25ĵ N moves an object from (2,7) to (5,9) m. Work?', ans: 95, tol: 0.01, unit: 'J', hint: 'Δr = 3î + 2ĵ', sol: 'W = 15·3 + 25·2 = 95 J' },
      checks: [
        { q: '2 N along +x, Δr = 2 m along +x. W = ? (S05 Ex 5.1)', o: ['4 J', '0', '1 J', '−4 J'], a: 0, why: '2·2·cos 0°.' },
        { q: 'A man raises a 100 N bucket doing 1000 J. Depth? (BK Ex 5.2)', o: ['10 m', '100 m', '1 m', '0.1 m'], a: 0, why: 'Δr = {{W // F}}.' }
      ],
      mistakes: [['Using sin θ for work', 'Work uses cos θ.'], ['Writing (5î + 4ĵ) × 4î for work', 'It is a dot product (·), see G‑19.']],
      summary: ['W = FΔr cos θ', 'Scalar, in J', '⟂ force does no work'],
      quiz: [
        { q: 'F = 12 N, Δr = 15 m, θ = 30° (BK Ex.5). W = ?', num: 155.9, tol: 0.01, unit: 'J', sol: '12·15·cos 30° = 155.9 J' },
        { q: 'x = î + 2ĵ m, F = 2î + 5ĵ N (BK Ex.4). W = ?', num: 12, tol: 0, unit: 'J', sol: '2 + 10 = 12 J' },
        { q: '200 N at 60°, cart moves 10 m (BK Ex 5.3). W = ?', num: 1000, tol: 0, unit: 'J', sol: '200·10·0.5' }
      ]
    },
    {
      id: 'ch5-l2', title: 'Kinetic energy & the work–energy theorem', ar: 'الطاقة الحركية ومبرهنة الشغل والطاقة', src: 'S05 §2 · BK p.74–76',
      goals: ['Compute KE = ½mv²', 'Use W = ΔKE'],
      goalsAr: 'ستحسب الطاقة الحركية وتطبق أن الشغل يساوي التغير فيها.',
      why: { en: 'Braking distance grows with v² because KE grows with v².', ar: 'مسافة الكبح تتضاعف أربع مرات عند مضاعفة السرعة لأن الطاقة الحركية تتناسب مع v².' },
      explain: [
        { en: 'A body that moves at velocity v has KE = ½mv² (5.2).', ar: 'الطاقة الحركية (Kinetic energy) طاقة يملكها الجسم بسبب حركته: KE = ½mv². لاحظ أن السرعة مربعة، فإذا تضاعفت السرعة تضاعفت الطاقة الحركية أربع مرات.' },
        { en: 'From v_f² = v_i² + 2ax and W = max: W = ½mv_f² − ½mv_i² = ΔKE.', ar: 'مبرهنة الشغل والطاقة: الشغل الكلي المبذول على جسم يساوي التغير في طاقته الحركية: W = ½mv_f² − ½mv_i² = ΔKE. وتخرج من الجمع بين ΣF = ma ومعادلة الحركة v_f² = v_i² + 2ax.' },
        { en: 'Negative work (brakes) reduces KE.', ar: 'إذا كان الشغل سالبًا، مثل شغل الفرامل، تنقص الطاقة الحركية فيبطئ الجسم. وإذا كان موجبًا تزيد الطاقة فيسرع.' }
      ],
      terms: [['Kinetic energy', 'الطاقة الحركية', '½mv²'], ['Work–energy theorem', 'مبرهنة الشغل–الطاقة', 'W_net = ΔKE']],
      formulas: [{ f: 'KE = ½ m v² ,  W = KE_f − KE_i', name: '(5.2)', sym: [['KE', 'kinetic energy', 'J', 'الطاقة الحركية'], ['m', 'mass', 'kg', 'الكتلة'], ['v', 'speed', 'm/s', 'السرعة'], ['W', 'net work', 'J', 'الشغل الكلي']], cond: 'W is the net work.' }],
      life: { en: 'Doubling speed from 60 to 120 km/h quadruples KE, so braking distance is about four times longer.', ar: 'مضاعفة السرعة تضاعف الطاقة الحركية أربع مرات.' },
      worked: { src: 'S05 Ex 5.6 · BK p.76', q: '1200 kg car at 20 m/s stops in 30 m. Work by brakes?', steps: ['KE_f = 0', 'W = 0 − ½·1200·20² = −240 000 J'], ans: 'W = −2.4 × 10⁵ J' },
      tryit: { src: 'S05 Ex 5.5 · BK p.75–76 (see G‑07)', q: 'F = 5î + 4ĵ N moves a 5 kg body 4 m along x. KE_i = 5 J. Find KE_f.', ans: 25, tol: 0.01, unit: 'J', hint: 'W = 5·4 = 20 J = KE_f − KE_i', sol: 'KE_f = 20 + 5 = 25 J (the book prints 15 J; slides give 25 J)' },
      checks: [
        { q: '20 kg moving at 2 m/s. KE? (S05)', o: ['40 J', '20 J', '80 J', '10 J'], a: 0, why: '½·20·4.' },
        { q: 'If v doubles, KE becomes…', o: ['2×', '4×', '½×', 'same'], a: 1, why: 'KE ∝ v².' }
      ],
      mistakes: [['Forgetting to square v', 'KE = ½mv².'], ['Using KE_i − KE_f', 'W = final − initial.']],
      summary: ['KE = ½mv²', 'W_net = ΔKE', 'Negative work slows things'],
      quiz: [
        { q: '50 kg body slows to 1 m/s; external work magnitude 3000 J (BK Ex.6). v_i = ?', num: 11, tol: 0.02, unit: 'm/s', sol: '½·50(v_i² − 1) = 3000 → v_i = 11 m/s (work done against the body)' },
        { q: '10 kg, x = 12t³ − 2t² − 12. KE at t = 3 s (BK Ex.10)?', num: 486720, tol: 0.01, unit: 'J', sol: 'v = 36t² − 4t = 312 m/s → KE = ½·10·312² = 4.87 × 10⁵ J' }
      ]
    },
    {
      id: 'ch5-l3', title: 'Potential energy & work–energy theory', ar: 'طاقة الوضع ونظرية الشغل والطاقة', src: 'S05 §3–4 · BK p.76–80',
      goals: ['Compute ΔPE = mgΔh', 'Apply W = ΔKE + ΔPE'],
      goalsAr: 'ستحسب التغير في طاقة الوضع وتطبق W = ΔKE + ΔPE.',
      why: { en: 'Energy conservation solves problems that would be very long with forces.', ar: 'حفظ الطاقة يختصر مسائل طويلة جدًا بالقوى.' },
      explain: [
        { en: 'A body has PE "if it is able to produce a work due to the change of its position". ΔPE = mgΔh (5.3).', ar: 'طاقة الوضع (Potential energy) طاقة مخزنة في الجسم بسبب موضعه، فالجسم المرفوع يستطيع أن يبذل شغلًا عندما يسقط. والتغير فيها عند تغير الارتفاع ΔPE = mgΔh.' },
        { en: 'Only the change ΔPE is physical; PE itself depends on the reference level (BK p.77).', ar: 'قيمة طاقة الوضع نفسها تعتمد على المستوى الذي تختاره صفرًا (أرض الغرفة أو سطح الطاولة)، لكن التغير فيها لا يعتمد على هذا الاختيار. لذلك نحسب دائمًا التغير ΔPE (BK p.77).' },
        { en: 'Work and energy theory: "The work done of any system is equal to the sum of the change in the kinetic and potential energy": W = ΔKE + ΔPE (5.4).', ar: 'نظرية الشغل والطاقة في المقرر: شغل القوة المؤثرة يساوي مجموع التغير في الطاقة الحركية والتغير في طاقة الوضع: W = ΔKE + ΔPE. فإذا رفعت صندوقًا بسرعة ثابتة يذهب كل شغلك إلى طاقة الوضع.' }
      ],
      terms: [['Potential energy', 'طاقة الوضع', 'Energy of position'], ['Reference level', 'مستوى الإسناد', 'Where PE = 0'], ['Conservation of energy', 'حفظ الطاقة', 'Energy is not created or destroyed']],
      formulas: [{ f: 'ΔPE = m g Δh', name: '(5.3)', sym: [['ΔPE', 'change of potential energy', 'J', 'تغير طاقة الوضع'], ['m', 'mass', 'kg', 'الكتلة'], ['g', '9.8 m/s²', 'm/s²', 'تسارع الجاذبية'], ['Δh', 'height change', 'm', 'تغير الارتفاع']], cond: 'Near Earth\'s surface.' }, { f: 'W = ΔKE + ΔPE', name: '(5.4)', sym: [['W', 'work by the applied force', 'J', 'شغل القوة المؤثرة'], ['ΔKE', 'change of kinetic energy', 'J', 'تغير الطاقة الحركية'], ['ΔPE', 'change of potential energy', 'J', 'تغير طاقة الوضع']], cond: '—' }],
      life: { en: 'Hydro‑electric dams turn water\'s PE into electrical energy.', ar: 'السدود تحول طاقة وضع الماء إلى كهرباء.' },
      worked: { src: 'S05 Ex 5.8 · BK p.79', q: 'F = 10î + 20ĵ N moves a 2 kg particle (from rest) from 2î + ĵ to 4î + 3ĵ m (y vertical). Find W, ΔPE, v_f.', steps: ['Δr = 2î + 2ĵ → W = 20 + 40 = 60 J', 'ΔPE = 2·9.8·(3 − 1) = 39.2 J', '60 = ½·2·v_f² + 39.2 → v_f = 4.56 m/s'], ans: 'v_f = 4.56 m/s' },
      tryit: { src: 'BK p.82 Exercise 8', q: 'A 500 kg elevator rises from 3 m to 12 m. ΔPE?', ans: 44100, tol: 0.01, unit: 'J', hint: 'Δh = 9 m', sol: '500·9.8·9 = 44 100 J' },
      checks: [
        { q: '2 kg from 3 m to 5 m. ΔPE? (S05 Ex 5.7)', o: ['39.2 J', '98 J', '−39.2 J', '19.6 J'], a: 0, why: '2·9.8·2.' },
        { q: 'Same particle falls from 5 m to 1 m. ΔPE?', o: ['78.4 J', '−78.4 J', '−39.2 J', '0'], a: 1, why: 'Δh = −4 m.' }
      ],
      mistakes: [['Using 8.9 instead of 9.8', 'The slide typo (G‑09); g = 9.8 m/s².'], ['Sign of ΔPE when falling', 'h_f − h_i < 0 ⇒ ΔPE < 0.']],
      summary: ['ΔPE = mgΔh', 'W = ΔKE + ΔPE', 'Reference level is arbitrary'],
      quiz: [
        { q: '100 kg moved 1.5 m up. ΔPE (S05)?', num: 1470, tol: 0.01, unit: 'J', sol: '100·9.8·1.5 = 1470 J' },
        { q: 'Work to raise 2 kg by 2 m (BK Ex.2)?', num: 39.2, tol: 0.01, unit: 'J', sol: 'mgh = 39.2 J' },
        { q: 'Pull 30 kg 4 m up a frictionless 30° incline at constant speed (BK Ex.7). W = ?', num: 588, tol: 0.01, unit: 'J', sol: 'W = mg sin30°·4 = 588 J (🧩 assumes constant speed)' }
      ]
    },
    {
      id: 'ch5-l4', title: 'Power', ar: 'القدرة', src: 'S05 §5 · BK p.80–81',
      goals: ['Compute P = {{W // t}}', 'Use the watt'],
      goalsAr: 'ستحسب القدرة كمعدل لبذل الشغل.',
      why: { en: 'Two cranes may do the same work; the more powerful one does it faster.', ar: 'رافعتان تبذلان الشغل نفسه، والأقوى تنجزه أسرع.' },
      explain: [
        { en: '"Power is defined as the rate of work done": P = {{dW // dt}} (5.5); average P = {{W // t}}.', ar: 'القدرة (Power) تقيس سرعة إنجاز الشغل: القدرة = الشغل ÷ الزمن، P = {{W // t}}. شخصان يرفعان الحمل نفسه إلى الارتفاع نفسه يبذلان الشغل نفسه، لكن الأسرع منهما قدرته أكبر.' },
        { en: 'Unit: watt W = J/s = kg·m²/s³. Do not confuse W (watt) with W (work).', ar: 'وحدة القدرة الواط W، ويساوي جولًا لكل ثانية. انتبه أن الحرف W يُستخدم للواط (وحدة القدرة) وللشغل (الكمية)، فميّز بينهما من سياق المسألة.' }
      ],
      terms: [['Power', 'القدرة', 'Rate of work'], ['Watt', 'الواط', 'J/s']],
      formulas: [{ f: 'P = {{dW // dt}}  (average: P = {{W // t}})', name: '(5.5)', sym: [['P', 'power', 'W', 'القدرة'], ['W', 'work', 'J', 'الشغل'], ['t', 'time', 's', 'الزمن']], cond: '—' }],
      life: { en: 'Climbing stairs fast feels harder: same work, more power.', ar: 'صعود الدرج بسرعة متعب أكثر: نفس الشغل بقدرة أكبر.' },
      worked: { src: 'S05 Ex 5.10 · BK p.81', q: '2 kg raised 3 m in 5 s. Work and power?', steps: ['W = mgh = 2·9.8·3 = 58.8 J', 'P = {{58.8 // 5}} = 11.76 W'], ans: 'P = 11.76 W' },
      tryit: { src: '🧩 additional design', q: 'A 60 kg student climbs 4 m of stairs in 8 s. Average power?', ans: 294, tol: 0.01, unit: 'W', hint: 'W = mgh', sol: 'P = {{60 × 9.8 × 4 // 8}} = 294 W' },
      checks: [{ q: '1 W equals…', o: ['1 J·s', '1 J/s', '1 N/s', '1 kg·m/s'], a: 1, why: 'Rate of work.' }],
      mistakes: [['Dividing by distance instead of time', 'P = {{W // t}}.']],
      summary: ['P = {{W // t}}', 'Watt = J/s'],
      quiz: [{ q: 'A 1800 J job done in 2 min. P = ?', num: 15, tol: 0, unit: 'W', sol: 'P = {{1800 // 120}} = 15 W (🧩)' }]
    }
  ]
});

COURSE.push({
  id: 'ch6', n: 6, title: 'Elasticity and Fluid Mechanics', ar: 'المرونة وميكانيكا الموائع', src: 'S06 · BK p.87–101',
  lessons: [
    {
      id: 'ch6-l1', title: 'Elasticity: Young, bulk & shear moduli', ar: 'المرونة: معامل يونغ والحجمي والقص', src: 'S06 §1 · BK p.87–91',
      goals: ['Compute stress and strain', 'Use Y, B and S', 'Read the stress–strain curve'],
      goalsAr: 'ستحسب الإجهاد والانفعال ومعاملات المرونة الثلاثة.',
      why: { en: 'Cable, bridge and bone design depend on how materials stretch.', ar: 'تصميم الكابلات والجسور يعتمد على استطالة المواد.' },
      explain: [
        { en: 'Stress = {{F // A}} (N/m²): "the force affecting on the unit of areas". Strain = {{ΔL // L}} (unitless).', ar: 'الإجهاد (Stress) هو القوة المؤثرة على كل متر مربع من مقطع الجسم: الإجهاد = {{F // A}}، ووحدته N/m². فإذا شُدّ سلكان بالقوة نفسها، يكون إجهاد الأرفع أكبر لأن القوة موزعة على مساحة أصغر. أما الانفعال (Strain) فهو مقدار الاستطالة نسبةً إلى الطول الأصلي: الانفعال = {{ΔL // L}}. ولأنه طول ÷ طول فليس له وحدة؛ فانفعال 0.001 يعني أن السلك زاد بمقدار جزء من ألف من طوله.' },
        { en: 'Young\'s modulus Y = {{stress // strain}} → {{F // A}} = Y {{ΔL // L}} (6.1). Bulk: {{F // A}} = −B {{ΔV // V}} (6.2). Shear: {{F // A}} = S {{x // L}} (6.3).', ar: 'معامل المرونة يربط الإجهاد بالانفعال: كلما كان المعامل أكبر كانت المادة أصلب وأقل تأثرًا بالقوة. وفي المقرر ثلاثة معاملات: معامل يونغ Y لتغير الطول (شد سلك)، ومعامل المرونة الحجمي B لتغير الحجم (ضغط من كل الجهات)، ومعامل القص S لتغير الشكل (قوة مماسية تُميل الوجه العلوي).' },
        { en: 'Stress–strain curve (Fig 6.2): elastic limit → yield point → breaking point. The formulas hold below the elastic limit.', ar: 'منحنى الإجهاد والانفعال (شكل 6.2): في البداية يرجع الجسم إلى طوله إذا أزلنا القوة، وذلك حتى حد المرونة. بعده تحدث استطالة دائمة عند نقطة الخضوع، ثم ينقطع الجسم عند نقطة الكسر. والقوانين الثلاثة صحيحة فقط قبل حد المرونة.' },
        { en: 'Area of a wire: A = πr² with r = {{diameter // 2}}.', ar: 'مقطع السلك دائرة، فمساحته A = πr². إذا أعطتك المسألة القطر d فاقسمه على 2 أولًا لتحصل على نصف القطر r، ثم حوّله إلى متر قبل التربيع.' }
      ],
      terms: [['Stress', 'الإجهاد', 'F/A'], ['Strain', 'الانفعال', 'ΔL/L'], ['Young\'s modulus', 'معامل يونغ', 'Elasticity of length'], ['Bulk modulus', 'معامل المرونة الحجمي', 'Elasticity of volume'], ['Shear modulus', 'معامل القص', 'Elasticity of shape'], ['Elastic limit', 'حد المرونة', 'Max stress with full recovery']],
      formulas: [
        { f: '{{F // A}} = Y {{ΔL // L}}', name: 'Young (6.1)', sym: [['F', 'force', 'N', 'القوة'], ['A', 'cross‑section area', 'm²', 'مساحة المقطع'], ['Y', 'Young\'s modulus', 'N/m²', 'معامل يونغ'], ['ΔL', 'extension', 'm', 'الاستطالة'], ['L', 'original length', 'm', 'الطول الأصلي']], cond: 'Below elastic limit.' },
        { f: '{{F // A}} = −B {{ΔV // V}}', name: 'Bulk (6.2)', sym: [['F/A', 'pressure change', 'N/m²', 'تغير الضغط'], ['B', 'bulk modulus', 'N/m²', 'معامل المرونة الحجمي'], ['ΔV', 'change of volume', 'm³', 'تغير الحجم'], ['V', 'original volume', 'm³', 'الحجم الأصلي']], cond: 'Minus: volume decreases as pressure increases.' },
        { f: '{{F // A}} = S {{x // L}}', name: 'Shear (6.3)', sym: [['F', 'tangential force', 'N', 'القوة المماسية'], ['A', 'area of the face', 'm²', 'مساحة الوجه'], ['S', 'shear modulus', 'N/m²', 'معامل القص'], ['x', 'shift of the top face', 'm', 'إزاحة الوجه العلوي'], ['L', 'height of the block', 'm', 'ارتفاع الجسم']], cond: 'Tangential force.' }
      ],
      life: { en: 'Elevator cables are chosen so the stress stays far below the elastic limit.', ar: 'كابلات المصاعد تُختار بحيث يبقى الإجهاد بعيدًا عن حد المرونة.' },
      worked: { src: 'S06 Ex 6.1 · BK p.89', q: '2500 N on a 10 m wire of diameter 3.5 mm, extension 0.5 cm. Stress, strain, Y?', steps: ['A = π(1.75×10⁻³)² = 9.62×10⁻⁶ m²', 'Stress = {{F // A}} = {{2500 // 9.62×10⁻⁶}} = 2.6×10⁸ N/m²', 'Strain = {{ΔL // L}} = {{0.005 // 10}} = 5×10⁻⁴', 'Y = {{stress // strain}} = {{2.6×10⁸ // 5×10⁻⁴}} = 5.2×10¹¹ N/m²'], ans: 'Y = 5.2 × 10¹¹ N/m²' },
      tryit: { src: 'BK p.100 Exercise 1', q: '1000 N on a wire 100 m long, 0.003 m diameter, extends 0.5 m. Y = ?', ans: 2.83e10, tol: 0.02, unit: 'N/m²', hint: 'r = 0.0015 m', sol: 'Stress = {{1000 // 7.07×10⁻⁶}} = 1.415×10⁸; strain = 0.005; Y = 2.83×10¹⁰ N/m²' },
      checks: [
        { q: 'The unit of strain is…', o: ['N/m²', 'm', 'none', 'N'], a: 2, why: 'Ratio of lengths.' },
        { q: '10 cm cube, 10⁶ N tangential force, 0.03 cm shift. S = ? (S06 Ex 6.3)', o: ['3.3×10¹⁰ N/m²', '3.3×10⁶', '1×10⁸', '3×10⁻⁴'], a: 0, why: 'S = {{F L // A x}}. (Slide prints 106 N: G‑20)' }
      ],
      mistakes: [['Using the diameter in πr²', 'Halve it first.'], ['Giving strain a unit', 'Strain is dimensionless.']],
      summary: ['Stress = {{F // A}}, strain = {{ΔL // L}}', 'Y, B, S moduli in N/m²', 'Valid below elastic limit'],
      quiz: [
        { q: 'Copper cube Ex 6.2: B = FV/(AΔV) with the slide\'s numbers = ?', num: 1.5e7, tol: 0.02, unit: 'N/m²', sol: 'B = {{1.5×10³ × 125×10⁻⁶ // 25×10⁻⁴ × 5×10⁻⁶}} = 1.5×10⁷ (units issue: G‑10)' },
        { q: 'Stress 2×10⁸ N/m², strain 1×10⁻³. Y = ?', num: 2e11, tol: 0.01, unit: 'N/m²', sol: '🧩 2×10¹¹ N/m²' }
      ]
    },
    {
      id: 'ch6-l2', title: 'Density & pressure in liquids', ar: 'الكثافة والضغط في السوائل', src: 'S06 §2–3 · BK p.91–93',
      goals: ['Compute ρ = {{m // V}}', 'Compute P = {{F // A}} and P = P₀ + ρgh'],
      goalsAr: 'ستحسب الكثافة والضغط والضغط عند عمق في سائل.',
      why: { en: 'Divers and dam engineers need pressure at depth.', ar: 'الغواصون ومهندسو السدود يحتاجون حساب الضغط على عمق.' },
      explain: [
        { en: 'Density "is defined as mass per unit volume": ρ = {{m // V}} (kg/m³) (6.4). Density mostly decreases as temperature increases.', ar: 'الكثافة (Density) هي كتلة المتر المكعب الواحد من المادة: ρ = {{m // V}}، ووحدتها kg/m³. الحديد أكثف من الخشب لأن المتر المكعب منه أثقل. ومعظم المواد تقل كثافتها عندما تسخن لأنها تتمدد.' },
        { en: 'Pressure is the perpendicular force per unit area: P = {{F // A}}, unit pascal Pa = N/m² (6.5).', ar: 'الضغط (Pressure) هو القوة العمودية الموزعة على كل متر مربع: P = {{F // A}}، ووحدته الباسكال Pa = N/m². لذلك يخترق المسمار المدبب الخشب بسهولة: القوة نفسها، لكن على مساحة صغيرة جدًا، فيكون الضغط كبيرًا.' },
        { en: 'Liquid column: F = mg = ρAhg ⇒ P = ρgh (6.6). With the atmosphere on top: P = P₀ + ρgh.', ar: 'ضغط السائل على عمق h سببه وزن عمود السائل الذي فوقك: P = ρgh. وإذا كان سطح السائل مكشوفًا للهواء نضيف الضغط الجوي فوقه: P = P₀ + ρgh، وهذا هو الضغط الكلي.' },
        { en: 'Pressure depends on depth, not on the shape of the container (BK p.93).', ar: 'الضغط في السائل يعتمد على العمق فقط، لا على شكل الإناء ولا على كمية الماء فيه. فعند العمق نفسه يكون الضغط واحدًا في كوب ضيق وفي حوض سباحة (BK p.93).' }
      ],
      terms: [['Density', 'الكثافة', 'm/V'], ['Pressure', 'الضغط', 'F/A'], ['Pascal', 'باسكال', 'N/m²'], ['Atmospheric pressure', 'الضغط الجوي', '≈ 1×10⁵ Pa']],
      formulas: [{ f: 'ρ = {{m // V}}', name: '(6.4)', sym: [['ρ', 'density', 'kg/m³', 'الكثافة'], ['m', 'mass', 'kg', 'الكتلة'], ['V', 'volume', 'm³', 'الحجم']], cond: '—' }, { f: 'P = {{F // A}} ,  P = P₀ + ρgh', name: '(6.5–6.6)', sym: [['P', 'pressure', 'Pa', 'الضغط'], ['F', 'force', 'N', 'القوة'], ['A', 'area', 'm²', 'المساحة'], ['P₀', 'atmospheric pressure', 'Pa', 'الضغط الجوي'], ['ρ', 'liquid density', 'kg/m³', 'كثافة السائل'], ['h', 'depth', 'm', 'العمق']], cond: 'Fluid at rest.' }],
      life: { en: 'Every 10 m of sea water adds about 1 atmosphere of pressure on a diver.', ar: 'كل 10 أمتار من ماء البحر تضيف ضغطًا جويًا تقريبًا.' },
      worked: { src: 'S06 Ex 6.5 · BK p.93', q: 'Submarine at 30 m, hatch area 2 m², ρ = 1025 kg/m³. Force on hatch?', steps: ['P = P₀ + ρgh = 10⁵ + 1025·9.8·30 = 401 350 Pa', 'F = PA = 802 700 N'], ans: 'F = 8.03 × 10⁵ N' },
      tryit: { src: 'BK p.100 Exercise 5', q: 'A 65 kg student stands on one foot of area 250 cm². Pressure on the ground?', ans: 25480, tol: 0.01, unit: 'Pa', hint: 'A = 0.025 m², F = mg', sol: 'P = {{637 // 0.025}} = 25 480 Pa (both feet: 12 740 Pa)' },
      checks: [
        { q: '100 g of glycerol occupies 79.3 cm³. ρ? (S06 Ex 6.4)', o: ['1261 kg/m³', '1.261 kg/m³', '793 kg/m³', '12.6 kg/m³'], a: 0, why: 'ρ = {{0.1 // 79.3×10⁻⁶}}.' },
        { q: 'Doubling the depth doubles…', o: ['total pressure', 'gauge pressure ρgh', 'density', 'P₀'], a: 1, why: 'ρgh ∝ h.' }
      ],
      mistakes: [['Forgetting P₀ when asked for total pressure', 'Read whether "total" or "due to the liquid".'], ['Using cm for h', 'Convert to m.']],
      summary: ['ρ = {{m // V}}', 'P = {{F // A}}', 'P = P₀ + ρgh'],
      quiz: [
        { q: 'Liquid 10 kg in 0.5 m³ (BK Ex.2). ρ = ?', num: 20, tol: 0, unit: 'kg/m³', sol: '{{10 // 0.5}}' },
        { q: 'Oil ρ = 900, 1 m deep (BK Ex.7a). Pressure due to oil?', num: 8820, tol: 0.01, unit: 'Pa', sol: '900·9.8·1 = 8820 Pa; total = 1.03×10⁵ + 8820 = 1.118×10⁵ Pa' },
        { q: 'Block 2×3×4 m, 5000 kg (BK Ex.4). Largest pressure on ground?', num: 8167, tol: 0.01, unit: 'Pa', sol: 'P = {{49 000 N // 6 m²}} = 8167 Pa (smallest: {{49 000 N // 12 m²}} = 4083 Pa)' }
      ]
    },
    {
      id: 'ch6-l3', title: 'Pascal\'s law, barometer & manometer', ar: 'قاعدة باسكال والبارومتر والمانومتر', src: 'S06 §3 · BK p.93–95',
      goals: ['Use {{f // a}} = {{F // A}}', 'Find atmospheric pressure with a barometer', 'Find gas pressure with a manometer'],
      goalsAr: 'ستطبق قاعدة باسكال وتحسب الضغط بالبارومتر والمانومتر.',
      why: { en: 'Car brakes and hydraulic lifts multiply force using Pascal\'s law.', ar: 'فرامل السيارة والرافعة الهيدروليكية تضاعف القوة بقاعدة باسكال.' },
      explain: [
        { en: 'Pascal\'s law: "A change in pressure at any point in an enclosed fluid at rest is transmitted undiminished to all points in the fluid." Hydraulic press: {{f // a}} = {{F // A}}.', ar: 'قاعدة باسكال: إذا زاد الضغط في نقطة من سائل محصور، انتقلت الزيادة كاملة إلى كل نقاط السائل. وعليها تعمل المكابس الهيدروليكية: الضغط متساوٍ على المكبسين، أي {{f // a}} = {{F // A}}، فقوة صغيرة على مكبس صغير تعطي قوة كبيرة على مكبس كبير.' },
        { en: 'Areas scale with r² (or d²): {{F // f}} = ( {{R // r}} )².', ar: 'المساحة تتناسب مع مربع نصف القطر، لذلك نسبة القوتين تساوي مربع نسبة نصفي القطرين: {{F // f}} = ( {{R // r}} )². فإذا كان نصف قطر المكبس الكبير أكبر بعشر مرات تكون قوته أكبر بمئة مرة.' },
        { en: 'Barometer: P₀ = ρgh (mercury column 0.76 m). Manometer: P = P₀ + ρgh.', ar: 'البارومتر يقيس الضغط الجوي بارتفاع عمود زئبق: P₀ = ρgh، وعند سطح البحر يكون العمود 0.76 m تقريبًا. أما المانومتر فيقيس ضغط غاز محصور بفرق ارتفاع السائل في أنبوب على شكل حرف U: P = P₀ + ρgh.' }
      ],
      terms: [['Pascal\'s law', 'قاعدة باسكال', 'Pressure transmitted undiminished'], ['Hydraulic press', 'المكبس الهيدروليكي', 'Force multiplier'], ['Barometer', 'البارومتر', 'Measures P₀'], ['Manometer', 'المانومتر', 'Measures gas pressure']],
      formulas: [{ f: '{{f // a}} = {{F // A}}', name: 'Hydraulic press', sym: [['f, F', 'small/large piston force', 'N', 'قوة المكبس الصغير والكبير'], ['a, A', 'small/large piston area', 'm²', 'مساحة المكبس الصغير والكبير']], cond: 'Same level, fluid at rest.' }, { f: 'P₀ = ρgh ,  P = P₀ + ρgh', name: 'Barometer / manometer', sym: [['P₀', 'atmospheric pressure', 'Pa', 'الضغط الجوي'], ['ρ', 'liquid density', 'kg/m³', 'كثافة السائل'], ['h', 'column height difference', 'm', 'فرق ارتفاع عمود السائل']], cond: '—' }],
      life: { en: 'A garage lift raises a 1500 kg car with a small pump because the large piston has many times the area.', ar: 'رافعة الورشة ترفع سيارة بمضخة صغيرة لأن مساحة المكبس الكبير أكبر بكثير.' },
      worked: { src: 'BK Ex 6.6 p.94', q: 'Piston radii 2 cm and 20 cm. Large piston force 2000 N. Small piston force?', steps: ['f = {{F a // A}} = {{2000 × π × 0.02² // π × 0.2²}}', 'f = {{2000 // 100}} = 20 N'], ans: 'f = 20 N' },
      tryit: { src: 'BK p.101 Exercise 9', q: 'Pistons of diameters 60 and 180 (same units). Small force 10 N. Large force?', ans: 90, tol: 0.01, unit: 'N', hint: '( {{180 // 60}} )² = 9', sol: 'F = 10 × 9 = 90 N' },
      checks: [
        { q: 'Water barometer height for P₀ = 10⁵ Pa (S06 Ex 6.7)?', o: ['10.2 m', '0.76 m', '1.02 m', '102 m'], a: 0, why: 'h = {{10⁵ // 1000 × 9.8}}.' },
        { q: 'Manometer: mercury 40 cm above (S06 Ex 6.8). Gas pressure?', o: ['153 312 Pa', '53 312 Pa', '100 000 Pa', '46 688 Pa'], a: 0, why: 'P₀ + ρgh.' }
      ],
      mistakes: [['Using the radius ratio without squaring', 'Area ratio = (radius ratio)².']],
      summary: ['{{f // a}} = {{F // A}}', 'Barometer P₀ = ρgh', 'Manometer P = P₀ + ρgh'],
      quiz: [
        { q: 'Half diameters 20 and 40 cm (BK Ex.8). F₂ : F₁ = ?', num: 4, tol: 0, unit: '', sol: '( {{40 // 20}} )² = 4' },
        { q: 'Mercury barometer: h = 0.76 m, ρ = 13 600. P₀ = ?', num: 101293, tol: 0.01, unit: 'Pa', sol: '13600·9.8·0.76 = 1.013×10⁵ Pa (🧩)' }
      ]
    },
    {
      id: 'ch6-l4', title: 'Fluid flow: continuity & Bernoulli', ar: 'جريان الموائع: الاستمرارية وبرنولي', src: 'S06 §4 · BK p.96–99',
      goals: ['State ideal‑fluid assumptions', 'Use R = Av and A₁v₁ = A₂v₂', 'Apply Bernoulli\'s equation'],
      goalsAr: 'ستطبق معادلة الاستمرارية ومعادلة برنولي بافتراضات المائع المثالي.',
      why: { en: 'It explains garden‑hose jets, aircraft lift and perfume sprays (BK p.99).', ar: 'تفسر اندفاع ماء الخرطوم ورفع الطائرة وبخاخ العطر.' },
      explain: [
        { en: 'Ideal fluid: incompressible, non‑viscous, steady (regular) flow, irrotational (BK p.96).', ar: 'لتبسيط دراسة السوائل المتحركة نفترض مائعًا مثاليًا: لا ينضغط فحجمه ثابت، ولا لزوجة فيه أي لا احتكاك داخلي، وجريانه منتظم فلا تتغير سرعته عند كل نقطة مع الزمن، ولا تكون فيه دوامات (BK p.96).' },
        { en: 'Flow rate R = Av (m³/s). Continuity: A₁v₁ = A₂v₂ (6.7): narrower pipe → faster flow.', ar: 'معدل التدفق R = Av هو حجم السائل الذي يمر كل ثانية (m³/s). ولأن السائل لا ينضغط يبقى هذا المعدل ثابتًا على طول الأنبوب: A₁v₁ = A₂v₂. فعندما يضيق الأنبوب تزيد السرعة، كما يحدث عندما تضغط فوهة خرطوم الماء.' },
        { en: 'Bernoulli (energy conservation): P + hρg + ½ρv² is constant along a flow line (6.8).', ar: 'معادلة برنولي هي حفظ الطاقة للسائل المتحرك: مجموع الضغط P، وطاقة الوضع لكل وحدة حجم hρg، والطاقة الحركية لكل وحدة حجم ½ρv²، ثابت على طول خط الجريان.' },
        { en: 'Horizontal tube: P₁ − P₂ = ½ρ(v₂² − v₁²) → faster flow, lower pressure. Static fluid: P₁ − P₂ = (h₂ − h₁)ρg.', ar: 'في أنبوب أفقي يتساوى الارتفاع، فتبقى المعادلة P₁ − P₂ = ½ρ(v₂² − v₁²): حيث تكون السرعة أكبر يكون الضغط أقل. وإذا كان السائل ساكنًا تعود المعادلة إلى قانون الضغط في السوائل: P₁ − P₂ = (h₂ − h₁)ρg.' }
      ],
      terms: [['Flow rate', 'معدل التدفق', 'R = Av'], ['Continuity equation', 'معادلة الاستمرارية', 'A₁v₁ = A₂v₂'], ['Streamline', 'خط الانسياب', 'Path of fluid particles'], ['Viscosity', 'اللزوجة', 'Internal friction']],
      formulas: [{ f: 'A₁v₁ = A₂v₂', name: 'Continuity (6.7)', sym: [['A', 'cross‑section area', 'm²', 'مساحة المقطع'], ['v', 'flow speed', 'm/s', 'سرعة السائل']], cond: 'Incompressible fluid.' }, { f: 'P₁ + h₁ρg + ½ρv₁² = P₂ + h₂ρg + ½ρv₂²', name: 'Bernoulli (6.8)', sym: [['P', 'pressure', 'Pa', 'الضغط'], ['h', 'height', 'm', 'الارتفاع'], ['ρ', 'density', 'kg/m³', 'الكثافة'], ['v', 'flow speed', 'm/s', 'سرعة السائل']], cond: 'Ideal fluid, along one streamline.' }],
      life: { en: 'Putting your thumb on a hose reduces A, so v increases and the water shoots farther.', ar: 'تضييق فوهة الخرطوم بالإبهام يزيد سرعة الماء.' },
      worked: { src: 'S06 Ex 6.10 · BK p.99', q: 'Horizontal tube: P₁ = 1332.8 Pa at v₁ = 0.5 m/s. P₂ where v₂ = 0.8 m/s?', steps: ['P₂ = P₁ − ½ρ(v₂² − v₁²)', '= 1332.8 − ½·10³·(0.64 − 0.25) = 1332.8 − 195', 'P₂ = 1137.8 Pa'], ans: '1137.8 N/m²' },
      tryit: { src: 'BK p.101 Exercise 11', q: 'A 0.25 m diameter gas pipe delivers 1.55 m³/s. Gas speed?', ans: 31.58, tol: 0.02, unit: 'm/s', hint: 'v = {{R // A}}, A = π(0.125)²', sol: 'v = {{1.55 // 0.0491}} = 31.6 m/s' },
      checks: [
        { q: 'Tube radius 0.2 m → 0.1 m, v₁ = 1 m/s (BK Ex 6.9). v₂?', o: ['4 m/s', '2 m/s', '0.25 m/s', '1 m/s'], a: 0, why: '( {{0.2 // 0.1}} )² = 4.' },
        { q: 'In a horizontal pipe, where v is larger, P is…', o: ['larger', 'smaller', 'same'], a: 1, why: 'Bernoulli.' }
      ],
      mistakes: [['Using the radius ratio without squaring', 'A ∝ r².'], ['Applying Bernoulli to viscous flow', 'Only ideal fluids.']],
      summary: ['R = Av', 'A₁v₁ = A₂v₂', 'P + ρgh + ½ρv² = const'],
      quiz: [
        { q: 'Hole 16 m below the water surface of an open tank (BK Ex.10a). Exit speed?', num: 17.71, tol: 0.02, unit: 'm/s', sol: 'v = √(2gh) = √313.6 = 17.7 m/s (🧩 Torricelli from Bernoulli)' },
        { q: 'Same hole, flow 2.5×10⁻³ m³/min (BK Ex.10b). Hole diameter in mm?', num: 1.73, tol: 0.03, unit: 'mm', sol: 'R = 4.17×10⁻⁵ m³/s, A = {{R // v}} = 2.35×10⁻⁶ m² → d = 1.73 mm' }
      ]
    }
  ]
});
