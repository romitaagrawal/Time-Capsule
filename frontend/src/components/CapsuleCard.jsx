import React from "react";
import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";

export default function CapsuleCard({ capsule }) {

  const locked = new Date() < new Date(capsule.open_date);

  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "6px",
      padding: "1rem",
      margin: "1rem",
      width: "280px",
      background: "#fff"
    }}>
      <h3>{capsule.title}</h3>

      <p><strong>Status:</strong> {locked ? "Locked 🔒" : "Unlocked 🔓"}</p>

      <p><strong>Opens:</strong> {formatDate(capsule.open_date)}</p>

      <Link to={`/capsule/${capsule._id}`}>
        <button style={{ marginTop: "1rem" }}>
          View Capsule
        </button>
      </Link>
    </div>
  );
}
