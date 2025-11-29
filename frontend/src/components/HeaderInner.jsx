// src/components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/theme.css";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function go(path) {
    // if require login -> redirect to login when no token
    if ((path === "/create-capsule" || path === "/journal") && !token) {
      navigate("/login");
    } else {
      navigate(path);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    // reload or navigate to home
    navigate("/");
  }

  return (
    <header className="tc-header-fixed">
      <div className="tc-header-inner">
        <div className="tc-logo" onClick={() => navigate("/")}>TimeCapsule</div>

        <nav className="tc-header-nav">
          <button className="tc-btn tc-btn-primary" onClick={() => go("/create-capsule")}>
            Create Capsule
          </button>

          <button className="tc-btn tc-btn-pink" onClick={() => go("/journal")}>
            Journal
          </button>

          {/* If logged in show logout, else don't show login/signup as per request */}
          {token ? (
            <button className="tc-btn tc-btn-ghost" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="tc-btn tc-btn-ghost" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
