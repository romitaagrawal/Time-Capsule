import React from "react";
import formatDate from "../utils/formatDate";

export default function JournalCard({ entry }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "15px",
      borderRadius: "10px",
      marginBottom: "20px"
    }}>
      
      <h3>{entry.title}</h3>
      <p>{entry.content}</p>

      <p style={{ fontSize: "13px", color: "#777" }}>
        Created: {new Date(entry.created_at).toLocaleString()}
      </p>

      {/* ATTACHMENTS SECTION */}
      {entry.attachments && entry.attachments.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          <strong>Attachments:</strong>
          <ul>
            {entry.attachments.map((file, index) => (
              <li key={index}>
                <a 
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {file.filename}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}
