
# 📰 Blog Summariser

**Blog Summariser** is a full-stack web application that allows users to input any blog URL, automatically extract and summarize its content using a basic AI summarizer, translate the summary to Urdu using LibreTranslate API, and store both the full text and summaries for future use.

🔗 **Live Demo**:  
👉 [https://blog-summarizer-git-main-sajad-ahmeds-projects.vercel.app/](https://blog-summarizer-git-main-sajad-ahmeds-projects.vercel.app/)

---

## 📌 Features

- ✅ Input any blog URL for instant summary.
- 🤖 AI-simulated fallback when real summarization fails.
- 🌐 Translates English summary into **Urdu**.
- 🔍 Uses **Cheerio** for HTML scraping.
- 📤 Stores summaries in **Supabase** database.
- 🧾 Stores full blog content in **MongoDB**.
- 🎨 Clean responsive UI with **ShadCN UI** & **Tailwind CSS**.
- 💡 Handles scraping/translation/DB errors gracefully.

---

## 🛠️ Tech Stack

| Frontend         | Backend/API         | Database       | Other Services        |
|------------------|----------------------|----------------|------------------------|
| Next.js 15       | Next.js api | Supabase       | Cheerio (Scraping)     |
| Tailwind CSS     | Axios                | MongoDB Atlas  | LibreTranslate API     |
| ShadCN UI        |                      |                | Vercel (Deployment)    |

---

## 📂 Folder Structure

```
assignment-2/
├── app/
│   ├── page.jsx
│   ├── api/
│   │   └── summarize/route.js
├── components/
│   ├── Footer.jsx
│   ├── Header.jsx
│   └── BlogForm.jsx
├── lib/
├── public/
│   ├── images/
│   │   └── contact.gif
├── styles/
│   └── globals.css
├── .env (not committed)
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Sajad-ahmed-soomro/Nexium_Sajad_Ahmed_Onboarding.git
cd Nexium_Sajad_Ahmed_Onboarding/assignment-2
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of `assignment-2`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=your_database_name
```

### 4. Run the Dev Server

```bash
npm run dev
```

Then go to [http://localhost:3000](http://localhost:3000)

---

## 🧠 Fallback Logic

- **Scraping fails?** → Static text is used.
- **Summarization fails?** → Static AI summary is returned.
- **Translation fails?** → Static Urdu fallback summary.
- **Supabase/MongoDB fail?** → Logged but non-blocking.

---

## ✨ Future Improvements

- Add real AI summarization (OpenAI/CodeT5).
- UI feedback on loading and errors.
- Allow Urdu → English summaries.
- Save recent summaries per user.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙋‍♂️ Author

**Sajad Ahmed Soomro**

- 📧 Email: sajadahmedsoomro321@gmail.com  
- 🧑‍💻 GitHub: [Sajad-ahmed-soomro](https://github.com/Sajad-ahmed-soomro)  
- 💼 LinkedIn: [Sajad Ahmed](https://www.linkedin.com/in/sajad-ahmed/)
