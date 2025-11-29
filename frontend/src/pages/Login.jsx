import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await login(email, password);

      localStorage.setItem("token", res.token);
      localStorage.setItem("name", res.name);

      navigate("/");
    } catch (err) {
      if (err.response?.data?.detail) {
        const d = err.response.data.detail;
        setError(typeof d === "string" ? d : d[0]?.msg || "Login failed");
      } else setError("Login failed");
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

      {/* LOGIN BOX */}
      <div className="auth-box">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
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

          <button type="submit">Login</button>
        </form>

        {error && <p className="auth-error">{error}</p>}

        <p className="auth-switch">
          New here?{" "}
          <span onClick={() => navigate("/signup")}>Create an account</span>
        </p>
      </div>

      {/* FOOTER */}
      <footer className="auth-footer">
        © {new Date().getFullYear()} TimeCapsule — Made with care.
      </footer>

    </div>
  );
}
