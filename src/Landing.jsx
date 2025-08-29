// Landing.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

// Component for the landing page with light/dark theme toggle
const Landing = () => {
  // Theme state, default is 'dark'
  const [theme, setTheme] = useState("dark");

  const navigate = useNavigate();

  // Handle navigation to login page
  const handleGetStarted = () => {
    navigate("/login");
  };

  // Set the theme on the <body>
  React.useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="landing-bg">
      {/* Site name/logo at top left */}
      <div className="site-name">
        SkillSculpt
      </div>
      {/* Main content container, flex row */}
      <div className="landing-main">
        {/* Left side: Text and action buttons */}
        <div className="landing-left">
          <h1 className="landing-title">A free and open-source resume builder</h1>
          <div className="landing-desc">
            A free and open-source resume builder that simplifies the process of creating, updating, and sharing your resume.
          </div>
          <div className="landing-action-row">
            <button className="landing-btn" onClick={handleGetStarted}>
              Get Started
            </button>
            <button className="landing-secondary-btn">
              Learn more
            </button>
          </div>
        </div>
        {/* Right side: Big resume preview image */}
        <div className="landing-right">
          <div className="landing-img-box">
            <img
              src="https://www.mycvstore.com/wp-content/uploads/2019/04/Resume-Template.jpg"
              alt="Resume Preview"
              className="landing-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
