// login.jsx
import React, { useState, useEffect } from "react";
import "./login.css"; // Import your CSS file

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");      // form state
  const [password, setPassword] = useState(""); // form state
  const [theme, setTheme] = useState("dark");   // 'dark' or 'light'

  // Apply theme by updating data-theme attribute on <body>.
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  // Handle login logic (demo / adjust as needed)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email);
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div className="login-bg">
      <form className="login-container" onSubmit={handleSubmit}>
        {/* Header: Brand and theme toggle */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span className="login-title">SkillSculpt</span>
          {/* Toggle between light and dark mode */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Switch theme"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </div>

        {/* Subtitle and register link */}
        <div className="login-subtitle">Sign in to your account</div>
        <div className="login-footer" style={{ marginBottom: "1.2rem" }}>
          Don't have an account? <span className="login-link">Create one now</span>
        </div>

        {/* Email input */}
        <label className="login-form-label">Email</label>
        <input
          type="email"
          className="login-input"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password input */}
        <label className="login-form-label">Password</label>
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login button */}
        <button className="login-btn" type="submit">
          Sign in
        </button>

        <div className="login-footer" style={{ marginTop: "0", marginBottom: "0.2rem" }}>
          or continue with
        </div>
        {/* Social login */}
        <div className="login-provider-row">
          <button type="button" className="login-provider-btn">
            <span className="login-provider-icon">🐙</span> GitHub
          </button>
          <button
            type="button"
            className="login-provider-btn"
            style={{ background: "#357cf2", color: "#fff" }}
          >
            <span className="login-provider-icon">G</span> Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
