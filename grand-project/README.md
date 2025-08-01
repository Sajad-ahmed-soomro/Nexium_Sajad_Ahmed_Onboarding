

# 🧠 MindTrack – Your Mental Health Companion

MindTrack is an AI-powered mental health tracking web application designed to help users better understand their emotional well-being. It offers a personalized experience with features like mood logging, AI-assisted journaling, weekly insights, and smooth onboarding—all wrapped in a beautiful and modern UI.

Built with Next.js, Supabase, and n8n, MindTrack empowers users to track moods, reflect through journaling, and visualize mental health trends over time. It's private, secure, and built with empathy.

[🌐 Live Site](https://mental-health-assistant-gilt.vercel.app/)
---

## ✨ Features

- 🔐 Magic Link Authentication (Supabase Auth)
- 📝 AI Journal Assistant (powered via n8n workflows)
- 😊 Mood Logging with notes and activity tags
- 📊 Weekly Insights & Mood Trends
- 💬 AI-generated Reflection Questions
- 🎨 Beautiful animations with Framer Motion
- 🧩 Modular design with scalable components

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router), Tailwind CSS, ShadCN UI, Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth), MongoDB (optional for journaling),Redis (for caching)
- **AI Services**: n8n (self-hosted), Grok/OpenAI (via API workflows)
- **Deployment**: Vercel (Frontend), Supabase (Backend), Ubuntu Server (n8n)

---

## 📁 Project Structure

```

mindtrack/
├── app/                 # Next.js App Router pages
├── components/          # MoodLogs, AIJournal, Trends, etc.
├── lib/                 # Supabase client, helpers
├── public/              # Static assets
├── styles/              # Tailwind config
├── .env.local           # Environment variables
└── README.md

````

---

## ⚙️ Environment Variables (`.env.local`)

Create a `.env.local` file at the root of your project with the following values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# (Optional) For server-side API or role-based logic
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AI Workflow (n8n) Endpoint
N8N_WEBHOOK_URL=https://your-n8n-server/webhook/mindtrack
````

You can find these in your Supabase dashboard or server setup.

---

## 🚀 Getting Started

1. **Clone the Repository**

```bash
https://github.com/Sajad-ahmed-soomro/Nexium_Sajad_Ahmed_Onboarding.git
cd grand-project
```

2. **Install Dependencies**

```bash
npm install
```

3. **Run Locally**

```bash
npm run dev
```

The app will be running at `http://localhost:3000`.

---

## 🧠 How the AI Journal Works

* The user enters a journal entry.
* The app sends it to an n8n webhook (`N8N_WEBHOOK_URL`).
* n8n workflow processes the entry via LLM (e.g., Grok/OpenAI).
* The response includes a summary and three reflection questions.

### Example Payload:

```json
{
  "entry": "I’ve been feeling anxious about exams and can't focus.",
  "user_id": "uuid-from-supabase"
}
```

### Example Response:

```json
{
  "summary": "You're feeling anxious about upcoming exams and struggling to focus.",
  "questions": [
    "What is causing the most stress about your exams?",
    "How have you coped with focus issues before?",
    "Would creating a daily schedule help reduce anxiety?"
  ]
}
```

---

## 📦 Deployment Instructions

* **Frontend**: Deploy directly to [Vercel](https://vercel.com/) by connecting the GitHub repository.
* **Backend**: Create a project on [Supabase](https://supabase.com/), set up `auth.users`, `profiles`, and `mood_logs` tables.
* **AI Workflows**: Host n8n on a VPS or cloud provider, and activate your MindTrack webhook workflow.

---

## 📊 Supabase Schema Overview

```sql
-- Profiles Table
create table profiles (
  id uuid references auth.users(id) primary key,
  name text,
  focus_area text,
  updated_at timestamp with time zone default now()
);

-- Mood Logs Table
create table mood_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  mood text,
  note text,
  tags text[],
  inserted_at timestamp with time zone default now()
);
```

> Row Level Security (RLS) should be enabled with appropriate policies for secure access.

---

## ✅ Roadmap / TODO

* [x] Magic link auth with Supabase
* [x] Mood logging with optional tags & notes
* [x] AI Journal with summaries and prompts
* [x] Weekly trends & mood charts
* [ ] Notification reminders
* [ ] Export data to CSV
* [ ] Offline first support
* [ ] Dark mode toggle

---

## 👨‍💻 Author

Developed by **Sajad Ahmed**

> Passionate about building tools for mental wellness and emotional growth.

---

## 🧾 License

Licensed under the MIT License – use freely and respectfully.

Happy building 🧠✨
