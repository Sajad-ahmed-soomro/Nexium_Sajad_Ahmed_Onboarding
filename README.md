# Nexium Onboarding – Sajad Ahmed

This repository contains the completed onboarding setup for the Nexium internship program. It includes environment configuration, developer tooling, and account setup to be ready for full-stack development using modern technologies.

---

## ✅ Onboarding Checklist

### 🧰 Development Environment
- [x] Node.js LTS v20.19.2 installed
- [x] `pnpm` installed and activated using Corepack
- [x] `.gitignore` configured for Node.js, Prisma, and sensitive files
- [x] `.env.example` created with necessary placeholders

### 🖥️ Editor Setup (VS Code)
- [x] ESLint
- [x] Prettier
- [x] Tailwind CSS IntelliSense
- [x] Prisma
- [x] GitHub Copilot (optional)

### 🌐 Cloud Services
- [x] Supabase (PostgreSQL): `nexium-pg` project created
- [x] MongoDB Atlas: `nexium-mongo` database created
- [x] Vercel account connected via GitHub
- [x] n8n.cloud account created for automation workflows

### 🛠️ CLI Tools Installed
- [x] `vercel`
- [x] `prisma`
- [x] `mongo`
- [x] Supabase CLI accessed using `pnpm dlx` (not globally installed)

---

## 📁 Project Structure

Currently no app code is included — this repo is focused purely on environment and service configuration as part of the onboarding.

---

## 🔐 Environment Variables

All sensitive values are excluded via `.gitignore`. See `.env.example` for structure.

```env
SUPABASE_URL=
SUPABASE_ANON_KEY=
MONGODB_URI=
DATABASE_URL=
VERCEL_TOKEN=
