# SkillSculpt - Resume Builder

A modern, Firebase-powered resume builder built with React and Vite.

## Features

- 🔐 Firebase Authentication (Email/Password + Google Sign-in)
- 📝 Create and manage multiple resumes
- 🎨 Real-time resume preview
- 📄 PDF export functionality
- 🌙 Dark/Light theme support
- 📱 Responsive design

## Tech Stack

- **Frontend**: React 19, Vite, React Router
- **Authentication**: Firebase Auth
- **Styling**: CSS3 with CSS Variables
- **PDF Generation**: jsPDF + html2canvas
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Firebase project with Authentication enabled

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/Resume_Builder.git
cd Resume_Builder
```

### 2. Install dependencies
```bash
npm install
```

3. Configure Firebase
   - Update `src/firebase.js` with your Firebase config
   - Enable Email/Password and Google authentication in Firebase Console

4. Start development server
```bash
npm run dev
```

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Vercel will automatically detect it's a Vite project
4. Deploy with default settings

### Environment Variables

No environment variables needed - Firebase config is included in the build.

## Project Structure

```
src/
├── components/
│   ├── Landing.jsx       # Landing page
│   ├── Login.jsx         # Login page
│   ├── Signup.jsx        # Signup page
│   ├── Dashboard.jsx     # Resume dashboard
│   ├── Navbar.jsx        # Navigation bar
│   ├── ResumeForm.jsx    # Resume editor
│   └── ResumePreview.jsx # Resume preview
├── firebase.js           # Firebase configuration
└── App.jsx              # Main app component
```

## License

MIT License