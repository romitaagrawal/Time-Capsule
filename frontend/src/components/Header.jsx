import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/header.css";   // ← NEW FILE

export default function Header() {
  const navigate = useNavigate();

  const handleNav = (path) => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <header className="tc-header">
      <div className="tc-header-inner">

        {/* LEFT: LOGO */}
        <div
          className="tc-logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          TimeCapsule
        </div>

        {/* RIGHT: BUTTONS */}
        <div className="tc-nav-right">
          <button className="tc-btn create" onClick={() => handleNav("/create-capsule")}>
            Create Capsule
          </button>

          <button className="tc-btn journal" onClick={() => handleNav("/journal")}>
            Journal
          </button>

          <span className="greet">
            Hello, {localStorage.getItem("name") || "User"}
          </span>

          {/* <button className="tc-btn logout" onClick={handleLogout}>
            Logout
          </button> */}
          <button
            className="tc-btn logout"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("name");
              window.location.href = "/"; // reload to homepage
            }}
          >
            Logout
          </button>
        </div>

      </div>
    </header>
  );
}
