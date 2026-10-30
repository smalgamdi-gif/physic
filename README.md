# Physics Learning Lab · مختبر تعلم الفيزياء

A private tutor and virtual lab for the first-year **General Physics** course (10 chapters, 37 lessons). Physics terms, laws and questions are in English, with Arabic explanations.

- **`index.html`** is the tutor. Each lesson follows 14 steps, and every formula is also written out in words, first in Arabic and then in English. It also has unlimited practice, an exam simulator, flashcards, a mistake journal, a formula sheet, tools, a study planner and a progress report. Each lesson ends with a "Go deeper with Serway" section with extra problems.
  Every law is written with real fractions (numerator over denominator). Under each law, "One law, several forms" lists every form of it, what each form finds, and the algebra steps from the course form (for example Ohm's law: V = RI, R = V/I, I = V/R). The "Rearranging laws" page teaches the rules, with a practice drill.
- **Foundation section** in the tutor: a placement test, Unit 0 (11 maths and reading skills the course assumes, each with an Arabic‑first explanation, a worked example and fresh practice), an "Are you ready?" check on each chapter page, a course glossary and a "Problem language" page (phrases such as *starts from rest* → vᵢ = 0).
- Arabic text is shown right to left everywhere; formulas inside an Arabic sentence are kept left to right (`src/shared/rtl.js`).
- The tutor opens with an entry screen that asks for the student's name and greets them with their progress on each visit. A 🔊 button next to every English term reads it aloud (browser speech, English voice).
- **`Formula_Sheet_A4.pdf`** is every course law with the unit of each symbol on one A4 page, ready to print. The same sheet is the "A4 sheet" page in the tutor.
- **`Virtual_Lab.html`** is the virtual lab: 11 experiments built on the course laws, with data tables, graphs and a linear fit.
- **`docs/Course_Reference_and_Gap_Log.md`** is the course reference and gap log, with a source for every item.

Open either HTML file in a browser. Both work offline, and progress is saved in your browser.

## Live links
| | Claude link | GitHub Pages |
|---|---|---|
| Tutor | https://claude.ai/artifact/UNT2rrfNa1NrVedgyr6cEv | https://smalgamdi-gif.github.io/physic/ |
| Virtual lab | opened from the ⚗ Lab button in the tutor | https://smalgamdi-gif.github.io/physic/Virtual_Lab.html |

The Claude link and GitHub Pages both show the version on `main` and are updated together. An older Claude link (https://claude.ai/artifact/NZrJxE6v5SGksyYkyKtK6Y) was published from another account and is not kept in sync, so it may be out of date.

## Sources
- 📘 = taken from the course files (slides S01–S10, the "Ch 9 Updated" deck, and the textbook as BK p.N).
- 🧩 = additional design. This is not course content.
- 🔗 = Serway & Jewett, 9th ed., an external reference. Only sections on the same topics as the course are used.

## Rebuild
```
python3 src/app/build.py src/app index.html
python3 src/lab/build.py Virtual_Lab.html
```
