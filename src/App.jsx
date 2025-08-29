// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Landing from "./Landing";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// Create an empty resume structure
const createEmptyResume = (name = "") => ({  
  name,
  basics: {
    name: "",
    label: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    image: "",
    summary: ""
  },
  work: [],
  education: [],
  skills: [],
  projects: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

function App() {  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resumes, setResumes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  // Add a new resume with a name and select it
  const addResume = (name) => {
    const newResume = createEmptyResume(name);
    const newIndex = resumes.length; // Index for the new resume
    
    setResumes(prev => [...prev, newResume]);
    setCurrentIndex(newIndex); // Set current index to the new resume
    
    return newIndex; // Return the index for navigation
  };

  // Export preview area as PDF
  const downloadPDF = async () => {
    const input = document.getElementById("resume-preview");
    if (!input) return alert("No preview available for PDF export.");

    try {
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 0;
      let heightLeft = imgHeight;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName =
        resumes[currentIndex]?.name && resumes[currentIndex].name.trim() !== ""
          ? `${resumes[currentIndex].name}.pdf`
          : "resume.pdf";

      pdf.save(fileName);
    } catch (err) {
      console.error("PDF export failed:", err);
      alert("PDF export failed — check console.");
    }
  };

  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Login Page */}
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" replace /> : <Login onLogin={setUser} />} 
        />

        {/* Signup Page */}
        <Route 
          path="/signup" 
          element={user ? <Navigate to="/dashboard" replace /> : <Signup onLogin={setUser} />} 
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard
                resumes={resumes}
                setResumes={setResumes}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                addResume={addResume}
                user={user}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Resume Form */}
        <Route
          path="/form"
          element={
            user ? (
              currentIndex !== null && resumes[currentIndex] ? (
                <ResumeForm 
                  resumes={resumes}
                  currentIndex={currentIndex}
                  setResumes={setResumes}
                />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Resume Preview */}
        <Route
          path="/preview"
          element={
            user ? (
              currentIndex !== null && resumes[currentIndex] ? (
                <ResumePreview 
                  resumes={resumes}
                  currentIndex={currentIndex}
                  downloadPDF={downloadPDF}
                />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
