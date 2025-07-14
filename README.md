# 🧠 Promptopia

**Discover & Share AI-Powered Prompts**  
Promptopia is an open-source fullstack AI prompting tool for the modern world — built to help users discover, create, and share creative prompts powered by artificial intelligence.

🌐 **Live Demo**  
👉 [https://share-prompts-git-main-emmanuelajibokuns-projects.vercel.app/](https://share-prompts-git-main-emmanuelajibokuns-projects.vercel.app/)

---

## 🚀 Features

- 🔍 Discover community-shared AI prompts
- ✍️ Create and manage your own prompts
- 🧑‍💻 Full authentication using **Google OAuth** via `next-auth`
- 📦 Powered by **MongoDB Atlas** for backend storage
- ⚡ Built with modern, scalable technologies

---

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Frontend**: React 18 + Tailwind CSS
- **Backend**: Next.js API Routes
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) with Google Provider
- **Database**: MongoDB + Mongoose
- **Styling**: Tailwind CSS 3

---

## 🧩 Architecture

This is a **fullstack React app** built with **Next.js App Router**, leveraging:

- ✅ Next.js API Routes for backend logic
- ✅ `mongoose` for schema modeling and database operations
- ✅ `next-auth` for secure authentication with Google
- ✅ Server components and dynamic routing (e.g., `/profile`, `/create-prompt`, etc.)

---

## 📦 Installation (Local Development)

```bash
# 1. Clone the repo
git clone https://github.com/EmmanuelAjibokun/share-prompts.git
cd share-prompts

# 2. Install dependencies
npm install

# 3. Add environment variables
# Create a .env file and add the following:
MONGODB_URI=your_mongodb_connection_string
GOOGLE_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
NEXTAUTH_SECRET=your_auth_secret

# 4. Run the app locally
npm run dev
