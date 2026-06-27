<div align="center">

# Symptoms Monitor

### Track, visualize, and reflect on your health trends

_Built during my brain surgery recovery_

[![Live Demo](https://img.shields.io/badge/demo-live-limegreen?style=for-the-badge)](https://health.kcgbarbosa.dev)
[![View Code](https://img.shields.io/badge/code-github-black?style=for-the-badge&logo=github)](https://github.com/kcgbarbosa/symptoms-monitor)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

</div>

## Why I Built This

In 2024 I was diagnosed with a brain tumour. Over the next 12 months I underwent two neurosurgical procedures. My doctors emphasized the importance of closely tracking my symptoms, but doing so without structure was frustrating and didn't provide me any insights.

Six months into my recovery, I decided to build the tool I wish I had. A symptom monitoring tool with frequency tracking and visual analytics.

![Dashboard Screenshot](https://github.com/user-attachments/assets/cc3332b3-85a6-4d7b-bcb0-0460953542bf)

---

## Features

- Frequency tracking highlights your most logged symptoms over time
- Symptom correlations based on co-occurrence in your entries
- Week-over-week severity comparisons
- Timeline charts and severity radials
- Log symptoms retroactively with optional context notes

![Trends Page Screenshot](https://github.com/user-attachments/assets/0fd4f8de-26b8-4c5d-a729-9726e47d385f)

---

## Local Setup

**Front-end (pre-seeded)**:

```bash
git clone https://github.com/kcgbarbosa/symptoms-monitor.git
cd symptoms-monitor/frontend
echo "VITE_DEMO_MODE=true" > .env
npm install && npm run dev
```

**Full stack:**

```bash
# backend/.env
DATABASE_URL=postgresql://user:password@localhost:5432/symptoms_monitor
PORT=8000

cd backend && npm install && npm start
```

```bash
# new terminal
cd frontend
echo "VITE_DEMO_MODE=false" > .env
npm install && npm run dev
```

---

## Connect

**Kevin-Christian Giraldo-Barbosa**
[LinkedIn](https://www.linkedin.com/in/kcgbarbosa/) · [Email](mailto:kcgbarbosa@gmail.com)
