// ResumePreview.jsx
import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './ResumePreview.css';

const ResumePreview = ({ resumes, currentIndex }) => {
  const resume = resumes && resumes[currentIndex] ? resumes[currentIndex] : {};
  const basics = resume.basics || {};
  const profiles = basics.profiles || {};
  const work = resume.work || [];
  const education = resume.education || [];
  const skills = resume.skills || [];
  const projects = resume.projects || [];
  
  const pdfRef = useRef();

  // Get initials for profile circle
  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    return names.length >= 2 
      ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      : name[0].toUpperCase();
  };

  // Download PDF function
// Download PDF function — exact A4 export
const downloadPDF = () => {
  const input = pdfRef.current;

  // A4 dimensions in mm and px (at 96 DPI baseline used by html2canvas)
  const A4_WIDTH_MM = 210;
  const A4_HEIGHT_MM = 297;

  // html2canvas scale for sharper output (2–3 is typical)
  const SCALE = 2;

  // Force white background and raise scale for crisp text
  html2canvas(input, {
    scale: SCALE,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    windowWidth: input.scrollWidth,   // capture full width of the preview
    windowHeight: input.scrollHeight, // capture full height of the preview
  })
    .then((canvas) => {
      // Create an A4 portrait PDF and fit the canvas proportionally
      const pdf = new jsPDF('portrait', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();   // 210
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 297

      // Canvas pixel size
      const imgWidthPx = canvas.width;
      const imgHeightPx = canvas.height;

      // Convert pixels to mm for jsPDF using 96 DPI reference:
      // 1 px = 25.4 mm / 96
      const PX_TO_MM = 25.4 / 96;
      const imgWidthMM = imgWidthPx * PX_TO_MM / SCALE;
      const imgHeightMM = imgHeightPx * PX_TO_MM / SCALE;

      // Scale to fit A4 while preserving aspect ratio
      const ratio = Math.min(pdfWidth / imgWidthMM, pdfHeight / imgHeightMM);
      const renderWidth = imgWidthMM * ratio;
      const renderHeight = imgHeightMM * ratio;

      // Center the image on the page
      const x = (pdfWidth - renderWidth) / 2;
      const y = (pdfHeight - renderHeight) / 2;

      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', x, y, renderWidth, renderHeight, undefined, 'FAST');

      const fileName = `${basics.name || 'Resume'}_${new Date().getFullYear()}.pdf`;
      pdf.save(fileName);
    })
    .catch((error) => {
      console.error('Error generating PDF:', error);
    });
};


  return (
    <div className="resume-preview-container">
      <div className="resume-content-wrapper">
        <div className="resume-content" ref={pdfRef}>
          {/* Header Section - Full Width */}
          <div className="resume-header">
            <div className="profile-circle">
              <span className="profile-initials">
                {getInitials(basics.name)}
              </span>
            </div>
            <div className="header-info">
              <h1 className="resume-name">{basics.name || 'Your Name'}</h1>
              <h2 className="resume-title">{basics.label || 'Your Professional Title'}</h2>
              
              <div className="contact-info">
                {basics.location && (
                  <div className="contact-item">
                    📍 {basics.location}
                  </div>
                )}
                {basics.phone && (
                  <div className="contact-item">
                    📞 {basics.phone}
                  </div>
                )}
                {basics.email && (
                  <div className="contact-item">
                    📧 {basics.email}
                  </div>
                )}
                {basics.website && (
                  <div className="contact-item">
                    🌐 <a href={basics.website} target="_blank" rel="noopener noreferrer">
                      {basics.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Area - Horizontal Layout */}
          <div className="main-content">
            {/* Left Column */}
            <div className="left-column">
              {/* Skills Section */}
              {skills.length > 0 && (
                <div className="resume-section">
                  <h3 className="section-title">Skills</h3>
                  <div className="skills-container">
                    {skills.map((skill, index) => (
                      <div key={index} className="skill-category">
                        <div className="skill-name">{skill.name}</div>
                        <div className="skill-items">
                          {skill.keywords && skill.keywords.map((keyword, idx) => (
                            <span key={idx} className="skill-badge">{keyword}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience Section */}
              {work.length > 0 && (
                <div className="resume-section">
                  <h3 className="section-title">Experience</h3>
                  {work.map((job, index) => (
                    <div key={index} className="experience-item">
                      <div className="experience-header">
                        <div className="job-title">{job.position || 'Position'}</div>
                        <div className="job-duration">
                          {job.startDate && job.endDate 
                            ? `${job.startDate} - ${job.endDate}` 
                            : job.startDate || 'Present'}
                        </div>
                      </div>
                      <div className="company-name">{job.company || 'Company'}</div>
                      {job.website && (
                        <div className="company-website">
                          🔗 <a href={job.website} target="_blank" rel="noopener noreferrer">
                            {job.website}
                          </a>
                        </div>
                      )}
                      {job.summary && <div className="job-description">{job.summary}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="right-column">
              {/* Profiles Section */}
<div className="resume-section">
  <h3 className="section-title">Profiles</h3>
  <div className="profiles-container">
    {profiles.linkedin && (
      <div className="profile-item">
        💼
        <a
          href={
            /^https?:\/\//i.test(profiles.linkedin)
              ? profiles.linkedin
              : `https://${profiles.linkedin}`
          }
          target="_blank"
          rel="noopener noreferrer"
          title="Open LinkedIn profile"
        >
          LinkedIn
        </a>
      </div>
    )}

    {profiles.github && (
      <div className="profile-item">
        👨‍💻
        <a
          href={
            /^https?:\/\//i.test(profiles.github)
              ? profiles.github
              : `https://${profiles.github}`
          }
          target="_blank"
          rel="noopener noreferrer"
          title="Open GitHub profile"
        >
          GitHub
        </a>
      </div>
    )}

    {profiles.portfolio && (
      <div className="profile-item">
        🔗
        <a
          href={
            /^https?:\/\//i.test(profiles.portfolio)
              ? profiles.portfolio
              : `https://${profiles.portfolio}`
          }
          target="_blank"
          rel="noopener noreferrer"
          title="Open Portfolio"
        >
          Portfolio
        </a>
      </div>
    )}

    {!profiles.linkedin && !profiles.github && !profiles.portfolio && (
      <div className="profile-item">🔗 Add your social profiles</div>
    )}
  </div>
</div>


              {/* Education Section */}
              {education.length > 0 && (
                <div className="resume-section">
                  <h3 className="section-title">Education</h3>
                  {education.map((edu, index) => (
                    <div key={index} className="education-item">
                      <div className="education-header">
                        <div className="degree">
                          {edu.studyType || 'Degree'} 
                          {edu.area && ` in ${edu.area}`}
                        </div>
                        <div className="edu-duration">
                          {edu.startDate && edu.endDate 
                            ? `${edu.startDate} - ${edu.endDate}` 
                            : edu.startDate || 'Year'}
                        </div>
                      </div>
                      <div className="institution">{edu.institution || 'Institution'}</div>
                      {edu.website && (
                        <div className="education-website">
                          🔗 <a href={edu.website} target="_blank" rel="noopener noreferrer">
                            {edu.website}
                          </a>
                        </div>
                      )}
                      {edu.gpa && (
                        <div className="education-gpa">
                          <strong>GPA:</strong> {edu.gpa}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Projects Section */}
              {projects.length > 0 && (
                <div className="resume-section">
                  <h3 className="section-title">Projects</h3>
                  {projects.map((project, index) => (
                    <div key={index} className="project-item">
                      <div className="project-header">
                        <div className="project-name">{project.name || 'Project Name'}</div>
                        <div className="project-type">Personal Project</div>
                      </div>
                      {project.url && (
                        <div className="project-website">
                          🔗 <a href={project.url} target="_blank" rel="noopener noreferrer">
                            {project.url}
                          </a>
                        </div>
                      )}
                      {project.description && <div className="project-description">{project.description}</div>}
                    </div>
                  ))}
                </div>
              )}

              {/* Summary Section */}
              {basics.summary && (
                <div className="resume-section">
                  <h3 className="section-title">Summary</h3>
                  <div className="summary-content">
                    {basics.summary}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Download PDF Button - Positioned at the bottom */}
        <div className="pdf-download-section">
          <button 
            className="download-pdf-btn"
            onClick={downloadPDF}
            title="Download Resume as PDF"
          >
            📄 Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;