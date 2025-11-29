// frontend/src/pages/CapsuleView.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCapsule } from "../api/capsuleApi";
import formatDate from "../utils/formatDate";
// import "../assets/css/capsule.css";

function FileCard({ file, capsuleId }) {
  const BASE = import.meta.env.VITE_API_BASE_URL;
  const viewUrl = `${BASE}${file.url}`;
  const downloadUrl = `${BASE}/upload/download/capsule/${capsuleId}/${file.stored_as}`;

  const ext = (file.filename || "").split(".").pop()?.toLowerCase() || "";
  const isImage = ["png", "jpg", "jpeg", "gif", "webp"].includes(ext);
  const isVideo = ["mp4", "webm", "ogg"].includes(ext);
  const isPdf = ext === "pdf";
  const isText = ["txt", "md", "csv"].includes(ext);
  const isDoc = ["doc", "docx", "ppt", "pptx", "xls", "xlsx"].includes(ext);

  // Image
  if (isImage) {
    return (
      <div style={{ border: "1px solid #eee", padding: 8, borderRadius: 8 }}>
        <img
          src={viewUrl}
          alt={file.filename}
          style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 6 }}
        />
        <div style={{ marginTop: 8 }}>{file.filename}</div>

        <a href={downloadUrl} style={{ display: "block", marginTop: 6 }}>
          Download
        </a>
      </div>
    );
  }

  // Video
  if (isVideo) {
    return (
      <div style={{ border: "1px solid #eee", padding: 8, borderRadius: 8 }}>
        <video controls style={{ width: "100%", maxHeight: 360 }}>
          <source src={viewUrl} />
        </video>
        <div style={{ marginTop: 8 }}>{file.filename}</div>

        <a href={downloadUrl} style={{ display: "block", marginTop: 6 }}>
          Download
        </a>
      </div>
    );
  }

  // Other documents
  const icon = isPdf ? "📄" : isDoc ? "📁" : isText ? "📝" : "📎";

  return (
    <div
      style={{
        border: "1px solid #eee",
        padding: 12,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div style={{ fontSize: 28 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <strong>{file.filename}</strong>
      </div>
      <a href={downloadUrl}>Download</a>
    </div>
  );
}

export default function CapsuleView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [locked, setLocked] = useState(false);
  const [capsule, setCapsule] = useState(null);
  const [openDateStr, setOpenDateStr] = useState(null);

  useEffect(() => {
    loadCapsule();
  }, [id]);

  async function loadCapsule() {
    try {
      setLoading(true);
      const res = await getCapsule(id);

      if (res.locked) {
        setLocked(true);
        setOpenDateStr(res.open_date || null);
        setCapsule(null);
      } else {
        setLocked(false);
        setCapsule(res.capsule || null);
      }
    } catch (err) {
      console.error("load capsule err:", err);
    }
    setLoading(false);
  }

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;

  if (locked)
    return (
      <div style={{ padding: 20 }}>
        <button onClick={() => navigate(-1)}>Back</button>
        <div style={{ padding: 20, border: "1px solid #eee" }}>
          <h2>This capsule is locked 🔒</h2>
          <p>Opens on: {openDateStr ? formatDate(openDateStr) : "Unknown"}</p>
        </div>
      </div>
    );

  if (!capsule) return <div>No capsule data</div>;

  const BASE = import.meta.env.VITE_API_BASE_URL;

  const images = (capsule.attachments || []).filter((f) =>
    ["png", "jpg", "jpeg", "gif", "webp"].includes(
      f.filename.split(".").pop().toLowerCase()
    )
  );

  const videos = (capsule.attachments || []).filter((f) =>
    ["mp4", "webm", "ogg"].includes(f.filename.split(".").pop().toLowerCase())
  );

  const others = (capsule.attachments || []).filter(
    (f) => !images.includes(f) && !videos.includes(f)
  );

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => navigate(-1)}>Back</button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20 }}>
        <div>
          <div style={{ padding: 16, border: "1px solid #eee" }}>
            <h2>{capsule.title}</h2>
            <p>By {capsule.creator_name}</p>
            <p>Created: {formatDate(capsule.created_at)}</p>
            <p>
              <strong>Opened:</strong> {formatDate(capsule.open_date)}
            </p>
          </div>

          {/* IMAGES */}
          {images.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <h3>Photos</h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 12,
                }}
              >
                {images.map((f, i) => (
                  <FileCard key={i} file={f} capsuleId={capsule._id} />
                ))}
              </div>
            </div>
          )}

          {/* VIDEOS */}
          {videos.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <h3>Videos</h3>
              <div style={{ display: "grid", gap: 12 }}>
                {videos.map((f, i) => (
                  <FileCard key={i} file={f} capsuleId={capsule._id} />
                ))}
              </div>
            </div>
          )}

          {/* OTHER FILES */}
          {others.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <h3>Files</h3>
              <div style={{ display: "grid", gap: 12 }}>
                {others.map((f, i) => (
                  <FileCard key={i} file={f} capsuleId={capsule._id} />
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
