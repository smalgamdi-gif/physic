/* Serway & Jewett, Physics for Scientists and Engineers, 9th ed. — links per lesson (🔗 external reference, NOT course content).
   Problems are paraphrased with the book's data; answers match the book's key (Answers to Odd-Numbered Problems). Pages = PDF pages. */
window.SERWAY = {
"ch1-l1": {
"read": [
{
"sec": "1.1",
"title": "Standards of Length, Mass, and Time",
"page": 39
}
],
"probs": [
{
"id": "P1.3",
"page": 51,
"q": "A model car is made from 9.35 kg of iron (ρ = 7.86×10³ kg/m³). The same model is recast in solid gold (ρ = 19.3×10³ kg/m³). What mass of gold is needed?",
"ans": "23.0 kg",
"sol": "Same volume: m_gold = m_iron × ρ_gold/ρ_iron = 9.35 × 19.3/7.86 = 23.0 kg",
"num": 22.96,
"unit": "kg",
"tol": 0.01
},
{
"id": "P1.5",
"page": 51,
"q": "Two spheres are cut from the same uniform rock. One has radius 4.50 cm; the other has five times its mass. Find the radius of the second sphere.",
"ans": "7.69 cm",
"sol": "m ∝ V ∝ r³, so r₂ = 4.50 × 5^(1/3) = 7.69 cm",
"num": 7.69,
"unit": "cm",
"tol": 0.01
}
]
},
"ch1-l2": {
"read": [
{
"sec": "1.4",
"title": "Conversion of Units",
"page": 45
}
],
"probs": [
{
"id": "P1.17",
"page": 52,
"q": "A building lot is 75.0 ft wide and 125 ft long (1 ft = 0.3048 m). Find its area in square metres.",
"ans": "871 m²",
"sol": "A = 75.0 × 125 = 9375 ft²; × (0.3048 m/ft)² = 871 m²",
"num": 871,
"unit": "m²",
"tol": 0.01
},
{
"id": "P1.27",
"page": 52,
"q": "One gallon of paint (volume 3.78×10⁻³ m³) covers 25.0 m² of wall. What is the thickness of the fresh paint?",
"ans": "151 μm",
"sol": "t = V/A = 3.78×10⁻³ / 25.0 = 1.51×10⁻⁴ m = 151 μm",
"num": 0.0001512,
"unit": "m",
"tol": 0.01
},
{
"id": "P1.23",
"page": 52,
"q": "One square mile (1 mi = 1609 m) contains 640 acres. How many square metres are in 1 acre?",
"ans": "4.05×10³ m²",
"sol": "1 mi² = 1609² = 2.589×10⁶ m²; ÷ 640 = 4.05×10³ m²",
"num": 4047,
"unit": "m²",
"tol": 0.01
}
]
},
"ch1-l3": {
"read": [
{
"sec": "1.3",
"title": "Dimensional Analysis",
"page": 43
}
],
"probs": [
{
"id": "P1.13",
"page": 52,
"q": "A position is written x = k aᵐ tⁿ (k dimensionless, a = acceleration, t = time). Using dimensions, find m + n (and note: can the analysis give k?).",
"ans": "m = 1 and n = 2; no, dimensional analysis cannot give k",
"sol": "[x] = L; [a]ᵐ[t]ⁿ = Lᵐ T⁻²ᵐ Tⁿ ⇒ m = 1, n − 2m = 0 ⇒ n = 2. So m + n = 3. A dimensionless constant cannot be found this way.",
"num": 3,
"unit": "",
"tol": 0.001
},
{
"id": "P1.11",
"page": 51,
"q": "Kinetic energy has units kg·m²/s² and K = p²/(2m) (p = momentum, m = mass). Which unit is correct for momentum?",
"ans": "(a) kg·m/s (b) N·s",
"sol": "[p]² = [K][m] = kg²·m²/s² ⇒ p in kg·m/s = (kg·m/s²)·s = N·s",
"o": [
"kg·m/s",
"kg·m²/s",
"kg/s",
"N/s"
],
"a": 0
}
]
},
"ch2-l1": {
"read": [
{
"sec": "3.2",
"title": "Vector and Scalar Quantities",
"page": 97
},
{
"sec": "3.3",
"title": "Some Properties of Vectors",
"page": 98
}
],
"probs": [
{
"id": "P3.1",
"page": 108,
"q": "A point has polar coordinates r = 5.50 m, θ = 240°. Find its x coordinate.",
"ans": "(−2.75, −4.76) m",
"sol": "x = r cos θ = 5.50 cos 240° = −2.75 m; y = 5.50 sin 240° = −4.76 m",
"num": -2.75,
"unit": "m",
"tol": 0.01
},
{
"id": "P3.3",
"page": 108,
"q": "Two points have coordinates (2.00, −4.00) m and (−3.00, 3.00) m. Find the distance between them.",
"ans": "(a) 8.60 m (b) 4.47 m at −63.4°; 4.24 m at 135°",
"sol": "d = √((−3−2)² + (3−(−4))²) = √(25 + 49) = 8.60 m",
"num": 8.6,
"unit": "m",
"tol": 0.01
}
]
},
"ch2-l2": {
"read": [
{
"sec": "3.3",
"title": "Some Properties of Vectors",
"page": 98
}
],
"probs": [
{
"id": "P3.25",
"page": 109,
"q": "A dog makes successive displacements 3.50 m south, 8.20 m northeast and 15.0 m west. Find the magnitude of the resultant displacement.",
"ans": "9.48 m at 166°",
"sol": "Rₓ = 8.20 cos45° − 15.0 = −9.20 m; R_y = −3.50 + 8.20 sin45° = 2.30 m; R = √(9.20² + 2.30²) = 9.48 m at 166° from +x",
"num": 9.48,
"unit": "m",
"tol": 0.01
}
]
},
"ch2-l3": {
"read": [
{
"sec": "3.4",
"title": "Components of a Vector and Unit Vectors",
"page": 101
}
],
"probs": [
{
"id": "P3.31",
"page": 110,
"q": "A = (3î − 3ĵ) m, B = (î − 4ĵ) m, C = (−2î + 5ĵ) m. Find the magnitude of D = A + B + C.",
"ans": "(a) 2.83 m at 315° (b) 13.4 m at 117°",
"sol": "D = (3+1−2)î + (−3−4+5)ĵ = 2î − 2ĵ; |D| = √8 = 2.83 m at 315°",
"num": 2.83,
"unit": "m",
"tol": 0.01
},
{
"id": "P3.35",
"page": 110,
"q": "Vector A has x component −3.00 units and y component +2.00 units. Find its direction measured from the +x axis.",
"ans": "(a) −3.00î + 2.00ĵ (b) 3.61 at 146° (c) 3.00î − 6.00ĵ",
"sol": "|A| = √(9 + 4) = 3.61; θ = 180° − tan⁻¹(2/3) = 180° − 33.7° = 146°",
"num": 146.3,
"unit": "°",
"tol": 0.01
}
]
},
"ch2-l4": {
"read": [
{
"sec": "7.3",
"title": "The Scalar Product of Two Vectors",
"page": 217
},
{
"sec": "11.1",
"title": "The Vector Product and Torque",
"page": 371
}
],
"probs": [
{
"id": "P7.11",
"page": 241,
"q": "A force F = (6î − 2ĵ) N acts on a particle that moves Δr = (3î + ĵ) m. Find the work done (the scalar product F·Δr).",
"ans": "(a) 16.0 J (b) 36.9°",
"sol": "W = FₓΔx + F_yΔy = 6(3) + (−2)(1) = 16.0 J; cos θ = 16/(6.32 × 3.16) ⇒ θ = 36.9°",
"num": 16,
"unit": "J",
"tol": 0.01
}
]
},
"ch3-l1": {
"read": [
{
"sec": "2.1",
"title": "Position, Velocity, and Speed",
"page": 58
}
],
"probs": [
{
"id": "P2.3",
"page": 87,
"q": "A person walks from A to B at 5.00 m/s and back from B to A at 3.00 m/s along the same straight line. Find her average speed for the whole trip (her average velocity is zero: why?).",
"ans": "(a) 3.75 m/s (b) 0",
"sol": "Let AB = d: time = d/5 + d/3 = 8d/15; speed = 2d ÷ (8d/15) = 3.75 m/s. Displacement = 0, so average velocity = 0.",
"num": 3.75,
"unit": "m/s",
"tol": 0.01
}
]
},
"ch3-l2": {
"read": [
{
"sec": "2.1",
"title": "Position, Velocity, and Speed",
"page": 58
},
{
"sec": "2.2",
"title": "Instantaneous Velocity and Speed",
"page": 61
}
],
"probs": [
{
"id": "P2.5",
"page": 87,
"q": "A car’s position: t = 0, 1, 2, 3, 4, 5 s and x = 0, 2.3, 9.2, 20.7, 36.8, 57.5 m. Find its average velocity over the last 3 s.",
"ans": "(a) 2.30 m/s (b) 16.1 m/s (c) 11.5 m/s",
"sol": "v_av = Δx/Δt = (57.5 − 9.2)/(5 − 2) = 16.1 m/s",
"num": 16.1,
"unit": "m/s",
"tol": 0.01
}
]
},
"ch3-l3": {
"read": [
{
"sec": "2.4",
"title": "Acceleration",
"page": 67
}
],
"probs": [
{
"id": "P2.21",
"page": 88,
"q": "A particle moves as x = 2.00 + 3.00t − 1.00t² (x in m, t in s). Find its velocity at t = 3.00 s.",
"ans": "(a) 2.00 m (b) −3.00 m/s (c) −2.00 m/s²",
"sol": "v = dx/dt = 3.00 − 2.00t = −3.00 m/s; a = dv/dt = −2.00 m/s²; x(3) = 2 + 9 − 9 = 2.00 m",
"num": -3,
"unit": "m/s",
"tol": 0.01
},
{
"id": "P2.27",
"page": 89,
"q": "A parcel of air has constant acceleration −4.00 m/s² and velocity 13.0 m/s at 10:05:00. What is its velocity at 10:05:04?",
"ans": "(a) 9.00 m/s (b) −3.00 m/s (c) 17.0 m/s",
"sol": "v = v_i + at = 13.0 + (−4.00)(4) = −3.00 m/s",
"num": -3,
"unit": "m/s",
"tol": 0.01
}
]
},
"ch3-l4": {
"read": [
{
"sec": "2.6",
"title": "Particle Under Constant Acceleration",
"page": 72
},
{
"sec": "2.7",
"title": "Freely Falling Objects",
"page": 76
}
],
"probs": [
{
"id": "P2.35",
"page": 89,
"q": "A car slows uniformly at −5.60 m/s² for 4.20 s, leaving skid marks 62.4 m long, until it hits a tree. With what speed does it hit the tree?",
"ans": "3.10 m/s",
"sol": "Δx = v_i t + ½at² ⇒ 62.4 = 4.20v_i − 49.4 ⇒ v_i = 26.6 m/s; v_f = v_i + at = 26.6 − 23.5 = 3.10 m/s",
"num": 3.1,
"unit": "m/s",
"tol": 0.01
},
{
"id": "P2.49",
"page": 91,
"q": "An arrow is shot straight up at 100 m/s (ignore air). How high does it rise? (g = 9.80 m/s²)",
"ans": "(a) 510 m (b) 20.4 s",
"sol": "0 = v_i² − 2gh ⇒ h = 100²/(2 × 9.80) = 510 m; time in air = 2v_i/g = 20.4 s",
"num": 510,
"unit": "m",
"tol": 0.01
},
{
"id": "P2.51",
"page": 91,
"q": "A ball is thrown straight down at 8.00 m/s from a height of 30.0 m. After what time does it hit the ground?",
"ans": "1.79 s",
"sol": "30.0 = 8.00t + 4.90t² ⇒ t = (−8 + √(64 + 588))/9.80 = 1.79 s",
"num": 1.79,
"unit": "s",
"tol": 0.01
}
]
},
"ch4-l1": {
"read": [
{
"sec": "5.1",
"title": "The Concept of Force",
"page": 147
},
{
"sec": "5.2",
"title": "Newton's First Law and Inertial Frames",
"page": 149
}
],
"probs": [
{
"id": "P5.31",
"page": 177,
"q": "A 1.00-kg bird lands at the middle of a wire between poles 50.0 m apart; the wire sags 0.200 m. Find the tension in the wire.",
"ans": "(b) 613 N",
"sol": "Equilibrium: 2T sin θ = mg, sin θ ≈ 0.200/25.0 ⇒ T = 9.80/(2 × 0.00800) = 613 N",
"num": 613,
"unit": "N",
"tol": 0.01
}
]
},
"ch4-l2": {
"read": [
{
"sec": "5.3",
"title": "Mass",
"page": 150
},
{
"sec": "5.4",
"title": "Newton's Second Law",
"page": 151
},
{
"sec": "5.5",
"title": "The Gravitational Force and Weight",
"page": 153
}
],
"probs": [
{
"id": "P5.3",
"page": 175,
"q": "A 3.00-kg object has acceleration a = (2.00î + 5.00ĵ) m/s². Find the magnitude of the net force.",
"ans": "(a) (6.00î + 15.0ĵ) N (b) 16.2 N",
"sol": "ΣF = m a = (6.00î + 15.0ĵ) N; |ΣF| = √(36 + 225) = 16.2 N",
"num": 16.2,
"unit": "N",
"tol": 0.01
},
{
"id": "P5.11",
"page": 175,
"q": "An electron (m = 9.11×10⁻³¹ kg) speeds up from 3.00×10⁵ m/s to 7.00×10⁵ m/s in 5.00 cm with constant acceleration. Find the net force on it.",
"ans": "(a) 3.64×10⁻¹⁸ N (b) 8.93×10⁻³⁰ N, its weight, is 408 billion times smaller",
"sol": "a = (v_f² − v_i²)/(2Δx) = (4.9×10¹¹ − 9×10¹⁰)/0.100 = 4.00×10¹² m/s²; F = ma = 3.64×10⁻¹⁸ N",
"num": 3.64e-18,
"unit": "N",
"tol": 0.01
},
{
"id": "P5.9",
"page": 175,
"q": "A baseball weighs 2.21 N. A pitcher accelerates it uniformly from rest to 18.0 m/s horizontally in 0.170 s. Through what distance does it move before release?",
"ans": "(a) 1.53 m (b) 24.0 N forward and upward at 5.29°",
"sol": "Δx = ½(v_i + v_f)t = ½(18.0)(0.170) = 1.53 m",
"num": 1.53,
"unit": "m",
"tol": 0.01
}
]
},
"ch4-l3": {
"read": [
{
"sec": "5.6",
"title": "Newton's Third Law",
"page": 154
}
],
"probs": [
{
"id": "P5.23",
"page": 176,
"q": "A 1 000-kg car pulls a 300-kg trailer with acceleration 2.15 m/s² (no friction or drag on the trailer). What force does the trailer exert on the car (magnitude)?",
"ans": "(a) 2.15×10³ N forward (b) 645 N forward (c) 645 N toward the rear",
"sol": "Car pulls trailer with F = m_trailer a = 300 × 2.15 = 645 N forward; by the third law the trailer pulls the car back with 645 N.",
"num": 645,
"unit": "N",
"tol": 0.01
}
]
},
"ch5-l1": {
"read": [
{
"sec": "7.2",
"title": "Work Done by a Constant Force",
"page": 214
}
],
"probs": [
{
"id": "P7.3",
"page": 240,
"q": "A man lifts a 281.5-kg object 17.1 cm at constant speed. How much work does he do on it?",
"ans": "(a) 472 J (b) 2.76 kN",
"sol": "At constant speed F = mg = 2.76×10³ N; W = F d = 2.76×10³ × 0.171 = 472 J",
"num": 471.7,
"unit": "J",
"tol": 0.01
}
]
},
"ch5-l2": {
"read": [
{
"sec": "7.5",
"title": "Kinetic Energy and the Work–Kinetic Energy Theorem",
"page": 224
}
],
"probs": [
{
"id": "P7.33",
"page": 242,
"q": "A 0.600-kg particle has speed 2.00 m/s at A and kinetic energy 7.50 J at B. Find the net work done on it from A to B.",
"ans": "(a) 1.20 J (b) 5.00 m/s (c) 6.30 J",
"sol": "KE_A = ½(0.600)(2.00)² = 1.20 J; W = KE_B − KE_A = 7.50 − 1.20 = 6.30 J",
"num": 6.3,
"unit": "J",
"tol": 0.01
},
{
"id": "P7.31",
"page": 242,
"q": "A 3.00-kg object has velocity (6.00î − 2.00ĵ) m/s. Find its kinetic energy.",
"ans": "(a) 60.0 J (b) 60.0 J",
"sol": "v² = 36 + 4 = 40 m²/s²; KE = ½(3.00)(40) = 60.0 J",
"num": 60,
"unit": "J",
"tol": 0.01
}
]
},
"ch5-l3": {
"read": [
{
"sec": "7.6",
"title": "Potential Energy of a System",
"page": 227
},
{
"sec": "8.2",
"title": "Isolated System (Energy)",
"page": 251
}
],
"probs": [
{
"id": "P7.41",
"page": 243,
"q": "A 0.20-kg stone is held 1.3 m above the top of a well 5.0 m deep. Taking PE = 0 at the top edge, what is the PE when the stone is at the bottom of the well?",
"ans": "(a) 2.5 J (b) −9.8 J (c) −12 J",
"sol": "PE = mgh = 0.20 × 9.8 × (−5.0) = −9.8 J; above the edge: +2.5 J; change −12 J",
"num": -9.8,
"unit": "J",
"tol": 0.02
},
{
"id": "P7.35",
"page": 243,
"q": "A 2 100-kg pile driver falls 5.00 m onto a beam and drives it 12.0 cm into the ground before stopping. Using energy, find the average force the beam exerts on the driver.",
"ans": "878 kN up",
"sol": "Work–energy: mg(5.00 + 0.120) = F(0.120) ⇒ F = 2100 × 9.80 × 5.12/0.120 = 8.78×10⁵ N up",
"num": 878000.0,
"unit": "N",
"tol": 0.01
}
]
},
"ch5-l4": {
"read": [
{
"sec": "8.5",
"title": "Power",
"page": 268
}
],
"probs": [
{
"id": "P8.29",
"page": 275,
"q": "An 820-N person climbs a 12.0-m vertical rope at constant speed in 8.00 s. Find the power output.",
"ans": "1.23 kW",
"sol": "P = W/t = (820 × 12.0)/8.00 = 1.23×10³ W",
"num": 1230,
"unit": "W",
"tol": 0.01
},
{
"id": "P8.39",
"page": 275,
"q": "A 3.50-kN piano is lifted 25.0 m at constant speed by three workers, each delivering 165 W, through a pulley that is 75.0% efficient. How long does it take?",
"ans": "236 s = 3.93 min",
"sol": "Useful power = 3 × 165 × 0.750 = 371 W; t = mgh/P = 3500 × 25.0/371 = 236 s",
"num": 235.7,
"unit": "s",
"tol": 0.01
}
]
},
"ch6-l1": {
"read": [
{
"sec": "12.4",
"title": "Elastic Properties of Solids",
"page": 409
}
],
"probs": [
{
"id": "P12.33",
"page": 419,
"q": "A 200-kg load hangs on a wire 4.00 m long, cross-section 0.200×10⁻⁴ m², Young’s modulus 8.00×10¹⁰ N/m². Find the increase in length.",
"ans": "4.90 mm",
"sol": "ΔL = FL/(AY) = (1960 × 4.00)/(0.200×10⁻⁴ × 8.00×10¹⁰) = 4.90×10⁻³ m",
"num": 0.0049,
"unit": "m",
"tol": 0.01
},
{
"id": "P12.29",
"page": 418,
"q": "The friction force on each shoe sole is 20.0 N; sole area 14.0 cm², thickness 5.00 mm, shear modulus of rubber 3.00 MN/m². By what distance are the top and bottom of the sole offset?",
"ans": "23.8 μm",
"sol": "F/A = S x/h ⇒ x = F h/(A S) = 20.0 × 0.005/(14.0×10⁻⁴ × 3.00×10⁶) = 2.38×10⁻⁵ m",
"num": 2.38e-05,
"unit": "m",
"tol": 0.01
},
{
"id": "P12.31",
"page": 419,
"q": "Steel ruptures above a shear stress of 4.00×10⁸ N/m². What force shears a steel bolt 1.00 cm in diameter?",
"ans": "(a) 3.14×10⁴ N (b) 6.28×10⁴ N",
"sol": "F = stress × A = 4.00×10⁸ × π(0.00500)² = 3.14×10⁴ N (radius, not diameter!)",
"num": 31400.0,
"unit": "N",
"tol": 0.01
}
]
},
"ch6-l2": {
"read": [
{
"sec": "14.1",
"title": "Pressure",
"page": 453
},
{
"sec": "14.2",
"title": "Variation of Pressure with Depth",
"page": 455
}
],
"probs": [
{
"id": "P14.5",
"page": 474,
"q": "Find the mass of a solid gold bar 4.50 cm × 11.0 cm × 26.0 cm (ρ_gold = 19.3×10³ kg/m³).",
"ans": "24.8 kg",
"sol": "m = ρV = 19.3×10³ × (0.0450 × 0.110 × 0.260) = 24.8 kg",
"num": 24.8,
"unit": "kg",
"tol": 0.01
},
{
"id": "P14.3",
"page": 474,
"q": "A 50.0-kg woman balances on one circular heel of radius 0.500 cm. What pressure does she exert on the floor?",
"ans": "(a) 6.24 MPa (b) yes, it could damage vinyl flooring",
"sol": "P = F/A = (50.0 × 9.80)/(π × 0.00500²) = 6.24×10⁶ Pa",
"num": 6240000.0,
"unit": "Pa",
"tol": 0.01
},
{
"id": "P14.23",
"page": 476,
"q": "A pool is filled with water to depth 1.50 m. Find the absolute pressure at the bottom (P₀ = 1.013×10⁵ Pa, ρ = 1000 kg/m³).",
"ans": "(a) 116 kPa (b) 52.0 Pa",
"sol": "P = P₀ + ρgh = 1.013×10⁵ + 1000 × 9.80 × 1.50 = 1.16×10⁵ Pa",
"num": 116000.0,
"unit": "Pa",
"tol": 0.01
}
]
},
"ch6-l3": {
"read": [
{
"sec": "14.2",
"title": "Variation of Pressure with Depth (Pascal's law, hydraulic press)",
"page": 455
},
{
"sec": "14.3",
"title": "Pressure Measurements",
"page": 459
}
],
"probs": [
{
"id": "P14.9",
"page": 474,
"q": "A fully evacuated suction cup on a ceiling must hold an 80.0-kg student. What contact area is needed (P₀ = 1.013×10⁵ Pa)?",
"ans": "7.74×10⁻³ m²",
"sol": "Air pressure pushes the cup up: P₀A = mg ⇒ A = 784/1.013×10⁵ = 7.74×10⁻³ m²",
"num": 0.00774,
"unit": "m²",
"tol": 0.01
},
{
"id": "P14.75",
"page": 481,
"q": "(First step of P14.75.) In a hydraulic brake, the master piston has area 1.8 cm² and the brake piston 6.4 cm². A force of 44 N acts on the master piston. What force does the brake piston exert?",
"ans": "(The book asks for the final torque, 27 N·m; this step uses only Pascal’s law.)",
"sol": "Pascal: f/a = F/A ⇒ F = 44 × 6.4/1.8 = 1.6×10² N",
"num": 156.4,
"unit": "N",
"tol": 0.01
}
]
},
"ch6-l4": {
"read": [
{
"sec": "14.5",
"title": "Fluid Dynamics",
"page": 463
},
{
"sec": "14.6",
"title": "Bernoulli's Equation",
"page": 466
}
],
"probs": [
{
"id": "P14.49",
"page": 478,
"q": "A Venturi meter carries gasoline (ρ = 700 kg/m³). Inlet radius 2.40 cm, outlet radius 1.20 cm, P₁ − P₂ = 1.20 kPa. Find the speed at the outlet.",
"ans": "(a) 1.91 m/s (b) 8.65×10⁻⁴ m³/s",
"sol": "Continuity: v₂ = 4v₁. Bernoulli: 1200 = ½(700)(v₂² − v₂²/16) ⇒ v₂ = 1.91 m/s; flow = πr₂²v₂ = 8.65×10⁻⁴ m³/s",
"num": 1.91,
"unit": "m/s",
"tol": 0.01
},
{
"id": "P14.41",
"page": 477,
"q": "An open water tank has a small hole 16.0 m below the water surface. Find the speed at which water leaves the hole.",
"ans": "(a) 17.7 m/s (b) 1.73 mm",
"sol": "Bernoulli (top and hole both at P₀, top speed ≈ 0): v = √(2gh) = √(2 × 9.80 × 16.0) = 17.7 m/s",
"num": 17.7,
"unit": "m/s",
"tol": 0.01
},
{
"id": "P14.43",
"page": 477,
"q": "A faucet stream has diameter 0.960 cm at the tap and fills 125 cm³ in 16.3 s. Find the stream diameter 13.0 cm below the tap.",
"ans": "0.247 cm",
"sol": "v₀ = Q/A₀ = 7.67/0.724 = 10.6 cm/s; v² = v₀² + 2gh ⇒ v = 1.60 m/s; continuity: d = 0.960 √(0.106/1.60) = 0.247 cm",
"num": 0.247,
"unit": "cm",
"tol": 0.02
}
]
},
"ch7-l1": {
"read": [
{
"sec": "19.2",
"title": "Thermometers and the Celsius Temperature Scale",
"page": 606
},
{
"sec": "19.3",
"title": "The Absolute Temperature Scale",
"page": 607
}
],
"probs": [
{
"id": "P19.3",
"page": 619,
"q": "Convert −78.5 °C (dry ice) to the Fahrenheit scale.",
"ans": "(a) −109°F, 195 K (b) 98.6°F, 310 K",
"sol": "T_F = 9/5 T_C + 32 = 9/5(−78.5) + 32 = −109°F; T_K = −78.5 + 273 = 195 K",
"num": -109.3,
"unit": "°F",
"tol": 0.01
},
{
"id": "P19.5",
"page": 619,
"q": "Liquid nitrogen boils at −195.81 °C. Express this in kelvins.",
"ans": "(a) −320°F (b) 77.3 K",
"sol": "T_K = T_C + 273.15 = 77.3 K (the course rounds to 273 ⇒ 77.2 K)",
"num": 77.3,
"unit": "K",
"tol": 0.01
}
]
},
"ch7-l2": {
"read": [
{
"sec": "19.4",
"title": "Thermal Expansion of Solids and Liquids",
"page": 609
}
],
"probs": [
{
"id": "P19.11",
"page": 619,
"q": "A copper wire (α = 17×10⁻⁶ /°C) is 35.0 m long at −20.0 °C. How much longer is it at 35.0 °C?",
"ans": "3.27 cm",
"sol": "Δℓ = αℓΔT = 17×10⁻⁶ × 35.0 × 55.0 = 3.27×10⁻² m",
"num": 0.0327,
"unit": "m",
"tol": 0.01
},
{
"id": "P19.9",
"page": 619,
"q": "A glass rod 30.0 cm long, 1.50 cm in diameter (α = 9.00×10⁻⁶ /°C) is heated by 65.0 °C. Find the increase in its length.",
"ans": "(a) 0.176 mm (b) 8.78 μm (c) 0.0930 cm³",
"sol": "Δℓ = 9.00×10⁻⁶ × 0.300 × 65.0 = 1.76×10⁻⁴ m; diameter: 8.78 μm; volume: β = 3α ⇒ 0.0930 cm³",
"num": 0.0001755,
"unit": "m",
"tol": 0.01
},
{
"id": "P19.15",
"page": 620,
"q": "A square hole 8.00 cm on a side is cut in a copper sheet (α = 17×10⁻⁶ /°C). Find the change in its area when heated by 50.0 K.",
"ans": "(a) 0.109 cm² (b) increase",
"sol": "ΔS = γSΔT with γ = 2α: 2 × 17×10⁻⁶ × 64.0 × 50.0 = 0.109 cm² (the hole grows)",
"num": 0.109,
"unit": "cm²",
"tol": 0.01
}
]
},
"ch7-l3": {
"read": [
{
"sec": "20.1",
"title": "Heat and Internal Energy",
"page": 626
},
{
"sec": "20.2",
"title": "Specific Heat and Calorimetry",
"page": 629
},
{
"sec": "20.3",
"title": "Latent Heat",
"page": 633
}
],
"probs": [
{
"id": "P20.11",
"page": 654,
"q": "A 1.50-kg iron horseshoe (c = 448 J/kg·°C) at 600 °C is dropped into 20.0 kg of water (c = 4186 J/kg·°C) at 25.0 °C. Find the final temperature.",
"ans": "29.6 °C",
"sol": "Heat lost = heat gained: 1.50 × 448 × (600 − T) = 20.0 × 4186 × (T − 25.0) ⇒ T = 29.6 °C",
"num": 29.6,
"unit": "°C",
"tol": 0.01
},
{
"id": "P20.5",
"page": 653,
"q": "What mass of water at 25.0 °C cools a 1.85-kg aluminium cube (c = 900 J/kg·°C) from 150 °C to 65.0 °C (final water temperature also 65.0 °C)?",
"ans": "0.845 kg",
"sol": "1.85 × 900 × 85.0 = m × 4186 × 40.0 ⇒ m = 0.845 kg",
"num": 0.845,
"unit": "kg",
"tol": 0.01
},
{
"id": "P20.19",
"page": 655,
"q": "A 75.0-g ice cube at 0 °C is placed in 825 g of water at 25.0 °C (L_f = 3.33×10⁵ J/kg). Find the final temperature.",
"ans": "16.3 °C",
"sol": "Melting needs 0.075 × 3.33×10⁵ = 2.50×10⁴ J. Then 0.825 × 4186 (25 − T) = 2.50×10⁴ + 0.075 × 4186 T ⇒ T = 16.3 °C",
"num": 16.3,
"unit": "°C",
"tol": 0.01
},
{
"id": "P20.23",
"page": 655,
"q": "250 g of ice at 0 °C is added to 600 g of water at 18.0 °C (L_f = 3.33×10⁵ J/kg). How much ice remains at equilibrium?",
"ans": "(a) 0 °C (b) 114 g",
"sol": "Water can give 0.600 × 4186 × 18 = 4.52×10⁴ J, which melts 0.136 kg only, so T = 0 °C and 0.250 − 0.136 = 0.114 kg remains",
"num": 0.114,
"unit": "kg",
"tol": 0.02
}
]
},
"ch7-l4": {
"read": [
{
"sec": "20.7",
"title": "Energy Transfer Mechanisms in Thermal Processes",
"page": 644
}
],
"probs": [
{
"id": "P20.43",
"page": 656,
"q": "A window 1.00 m × 2.00 m is 0.620 cm thick (k = 0.8 W/m·°C); inside surface 25.0 °C, outside 0 °C. Find the rate of heat flow.",
"ans": "(a) 6.45×10³ W (b) 5.57×10⁸ J per day",
"sol": "H = kA(T₁ − T₂)/x = 0.8 × 2.00 × 25.0/0.00620 = 6.45×10³ W",
"num": 6450,
"unit": "W",
"tol": 0.01
},
{
"id": "P20.49",
"page": 657,
"q": "Two identical filaments radiate at 2 100 °C and 2 000 °C. Find the ratio of the power emitted by the hotter to the cooler (use Q ∝ T⁴ in kelvin).",
"ans": "(a) 1.19 (b) a factor of 1.19",
"sol": "(2373/2273)⁴ = 1.19 (always convert to kelvin before using T⁴)",
"num": 1.19,
"unit": "",
"tol": 0.01
}
]
},
"ch8-l1": {
"read": [
{
"sec": "23.1",
"title": "Properties of Electric Charges",
"page": 726
},
{
"sec": "23.3",
"title": "Coulomb's Law",
"page": 730
}
],
"probs": [
{
"id": "P23.3",
"page": 752,
"q": "Two protons are 2.00×10⁻¹⁵ m apart. Find the electric force between them (e = 1.60×10⁻¹⁹ C).",
"ans": "57.5 N",
"sol": "F = k e²/r² = 8.99×10⁹ (1.60×10⁻¹⁹)²/(2.00×10⁻¹⁵)² = 57.5 N",
"num": 57.5,
"unit": "N",
"tol": 0.01
},
{
"id": "P23.5",
"page": 752,
"q": "A cloud has +40.0 C near its top and −40.0 C near its bottom, 2.00 km apart. Find the electric force on the top charge.",
"ans": "3.60×10⁶ N downward",
"sol": "F = k q₁q₂/r² = 9×10⁹ × 40 × 40/(2000)² = 3.60×10⁶ N, attractive ⇒ downward",
"num": 3600000.0,
"unit": "N",
"tol": 0.01
},
{
"id": "P23.9",
"page": 752,
"q": "A 7.50-nC point charge is 1.80 m from a 4.20-nC point charge. Find the force magnitude.",
"ans": "(a) 8.74×10⁻⁸ N (b) repulsive",
"sol": "F = 8.99×10⁹ × 7.50×10⁻⁹ × 4.20×10⁻⁹/1.80² = 8.74×10⁻⁸ N; like charges ⇒ repulsive",
"num": 8.74e-08,
"unit": "N",
"tol": 0.01
}
]
},
"ch8-l2": {
"read": [
{
"sec": "23.4",
"title": "Particle in a Field (Electric)",
"page": 735
},
{
"sec": "23.6",
"title": "Electric Field Lines",
"page": 744
}
],
"probs": [
{
"id": "P23.23",
"page": 750,
"q": "What electric field balances the weight of an electron (m = 9.11×10⁻³¹ kg)? Give its magnitude.",
"ans": "(a) 5.58×10⁻¹¹ N/C downward (b) 1.02×10⁻⁷ N/C upward for a proton",
"sol": "qE = mg ⇒ E = 9.11×10⁻³¹ × 9.80/1.60×10⁻¹⁹ = 5.58×10⁻¹¹ N/C; the electron is negative, so E must point down",
"num": 5.58e-11,
"unit": "N/C",
"tol": 0.01
}
]
},
"ch8-l3": {
"read": [
{
"sec": "25.1",
"title": "Electric Potential and Potential Difference",
"page": 782
},
{
"sec": "25.2",
"title": "Potential Difference in a Uniform Electric Field",
"page": 784
},
{
"sec": "25.3",
"title": "Potential Due to Point Charges",
"page": 788
}
],
"probs": [
{
"id": "P25.1",
"page": 805,
"q": "Parallel plates 5.33 mm apart have a potential difference of 600 V. Find the electric field between them.",
"ans": "(a) 1.13×10⁵ N/C (b) 1.80×10⁻¹⁴ N",
"sol": "ΔV = E d ⇒ E = 600/0.00533 = 1.13×10⁵ N/C; force on an electron eE = 1.80×10⁻¹⁴ N",
"num": 112600.0,
"unit": "N/C",
"tol": 0.01
},
{
"id": "P25.25",
"page": 807,
"q": "Two +2.00-μC charges sit at x = +1.00 m and x = −1.00 m. Find the electric potential at (0, 0.500 m).",
"ans": "(a) 32.2 kV (b) 0.0965 J",
"sol": "r = √(1² + 0.5²) = 1.118 m; V = 2 k q/r = 2 × 8.99×10⁹ × 2×10⁻⁶/1.118 = 3.22×10⁴ V",
"num": 32200.0,
"unit": "V",
"tol": 0.01
}
]
},
"ch8-l4": {
"read": [
{
"sec": "26.1",
"title": "Definition of Capacitance",
"page": 813
},
{
"sec": "26.2",
"title": "Calculating Capacitance",
"page": 815
},
{
"sec": "26.3",
"title": "Combinations of Capacitors",
"page": 818
},
{
"sec": "26.4",
"title": "Energy Stored in a Charged Capacitor",
"page": 822
}
],
"probs": [
{
"id": "P26.9",
"page": 837,
"q": "Air capacitor: plate area 7.60 cm², separation 1.80 mm, 20.0 V applied. Find its capacitance.",
"ans": "(a) 11.1 kV/m (b) 98.4 nC/m² (c) 3.74 pF (d) 74.8 pC",
"sol": "C = ε₀A/d = 8.85×10⁻¹² × 7.60×10⁻⁴/1.80×10⁻³ = 3.74×10⁻¹² F; Q = CV = 74.8 pC",
"num": 3.74e-12,
"unit": "F",
"tol": 0.01
},
{
"id": "P26.15",
"page": 837,
"q": "Find the equivalent capacitance of 4.20 μF and 8.50 μF connected in series.",
"ans": "(a) 2.81 μF (b) 12.7 μF",
"sol": "Series: 1/C = 1/4.20 + 1/8.50 ⇒ C = 2.81 μF; parallel: 12.7 μF",
"num": 2.81,
"unit": "μF",
"tol": 0.01
},
{
"id": "P26.13",
"page": 837,
"q": "C₁ = 5.00 μF and C₂ = 12.0 μF are in parallel across 9.00 V. Find the charge on C₂.",
"ans": "(a) 17.0 μF (b) 9.00 V each (c) 45.0 μC and 108 μC",
"sol": "Parallel ⇒ same V = 9.00 V; Q₂ = C₂V = 12.0 × 9.00 = 108 μC",
"num": 108,
"unit": "μC",
"tol": 0.01
},
{
"id": "P26.27",
"page": 838,
"q": "Two capacitors give 9.00 pF in parallel and 2.00 pF in series. Find the larger capacitance.",
"ans": "6.00 pF and 3.00 pF",
"sol": "C₁ + C₂ = 9, C₁C₂/(C₁ + C₂) = 2 ⇒ C₁C₂ = 18 ⇒ 6.00 pF and 3.00 pF",
"num": 6,
"unit": "pF",
"tol": 0.01
},
{
"id": "P26.31",
"page": 839,
"q": "A 12.0-V battery puts 54.0 μC on a capacitor. How much energy is stored?",
"ans": "3.24×10⁻⁴ J",
"sol": "U = ½QV = ½ × 54.0×10⁻⁶ × 12.0 = 3.24×10⁻⁴ J",
"num": 0.000324,
"unit": "J",
"tol": 0.01
}
]
},
"ch9-l1": {
"read": [
{
"sec": "27.1",
"title": "Electric Current",
"page": 844
}
],
"probs": [
{
"id": "P27.5",
"page": 862,
"q": "A proton beam carries 125 μA. How many protons hit the target in 23.0 s?",
"ans": "1.79×10¹⁶ protons",
"sol": "N = It/e = 125×10⁻⁶ × 23.0/1.60×10⁻¹⁹ = 1.80×10¹⁶",
"num": 1.797e+16,
"unit": "",
"tol": 0.01
},
{
"id": "P27.11",
"page": 862,
"q": "An electron beam of radius 1.00 mm carries 8.00 μA. Find the current density.",
"ans": "(a) 2.55 A/m² (b) 5.30×10¹⁰ m⁻³ (c) 1.21×10¹⁰ s",
"sol": "J = I/A = 8.00×10⁻⁶/(π × 0.00100²) = 2.55 A/m²",
"num": 2.55,
"unit": "A/m²",
"tol": 0.01
},
{
"id": "P27.1",
"page": 862,
"q": "A copper line 200 km long, 2.00 cm in diameter, carries 1 000 A; n = 8.50×10²⁸ electrons/m³. Find the drift speed.",
"ans": "27.0 yr for one electron to travel the line",
"sol": "v = I/(n e A) = 1000/(8.50×10²⁸ × 1.60×10⁻¹⁹ × π × 0.0100²) = 2.34×10⁻⁴ m/s; t = 2.00×10⁵/v ≈ 27 years",
"num": 0.000234,
"unit": "m/s",
"tol": 0.01
}
]
},
"ch9-l2": {
"read": [
{
"sec": "27.2",
"title": "Resistance",
"page": 847
}
],
"probs": [
{
"id": "P27.17",
"page": 863,
"q": "A heater draws 13.5 A at 120 V. Find its resistance.",
"ans": "8.89 Ω",
"sol": "R = V/I = 120/13.5 = 8.89 Ω",
"num": 8.89,
"unit": "Ω",
"tol": 0.01
},
{
"id": "P27.21",
"page": 863,
"q": "A Nichrome coil (ρ = 1.00×10⁻⁶ Ω·m, wire radius 2.50 mm) must draw 9.25 A at 120 V. What length of wire is needed?",
"ans": "(a) 13.0 Ω (b) 255 m",
"sol": "R = 120/9.25 = 13.0 Ω; ℓ = RA/ρ = 13.0 × π(0.00250)²/1.00×10⁻⁶ = 255 m",
"num": 254.7,
"unit": "m",
"tol": 0.01
}
]
},
"ch9-l3": {
"read": [
{
"sec": "27.6",
"title": "Electrical Power",
"page": 856
}
],
"probs": [
{
"id": "P27.39",
"page": 864,
"q": "A waffle iron is rated 1.00 kW at 120 V. Find its resistance.",
"ans": "(a) 8.33 A (b) 14.4 Ω",
"sol": "I = P/V = 8.33 A; R = V²/P = 120²/1000 = 14.4 Ω",
"num": 14.4,
"unit": "Ω",
"tol": 0.01
},
{
"id": "P27.43",
"page": 864,
"q": "A 100-W bulb on 120 V sees a surge to 140 V. By what percentage does its power rise (R constant)?",
"ans": "36.1%",
"sol": "P = V²/R ⇒ P₂/P₁ = (140/120)² = 1.361 ⇒ +36.1%",
"num": 36.1,
"unit": "%",
"tol": 0.01
},
{
"id": "P27.41",
"page": 864,
"q": "A player draws 350 mA at 6.00 V. Find its power.",
"ans": "2.1 W",
"sol": "P = VI = 6.00 × 0.350 = 2.10 W",
"num": 2.1,
"unit": "W",
"tol": 0.01
}
]
},
"ch9-l4": {
"read": [
{
"sec": "28.2",
"title": "Resistors in Series and Parallel",
"page": 872
}
],
"probs": [
{
"id": "P28.15",
"page": 895,
"q": "Two resistors give 690 Ω in series and 150 Ω in parallel. Find the larger resistance.",
"ans": "470 Ω and 220 Ω",
"sol": "R₁ + R₂ = 690 and R₁R₂/690 = 150 ⇒ R₁R₂ = 1.035×10⁵ ⇒ 470 Ω and 220 Ω",
"num": 470,
"unit": "Ω",
"tol": 0.01
}
]
},
"ch10-l1": {
"read": [
{
"sec": "35.1",
"title": "The Nature of Light",
"page": 1094
},
{
"sec": "35.4",
"title": "Wave Under Reflection",
"page": 1097
}
],
"probs": [
{
"id": "P35.7",
"page": 1117,
"q": "Light in water (n = 1.333) hits crown glass (n = 1.52); the refraction angle in the glass is 19.6°. Find the angle of reflection.",
"ans": "22.5°",
"sol": "Snell: 1.333 sin θ₁ = 1.52 sin 19.6° ⇒ θ₁ = 22.5°; reflection angle = incidence angle = 22.5°",
"num": 22.5,
"unit": "°",
"tol": 0.01
}
]
},
"ch10-l2": {
"read": [
{
"sec": "35.5",
"title": "Wave Under Refraction",
"page": 1101
}
],
"probs": [
{
"id": "P35.5",
"page": 1116,
"q": "Red laser light has wavelength 632.8 nm in air. Find its wavelength in glass with n = 1.50.",
"ans": "(a) 4.74×10¹⁴ Hz (b) 422 nm (c) 2.00×10⁸ m/s",
"sol": "λₙ = λ/n = 632.8/1.50 = 422 nm; v = c/n = 2.00×10⁸ m/s",
"num": 422,
"unit": "nm",
"tol": 0.01
},
{
"id": "P35.15",
"page": 1117,
"q": "Light in water (n = 1.333) enters a substance at 37.0° incidence and refracts at 25.0°. Find the speed of light in the substance.",
"ans": "1.58×10⁸ m/s",
"sol": "n₂ = 1.333 sin37.0°/sin25.0° = 1.90; v = c/n₂ = 1.58×10⁸ m/s",
"num": 158000000.0,
"unit": "m/s",
"tol": 0.01
},
{
"id": "P35.9",
"page": 1117,
"q": "Find the speed of light in flint glass (n = 1.66).",
"ans": "(a) 1.81×10⁸ m/s (b) 2.25×10⁸ m/s (c) 1.36×10⁸ m/s",
"sol": "v = c/n = 3.00×10⁸/1.66 = 1.81×10⁸ m/s",
"num": 181000000.0,
"unit": "m/s",
"tol": 0.01
}
]
},
"ch10-l3": {
"read": [
{
"sec": "35.7",
"title": "Dispersion",
"page": 1109
},
{
"sec": "35.8",
"title": "Total Internal Reflection",
"page": 1110
}
],
"probs": [
{
"id": "P35.41",
"page": 1112,
"q": "A glass fibre (n = 1.50) is submerged in water (n = 1.33). Find the critical angle for light to stay inside the fibre.",
"ans": "62.5°",
"sol": "sin θc = n₂/n₁ = 1.33/1.50 ⇒ θc = 62.5°",
"num": 62.5,
"unit": "°",
"tol": 0.01
},
{
"id": "P35.37",
"page": 1119,
"q": "Red (n = 1.455) and violet (n = 1.468) light enter quartz from air at 50.0°. Find the difference between their refraction angles (the dispersion).",
"ans": "0.314°",
"sol": "Red: sin θ = sin50.0°/1.455 ⇒ 31.77°; violet: sin θ = sin50.0°/1.468 ⇒ 31.45°; difference = 0.314°",
"num": 0.314,
"unit": "°",
"tol": 0.02
}
]
}
};
