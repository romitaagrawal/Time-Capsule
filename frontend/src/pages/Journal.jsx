import React, { useState, useEffect } from "react";
import { createEntry, listEntries } from "../api/journalApi";
import api from "../api/apiClient";

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

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await createEntry({ title, body, attachments: [] });
      const id = res.entry_id;
      if (files.length > 0) {
        const form = new FormData();
        for (const f of files) form.append("files", f);
        const token = localStorage.getItem("token");
        await api.post(`/upload/journal/${id}/files`, form, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
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
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Journal</h2>
      <form onSubmit={submit}>
        <div><input required placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
        <div><textarea required placeholder="Write your thoughts..." value={body} onChange={(e) => setBody(e.target.value)} /></div>
        <div><input type="file" multiple onChange={(e) => setFiles(Array.from(e.target.files))} /></div>
        <button type="submit">Save Entry</button>
      </form>

      <hr />

      <div>
        <h3>Past Entries</h3>
        {entries.length === 0 && <p>No entries yet</p>}
        {entries.map((en) => (
          <div key={en._id} style={{ border: "1px solid #ddd", padding: 10, marginTop: 10 }}>
            <h4>{en.title}</h4>
            <p>{en.body}</p>
            {en.attachments && en.attachments.map((a, i) => (
              <div key={i}>
                <a target="_blank" rel="noopener noreferrer" href={a.url}>
                  {a.filename}
                </a>
              </div>
            ))}
            <small>Created: {new Date(en.created_at).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
