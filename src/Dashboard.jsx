// Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Dashboard.css";

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

function Dashboard({ resumes, setResumes, currentIndex, setCurrentIndex, addResume, user }) {
  const navigate = useNavigate();

  const handleCreate = () => {
    const name = prompt("Enter a name for this resume:");
    if (!name || !name.trim()) {
      alert("Resume name required.");
      return;
    }
    const newIndex = addResume(name.trim());
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
    const resumeName = resumes[index]?.name || `Resume ${index + 1}`;
    if (!window.confirm(`Delete "${resumeName}"?`)) return;

    setResumes((prev) => {
      const updated = prev.filter((_, i) => i !== index);
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
    <div>
      <Navbar user={user} />
      <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Resumes</h1>
      </div>

      <div className="resume-grid">
        {/* Create New Resume Card */}
        <div className="resume-card create-card" onClick={handleCreate}>
          <div className="create-card-content">
            <div className="plus-icon">+</div>
            <h3 className="create-title">Create a new resume</h3>
            <p className="create-subtitle">Start building from scratch</p>
          </div>
        </div>

        {/* Resume Cards */}
        {resumes.map((resume, idx) => (
          <div key={idx} className="resume-card resume-item">
            <div className="resume-preview">
              <div className="preview-placeholder">📄</div>
            </div>

            <div className="resume-info">
              <h3 className="resume-name" title={resume.name || `Resume ${idx + 1}`}>
                {resume.name || `Resume ${idx + 1}`}
              </h3>
              <p className="resume-date">Last edited: {formatDate(resume.updatedAt)}</p>
            </div>

            <div className="resume-actions">
              <button
                className="action-btn edit-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(idx);
                }}
              >
                Edit
              </button>
              <button
                className="action-btn preview-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePreview(idx);
                }}
              >
                Preview
              </button>
              <button
                className="action-btn delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(idx);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
