# AI Presales Academy — Interactive Syllabus

A 12-week interactive roadmap for the **Presales AI Engineer** role: LLMs and RAG → GPU sizing, storage, networking and Kubernetes → the presales craft of discovery, demos, RFPs and customer meetings. Built as a zero-dependency static site — no build step, works offline, installable as an app.

## Features

- **13 modules** with objectives, expandable lessons, flip-card key terms, 4-question quizzes (with explanations) and hands-on activities
- **Progress tracking** — checked lessons & activities saved in `localStorage`, with a global progress bar and confetti at 100%
- **Search** across modules, lessons and topics (try `RAG`, `VRAM`, `NVLink`, `RFP`)
- **Spaced Repetition Flashcards** — SM-2 algorithm with `Again / Good / Easy` grading
- **Mock Interview** — real Presales AI Engineer questions with probing hints, answer structures and a 2-minute timer
- **Cheat Sheet** — GPU spec tables, KV-cache formula, inference sizing math and presales acronyms
- **Night PDF** — one tap prints the entire syllabus (lessons, quizzes, flashcards, tables) as a dark, night-readable PDF
- **PWA** — installable on any phone/desktop, fully offline via service worker

## Run locally

Any static server works (no build step):

```bash
# Python
python -m http.server 8000
# or Node
npx serve .
```

Then open `http://localhost:8000`.

> ⚠️ The **Install-as-app** button and offline caching only work over `http(s)` — not `file://`. Use a local server (above) or GitHub Pages.

## Deploy to GitHub Pages

A workflow ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) deploys automatically on every push to `main` — no manual steps after the first setup.

**One-time setup:**

1. Push this repository to GitHub (branch `main`).
2. Repo → **Settings → Pages** → **Build and deployment → Source → GitHub Actions**.
3. Done — the next push (or the "workflow_dispatch" run) deploys it to
   `https://<your-username>.github.io/<repo-name>/`.

**Manual deploy (no GitHub Actions):** Settings → Pages → Source → *Deploy from a branch* → `main` / root.

### Updating the live site

- Push to `main` → the workflow redeploys in ~1 minute.
- The phone may show a cached copy. Bump the cache version in `sw.js`
  (`var CACHE = 'paie-cache-vN';`) before pushing, then refresh twice on the device.

## Install as an app (PWA)

1. Open the deployed URL in Chrome (phone or desktop).
2. Tap the **Install** button in the header — or use the browser menu → *Add to Home screen* / *Install app*.
3. It launches full-screen and works offline after the first visit (Google Fonts may fall back to system fonts when offline).

## Night PDF

Tap **Night PDF** in the header. It expands every lesson, quiz and flashcard table, then opens the print dialog — choose *Save as PDF*. The output is dark-themed (light text on dark navy), designed for comfortable reading at night. `print-color-adjust: exact` keeps the dark backgrounds in the PDF.

## Project structure

```
├── index.html              # App shell + icon sprite + all markup
├── css/style.css           # Design system, mobile drawer, night-print styles
├── js/
│   ├── app.js              # Rendering, quizzes, SRS, interview, PWA, drawer
│   └── data/               # Curriculum content (modules, extras, diagrams)
├── manifest.webmanifest    # PWA manifest
├── sw.js                   # Service worker (offline caching)
├── icons/                  # Generated PWA icons (192 / 512 / maskable / 180)
└── tools/                  # Icon generators + validators (dev only, not deployed)

`skills-lock.json`, `.agents/` and `.claude/` are local development data —
gitignored (or stripped from the Pages artifact) and never deployed.
```

## Made for

The Presales AI Engineer job description — open to freshers → 2 yrs. Learn, practice, then go win a deal. 🚀
