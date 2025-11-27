import React, { useState, useEffect } from "react";
import { createEntry, listEntries } from "../api/journalApi";
import api from "../api/apiClient";
import { deleteEntry } from "../api/journalApi";


export default function Journal() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [files, setFiles] = useState([]);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    loadEntries();
  }, []);

  async function loadEntries() {
    try {
      const res = await listEntries();
      setEntries(res.entries || []);
    } catch (err) {
      console.error(err);
    }
  }

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await createEntry({ title, body, attachments: [] });
      const id = res.entry_id;

      if (files.length > 0) {
        const form = new FormData();
        for (const f of files) form.append("files", f);

        const token = localStorage.getItem("token");

        await api.post(`/upload/journal/${id}/files`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        });
      }

      setTitle("");
      setBody("");
      setFiles([]);
      loadEntries();
    } catch (err) {
      console.error(err);
      alert("Error creating entry");
    }
  }

  // MIME helpers
  const isImage = (name) => ["jpg","jpeg","png","gif","webp"].includes(name.split(".").pop().toLowerCase());
  const isVideo = (name) => ["mp4","webm","ogg"].includes(name.split(".").pop().toLowerCase());
  const isPdf = (name) => name.toLowerCase().endsWith(".pdf");
  const isDoc = (name) => ["doc","docx","ppt","pptx","xls","xlsx"].includes(name.split(".").pop().toLowerCase());
  const isText = (name) => ["txt","md","csv"].includes(name.split(".").pop().toLowerCase());

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Journal</h2>

      {/* ---------- FORM ---------- */}
      <form onSubmit={submit}>
        <div>
          <input required placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <textarea required placeholder="Write your thoughts..." value={body} onChange={(e) => setBody(e.target.value)}/>
        </div>
        <div>
          <input type="file" multiple onChange={(e) => setFiles(Array.from(e.target.files))}/>
        </div>
        <button type="submit">Save Entry</button>
      </form>
      <hr />

      {/* ---------- JOURNAL ENTRIES ---------- */}
      <h3>Past Entries</h3>
      {entries.length === 0 && <p>No entries yet</p>}

      {entries.map((en) => {
        const BASE = import.meta.env.VITE_API_BASE_URL;

        const images = (en.attachments || []).filter((a) => isImage(a.filename));
        const videos = (en.attachments || []).filter((a) => isVideo(a.filename));
        const others = (en.attachments || []).filter(
          (a) => !isImage(a.filename) && !isVideo(a.filename)
        );

        return (
          


          <div
            key={en._id}
            style={{
              border: "1px solid #ddd",
              padding: 15,
              marginTop: 20,
              borderRadius: 10,
            }}
          >
            <h3>{en.title}</h3>
            <p>{en.body}</p>
            <button
  style={{ marginTop: 10, background: "red", color: "white", padding: "6px 10px", borderRadius: 6 }}
  onClick={async () => {
    if (window.confirm("Delete this journal entry?")) {
      await deleteEntry(en._id);
      loadEntries();
    }
  }}
>
  Delete Entry
</button>


            {/* ---------- IMAGES ---------- */}
            {images.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <h4>Photos</h4>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 12
                  }}
                >
                  {images.map((file, i) => {
                    const url = `${BASE}${file.url}`;
                    return (
                      <div
                        key={i}
                        style={{
                          border: "1px solid #eee",
                          borderRadius: 8,
                          overflow: "hidden"
                        }}
                      >
                        <img
                          src={url}
                          alt={file.filename}
                          style={{
                            width: "100%",
                            height: 150,
                            objectFit: "cover"
                          }}
                        />
                        <div style={{ padding: 8, fontSize: 13 }}>
                          {file.filename}
                          <br />
                          <a 
  href={`${BASE}/upload/download/journal/${en._id}/${file.stored_as}`}
  download
>
  Download
</a>

                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ---------- VIDEOS ---------- */}
            {videos.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <h4>Videos</h4>

                <div style={{ display: "grid", gap: 12 }}>
                  {videos.map((file, i) => {
                    const url = `${BASE}${file.url}`;
                    return (
                      <div
                        key={i}
                        style={{
                          border: "1px solid #eee",
                          padding: 10,
                          borderRadius: 8
                        }}
                      >
                        <video controls style={{ width: "100%" }}>
                          <source src={url} />
                        </video>

                        <div style={{ marginTop: 6 }}>
                          {file.filename}
                          <br />
                          <a 
  href={`${BASE}/upload/download/journal/${en._id}/${file.stored_as}`}
  download
>
  Download
</a>

                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ---------- OTHER FILES ---------- */}
            {others.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <h4>Files</h4>

                <div style={{ display: "grid", gap: 10 }}>
                  {others.map((file, i) => {
                    const url = `${BASE}${file.url}`;

                    let icon = "📎";
                    if (isPdf(file.filename)) icon = "📄";
                    else if (isDoc(file.filename)) icon = "📁";
                    else if (isText(file.filename)) icon = "📝";

                    return (
                      <div
                        key={i}
                        style={{
                          border: "1px solid #eee",
                          padding: 12,
                          borderRadius: 8
                        }}
                      >
                        <div style={{ fontSize: 18 }}>{icon}</div>
                        {file.filename}
                        <br />
                        <a 
  href={`${BASE}/upload/download/journal/${en._id}/${file.stored_as}`}
  download
>
  Download
</a>

                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <small style={{ color: "#666", marginTop: 10, display: "block" }}>
              Created: {new Date(en.created_at).toLocaleString()}
            </small>
          </div>
        );
      })}

    

    </div>
  );
}
