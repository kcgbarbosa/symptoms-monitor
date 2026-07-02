<div align="center">

# Symptoms Monitor

## Track, visualize, and reflect on your health trends

_Built during my brain surgery recovery_

[![Live Demo](https://img.shields.io/badge/demo-live-limegreen?style=for-the-badge)](https://health.kcgbarbosa.dev)
[![View Code](https://img.shields.io/badge/code-github-black?style=for-the-badge&logo=github)](https://github.com/kcgbarbosa/symptoms-monitor)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

## Why I Built This

In 2024 I was diagnosed with a brain tumour. Over the next 12 months I underwent two neurosurgical procedures. Throughout the process, my doctors emphasized the importance of closely tracking my symptoms. I found monitoring my symptoms to be quite overwhelming.

After six months of recovery, I decided to start building the tool I wish I had. A symptom monitoring application that made tracking simple, while also providing helpful insights and empowering my progression.

---

## Features

- Personal profiles: Create an account to track and manage your own symptom history
  <img src='sm-github-media/demo-desktop-login.png'/>

- Fully responsive: works on mobile, tablet, and desktop

<img src='sm-github-media/demo-mobile-navbar.png' width='300'/>

- Symptom Logging: track symptoms from past, present or future with optional context notes
  ![Dashboard Screenshot](https://github.com/user-attachments/assets/cc3332b3-85a6-4d7b-bcb0-0460953542bf)
- Statistics & Insights: Weekly/all-time severity, total count, and correlation (based on co-occurrence)
- Visuals: various charts and radials throughout

![Trends Page Screenshot](https://github.com/user-attachments/assets/0fd4f8de-26b8-4c5d-a729-9726e47d385f)

---

## Demo Mode

The live demo runs with pre-seeded data so you can explore the full UI without having to create an account. </br> Entries, trends, and insights are all populated. Sign up when you're ready to start tracking your own data.

## Contribution / Running Locally

```bash
git clone https://github.com/kcgbarbosa/symptoms-monitor.git
cd symptoms-monitor/frontend
npm install && npm run dev
```

Create a free [Supabase](https://supabase.com) project and update `frontend/.env`:

```bash
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

**Contributing:**

1. Fork the repo and create a branch from `main`
2. Make your changes and test locally
3. Open a pull request with a clear description of changes and why

## Connect

**Kevin-Christian Giraldo-Barbosa**
[LinkedIn](https://www.linkedin.com/in/kcgbarbosa/) · [Email](mailto:kcgbarbosa@gmail.com)
