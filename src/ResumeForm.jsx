// ResumeForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResumePreview from "./ResumePreview";
import "./ResumeForm.css";

const ResumeForm = ({ resumes, currentIndex, setResumes }) => {
  const navigate = useNavigate();
  const currentResume = resumes[currentIndex] || {};
  const [formData, setFormData] = useState(currentResume);

  console.log("ResumeForm render - currentIndex:", currentIndex, "currentResume:", currentResume);

  useEffect(() => {
    if (resumes[currentIndex]) {
      setFormData(resumes[currentIndex]);
    }
  }, [currentIndex, resumes]);

  // Get resume name dynamically
  const getResumeName = () => {
    if (currentIndex !== null && resumes[currentIndex]) {
      return resumes[currentIndex].name || `Resume ${currentIndex + 1}`;
    }
    return "New Resume";
  };

  // Update resume data
  const handleUpdate = (updatedData) => {
    const updated = { ...updatedData, updatedAt: new Date().toISOString() };
    setFormData(updated);
    
    // Update in parent state
    setResumes(prev => {
      const newResumes = [...prev];
      newResumes[currentIndex] = updated;
      return newResumes;
    });
  };

  // Handle basic info changes
  const handleBasicChange = (field, value) => {
    const updatedData = {
      ...formData,
      basics: {
        ...formData.basics,
        [field]: value
      }
    };
    handleUpdate(updatedData);
  };

  // Handle social profiles changes
  const handleProfileChange = (platform, value) => {
    const updatedData = {
      ...formData,
      basics: {
        ...formData.basics,
        profiles: {
          ...formData.basics?.profiles,
          [platform]: value
        }
      }
    };
    handleUpdate(updatedData);
  };

  // Handle array changes
  const handleArrayChange = (section, index, field, value) => {
    const currentSection = formData[section] || [];
    const updatedSection = [...currentSection];
    
    if (!updatedSection[index]) updatedSection[index] = {};
    updatedSection[index][field] = value;
    
    const updatedData = {
      ...formData,
      [section]: updatedSection
    };
    handleUpdate(updatedData);
  };

  // Add new item to array section
  const addArrayItem = (section, emptyItem = {}) => {
    const currentSection = formData[section] || [];
    const updatedData = {
      ...formData,
      [section]: [...currentSection, emptyItem]
    };
    handleUpdate(updatedData);
  };

  // Remove item from array section
  const removeArrayItem = (section, index) => {
    const currentSection = formData[section] || [];
    const updatedData = {
      ...formData,
      [section]: currentSection.filter((_, i) => i !== index)
    };
    handleUpdate(updatedData);
  };

  const handleSave = () => {
    navigate("/dashboard");
  };

  const handlePreview = () => {
    navigate("/preview");
  };

  if (currentIndex === null || !resumes[currentIndex]) {
    return (
      <div style={{ padding: '2rem', color: 'red', background: '#f30c0cff', minHeight: '100vh' }}>
        <h1>No resume selected</h1>
        <p>Please go back to the dashboard and select a resume to edit.</p>
        <button onClick={() => navigate('/dashboard')} style={{ padding: '0.5rem 1rem', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '6px' }}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const basics = formData.basics || {};
  const profiles = basics.profiles || {};
  const workExperience = formData.work || [];
  const education = formData.education || [];
  const skills = formData.skills || [];
  const projects = formData.projects || [];

  return (
    <div className="resume-form-container">
      {/* Left Panel - Form (Now Larger) */}
      <div className="form-panel">
        <div className="form-header">
          <div className="header-left">
            {/* CHANGED: Show resume name instead of "Basics" */}
            <h1>{getResumeName()}</h1>
          </div>
          <div className="header-actions">
            <button className="action-btn save-btn" onClick={handleSave}>
              Save & Dashboard
            </button>
            <button className="action-btn preview-btn" onClick={handlePreview}>
              Save & Preview
            </button>
          </div>
        </div>

        <div className="form-content">
          {/* Basics Section */}
          <section className="form-section">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={basics.name || ''}
                onChange={(e) => handleBasicChange('name', e.target.value)}
                className="form-input-small"
              />
            </div>
            
            <div className="form-group">
              <label>Headline</label>
              <input
                type="text"
                placeholder="Software Engineer"
                value={basics.label || ''}
                onChange={(e) => handleBasicChange('label', e.target.value)}
                className="form-input-small"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={basics.email || ''}
                  onChange={(e) => handleBasicChange('email', e.target.value)}
                  className="form-input-small"
                />
              </div>
              <div className="form-group">
                <label>Website</label>
                <input
                  type="url"
                  placeholder="https://johndoe.com"
                  value={basics.website || ''}
                  onChange={(e) => handleBasicChange('website', e.target.value)}
                  className="form-input-small"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={basics.phone || ''}
                  onChange={(e) => handleBasicChange('phone', e.target.value)}
                  className="form-input-small"
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  placeholder="New York, NY"
                  value={basics.location || ''}
                  onChange={(e) => handleBasicChange('location', e.target.value)}
                  className="form-input-small"
                />
              </div>
            </div>

            {/* Social Profiles Section */}
            <div className="form-group">
              <label>LinkedIn Profile</label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/johndoe"
                value={profiles.linkedin || ''}
                onChange={(e) => handleProfileChange('linkedin', e.target.value)}
                className="form-input-small"
              />
            </div>

            <div className="form-group">
              <label>GitHub Profile</label>
              <input
                type="url"
                placeholder="https://github.com/johndoe"
                value={profiles.github || ''}
                onChange={(e) => handleProfileChange('github', e.target.value)}
                className="form-input-small"
              />
            </div>

            <div className="form-group">
              <label>Portfolio Website</label>
              <input
                type="url"
                placeholder="https://portfolio.com"
                value={profiles.portfolio || ''}
                onChange={(e) => handleProfileChange('portfolio', e.target.value)}
                className="form-input-small"
              />
            </div>
            
            <button className="add-field-btn">+ Add a custom field</button>
          </section>

          {/* Summary Section */}
          <section className="form-section">
            <div className="section-header">
              <h2>📄 Summary</h2>
            </div>
            
            <div className="editor-toolbar">
              <button className="toolbar-btn"><strong>B</strong></button>
              <button className="toolbar-btn"><em>I</em></button>
              <button className="toolbar-btn"><u>U</u></button>
              <button className="toolbar-btn">🔗</button>
              <button className="toolbar-btn">≡</button>
              <button className="toolbar-btn">• </button>
            </div>
            
            <div className="form-group">
              <textarea
                className="summary-textarea form-textarea-small"
                placeholder="Write your professional summary here..."
                value={basics.summary || ''}
                onChange={(e) => handleBasicChange('summary', e.target.value)}
                rows={6}
              />
            </div>
          </section>

          {/* Work Experience Section */}
          <section className="form-section">
            <div className="section-header">
              <h2>💼 Work Experience</h2>
              <button 
                className="add-btn"
                onClick={() => addArrayItem('work', {
                  company: '',
                  position: '',
                  website: '',
                  startDate: '',
                  endDate: '',
                  summary: ''
                })}
              >
                + Add
              </button>
            </div>
            
            {workExperience.map((work, index) => (
              <div key={index} className="array-item">
                <div className="item-header">
                  <h4>Experience #{index + 1}</h4>
                  <button 
                    className="remove-btn"
                    onClick={() => removeArrayItem('work', index)}
                  >
                    Remove
                  </button>
                </div>
                
                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={work.company || ''}
                    onChange={(e) => handleArrayChange('work', index, 'company', e.target.value)}
                    className="form-input-small"
                  />
                </div>
                
                <div className="form-group">
                  <label>Position</label>
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={work.position || ''}
                    onChange={(e) => handleArrayChange('work', index, 'position', e.target.value)}
                    className="form-input-small"
                  />
                </div>

                <div className="form-group">
                  <label>Company Website</label>
                  <input
                    type="url"
                    placeholder="https://company.com"
                    value={work.website || ''}
                    onChange={(e) => handleArrayChange('work', index, 'website', e.target.value)}
                    className="form-input-small"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={work.startDate || ''}
                      onChange={(e) => handleArrayChange('work', index, 'startDate', e.target.value)}
                      className="form-input-small"
                    />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      value={work.endDate || ''}
                      onChange={(e) => handleArrayChange('work', index, 'endDate', e.target.value)}
                      className="form-input-small"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    placeholder="Describe your responsibilities and achievements..."
                    value={work.summary || ''}
                    onChange={(e) => handleArrayChange('work', index, 'summary', e.target.value)}
                    rows={3}
                    className="form-textarea-small"
                  />
                </div>
              </div>
            ))}
          </section>

          {/* Education Section */}
          <section className="form-section">
            <div className="section-header">
              <h2>🎓 Education</h2>
              <button 
                className="add-btn"
                onClick={() => addArrayItem('education', {
                  institution: '',
                  studyType: '',
                  area: '',
                  website: '',
                  startDate: '',
                  endDate: '',
                  gpa: ''
                })}
              >
                + Add
              </button>
            </div>
            
            {education.map((edu, index) => (
              <div key={index} className="array-item">
                <div className="item-header">
                  <h4>Education #{index + 1}</h4>
                  <button 
                    className="remove-btn"
                    onClick={() => removeArrayItem('education', index)}
                  >
                    Remove
                  </button>
                </div>
                
                <div className="form-group">
                  <label>Institution</label>
                  <input
                    type="text"
                    placeholder="University Name"
                    value={edu.institution || ''}
                    onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                    className="form-input-small"
                  />
                </div>

                <div className="form-group">
                  <label>Institution Website</label>
                  <input
                    type="url"
                    placeholder="https://university.edu"
                    value={edu.website || ''}
                    onChange={(e) => handleArrayChange('education', index, 'website', e.target.value)}
                    className="form-input-small"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Degree</label>
                    <input
                      type="text"
                      placeholder="Bachelor's Degree"
                      value={edu.studyType || ''}
                      onChange={(e) => handleArrayChange('education', index, 'studyType', e.target.value)}
                      className="form-input-small"
                    />
                  </div>
                  <div className="form-group">
                    <label>Field of Study</label>
                    <input
                      type="text"
                      placeholder="Computer Science"
                      value={edu.area || ''}
                      onChange={(e) => handleArrayChange('education', index, 'area', e.target.value)}
                      className="form-input-small"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={edu.startDate || ''}
                      onChange={(e) => handleArrayChange('education', index, 'startDate', e.target.value)}
                      className="form-input-small"
                    />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      value={edu.endDate || ''}
                      onChange={(e) => handleArrayChange('education', index, 'endDate', e.target.value)}
                      className="form-input-small"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>GPA (Optional)</label>
                  <input
                    type="text"
                    placeholder="3.8/4.0"
                    value={edu.gpa || ''}
                    onChange={(e) => handleArrayChange('education', index, 'gpa', e.target.value)}
                    className="form-input-small"
                  />
                </div>
              </div>
            ))}
          </section>

          {/* Skills Section */}
          <section className="form-section">
            <div className="section-header">
              <h2>⚡ Skills</h2>
              <button 
                className="add-btn"
                onClick={() => addArrayItem('skills', {
                  name: '',
                  keywords: []
                })}
              >
                + Add
              </button>
            </div>
            
            {skills.map((skill, index) => (
              <div key={index} className="array-item">
                <div className="item-header">
                  <h4>Skill #{index + 1}</h4>
                  <button 
                    className="remove-btn"
                    onClick={() => removeArrayItem('skills', index)}
                  >
                    Remove
                  </button>
                </div>
                
                <div className="form-group">
                  <label>Skill Category</label>
                  <input
                    type="text"
                    placeholder="Programming Languages"
                    value={skill.name || ''}
                    onChange={(e) => handleArrayChange('skills', index, 'name', e.target.value)}
                    className="form-input-small"
                  />
                </div>
                
                <div className="form-group">
                  <label>Skills (comma separated)</label>
                  <input
                    type="text"
                    placeholder="JavaScript, Python, React"
                    value={skill.keywords ? skill.keywords.join(', ') : ''}
                    onChange={(e) => handleArrayChange('skills', index, 'keywords', e.target.value.split(', '))}
                    className="form-input-small"
                  />
                </div>
              </div>
            ))}
          </section>

          {/* Projects Section */}
          <section className="form-section">
            <div className="section-header">
              <h2>🔗 Projects</h2>
              <button 
                className="add-btn"
                onClick={() => addArrayItem('projects', {
                  name: '',
                  description: '',
                  url: ''
                })}
              >
                + Add
              </button>
            </div>
            
            {projects.map((project, index) => (
              <div key={index} className="array-item">
                <div className="item-header">
                  <h4>Project #{index + 1}</h4>
                  <button 
                    className="remove-btn"
                    onClick={() => removeArrayItem('projects', index)}
                  >
                    Remove
                  </button>
                </div>
                
                <div className="form-group">
                  <label>Project Name</label>
                  <input
                    type="text"
                    placeholder="Project Name"
                    value={project.name || ''}
                    onChange={(e) => handleArrayChange('projects', index, 'name', e.target.value)}
                    className="form-input-small"
                  />
                </div>
                
                <div className="form-group">
                  <label>Project URL</label>
                  <input
                    type="url"
                    placeholder="https://project-url.com"
                    value={project.url || ''}
                    onChange={(e) => handleArrayChange('projects', index, 'url', e.target.value)}
                    className="form-input-small"
                  />
                </div>
                
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    placeholder="Describe the project..."
                    value={project.description || ''}
                    onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
                    rows={3}
                    className="form-textarea-small"
                  />
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>

   {/* Right Panel - Live Preview (Now Much Larger) */}
<div className="preview-panel">
  <div className="preview-header">
    <h3>Live Preview</h3>
  </div>
  <div className="preview-content" id="resume-preview">
    <div
      className="transform-component-module_wrapper__SPB86 !w-screen !h-screen"
      style={{
        position: 'relative',
        width: '100vw',
        height: '400vh',
        overflow: 'hidden',
        userSelect: 'none',
        margin: 0,
        padding: 0,
        transform: 'translate3d(0, 0, 0)',
      }}
    >
      <div
        className="transform-component-module_content__FBWxo grid items-start justify-center space-x-12 pointer-events-none"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '3rem',
          width: '835.8px',
          transform: 'translate(8.28px, 31.5px) scale(0.8)',
          margin: 0,
          padding: 0,
          transformOrigin: 'top left',
          pointerEvents: 'auto',
        }}
      >
        <ResumePreview resumes={[formData]} currentIndex={0} />
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default ResumeForm;