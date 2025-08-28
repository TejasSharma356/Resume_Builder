{/*
    APP.jsx code

    
 import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const createEmptyResume = (name = "") => ({
  name,
  personal: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    linkedin: "",
    github: "",
    portfolio: "",
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

function App() {
  const [user, setUser] = useState(null);
  const [resumes, setResumes] = useState([]); // start empty
  const [currentIndex, setCurrentIndex] = useState(null);

  // Add a new resume with a name and select it
  const addResume = (name) => {
    const newResume = createEmptyResume(name);
    setResumes((prev) => {
      const arr = [...prev, newResume];
      // select the new one
      setCurrentIndex(arr.length - 1);
      return arr;
    });
  };

  // Update resume at currentIndex
  const handleUpdate = (updatedData) => {
    if (currentIndex === null) return;
    const updated = { ...updatedData, updatedAt: new Date().toISOString() };
    setResumes((prev) => {
      const copy = [...prev];
      copy[currentIndex] = updated;
      return copy;
    });
  };

  // Export preview area as PDF (uses element with id="resume-preview")
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
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Login onLogin={setUser} />}
        />

        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard
                resumes={resumes}
                setResumes={setResumes}
                setCurrentIndex={setCurrentIndex}
                addResume={addResume}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/form"
          element={
            user ? (
              currentIndex !== null && resumes[currentIndex] ? (
                <ResumeForm resumeData={resumes[currentIndex]} onUpdate={handleUpdate} />
              ) : (
                <div className="p-6 text-red-500 font-bold">No resume selected. Go to Dashboard.</div>
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/preview"
          element={
            user ? (
              currentIndex !== null && resumes[currentIndex] ? (
                <ResumePreview resumeData={resumes[currentIndex]} downloadPDF={downloadPDF} />
              ) : (
                <div className="p-6 text-red-500 font-bold">No resume selected. Go to Dashboard.</div>
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
 */}



 {/*
                LOGIN.jsx code
    
    import React, { useState } from "react";
 
 const Login = ({ onLogin }) => {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
 
     const handleSubmit = (e) => {
         e.preventDefault();
         // Simple authentication logic (for demo purposes)
         if (email && password){
             onLogin(email);  // Pass email to parent on successful login
         }
         else{
             alert("Please enter email and password");
         }
     };
 
     return(
         <div className="flex items-center justify-center h-screen bg-gray-100">
             <form
             onSubmit = {handleSubmit}
             className="bg-white p-6 rounded-2xl shadow-md w-96"
             >
                 <h2 className ="text-2xl font-bold mb-4 text-center">Login</h2>
                 <input
                     type="email"
                     className="border p-2 w-full rounded mb-3"
                     placeholder="Email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     />
                 <input
                     type="password"
                     className="border p-2 w-full rounded mb-3"
                     placeholder="Password" 
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     />
                 <button
                     type="submit"
                     className=" w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                     >
                     Login
                     </button>
             </form>
         </div>
 
     );
 };
 export default Login; */}




 {/* 

    DASHBOARD.jsx code

    import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
};

function Dashboard({ resumes, setResumes, setCurrentIndex, addResume }) {
  const navigate = useNavigate();

  const handleCreate = () => {
    const name = prompt("Enter a name for this resume:");
    if (!name || !name.trim()) return alert("Resume name required.");
    addResume(name.trim());
    // after addResume (App sets currentIndex), navigate to form:
    navigate("/form");
  };

  const handleEdit = (index) => {
    setCurrentIndex(index);
    navigate("/form");
  };

  const handlePreview = (index) => {
    setCurrentIndex(index);
    navigate("/preview");
  };

  const handleDelete = (index) => {
    const ok = window.confirm(`Delete "${resumes[index]?.name || `Resume ${index + 1}`}?"`);
    if (!ok) return;
    setResumes((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      // Adjust selected index if necessary
      setCurrentIndex((cur) => {
        if (updated.length === 0) return null;
        if (cur === null) return 0;
        if (cur > index) return cur - 1;
        if (cur === index) return Math.max(0, cur - 1);
        return cur;
      });
      return updated;
    });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Your Resumes</h2>
        <button className="create-btn" onClick={handleCreate}>
          + Create New Resume
        </button>
      </div>

      <div className="resume-grid">
        {resumes.length === 0 ? (
          <div className="no-resumes">No resumes yet. Create one to get started.</div>
        ) : (
          resumes.map((resume, idx) => (
            <div key={idx} className="resume-card">
              <div className="resume-card-inner">
                <div className="resume-name" title={resume.name || `Resume ${idx + 1}`}>
                  {resume.name || `Resume ${idx + 1}`}
                </div>
                   <p className="resume-name">
                    Last edited: {formatDate(resume.updatedAt)}
                  </p>

                <div className="resume-actions">
                  <button className="btn edit" onClick={() => handleEdit(idx)}>Edit</button>
                  <button className="btn preview" onClick={() => handlePreview(idx)}>Preview</button>
                  <button className="btn delete" onClick={() => handleDelete(idx)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
 */}



 {/* 
        RESUMEFORM.JSX code




    import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TABS = ["Personal", "Education", "Experience", "Skills", "Projects"];

const emptyEducation = () => ({ school: "", degree: "", year: "" });
const emptyExperience = () => ({ company: "", role: "", duration: "" });
const emptyProject = () => ({ title: "", description: "" });

const ResumeForm = ({ resumeData, onUpdate }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => resumeData || {});
  const [activeTab, setActiveTab] = useState("Personal");

  useEffect(() => {
    setFormData(resumeData || {});
  }, [resumeData]);

  if (!formData) return null;

  const updateAndNotify = (newData) => {
    setFormData(newData);
    onUpdate(newData);
  };

  // Generic change handler
  const handleChange = (value, section = null, index = undefined, field = undefined) => {
    let newData;
    if (section && typeof index === "number" && field) {
      const updatedSection = [...(formData[section] || [])];
      updatedSection[index] = { ...updatedSection[index], [field]: value };
      newData = { ...formData, [section]: updatedSection };
    } else if (section && field) {
      // For nested object sections (not used here aside from arrays)
      newData = { ...formData, [section]: { ...(formData[section] || {}), [field]: value } };
    } else if (section === "personal" && field) {
      newData = { ...formData, personal: { ...(formData.personal || {}), [field]: value } };
    } else {
      // root-level (like name)
      newData = { ...formData, [field]: value };
    }
    updateAndNotify(newData);
  };

  // Simpler wrappers for personal
  const handlePersonalChange = (field, value) => {
    const newData = { ...formData, personal: { ...(formData.personal || {}), [field]: value } };
    updateAndNotify(newData);
  };

  // Add / remove entries
  const addEntry = (section, emptyObj) => {
    const updated = [...(formData[section] || []), emptyObj];
    updateAndNotify({ ...formData, [section]: updated });
  };

  const removeEntry = (section, idx) => {
    const updated = (formData[section] || []).filter((_, i) => i !== idx);
    updateAndNotify({ ...formData, [section]: updated });
  };

  // Skills are strings
  const updateSkill = (idx, value) => {
    const updated = [...(formData.skills || [])];
    updated[idx] = value;
    updateAndNotify({ ...formData, skills: updated });
  };

  const addSkill = () => addEntry("skills", "");
  const removeSkill = (idx) => removeEntry("skills", idx);

  // Save and navigate back to dashboard
  const handleSave = () => {
    onUpdate(formData);
    navigate("/dashboard");
  };

  // Save and go to preview
  const handlePreview = () => {
    onUpdate(formData);
    navigate("/preview");
  };

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Editing: {formData.name || "(no name)"}</h2>
        <div className="space-x-2">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Save & Dashboard
          </button>
          <button
            onClick={handlePreview}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Save & Preview
          </button>
        </div>
      </div>

      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Resume Name</label>
        <input
          className="border p-2 rounded w-full"
          value={formData.name || ""}
          onChange={(e) => {
            const newData = { ...formData, name: e.target.value };
            updateAndNotify(newData);
          }}
          placeholder="Enter a resume name"
        />
      </div>

      
      <div className="mb-4">
        <div className="flex gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-3 py-1 rounded ${activeTab === t ? "bg-gray-800 text-white" : "bg-gray-100"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      
      <div className="bg-white rounded p-4 shadow-sm">
        {activeTab === "Personal" && (
          <div className="space-y-3">
            {[
              { k: "firstName", label: "First Name" },
              { k: "lastName", label: "Last Name" },
              { k: "email", label: "Email", type: "email" },
              { k: "phone", label: "Phone" },
              { k: "address", label: "Address" },
              { k: "city", label: "City" },
              { k: "state", label: "State" },
              { k: "zip", label: "Zip" },
              { k: "country", label: "Country" },
              { k: "linkedin", label: "LinkedIn" },
              { k: "github", label: "GitHub" },
              { k: "portfolio", label: "Portfolio" },
            ].map((f) => (
              <div key={f.k}>
                <label className="text-xs text-gray-600">{f.label}</label>
                <input
                  type={f.type || "text"}
                  className="border p-2 rounded w-full"
                  value={formData.personal?.[f.k] || ""}
                  onChange={(e) => handlePersonalChange(f.k, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === "Education" && (
          <div className="space-y-3">
            {(formData.education || []).map((edu, idx) => (
              <div key={idx} className="border rounded p-3">
                <div className="flex justify-between items-center mb-2">
                  <strong>Education #{idx + 1}</strong>
                  <button onClick={() => removeEntry("education", idx)} className="text-red-600 text-sm">
                    Remove
                  </button>
                </div>
                <input
                  placeholder="School / College"
                  className="border p-2 w-full mb-2 rounded"
                  value={edu.school || ""}
                  onChange={(e) => handleChange(e.target.value, "education", idx, "school")}
                />
                <input
                  placeholder="Degree"
                  className="border p-2 w-full mb-2 rounded"
                  value={edu.degree || ""}
                  onChange={(e) => handleChange(e.target.value, "education", idx, "degree")}
                />
                <input
                  placeholder="Year"
                  className="border p-2 w-full rounded"
                  value={edu.year || ""}
                  onChange={(e) => handleChange(e.target.value, "education", idx, "year")}
                />
              </div>
            ))}
            <button onClick={() => addEntry("education", emptyEducation())} className="mt-2 px-3 py-1 bg-gray-200 rounded">
              + Add Education
            </button>
          </div>
        )}

        {activeTab === "Experience" && (
          <div className="space-y-3">
            {(formData.experience || []).map((exp, idx) => (
              <div key={idx} className="border rounded p-3">
                <div className="flex justify-between items-center mb-2">
                  <strong>Experience #{idx + 1}</strong>
                  <button onClick={() => removeEntry("experience", idx)} className="text-red-600 text-sm">
                    Remove
                  </button>
                </div>
                <input
                  placeholder="Company"
                  className="border p-2 w-full mb-2 rounded"
                  value={exp.company || ""}
                  onChange={(e) => handleChange(e.target.value, "experience", idx, "company")}
                />
                <input
                  placeholder="Role"
                  className="border p-2 w-full mb-2 rounded"
                  value={exp.role || ""}
                  onChange={(e) => handleChange(e.target.value, "experience", idx, "role")}
                />
                <input
                  placeholder="Duration"
                  className="border p-2 w-full rounded"
                  value={exp.duration || ""}
                  onChange={(e) => handleChange(e.target.value, "experience", idx, "duration")}
                />
              </div>
            ))}
            <button onClick={() => addEntry("experience", emptyExperience())} className="mt-2 px-3 py-1 bg-gray-200 rounded">
              + Add Experience
            </button>
          </div>
        )}

        {activeTab === "Skills" && (
          <div className="space-y-3">
            {(formData.skills || []).map((skill, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  placeholder="Skill"
                  className="border p-2 rounded flex-1"
                  value={skill || ""}
                  onChange={(e) => updateSkill(idx, e.target.value)}
                />
                <button className="text-red-600" onClick={() => removeSkill(idx)}>
                  Remove
                </button>
              </div>
            ))}
            <button onClick={addSkill} className="mt-2 px-3 py-1 bg-gray-200 rounded">
              + Add Skill
            </button>
          </div>
        )}

        {activeTab === "Projects" && (
          <div className="space-y-3">
            {(formData.projects || []).map((proj, idx) => (
              <div key={idx} className="border rounded p-3">
                <div className="flex justify-between items-center mb-2">
                  <strong>Project #{idx + 1}</strong>
                  <button onClick={() => removeEntry("projects", idx)} className="text-red-600 text-sm">
                    Remove
                  </button>
                </div>
                <input
                  placeholder="Project Title"
                  className="border p-2 w-full mb-2 rounded"
                  value={proj.title || ""}
                  onChange={(e) => handleChange(e.target.value, "projects", idx, "title")}
                />
                <textarea
                  placeholder="Description"
                  className="border p-2 w-full rounded"
                  value={proj.description || ""}
                  onChange={(e) => handleChange(e.target.value, "projects", idx, "description")}
                />
              </div>
            ))}
            <button onClick={() => addEntry("projects", emptyProject())} className="mt-2 px-3 py-1 bg-gray-200 rounded">
              + Add Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeForm;
 */}



 {/*
        RESUMEPREVIEW.JSX code
    
    
    
    import React from "react";
import { useNavigate } from "react-router-dom";

const ResumePreview = ({ resumeData, downloadPDF }) => {
  const navigate = useNavigate();
  if (!resumeData) return null;

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-3xl font-bold">
            {resumeData.personal.firstName} {resumeData.personal.lastName}
          </h1>
          <div className="text-sm text-gray-600">
            {resumeData.personal.email} · {resumeData.personal.phone}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {resumeData.personal.city}, {resumeData.personal.state} {resumeData.personal.zip} · {resumeData.personal.country}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {resumeData.personal.linkedin ? <a className="underline" href={resumeData.personal.linkedin}>LinkedIn</a> : null}
            {resumeData.personal.github ? <> · <a className="underline" href={resumeData.personal.github}>GitHub</a></> : null}
            {resumeData.personal.portfolio ? <> · <a className="underline" href={resumeData.personal.portfolio}>Portfolio</a></> : null}
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={() => navigate("/form")} className="px-3 py-1 bg-yellow-500 text-white rounded">Edit</button>
          <button onClick={downloadPDF} className="px-3 py-1 bg-green-600 text-white rounded">Download PDF</button>
        </div>
      </div>

      <div id="resume-preview" className="bg-white p-6 rounded shadow">
        
        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Education</h2>
          {resumeData.education && resumeData.education.length > 0 ? (
            <ul className="list-disc pl-5">
              {resumeData.education.map((edu, i) => (
                <li key={i}>
                  <strong>{edu.degree}</strong> — {edu.school} ({edu.year})
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500">No education added</div>
          )}
        </section>

        
        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Experience</h2>
          {resumeData.experience && resumeData.experience.length > 0 ? (
            <ul className="list-disc pl-5">
              {resumeData.experience.map((exp, i) => (
                <li key={i}>
                  <strong>{exp.role}</strong> at {exp.company} {exp.duration ? `(${exp.duration})` : ""}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500">No experience added</div>
          )}
        </section>

        
        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Skills</h2>
          {resumeData.skills && resumeData.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((s, i) => (
                <span key={i} className="bg-gray-100 px-2 py-1 rounded text-sm">{s}</span>
              ))}
            </div>
          ) : (
            <div className="text-gray-500">No skills added</div>
          )}
        </section>

        
        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Projects</h2>
          {resumeData.projects && resumeData.projects.length > 0 ? (
            <ul className="list-disc pl-5">
              {resumeData.projects.map((p, i) => (
                <li key={i}>
                  <strong>{p.title}</strong>: {p.description}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500">No projects added</div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ResumePreview;
    */}