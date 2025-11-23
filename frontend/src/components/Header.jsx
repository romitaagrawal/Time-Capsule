import React from "react";
import { Link, useNavigate } from "react-router-dom";
import scrollToSection from "../utils/scrollToSection";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/");
  };

  // Conditional navigation based on authentication
  const handleJournalClick = () => {
    if (token) {
      navigate("/journal");
    } else {
      navigate("/login");
    }
  };

  const handleCapsuleClick = () => {
    if (token) {
      navigate("/create-capsule");
    } else {
      navigate("/login");
    }
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        background: "#fafafa",
        borderBottom: "1px solid #eee",
      }}
    >
      <div>
        <Link to="/" style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
          TimeCapsule
        </Link>
      </div>

      <nav style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        {/* Scroll buttons */}
        <button onClick={() => scrollToSection("about")} className="nav-btn">
          About
        </button>
        <button onClick={() => scrollToSection("what")} className="nav-btn">
          Time Capsule?
        </button>
        <button onClick={handleJournalClick} className="nav-btn">
          Journal
        </button>

        {/* Auth buttons */}
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <span>Hello, {name}</span>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
}
