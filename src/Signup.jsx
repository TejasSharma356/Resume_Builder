import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Signup = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [theme, setTheme] = useState("dark");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      onLogin(userCredential.user);
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      onLogin(result.user);
    } catch (error) {
      alert("Google sign-in failed: " + error.message);
    }
  };

  return (
    <div className="login-bg">
      <form className="login-container" onSubmit={handleSubmit}>
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="login-title">SkillSculpt</span>
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </div>

        <div className="login-subtitle">Create your account</div>
        <div className="login-footer" style={{ marginBottom: "1.2rem" }}>
          Already have an account? <span className="login-link" onClick={() => navigate("/login")}>Sign in</span>
        </div>

        <label className="login-form-label">Email</label>
        <input
          type="email"
          className="login-input"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="login-form-label">Password</label>
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="login-form-label">Confirm Password</label>
        <input
          type="password"
          className="login-input"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="login-btn" type="submit">
          Create Account
        </button>

        <div className="login-footer" style={{ marginTop: "0", marginBottom: "0.2rem" }}>
          or continue with
        </div>
        <div className="login-provider-row">
          <button
            type="button"
            className="login-provider-btn"
            style={{ background: "#357cf2", color: "#fff" }}
            onClick={handleGoogleSignIn}
          >
            <span className="login-provider-icon">G</span> Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;