<div align="center">

# 🧠 Symptoms Monitor

### Track, Visualize, and Reflect on Your Health Trends

_Built during my neurological recovery journey — 6 months post-craniotomy_

[![Live Demo](https://img.shields.io/badge/demo-live-limegreen?style=for-the-badge)](https://symptoms-monitor.vercel.app/)

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

[💻 View Code](https://github.com/kcgbarbosa/symptoms-monitor)

</div>

## 💡 Why I Built This

Over the last year, I was diagnosed with a brain tumour and underwent two neurosurgical procedures. My doctors emphasized the importance of closely tracking my symptoms, but doing so in my Notes app was frustrating and provided zero insights.

Six months into my recovery, I decided to build the tool I wish I had. A simple-to-use Symptom Monitor with **frequency tracking** and **visual analytics**.

![Dashboard Screenshot ](https://github.com/user-attachments/assets/cc3332b3-85a6-4d7b-bcb0-0460953542bf)

## 🏗️ How it's Built

- **Frontend**: React 19 with component-based architecture, client-side routing with React Router, responsive design with Tailwind CSS
- **Backend**: RESTful Express API with PostgreSQL for persistent storage, hosted on Neon
- **State Management:** Zustand for global state with dual-mode support (demo/production)
- **Data Visualization**: Chart.js with React wrapper for responsive charts and analytics
- **UI/UX**: DaisyUI components, Lucide icons, React Hot Toast notifications

## 📱 Responsive by Design

Built mobile-first with responsive utilities.

<img width="295" height="434" alt="" src="https://github.com/user-attachments/assets/b33e71f4-1933-4f7c-8d41-2730c5329e75" />

## ✨ Key Features

### 🔍 Trend Insights

The app summarizes your logged entries to display recurring trends and relationships over time.

- **Frequency Tracking**: Highlights your most tracked symptoms over time
- **Symptom Correlations**: Highlights commonly co-occurring symptoms based on logging frequency.
- **Severity Trends**: Week-over-week severity comparisons expressed as percentage differences

![Pattern Detection Screenshot](https://github.com/user-attachments/assets/f3c42061-e48f-4551-843b-e9567dccccb2)

### 📝 Intuitive Symptom Logging

- **Quick Entry**: Add symptoms with icon picker and severity slider
- **Date Selection**: Log symptoms retroactively or in real-time
- **Flexible Notes**: Capture context (triggers, what helped)

<img width="500" height="700" alt="" src="https://github.com/user-attachments/assets/f2c1804d-dfb8-41a6-8f04-23c0b8db3cff" />

### 📈 Visual Analytics

- **Timeline Charts**: View symptom frequency over time
- **Severity Radials**: Understand which symptoms are hitting the hardest
- **Weekly KPIs**: Frequently updating statistics keeping you informed on your health trends

![Trends Page Screenshot](https://github.com/user-attachments/assets/0fd4f8de-26b8-4c5d-a729-9726e47d385f)

## 🚀 Quick Start

### 1. View the Live Demo (No Setup)

_The live demo runs entirely in the browser using pre-seeded mock data:_

You can test the app instantly - **no backend or setup required**:

[![Live Demo](https://img.shields.io/badge/demo-live-limegreen?style=for-the-badge)](https://symptoms-monitor.vercel.app/)

### 2. Run Locally (Demo Mode)

Explore the UI and state management without a database (client-side demo mode):

```bash
# 1. Clone the repository
git clone https://github.com/kcgbarbosa/symptoms-monitor.git
cd symptoms-monitor/frontend

# 2. Configure environment
echo "VITE_DEMO_MODE=true" > .env

# 3. Install and launch
npm install
npm run dev

```

> **Want real data persistence?**  
> Run the full-stack version below with Node, Express, and PostgreSQL.

### 3. Run Locally (Full Stack)

Test the **Node/Express** API and **PostgreSQL** integration:

#### Backend Setup

1. From the project **root**, create a `.env` file with your credentials:

```bash
# Your local or Neon connection string
DATABASE_URL=postgresql://user:password@localhost:5432/symptoms_monitor

# The port your server will listen on (default: 8000)
PORT=8000
```

2. Start the server (this will initialize the database):

```bash
cd backend
npm install
npm start
```

3. (Optional) From the project root, seed with sample data:

```bash
node backend/seeds/entries.js
```

#### Frontend Setup

Open a new terminal window:

1. Navigate to the frontend folder and update settings:

```bash
cd frontend
echo "VITE_DEMO_MODE=false" > .env
```

2. Start the UI:

```bash
npm install
npm run dev
```

---

## 📁 Project Structure

```
symptoms-monitor/
├── backend/
│   ├── config/
│   │   └── db.js                    # PostgreSQL connection
│   ├── controllers/
│   │   └── entryController.js       # CRUD business logic
│   ├── routes/
│   │   └── entryRoutes.js           # API endpoints
│   ├── seeds/
│   │   └── entries.js               # Database seeding
│   ├── server.js                    # Express app entry point
│   ├── .env                         # Backend environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── charts/              # Chart.js visualizations
│   │   │   ├── kpicards/            # Card metrics
│   │   │   ├── IconPicker/          # Icon selection UI
│   │   │   └── ui/                  # Reusable UI components
│   │   ├── pages/                   # Route components
│   │   │   ├── HomePage.jsx         # Dashboard with KPIs
│   │   │   ├── EntriesPage.jsx      # Full entry list + chart
│   │   │   └── TrendsPage.jsx       # Advanced analytics
│   │   ├── config/
│   │   │   ├── demoConfig.js        # Demo mode toggle
│   │   │   └── demoSeedData/        # Demo mode data
│   │   ├── store/
│   │   │   └── useEntriesStore.js   # Zustand state management
│   │   ├── utils/
│   │   │   ├── dataProcessing.js    # Data aggregation utilities
│   │   │   └── severityConstants.js # Styling maps
│   │   └── layout/                  # Nav, containers
│   ├── .env                         # Environment variables
│   └── package.json
│
└── README.md
```

## 🎓 What I Learned

### Technical Growth

- **State Management**: Implemented Zustand for global state management while maintaining local state for component-specific UI logic
- **API Design**: Built RESTful endpoints following conventional HTTP methods (GET, POST, PUT, DELETE)
- **Component Abstraction**: Knowing when to extract reusable components vs. keeping logic inline
- **Async JavaScript**: Handled asynchronous data fetching with proper error handling and loading states

### Challenges Overcome

- **Rolling Date Algorithm**: Demo data needed to appear recent without manual updates. Implemented a date system util that generates entry dates for seed data relative to "today", for an always up-to-date timeframe
- **Data Summary Design**: Determining meaningful metrics while avoiding displaying misleading interpretations from minimal data
- **Authentic Demo Experience**: Solved the challenge of showcasing full app functionality without a backend by simulating real API interactions with client‑side data, ensuring the demo behaves like the production app.

# 📈 Future Enhancements

This is version 1.0. Here's what's next:

### Short-term

- **Splash Page**: Welcome Message with brief app overview for first-time visitors
- **Dark Mode**: Improve UX & accessibility
- **Custom Date Ranges**: Filter analytics by week/month/quarter
- **Data Sorting**: Sort data displayed by name, entry date, severity

### Long-term

- **User Authentication**: Complete multi-user support
- **Schema Expansion**: Expand schema to include additional fields to enable more thorough symptom monitoring
- **Export Functionality**: Download symptom data as CSV/PDF for doctor appointments

## 🤝 Connect With Me

**Kevin-Christian Giraldo-Barbosa**

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kcgbarbosa/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:kcgbarbosa@gmail.com)

## 🙏 Acknowledgments

- My medical team for emphasizing the importance of symptom monitoring
- Everyone who has supported me throughout my recovery journey

---

<div align="center">

## 📄 License

This Symptoms Monitor is open source and available under the [MIT License](LICENSE).

## ℹ️ Disclaimer

_Insights are generated by summarizing and comparing your own logged entries over time using your data exclusively. The app is designed to help you reflect on your symptom trends, not to diagnose conditions, predict health outcomes, or replace medical advice._

</div>
