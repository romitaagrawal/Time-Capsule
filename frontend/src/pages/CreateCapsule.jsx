import React, { useEffect, useState } from "react";
import { createCapsule, uploadCapsuleFiles, listCapsules } from "../api/capsuleApi";
import CapsuleCard from "../components/CapsuleCard";
import formatDate from "../utils/formatDate";

export default function CreateCapsule() {
  const name = localStorage.getItem("name") || "You";
  const [title, setTitle] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [files, setFiles] = useState([]);
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadCapsules() {
    try {
      const res = await listCapsules();
      // ensure dates are ISO strings from backend; leave them as-is
      setCapsules(res.capsules || []);
    } catch (err) {
      console.error("loadCapsules error:", err);
    }
  }

  useEffect(() => {
    loadCapsules();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    if (!title || !openDate) return alert("Add title and open date");

    try {
      setLoading(true);

      // Send open_date as an ISO string (UTC)
      const payload = {
        title,
        creator_name: name,
        open_date: new Date(openDate).toISOString(),
        attachments: []
      };

      const res = await createCapsule(payload);
      const capsuleId = res.capsule_id;

      if (files && files.length > 0) {
        // upload files and backend will update capsule doc
        await uploadCapsuleFiles(capsuleId, files);
      }

      // reload
      await loadCapsules();
      setTitle("");
      setOpenDate("");
      setFiles([]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("create capsule error:", err);
      alert("Error creating capsule");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Hello {name}, welcome — let's create a capsule</h2>

      <form onSubmit={handleCreate}>
        <div>
          <input placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} required style={{width:"100%", padding:8}}/>
        </div>

        <div style={{marginTop:8}}>
          {/* datetime-local gives local time; we convert to ISO when sending */}
          <input type="datetime-local" value={openDate} onChange={(e)=>setOpenDate(e.target.value)} required />
        </div>

        <div style={{marginTop:8}}>
          <input type="file" multiple onChange={(e)=>setFiles(Array.from(e.target.files))} />
          {files.length>0 && <div><small>{files.length} file(s) selected</small></div>}
        </div>

        <div style={{marginTop:10}}>
          <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Capsule"}</button>
        </div>
      </form>

      <hr style={{margin:"30px 0"}}/>

      <h3>Your Capsules</h3>
      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 16,
    marginTop: 12
  }}
>
  {capsules.map((c) => (
    <div
      key={c._id}
      style={{
        border: "1px solid #eee",
        borderRadius: 10,
        padding: 10
      }}
    >
      <CapsuleCard capsule={c} />

      <button
        onClick={async () => {
          if (!window.confirm("Delete this capsule permanently?")) return;

          try {
            const token = localStorage.getItem("token");

            await fetch(`${import.meta.env.VITE_API_BASE_URL}/capsules/${c._id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`
              }
            });

            // Reload list after delete
            loadCapsules();
          } catch (err) {
            console.error(err);
            alert("Failed to delete capsule");
          }
        }}
        style={{
          marginTop: 10,
          width: "100%",
          background: "red",
          color: "white",
          padding: "8px 12px",
          borderRadius: 6,
          border: "none",
          cursor: "pointer"
        }}
      >
        Delete Capsule
      </button>
    </div>
  ))}
</div>

    </div>
  );
}
