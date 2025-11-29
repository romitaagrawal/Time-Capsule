import React, { useState, useEffect } from "react";
import { createEntry, listEntries } from "../api/journalApi";
import api from "../api/apiClient";
import { deleteEntry } from "../api/journalApi";

import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/journal.css";

export default function Journal() {
  const name = localStorage.getItem("name") || "You";
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
    <>
      <Header />

      <div className="journal-page">
        
        {/* FORM BOX */}
        <div className="journal-form-box">
        <h1 className="tc-page-title">Hello {name}, so tell me about your day</h1>

          <h2 className="journal-title">Write a Journal Entry</h2>

          <form onSubmit={submit}>
            <input
              className="journal-input"
              required
              placeholder="Entry Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="journal-textarea"
              required
              placeholder="Write your thoughts..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />

            <input
              className="journal-file"
              type="file"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files))}
            />

            <button className="journal-btn" type="submit">
              Save Entry
            </button>
          </form>
        </div>

        {/* PAST ENTRIES */}
        <h3 style={{ width: "95%", maxWidth: "1300px", marginBottom: 20 }}>Past Entries</h3>

        <div className="journal-entries-container">
          {entries.map((en) => {
            const BASE = import.meta.env.VITE_API_BASE_URL;

            const images = (en.attachments || []).filter((a) => isImage(a.filename));
            const videos = (en.attachments || []).filter((a) => isVideo(a.filename));
            const others = (en.attachments || []).filter((a) =>
              !isImage(a.filename) && !isVideo(a.filename)
            );

            return (
              <div key={en._id} className="journal-entry-card">

                <h3>{en.title}</h3>
                <p>{en.body}</p>

                <button
                  className="journal-delete-btn"
                  onClick={async () => {
                    if (window.confirm("Delete this journal entry?")) {
                      await deleteEntry(en._id);
                      loadEntries();
                    }
                  }}
                >
                  Delete Entry
                </button>

                {/* IMAGES */}
                {images.length > 0 && (
                  <>
                    <h4>Photos</h4>
                    <div className="journal-img-grid">
                      {images.map((file, i) => {
                        const url = `${BASE}${file.url}`;
                        return (
                          <div key={i} className="journal-img-card">
                            <img src={url} alt={file.filename} />
                            <div style={{ padding: 6, fontSize: 13 }}>
                              <a href={`${BASE}/upload/download/journal/${en._id}/${file.stored_as}`} download>
                                Download
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* OTHER FILES */}
                {others.length > 0 && (
                  <>
                    <h4>Files</h4>
                    {others.map((file, i) => {
                      const url = `${BASE}${file.url}`;
                      return (
                        <div key={i} style={{ marginTop: 10 }}>
                          📎 {file.filename}
                          <br />
                          <a href={`${BASE}/upload/download/journal/${en._id}/${file.stored_as}`} download>
                            Download
                          </a>
                        </div>
                      );
                    })}
                  </>
                )}

              </div>
            );
          })}
        </div>

        <Footer />
      </div>
    </>
  );
}
