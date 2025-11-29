import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/authApi";
import "../styles/login.css";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await signup(name, email, password);

      localStorage.setItem("token", res.token);
      localStorage.setItem("name", name);

      navigate("/create-capsule");
    } catch (err) {
      setError(err?.response?.data?.detail || "Signup failed");
    }
  }

  return (
    <div className="auth-page">

      {/* HEADER */}
      <header className="auth-header">
        <div className="auth-logo" onClick={() => navigate("/")}>
          TimeCapsule
        </div>
      </header>

      {/* SIGNUP BOX */}
      <div className="auth-box">
        <h2>Create Account</h2>

        <form onSubmit={submit}>
          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Sign Up</button>
        </form>

        {error && <p className="auth-error">{error}</p>}

        <p className="auth-switch">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Log in</span>
        </p>
      </div>

      <footer className="auth-footer">
        © {new Date().getFullYear()} TimeCapsule — Made with care.
      </footer>

    </div>
  );
}
