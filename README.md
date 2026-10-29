# Physics Learning Lab · مختبر تعلم الفيزياء

A private tutor and virtual lab for the first-year **General Physics** course (10 chapters, 37 lessons). Physics terms, laws and questions are in English, with Arabic explanations.

- **`index.html`** is the tutor. Each lesson follows 14 steps, and every formula is also written out in words, first in Arabic and then in English. It also has unlimited practice, an exam simulator, flashcards, a mistake journal, a formula sheet, tools, a study planner and a progress report. Each lesson ends with a "Go deeper with Serway" section with extra problems.
- **`Virtual_Lab.html`** is the virtual lab: 11 experiments built on the course laws, with data tables, graphs and a linear fit.
- **`docs/Course_Reference_and_Gap_Log.md`** is the course reference and gap log, with a source for every item.

Open either HTML file in a browser. Both work offline, and progress is saved in your browser.

## Sources
- 📘 = taken from the course files (slides S01–S10, the "Ch 9 Updated" deck, and the textbook as BK p.N).
- 🧩 = additional design. This is not course content.
- 🔗 = Serway & Jewett, 9th ed., an external reference. Only sections on the same topics as the course are used.

## Rebuild
```
python3 src/app/build.py src/app index.html
python3 src/lab/build.py Virtual_Lab.html
```
