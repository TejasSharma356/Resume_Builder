# 📄 Resume Builder

A modern **Resume Builder Web Application** built with **React + Vite**.  
Easily create, preview, and download resumes with a clean UI and customizable sections.

---

## 🚀 Features
- 🔑 **Authentication** (Login page with light/dark theme toggle)
- 📝 **Resume Form** – add personal details, education, work experience, skills, and projects
- 👀 **Live Preview** – instant preview while editing
- 💾 **Save Multiple Resumes** – manage and switch between resumes from dashboard
- 📥 **Download as PDF**
- 🎨 **Dark / Light Theme** support
- 🌐 **Deployed on Vercel**

---

## 🛠️ Tech Stack
- [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) ⚡ fast build
- [React Router](https://reactrouter.com/) – routing
- [Tailwind CSS](https://tailwindcss.com/) (or CSS modules, if used)
- [shadcn/ui](https://ui.shadcn.com/) (optional components)
- Deployment: [Vercel](https://resume-builder-alpha-seven-83.vercel.app/)

---

## 📂 Project Structure

```
Resume_Builder/
│── public/                # Static assets
│── src/
│   ├── components/        # Reusable components
│   ├── pages/             # Pages (Login, Dashboard, ResumeForm, ResumePreview)
│   ├── App.jsx            # Main app entry
│   ├── main.jsx           # React root
│   └── styles/            # CSS files (e.g., Login.css)
│── vite.config.js         # Vite config
│── package.json
│── vercel.json            # Deployment config
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repo
```bash
git clone https://github.com/your-username/Resume_Builder.git
cd Resume_Builder
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run locally
```bash
npm run dev
```
App will be available at 👉 `http://localhost:5173`

### 4. Build for production
```bash
npm run build
npm run preview
```

---

## 🌐 Deployment on Vercel

1. Push your project to **GitHub**.
2. Go to [Vercel Dashboard](https://vercel.com/).
3. Import your GitHub repo.
4. Vercel auto-detects **Vite + React** → no config needed.
5. Add a `vercel.json` for React Router support:
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/" }
     ]
   }
   ```
6. Deploy 🎉


## 🤝 Contributing
Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change.

---

## 📜 License
This project is licensed under the **MIT License**.
