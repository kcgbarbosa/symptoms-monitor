# Sylvius

A symptom journal for logging how you feel and understanding your patterns over time.

**[sylvius.kcgbarbosa.dev](https://sylvius.kcgbarbosa.dev)**

<!-- this is where ill put the walkthrough gif -->

## Why I built this

In 2024 I was diagnosed with a brain tumour and went under two brain surgeries. In times of hardship, it's common for patients to try and regain a sense of control in their lives. The way this came up for me was educating myself and keeping a log of my ongoing condition.

Doing so was easier said than done. Neurological symptoms can be nuanced, which made the responsibility of logging them became a stressor more than anything I would have considered empowering.

Three months after my final operation, I began building the tool I wish I'd had. A service that made tracking symptoms a frictionless experience, and turned my logs into something real.

## Features

- Symptom logging with severity, date, icon, and optional notes. The form suggests names you've used before and remembers each symptom's icon.
- A weekly overview with entry counts, average severity, most-tracked symptoms, and a week-over-week severity trend.
- A symptom timeline chart and a co-occurrence insight that surfaces symptoms that tend to appear together.
- Statistics render only when there is enough data to support them. Below that threshold the app says so instead of showing a misleading number.
- Demo mode runs the full app on seeded in-memory data, with dates generated relative to today.
- Light and Dark mode. Responsive across mobile, tablet, and desktop.

## Architecture

**Stack:** React 19, Vite, React Router 7, Zustand, Tailwind CSS v4 + shadcn/ui (Radix), Chart.js, Supabase.

- React frontend with Supabase handling the backend (Postgres, auth, and row-level security)

- State handled with three Zustand stores (auth, entries, theme).

- All statistic aggregation is derived with utiltiies in `src/utils/dataProcessing.js`

- Project styling principles kept consistent with a semantic token system.

- Loading skeletons share their layout shells with the components they stand in for.

## Local Setup

```bash
git clone https://github.com/kcgbarbosa/symptoms-monitor.git
cd symptoms-monitor
npm install
npm run dev
```

Create a [Supabase](https://supabase.com) project and add an `.env`:

```bash
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

## About

Built by **Kevin-Christian Giraldo-Barbosa**.

[LinkedIn](https://www.linkedin.com/in/kcgbarbosa/) · [Email](mailto:kcgbarbosa@gmail.com)
