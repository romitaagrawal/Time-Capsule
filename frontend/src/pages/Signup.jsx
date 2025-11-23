import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/authApi";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(name, email, password);
      localStorage.setItem("token", res.token);
      localStorage.setItem("name", name);
      navigate("/create-capsule");
    } catch (err) {
      setError(err?.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Signup</h2>
      <form onSubmit={submit}>
        <div><input required placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /></div>
        <div><input required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
        <div><input required placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
        <button type="submit">Signup</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
