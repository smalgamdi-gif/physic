/* Every form of each course law: what each form finds, what you need to know, and how it comes from the course form.
   Keyed by "lessonId#formulaIndex" like WORDS. base = the law as written in the course (📘); the others are the same law
   rearranged with algebra (🧩 additional design, not new laws). {{a // b}} is drawn as a fraction a over b. */
(function () {
  const B = (find, f, en, ar) => ({ find, f, en, ar, base: true });
  const D = (find, f, en, ar, steps, how, howAr) => ({ find, f, en, ar, steps, how, howAr });
  window.FORMS = {
    'ch1-l2#0': [
      B('m/s', 'v (m/s) = {{v (km/h) // 3.6}}', 'a speed in m/s from km/h', 'لتحويل السرعة من km/h إلى m/s: اقسم على 3.6'),
      D('km/h', 'v (km/h) = v (m/s) × 3.6', 'a speed in km/h from m/s', 'لتحويل السرعة من m/s إلى km/h: اضرب في 3.6',
        ['v (m/s) = {{v (km/h) // 3.6}}', 'v (m/s) × 3.6 = v (km/h)'], 'Multiply both sides by 3.6.', 'اضرب الطرفين في 3.6.')
    ],
    'ch1-l2#1': [
      B('kg/m³', 'ρ (kg/m³) = ρ (g/cm³) × 1000', 'a density in kg/m³ from g/cm³', 'لتحويل الكثافة من g/cm³ إلى kg/m³: اضرب في 1000'),
      D('g/cm³', 'ρ (g/cm³) = {{ρ (kg/m³) // 1000}}', 'a density in g/cm³ from kg/m³', 'لتحويل الكثافة من kg/m³ إلى g/cm³: اقسم على 1000',
        ['ρ (kg/m³) = ρ (g/cm³) × 1000', '{{ρ (kg/m³) // 1000}} = ρ (g/cm³)'], 'Divide both sides by 1000.', 'اقسم الطرفين على 1000.')
    ],
    'ch2-l2#0': [
      B('C', 'C = √(A² + B²)', 'the size of the resultant of two perpendicular vectors', 'لحساب مقدار محصلة متجهين متعامدين'),
      B('θ', 'θ = tan⁻¹( {{B // A}} )', 'the direction of the resultant, measured from A', 'لحساب اتجاه المحصلة مقيسًا من المتجه A'),
      D('B', 'B = √(C² − A²)', 'a missing perpendicular vector when you know the resultant and the other vector', 'لحساب المتجه الناقص إذا عرفت المحصلة والمتجه الآخر',
        ['C² = A² + B²', 'C² − A² = B²', 'B = √(C² − A²)'], 'Square both sides, subtract A², then take the square root.', 'ربّع الطرفين، ثم اطرح A² من الطرفين، ثم خذ الجذر التربيعي.')
    ],
    'ch2-l2#1': [
      B('C', 'C = √(A² + B² − 2AB cos θ)', 'the resultant for any angle between the vectors', 'لحساب المحصلة لأي زاوية بين المتجهين'),
      D('θ', 'cos θ = {{A² + B² − C² // 2AB}}', 'the triangle angle when all three magnitudes are known', 'لحساب الزاوية إذا عرفت المقادير الثلاثة',
        ['C² = A² + B² − 2AB cos θ', '2AB cos θ = A² + B² − C²', 'cos θ = {{A² + B² − C² // 2AB}}'], 'Square both sides, move 2AB cos θ to the left and C² to the right, then divide by 2AB.', 'ربّع الطرفين، انقل 2AB cos θ إلى طرف و C² إلى الطرف الآخر، ثم اقسم على 2AB.')
    ],
    'ch2-l3#0': [
      B('Aₓ', 'Aₓ = A cos θ', 'the x‑component', 'لحساب المركبة السينية'),
      B('A_y', 'A_y = A sin θ', 'the y‑component', 'لحساب المركبة الصادية'),
      D('A', 'A = √(Aₓ² + A_y²)', 'the magnitude when you know the components', 'لحساب مقدار المتجه من مركبتيه',
        ['A² = Aₓ² + A_y²', 'A = √(Aₓ² + A_y²)'], 'The components are the two sides of a right triangle: use Pythagoras.', 'المركبتان ضلعا مثلث قائم وتره المتجه، فنستخدم فيثاغورس.'),
      D('θ', 'θ = tan⁻¹( {{A_y // Aₓ}} )', 'the direction from the components (check the quadrant from their signs)', 'لحساب الاتجاه من المركبتين، وحدد الربع من إشارتيهما',
        ['{{A_y // Aₓ}} = {{A sin θ // A cos θ}}', '{{A_y // Aₓ}} = tan θ'], 'Divide the two components: A cancels and tan θ is left.', 'اقسم المركبة الصادية على السينية، فتُختصر A ويبقى tan θ.')
    ],
    'ch2-l3#1': [
      B('R', 'R = (Aₓ+Bₓ)î + (A_y+B_y)ĵ + (A_z+B_z)k̂', 'the resultant in unit‑vector form', 'لحساب المحصلة بصيغة متجهات الوحدة: اجمع كل مركبة مع مثيلتها'),
      D('|R|', '|R| = √(Rₓ² + R_y²)', 'the size of the resultant from its components', 'لحساب مقدار المحصلة من مركبتيها',
        ['Rₓ = Aₓ + Bₓ ,  R_y = A_y + B_y', '|R| = √(Rₓ² + R_y²)'], 'Add the components first, then use Pythagoras.', 'اجمع المركبات أولًا ثم استخدم فيثاغورس.'),
      D('θ', 'θ = tan⁻¹( {{R_y // Rₓ}} )', 'the direction of the resultant', 'لحساب اتجاه المحصلة',
        ['tan θ = {{R_y // Rₓ}}'], 'Same as for a single vector.', 'كما في المتجه الواحد.')
    ],
    'ch2-l4#0': [
      B('A·B', 'A·B = AB cos θ = AₓBₓ + A_yB_y + A_zB_z', 'the scalar product (a number)', 'لحساب الضرب القياسي، والنتيجة عدد'),
      D('θ', 'cos θ = {{A·B // AB}}', 'the angle between two vectors (get A·B from the components first)', 'لحساب الزاوية بين متجهين: احسب A·B من المركبات أولًا، ثم احسب المقدارين A و B',
        ['A·B = AB cos θ', 'cos θ = {{A·B // AB}}'], 'Divide both sides by AB.', 'اقسم الطرفين على AB.')
    ],
    'ch2-l4#1': [
      B('|A×B|', '|A×B| = AB sin θ', 'the size of the vector product', 'لحساب مقدار الضرب الاتجاهي'),
      D('θ', 'sin θ = {{|A×B| // AB}}', 'the angle when you know |A×B| and both magnitudes', 'لحساب الزاوية إذا عرفت مقدار الضرب الاتجاهي والمقدارين',
        ['|A×B| = AB sin θ', 'sin θ = {{|A×B| // AB}}'], 'Divide both sides by AB.', 'اقسم الطرفين على AB.')
    ],
    'ch3-l1#0': [
      B('Δx', 'Δx = x₂ − x₁', 'the displacement', 'لحساب الإزاحة: الموقع النهائي ناقص الابتدائي'),
      D('x₂', 'x₂ = x₁ + Δx', 'the final position', 'لحساب الموقع النهائي',
        ['Δx = x₂ − x₁', 'Δx + x₁ = x₂'], 'Add x₁ to both sides.', 'أضف x₁ للطرفين.'),
      D('x₁', 'x₁ = x₂ − Δx', 'the starting position', 'لحساب الموقع الابتدائي',
        ['Δx = x₂ − x₁', 'x₁ = x₂ − Δx'], 'Add x₁ to both sides, then subtract Δx.', 'أضف x₁ للطرفين ثم اطرح Δx.')
    ],
    'ch3-l2#0': [
      B('v_av', 'v_av = {{Δx // Δt}}', 'the average velocity', 'لحساب السرعة المتوسطة: الإزاحة ÷ الزمن'),
      D('Δx', 'Δx = v_av Δt', 'the displacement from the average velocity and the time', 'لحساب الإزاحة إذا عرفت السرعة المتوسطة والزمن',
        ['v_av = {{Δx // Δt}}', 'v_av Δt = Δx'], 'Multiply both sides by Δt.', 'اضرب الطرفين في Δt.'),
      D('Δt', 'Δt = {{Δx // v_av}}', 'the time to cover a displacement', 'لحساب الزمن إذا عرفت الإزاحة والسرعة المتوسطة',
        ['v_av Δt = Δx', 'Δt = {{Δx // v_av}}'], 'Multiply both sides by Δt, then divide by v_av.', 'اضرب الطرفين في Δt ثم اقسم على v_av.'),
      B('v', 'v = {{dx // dt}}', 'the velocity at one instant: differentiate x(t)', 'لحساب السرعة اللحظية: اشتق الموقع x(t) بالنسبة للزمن')
    ],
    'ch3-l3#0': [
      B('a_av', 'a_av = {{Δv // Δt}}', 'the average acceleration', 'لحساب التسارع المتوسط: تغير السرعة ÷ الزمن'),
      D('Δv', 'Δv = a_av Δt', 'the change of velocity', 'لحساب تغير السرعة إذا عرفت التسارع والزمن',
        ['a_av = {{Δv // Δt}}', 'a_av Δt = Δv'], 'Multiply both sides by Δt.', 'اضرب الطرفين في Δt.'),
      D('Δt', 'Δt = {{Δv // a_av}}', 'the time for a given change of velocity', 'لحساب الزمن اللازم لتغير معين في السرعة',
        ['a_av Δt = Δv', 'Δt = {{Δv // a_av}}'], 'Multiply both sides by Δt, then divide by a_av.', 'اضرب الطرفين في Δt ثم اقسم على a_av.'),
      B('a', 'a = {{dv // dt}}', 'the acceleration at one instant: differentiate v(t)', 'لحساب التسارع اللحظي: اشتق السرعة v(t) بالنسبة للزمن')
    ],
    'ch3-l4#0': [
      B('v_f', 'v_f = v_i + a t', 'the final velocity after a time t', 'لحساب السرعة النهائية بعد زمن t'),
      D('a', 'a = {{v_f − v_i // t}}', 'the acceleration from two velocities and the time', 'لحساب التسارع إذا عرفت السرعتين والزمن',
        ['v_f − v_i = a t', 'a = {{v_f − v_i // t}}'], 'Subtract v_i from both sides, then divide by t.', 'اطرح v_i من الطرفين ثم اقسم على t.'),
      D('t', 't = {{v_f − v_i // a}}', 'the time to change from v_i to v_f', 'لحساب الزمن اللازم لتتغير السرعة من v_i إلى v_f',
        ['v_f − v_i = a t', 't = {{v_f − v_i // a}}'], 'Subtract v_i from both sides, then divide by a.', 'اطرح v_i من الطرفين ثم اقسم على a.'),
      D('v_i', 'v_i = v_f − a t', 'the starting velocity', 'لحساب السرعة الابتدائية',
        ['v_f = v_i + a t', 'v_f − a t = v_i'], 'Subtract at from both sides.', 'اطرح at من الطرفين.')
    ],
    'ch3-l4#1': [
      B('x_f', 'x_f = x_i + v_i t + ½ a t²', 'the position after a time t', 'لحساب الموقع بعد زمن t'),
      D('Δx', 'Δx = x_f − x_i = v_i t + ½ a t²', 'the displacement after a time t', 'لحساب الإزاحة بعد زمن t',
        ['x_f − x_i = v_i t + ½ a t²'], 'Subtract x_i from both sides.', 'اطرح x_i من الطرفين.'),
      D('t', 't = √( {{2Δx // a}} )   (only if v_i = 0)', 'the time to move Δx when starting from rest (e.g. a dropped stone)', 'لحساب الزمن إذا بدأ الجسم من السكون، مثل حجر يُترك ليسقط',
        ['Δx = ½ a t²', '2Δx = a t²', 't² = {{2Δx // a}}', 't = √( {{2Δx // a}} )'], 'Put v_i = 0, multiply by 2, divide by a, then take the root.', 'عوّض v_i = 0، ثم اضرب في 2، واقسم على a، وخذ الجذر.'),
      D('t', 't = {{−v_i + √(v_i² + 2aΔx) // a}}', 'the time when v_i ≠ 0 (thrown up or down from a height)', 'لحساب الزمن إذا كانت هناك سرعة ابتدائية: نحل معادلة تربيعية',
        ['½ a t² + v_i t − Δx = 0', 't = {{−v_i ± √(v_i² + 2aΔx) // a}}', 'keep the positive root'], 'It is a quadratic in t: use the quadratic formula and keep the positive time.', 'المعادلة تربيعية في t: استخدم القانون العام وخذ الزمن الموجب فقط.'),
      D('a', 'a = {{2(Δx − v_i t) // t²}}', 'the acceleration from displacement and time', 'لحساب التسارع إذا عرفت الإزاحة والزمن والسرعة الابتدائية',
        ['Δx − v_i t = ½ a t²', '2(Δx − v_i t) = a t²', 'a = {{2(Δx − v_i t) // t²}}'], 'Subtract v_i t, multiply by 2, then divide by t².', 'اطرح v_i t من الطرفين، ثم اضرب في 2، ثم اقسم على t².')
    ],
    'ch3-l4#2': [
      B('v_f²', 'v_f² = v_i² + 2aΔx', 'the final speed when the time is not given', 'لحساب السرعة النهائية عندما لا يُعطى الزمن'),
      D('v_f', 'v_f = √(v_i² + 2aΔx)', 'the final speed itself', 'لحساب السرعة النهائية نفسها',
        ['v_f² = v_i² + 2aΔx', 'v_f = √(v_i² + 2aΔx)'], 'Take the square root of both sides.', 'خذ الجذر التربيعي للطرفين.'),
      D('a', 'a = {{v_f² − v_i² // 2Δx}}', 'the acceleration from two speeds and a distance', 'لحساب التسارع إذا عرفت السرعتين والمسافة',
        ['v_f² − v_i² = 2aΔx', 'a = {{v_f² − v_i² // 2Δx}}'], 'Subtract v_i², then divide by 2Δx.', 'اطرح v_i² من الطرفين، ثم اقسم على 2Δx.'),
      D('Δx', 'Δx = {{v_f² − v_i² // 2a}}', 'the stopping or speeding‑up distance', 'لحساب المسافة اللازمة للتوقف أو لبلوغ سرعة معينة',
        ['v_f² − v_i² = 2aΔx', 'Δx = {{v_f² − v_i² // 2a}}'], 'Subtract v_i², then divide by 2a.', 'اطرح v_i² من الطرفين، ثم اقسم على 2a.'),
      D('y_max', 'y_max = {{v_i² // 2g}}', 'the maximum height of a body thrown straight up', 'لحساب أقصى ارتفاع لجسم مقذوف رأسيًا لأعلى',
        ['at the top v_f = 0 and a = −g', '0 = v_i² − 2g y_max', 'y_max = {{v_i² // 2g}}'], 'At the top the velocity is zero; put v_f = 0, a = −g and solve for the distance.', 'عند القمة تكون السرعة صفرًا: عوّض v_f = 0 و a = −g ثم أوجد المسافة.')
    ],
    'ch4-l1#0': [
      B('ΣF', 'ΣF = 0  ⇔  ΣFₓ = 0 and ΣF_y = 0', 'the condition for rest or constant velocity', 'شرط الاتزان: الجسم ساكن أو يتحرك بسرعة ثابتة'),
      D('F₃', 'F₃ = −(F₁ + F₂)', 'the force that balances the other forces', 'لحساب القوة اللازمة لموازنة باقي القوى',
        ['F₁ + F₂ + F₃ = 0', 'F₃ = −(F₁ + F₂)'], 'Move the known forces to the other side: the unknown force is their negative.', 'انقل القوى المعلومة للطرف الآخر، فتكون القوة المجهولة سالب مجموعها، أي مساوية لها في المقدار ومعاكسة في الاتجاه.')
    ],
    'ch4-l2#0': [
      B('ΣF', 'ΣF = m a', 'the net force needed for an acceleration', 'لحساب القوة المحصلة اللازمة لإكساب الجسم تسارعًا'),
      D('a', 'a = {{ΣF // m}}', 'the acceleration produced by a net force', 'لحساب التسارع إذا عرفت القوة المحصلة والكتلة',
        ['ΣF = m a', '{{ΣF // m}} = {{m a // m}}', 'a = {{ΣF // m}}'], 'Divide both sides by m.', 'اقسم الطرفين على m فتُختصر الكتلة ويبقى a.'),
      D('m', 'm = {{ΣF // a}}', 'the mass from the force and the acceleration', 'لحساب الكتلة إذا عرفت القوة والتسارع',
        ['ΣF = m a', 'm = {{ΣF // a}}'], 'Divide both sides by a.', 'اقسم الطرفين على a.')
    ],
    'ch4-l2#1': [
      B('F_w', 'F_w = m g', 'the weight of a mass', 'لحساب الوزن من الكتلة'),
      D('m', 'm = {{F_w // g}}', 'the mass from the weight', 'لحساب الكتلة من الوزن',
        ['F_w = m g', 'm = {{F_w // g}}'], 'Divide both sides by g.', 'اقسم الطرفين على g.'),
      D('g', 'g = {{F_w // m}}', 'the gravity of another planet from a weight', 'لحساب جاذبية كوكب آخر من وزن جسم معلوم الكتلة',
        ['F_w = m g', 'g = {{F_w // m}}'], 'Divide both sides by m.', 'اقسم الطرفين على m.')
    ],
    'ch5-l1#0': [
      B('W', 'W = F Δr cos θ', 'the work done by a constant force', 'لحساب الشغل الذي تبذله قوة ثابتة'),
      D('F', 'F = {{W // Δr cos θ}}', 'the force from the work', 'لحساب القوة إذا عرفت الشغل والإزاحة والزاوية',
        ['W = F Δr cos θ', 'F = {{W // Δr cos θ}}'], 'Divide both sides by Δr cos θ.', 'اقسم الطرفين على Δr cos θ.'),
      D('Δr', 'Δr = {{W // F cos θ}}', 'the displacement from the work', 'لحساب الإزاحة إذا عرفت الشغل والقوة والزاوية',
        ['W = F Δr cos θ', 'Δr = {{W // F cos θ}}'], 'Divide both sides by F cos θ.', 'اقسم الطرفين على F cos θ.'),
      D('θ', 'cos θ = {{W // F Δr}}', 'the angle between the force and the motion', 'لحساب الزاوية بين القوة والإزاحة',
        ['W = F Δr cos θ', 'cos θ = {{W // F Δr}}'], 'Divide both sides by F Δr, then use cos⁻¹.', 'اقسم الطرفين على F Δr، ثم استخدم cos⁻¹.')
    ],
    'ch5-l2#0': [
      B('KE', 'KE = ½ m v²', 'the kinetic energy of a moving body', 'لحساب الطاقة الحركية'),
      D('v', 'v = √( {{2 KE // m}} )', 'the speed from the kinetic energy', 'لحساب السرعة من الطاقة الحركية',
        ['KE = ½ m v²', '2 KE = m v²', 'v² = {{2 KE // m}}', 'v = √( {{2 KE // m}} )'], 'Multiply by 2, divide by m, then take the root.', 'اضرب الطرفين في 2، ثم اقسم على m، ثم خذ الجذر.'),
      D('m', 'm = {{2 KE // v²}}', 'the mass from the kinetic energy and the speed', 'لحساب الكتلة من الطاقة الحركية والسرعة',
        ['2 KE = m v²', 'm = {{2 KE // v²}}'], 'Multiply by 2, then divide by v².', 'اضرب الطرفين في 2، ثم اقسم على v².'),
      B('W', 'W = KE_f − KE_i', 'the net work from the change in kinetic energy', 'لحساب الشغل الكلي من تغير الطاقة الحركية'),
      D('KE_f', 'KE_f = W + KE_i', 'the final kinetic energy after work is done', 'لحساب الطاقة الحركية النهائية بعد بذل شغل',
        ['W = KE_f − KE_i', 'W + KE_i = KE_f'], 'Add KE_i to both sides.', 'أضف KE_i للطرفين.')
    ],
    'ch5-l3#0': [
      B('ΔPE', 'ΔPE = m g Δh', 'the change of potential energy for a change of height', 'لحساب تغير طاقة الوضع عند تغير الارتفاع'),
      D('Δh', 'Δh = {{ΔPE // m g}}', 'the height change from the energy', 'لحساب تغير الارتفاع من طاقة الوضع',
        ['ΔPE = m g Δh', 'Δh = {{ΔPE // m g}}'], 'Divide both sides by mg.', 'اقسم الطرفين على mg.'),
      D('m', 'm = {{ΔPE // g Δh}}', 'the mass from the energy and the height', 'لحساب الكتلة من طاقة الوضع والارتفاع',
        ['ΔPE = m g Δh', 'm = {{ΔPE // g Δh}}'], 'Divide both sides by gΔh.', 'اقسم الطرفين على gΔh.')
    ],
    'ch5-l3#1': [
      B('W', 'W = ΔKE + ΔPE', 'the work by the applied force', 'لحساب شغل القوة المؤثرة = تغير الحركية + تغير الوضع'),
      D('ΔKE', 'ΔKE = W − ΔPE', 'the change in kinetic energy', 'لحساب تغير الطاقة الحركية',
        ['W = ΔKE + ΔPE', 'W − ΔPE = ΔKE'], 'Subtract ΔPE from both sides.', 'اطرح ΔPE من الطرفين.'),
      D('v', 'v = √(2 g h)', 'the speed after falling a height h from rest (no applied work)', 'لحساب سرعة جسم سقط من السكون مسافة h بدون قوة مؤثرة أخرى',
        ['W = 0 → ΔKE = −ΔPE', '½ m v² = m g h', 'v² = 2 g h', 'v = √(2 g h)'], 'Put W = 0: the energy lost as PE becomes KE; m cancels from both sides.', 'عوّض W = 0، فما يخسره الجسم من طاقة وضع يكسبه طاقة حركية، وتُختصر الكتلة من الطرفين.')
    ],
    'ch5-l4#0': [
      B('P', 'P = {{W // t}}', 'the average power', 'لحساب القدرة المتوسطة: الشغل ÷ الزمن'),
      D('W', 'W = P t', 'the work or energy used in a time t', 'لحساب الشغل أو الطاقة المستهلكة في زمن t',
        ['P = {{W // t}}', 'P t = W'], 'Multiply both sides by t.', 'اضرب الطرفين في t.'),
      D('t', 't = {{W // P}}', 'the time a machine needs to do a job', 'لحساب الزمن اللازم لإنجاز شغل معين',
        ['P t = W', 't = {{W // P}}'], 'Multiply by t, then divide by P.', 'اضرب الطرفين في t ثم اقسم على P.')
    ],
    'ch6-l1#0': [
      B('F/A', '{{F // A}} = Y {{ΔL // L}}', 'stress = Y × strain', 'الإجهاد = معامل يونغ × الانفعال'),
      D('Y', 'Y = {{F L // A ΔL}}', "Young's modulus from a stretching test", 'لحساب معامل يونغ من تجربة شد سلك',
        ['{{F // A}} = Y {{ΔL // L}}', '{{F L // A}} = Y ΔL', 'Y = {{F L // A ΔL}}'], 'Multiply both sides by L, then divide by ΔL.', 'اضرب الطرفين في L، ثم اقسم على ΔL.'),
      D('ΔL', 'ΔL = {{F L // A Y}}', 'the extension of a wire under a force', 'لحساب الاستطالة التي تحدثها قوة',
        ['{{F L // A}} = Y ΔL', 'ΔL = {{F L // A Y}}'], 'Multiply both sides by L, then divide by Y.', 'اضرب الطرفين في L، ثم اقسم على Y.'),
      D('F', 'F = {{Y A ΔL // L}}', 'the force needed for an extension', 'لحساب القوة اللازمة لاستطالة معينة',
        ['{{F // A}} = Y {{ΔL // L}}', 'F = {{Y A ΔL // L}}'], 'Multiply both sides by A.', 'اضرب الطرفين في A.')
    ],
    'ch6-l1#1': [
      B('F/A', '{{F // A}} = −B {{ΔV // V}}', 'the pressure change and the volume change', 'الإجهاد الحجمي = − معامل المرونة الحجمي × الانفعال الحجمي'),
      D('B', 'B = −{{F V // A ΔV}}', 'the bulk modulus', 'لحساب معامل المرونة الحجمي',
        ['{{F // A}} = −B {{ΔV // V}}', '{{F V // A}} = −B ΔV', 'B = −{{F V // A ΔV}}'], 'Multiply both sides by V, then divide by −ΔV.', 'اضرب الطرفين في V، ثم اقسم على −ΔV. والنتيجة موجبة لأن ΔV سالبة.'),
      D('ΔV', 'ΔV = −{{F V // A B}}', 'the change of volume under pressure', 'لحساب نقص الحجم تحت الضغط',
        ['{{F V // A}} = −B ΔV', 'ΔV = −{{F V // A B}}'], 'Multiply by V, then divide by −B.', 'اضرب الطرفين في V، ثم اقسم على −B.')
    ],
    'ch6-l1#2': [
      B('F/A', '{{F // A}} = S {{x // L}}', 'shear stress = S × shear strain', 'إجهاد القص = معامل القص × انفعال القص'),
      D('S', 'S = {{F L // A x}}', 'the shear modulus', 'لحساب معامل القص',
        ['{{F // A}} = S {{x // L}}', '{{F L // A}} = S x', 'S = {{F L // A x}}'], 'Multiply both sides by L, then divide by x.', 'اضرب الطرفين في L، ثم اقسم على x.'),
      D('x', 'x = {{F L // A S}}', 'how far the top face shifts', 'لحساب إزاحة الوجه العلوي',
        ['{{F L // A}} = S x', 'x = {{F L // A S}}'], 'Multiply by L, then divide by S.', 'اضرب الطرفين في L، ثم اقسم على S.')
    ],
    'ch6-l2#0': [
      B('ρ', 'ρ = {{m // V}}', 'the density', 'لحساب الكثافة: الكتلة ÷ الحجم'),
      D('m', 'm = ρ V', 'the mass of a known volume', 'لحساب الكتلة إذا عرفت الكثافة والحجم',
        ['ρ = {{m // V}}', 'ρ V = m'], 'Multiply both sides by V.', 'اضرب الطرفين في V.'),
      D('V', 'V = {{m // ρ}}', 'the volume of a known mass', 'لحساب الحجم إذا عرفت الكتلة والكثافة',
        ['ρ V = m', 'V = {{m // ρ}}'], 'Multiply by V, then divide by ρ.', 'اضرب الطرفين في V ثم اقسم على ρ.')
    ],
    'ch6-l2#1': [
      B('P', 'P = {{F // A}}', 'the pressure of a force on an area', 'لحساب الضغط: القوة ÷ المساحة'),
      D('F', 'F = P A', 'the force a pressure makes on an area', 'لحساب القوة التي يولدها ضغط على مساحة',
        ['P = {{F // A}}', 'P A = F'], 'Multiply both sides by A.', 'اضرب الطرفين في A.'),
      B('P', 'P = P₀ + ρ g h', 'the absolute pressure at a depth h', 'لحساب الضغط الكلي على عمق h'),
      D('h', 'h = {{P − P₀ // ρ g}}', 'the depth for a given pressure', 'لحساب العمق الذي يكون عنده ضغط معين',
        ['P − P₀ = ρ g h', 'h = {{P − P₀ // ρ g}}'], 'Subtract P₀, then divide by ρg.', 'اطرح P₀ من الطرفين، ثم اقسم على ρg.'),
      D('P − P₀', 'P − P₀ = ρ g h', 'the gauge pressure (what a gauge reads)', 'لحساب الضغط المقيس، أي الزيادة على الضغط الجوي',
        ['P = P₀ + ρ g h', 'P − P₀ = ρ g h'], 'Subtract P₀ from both sides.', 'اطرح P₀ من الطرفين.')
    ],
    'ch6-l3#0': [
      B('P', '{{f // a}} = {{F // A}}', 'the same pressure on both pistons', 'الضغط متساوٍ على المكبسين'),
      D('F', 'F = {{f A // a}}', 'the large force on the big piston', 'لحساب القوة الكبيرة على المكبس الكبير',
        ['{{f // a}} = {{F // A}}', 'A × {{f // a}} = F', 'F = {{f A // a}}'], 'Multiply both sides by A.', 'اضرب الطرفين في A.'),
      D('f', 'f = {{F a // A}}', 'the small force needed on the small piston', 'لحساب القوة الصغيرة اللازمة على المكبس الصغير',
        ['{{f // a}} = {{F // A}}', 'f = {{F a // A}}'], 'Multiply both sides by a.', 'اضرب الطرفين في a.'),
      D('F', 'F = f ( {{R // r}} )²', 'the large force when the pistons are given by radius or diameter', 'لحساب القوة الكبيرة إذا أُعطيت أنصاف الأقطار أو الأقطار',
        ['A = π R² ,  a = π r²', 'F = f {{π R² // π r²}}', 'F = f ( {{R // r}} )²'], 'Use A = πR² and a = πr²: π cancels.', 'عوّض A = πR² و a = πr²، فتُختصر π.')
    ],
    'ch6-l3#1': [
      B('P₀', 'P₀ = ρ g h', 'the atmospheric pressure from a barometer column', 'لحساب الضغط الجوي من ارتفاع عمود البارومتر'),
      D('h', 'h = {{P₀ // ρ g}}', 'the height of the barometer column', 'لحساب ارتفاع عمود السائل في البارومتر',
        ['P₀ = ρ g h', 'h = {{P₀ // ρ g}}'], 'Divide both sides by ρg.', 'اقسم الطرفين على ρg.'),
      B('P', 'P = P₀ + ρ g h', 'the gas pressure in a manometer', 'لحساب ضغط الغاز في المانومتر')
    ],
    'ch6-l4#0': [
      B('A₁v₁', 'A₁v₁ = A₂v₂', 'the same flow rate everywhere in the pipe', 'معدل التدفق ثابت في كل مقاطع الأنبوب'),
      D('v₂', 'v₂ = {{A₁ v₁ // A₂}}', 'the new speed in a wider or narrower part', 'لحساب السرعة الجديدة في الجزء الضيق أو الواسع',
        ['A₁v₁ = A₂v₂', 'v₂ = {{A₁ v₁ // A₂}}'], 'Divide both sides by A₂.', 'اقسم الطرفين على A₂.'),
      D('v₂', 'v₂ = v₁ ( {{r₁ // r₂}} )²', 'the new speed when the pipe is given by radius', 'لحساب السرعة الجديدة إذا أُعطي نصف القطر',
        ['A = π r²', 'v₂ = v₁ {{π r₁² // π r₂²}}', 'v₂ = v₁ ( {{r₁ // r₂}} )²'], 'Use A = πr²: π cancels.', 'عوّض A = πr² فتُختصر π.'),
      B('R', 'R = A v', 'the flow rate in m³/s', 'لحساب معدل التدفق بالمتر المكعب لكل ثانية')
    ],
    'ch6-l4#1': [
      B('P', 'P₁ + h₁ρg + ½ρv₁² = P₂ + h₂ρg + ½ρv₂²', 'pressure, height and speed along a streamline', 'العلاقة بين الضغط والارتفاع والسرعة على خط انسياب واحد'),
      D('P₁ − P₂', 'P₁ − P₂ = ½ ρ (v₂² − v₁²)', 'the pressure difference in a horizontal pipe', 'لحساب فرق الضغط في أنبوب أفقي',
        ['h₁ = h₂ : the ρgh terms cancel', 'P₁ − P₂ = ½ρv₂² − ½ρv₁²'], 'In a horizontal pipe h₁ = h₂, so the height terms cancel; move the pressures to one side.', 'في الأنبوب الأفقي يتساوى الارتفاعان فتُختصر حدود الارتفاع، ثم اجمع الضغطين في طرف.'),
      D('P₁ − P₂', 'P₁ − P₂ = ρ g (h₂ − h₁)', 'the pressure difference in a fluid at rest', 'لحساب فرق الضغط في سائل ساكن',
        ['v₁ = v₂ = 0', 'P₁ + h₁ρg = P₂ + h₂ρg', 'P₁ − P₂ = ρ g (h₂ − h₁)'], 'Put both speeds equal to zero.', 'عوّض السرعتين صفرًا.'),
      D('v₂', 'v₂ = √( v₁² + {{2(P₁ − P₂) // ρ}} )', 'the speed in the second part of a horizontal pipe', 'لحساب السرعة في الجزء الثاني من أنبوب أفقي',
        ['P₁ − P₂ = ½ ρ (v₂² − v₁²)', 'v₂² = v₁² + {{2(P₁ − P₂) // ρ}}', 'v₂ = √( v₁² + {{2(P₁ − P₂) // ρ}} )'], 'Multiply by 2/ρ, add v₁², then take the root.', 'اضرب الطرفين في 2/ρ، ثم أضف v₁²، ثم خذ الجذر.')
    ],
    'ch7-l1#0': [
      B('T_C', 'T_C = {{5 // 9}} (T_F − 32)', 'Celsius from Fahrenheit', 'للتحويل من فهرنهايت إلى سيليزية'),
      D('T_F', 'T_F = {{9 // 5}} T_C + 32', 'Fahrenheit from Celsius', 'للتحويل من سيليزية إلى فهرنهايت',
        ['T_C = {{5 // 9}} (T_F − 32)', '{{9 // 5}} T_C = T_F − 32', 'T_F = {{9 // 5}} T_C + 32'], 'Multiply both sides by 9/5, then add 32.', 'اضرب الطرفين في 9/5، ثم أضف 32.'),
      B('T_K', 'T_K = T_C + 273', 'kelvin from Celsius', 'للتحويل من سيليزية إلى كلفن'),
      D('T_C', 'T_C = T_K − 273', 'Celsius from kelvin', 'للتحويل من كلفن إلى سيليزية',
        ['T_K = T_C + 273', 'T_K − 273 = T_C'], 'Subtract 273 from both sides.', 'اطرح 273 من الطرفين.')
    ],
    'ch7-l2#0': [
      B('Δℓ', 'Δℓ = α ℓ ΔT', 'how much a rod gets longer', 'لحساب مقدار التمدد الطولي'),
      D('ℓ₂', 'ℓ₂ = ℓ₁ (1 + α ΔT)', 'the new length after heating', 'لحساب الطول الجديد بعد التسخين',
        ['ℓ₂ = ℓ₁ + Δℓ', 'ℓ₂ = ℓ₁ + α ℓ₁ ΔT', 'ℓ₂ = ℓ₁ (1 + α ΔT)'], 'New length = old length + expansion; take ℓ₁ as a common factor.', 'الطول الجديد = الطول الأصلي + التمدد، ثم نأخذ ℓ₁ عاملًا مشتركًا.'),
      D('α', 'α = {{Δℓ // ℓ ΔT}}', 'the expansion coefficient from a measurement', 'لحساب معامل التمدد الطولي من قياس',
        ['Δℓ = α ℓ ΔT', 'α = {{Δℓ // ℓ ΔT}}'], 'Divide both sides by ℓΔT.', 'اقسم الطرفين على ℓΔT.'),
      D('ΔT', 'ΔT = {{Δℓ // α ℓ}}', 'the temperature rise for a given expansion', 'لحساب الارتفاع في درجة الحرارة اللازم لتمدد معين',
        ['Δℓ = α ℓ ΔT', 'ΔT = {{Δℓ // α ℓ}}'], 'Divide both sides by αℓ.', 'اقسم الطرفين على αℓ.'),
      B('ΔS', 'ΔS = γ S ΔT   (γ = 2α)', 'the area expansion of a plate', 'لحساب التمدد السطحي للوح'),
      B('ΔV', 'ΔV = β V ΔT   (β = 3α)', 'the volume expansion', 'لحساب التمدد الحجمي')
    ],
    'ch7-l3#0': [
      B('Q', 'Q = c m ΔT', 'the heat needed to change the temperature', 'لحساب كمية الحرارة اللازمة لتغيير درجة الحرارة'),
      D('c', 'c = {{Q // m ΔT}}', 'the specific heat of a material', 'لحساب الحرارة النوعية للمادة',
        ['Q = c m ΔT', 'c = {{Q // m ΔT}}'], 'Divide both sides by mΔT.', 'اقسم الطرفين على mΔT.'),
      D('ΔT', 'ΔT = {{Q // c m}}', 'the temperature change caused by a heat Q', 'لحساب تغير درجة الحرارة الناتج عن كمية حرارة',
        ['Q = c m ΔT', 'ΔT = {{Q // c m}}'], 'Divide both sides by cm.', 'اقسم الطرفين على cm.'),
      D('m', 'm = {{Q // c ΔT}}', 'the mass that a heat Q can warm', 'لحساب الكتلة التي تسخنها كمية حرارة معينة',
        ['Q = c m ΔT', 'm = {{Q // c ΔT}}'], 'Divide both sides by cΔT.', 'اقسم الطرفين على cΔT.'),
      B('Q', 'Q = C ΔT   (C = c m)', 'heat using the heat capacity of the whole body', 'لحساب الحرارة باستخدام السعة الحرارية للجسم كله')
    ],
    'ch7-l3#1': [
      B('Q', 'Q = m L', 'the heat to melt or boil a mass (no temperature change)', 'لحساب الحرارة اللازمة لصهر أو غليان كتلة دون تغير في درجة الحرارة'),
      D('L', 'L = {{Q // m}}', 'the latent heat', 'لحساب الحرارة الكامنة',
        ['Q = m L', 'L = {{Q // m}}'], 'Divide both sides by m.', 'اقسم الطرفين على m.'),
      D('m', 'm = {{Q // L}}', 'how much melts or boils with a heat Q', 'لحساب الكتلة التي تنصهر أو تغلي بكمية حرارة معينة',
        ['Q = m L', 'm = {{Q // L}}'], 'Divide both sides by L.', 'اقسم الطرفين على L.')
    ],
    'ch7-l3#2': [
      B('Q', 'Σ Q_lost = Σ Q_gained', 'the heat balance in an insulated container', 'ميزان الحرارة في وعاء معزول: المفقود = المكتسب'),
      D('T_f', 'T_f = {{m₁c₁T₁ + m₂c₂T₂ // m₁c₁ + m₂c₂}}', 'the final temperature of a mixture (no phase change)', 'لحساب درجة حرارة الخليط النهائية إذا لم يحدث تغير في الحالة',
        ['m₁c₁(T₁ − T_f) = m₂c₂(T_f − T₂)', 'm₁c₁T₁ + m₂c₂T₂ = T_f (m₁c₁ + m₂c₂)', 'T_f = {{m₁c₁T₁ + m₂c₂T₂ // m₁c₁ + m₂c₂}}'], 'Body 1 is the hot one. Expand both sides, collect the T_f terms on one side, then divide.', 'الجسم 1 هو الساخن. افتح الأقواس، واجمع حدود T_f في طرف، ثم اقسم على معاملها.'),
      D('c₁', 'c₁ = {{m₂c₂(T_f − T₂) // m₁(T₁ − T_f)}}', 'the specific heat of a hot metal dropped into water', 'لحساب الحرارة النوعية لفلز ساخن وُضع في ماء',
        ['m₁c₁(T₁ − T_f) = m₂c₂(T_f − T₂)', 'c₁ = {{m₂c₂(T_f − T₂) // m₁(T₁ − T_f)}}'], 'Divide both sides by m₁(T₁ − T_f).', 'اقسم الطرفين على m₁(T₁ − T_f).')
    ],
    'ch7-l4#0': [
      B('H', 'H = {{k_c A (T₁ − T₂) // x}}', 'the rate of heat flow through a wall', 'لحساب معدل انتقال الحرارة بالتوصيل عبر جدار'),
      D('k_c', 'k_c = {{H x // A (T₁ − T₂)}}', 'the thermal conductivity of a material', 'لحساب معامل التوصيل الحراري للمادة',
        ['H x = k_c A (T₁ − T₂)', 'k_c = {{H x // A (T₁ − T₂)}}'], 'Multiply both sides by x, then divide by A(T₁ − T₂).', 'اضرب الطرفين في x، ثم اقسم على A(T₁ − T₂).'),
      D('x', 'x = {{k_c A (T₁ − T₂) // H}}', 'the thickness needed for a heat rate', 'لحساب السمك اللازم لمعدل حرارة معين',
        ['H x = k_c A (T₁ − T₂)', 'x = {{k_c A (T₁ − T₂) // H}}'], 'Multiply both sides by x, then divide by H.', 'اضرب الطرفين في x، ثم اقسم على H.'),
      D('Q', 'Q = H t', 'the total heat passed in a time t', 'لحساب كمية الحرارة الكلية المنتقلة في زمن t',
        ['H = {{Q // t}}', 'Q = H t'], 'H is heat per second, so multiply by the time.', 'H هي الحرارة لكل ثانية، فنضربها في الزمن.')
    ],
    'ch7-l4#1': [
      B('Q', 'Q = σ A T⁴', 'the energy radiated per second by a black body', 'لحساب الطاقة المشعة في الثانية من جسم أسود'),
      D('T', 'T = ⁴√( {{Q // σ A}} )', 'the temperature from the radiated power', 'لحساب درجة الحرارة من الطاقة المشعة',
        ['Q = σ A T⁴', 'T⁴ = {{Q // σ A}}', 'T = ⁴√( {{Q // σ A}} )'], 'Divide by σA, then take the fourth root. T comes out in kelvin.', 'اقسم الطرفين على σA، ثم خذ الجذر الرابع. الناتج بالكلفن.'),
      D('A', 'A = {{Q // σ T⁴}}', 'the surface area from the radiated power', 'لحساب مساحة السطح من الطاقة المشعة',
        ['Q = σ A T⁴', 'A = {{Q // σ T⁴}}'], 'Divide both sides by σT⁴.', 'اقسم الطرفين على σT⁴.')
    ],
    'ch8-l1#0': [
      B('F', 'F = {{k_e q₁ q₂ // r²}}', 'the electric force between two point charges', 'لحساب القوة الكهربائية بين شحنتين نقطيتين'),
      D('q₂', 'q₂ = {{F r² // k_e q₁}}', 'an unknown charge from the force on it', 'لحساب شحنة مجهولة إذا عرفت القوة والمسافة والشحنة الأخرى',
        ['F = {{k_e q₁ q₂ // r²}}', 'F r² = k_e q₁ q₂', 'q₂ = {{F r² // k_e q₁}}'], 'Multiply both sides by r², then divide by k_e q₁.', 'اضرب الطرفين في r² لتتخلص من المقام، ثم اقسم على k_e q₁.'),
      D('r', 'r = √( {{k_e q₁ q₂ // F}} )', 'the distance between the charges', 'لحساب المسافة بين الشحنتين',
        ['F r² = k_e q₁ q₂', 'r² = {{k_e q₁ q₂ // F}}', 'r = √( {{k_e q₁ q₂ // F}} )'], 'Multiply by r², divide by F, then take the square root.', 'اضرب الطرفين في r²، ثم اقسم على F، ثم خذ الجذر التربيعي.'),
      D('q', 'q = r √( {{F // k_e}} )', 'two equal charges q from the force between them', 'لحساب الشحنة إذا كانت الشحنتان متساويتين',
        ['F = {{k_e q² // r²}}', 'q² = {{F r² // k_e}}', 'q = r √( {{F // k_e}} )'], 'Put q₁ = q₂ = q, solve for q², then take the root.', 'عوّض q₁ = q₂ = q، ثم أوجد q²، ثم خذ الجذر.')
    ],
    'ch8-l2#0': [
      B('E', 'E = {{F // q_t}}', 'the field from the force on a test charge', 'لحساب المجال من القوة المؤثرة على شحنة اختبار'),
      D('F', 'F = q E', 'the force on any charge placed in a known field', 'لحساب القوة على أي شحنة توضع في مجال معلوم',
        ['E = {{F // q_t}}', 'q_t E = F'], 'Multiply both sides by the charge.', 'اضرب الطرفين في الشحنة.'),
      D('q_t', 'q_t = {{F // E}}', 'the charge from the force and the field', 'لحساب الشحنة إذا عرفت القوة والمجال',
        ['q_t E = F', 'q_t = {{F // E}}'], 'Multiply by q_t, then divide by E.', 'اضرب الطرفين في q_t، ثم اقسم على E.'),
      B('E', 'E = {{k_e q // r²}}', 'the field of a point charge at a distance r', 'لحساب مجال شحنة نقطية على بعد r منها'),
      D('q', 'q = {{E r² // k_e}}', 'the charge that makes a measured field', 'لحساب الشحنة المولدة لمجال مقيس',
        ['E = {{k_e q // r²}}', 'E r² = k_e q', 'q = {{E r² // k_e}}'], 'Multiply both sides by r², then divide by k_e.', 'اضرب الطرفين في r²، ثم اقسم على k_e.'),
      D('r', 'r = √( {{k_e q // E}} )', 'the distance where the field has a given value', 'لحساب البعد الذي يكون عنده المجال بقيمة معينة',
        ['E r² = k_e q', 'r² = {{k_e q // E}}', 'r = √( {{k_e q // E}} )'], 'Multiply by r², divide by E, then take the root.', 'اضرب الطرفين في r²، ثم اقسم على E، ثم خذ الجذر.')
    ],
    'ch8-l3#0': [
      B('ΔV', 'ΔV = {{W // q_t}}', 'the potential difference from the work per charge', 'لحساب فرق الجهد: الشغل لكل وحدة شحنة'),
      D('W', 'W = q ΔV', 'the work (energy) to move a charge through ΔV', 'لحساب الشغل أو الطاقة اللازمة لنقل شحنة عبر فرق جهد',
        ['ΔV = {{W // q_t}}', 'q_t ΔV = W'], 'Multiply both sides by the charge.', 'اضرب الطرفين في الشحنة.'),
      D('q_t', 'q_t = {{W // ΔV}}', 'the charge moved', 'لحساب الشحنة المنقولة',
        ['q_t ΔV = W', 'q_t = {{W // ΔV}}'], 'Multiply by q_t, then divide by ΔV.', 'اضرب الطرفين في q_t، ثم اقسم على ΔV.'),
      B('ΔV', 'ΔV = E d', 'the voltage across a uniform field (between plates)', 'لحساب فرق الجهد في مجال منتظم بين لوحين'),
      D('E', 'E = {{ΔV // d}}', 'the uniform field between plates (this is why E is also in V/m)', 'لحساب المجال المنتظم بين لوحين، ولهذا تُكتب وحدته V/m أيضًا',
        ['ΔV = E d', 'E = {{ΔV // d}}'], 'Divide both sides by d.', 'اقسم الطرفين على d.'),
      D('d', 'd = {{ΔV // E}}', 'the plate separation', 'لحساب المسافة بين اللوحين',
        ['ΔV = E d', 'd = {{ΔV // E}}'], 'Divide both sides by E.', 'اقسم الطرفين على E.')
    ],
    'ch8-l3#1': [
      B('V', 'V = {{k_e q // r}}', 'the potential of a point charge (keep the sign of q)', 'لحساب جهد شحنة نقطية، مع إبقاء إشارة الشحنة'),
      D('q', 'q = {{V r // k_e}}', 'the charge from a measured potential', 'لحساب الشحنة من جهد مقيس',
        ['V = {{k_e q // r}}', 'V r = k_e q', 'q = {{V r // k_e}}'], 'Multiply both sides by r, then divide by k_e.', 'اضرب الطرفين في r، ثم اقسم على k_e.'),
      D('r', 'r = {{k_e q // V}}', 'the distance where the potential has a given value', 'لحساب البعد الذي يكون عنده الجهد بقيمة معينة',
        ['V r = k_e q', 'r = {{k_e q // V}}'], 'Multiply by r, then divide by V.', 'اضرب الطرفين في r، ثم اقسم على V.'),
      D('V', 'V = V₁ + V₂ + …', 'the potential of several charges', 'لحساب الجهد الناتج عن عدة شحنات',
        ['V₁ = {{k_e q₁ // r₁}} ,  V₂ = {{k_e q₂ // r₂}}', 'V = V₁ + V₂'], 'Potential is a scalar: add the values with their signs (no angles).', 'الجهد كمية قياسية: اجمع القيم بإشاراتها، بدون زوايا أو مركبات.')
    ],
    'ch8-l4#0': [
      B('Q', 'Q = C V', 'the charge stored on a capacitor', 'لحساب الشحنة المخزنة في المكثف'),
      D('C', 'C = {{Q // V}}', 'the capacitance (charge per volt)', 'لحساب السعة: الشحنة لكل فولت',
        ['Q = C V', '{{Q // V}} = {{C V // V}}', 'C = {{Q // V}}'], 'Divide both sides by V.', 'اقسم الطرفين على V.'),
      D('V', 'V = {{Q // C}}', 'the voltage across a capacitor', 'لحساب فرق الجهد بين لوحي المكثف',
        ['Q = C V', 'V = {{Q // C}}'], 'Divide both sides by C.', 'اقسم الطرفين على C.'),
      B('C', 'C = {{ε₀ A // d}}', 'the capacitance of parallel plates in vacuum', 'لحساب سعة مكثف ذي لوحين متوازيين في الفراغ'),
      D('A', 'A = {{C d // ε₀}}', 'the plate area needed', 'لحساب مساحة اللوح اللازمة',
        ['C = {{ε₀ A // d}}', 'C d = ε₀ A', 'A = {{C d // ε₀}}'], 'Multiply both sides by d, then divide by ε₀.', 'اضرب الطرفين في d، ثم اقسم على ε₀.'),
      D('d', 'd = {{ε₀ A // C}}', 'the gap between the plates', 'لحساب المسافة بين اللوحين',
        ['C d = ε₀ A', 'd = {{ε₀ A // C}}'], 'Multiply both sides by d, then divide by C.', 'اضرب الطرفين في d، ثم اقسم على C.')
    ],
    'ch8-l4#1': [
      B('C_eq', '{{1 // C_eq}} = {{1 // C₁}} + {{1 // C₂}} + …', 'capacitors in series (same Q on each)', 'المكثفات على التوالي، والشحنة نفسها على كل مكثف'),
      D('C_eq', 'C_eq = {{C₁ C₂ // C₁ + C₂}}', 'C_eq of two capacitors in series, in one step', 'لحساب مكافئ مكثفين على التوالي مباشرة',
        ['{{1 // C_eq}} = {{1 // C₁}} + {{1 // C₂}}', '{{1 // C_eq}} = {{C₂ + C₁ // C₁ C₂}}', 'C_eq = {{C₁ C₂ // C₁ + C₂}}'], 'Add the two fractions with the common denominator C₁C₂, then flip both sides.', 'اجمع الكسرين بتوحيد المقام C₁C₂، ثم اقلب الطرفين.'),
      D('C_eq', 'C_eq = {{C // n}}', 'C_eq of n equal capacitors in series', 'لحساب مكافئ n مكثفات متساوية على التوالي',
        ['{{1 // C_eq}} = n × {{1 // C}}', 'C_eq = {{C // n}}'], 'n equal terms add to n/C; then flip.', 'الحدود المتساوية مجموعها n/C، ثم اقلب الطرفين.'),
      B('C_eq', 'C_eq = C₁ + C₂ + …', 'capacitors in parallel (same V on each)', 'المكثفات على التوازي، والجهد نفسه على كل مكثف'),
      D('C_eq', 'C_eq = n C', 'C_eq of n equal capacitors in parallel', 'لحساب مكافئ n مكثفات متساوية على التوازي',
        ['C_eq = C + C + … (n times)'], 'Adding the same value n times.', 'جمع القيمة نفسها n مرة.')
    ],
    'ch8-l4#2': [
      B('U', 'U = ½ C V²', 'the stored energy when you know C and V', 'لحساب الطاقة المخزنة إذا عرفت السعة والجهد'),
      D('U', 'U = {{Q² // 2C}}', 'the stored energy when you know Q and C', 'لحساب الطاقة المخزنة إذا عرفت الشحنة والسعة',
        ['V = {{Q // C}}', 'U = ½ C ( {{Q // C}} )²', 'U = {{Q² // 2C}}'], 'Replace V by Q/C in ½CV².', 'عوّض V = Q/C في القانون ½CV².'),
      D('U', 'U = ½ Q V', 'the stored energy when you know Q and V', 'لحساب الطاقة المخزنة إذا عرفت الشحنة والجهد',
        ['C V = Q', 'U = ½ (C V) V', 'U = ½ Q V'], 'Write CV² as (CV)·V and replace CV by Q.', 'اكتب CV² على شكل (CV)×V ثم عوّض CV = Q.'),
      D('V', 'V = √( {{2U // C}} )', 'the voltage that stores a given energy', 'لحساب الجهد اللازم لتخزين طاقة معينة',
        ['U = ½ C V²', '2U = C V²', 'V = √( {{2U // C}} )'], 'Multiply by 2, divide by C, then take the root.', 'اضرب الطرفين في 2، ثم اقسم على C، ثم خذ الجذر.'),
      D('C', 'C = {{2U // V²}}', 'the capacitance from the energy and the voltage', 'لحساب السعة من الطاقة والجهد',
        ['2U = C V²', 'C = {{2U // V²}}'], 'Multiply by 2, then divide by V².', 'اضرب الطرفين في 2، ثم اقسم على V².')
    ],
    'ch9-l1#0': [
      B('I', 'I = {{Δq // Δt}}', 'the current from the charge passing in a time', 'لحساب التيار: الشحنة المارة ÷ الزمن'),
      D('Δq', 'Δq = I Δt', 'the charge that passes in a time (battery capacity)', 'لحساب الشحنة المارة في زمن معين، مثل سعة البطارية',
        ['I = {{Δq // Δt}}', 'I Δt = Δq'], 'Multiply both sides by Δt.', 'اضرب الطرفين في Δt.'),
      D('Δt', 'Δt = {{Δq // I}}', 'how long a charge lasts at a current', 'لحساب الزمن الذي تكفيه شحنة معينة عند تيار معين',
        ['I Δt = Δq', 'Δt = {{Δq // I}}'], 'Multiply by Δt, then divide by I.', 'اضرب الطرفين في Δt، ثم اقسم على I.'),
      B('I', 'I = n e v A', 'the current from the moving electrons', 'لحساب التيار من حركة الإلكترونات داخل السلك'),
      D('v', 'v = {{I // n e A}}', 'the drift speed of the electrons', 'لحساب سرعة انجراف الإلكترونات',
        ['I = n e v A', 'v = {{I // n e A}}'], 'Divide both sides by neA.', 'اقسم الطرفين على neA.'),
      D('n', 'n = {{I // e v A}}', 'the number of free electrons per m³', 'لحساب عدد الإلكترونات الحرة في المتر المكعب',
        ['I = n e v A', 'n = {{I // e v A}}'], 'Divide both sides by evA.', 'اقسم الطرفين على evA.')
    ],
    'ch9-l1#1': [
      B('J', 'J = {{I // A}}', 'the current density (current per m²)', 'لحساب كثافة التيار: التيار لكل متر مربع'),
      D('I', 'I = J A', 'the current from the density and the area', 'لحساب التيار من الكثافة والمساحة',
        ['J = {{I // A}}', 'J A = I'], 'Multiply both sides by A.', 'اضرب الطرفين في A.'),
      D('A', 'A = {{I // J}}', 'the cross‑section needed for a safe density', 'لحساب مساحة المقطع اللازمة لكثافة تيار آمنة',
        ['J A = I', 'A = {{I // J}}'], 'Multiply by A, then divide by J.', 'اضرب الطرفين في A، ثم اقسم على J.'),
      B('J', 'J = n e v', 'the current density from the electrons', 'لحساب كثافة التيار من حركة الإلكترونات'),
      D('v', 'v = {{J // n e}}', 'the drift speed from the current density', 'لحساب سرعة الانجراف من كثافة التيار',
        ['J = n e v', 'v = {{J // n e}}'], 'Divide both sides by ne.', 'اقسم الطرفين على ne.')
    ],
    'ch9-l2#0': [
      B('V', 'V = R I', 'the voltage across a resistor, when you know R and I', 'لحساب فرق الجهد بين طرفي المقاومة إذا عرفت المقاومة والتيار'),
      D('R', 'R = {{V // I}}', 'the resistance, when you know V and I', 'لحساب المقاومة إذا عرفت فرق الجهد والتيار',
        ['V = R I', '{{V // I}} = {{R I // I}}', 'R = {{V // I}}'], 'Divide both sides by I: I ÷ I = 1, so R is left alone.', 'نقسم طرفي القانون على I، فتُختصر I مع I ويبقى R وحده.'),
      D('I', 'I = {{V // R}}', 'the current, when you know V and R', 'لحساب التيار إذا عرفت فرق الجهد والمقاومة',
        ['V = R I', '{{V // R}} = {{R I // R}}', 'I = {{V // R}}'], 'Divide both sides by R: R ÷ R = 1, so I is left alone.', 'نقسم طرفي القانون على R، فتُختصر R مع R ويبقى I وحده.')
    ],
    'ch9-l2#1': [
      B('R', 'R = {{ρ ℓ // A}}', 'the resistance of a wire from its material and size', 'لحساب مقاومة سلك من مادته وأبعاده'),
      D('ρ', 'ρ = {{R A // ℓ}}', 'the resistivity of the material', 'لحساب المقاومية النوعية للمادة',
        ['R = {{ρ ℓ // A}}', 'R A = ρ ℓ', 'ρ = {{R A // ℓ}}'], 'Multiply both sides by A, then divide by ℓ.', 'اضرب الطرفين في A لتتخلص من المقام، ثم اقسم على ℓ.'),
      D('ℓ', 'ℓ = {{R A // ρ}}', 'the length of wire for a wanted resistance', 'لحساب طول السلك اللازم لمقاومة معينة',
        ['R A = ρ ℓ', 'ℓ = {{R A // ρ}}'], 'Multiply both sides by A, then divide by ρ.', 'اضرب الطرفين في A، ثم اقسم على ρ.'),
      D('A', 'A = {{ρ ℓ // R}}', 'the cross‑section area', 'لحساب مساحة مقطع السلك',
        ['R A = ρ ℓ', 'A = {{ρ ℓ // R}}'], 'Multiply both sides by A, then divide by R.', 'اضرب الطرفين في A، ثم اقسم على R.'),
      D('R', 'R = {{4 ρ ℓ // π d²}}', 'the resistance when the wire is given by its diameter d', 'لحساب المقاومة إذا أُعطي قطر السلك d لا نصف قطره',
        ['A = π r² = π ( {{d // 2}} )² = {{π d² // 4}}', 'R = ρ ℓ ÷ {{π d² // 4}}', 'R = {{4 ρ ℓ // π d²}}'], 'Write the area with the diameter, then divide by a fraction (multiply by its flip).', 'اكتب المساحة بدلالة القطر، ثم القسمة على كسر تساوي الضرب في مقلوبه.'),
      B('σ', 'σ = {{1 // ρ}}', 'the conductivity (the flip of resistivity)', 'لحساب الموصلية، وهي مقلوب المقاومية')
    ],
    'ch9-l3#0': [
      B('P', 'P = V I', 'the power when you know V and I', 'لحساب القدرة إذا عرفت الجهد والتيار'),
      D('P', 'P = R I²', 'the power when you know R and I', 'لحساب القدرة إذا عرفت المقاومة والتيار',
        ['P = V I', 'V = R I', 'P = (R I) I = R I²'], "Replace V by RI (Ohm's law).", 'عوّض V = RI من قانون أوم.'),
      D('P', 'P = {{V² // R}}', 'the power when you know V and R', 'لحساب القدرة إذا عرفت الجهد والمقاومة',
        ['P = V I', 'I = {{V // R}}', 'P = V × {{V // R}} = {{V² // R}}'], "Replace I by V/R (Ohm's law).", 'عوّض I = V/R من قانون أوم.'),
      D('I', 'I = {{P // V}}', 'the current a device draws from its power and voltage', 'لحساب التيار الذي يسحبه جهاز من قدرته وجهده',
        ['P = V I', 'I = {{P // V}}'], 'Divide both sides by V.', 'اقسم الطرفين على V.'),
      D('R', 'R = {{V² // P}}', 'the resistance of a device from its power rating', 'لحساب مقاومة جهاز من قدرته وجهده المكتوبين عليه',
        ['P = {{V² // R}}', 'P R = V²', 'R = {{V² // P}}'], 'Multiply both sides by R, then divide by P.', 'اضرب الطرفين في R، ثم اقسم على P.'),
      D('W', 'W = P t', 'the electric energy used in a time t', 'لحساب الطاقة الكهربائية المستهلكة في زمن t',
        ['P = {{W // t}}', 'W = P t'], 'Power is energy per second: multiply by the time.', 'القدرة هي الطاقة لكل ثانية، فنضربها في الزمن.')
    ],
    'ch9-l4#0': [
      B('R_eq', 'R_eq = R₁ + R₂ + …', 'resistors in series (same current)', 'المقاومات على التوالي، والتيار نفسه في كل مقاومة'),
      D('R_eq', 'R_eq = n R', 'R_eq of n equal resistors in series', 'لحساب مكافئ n مقاومات متساوية على التوالي',
        ['R_eq = R + R + … (n times)'], 'Adding the same value n times.', 'جمع القيمة نفسها n مرة.'),
      B('R_eq', '{{1 // R_eq}} = {{1 // R₁}} + {{1 // R₂}} + …', 'resistors in parallel (same voltage)', 'المقاومات على التوازي، والجهد نفسه على كل مقاومة'),
      D('R_eq', 'R_eq = {{R₁ R₂ // R₁ + R₂}}', 'R_eq of two resistors in parallel, in one step (product ÷ sum)', 'لحساب مكافئ مقاومتين على التوازي مباشرة: حاصل الضرب ÷ المجموع',
        ['{{1 // R_eq}} = {{1 // R₁}} + {{1 // R₂}}', '{{1 // R_eq}} = {{R₂ + R₁ // R₁ R₂}}', 'R_eq = {{R₁ R₂ // R₁ + R₂}}'], 'Add the fractions with the common denominator R₁R₂, then flip both sides.', 'اجمع الكسرين بتوحيد المقام R₁R₂، ثم اقلب الطرفين.'),
      D('R_eq', 'R_eq = {{R // n}}', 'R_eq of n equal resistors in parallel', 'لحساب مكافئ n مقاومات متساوية على التوازي',
        ['{{1 // R_eq}} = n × {{1 // R}}', 'R_eq = {{R // n}}'], 'n equal terms add to n/R; then flip.', 'الحدود المتساوية مجموعها n/R، ثم اقلب الطرفين.')
    ],
    'ch10-l1#0': [
      B('θ₂', 'θ₁ = θ₂', 'the reflected angle (both measured from the normal)', 'زاوية الانعكاس تساوي زاوية السقوط، وكلتاهما تُقاس من العمود'),
      B('δ', 'δ = 360° − 2Φ', 'the total deviation after two plane mirrors at angle Φ', 'لحساب الانحراف الكلي بعد مرآتين مستويتين بينهما زاوية Φ')
    ],
    'ch10-l2#0': [
      B('n', 'n = {{c // v}}', 'the refractive index from the speed of light in the medium', 'لحساب معامل الانكسار من سرعة الضوء في الوسط'),
      D('v', 'v = {{c // n}}', 'the speed of light inside a medium', 'لحساب سرعة الضوء داخل الوسط',
        ['n = {{c // v}}', 'n v = c', 'v = {{c // n}}'], 'Multiply both sides by v, then divide by n.', 'اضرب الطرفين في v، ثم اقسم على n.'),
      B('n', 'n = {{λ // λₙ}}', 'the refractive index from the wavelengths', 'لحساب معامل الانكسار من الطولين الموجيين'),
      D('λₙ', 'λₙ = {{λ // n}}', 'the wavelength inside the medium', 'لحساب الطول الموجي داخل الوسط',
        ['n = {{λ // λₙ}}', 'n λₙ = λ', 'λₙ = {{λ // n}}'], 'Multiply both sides by λₙ, then divide by n.', 'اضرب الطرفين في λₙ، ثم اقسم على n.')
    ],
    'ch10-l2#1': [
      B('law', 'n₁ sin θ₁ = n₂ sin θ₂', "Snell's law", 'قانون سنل للانكسار'),
      D('θ₂', 'sin θ₂ = {{n₁ sin θ₁ // n₂}}', 'the refraction angle', 'لحساب زاوية الانكسار',
        ['n₁ sin θ₁ = n₂ sin θ₂', 'sin θ₂ = {{n₁ sin θ₁ // n₂}}', 'θ₂ = sin⁻¹( {{n₁ sin θ₁ // n₂}} )'], 'Divide both sides by n₂, then use sin⁻¹.', 'اقسم الطرفين على n₂، ثم استخدم sin⁻¹.'),
      D('n₂', 'n₂ = {{n₁ sin θ₁ // sin θ₂}}', 'the refractive index of the second medium', 'لحساب معامل انكسار الوسط الثاني',
        ['n₁ sin θ₁ = n₂ sin θ₂', 'n₂ = {{n₁ sin θ₁ // sin θ₂}}'], 'Divide both sides by sin θ₂.', 'اقسم الطرفين على sin θ₂.')
    ],
    'ch10-l3#0': [
      B('θ_c', 'sin θ_c = {{n₂ // n₁}}', 'the critical angle (from the denser medium n₁)', 'لحساب الزاوية الحرجة عند الانتقال من الوسط الأكثف n₁'),
      D('θ_c', 'sin θ_c = {{1 // n₁}}', 'the critical angle into air (n₂ = 1)', 'لحساب الزاوية الحرجة عند الخروج إلى الهواء',
        ['sin θ_c = {{n₂ // n₁}}', 'n₂ = 1', 'sin θ_c = {{1 // n₁}}'], 'Put n₂ = 1 for air.', 'عوّض n₂ = 1 للهواء.'),
      D('n₁', 'n₁ = {{n₂ // sin θ_c}}', 'the refractive index from a measured critical angle', 'لحساب معامل الانكسار من زاوية حرجة مقيسة',
        ['sin θ_c = {{n₂ // n₁}}', 'n₁ sin θ_c = n₂', 'n₁ = {{n₂ // sin θ_c}}'], 'Multiply both sides by n₁, then divide by sin θ_c.', 'اضرب الطرفين في n₁، ثم اقسم على sin θ_c.')
    ]
  };
})();
