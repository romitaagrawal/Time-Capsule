import React, { useEffect, useState } from "react";
import { getMyCapsules, createCapsuleApi } from "../api/capsuleApi";
import CapsuleCard from "../components/CapsuleCard";

export default function CreateCapsule() {
  const name = localStorage.getItem("name");

  const [title, setTitle] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [files, setFiles] = useState([]);
  const [capsules, setCapsules] = useState([]);

  async function loadCapsules() {
    try {
      const data = await getMyCapsules();
      setCapsules(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadCapsules();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();

    try {
      await createCapsuleApi(title, name, openDate, files);
      setTitle("");
      setOpenDate("");
      setFiles([]);

      // reload capsules after creating new one
      loadCapsules();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Hello {name}, welcome to TimeCapsule — let's create a capsule</h2>

      {/* ------------------- CREATE FORM ------------------- */}
      <form onSubmit={handleCreate}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br/><br/>

        <input
          type="date"
          value={openDate}
          onChange={(e) => setOpenDate(e.target.value)}
          required
        /><br/><br/>

        <input
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        /><br/><br/>

        <button type="submit">Create Capsule</button>
      </form>

      <hr style={{ margin: "40px 0" }} />

      {/* ------------------- CAPSULE LIST ------------------- */}
      <h3>Your Capsules</h3>
      {capsules.length === 0 && <p>No capsules created yet.</p>}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        marginTop: "20px"
      }}>
        {capsules.map(cap => (
          <CapsuleCard key={cap._id} capsule={cap} />
        ))}
      </div>
    </div>
  );
}
