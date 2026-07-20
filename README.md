# Sylvius

A symptom journal for logging how you feel and understanding your patterns over time.

**[sylvius.kcgbarbosa.dev](https://sylvius.kcgbarbosa.dev)**

<img width="1760" height="1080" alt="adding entry in symptom monitoring app" src="https://github.com/user-attachments/assets/b8bd4989-b3ec-4b4c-ac14-af1941d85cba" />

Register for a new account or click the **Try Demo** button for a quick walkthrough.

## Why I built this

In 2024 I was diagnosed with a brain tumour and underwent two brain surgeries. In times of hardship, it's common for patients to try and regain a sense of control in their lives. The way this came up for me was educating myself and keeping a log of my ongoing condition.

Doing so was easier said than done. Neurological symptoms can be nuanced, which made the responsibility of logging them a stressor more than anything I would have considered empowering.

Three months after my final operation, I began building the tool I wish I'd had. A service that made tracking symptoms a frictionless experience, and turned my logs into something real.

## Features

- Symptom logging with severity, date, icon, and optional notes. The form suggests names you've used before and remembers each symptom's icon.
- A weekly overview with entry counts, average severity, and most-tracked symptoms.
- A symptom timeline chart and a co-occurrence insight that surfaces symptoms that tend to appear together.
- Correlation insights render only when there is enough data to support them. Below that threshold the app says so instead of showing a misleading number.
- Demo mode runs the full app with dates generated relative to today.
- Light and dark mode. Responsive across mobile, tablet, and desktop.

## Architecture

**Stack:** React 19, Vite, React Router 7, Zustand, Tailwind CSS v4 + shadcn/ui (Radix), Chart.js, Supabase.

- React frontend with Supabase handling the backend (Postgres, auth, and row-level security).
- Row-level security policies scope every query to the authenticated user, so user entries are secured.
- State handled with three Zustand stores (auth, entries, theme).
- All statistic aggregation is derived with utilities in `src/utils/dataProcessing.js`.
- Project styling principles kept consistent with a semantic token system.
- Loading skeletons occupy their corresponding component's shell when appropriate.

## Local Setup

Requires Node 18+.

```bash
git clone https://github.com/kcgbarbosa/sylvius.git
cd sylvius
npm install
npm run dev
```

Create a [Supabase](https://supabase.com) project and add an `.env`:

```bash
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

## About the name

The tumour mentioned above was located in the pineal region of my brain. It obstructed a narrow channel called the Sylvius aqueduct, which resulted in a blockage that caused my hydrocephalus. I found it fitting to name the project after the place where it all started.

## About

Built by **Kevin-Christian Giraldo-Barbosa**.

[LinkedIn](https://www.linkedin.com/in/kcgbarbosa/) · [Email](mailto:kcgbarbosa@gmail.com)
