import React from "react";

export default function Footer() {
  return (
    <footer style={{
      marginTop: "3rem",
      padding: "1.5rem",
      textAlign: "center",
      background: "#fafafa",
      borderTop: "1px solid #eee",
      color: "#666"
    }}>
      <p>© {new Date().getFullYear()} TimeCapsule. All rights reserved.</p>
    </footer>
  );
}
