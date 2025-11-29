import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "50px",
        padding: "20px",
        textAlign: "center",
        color: "#777",
      }}
    >
      © {new Date().getFullYear()} TimeCapsule — Made with care.
    </footer>
  );
}
